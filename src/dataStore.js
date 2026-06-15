const UNIFIED_STORAGE_KEY = 'hxwl-61301-unified-data';
const CURRENT_SCHEMA_VERSION = 1;

const DATA_CATEGORIES = {
  records: 'records',
  patients: 'patients',
  shadeLibrary: 'shadeLibrary',
  photoProcesses: 'photoProcesses',
  deliveryOrders: 'deliveryOrders',
  qcCheckItems: 'qcCheckItems',
  qcRecords: 'qcRecords',
  collab: 'collab',
  collabTimeline: 'collabTimeline',
};

const LEGACY_STORAGE_KEYS = {
  [DATA_CATEGORIES.records]: 'hxwl-61301-dental-shade',
  [DATA_CATEGORIES.patients]: 'hxwl-61301-patients',
  [DATA_CATEGORIES.shadeLibrary]: 'hxwl-61301-shade-library',
  [DATA_CATEGORIES.photoProcesses]: 'hxwl-61301-photo-process',
  [DATA_CATEGORIES.deliveryOrders]: 'hxwl-61301-delivery-orders',
  [DATA_CATEGORIES.qcCheckItems]: 'hxwl-61301-qc-check-items',
  [DATA_CATEGORIES.qcRecords]: 'hxwl-61301-qc',
  [DATA_CATEGORIES.collab]: 'hxwl-61301-collab',
  [DATA_CATEGORIES.collabTimeline]: 'hxwl-61301-collab-timeline',
};

function getDefaultData(appConfig) {
  return {
    [DATA_CATEGORIES.records]: withIds(appConfig.seed, appConfig),
    [DATA_CATEGORIES.patients]: withPatientIds(appConfig.patientSeed),
    [DATA_CATEGORIES.shadeLibrary]: migrateShadeLibrary(appConfig.shadeLibrarySeed),
    [DATA_CATEGORIES.photoProcesses]: [],
    [DATA_CATEGORIES.deliveryOrders]: [...appConfig.deliveryOrderSeed],
    [DATA_CATEGORIES.qcCheckItems]: appConfig.qcCheckItems.map((ci) => ({ ...ci })),
    [DATA_CATEGORIES.qcRecords]: [],
    [DATA_CATEGORIES.collab]: { currentDeviceId: appConfig.defaultDeviceId },
    [DATA_CATEGORIES.collabTimeline]: [],
  };
}

