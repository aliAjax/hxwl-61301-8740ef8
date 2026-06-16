import { useState } from 'react';
import {
  clearMigrationAndRecoveryLogs,
  loadUnifiedData,
} from '../dataStore';

function getLocalDateString(d = new Date()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function useDataManagement({
  appConfig,
  records,
  patients,
  shadeLibrary,
  photoProcesses,
  deliveryOrders,
  qcCheckItems,
  qcRecords,
  collabTimeline,
  persistRecords,
  persistPatients,
  persistShadeLibrary,
  persistPhotoProcesses,
  persistDeliveryOrders,
  persistQcCheckItems,
  persistQcRecords,
  persistCollabTimeline,
  setCollabTimeline,
}) {
  const [importPreview, setImportPreview] = useState(null);
  const [importFileName, setImportFileName] = useState('');
  const [dataMigrationLog, setDataMigrationLog] = useState([]);
  const [dataRecoveryLog, setDataRecoveryLog] = useState([]);
  const [showMigrationNotice, setShowMigrationNotice] = useState(false);
  const [showRecoveryNotice, setShowRecoveryNotice] = useState(false);
  const [dataInitialized, setDataInitialized] = useState(false);

  function initializeData() {
    const result = loadUnifiedData(appConfig);
    const data = result.data.data;

    setDataMigrationLog(result.migrationLog);
    setDataRecoveryLog(result.recoveryLog);

    if (result.migrationLog.length > 0) {
      setShowMigrationNotice(true);
    }
    if (result.recoveryLog.length > 0) {
      setShowRecoveryNotice(true);
    }

    setDataInitialized(true);

    return {
      data,
      migrationLog: result.migrationLog,
      recoveryLog: result.recoveryLog,
      migrated: result.migrated,
    };
  }

  function exportData() {
    const exportObj = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      records: records,
      patients: patients,
      shadeLibrary: shadeLibrary,
      photoProcesses: photoProcesses,
      deliveryOrders: deliveryOrders,
      qcCheckItems: qcCheckItems,
      qcRecords: qcRecords,
      collabTimeline: collabTimeline,
      meta: {
        recordCount: records.length,
        patientCount: patients.length,
        shadeCount: shadeLibrary.length,
        photoProcessCount: photoProcesses.length,
        deliveryOrderCount: deliveryOrders.length,
        qcCheckItemCount: qcCheckItems.length,
        qcRecordCount: qcRecords.length,
        collabTimelineCount: collabTimeline.length,
      }
    };
    const jsonStr = JSON.stringify(exportObj, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const dateStr = getLocalDateString().replace(/-/g, '');
    a.download = `dental-full-backup-${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function analyzeImportData(importData) {
    const existingRecordIds = new Set(records.map(r => r.id));
    const existingPatientIds = new Set(patients.map(p => p.id));
    const existingPatientNames = new Set(patients.map(p => p.name));
    const existingShadeCodes = new Set(shadeLibrary.map(s => s.code));
    const existingPhotoProcessIds = new Set(photoProcesses.map(p => p.id));
    const existingDeliveryOrderIds = new Set(deliveryOrders.map(d => d.id));
    const existingQcRecordIds = new Set(qcRecords.map(q => q.id));
    const existingQcCheckItemKeys = new Set(qcCheckItems.map(c => c.key));
    const existingCollabTimelineIds = new Set(collabTimeline.map(t => t.id));

    const importRecords = importData.records || [];
    const importPatients = importData.patients || [];
    const importShadeLibrary = importData.shadeLibrary || [];
    const importPhotoProcesses = importData.photoProcesses || [];
    const importDeliveryOrders = importData.deliveryOrders || [];
    const importQcCheckItems = importData.qcCheckItems || [];
    const importQcRecords = importData.qcRecords || [];
    const importCollabTimeline = importData.collabTimeline || [];

    const duplicateRecordIds = importRecords.filter(r => existingRecordIds.has(r.id)).map(r => r.id);
    const newRecords = importRecords.filter(r => !existingRecordIds.has(r.id));
    const overwrittenRecords = importRecords.filter(r => existingRecordIds.has(r.id));

    const duplicatePatientIds = importPatients.filter(p => existingPatientIds.has(p.id)).map(p => p.id);
    const duplicatePatientNames = importPatients.filter(p => existingPatientNames.has(p.name)).map(p => p.name);
    const newPatients = importPatients.filter(p => !existingPatientIds.has(p.id));
    const overwrittenPatients = importPatients.filter(p => existingPatientIds.has(p.id));

    const newShades = importShadeLibrary.filter(s => !existingShadeCodes.has(s.code));
    const overwrittenShades = importShadeLibrary.filter(s => existingShadeCodes.has(s.code));

    const newPhotoProcesses = importPhotoProcesses.filter(p => !existingPhotoProcessIds.has(p.id));
    const overwrittenPhotoProcesses = importPhotoProcesses.filter(p => existingPhotoProcessIds.has(p.id));

    const newDeliveryOrders = importDeliveryOrders.filter(d => !existingDeliveryOrderIds.has(d.id));
    const overwrittenDeliveryOrders = importDeliveryOrders.filter(d => existingDeliveryOrderIds.has(d.id));

    const newQcCheckItems = importQcCheckItems.filter(c => !existingQcCheckItemKeys.has(c.key));
    const overwrittenQcCheckItems = importQcCheckItems.filter(c => existingQcCheckItemKeys.has(c.key));

    const newQcRecords = importQcRecords.filter(q => !existingQcRecordIds.has(q.id));
    const overwrittenQcRecords = importQcRecords.filter(q => existingQcRecordIds.has(q.id));
    const skippedQcRecords = importQcRecords.filter(q => {
      if (!q.recordId) return false;
      const localRecordExists = existingRecordIds.has(q.recordId) || newRecords.some(r => r.id === q.recordId);
      return !localRecordExists;
    });

    const newCollabTimeline = importCollabTimeline.filter(t => !existingCollabTimelineIds.has(t.id));
    const skippedCollabTimeline = importCollabTimeline.filter(t => existingCollabTimelineIds.has(t.id));

    return {
      totalRecords: importRecords.length,
      totalPatients: importPatients.length,
      totalShades: importShadeLibrary.length,
      totalPhotoProcesses: importPhotoProcesses.length,
      totalDeliveryOrders: importDeliveryOrders.length,
      totalQcCheckItems: importQcCheckItems.length,
      totalQcRecords: importQcRecords.length,
      totalCollabTimeline: importCollabTimeline.length,
      newRecords: newRecords.length,
      overwrittenRecords: overwrittenRecords.length,
      skippedRecords: 0,
      duplicateRecordIds,
      newPatients: newPatients.length,
      overwrittenPatients: overwrittenPatients.length,
      skippedPatients: 0,
      duplicatePatientIds,
      duplicatePatientNames,
      newShades: newShades.length,
      overwrittenShades: overwrittenShades.length,
      skippedShades: 0,
      newPhotoProcesses: newPhotoProcesses.length,
      overwrittenPhotoProcesses: overwrittenPhotoProcesses.length,
      skippedPhotoProcesses: 0,
      newDeliveryOrders: newDeliveryOrders.length,
      overwrittenDeliveryOrders: overwrittenDeliveryOrders.length,
      skippedDeliveryOrders: 0,
      newQcCheckItems: newQcCheckItems.length,
      overwrittenQcCheckItems: overwrittenQcCheckItems.length,
      skippedQcCheckItems: 0,
      newQcRecords: newQcRecords.length,
      overwrittenQcRecords: overwrittenQcRecords.length,
      skippedQcRecords: skippedQcRecords.length,
      newCollabTimeline: newCollabTimeline.length,
      overwrittenCollabTimeline: 0,
      skippedCollabTimeline: skippedCollabTimeline.length,
      importData
    };
  }

  function handleImportFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result;
        if (typeof content !== 'string') throw new Error('文件格式错误');
        const data = JSON.parse(content);
        const hasData = data.records || data.patients || data.shadeLibrary
          || data.photoProcesses || data.deliveryOrders || data.qcCheckItems
          || data.qcRecords || data.collabTimeline;
        if (!hasData) {
          throw new Error('未找到有效的备份数据');
        }
        const analysis = analyzeImportData(data);
        setImportPreview(analysis);
      } catch (err) {
        alert('导入失败：' + (err.message || '文件格式错误'));
        setImportPreview(null);
        setImportFileName('');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  function confirmImport() {
    if (!importPreview) return;
    const { importData } = importPreview;

    const existingRecordIds = new Set(records.map(r => r.id));
    const existingPatientIds = new Set(patients.map(p => p.id));

    const importRecords = importData.records || [];
    const importPatients = importData.patients || [];
    const importShadeLibrary = importData.shadeLibrary || [];
    const importPhotoProcesses = importData.photoProcesses || [];
    const importDeliveryOrders = importData.deliveryOrders || [];
    const importQcCheckItems = importData.qcCheckItems || [];
    const importQcRecords = importData.qcRecords || [];
    const importCollabTimeline = importData.collabTimeline || [];

    const mergedRecordIds = new Set();
    let mergedRecords = [...records];
    importRecords.forEach(ir => {
      if (existingRecordIds.has(ir.id)) {
        mergedRecords = mergedRecords.map(r => r.id === ir.id ? ir : r);
      } else {
        mergedRecords.push(ir);
      }
      mergedRecordIds.add(ir.id);
    });
    records.forEach(r => mergedRecordIds.add(r.id));

    let mergedPatients = [...patients];
    importPatients.forEach(ip => {
      if (existingPatientIds.has(ip.id)) {
        mergedPatients = mergedPatients.map(p => p.id === ip.id ? ip : p);
      } else {
        mergedPatients.push(ip);
      }
    });

    if (importShadeLibrary.length > 0) {
      const existingShadeCodes = new Set(shadeLibrary.map(s => s.code));
      let mergedShades = [...shadeLibrary];
      importShadeLibrary.forEach(is => {
        if (existingShadeCodes.has(is.code)) {
          mergedShades = mergedShades.map(s => s.code === is.code ? { ...is, order: s.order } : s);
        } else {
          const maxOrder = mergedShades.length > 0 ? Math.max(...mergedShades.map(s => s.order)) : -1;
          mergedShades.push({ ...is, order: maxOrder + 1 });
        }
      });
      persistShadeLibrary(mergedShades);
    }

    if (importPhotoProcesses.length > 0) {
      const existingPhotoProcessIds = new Set(photoProcesses.map(p => p.id));
      let mergedPhotoProcesses = [...photoProcesses];
      importPhotoProcesses.forEach(ipp => {
        if (existingPhotoProcessIds.has(ipp.id)) {
          mergedPhotoProcesses = mergedPhotoProcesses.map(p => p.id === ipp.id ? ipp : p);
        } else {
          mergedPhotoProcesses.push(ipp);
        }
      });
      persistPhotoProcesses(mergedPhotoProcesses);
    }

    if (importDeliveryOrders.length > 0) {
      const existingDeliveryOrderIds = new Set(deliveryOrders.map(d => d.id));
      let mergedDeliveryOrders = [...deliveryOrders];
      importDeliveryOrders.forEach(ido => {
        if (existingDeliveryOrderIds.has(ido.id)) {
          mergedDeliveryOrders = mergedDeliveryOrders.map(d => d.id === ido.id ? ido : d);
        } else {
          mergedDeliveryOrders.push(ido);
        }
      });
      persistDeliveryOrders(mergedDeliveryOrders);
    }

    if (importQcCheckItems.length > 0) {
      const existingQcCheckItemKeys = new Set(qcCheckItems.map(c => c.key));
      let mergedQcCheckItems = [...qcCheckItems];
      importQcCheckItems.forEach(ici => {
        if (existingQcCheckItemKeys.has(ici.key)) {
          mergedQcCheckItems = mergedQcCheckItems.map(c => c.key === ici.key ? { ...c, ...ici, order: c.order } : c);
        } else {
          const maxOrder = mergedQcCheckItems.length > 0 ? Math.max(...mergedQcCheckItems.map(c => c.order || 0)) : 0;
          mergedQcCheckItems.push({ ...ici, order: ici.order ?? (maxOrder + 1) });
        }
      });
      persistQcCheckItems(mergedQcCheckItems);
    }

    if (importQcRecords.length > 0) {
      const existingQcRecordIds = new Set(qcRecords.map(q => q.id));
      let mergedQcRecords = [...qcRecords];
      importQcRecords.forEach(iqr => {
        if (!iqr.recordId || !mergedRecordIds.has(iqr.recordId)) return;
        if (existingQcRecordIds.has(iqr.id)) {
          mergedQcRecords = mergedQcRecords.map(q => q.id === iqr.id ? iqr : q);
        } else {
          mergedQcRecords.push(iqr);
        }
      });
      persistQcRecords(mergedQcRecords);
    }

    if (importCollabTimeline.length > 0) {
      const existingCollabTimelineIds = new Set(collabTimeline.map(t => t.id));
      const newTimelineEntries = importCollabTimeline.filter(t => !existingCollabTimelineIds.has(t.id));
      if (newTimelineEntries.length > 0) {
        const mergedTimeline = [...newTimelineEntries, ...collabTimeline];
        setCollabTimeline(mergedTimeline);
        persistCollabTimeline(mergedTimeline);
      }
    }

    persistRecords(mergedRecords);
    persistPatients(mergedPatients);

    const summaryLines = [
      `牙色记录：新增 ${importPreview.newRecords} 条，覆盖 ${importPreview.overwrittenRecords} 条`,
      `患者档案：新增 ${importPreview.newPatients} 人，覆盖 ${importPreview.overwrittenPatients} 人`,
      `色号库：新增 ${importPreview.newShades} 个，覆盖 ${importPreview.overwrittenShades} 个`,
      `拍照流程：新增 ${importPreview.newPhotoProcesses} 个，覆盖 ${importPreview.overwrittenPhotoProcesses} 个`,
      `交接单：新增 ${importPreview.newDeliveryOrders} 份，覆盖 ${importPreview.overwrittenDeliveryOrders} 份`,
      `质控配置：新增 ${importPreview.newQcCheckItems} 项，覆盖 ${importPreview.overwrittenQcCheckItems} 项`,
      `质控记录：新增 ${importPreview.newQcRecords} 条，覆盖 ${importPreview.overwrittenQcRecords} 条，跳过 ${importPreview.skippedQcRecords} 条（关联记录缺失）`,
      `协作时间线：新增 ${importPreview.newCollabTimeline} 条，跳过 ${importPreview.skippedCollabTimeline} 条（ID 重复）`,
    ].filter(l => !l.includes('新增 0') || l.includes('覆盖') || l.includes('跳过'));
    alert(`导入成功！\n${summaryLines.join('\n')}`);
    cancelImport();
  }

  function cancelImport() {
    setImportPreview(null);
    setImportFileName('');
  }

  function clearLogs() {
    clearMigrationAndRecoveryLogs(appConfig);
    setDataMigrationLog([]);
    setDataRecoveryLog([]);
    setShowMigrationNotice(false);
    setShowRecoveryNotice(false);
  }

  function dismissMigrationNotice() {
    setShowMigrationNotice(false);
  }

  function dismissRecoveryNotice() {
    setShowRecoveryNotice(false);
  }

  return {
    importPreview,
    setImportPreview,
    importFileName,
    setImportFileName,
    dataMigrationLog,
    setDataMigrationLog,
    dataRecoveryLog,
    setDataRecoveryLog,
    showMigrationNotice,
    setShowMigrationNotice,
    showRecoveryNotice,
    setShowRecoveryNotice,
    dataInitialized,
    setDataInitialized,
    initializeData,
    exportData,
    analyzeImportData,
    handleImportFile,
    confirmImport,
    cancelImport,
    clearLogs,
    dismissMigrationNotice,
    dismissRecoveryNotice,
  };
}
