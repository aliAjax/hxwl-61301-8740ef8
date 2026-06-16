import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  matchEntities,
  diffEntityFields,
  repairIdReferences,
  detectDuplicatePatients,
  detectOrphanPhotoProcesses,
  shallowEqual,
} from './dataStore';

describe('matchEntities - 实体匹配', () => {
  it('应按患者+牙位匹配 records', () => {
    const local = [
      { id: 'r1', patient: '张三', tooth: '11', shade: 'A2' },
      { id: 'r2', patient: '李四', tooth: '21', shade: 'B1' },
    ];
    const imported = [
      { id: 'r1', patient: '张三', tooth: '11', shade: 'A3' },
      { id: 'r3', patient: '王五', tooth: '36', shade: 'C1' },
    ];

    const result = matchEntities(local, imported, 'records');

    expect(result.matched).toHaveLength(1);
    expect(result.matched[0].local.id).toBe('r1');
    expect(result.matched[0].import.id).toBe('r1');
    expect(result.localOnly).toHaveLength(1);
    expect(result.localOnly[0].id).toBe('r2');
    expect(result.importOnly).toHaveLength(1);
    expect(result.importOnly[0].id).toBe('r3');
  });

  it('应按 id 或 name 匹配 patients', () => {
    const local = [
      { id: 'p1', name: '张三', phone: '13800000001' },
    ];
    const imported = [
      { id: 'p1', name: '张三', phone: '13900000001' },
      { id: 'p2', name: '李四', phone: '13800000002' },
    ];

    const result = matchEntities(local, imported, 'patients');

    expect(result.matched).toHaveLength(1);
    expect(result.matched[0].local.id).toBe('p1');
    expect(result.importOnly).toHaveLength(1);
    expect(result.importOnly[0].name).toBe('李四');
  });

  it('全部无匹配时应归入 localOnly 和 importOnly', () => {
    const local = [{ id: 'r1', patient: '张三', tooth: '11' }];
    const imported = [{ id: 'r2', patient: '李四', tooth: '21' }];

    const result = matchEntities(local, imported, 'records');

    expect(result.matched).toHaveLength(0);
    expect(result.localOnly).toHaveLength(1);
    expect(result.importOnly).toHaveLength(1);
  });

  it('空数组应返回空匹配', () => {
    const result = matchEntities([], [], 'records');
    expect(result.matched).toHaveLength(0);
    expect(result.localOnly).toHaveLength(0);
    expect(result.importOnly).toHaveLength(0);
  });
});

describe('diffEntityFields - 实体字段差异', () => {
  it('应检测出 records 中不同的字段', () => {
    const local = { id: 'r1', patient: '张三', tooth: '11', shade: 'A2' };
    const imported = { id: 'r1', patient: '张三', tooth: '11', shade: 'A3' };

    const diffs = diffEntityFields(local, imported, 'records');

    expect(diffs.length).toBeGreaterThan(0);
    const shadeDiff = diffs.find(d => d.fieldKey === 'shade');
    expect(shadeDiff).toBeDefined();
    expect(shadeDiff.localValue).toBe('A2');
    expect(shadeDiff.importValue).toBe('A3');
  });

  it('完全相同的记录应返回空差异', () => {
    const local = { id: 'r1', patient: '张三', tooth: '11', shade: 'A2' };
    const imported = { id: 'r1', patient: '张三', tooth: '11', shade: 'A2' };

    const diffs = diffEntityFields(local, imported, 'records');
    expect(diffs).toHaveLength(0);
  });

  it('应跳过 id 和 timeline 字段', () => {
    const local = { id: 'r1', patient: '张三', timeline: [{ status: '待修复' }] };
    const imported = { id: 'r1', patient: '张三', timeline: [{ status: '制作中' }] };

    const diffs = diffEntityFields(local, imported, 'records');
    const idDiff = diffs.find(d => d.fieldKey === 'id');
    const timelineDiff = diffs.find(d => d.fieldKey === 'timeline');
    expect(idDiff).toBeUndefined();
    expect(timelineDiff).toBeUndefined();
  });
});