function getDefaultForCategory(category, appConfig) {
  const defaults = getDefaultData(appConfig);
  return defaults[category];
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function getLocalDateString(d = new Date()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const today = getLocalDateString();

function withIds(items, appConfig) {
  return items.map((item) => ({
    id: item.id || uid(),
    timeline: item.timeline || [{ status: item.status, at: today, by: '系统' }],
    deviceId: item.deviceId || appConfig.defaultDeviceId,
    lastModified: item.lastModified || new Date().toISOString(),
    version: item.version || 1,
    ...item,
  }));
}

function withPatientIds(patients) {
  return patients.map((p) => ({ id: p.id || uid(), createdAt: new Date().toISOString(), ...p }));
}

function migrateShadeLibrary(library) {
  const libraryData = library || [];
  const builtInCodes = ['A1', 'A2', 'A3', 'B1', 'B2', 'C1', 'D2'];
  const migrated = libraryData.map((s, i) => ({
    ...s,
    isBuiltIn: s.isBuiltIn !== undefined ? s.isBuiltIn : builtInCodes.includes(s.code),
    order: s.order !== undefined ? s.order : i,
  }));
  return migrated.sort((a, b) => a.order - b.order);
}

function normalizeQcItems(items, checkItems) {
  const ciList = checkItems;
  const normalized = {};
  ciList.forEach((ci) => {
    if (items && items[ci.key] && typeof items[ci.key] === 'object') {
      normalized[ci.key] = {
        checked: !!items[ci.key].checked,
        remark: items[ci.key].remark || '',
        checkedAt: items[ci.key].checkedAt || null,
      };
    } else {
      normalized[ci.key] = { checked: false, remark: '', checkedAt: null };
    }
  });
  return normalized;
}

function parseLegacyRecords(raw, appConfig) {
  const parsed = JSON.parse(raw);
  if (Array.isArray(parsed)) {
    return withIds(
      parsed.map((item) => ({
        patient: item.patient || '',
        tooth: item.tooth || '',
        shade: item.shade || '',
        photoNote: item.photoNote || '',
        followUp: item.followUp || '',
        status: item.status || appConfig.primaryStatus,
        ...item,
      })),
      appConfig
    );
  }
  return withIds(appConfig.seed, appConfig);
}

function parseLegacyPatients(raw, appConfig) {
  const parsed = JSON.parse(raw);
  if (Array.isArray(parsed)) {
    return parsed.map((p) => ({ id: p.id || uid(), createdAt: p.createdAt || new Date().toISOString(), ...p }));
  }
  return withPatientIds(appConfig.patientSeed);
}

function parseLegacyShadeLibrary(raw, appConfig) {
  const parsed = JSON.parse(raw);
  return migrateShadeLibrary(parsed);
}

function parseLegacyPhotoProcesses(raw) {
  const parsed = JSON.parse(raw);
  if (Array.isArray(parsed)) {
    return parsed;
  }
  return [];
}

function parseLegacyDeliveryOrders(raw, appConfig) {
  const parsed = JSON.parse(raw);
  if (Array.isArray(parsed)) {
    return parsed;
  }
  return [...appConfig.deliveryOrderSeed];
}

function parseLegacyQcCheckItems(raw, appConfig) {
  const parsed = JSON.parse(raw);
  if (Array.isArray(parsed) && parsed.length > 0) {
    return parsed.map((ci) => ({
      key: ci.key || uid(),
      label: ci.label || '',
      icon: ci.icon || 'ClipboardList',
      requiredFor: Array.isArray(ci.requiredFor) ? ci.requiredFor : [],
      description: ci.description || '',
      order: ci.order ?? 0,
      critical: !!ci.critical,
    }));
  }
  return appConfig.qcCheckItems.map((ci) => ({ ...ci }));
}

function parseLegacyQcRecords(raw, appConfig, qcCheckItems) {
  const checkItems = qcCheckItems || appConfig.qcCheckItems;
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) return [];
  return parsed.map((qc) => ({
    id: qc.id || uid(),
    recordId: qc.recordId || '',
    items: normalizeQcItems(qc.items, checkItems),
    createdAt: qc.createdAt || new Date().toISOString(),
    updatedAt: qc.updatedAt || new Date().toISOString(),
  }));
}

function parseLegacyCollab(raw, appConfig) {
  const parsed = JSON.parse(raw);
  return {
    currentDeviceId: parsed.currentDeviceId || appConfig.defaultDeviceId,
  };
}

function parseLegacyCollabTimeline(raw) {
  const parsed = JSON.parse(raw);
  if (Array.isArray(parsed)) {
    return parsed;
  }
  return [];
}

const CATEGORY_PARSERS = {
  [DATA_CATEGORIES.records]: parseLegacyRecords,
  [DATA_CATEGORIES.patients]: parseLegacyPatients,
  [DATA_CATEGORIES.shadeLibrary]: parseLegacyShadeLibrary,
  [DATA_CATEGORIES.photoProcesses]: parseLegacyPhotoProcesses,
  [DATA_CATEGORIES.deliveryOrders]: parseLegacyDeliveryOrders,
  [DATA_CATEGORIES.qcCheckItems]: parseLegacyQcCheckItems,
  [DATA_CATEGORIES.qcRecords]: parseLegacyQcRecords,
  [DATA_CATEGORIES.collab]: parseLegacyCollab,
  [DATA_CATEGORIES.collabTimeline]: parseLegacyCollabTimeline,
};

const CATEGORY_NAMES = {
  [DATA_CATEGORIES.records]: '比色记录',
  [DATA_CATEGORIES.patients]: '患者档案',
  [DATA_CATEGORIES.shadeLibrary]: '色号库',
  [DATA_CATEGORIES.photoProcesses]: '拍照流程',
  [DATA_CATEGORIES.deliveryOrders]: '交接单',
  [DATA_CATEGORIES.qcCheckItems]: '质控配置',
  [DATA_CATEGORIES.qcRecords]: '质控记录',
  [DATA_CATEGORIES.collab]: '协作设备',
  [DATA_CATEGORIES.collabTimeline]: '协作时间线',
};

function createEmptyUnifiedData(appConfig) {
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    migratedAt: new Date().toISOString(),
    data: getDefaultData(appConfig),
    migrationLog: [],
    recoveryLog: [],
  };
}

