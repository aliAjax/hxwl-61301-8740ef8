import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  DATA_CATEGORIES,
  UNIFIED_STORAGE_KEY,
  CURRENT_SCHEMA_VERSION,
  loadUnifiedData,
  saveCategory,
  loadCategory,
  saveUnifiedData,
  getDataStatus,
  clearMigrationAndRecoveryLogs,
  getDefaultForCategory,
  normalizeQcItems,
  shallowEqual,
} from './dataStore';

const mockAppConfig = {
  id: 'hxwl-61301',
  defaultDeviceId: 'tablet-1',
  primaryStatus: '待修复',
  seed: [
    {
      id: 'seed-1',
      patient: '种子患者',
      tooth: '11',
      shade: 'A2',
      photoNote: '种子数据',
      followUp: '2026-06-15',
      status: '待修复',
      deviceId: 'tablet-1',
      lastModified: '2026-06-15T00:00:00.000Z',
      version: 1,
    },
  ],
  patientSeed: [
    { id: 'p-seed-1', name: '种子患者', phone: '13800000000', commonTooth: '11', allergyNote: '无', shadeCount: 1 },
  ],
  shadeLibrarySeed: [
    { code: 'A1', description: '最浅的A系列色号', scenario: '年轻患者', notes: '注意色差', isBuiltIn: true, order: 0 },
    { code: 'A2', description: 'A系列中最常用', scenario: '大多数成年患者', notes: '适用范围广', isBuiltIn: true, order: 1 },
  ],
  deliveryOrderSeed: [
    { id: 'do-seed-1', orderNo: 'JJ-SEED-001', labName: '种子技工所', status: '待发送', createdAt: '2026-06-15T00:00:00.000Z' },
  ],
  qcCheckItems: [
    { key: 'item1', label: '检查项1', icon: 'ClipboardList', requiredFor: ['待修复'], description: '描述1', order: 1, critical: true },
    { key: 'item2', label: '检查项2', icon: 'ClipboardList', requiredFor: ['制作中'], description: '描述2', order: 2, critical: false },
    { key: 'item3', label: '检查项3', icon: 'ClipboardList', requiredFor: ['已完成修复'], description: '描述3', order: 3, critical: true },
  ],
};