describe('repairIdReferences - ID引用修复', () => {
  it('应修复 photoProcesses 中的 recordId 引用', () => {
    const recordIdMap = new Map([['old-r1', 'new-r1']]);
    const mergedData = {
      photoProcesses: [{ id: 'pp1', recordId: 'old-r1' }],
      qcRecords: [],
      deliveryOrders: [],
    };

    const result = repairIdReferences(mergedData, recordIdMap);

    expect(result.photoProcesses[0].recordId).toBe('new-r1');
  });

  it('应修复 qcRecords 中的 recordId 引用', () => {
    const recordIdMap = new Map([['old-r1', 'new-r1']]);
    const mergedData = {
      photoProcesses: [],
      qcRecords: [{ id: 'qc1', recordId: 'old-r1', items: {} }],
      deliveryOrders: [],
    };

    const result = repairIdReferences(mergedData, recordIdMap);

    expect(result.qcRecords[0].recordId).toBe('new-r1');
  });

  it('应修复 deliveryOrders 中的 recordIds 列表', () => {
    const recordIdMap = new Map([['old-r1', 'new-r1'], ['old-r2', 'new-r2']]);
    const mergedData = {
      photoProcesses: [],
      qcRecords: [],
      deliveryOrders: [{ id: 'do1', recordIds: ['old-r1', 'old-r2', 'unchanged'] }],
    };

    const result = repairIdReferences(mergedData, recordIdMap);

    expect(result.deliveryOrders[0].recordIds).toEqual(['new-r1', 'new-r2', 'unchanged']);
  });

  it('无需修复时应返回原对象', () => {
    const recordIdMap = new Map();
    const mergedData = {
      photoProcesses: [{ id: 'pp1', recordId: 'r1' }],
      qcRecords: [],
      deliveryOrders: [],
    };

    const result = repairIdReferences(mergedData, recordIdMap);

    expect(result.photoProcesses[0].recordId).toBe('r1');
  });
});

describe('detectDuplicatePatients - 重复患者检测', () => {
  it('应检测出同名但不同 id 的患者', () => {
    const local = [{ id: 'p1', name: '张三' }];
    const imported = [{ id: 'p2', name: '张三' }];

    const duplicates = detectDuplicatePatients(local, imported);

    expect(duplicates).toHaveLength(1);
    expect(duplicates[0].reason).toBe('同名患者');
  });

  it('同名且同 id 的患者不应被标记为重复', () => {
    const local = [{ id: 'p1', name: '张三' }];
    const imported = [{ id: 'p1', name: '张三' }];

    const duplicates = detectDuplicatePatients(local, imported);

    expect(duplicates).toHaveLength(0);
  });

  it('不同名称的患者不应被标记', () => {
    const local = [{ id: 'p1', name: '张三' }];
    const imported = [{ id: 'p2', name: '李四' }];

    const duplicates = detectDuplicatePatients(local, imported);

    expect(duplicates).toHaveLength(0);
  });
});

describe('detectOrphanPhotoProcesses - 孤立拍照流程检测', () => {
  it('应检测出关联记录不存在的拍照流程', () => {
    const photoProcesses = [
      { id: 'pp1', recordId: 'r1' },
      { id: 'pp2', recordId: 'r-nonexistent' },
    ];
    const records = [{ id: 'r1' }];

    const orphans = detectOrphanPhotoProcesses(photoProcesses, records);

    expect(orphans).toHaveLength(1);
    expect(orphans[0].id).toBe('pp2');
  });

  it('所有流程都有关联记录时应返回空', () => {
    const photoProcesses = [{ id: 'pp1', recordId: 'r1' }];
    const records = [{ id: 'r1' }];

    const orphans = detectOrphanPhotoProcesses(photoProcesses, records);

    expect(orphans).toHaveLength(0);
  });
});