function safeParseJSON(raw) {
  try {
    return { success: true, data: JSON.parse(raw) };
  } catch (e) {
    return { success: false, error: e };
  }
}

function loadAndMigrateFromLegacy(appConfig) {
  const result = {
    data: createEmptyUnifiedData(appConfig),
    migrationLog: [],
    recoveryLog: [],
    migrated: false,
  };

  const unifiedRaw = localStorage.getItem(UNIFIED_STORAGE_KEY);
  if (unifiedRaw) {
    const parsed = safeParseJSON(unifiedRaw);
    if (parsed.success) {
      result.data = parsed.data;
      result.data.migrationLog = result.data.migrationLog || [];
      result.data.recoveryLog = result.data.recoveryLog || [];
      return runMigrations(result, appConfig);
    }
  }

  result.migrated = true;
  const qcCheckItems = loadCategoryLegacy(DATA_CATEGORIES.qcCheckItems, appConfig, result);

  Object.values(DATA_CATEGORIES).forEach((category) => {
    if (category === DATA_CATEGORIES.qcRecords) {
      result.data.data[category] = loadCategoryLegacy(category, appConfig, result, qcCheckItems);
    } else if (category !== DATA_CATEGORIES.qcCheckItems) {
      result.data.data[category] = loadCategoryLegacy(category, appConfig, result);
    } else {
      result.data.data[category] = qcCheckItems;
    }
  });

  result.data.schemaVersion = CURRENT_SCHEMA_VERSION;
  result.data.migratedAt = new Date().toISOString();
  result.data.migrationLog = result.migrationLog;
  result.data.recoveryLog = result.recoveryLog;

  saveUnifiedData(result.data);

  Object.values(LEGACY_STORAGE_KEYS).forEach((key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      // ignore
    }
  });

  return result;
}

function loadCategoryLegacy(category, appConfig, result, extraArg) {
  const storageKey = LEGACY_STORAGE_KEYS[category];
  const raw = localStorage.getItem(storageKey);

  if (raw === null) {
    const defaultValue = getDefaultForCategory(category, appConfig);
    result.migrationLog.push({
      category,
      action: 'initialized',
      message: `${CATEGORY_NAMES[category]}：无旧数据，已初始化为默认值`,
      timestamp: new Date().toISOString(),
    });
    return defaultValue;
  }

  const parsed = safeParseJSON(raw);
  if (!parsed.success) {
    const defaultValue = getDefaultForCategory(category, appConfig);
    result.recoveryLog.push({
      category,
      action: 'recovered',
      message: `${CATEGORY_NAMES[category]}：数据损坏，已恢复为默认值`,
      error: parsed.error.message,
      timestamp: new Date().toISOString(),
    });
    return defaultValue;
  }

  try {
    const parser = CATEGORY_PARSERS[category];
    const parsedData = extraArg !== undefined
      ? parser(raw, appConfig, extraArg)
      : parser(raw, appConfig);

    result.migrationLog.push({
      category,
      action: 'migrated',
      message: `${CATEGORY_NAMES[category]}：迁移成功`,
      timestamp: new Date().toISOString(),
    });
    return parsedData;
  } catch (e) {
    const defaultValue = getDefaultForCategory(category, appConfig);
    result.recoveryLog.push({
      category,
      action: 'recovered',
      message: `${CATEGORY_NAMES[category]}：数据解析失败，已恢复为默认值`,
      error: e.message,
      timestamp: new Date().toISOString(),
    });
    return defaultValue;
  }
}