const LEGACY_KEYS = {
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

function clearAllStorage() {
  localStorage.clear();
}

function setLegacyData(category, value) {
  const key = LEGACY_KEYS[category];
  localStorage.setItem(key, JSON.stringify(value));
}

function setLegacyRaw(category, raw) {
  const key = LEGACY_KEYS[category];
  localStorage.setItem(key, raw);
}

function getUnifiedData() {
  const raw = localStorage.getItem(UNIFIED_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function setUnifiedData(data) {
  localStorage.setItem(UNIFIED_STORAGE_KEY, JSON.stringify(data));
}

describe('dataStore - 统一本地存储与迁移', () => {
  beforeEach(() => {
    clearAllStorage();
  });

  afterEach(() => {
    clearAllStorage();
  });

  describe('normalizeQcItems - 质控项归一化', () => {
    it('应补全所有缺失的质控项字段，默认值为未检查', () => {
      const checkItems = mockAppConfig.qcCheckItems;
      const partialItems = {
        item1: { checked: true, remark: '已完成', checkedAt: '2026-06-15T10:00:00.000Z' },
      };

      const result = normalizeQcItems(partialItems, checkItems);

      expect(result).toHaveProperty('item1');
      expect(result.item1.checked).toBe(true);
      expect(result.item1.remark).toBe('已完成');
      expect(result.item1.checkedAt).toBe('2026-06-15T10:00:00.000Z');

      expect(result).toHaveProperty('item2');
      expect(result.item2.checked).toBe(false);
      expect(result.item2.remark).toBe('');
      expect(result.item2.checkedAt).toBeNull();

      expect(result).toHaveProperty('item3');
      expect(result.item3.checked).toBe(false);
      expect(result.item3.remark).toBe('');
      expect(result.item3.checkedAt).toBeNull();

      expect(Object.keys(result).length).toBe(3);
    });

    it('应过滤掉 checkItems 中不存在的质控项', () => {
      const checkItems = mockAppConfig.qcCheckItems;
      const itemsWithExtra = {
        item1: { checked: true, remark: '正常项', checkedAt: '2026-06-15T10:00:00.000Z' },
        extraItem: { checked: true, remark: '多余项', checkedAt: '2026-06-15T10:00:00.000Z' },
      };

      const result = normalizeQcItems(itemsWithExtra, checkItems);

      expect(result).toHaveProperty('item1');
      expect(result).not.toHaveProperty('extraItem');
      expect(Object.keys(result).length).toBe(3);
    });

    it('当 items 为 null/undefined 时返回全部默认值', () => {
      const checkItems = mockAppConfig.qcCheckItems;

      const resultNull = normalizeQcItems(null, checkItems);
      const resultUndefined = normalizeQcItems(undefined, checkItems);

      expect(Object.keys(resultNull).length).toBe(3);
      expect(Object.keys(resultUndefined).length).toBe(3);
      expect(resultNull.item1.checked).toBe(false);
      expect(resultUndefined.item1.checked).toBe(false);
    });

    it('对非对象类型的项值应回退到默认值', () => {
      const checkItems = mockAppConfig.qcCheckItems;
      const badItems = {
        item1: '不是对象',
        item2: 123,
        item3: null,
      };

      const result = normalizeQcItems(badItems, checkItems);

      expect(result.item1.checked).toBe(false);
      expect(result.item2.checked).toBe(false);
      expect(result.item3.checked).toBe(false);
    });

    it('缺失的字段应补默认值（checked/remark/checkedAt）', () => {
      const checkItems = mockAppConfig.qcCheckItems;
      const incompleteItems = {
        item1: { checked: true },
        item2: { remark: '只有备注' },
      };

      const result = normalizeQcItems(incompleteItems, checkItems);

      expect(result.item1.checked).toBe(true);
      expect(result.item1.remark).toBe('');
      expect(result.item1.checkedAt).toBeNull();

      expect(result.item2.checked).toBe(false);
      expect(result.item2.remark).toBe('只有备注');
      expect(result.item2.checkedAt).toBeNull();
    });
  });

  describe('旧 localStorage 迁移 - 记录数组', () => {
    it('应从旧 key 迁移记录数组，添加 id/timeline/deviceId 等字段', () => {
      const legacyRecords = [
        { patient: '张三', tooth: '11', shade: 'A2', photoNote: '测试1', followUp: '2026-06-16', status: '待修复' },
        { patient: '李四', tooth: '21', shade: 'B1', photoNote: '测试2', followUp: '2026-06-17', status: '制作中' },
      ];
      setLegacyData(DATA_CATEGORIES.records, legacyRecords);

      const result = loadUnifiedData(mockAppConfig);

      expect(result.migrated).toBe(true);
      expect(result.data.data.records).toHaveLength(2);
      expect(result.data.data.records[0]).toHaveProperty('id');
      expect(result.data.data.records[0]).toHaveProperty('timeline');
      expect(Array.isArray(result.data.data.records[0].timeline)).toBe(true);
      expect(result.data.data.records[0].deviceId).toBe('tablet-1');
      expect(result.data.data.records[0]).toHaveProperty('lastModified');
      expect(result.data.data.records[0].version).toBe(1);
      expect(result.data.data.records[0].patient).toBe('张三');
      expect(result.data.data.records[0].tooth).toBe('11');
      expect(result.data.data.records[1].patient).toBe('李四');
    });

    it('旧记录中部分字段缺失时，应填充默认值', () => {
      const legacyRecords = [
        { patient: '王五' },
      ];
      setLegacyData(DATA_CATEGORIES.records, legacyRecords);

      const result = loadUnifiedData(mockAppConfig);

      const record = result.data.data.records[0];
      expect(record.patient).toBe('王五');
      expect(record.tooth).toBe('');
      expect(record.shade).toBe('');
      expect(record.photoNote).toBe('');
      expect(record.followUp).toBe('');
      expect(record.status).toBe('待修复');
    });

    it('已有 id 的旧记录应保留原 id', () => {
      const legacyRecords = [
        { id: 'custom-id-123', patient: '赵六', tooth: '36', shade: 'A3' },
      ];
      setLegacyData(DATA_CATEGORIES.records, legacyRecords);

      const result = loadUnifiedData(mockAppConfig);

      expect(result.data.data.records[0].id).toBe('custom-id-123');
    });

    it('迁移后应清除旧 key，并写入统一存储', () => {
      const legacyRecords = [
        { patient: '测试患者', tooth: '11', shade: 'A1' },
      ];
      setLegacyData(DATA_CATEGORIES.records, legacyRecords);
      setLegacyData(DATA_CATEGORIES.patients, [{ name: '测试患者' }]);

      loadUnifiedData(mockAppConfig);

      expect(localStorage.getItem(LEGACY_KEYS[DATA_CATEGORIES.records])).toBeNull();
      expect(localStorage.getItem(LEGACY_KEYS[DATA_CATEGORIES.patients])).toBeNull();
      expect(localStorage.getItem(UNIFIED_STORAGE_KEY)).not.toBeNull();
    });

    it('迁移日志应记录各分类的迁移状态', () => {
      const legacyRecords = [
        { patient: '测试患者', tooth: '11', shade: 'A1' },
      ];
      setLegacyData(DATA_CATEGORIES.records, legacyRecords);

      const result = loadUnifiedData(mockAppConfig);

      const recordsLog = result.migrationLog.find(l => l.category === DATA_CATEGORIES.records);
      expect(recordsLog).toBeDefined();
      expect(recordsLog.action).toBe('migrated');

      const patientsLog = result.migrationLog.find(l => l.category === DATA_CATEGORIES.patients);
      expect(patientsLog).toBeDefined();
      expect(patientsLog.action).toBe('initialized');
    });

    it('多次调用 loadUnifiedData 不应重复迁移', () => {
      const legacyRecords = [
        { patient: '测试患者', tooth: '11', shade: 'A1' },
      ];
      setLegacyData(DATA_CATEGORIES.records, legacyRecords);

      const first = loadUnifiedData(mockAppConfig);
      const second = loadUnifiedData(mockAppConfig);

      expect(first.migrated).toBe(true);
      expect(second.migrated).toBe(false);
      expect(second.data.data.records).toHaveLength(1);
    });
  });

  describe('损坏数据恢复 - 无效 JSON 恢复默认值', () => {
    it('旧 key 数据为无效 JSON 时，应恢复为默认值并记录 recoveryLog', () => {
      setLegacyRaw(DATA_CATEGORIES.records, '{invalid json [}');

      const result = loadUnifiedData(mockAppConfig);

      expect(result.data.data.records).toHaveLength(mockAppConfig.seed.length);
      expect(result.data.data.records[0].patient).toBe('种子患者');

      const recovery = result.recoveryLog.find(l => l.category === DATA_CATEGORIES.records);
      expect(recovery).toBeDefined();
      expect(recovery.action).toBe('recovered');
      expect(recovery.error).toBeDefined();
    });

    it('统一存储数据为无效 JSON 时，应重新从旧数据迁移或初始化', () => {
      localStorage.setItem(UNIFIED_STORAGE_KEY, '{corrupted data!!!');
      setLegacyData(DATA_CATEGORIES.records, [
        { patient: '迁移后患者', tooth: '21', shade: 'B2' },
      ]);

      const result = loadUnifiedData(mockAppConfig);

      expect(result.migrated).toBe(true);
      expect(result.data.data.records).toHaveLength(1);
      expect(result.data.data.records[0].patient).toBe('迁移后患者');
    });

    it('统一存储中某分类数据类型错误时，verifyAndRecover 应恢复该分类为默认值', () => {
      const validUnified = {
        schemaVersion: CURRENT_SCHEMA_VERSION,
        migratedAt: '2026-06-15T00:00:00.000Z',
        data: {
          records: [{ id: 'r1', patient: '患者A', tooth: '11' }],
          patients: '不是数组',
          shadeLibrary: [{ code: 'A1' }],
          photoProcesses: [],
          deliveryOrders: [],
          qcCheckItems: [{ key: 'item1' }],
          qcRecords: [],
          collab: { currentDeviceId: 'tablet-1' },
          collabTimeline: [],
        },
        migrationLog: [],
        recoveryLog: [],
      };
      setUnifiedData(validUnified);

      const result = loadUnifiedData(mockAppConfig);

      expect(Array.isArray(result.data.data.patients)).toBe(true);
      expect(result.data.data.patients).toHaveLength(mockAppConfig.patientSeed.length);
      expect(result.data.data.records).toHaveLength(1);
      expect(result.data.data.records[0].patient).toBe('患者A');

      const recovery = result.recoveryLog.find(l => l.category === DATA_CATEGORIES.patients);
      expect(recovery).toBeDefined();
      expect(recovery.action).toBe('recovered');
    });

    it('collab 分类类型错误时应恢复为默认对象', () => {
      const validUnified = {
        schemaVersion: CURRENT_SCHEMA_VERSION,
        migratedAt: '2026-06-15T00:00:00.000Z',
        data: {
          records: [],
          patients: [],
          shadeLibrary: [],
          photoProcesses: [],
          deliveryOrders: [],
          qcCheckItems: [],
          qcRecords: [],
          collab: '不是对象',
          collabTimeline: [],
        },
        migrationLog: [],
        recoveryLog: [],
      };
      setUnifiedData(validUnified);

      const result = loadUnifiedData(mockAppConfig);

      expect(typeof result.data.data.collab).toBe('object');
      expect(result.data.data.collab).not.toBeNull();
      expect(result.data.data.collab.currentDeviceId).toBe('tablet-1');
    });

    it('缺失某分类时应补全默认值', () => {
      const partialData = {
        schemaVersion: CURRENT_SCHEMA_VERSION,
        migratedAt: '2026-06-15T00:00:00.000Z',
        data: {
          records: [],
        },
        migrationLog: [],
        recoveryLog: [],
      };
      setUnifiedData(partialData);

      const result = loadUnifiedData(mockAppConfig);

      expect(result.data.data.patients).toBeDefined();
      expect(result.data.data.shadeLibrary).toBeDefined();
      expect(result.data.data.qcRecords).toBeDefined();
      expect(result.data.data.collab).toBeDefined();
    });
  });

  describe('qcRecords 按 qcCheckItems 补齐缺失字段', () => {
    it('loadUnifiedData 时自动归一化 qcRecords 中的 items', () => {
      const unifiedData = {
        schemaVersion: CURRENT_SCHEMA_VERSION,
        migratedAt: '2026-06-15T00:00:00.000Z',
        data: {
          records: [],
          patients: [],
          shadeLibrary: [],
          photoProcesses: [],
          deliveryOrders: [],
          qcCheckItems: mockAppConfig.qcCheckItems.map(ci => ({ ...ci })),
          qcRecords: [
            {
              id: 'qc-1',
              recordId: 'rec-1',
              items: {
                item1: { checked: true, remark: '已检查', checkedAt: '2026-06-15T09:00:00.000Z' },
              },
              createdAt: '2026-06-15T00:00:00.000Z',
              updatedAt: '2026-06-15T00:00:00.000Z',
            },
          ],
          collab: { currentDeviceId: 'tablet-1' },
          collabTimeline: [],
        },
        migrationLog: [],
        recoveryLog: [],
      };
      setUnifiedData(unifiedData);

      const result = loadUnifiedData(mockAppConfig);
      const qcRecord = result.data.data.qcRecords[0];

      expect(qcRecord.items).toHaveProperty('item1');
      expect(qcRecord.items.item1.checked).toBe(true);
      expect(qcRecord.items).toHaveProperty('item2');
      expect(qcRecord.items.item2.checked).toBe(false);
      expect(qcRecord.items).toHaveProperty('item3');
      expect(qcRecord.items.item3.checked).toBe(false);
      expect(Object.keys(qcRecord.items).length).toBe(3);
    });

    it('qcRecords 中完全没有 items 时应补全全部默认项', () => {
      const unifiedData = {
        schemaVersion: CURRENT_SCHEMA_VERSION,
        migratedAt: '2026-06-15T00:00:00.000Z',
        data: {
          records: [],
          patients: [],
          shadeLibrary: [],
          photoProcesses: [],
          deliveryOrders: [],
          qcCheckItems: mockAppConfig.qcCheckItems.map(ci => ({ ...ci })),
          qcRecords: [
            {
              id: 'qc-2',
              recordId: 'rec-2',
              createdAt: '2026-06-15T00:00:00.000Z',
            },
          ],
          collab: { currentDeviceId: 'tablet-1' },
          collabTimeline: [],
        },
        migrationLog: [],
        recoveryLog: [],
      };
      setUnifiedData(unifiedData);

      const result = loadUnifiedData(mockAppConfig);
      const qcRecord = result.data.data.qcRecords[0];

      expect(qcRecord.items).toBeDefined();
      expect(Object.keys(qcRecord.items).length).toBe(3);
      expect(qcRecord.items.item1.checked).toBe(false);
      expect(qcRecord.items.item2.checked).toBe(false);
      expect(qcRecord.items.item3.checked).toBe(false);
    });

    it('qcCheckItems 新增项目后，已有 qcRecords 应自动补齐新项', () => {
      const oldCheckItems = [
        { key: 'item1', label: '检查项1', icon: 'ClipboardList', requiredFor: [], description: '', order: 1, critical: true },
      ];
      const unifiedData = {
        schemaVersion: CURRENT_SCHEMA_VERSION,
        migratedAt: '2026-06-15T00:00:00.000Z',
        data: {
          records: [],
          patients: [],
          shadeLibrary: [],
          photoProcesses: [],
          deliveryOrders: [],
          qcCheckItems: mockAppConfig.qcCheckItems.map(ci => ({ ...ci })),
          qcRecords: [
            {
              id: 'qc-old',
              recordId: 'rec-old',
              items: normalizeQcItems({ item1: { checked: true } }, oldCheckItems),
              createdAt: '2026-06-15T00:00:00.000Z',
              updatedAt: '2026-06-15T00:00:00.000Z',
            },
          ],
          collab: { currentDeviceId: 'tablet-1' },
          collabTimeline: [],
        },
        migrationLog: [],
        recoveryLog: [],
      };
      setUnifiedData(unifiedData);

      const result = loadUnifiedData(mockAppConfig);
      const qcRecord = result.data.data.qcRecords[0];

      expect(qcRecord.items.item1.checked).toBe(true);
      expect(qcRecord.items).toHaveProperty('item2');
      expect(qcRecord.items.item2.checked).toBe(false);
      expect(qcRecord.items).toHaveProperty('item3');
      expect(qcRecord.items.item3.checked).toBe(false);
    });

    it('归一化后 qcRecords 应保留 updatedAt，缺失时补上', () => {
      const unifiedData = {
        schemaVersion: CURRENT_SCHEMA_VERSION,
        migratedAt: '2026-06-15T00:00:00.000Z',
        data: {
          records: [],
          patients: [],
          shadeLibrary: [],
          photoProcesses: [],
          deliveryOrders: [],
          qcCheckItems: mockAppConfig.qcCheckItems.map(ci => ({ ...ci })),
          qcRecords: [
            {
              id: 'qc-no-update',
              recordId: 'rec-x',
              items: {},
              createdAt: '2026-06-15T00:00:00.000Z',
            },
          ],
          collab: { currentDeviceId: 'tablet-1' },
          collabTimeline: [],
        },
        migrationLog: [],
        recoveryLog: [],
      };
      setUnifiedData(unifiedData);

      const result = loadUnifiedData(mockAppConfig);
      const qcRecord = result.data.data.qcRecords[0];

      expect(qcRecord.updatedAt).toBeDefined();
      expect(typeof qcRecord.updatedAt).toBe('string');
    });
  });

  describe('saveCategory - 只更新目标分类', () => {
    it('saveCategory 应只修改指定分类，不影响其他分类', () => {
      const initialUnified = {
        schemaVersion: CURRENT_SCHEMA_VERSION,
        migratedAt: '2026-06-15T00:00:00.000Z',
        data: {
          records: [{ id: 'r1', patient: '原记录', tooth: '11' }],
          patients: [{ id: 'p1', name: '原患者' }],
          shadeLibrary: [{ code: 'A1' }],
          photoProcesses: [],
          deliveryOrders: [],
          qcCheckItems: [{ key: 'item1' }],
          qcRecords: [],
          collab: { currentDeviceId: 'tablet-1' },
          collabTimeline: [],
        },
        migrationLog: [],
        recoveryLog: [],
      };
      setUnifiedData(initialUnified);

      const newRecords = [
        { id: 'r1', patient: '更新后记录', tooth: '21' },
        { id: 'r2', patient: '新增记录', tooth: '36' },
      ];
      saveCategory(DATA_CATEGORIES.records, newRecords, mockAppConfig);

      const saved = getUnifiedData();
      expect(saved.data.records).toHaveLength(2);
      expect(saved.data.records[0].patient).toBe('更新后记录');
      expect(saved.data.patients).toHaveLength(1);
      expect(saved.data.patients[0].name).toBe('原患者');
      expect(saved.data.shadeLibrary).toHaveLength(1);
      expect(saved.data.collab.currentDeviceId).toBe('tablet-1');
    });

    it('saveCategory 在统一存储不存在时应创建默认结构并写入指定分类', () => {
      clearAllStorage();

      const newPatients = [
        { id: 'p-new', name: '新患者', phone: '13900000000' },
      ];
      saveCategory(DATA_CATEGORIES.patients, newPatients, mockAppConfig);

      const saved = getUnifiedData();
      expect(saved).not.toBeNull();
      expect(saved.schemaVersion).toBe(CURRENT_SCHEMA_VERSION);
      expect(saved.data.patients).toHaveLength(1);
      expect(saved.data.patients[0].name).toBe('新患者');
      expect(saved.data.records).toBeDefined();
      expect(saved.data.collab).toBeDefined();
    });

    it('saveCategory 在统一存储损坏时应重建并写入指定分类', () => {
      localStorage.setItem(UNIFIED_STORAGE_KEY, 'bad json{{{');

      const newRecords = [
        { id: 'r-recovery', patient: '恢复后患者', tooth: '11' },
      ];
      saveCategory(DATA_CATEGORIES.records, newRecords, mockAppConfig);

      const saved = getUnifiedData();
      expect(saved).not.toBeNull();
      expect(saved.data.records).toHaveLength(1);
      expect(saved.data.records[0].patient).toBe('恢复后患者');
    });

    it('连续 saveCategory 不同分类应互不干扰', () => {
      const initialUnified = {
        schemaVersion: CURRENT_SCHEMA_VERSION,
        migratedAt: '2026-06-15T00:00:00.000Z',
        data: {
          records: [],
          patients: [],
          shadeLibrary: [],
          photoProcesses: [],
          deliveryOrders: [],
          qcCheckItems: [],
          qcRecords: [],
          collab: { currentDeviceId: 'tablet-1' },
          collabTimeline: [],
        },
        migrationLog: [],
        recoveryLog: [],
      };
      setUnifiedData(initialUnified);

      saveCategory(DATA_CATEGORIES.records, [{ id: 'r1', patient: 'A' }], mockAppConfig);
      saveCategory(DATA_CATEGORIES.patients, [{ id: 'p1', name: 'B' }], mockAppConfig);
      saveCategory(DATA_CATEGORIES.qcRecords, [{ id: 'q1', recordId: 'r1', items: {} }], mockAppConfig);

      const saved = getUnifiedData();
      expect(saved.data.records).toHaveLength(1);
      expect(saved.data.records[0].patient).toBe('A');
      expect(saved.data.patients).toHaveLength(1);
      expect(saved.data.patients[0].name).toBe('B');
      expect(saved.data.qcRecords).toHaveLength(1);
      expect(saved.data.qcRecords[0].id).toBe('q1');
    });
  });

  describe('辅助函数与边界情况', () => {
    it('getDefaultForCategory 应返回对应分类的默认值', () => {
      const recordsDefault = getDefaultForCategory(DATA_CATEGORIES.records, mockAppConfig);
      const patientsDefault = getDefaultForCategory(DATA_CATEGORIES.patients, mockAppConfig);
      const collabDefault = getDefaultForCategory(DATA_CATEGORIES.collab, mockAppConfig);

      expect(Array.isArray(recordsDefault)).toBe(true);
      expect(recordsDefault.length).toBeGreaterThan(0);
      expect(Array.isArray(patientsDefault)).toBe(true);
      expect(typeof collabDefault).toBe('object');
      expect(collabDefault.currentDeviceId).toBe('tablet-1');
    });

    it('getDataStatus 应返回正确的数据状态', () => {
      const result = loadUnifiedData(mockAppConfig);
      const status = getDataStatus(mockAppConfig);

      expect(status.hasUnifiedData).toBe(true);
      expect(status.schemaVersion).toBe(CURRENT_SCHEMA_VERSION);
      expect(status.currentSchemaVersion).toBe(CURRENT_SCHEMA_VERSION);
      expect(status.categoryCounts).toBeDefined();
      expect(status.categoryCounts.records).toBe(mockAppConfig.seed.length);
    });

    it('shallowEqual 应正确比较浅层次对象', () => {
      expect(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
      expect(shallowEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
      expect(shallowEqual(null, undefined)).toBe(false);
      expect(shallowEqual(null, null)).toBe(true);
      expect(shallowEqual({ a: {} }, { a: {} })).toBe(false);
    });

    it('clearMigrationAndRecoveryLogs 应清空日志', () => {
      loadUnifiedData(mockAppConfig);
      clearMigrationAndRecoveryLogs(mockAppConfig);

      const status = getDataStatus(mockAppConfig);
      expect(status.migrationLog).toHaveLength(0);
      expect(status.recoveryLog).toHaveLength(0);
    });
  });
});