function runMigrations(result, appConfig) {
  const currentVersion = result.data.schemaVersion || 0;

  if (currentVersion < CURRENT_SCHEMA_VERSION) {
    result.migrated = true;

    for (let v = currentVersion + 1; v <= CURRENT_SCHEMA_VERSION; v++) {
      const migrationFn = MIGRATIONS[v];
      if (migrationFn) {
        try {
          result.data = migrationFn(result.data, appConfig);
          result.migrationLog.push({
            category: 'schema',
            action: 'upgrade',
            message: `数据模型已升级到版本 v${v}`,
            timestamp: new Date().toISOString(),
          });
        } catch (e) {
          result.recoveryLog.push({
            category: 'schema',
            action: 'recovery_failed',
            message: `升级到版本 v${v} 失败`,
            error: e.message,
            timestamp: new Date().toISOString(),
          });
        }
      }
    }

    result.data.schemaVersion = CURRENT_SCHEMA_VERSION;
    result.data.migrationLog = [...(result.data.migrationLog || []), ...result.migrationLog];
    result.data.recoveryLog = [...(result.data.recoveryLog || []), ...result.recoveryLog];
    saveUnifiedData(result.data);
  }

  return result;
}

const MIGRATIONS = {
  1: (data, appConfig) => {
    const defaults = getDefaultData(appConfig);
    const result = { ...data };

    Object.keys(defaults).forEach((key) => {
      if (result.data[key] === undefined) {
        result.data[key] = defaults[key];
      }
    });

    return result;
  },
};

function saveUnifiedData(unifiedData) {
  localStorage.setItem(UNIFIED_STORAGE_KEY, JSON.stringify(unifiedData));
}

function loadUnifiedData(appConfig) {
  const result = loadAndMigrateFromLegacy(appConfig);

  const recoveryResult = verifyAndRecoverCorruptedCategories(result.data, appConfig);

  if (recoveryResult.recovered) {
    result.data = recoveryResult.data;
    result.recoveryLog = [...result.recoveryLog, ...recoveryResult.recoveryLog];
  }

  const checkItems = result.data.data[DATA_CATEGORIES.qcCheckItems];
  const qcRecords = result.data.data[DATA_CATEGORIES.qcRecords];
  if (Array.isArray(qcRecords) && Array.isArray(checkItems)) {
    const normalizedQcRecords = qcRecords.map((qc) => ({
      ...qc,
      items: normalizeQcItems(qc.items, checkItems),
      updatedAt: qc.updatedAt || new Date().toISOString(),
    }));
    result.data.data[DATA_CATEGORIES.qcRecords] = normalizedQcRecords;
  }

  if (recoveryResult.recovered || Array.isArray(qcRecords)) {
    saveUnifiedData(result.data);
  }

  return {
    data: result.data,
    migrationLog: result.data.migrationLog || [],
    recoveryLog: result.data.recoveryLog || [],
    migrated: result.migrated || recoveryResult.recovered,
  };
}

function verifyAndRecoverCorruptedCategories(unifiedData, appConfig) {
  const result = {
    data: { ...unifiedData, data: { ...unifiedData.data } },
    recoveryLog: [],
    recovered: false,
  };

  Object.values(DATA_CATEGORIES).forEach((category) => {
    try {
      const categoryData = result.data.data[category];
      if (categoryData === undefined || categoryData === null) {
        throw new Error('数据不存在');
      }
      validateCategoryData(category, categoryData, appConfig);
    } catch (e) {
      result.recovered = true;
      result.data.data[category] = getDefaultForCategory(category, appConfig);
      result.recoveryLog.push({
        category,
        action: 'recovered',
        message: `${CATEGORY_NAMES[category]}：数据验证失败，已恢复为默认值`,
        error: e.message,
        timestamp: new Date().toISOString(),
      });
    }
  });

  if (result.recovered) {
    result.data.recoveryLog = [...(result.data.recoveryLog || []), ...result.recoveryLog];
  }

  return result;
}

function validateCategoryData(category, data, appConfig) {
  switch (category) {
    case DATA_CATEGORIES.records:
    case DATA_CATEGORIES.patients:
    case DATA_CATEGORIES.shadeLibrary:
    case DATA_CATEGORIES.photoProcesses:
    case DATA_CATEGORIES.deliveryOrders:
    case DATA_CATEGORIES.qcCheckItems:
    case DATA_CATEGORIES.qcRecords:
    case DATA_CATEGORIES.collabTimeline:
      if (!Array.isArray(data)) {
        throw new Error('期望数组类型');
      }
      break;
    case DATA_CATEGORIES.collab:
      if (typeof data !== 'object' || data === null) {
        throw new Error('期望对象类型');
      }
      break;
    default:
      break;
  }
}

function saveCategory(category, value, appConfig) {
  const raw = localStorage.getItem(UNIFIED_STORAGE_KEY);
  let unifiedData;

  if (raw) {
    const parsed = safeParseJSON(raw);
    if (parsed.success) {
      unifiedData = parsed.data;
    } else {
      unifiedData = createEmptyUnifiedData(appConfig);
    }
  } else {
    unifiedData = createEmptyUnifiedData(appConfig);
  }

  unifiedData.data[category] = value;
  saveUnifiedData(unifiedData);
}

function loadCategory(category, appConfig) {
  const result = loadUnifiedData(appConfig);
  return result.data.data[category];
}

function clearMigrationAndRecoveryLogs(appConfig) {
  const raw = localStorage.getItem(UNIFIED_STORAGE_KEY);
  if (raw) {
    const parsed = safeParseJSON(raw);
    if (parsed.success) {
      const unifiedData = parsed.data;
      unifiedData.migrationLog = [];
      unifiedData.recoveryLog = [];
      saveUnifiedData(unifiedData);
    }
  }
}

function getDataStatus(appConfig) {
  const raw = localStorage.getItem(UNIFIED_STORAGE_KEY);
  if (!raw) {
    return {
      hasUnifiedData: false,
      schemaVersion: 0,
      currentSchemaVersion: CURRENT_SCHEMA_VERSION,
      migrationLog: [],
      recoveryLog: [],
      categoryCounts: {},
    };
  }

  const parsed = safeParseJSON(raw);
  if (!parsed.success) {
    return {
      hasUnifiedData: false,
      schemaVersion: 0,
      currentSchemaVersion: CURRENT_SCHEMA_VERSION,
      migrationLog: [],
      recoveryLog: [],
      categoryCounts: {},
      corrupted: true,
    };
  }

  const data = parsed.data;
  const categoryCounts = {};
  Object.entries(data.data || {}).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      categoryCounts[key] = value.length;
    } else if (typeof value === 'object' && value !== null) {
      categoryCounts[key] = 1;
    } else {
      categoryCounts[key] = 0;
    }
  });

  return {
    hasUnifiedData: true,
    schemaVersion: data.schemaVersion || 0,
    currentSchemaVersion: CURRENT_SCHEMA_VERSION,
    migrationLog: data.migrationLog || [],
    recoveryLog: data.recoveryLog || [],
    categoryCounts,
  };
}

const MERGE_ENTITY_FIELDS = {
  records: [
    { key: 'patient', label: '患者姓名' },
    { key: 'tooth', label: '牙位' },
    { key: 'shade', label: '比色结果' },
    { key: 'photoNote', label: '拍照备注' },
    { key: 'followUp', label: '复诊日期' },
    { key: 'status', label: '修复状态' },
    { key: 'deviceId', label: '设备ID' },
    { key: 'lastModified', label: '最后修改时间' },
    { key: 'version', label: '版本号' },
  ],
  patients: [
    { key: 'name', label: '姓名' },
    { key: 'phone', label: '电话' },
    { key: 'commonTooth', label: '常用牙位' },
    { key: 'allergyNote', label: '过敏备注' },
    { key: 'shadeCount', label: '比色次数' },
  ],
  photoProcesses: [
    { key: 'recordId', label: '关联记录ID' },
    { key: 'currentStep', label: '当前步骤' },
    { key: 'completed', label: '是否完成' },
    { key: 'updatedAt', label: '更新时间' },
  ],
  qcRecords: [
    { key: 'recordId', label: '关联记录ID' },
    { key: 'createdAt', label: '创建时间' },
    { key: 'updatedAt', label: '更新时间' },
  ],
  deliveryOrders: [
    { key: 'orderNo', label: '交接单号' },
    { key: 'labName', label: '技工所名称' },
    { key: 'remark', label: '备注' },
    { key: 'status', label: '状态' },
    { key: 'createdAt', label: '创建时间' },
    { key: 'sentAt', label: '发送时间' },
    { key: 'receivedAt', label: '回收时间' },
  ],
};

const MERGE_ENTITY_NAMES = {
  records: '比色记录',
  patients: '患者档案',
  photoProcesses: '拍照流程',
  qcRecords: '质控记录',
  deliveryOrders: '交接单',
};

function shallowEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return a === b;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every(k => a[k] === b[k]);
}

function diffEntityFields(localItem, importItem, entityType) {
  const fields = MERGE_ENTITY_FIELDS[entityType] || [];
  const diffs = [];
  const SKIP_KEYS = new Set(['id', 'timeline']);

  fields.forEach(({ key, label }) => {
    if (SKIP_KEYS.has(key)) return;
    const localVal = localItem[key];
    const importVal = importItem[key];
    if (localVal === importVal) return;
    if (localVal == null && importVal == null) return;
    if (typeof localVal === 'object' && typeof importVal === 'object' && shallowEqual(localVal, importVal)) return;
    diffs.push({
      fieldKey: key,
      fieldLabel: label,
      localValue: localVal ?? '',
      importValue: importVal ?? '',
      resolution: 'import',
    });
  });

  const allKeys = new Set([...Object.keys(localItem), ...Object.keys(importItem)]);
  allKeys.forEach(key => {
    if (SKIP_KEYS.has(key)) return;
    if (fields.some(f => f.key === key)) return;
    const localVal = localItem[key];
    const importVal = importItem[key];
    if (localVal === importVal) return;
    if (localVal == null && importVal == null) return;
    if (typeof localVal === 'object' && typeof importVal === 'object' && shallowEqual(localVal, importVal)) return;
    diffs.push({
      fieldKey: key,
      fieldLabel: key,
      localValue: localVal ?? '',
      importValue: importVal ?? '',
      resolution: 'import',
    });
  });

  return diffs;
}

function matchEntities(localList, importList, entityType) {
  const matched = [];
  const localMatched = new Set();
  const importMatched = new Set();
  const localOnly = [];
  const importOnly = [];

  const matchFns = {
    records: (a, b) => a.patient === b.patient && a.tooth === b.tooth,
    patients: (a, b) => a.id === b.id || (a.name && b.name && a.name === b.name),
    photoProcesses: (a, b) => a.id === b.id || (a.recordId && b.recordId && a.recordId === b.recordId),
    qcRecords: (a, b) => a.id === b.id || (a.recordId && b.recordId && a.recordId === b.recordId),
    deliveryOrders: (a, b) => a.id === b.id || a.orderNo === b.orderNo,
  };

  const matchFn = matchFns[entityType] || ((a, b) => a.id === b.id);

  importList.forEach((imp, iIdx) => {
    let bestLocalIdx = -1;
    let bestLocalId = null;
    localList.forEach((loc, lIdx) => {
      if (localMatched.has(lIdx)) return;
      if (matchFn(loc, imp)) {
        if (loc.id === imp.id) {
          bestLocalIdx = lIdx;
          bestLocalId = loc.id;
        } else if (bestLocalIdx === -1) {
          bestLocalIdx = lIdx;
          bestLocalId = loc.id;
        }
      }
    });
    if (bestLocalIdx >= 0) {
      matched.push({
        local: localList[bestLocalIdx],
        import: imp,
        localIndex: bestLocalIdx,
        importIndex: iIdx,
        fieldDiffs: diffEntityFields(localList[bestLocalIdx], imp, entityType),
      });
      localMatched.add(bestLocalIdx);
      importMatched.add(iIdx);
    }
  });

  localList.forEach((loc, idx) => {
    if (!localMatched.has(idx)) localOnly.push(loc);
  });
  importList.forEach((imp, idx) => {
    if (!importMatched.has(idx)) importOnly.push(imp);
  });

  return { matched, localOnly, importOnly };
}

function detectDuplicatePatients(localPatients, importPatients) {
  const duplicates = [];
  const localNameMap = new Map();
  localPatients.forEach(p => {
    if (p.name) localNameMap.set(p.name, p);
  });
  importPatients.forEach(imp => {
    if (imp.name && localNameMap.has(imp.name) && localNameMap.get(imp.name).id !== imp.id) {
      duplicates.push({
        local: localNameMap.get(imp.name),
        import: imp,
        reason: '同名患者',
      });
    }
  });
  return duplicates;
}

function detectOrphanPhotoProcesses(photoProcesses, records) {
  const recordIds = new Set(records.map(r => r.id));
  return photoProcesses.filter(pp => pp.recordId && !recordIds.has(pp.recordId));
}

function repairIdReferences(mergedData, recordIdMap) {
  const repaired = { ...mergedData };

  if (repaired.photoProcesses) {
    repaired.photoProcesses = repaired.photoProcesses.map(pp => {
      const newRecordId = recordIdMap.get(pp.recordId);
      return newRecordId && newRecordId !== pp.recordId
        ? { ...pp, recordId: newRecordId }
        : pp;
    });
  }

  if (repaired.qcRecords) {
    repaired.qcRecords = repaired.qcRecords.map(qc => {
      const newRecordId = recordIdMap.get(qc.recordId);
      return newRecordId && newRecordId !== qc.recordId
        ? { ...qc, recordId: newRecordId }
        : qc;
    });
  }

  if (repaired.deliveryOrders) {
    repaired.deliveryOrders = repaired.deliveryOrders.map(d => {
      if (!d.recordIds || !Array.isArray(d.recordIds)) return d;
      const newRecordIds = d.recordIds.map(rid => recordIdMap.get(rid) || rid);
      return shallowEqual(newRecordIds, d.recordIds) ? d : { ...d, recordIds: newRecordIds };
    });
  }

  return repaired;
}

export {
  DATA_CATEGORIES,
  CATEGORY_NAMES,
  UNIFIED_STORAGE_KEY,
  CURRENT_SCHEMA_VERSION,
  loadUnifiedData,
  saveCategory,
  loadCategory,
  saveUnifiedData,
  getDataStatus,
  clearMigrationAndRecoveryLogs,
  getDefaultForCategory,
  withIds,
  withPatientIds,
  migrateShadeLibrary,
  normalizeQcItems,
  MERGE_ENTITY_FIELDS,
  MERGE_ENTITY_NAMES,
  diffEntityFields,
  matchEntities,
  detectDuplicatePatients,
  detectOrphanPhotoProcesses,
  repairIdReferences,
  shallowEqual,
};
