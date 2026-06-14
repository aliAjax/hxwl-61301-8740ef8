import { useMemo, useState } from 'react';
import { SmilePlus, Plus, Search, Trash2, RotateCcw, CheckCircle2, AlertTriangle, ClipboardList, CalendarDays, Users, UserPlus, Edit3, Phone, MapPin, AlertCircle, FileText, Palette, Info, X, Save, CalendarCheck, Stethoscope, Camera, User, Sun, CheckSquare, ChevronRight, ChevronLeft, Upload, Image as ImageIcon, ArrowRight, Square, CheckCheck, Send, Package, ArrowLeftRight, Layers, GripVertical, Clock, AlertOctagon, CalendarRange, Download, Database, HardDriveUpload, ShieldCheck, ShieldAlert, Monitor, Tablet, RefreshCw, Copy, Zap, History, GitMerge } from 'lucide-react';
import './App.css';

const appConfig = {
  "id": "hxwl-61301",
  "port": 61301,
  "title": "牙科诊所牙色比色记录",
  "subtitle": "平板优先的患者牙位比色与复诊跟进台账",
  "domain": "牙科诊所",
  "icon": "SmilePlus",
  "storage": "hxwl-61301-dental-shade",
  "patientStorage": "hxwl-61301-patients",
  "shadeLibraryStorage": "hxwl-61301-shade-library",
  "photoProcessStorage": "hxwl-61301-photo-process",
  "deliveryOrderStorage": "hxwl-61301-delivery-orders",
  "qcCheckItemConfigStorage": "hxwl-61301-qc-check-items",
  "qcStorage": "hxwl-61301-qc",
  "collabStorage": "hxwl-61301-collab",
  "collabTimelineStorage": "hxwl-61301-collab-timeline",
  "accent": "#0f766e",
  "devices": [
    { "id": "tablet-1", "name": "诊室A平板", "room": "1号诊室", "color": "#0f766e" },
    { "id": "tablet-2", "name": "诊室B平板", "room": "2号诊室", "color": "#7c3aed" },
    { "id": "tablet-3", "name": "诊室C平板", "room": "3号诊室", "color": "#2563eb" },
    { "id": "tablet-4", "name": "前台Pad", "room": "前台", "color": "#db2777" }
  ],
  "defaultDeviceId": "tablet-1",
  "deliveryOrderStatuses": [
    "待发送",
    "已发送",
    "已回收"
  ],
  "statuses": [
    "待修复",
    "制作中",
    "已完成修复"
  ],
  "primaryStatus": "待修复",
  "fields": [
    {
      "key": "patient",
      "label": "患者姓名",
      "type": "input",
      "placeholder": "林雨",
      "options": []
    },
    {
      "key": "tooth",
      "label": "牙位",
      "type": "select",
      "placeholder": "11",
      "options": [
        "11",
        "12",
        "21",
        "22",
        "36",
        "46"
      ]
    },
    {
      "key": "shade",
      "label": "比色结果",
      "type": "select",
      "placeholder": "A2",
      "options": [
        "A1",
        "A2",
        "A3",
        "B1",
        "B2",
        "C1",
        "D2"
      ]
    },
    {
      "key": "photoNote",
      "label": "拍照备注",
      "type": "textarea",
      "placeholder": "自然光下正面照，颈部略深",
      "options": []
    },
    {
      "key": "followUp",
      "label": "复诊日期",
      "type": "date",
      "placeholder": "",
      "options": []
    }
  ],
  "seed": [
    {
      "id": "lin-yu-11",
      "patient": "林雨",
      "tooth": "11",
      "shade": "A2",
      "photoNote": "自然光下正面照，颈部略深",
      "followUp": "2026-06-13",
      "status": "待修复",
      "deviceId": "tablet-1",
      "lastModified": "2026-06-13T09:15:00.000Z",
      "version": 1
    },
    {
      "id": "zhou-hang-21",
      "patient": "周航",
      "tooth": "21",
      "shade": "B1",
      "photoNote": "临时冠试戴后复拍",
      "followUp": "2026-06-13",
      "status": "制作中",
      "deviceId": "tablet-1",
      "lastModified": "2026-06-13T10:30:00.000Z",
      "version": 2
    },
    {
      "id": "chen-cheng-36",
      "patient": "陈澄",
      "tooth": "36",
      "shade": "A3",
      "photoNote": "后牙咬合面补充照",
      "followUp": "2026-06-14",
      "status": "已完成修复",
      "deviceId": "tablet-1",
      "lastModified": "2026-06-13T14:00:00.000Z",
      "version": 1
    }
  ],
  "patientSeed": [
    {
      "id": "p-lin-yu",
      "name": "林雨",
      "phone": "13800138001",
      "commonTooth": "11, 21",
      "allergyNote": "青霉素过敏",
      "shadeCount": 2
    },
    {
      "id": "p-zhou-hang",
      "name": "周航",
      "phone": "13900139002",
      "commonTooth": "21, 22",
      "allergyNote": "无",
      "shadeCount": 1
    },
    {
      "id": "p-chen-cheng",
      "name": "陈澄",
      "phone": "13700137003",
      "commonTooth": "36, 46",
      "allergyNote": "金属过敏",
      "shadeCount": 3
    }
  ],
  "shadeLibrarySeed": [
    {
      "code": "A1",
      "description": "最浅的A系列色号，呈现明亮的乳白色调，透明度较高。",
      "scenario": "适用于年轻患者、皮肤白皙的患者，或前牙美学修复需求较高的病例。常见于青少年及年轻成年人的天然牙色。",
      "notes": "选色时需注意颈部与切端的色差，建议在自然光下进行比色。瓷修复体烧结后颜色可能略深，比色时可适当偏浅一号。"
    },
    {
      "code": "A2",
      "description": "A系列中最常用的色号，呈现自然的浅黄棕色，是多数人天然牙的平均颜色。",
      "scenario": "适用于大多数成年患者的前后牙修复，是临床最常选择的基准色号。尤其适合中等肤色患者。",
      "notes": "A2色号适用范围广，但仍需结合患者年龄、性别和肤色综合判断。注意与邻牙的协调过渡。"
    },
    {
      "code": "A3",
      "description": "A系列中等偏深的色号，呈现较明显的黄棕色，饱和度适中。",
      "scenario": "适用于中老年患者、肤色偏黄或健康肤色的患者。后牙修复时选用较多，咀嚼功能区的自然色泽。",
      "notes": "后牙修复时可选用A3作为主体色，颈部适当加深以模拟天然牙的色彩渐变。"
    },
    {
      "code": "B1",
      "description": "B系列中最浅的色号，偏冷色调，呈现灰白感，比A1更偏白但饱和度较低。",
      "scenario": "适用于肤色偏冷白的患者，或追求较白修复效果的年轻患者。漂白后牙齿的常见色号。",
      "notes": "B系列色号偏灰，选色时需谨慎，避免修复体显得不自然。建议与A系列色号交叉比对。"
    },
    {
      "code": "B2",
      "description": "B系列中等色号，呈现偏灰的黄棕色，色调较A系列更冷。",
      "scenario": "适用于肤色偏黄偏暗的患者，天然牙偏灰的病例。对于年龄较大、牙齿有磨耗着色的患者较为适用。",
      "notes": "B系列色号在不同光照下色差可能较大，建议在多种光源下比色确认。"
    },
    {
      "code": "C1",
      "description": "C系列浅色号，呈现明显的灰色调，是所有色号中最偏灰的浅色。",
      "scenario": "适用于天然牙偏灰的患者，常见于四环素牙轻度着色、或年龄增长导致的牙齿灰暗。",
      "notes": "灰色调牙齿修复难度较大，可能需要内染色或特殊饰瓷技术。建议制作诊断蜡型或试戴牙片确认效果。"
    },
    {
      "code": "D2",
      "description": "D系列中等色号，呈现偏棕灰色调，介于A系列和C系列之间的色泽。",
      "scenario": "适用于天然牙颜色偏暗偏棕的患者，中老年患者多见。后牙及磨牙区域修复较为常用。",
      "notes": "D系列色号饱和度适中，适合大多数后牙修复。注意与牙龈颜色的协调搭配。"
    }
  ],
  "photoSteps": [
    {
      "key": "front",
      "label": "正面照",
      "icon": "User",
      "description": "拍摄患者正面照片，确保牙齿与比色板清晰可见",
      "placeholder": "请输入正面照备注，如：微笑时露出完整牙列，比色板放置于右侧"
    },
    {
      "key": "side",
      "label": "侧面照",
      "icon": "User",
      "description": "拍摄患者侧面照片，观察咬合关系和牙齿形态",
      "placeholder": "请输入侧面照备注，如：右侧咬合关系，尖牙远中关系"
    },
    {
      "key": "natural",
      "label": "自然光照",
      "icon": "Sun",
      "description": "在自然光线下拍摄，确保颜色还原准确",
      "placeholder": "请输入自然光照射备注，如：窗边自然光上午10点，避免直射"
    },
    {
      "key": "confirm",
      "label": "备注确认",
      "icon": "CheckSquare",
      "description": "确认所有照片和备注信息，完成拍照流程",
      "placeholder": "请输入最终确认备注，如：所有照片已核对，比色结果A2确认无误"
    }
  ],
  "photoEnvironments": [
    "诊室灯光",
    "窗边自然光",
    "户外阴影",
    "无影灯",
    "冷光灯",
    "其他"
  ],
  "metrics": [
    [
      "总记录",
      "records.length"
    ],
    [
      "待处理",
      "records.filter((item) => item.status !== '已完成修复').length"
    ],
    [
      "今日复诊",
      "records.filter((item) => item.followUp === today).length"
    ]
  ],
  "filters": [
    {
      "key": "query",
      "label": "患者搜索",
      "type": "search",
      "match": "(item.patient || '').includes(filters.query)"
    },
    {
      "key": "status",
      "label": "修复状态",
      "type": "status"
    }
  ],
  "cardTitle": "item.patient",
  "cardMeta": "`牙位 ${item.tooth} · ${item.shade}`",
  "cardDetail": "item.photoNote",
  "dateKey": "followUp",
  "note": "先做纯前端版本，适合医生在平板上快速记录。",
  "defaultValues": {
    "patient": "林雨",
    "tooth": "11",
    "shade": "A2",
    "photoNote": "自然光下正面照，颈部略深",
    "followUp": "",
    "status": "待修复"
  },
  "patientDefaultValues": {
    "name": "",
    "phone": "",
    "commonTooth": "",
    "allergyNote": ""
  },
  "photoProcessDefaultValues": {
    "recordId": "",
    "steps": {
      "front": { "remark": "", "environment": "", "confirmed": false, "imageUrl": "" },
      "side": { "remark": "", "environment": "", "confirmed": false, "imageUrl": "" },
      "natural": { "remark": "", "environment": "", "confirmed": false, "imageUrl": "" },
      "confirm": { "remark": "", "environment": "", "confirmed": false, "imageUrl": "" }
    },
    "currentStep": 0,
    "completed": false
  },
  "deliveryOrderDefaultValues": {
    "labName": "",
    "remark": "",
    "recordIds": []
  },
  "deliveryOrderSeed": [
    {
      "id": "do-20260613-001",
      "orderNo": "JJ-20260613-001",
      "labName": "精准义齿技工所",
      "remark": "请加急处理林雨患者的前牙美学修复",
      "recordIds": ["lin-yu-11"],
      "status": "已发送",
      "createdAt": "2026-06-13T09:00:00.000Z",
      "sentAt": "2026-06-13T10:30:00.000Z",
      "receivedAt": null
    }
  ],
  "qcCheckItems": [
    {
      "key": "initialShade",
      "label": "初次比色",
      "icon": "Palette",
      "requiredFor": ["待修复", "制作中", "已完成修复"],
      "description": "完成患者牙位比色，确认色号选择准确",
      "order": 1,
      "critical": true
    },
    {
      "key": "photoConfirm",
      "label": "照片确认",
      "icon": "Camera",
      "requiredFor": ["待修复", "制作中", "已完成修复"],
      "description": "完成拍照流程，确认照片质量符合比色要求",
      "order": 2,
      "critical": true
    },
    {
      "key": "labHandover",
      "label": "技工所交接",
      "icon": "ArrowLeftRight",
      "requiredFor": ["制作中", "已完成修复"],
      "description": "完成与技工所的交接单发送与确认回收",
      "order": 3,
      "critical": true
    },
    {
      "key": "tryOnFeedback",
      "label": "试戴反馈",
      "icon": "Stethoscope",
      "requiredFor": ["已完成修复"],
      "description": "患者试戴修复体，记录反馈意见与调整需求",
      "order": 4,
      "critical": true
    },
    {
      "key": "finalRetake",
      "label": "最终复拍",
      "icon": "CheckCircle2",
      "requiredFor": ["已完成修复"],
      "description": "完成修复后复拍，存档比对照片确认修复效果",
      "order": 5,
      "critical": false
    }
  ],
  "qcDefaultItemValues": {
    "initialShade": { "checked": false, "remark": "", "checkedAt": null },
    "photoConfirm": { "checked": false, "remark": "", "checkedAt": null },
    "labHandover": { "checked": false, "remark": "", "checkedAt": null },
    "tryOnFeedback": { "checked": false, "remark": "", "checkedAt": null },
    "finalRetake": { "checked": false, "remark": "", "checkedAt": null }
  }
};

function getLocalDateString(d = new Date()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const today = getLocalDateString();

function addDays(dateStr, days) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  d.setDate(d.getDate() + days);
  return getLocalDateString(d);
}

function diffDays(dateA, dateB) {
  const [yA, mA, dA] = dateA.split('-').map(Number);
  const [yB, mB, dB] = dateB.split('-').map(Number);
  const a = new Date(yA, mA - 1, dA);
  const b = new Date(yB, mB - 1, dB);
  return Math.round((a - b) / (1000 * 60 * 60 * 24));
}

function getFollowUpStatus(followUp) {
  if (!followUp) return { key: 'none', label: '未排期', class: 'status-none' };
  const diff = diffDays(followUp, today);
  if (diff < 0) return { key: 'overdue', label: '逾期', class: 'status-overdue' };
  if (diff === 0) return { key: 'today', label: '今日', class: 'status-today' };
  if (diff <= 3) return { key: 'soon', label: '即将到期', class: 'status-soon' };
  return { key: 'normal', label: '已排期', class: 'status-normal' };
}

function getNext14Days() {
  const days = [];
  for (let i = 0; i < 14; i++) {
    days.push(addDays(today, i));
  }
  return days;
}

function formatDateLabel(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return {
    date: `${d.getMonth() + 1}/${d.getDate()}`,
    weekday: weekdays[d.getDay()],
    iso: dateStr
  };
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function withIds(items) {
  return items.map((item) => ({
    id: item.id || uid(),
    timeline: item.timeline || [{ status: item.status, at: today, by: '系统' }],
    deviceId: item.deviceId || appConfig.defaultDeviceId,
    lastModified: item.lastModified || new Date().toISOString(),
    version: item.version || 1,
    ...item
  }));
}

function loadCurrentDevice() {
  const raw = localStorage.getItem(appConfig.collabStorage);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      return parsed.currentDeviceId || appConfig.defaultDeviceId;
    } catch {
      return appConfig.defaultDeviceId;
    }
  }
  return appConfig.defaultDeviceId;
}

function loadCollabTimeline() {
  const raw = localStorage.getItem(appConfig.collabTimelineStorage);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }
  return [];
}

function persistCurrentDevice(deviceId) {
  localStorage.setItem(appConfig.collabStorage, JSON.stringify({ currentDeviceId: deviceId }));
}

function persistCollabTimeline(timeline) {
  localStorage.setItem(appConfig.collabTimelineStorage, JSON.stringify(timeline));
}

function getDeviceInfo(deviceId) {
  return appConfig.devices.find(d => d.id === deviceId) || { id: deviceId, name: deviceId, room: '未知', color: '#6b7280' };
}

function formatDateTime(isoStr) {
  try {
    const d = new Date(isoStr);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const h = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${y}-${m}-${day} ${h}:${min}`;
  } catch {
    return isoStr;
  }
}

function detectConflicts(localRecords, importRecords) {
  const conflicts = [];
  const added = [];
  const conflictKeys = new Set();

  importRecords.forEach(importRec => {
    const matchLocal = localRecords.find(lr =>
      lr.patient === importRec.patient && lr.tooth === importRec.tooth
    );
    const key = `${importRec.patient}-${importRec.tooth}`;

    if (matchLocal) {
      const isSameVersion = matchLocal.version === importRec.version &&
        matchLocal.lastModified === importRec.lastModified;
      if (!isSameVersion && !conflictKeys.has(key)) {
        conflictKeys.add(key);
        conflicts.push({
          key,
          patient: importRec.patient,
          tooth: importRec.tooth,
          local: matchLocal,
          import: importRec,
          resolution: null
        });
      }
    } else {
      added.push(importRec);
    }
  });

  return { conflicts, added };
}

function loadRecords() {
  const raw = localStorage.getItem(appConfig.storage);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return withIds(parsed.map((item) => ({
          patient: item.patient || '',
          tooth: item.tooth || '',
          shade: item.shade || '',
          photoNote: item.photoNote || '',
          followUp: item.followUp || '',
          status: item.status || appConfig.primaryStatus,
          ...item
        })));
      }
      return withIds(appConfig.seed);
    } catch {
      return withIds(appConfig.seed);
    }
  }
  return withIds(appConfig.seed);
}

function loadPatients() {
  const raw = localStorage.getItem(appConfig.patientStorage);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return withPatientIds(appConfig.patientSeed);
    }
  }
  return withPatientIds(appConfig.patientSeed);
}

function withPatientIds(patients) {
  return patients.map((p) => ({ id: p.id || uid(), createdAt: new Date().toISOString(), ...p }));
}

function loadShadeLibrary() {
  const raw = localStorage.getItem(appConfig.shadeLibraryStorage);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return appConfig.shadeLibrarySeed;
    }
  }
  return appConfig.shadeLibrarySeed;
}

function loadPhotoProcesses() {
  const raw = localStorage.getItem(appConfig.photoProcessStorage);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }
  return [];
}

function loadDeliveryOrders() {
  const raw = localStorage.getItem(appConfig.deliveryOrderStorage);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return appConfig.deliveryOrderSeed;
    }
  }
  return appConfig.deliveryOrderSeed;
}

function normalizeQcItems(items, checkItems) {
  const ciList = checkItems || appConfig.qcCheckItems;
  const normalized = {};
  ciList.forEach((ci) => {
    if (items && items[ci.key] && typeof items[ci.key] === 'object') {
      normalized[ci.key] = {
        checked: !!items[ci.key].checked,
        remark: items[ci.key].remark || '',
        checkedAt: items[ci.key].checkedAt || null
      };
    } else {
      normalized[ci.key] = { checked: false, remark: '', checkedAt: null };
    }
  });
  return normalized;
}

function loadQcCheckItemConfig() {
  const raw = localStorage.getItem(appConfig.qcCheckItemConfigStorage);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((ci) => ({
          key: ci.key || uid(),
          label: ci.label || '',
          icon: ci.icon || 'ClipboardList',
          requiredFor: Array.isArray(ci.requiredFor) ? ci.requiredFor : [],
          description: ci.description || '',
          order: ci.order ?? 0,
          critical: !!ci.critical
        }));
      }
      return appConfig.qcCheckItems.map((ci) => ({ ...ci }));
    } catch {
      return appConfig.qcCheckItems.map((ci) => ({ ...ci }));
    }
  }
  return appConfig.qcCheckItems.map((ci) => ({ ...ci }));
}

function loadQcRecords(checkItems) {
  const raw = localStorage.getItem(appConfig.qcStorage);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.map((qc) => ({
        id: qc.id || uid(),
        recordId: qc.recordId || '',
        items: normalizeQcItems(qc.items, checkItems),
        createdAt: qc.createdAt || new Date().toISOString(),
        updatedAt: qc.updatedAt || new Date().toISOString()
      }));
    } catch {
      return [];
    }
  }
  return [];
}

function generateOrderNo() {
  const dateStr = getLocalDateString().replace(/-/g, '');
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `JJ-${dateStr}-${random}`;
}

function deliveryOrderStatusClass(status) {
  const index = appConfig.deliveryOrderStatuses.indexOf(status);
  return ['do-status-a', 'do-status-b', 'do-status-c'][index] || 'do-status-a';
}

function createEmptyPhotoProcess(recordId) {
  return {
    id: uid(),
    recordId,
    steps: {
      front: { remark: "", environment: "", confirmed: false, imageUrl: "" },
      side: { remark: "", environment: "", confirmed: false, imageUrl: "" },
      natural: { remark: "", environment: "", confirmed: false, imageUrl: "" },
      confirm: { remark: "", environment: "", confirmed: false, imageUrl: "" }
    },
    currentStep: 0,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

function statusClass(status) {
  const index = appConfig.statuses.indexOf(status);
  return ['status-a', 'status-b', 'status-c', 'status-d'][index] || 'status-a';
}

function toothRecordStatusClass(status) {
  const index = appConfig.statuses.indexOf(status);
  return ['tooth-status-a', 'tooth-status-b', 'tooth-status-c'][index] || '';
}

const ADULT_TOOTH_QUADRANTS = {
  upperRight: ['18', '17', '16', '15', '14', '13', '12', '11'],
  upperLeft: ['21', '22', '23', '24', '25', '26', '27', '28'],
  lowerLeft: ['31', '32', '33', '34', '35', '36', '37', '38'],
  lowerRight: ['48', '47', '46', '45', '44', '43', '42', '41'],
};

function ToothChart({ value, onChange, enabledTeeth, records }) {
  const toothRecordsMap = useMemo(() => {
    const map = {};
    records.forEach((r) => {
      if (r.tooth) {
        if (!map[r.tooth]) {
          map[r.tooth] = [];
        }
        map[r.tooth].push(r);
      }
    });
    return map;
  }, [records]);

  const getToothStatus = (tooth) => {
    const toothRecords = toothRecordsMap[tooth] || [];
    if (toothRecords.length === 0) return null;
    const statusPriority = ['待修复', '制作中', '已完成修复'];
    for (const status of statusPriority) {
      if (toothRecords.some((r) => r.status === status)) return status;
    }
    return toothRecords[0].status;
  };

  const renderTooth = (tooth) => {
    const isEnabled = enabledTeeth.includes(tooth);
    const isSelected = value === tooth;
    const recordStatus = getToothStatus(tooth);
    const statusCls = recordStatus ? toothRecordStatusClass(recordStatus) : '';

    let className = 'tooth-item';
    if (!isEnabled) className += ' tooth-disabled';
    if (isSelected) className += ' tooth-selected';
    if (statusCls) className += ' ' + statusCls;

    return (
      <button
        key={tooth}
        type="button"
        className={className}
        disabled={!isEnabled}
        onClick={() => isEnabled && onChange(tooth)}
        title={recordStatus ? `${tooth} - ${recordStatus} (${toothRecordsMap[tooth].length}条记录)` : tooth}
      >
        <span className="tooth-number">{tooth}</span>
        {recordStatus && <span className="tooth-record-dot" />}
      </button>
    );
  };

  return (
    <div className="tooth-chart">
      <div className="tooth-chart-row">
        <div className="tooth-quadrant">
          {ADULT_TOOTH_QUADRANTS.upperRight.map(renderTooth)}
        </div>
        <div className="tooth-quadrant">
          {ADULT_TOOTH_QUADRANTS.upperLeft.map(renderTooth)}
        </div>
      </div>
      <div className="tooth-midline">
        <span>上颚</span>
        <div className="tooth-midline-line" />
        <span>下颚</span>
      </div>
      <div className="tooth-chart-row">
        <div className="tooth-quadrant">
          {ADULT_TOOTH_QUADRANTS.lowerRight.map(renderTooth)}
        </div>
        <div className="tooth-quadrant">
          {ADULT_TOOTH_QUADRANTS.lowerLeft.map(renderTooth)}
        </div>
      </div>
      <div className="tooth-chart-legend">
        <div className="tooth-legend-item">
          <span className="tooth-legend-swatch tooth-selected" />
          <span>已选中</span>
        </div>
        <div className="tooth-legend-item">
          <span className="tooth-legend-swatch tooth-status-a" />
          <span>待修复</span>
        </div>
        <div className="tooth-legend-item">
          <span className="tooth-legend-swatch tooth-status-b" />
          <span>制作中</span>
        </div>
        <div className="tooth-legend-item">
          <span className="tooth-legend-swatch tooth-status-c" />
          <span>已完成修复</span>
        </div>
        <div className="tooth-legend-item">
          <span className="tooth-legend-swatch tooth-disabled" />
          <span>暂未启用</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('records');
  const [records, setRecords] = useState(loadRecords);
  const [patients, setPatients] = useState(loadPatients);
  const [shadeLibrary, setShadeLibrary] = useState(loadShadeLibrary);
  const [photoProcesses, setPhotoProcesses] = useState(loadPhotoProcesses);
  const [form, setForm] = useState(appConfig.defaultValues);
  const [filters, setFilters] = useState({ query: '', status: '全部' });
  const [selected, setSelected] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientForm, setPatientForm] = useState(appConfig.patientDefaultValues);
  const [editingPatientId, setEditingPatientId] = useState(null);
  const [patientQuery, setPatientQuery] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [editingShade, setEditingShade] = useState(null);
  const [shadeDetailModal, setShadeDetailModal] = useState(null);
  const [editingPhotoProcess, setEditingPhotoProcess] = useState(null);
  const [selectedPhotoProcess, setSelectedPhotoProcess] = useState(null);
  const [photoProcessFilter, setPhotoProcessFilter] = useState('all');
  const [deliveryOrders, setDeliveryOrders] = useState(loadDeliveryOrders);
  const [deliveryOrderForm, setDeliveryOrderForm] = useState(appConfig.deliveryOrderDefaultValues);
  const [selectedDeliveryOrder, setSelectedDeliveryOrder] = useState(null);
  const [deliveryOrderFilter, setDeliveryOrderFilter] = useState('全部');
  const [draggedRecordId, setDraggedRecordId] = useState(null);
  const [dragOverDate, setDragOverDate] = useState(null);
  const [boardSelectedRecord, setBoardSelectedRecord] = useState(null);
  const [editingFollowUpRecordId, setEditingFollowUpRecordId] = useState(null);
  const [boardFilterStatus, setBoardFilterStatus] = useState('全部');
  const [importPreview, setImportPreview] = useState(null);
  const [importFileName, setImportFileName] = useState('');
  const [qcRecords, setQcRecords] = useState(() => {
    const ci = loadQcCheckItemConfig();
    return loadQcRecords(ci);
  });
  const [selectedQcRecord, setSelectedQcRecord] = useState(null);
  const [qcFilter, setQcFilter] = useState('全部');
  const [qcCheckItems, setQcCheckItems] = useState(loadQcCheckItemConfig);
  const [editingQcItem, setEditingQcItem] = useState(null);
  const [showQcConfig, setShowQcConfig] = useState(false);

  const [currentDeviceId, setCurrentDeviceId] = useState(loadCurrentDevice);
  const [collabTimeline, setCollabTimeline] = useState(loadCollabTimeline);
  const [collabConflicts, setCollabConflicts] = useState(null);
  const [collabImportPreview, setCollabImportPreview] = useState(null);
  const [collabImportFileName, setCollabImportFileName] = useState('');
  const [collabSimulateDevice, setCollabSimulateDevice] = useState('tablet-2');
  const [collabForm, setCollabForm] = useState({
    patient: '林雨',
    tooth: '11',
    shade: 'A2',
    photoNote: '',
    followUp: '',
    status: '待修复'
  });

  function persistRecords(next) {
    setRecords(next);
    localStorage.setItem(appConfig.storage, JSON.stringify(next));
  }

  function persistPatients(next) {
    setPatients(next);
    localStorage.setItem(appConfig.patientStorage, JSON.stringify(next));
  }

  function persistShadeLibrary(next) {
    setShadeLibrary(next);
    localStorage.setItem(appConfig.shadeLibraryStorage, JSON.stringify(next));
  }

  function persistPhotoProcesses(next) {
    setPhotoProcesses(next);
    localStorage.setItem(appConfig.photoProcessStorage, JSON.stringify(next));
  }

  function persistDeliveryOrders(next) {
    setDeliveryOrders(next);
    localStorage.setItem(appConfig.deliveryOrderStorage, JSON.stringify(next));
  }

  function persistQcRecords(next) {
    setQcRecords(next);
    localStorage.setItem(appConfig.qcStorage, JSON.stringify(next));
  }

  function persistQcCheckItems(next) {
    setQcCheckItems(next);
    localStorage.setItem(appConfig.qcCheckItemConfigStorage, JSON.stringify(next));
    const migrated = qcRecords.map((qc) => ({
      ...qc,
      items: normalizeQcItems(qc.items, next)
    }));
    persistQcRecords(migrated);
  }

  function saveQcItemConfig(item) {
    if (!item.key || !item.label) return;
    const existing = qcCheckItems.find((ci) => ci.key === item.key);
    let next;
    if (existing) {
      next = qcCheckItems.map((ci) => ci.key === item.key ? item : ci);
    } else {
      next = [...qcCheckItems, { ...item, order: item.order ?? (qcCheckItems.length + 1) }];
    }
    persistQcCheckItems(next);
    setEditingQcItem(null);
  }

  function removeQcItemConfig(key) {
    const next = qcCheckItems.filter((ci) => ci.key !== key);
    persistQcCheckItems(next);
  }

  function resetQcItemConfig() {
    const defaults = appConfig.qcCheckItems.map((ci) => ({ ...ci }));
    persistQcCheckItems(defaults);
  }

  function addCollabTimelineEntry(entry) {
    const newEntry = {
      id: uid(),
      at: new Date().toISOString(),
      ...entry
    };
    const next = [newEntry, ...collabTimeline];
    setCollabTimeline(next);
    persistCollabTimeline(next);
  }

  function addCollabTimelineEntries(entries) {
    if (!entries.length) return;
    const newEntries = entries.map(entry => ({
      id: uid(),
      at: new Date().toISOString(),
      ...entry
    }));
    const next = [...newEntries, ...collabTimeline];
    setCollabTimeline(next);
    persistCollabTimeline(next);
  }

  function switchDevice(deviceId) {
    setCurrentDeviceId(deviceId);
    persistCurrentDevice(deviceId);
    addCollabTimelineEntry({
      type: 'device-switch',
      deviceId,
      title: '切换设备',
      detail: `切换至 ${getDeviceInfo(deviceId).name}（${getDeviceInfo(deviceId).room}）`
    });
  }

  function exportCollabData() {
    const exportObj = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      sourceDeviceId: currentDeviceId,
      sourceDeviceName: getDeviceInfo(currentDeviceId).name,
      records: records.map(r => ({ ...r })),
      patients: patients.map(p => ({ ...p })),
      meta: {
        recordCount: records.length,
        patientCount: patients.length,
      }
    };
    const jsonStr = JSON.stringify(exportObj, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const deviceName = getDeviceInfo(currentDeviceId).name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '');
    const dateStr = getLocalDateString().replace(/-/g, '');
    a.download = `collab-${deviceName}-${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addCollabTimelineEntry({
      type: 'export',
      deviceId: currentDeviceId,
      title: '导出设备数据',
      detail: `从 ${getDeviceInfo(currentDeviceId).name} 导出 ${records.length} 条记录`
    });
  }

  function analyzeCollabImport(importData) {
    const importRecords = importData.records || [];
    const importPatients = importData.patients || [];
    const sourceDeviceId = importData.sourceDeviceId || 'unknown';
    const sourceDeviceName = importData.sourceDeviceName || '未知设备';

    const { conflicts, added } = detectConflicts(records, importRecords);

    const existingPatientIds = new Set(patients.map(p => p.id));
    const newPatients = importPatients.filter(p => !existingPatientIds.has(p.id));

    return {
      sourceDeviceId,
      sourceDeviceName,
      exportedAt: importData.exportedAt,
      totalRecords: importRecords.length,
      totalPatients: importPatients.length,
      conflicts,
      addedRecords: added,
      newPatients,
      importData
    };
  }

  function handleCollabImportFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setCollabImportFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result;
        if (typeof content !== 'string') throw new Error('文件格式错误');
        const data = JSON.parse(content);
        if (!data.records) {
          throw new Error('未找到有效的记录数据');
        }
        const analysis = analyzeCollabImport(data);
        setCollabImportPreview(analysis);
        if (analysis.conflicts.length > 0) {
          setCollabConflicts(analysis.conflicts.map(c => ({ ...c, resolution: 'keepLocal' })));
        } else {
          setCollabConflicts(null);
        }
      } catch (err) {
        alert('导入失败：' + (err.message || '文件格式错误'));
        cancelCollabImport();
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  function setConflictResolution(key, resolution) {
    if (!collabConflicts) return;
    setCollabConflicts(collabConflicts.map(c =>
      c.key === key ? { ...c, resolution } : c
    ));
  }

  function confirmCollabImport() {
    if (!collabImportPreview) return;
    const { importData, sourceDeviceId, sourceDeviceName } = collabImportPreview;

    let mergedRecords = [...records];
    let mergedPatients = [...patients];
    const timelineEntries = [];

    if (collabConflicts && collabConflicts.length > 0) {
      const unresolved = collabConflicts.filter(c => !c.resolution);
      if (unresolved.length > 0) {
        alert('请为所有冲突选择处理方式！');
        return;
      }

      collabConflicts.forEach(conflict => {
        const { local, import: imp, resolution, patient, tooth } = conflict;
        const now = new Date().toISOString();

        if (resolution === 'keepLocal') {
          timelineEntries.push({
            type: 'conflict-resolve-keep',
            deviceId: sourceDeviceId,
            title: '冲突处理：保留本地',
            detail: `${patient} - ${tooth} 牙位，保留本地版本（v${local.version}），忽略导入版本（v${imp.version}）`
          });
          mergedRecords = mergedRecords.map(r => r.id === local.id ? {
            ...r,
            timeline: [...(r.timeline || []), {
              status: `冲突处理：保留本地，忽略${sourceDeviceName}导入`,
              at: today,
              by: '冲突合并'
            }]
          } : r);
        } else if (resolution === 'useImport') {
          timelineEntries.push({
            type: 'conflict-resolve-import',
            deviceId: sourceDeviceId,
            title: '冲突处理：采用导入',
            detail: `${patient} - ${tooth} 牙位，采用${sourceDeviceName}版本（v${imp.version}），覆盖本地版本（v${local.version}）`
          });
          const importedRecord = {
            ...imp,
            id: local.id,
            lastModified: now,
            version: Math.max(local.version || 1, imp.version || 1) + 1,
            timeline: [
              ...(local.timeline || []),
              ...(imp.timeline || []).slice(-2),
              {
                status: `从${sourceDeviceName}合并，覆盖本地数据`,
                at: today,
                by: '冲突合并'
              }
            ]
          };
          mergedRecords = mergedRecords.map(r => r.id === local.id ? importedRecord : r);
        } else if (resolution === 'makeCopy') {
          timelineEntries.push({
            type: 'conflict-resolve-copy',
            deviceId: sourceDeviceId,
            title: '冲突处理：生成副本',
            detail: `${patient} - ${tooth} 牙位，保留本地版本（v${local.version}）并新增${sourceDeviceName}版本（v${imp.version}）作为副本`
          });
          const copyRecord = {
            ...imp,
            id: uid(),
            lastModified: now,
            version: 1,
            timeline: [
              ...(imp.timeline || []),
              {
                status: `从${sourceDeviceName}合并，作为副本保存`,
                at: today,
                by: '冲突合并'
              }
            ]
          };
          mergedRecords.unshift(copyRecord);
        }
      });
    }

    if (collabImportPreview.addedRecords && collabImportPreview.addedRecords.length > 0) {
      const now = new Date().toISOString();
      collabImportPreview.addedRecords.forEach(ar => {
        mergedRecords.unshift({
          ...ar,
          id: uid(),
          lastModified: now,
          version: 1,
          timeline: [
            ...(ar.timeline || []),
            { status: `从${sourceDeviceName}导入新增记录`, at: today, by: '数据合并' }
          ]
        });
      });
      timelineEntries.push({
        type: 'import-added',
        deviceId: sourceDeviceId,
        title: '导入新增记录',
        detail: `从${sourceDeviceName}导入 ${collabImportPreview.addedRecords.length} 条新记录`
      });
    }

    if (collabImportPreview.newPatients && collabImportPreview.newPatients.length > 0) {
      mergedPatients = [...mergedPatients, ...collabImportPreview.newPatients];
      timelineEntries.push({
        type: 'import-patients',
        deviceId: sourceDeviceId,
        title: '导入新增患者',
        detail: `从${sourceDeviceName}导入 ${collabImportPreview.newPatients.length} 位新患者档案`
      });
    }

    persistRecords(mergedRecords);
    persistPatients(mergedPatients);

    addCollabTimelineEntries(timelineEntries);

    const summaryMsg = [
      `导入来源：${sourceDeviceName}`,
      `新增记录：${collabImportPreview.addedRecords?.length || 0} 条`,
      `冲突记录：${collabConflicts?.length || 0} 条`,
      collabConflicts ? ` - 保留本地：${collabConflicts.filter(c => c.resolution === 'keepLocal').length} 条` : '',
      collabConflicts ? ` - 采用导入：${collabConflicts.filter(c => c.resolution === 'useImport').length} 条` : '',
      collabConflicts ? ` - 生成副本：${collabConflicts.filter(c => c.resolution === 'makeCopy').length} 条` : '',
      `新增患者：${collabImportPreview.newPatients?.length || 0} 位`
    ].filter(Boolean).join('\n');
    alert(summaryMsg);

    cancelCollabImport();
  }

  function cancelCollabImport() {
    setCollabImportPreview(null);
    setCollabImportFileName('');
    setCollabConflicts(null);
  }

  function simulateAddRecord() {
    const now = new Date().toISOString();
    const simulatedRecord = {
      id: uid(),
      ...collabForm,
      status: collabForm.status || appConfig.primaryStatus,
      createdAt: now,
      deviceId: collabSimulateDevice,
      lastModified: now,
      version: 1,
      timeline: [{ status: collabForm.status || appConfig.primaryStatus, at: today, by: getDeviceInfo(collabSimulateDevice).name }]
    };
    const simulatedData = {
      version: '2.0',
      exportedAt: now,
      sourceDeviceId: collabSimulateDevice,
      sourceDeviceName: getDeviceInfo(collabSimulateDevice).name,
      records: [simulatedRecord],
      patients: [],
      meta: {
        recordCount: 1,
        patientCount: 0
      }
    };

    const analysis = analyzeCollabImport(simulatedData);
    setCollabImportPreview(analysis);
    if (analysis.conflicts.length > 0) {
      setCollabConflicts(analysis.conflicts.map(c => ({ ...c, resolution: 'keepLocal' })));
    } else {
      setCollabConflicts(null);
    }
    setCollabImportFileName(`模拟-${getDeviceInfo(collabSimulateDevice).name}-1条记录.json`);

    addCollabTimelineEntry({
      type: 'simulate',
      deviceId: collabSimulateDevice,
      title: '模拟设备录入',
      detail: `模拟${getDeviceInfo(collabSimulateDevice).name}录入：${collabForm.patient} ${collabForm.tooth} 牙位，色号${collabForm.shade}`
    });
  }

  function exportData() {
    const exportObj = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      records: records,
      patients: patients,
      meta: {
        recordCount: records.length,
        patientCount: patients.length,
      }
    };
    const jsonStr = JSON.stringify(exportObj, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const dateStr = getLocalDateString().replace(/-/g, '');
    a.download = `dental-shade-export-${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function analyzeImportData(importData) {
    const existingRecordIds = new Set(records.map(r => r.id));
    const existingPatientIds = new Set(patients.map(p => p.id));
    const existingPatientNames = new Set(patients.map(p => p.name));

    const importRecords = importData.records || [];
    const importPatients = importData.patients || [];

    const duplicateRecordIds = importRecords.filter(r => existingRecordIds.has(r.id)).map(r => r.id);
    const newRecords = importRecords.filter(r => !existingRecordIds.has(r.id));
    const overwrittenRecords = importRecords.filter(r => existingRecordIds.has(r.id));

    const duplicatePatientIds = importPatients.filter(p => existingPatientIds.has(p.id)).map(p => p.id);
    const duplicatePatientNames = importPatients.filter(p => existingPatientNames.has(p.name)).map(p => p.name);
    const newPatients = importPatients.filter(p => !existingPatientIds.has(p.id));
    const overwrittenPatients = importPatients.filter(p => existingPatientIds.has(p.id));

    return {
      totalRecords: importRecords.length,
      totalPatients: importPatients.length,
      newRecords: newRecords.length,
      overwrittenRecords: overwrittenRecords.length,
      duplicateRecordIds,
      newPatients: newPatients.length,
      overwrittenPatients: overwrittenPatients.length,
      duplicatePatientIds,
      duplicatePatientNames,
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
        if (!data.records && !data.patients) {
          throw new Error('未找到有效的记录或患者数据');
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

    let mergedRecords = [...records];
    importRecords.forEach(ir => {
      if (existingRecordIds.has(ir.id)) {
        mergedRecords = mergedRecords.map(r => r.id === ir.id ? ir : r);
      } else {
        mergedRecords.push(ir);
      }
    });

    let mergedPatients = [...patients];
    importPatients.forEach(ip => {
      if (existingPatientIds.has(ip.id)) {
        mergedPatients = mergedPatients.map(p => p.id === ip.id ? ip : p);
      } else {
        mergedPatients.push(ip);
      }
    });

    persistRecords(mergedRecords);
    persistPatients(mergedPatients);

    alert(`导入成功！\n新增记录：${importPreview.newRecords} 条，覆盖记录：${importPreview.overwrittenRecords} 条\n新增患者：${importPreview.newPatients} 人，覆盖患者：${importPreview.overwrittenPatients} 人`);
    cancelImport();
  }

  function cancelImport() {
    setImportPreview(null);
    setImportFileName('');
  }

  function getPhotoProcessByRecordId(recordId) {
    return photoProcesses.find((pp) => pp.recordId === recordId) || null;
  }

  function startPhotoProcess(recordId) {
    const existing = getPhotoProcessByRecordId(recordId);
    if (existing) {
      setEditingPhotoProcess({ ...existing });
    } else {
      const newProcess = createEmptyPhotoProcess(recordId);
      setEditingPhotoProcess(newProcess);
    }
  }

  function savePhotoProcess(processData = null) {
    const dataToSave = processData || editingPhotoProcess;
    if (!dataToSave) return;
    const allConfirmed = appConfig.photoSteps.every((s) => dataToSave.steps[s.key]?.confirmed);
    const updated = { ...dataToSave, completed: allConfirmed, updatedAt: new Date().toISOString() };
    const existingIndex = photoProcesses.findIndex((pp) => pp.id === updated.id);
    let next;
    if (existingIndex >= 0) {
      next = photoProcesses.map((pp) => (pp.id === updated.id ? updated : pp));
    } else {
      next = [updated, ...photoProcesses];
    }
    persistPhotoProcesses(next);
    setEditingPhotoProcess(null);
    if (selected?.id === updated.recordId) {
      setSelectedPhotoProcess(updated);
    }
  }

  function updatePhotoProcessStep(stepKey, field, value) {
    if (!editingPhotoProcess) return;
    const next = {
      ...editingPhotoProcess,
      steps: {
        ...editingPhotoProcess.steps,
        [stepKey]: {
          ...editingPhotoProcess.steps[stepKey],
          [field]: value
        }
      },
      updatedAt: new Date().toISOString()
    };
    setEditingPhotoProcess(next);
  }

  function goToStep(stepIndex) {
    if (!editingPhotoProcess) return;
    setEditingPhotoProcess({ ...editingPhotoProcess, currentStep: stepIndex });
  }

  function nextStep() {
    if (!editingPhotoProcess) return;
    const nextIndex = Math.min(editingPhotoProcess.currentStep + 1, appConfig.photoSteps.length - 1);
    setEditingPhotoProcess({ ...editingPhotoProcess, currentStep: nextIndex });
  }

  function prevStep() {
    if (!editingPhotoProcess) return;
    const prevIndex = Math.max(editingPhotoProcess.currentStep - 1, 0);
    setEditingPhotoProcess({ ...editingPhotoProcess, currentStep: prevIndex });
  }

  function handleImageUpload(stepKey, event) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updatePhotoProcessStep(stepKey, 'imageUrl', e.target?.result || '');
      };
      reader.readAsDataURL(file);
    }
  }

  function removeImage(stepKey) {
    updatePhotoProcessStep(stepKey, 'imageUrl', '');
  }

  function getShadeInfo(code) {
    return shadeLibrary.find((s) => s.code === code);
  }

  function editShade(shade) {
    setEditingShade({ ...shade });
  }

  function saveShade() {
    if (!editingShade || !editingShade.code) return;
    const next = shadeLibrary.map((s) =>
      s.code === editingShade.code ? editingShade : s
    );
    persistShadeLibrary(next);
    setEditingShade(null);
  }

  function cancelEditShade() {
    setEditingShade(null);
  }

  function addRecord(event) {
    event.preventDefault();
    const now = new Date().toISOString();
    const nextRecord = {
      id: uid(),
      ...form,
      status: form.status || appConfig.primaryStatus,
      createdAt: now,
      deviceId: currentDeviceId,
      lastModified: now,
      version: 1,
      timeline: [{ status: form.status || appConfig.primaryStatus, at: today, by: '录入' }]
    };

    persistRecords([nextRecord, ...records]);

    if (selectedPatientId) {
      const updatedPatients = patients.map((p) => {
        if (p.id === selectedPatientId) {
          const currentCount = p.shadeCount || 0;
          let commonTooth = p.commonTooth || '';
          const toothList = commonTooth.split(',').map((t) => t.trim()).filter(Boolean);
          if (!toothList.includes(form.tooth) && form.tooth) {
            toothList.push(form.tooth);
            commonTooth = toothList.join(', ');
          }
          return { ...p, shadeCount: currentCount + 1, commonTooth };
        }
        return p;
      });
      persistPatients(updatedPatients);
    }

    setForm(appConfig.defaultValues);
    setSelectedPatientId('');
    setSelected(nextRecord);
  }

  function updateStatus(id, status) {
    const record = records.find((r) => r.id === id);
    if (!record) return;
    const criticalMissing = getCriticalMissingQcItems(id, status);
    const allMissing = getMissingQcItems(id, status);
    if (criticalMissing.length > 0) {
      const labels = criticalMissing.map((m) => m.label).join('、');
      alert(`无法切换至「${status}」：以下关键检查项尚未完成\n\n${labels}\n\n缺少关键步骤不能直接标记完成，请先完成这些检查项。`);
      return;
    }
    if (allMissing.length > 0 && criticalMissing.length === 0) {
      const labels = allMissing.map((m) => m.label).join('、');
      const confirmed = window.confirm(`切换至「${status}」时，以下非关键检查项尚未完成：\n\n${labels}\n\n是否仍然继续？`);
      if (!confirmed) return;
    }
    const next = records.map((item) => item.id === id ? {
      ...item,
      status,
      lastModified: new Date().toISOString(),
      version: (item.version || 1) + 1,
      timeline: [...(item.timeline || []), { status, at: today, by: '操作员' }]
    } : item);
    persistRecords(next);
    if (selected?.id === id) setSelected(next.find((item) => item.id === id));
    if (boardSelectedRecord?.id === id) setBoardSelectedRecord(next.find((item) => item.id === id));
  }

  function updateFollowUpDate(id, newDate) {
    const record = records.find((r) => r.id === id);
    if (!record) return;
    const oldDate = record.followUp || '未排期';
    const next = records.map((item) => item.id === id ? {
      ...item,
      followUp: newDate,
      lastModified: new Date().toISOString(),
      version: (item.version || 1) + 1,
      timeline: [...(item.timeline || []), { status: `复诊日期调整: ${oldDate} → ${newDate}`, at: today, by: '排期调整' }]
    } : item);
    persistRecords(next);
    if (selected?.id === id) setSelected(next.find((item) => item.id === id));
    if (boardSelectedRecord?.id === id) setBoardSelectedRecord(next.find((item) => item.id === id));
  }

  function handleDragStart(e, recordId) {
    setDraggedRecordId(recordId);
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDragOver(e, date) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverDate(date);
  }

  function handleDragLeave() {
    setDragOverDate(null);
  }

  function handleDrop(e, date) {
    e.preventDefault();
    if (draggedRecordId) {
      updateFollowUpDate(draggedRecordId, date);
    }
    setDraggedRecordId(null);
    setDragOverDate(null);
  }

  function handleDragEnd() {
    setDraggedRecordId(null);
    setDragOverDate(null);
  }

  function removeRecord(id) {
    const next = records.filter((item) => item.id !== id);
    persistRecords(next);
    const nextPhotoProcesses = photoProcesses.filter((pp) => pp.recordId !== id);
    if (nextPhotoProcesses.length !== photoProcesses.length) {
      persistPhotoProcesses(nextPhotoProcesses);
    }
    const nextQcRecords = qcRecords.filter((qc) => qc.recordId !== id);
    if (nextQcRecords.length !== qcRecords.length) {
      persistQcRecords(nextQcRecords);
    }
    if (selected?.id === id) setSelected(null);
    if (selectedPhotoProcess?.recordId === id) setSelectedPhotoProcess(null);
    if (selectedQcRecord?.recordId === id) setSelectedQcRecord(null);
  }

  function duplicateRecord(item) {
    const now = new Date().toISOString();
    const copied = {
      ...item,
      id: uid(),
      status: appConfig.primaryStatus,
      deviceId: currentDeviceId,
      lastModified: now,
      version: 1,
      timeline: [{ status: appConfig.primaryStatus, at: today, by: '复制' }]
    };
    persistRecords([copied, ...records]);
    setSelected(copied);
  }

  function getQcByRecordId(recordId) {
    return qcRecords.find((qc) => qc.recordId === recordId) || null;
  }

  function ensureQcForRecord(recordId) {
    const existing = getQcByRecordId(recordId);
    if (existing) return existing;
    const newQc = {
      id: uid(),
      recordId,
      items: normalizeQcItems(null, qcCheckItems),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    persistQcRecords([newQc, ...qcRecords]);
    return newQc;
  }

  function toggleQcItem(recordId, itemKey, remark) {
    let qc = getQcByRecordId(recordId);
    if (!qc) {
      qc = ensureQcForRecord(recordId);
    }
    const isChecked = !qc.items[itemKey]?.checked;
    const updated = {
      ...qc,
      items: {
        ...qc.items,
        [itemKey]: {
          checked: isChecked,
          remark: remark !== undefined ? remark : (qc.items[itemKey]?.remark || ''),
          checkedAt: isChecked ? new Date().toISOString() : null
        }
      },
      updatedAt: new Date().toISOString()
    };
    const next = qcRecords.map((q) => (q.id === updated.id ? updated : q));
    if (!qcRecords.find((q) => q.id === updated.id)) {
      next.unshift(updated);
    }
    persistQcRecords(next);
    if (selectedQcRecord?.id === updated.id) {
      setSelectedQcRecord(updated);
    }
    return updated;
  }

  function updateQcRemark(recordId, itemKey, remark) {
    let qc = getQcByRecordId(recordId);
    if (!qc) {
      qc = ensureQcForRecord(recordId);
    }
    const updated = {
      ...qc,
      items: {
        ...qc.items,
        [itemKey]: {
          ...qc.items[itemKey],
          remark
        }
      },
      updatedAt: new Date().toISOString()
    };
    const next = qcRecords.map((q) => (q.id === updated.id ? updated : q));
    if (!qcRecords.find((q) => q.id === updated.id)) {
      next.unshift(updated);
    }
    persistQcRecords(next);
    if (selectedQcRecord?.id === updated.id) {
      setSelectedQcRecord(updated);
    }
    return updated;
  }

  function getMissingQcItems(recordId, targetStatus) {
    const qc = getQcByRecordId(recordId);
    return qcCheckItems
      .filter((ci) => ci.requiredFor.includes(targetStatus))
      .filter((ci) => !qc?.items[ci.key]?.checked);
  }

  function getCurrentStatusMissingQcItems(recordId) {
    const record = getRecordById(recordId);
    const status = record?.status || appConfig.primaryStatus;
    return getMissingQcItems(recordId, status);
  }

  function getQcProgress(recordId, status) {
    const qc = getQcByRecordId(recordId);
    const required = qcCheckItems.filter((ci) => ci.requiredFor.includes(status));
    if (required.length === 0) return 100;
    const done = required.filter((ci) => qc?.items[ci.key]?.checked).length;
    return Math.round((done / required.length) * 100);
  }

  function getQcIcon(iconName) {
    const icons = { Palette, Camera, ArrowLeftRight, Stethoscope, CheckCircle2 };
    return icons[iconName] || ClipboardList;
  }

  function getCriticalMissingQcItems(recordId, targetStatus) {
    const qc = getQcByRecordId(recordId);
    return qcCheckItems
      .filter((ci) => ci.requiredFor.includes(targetStatus) && ci.critical)
      .filter((ci) => !qc?.items[ci.key]?.checked);
  }

  function getTodoItemsForStatus(recordId, status) {
    const qc = getQcByRecordId(recordId);
    return qcCheckItems
      .filter((ci) => ci.requiredFor.includes(status))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((ci) => ({
        ...ci,
        isChecked: !!qc?.items[ci.key]?.checked,
        remark: qc?.items[ci.key]?.remark || '',
        checkedAt: qc?.items[ci.key]?.checkedAt || null
      }));
  }

  function addPatient(event) {
    event.preventDefault();
    if (editingPatientId) {
      const next = patients.map((p) => p.id === editingPatientId ? { ...p, ...patientForm } : p);
      persistPatients(next);
      setEditingPatientId(null);
    } else {
      const newPatient = {
        id: uid(),
        ...patientForm,
        shadeCount: 0,
        createdAt: new Date().toISOString()
      };
      persistPatients([newPatient, ...patients]);
    }
    setPatientForm(appConfig.patientDefaultValues);
  }

  function editPatient(patient) {
    setPatientForm({ name: patient.name, phone: patient.phone, commonTooth: patient.commonTooth, allergyNote: patient.allergyNote });
    setEditingPatientId(patient.id);
  }

  function removePatient(id) {
    if (!confirm('确定删除该患者档案吗？')) return;
    const next = patients.filter((p) => p.id !== id);
    persistPatients(next);
    if (selectedPatient?.id === id) setSelectedPatient(null);
  }

  function cancelEditPatient() {
    setEditingPatientId(null);
    setPatientForm(appConfig.patientDefaultValues);
  }

  function handlePatientSelect(patientId) {
    setSelectedPatientId(patientId);
    if (patientId) {
      const patient = patients.find((p) => p.id === patientId);
      if (patient) {
        setForm({
          ...form,
          patient: patient.name,
          tooth: patient.commonTooth ? patient.commonTooth.split(',')[0].trim() : form.tooth
        });
      }
    }
  }

  const filteredRecords = useMemo(() => {
    return records
      .filter((item) => !filters.query || (item.patient || '').includes(filters.query))
      .filter((item) => filters.status === '全部' || item.status === filters.status)
      .sort((a, b) => {
        const aDate = a[appConfig.dateKey] || a.createdAt || '';
        const bDate = b[appConfig.dateKey] || b.createdAt || '';
        return String(bDate).localeCompare(String(aDate));
      });
  }, [records, filters]);

  const filteredPatients = useMemo(() => {
    return patients
      .filter((p) => !patientQuery || p.name.includes(patientQuery) || (p.phone || '').includes(patientQuery))
      .sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
  }, [patients, patientQuery]);

  const metrics = [
    { label: "总记录", value: records.length },
    { label: "待处理", value: records.filter((item) => item.status !== '已完成修复').length },
    { label: "今日复诊", value: records.filter((item) => item.followUp === today).length },
  ];

  const patientMetrics = [
    { label: "患者总数", value: patients.length },
    { label: "有备注", value: patients.filter((p) => p.allergyNote && p.allergyNote !== '无').length },
    { label: "总比色次数", value: patients.reduce((sum, p) => sum + (p.shadeCount || 0), 0) },
  ];

  const groupedByDate = useMemo(() => {
    return filteredRecords.reduce((acc, item) => {
      const key = item[appConfig.dateKey] || '未排期';
      (acc[key] ||= []).push(item);
      return acc;
    }, {});
  }, [filteredRecords]);

  const todayFollowUps = useMemo(() => {
    return records
      .filter((item) => item.followUp === today)
      .sort((a, b) => {
        const statusOrder = { '待修复': 0, '制作中': 1, '已完成修复': 2 };
        return (statusOrder[a.status] || 0) - (statusOrder[b.status] || 0);
      });
  }, [records, today]);

  const selectedTodayFollowUp = selected?.followUp === today ? selected : null;

  const photoProcessMetrics = useMemo(() => {
    const total = photoProcesses.length;
    const completed = photoProcesses.filter((pp) => pp.completed).length;
    const inProgress = photoProcesses.filter((pp) => !pp.completed).length;
    return [
      { label: "拍照流程总数", value: total },
      { label: "已完成", value: completed },
      { label: "进行中", value: inProgress }
    ];
  }, [photoProcesses]);

  const getStepIcon = (iconName) => {
    const icons = { User, Sun, CheckSquare, Camera };
    return icons[iconName] || Camera;
  };

  const getPhotoProcessProgress = (process) => {
    if (!process) return 0;
    const steps = Object.values(process.steps);
    const confirmed = steps.filter((s) => s.confirmed).length;
    return Math.round((confirmed / steps.length) * 100);
  };

  const getRecordById = (recordId) => {
    return records.find((r) => r.id === recordId) || null;
  };

  const getDeliveryOrderByRecordId = (recordId) => {
    return deliveryOrders.find((d) => d.recordIds.includes(recordId)) || null;
  };

  const pendingRecords = useMemo(() => {
    return records.filter((r) => r.status === '待修复' && !getDeliveryOrderByRecordId(r.id));
  }, [records, deliveryOrders]);

  function createDeliveryOrder(event) {
    event.preventDefault();
    if (!deliveryOrderForm.recordIds || deliveryOrderForm.recordIds.length === 0) {
      alert('请至少选择一条待修复记录');
      return;
    }
    if (!deliveryOrderForm.labName) {
      alert('请输入技工所名称');
      return;
    }
    const newOrder = {
      id: uid(),
      orderNo: generateOrderNo(),
      labName: deliveryOrderForm.labName,
      remark: deliveryOrderForm.remark,
      recordIds: [...deliveryOrderForm.recordIds],
      status: '待发送',
      createdAt: new Date().toISOString(),
      sentAt: null,
      receivedAt: null
    };
    persistDeliveryOrders([newOrder, ...deliveryOrders]);
    setDeliveryOrderForm(appConfig.deliveryOrderDefaultValues);
    setSelectedDeliveryOrder(newOrder);
  }

  function toggleRecordForDelivery(recordId) {
    const current = deliveryOrderForm.recordIds || [];
    if (current.includes(recordId)) {
      setDeliveryOrderForm({ ...deliveryOrderForm, recordIds: current.filter((id) => id !== recordId) });
    } else {
      setDeliveryOrderForm({ ...deliveryOrderForm, recordIds: [...current, recordId] });
    }
  }

  function updateDeliveryOrderStatus(id, status) {
    const now = new Date().toISOString();
    const next = deliveryOrders.map((d) => {
      if (d.id === id) {
        const updates = { status };
        if (status === '已发送' && !d.sentAt) updates.sentAt = now;
        if (status === '已回收' && !d.receivedAt) updates.receivedAt = now;
        return { ...d, ...updates };
      }
      return d;
    });
    persistDeliveryOrders(next);
    if (selectedDeliveryOrder?.id === id) {
      setSelectedDeliveryOrder(next.find((d) => d.id === id));
    }
  }

  function removeDeliveryOrder(id) {
    if (!confirm('确定删除该交接单吗？关联记录将解除关联。')) return;
    const next = deliveryOrders.filter((d) => d.id !== id);
    persistDeliveryOrders(next);
    if (selectedDeliveryOrder?.id === id) setSelectedDeliveryOrder(null);
  }

  const filteredPhotoProcesses = useMemo(() => {
    let processes = [...photoProcesses];
    if (photoProcessFilter === 'completed') {
      processes = processes.filter((pp) => pp.completed);
    } else if (photoProcessFilter === 'inProgress') {
      processes = processes.filter((pp) => !pp.completed);
    }
    return processes.sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')));
  }, [photoProcesses, photoProcessFilter]);

  const deliveryOrderMetrics = useMemo(() => {
    const total = deliveryOrders.length;
    const pending = deliveryOrders.filter((d) => d.status === '待发送').length;
    const sent = deliveryOrders.filter((d) => d.status === '已发送').length;
    const received = deliveryOrders.filter((d) => d.status === '已回收').length;
    return [
      { label: '交接单总数', value: total },
      { label: '待发送', value: pending },
      { label: '已回收', value: received }
    ];
  }, [deliveryOrders]);

  const filteredDeliveryOrders = useMemo(() => {
    let orders = [...deliveryOrders];
    if (deliveryOrderFilter !== '全部') {
      orders = orders.filter((d) => d.status === deliveryOrderFilter);
    }
    return orders.sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
  }, [deliveryOrders, deliveryOrderFilter]);

  const qcMetrics = useMemo(() => {
    const withQc = records.map((r) => ({
      record: r,
      qc: getQcByRecordId(r.id),
      progress: getQcProgress(r.id, r.status),
      missing: getMissingQcItems(r.id, r.status)
    }));
    const total = records.length;
    const completed = withQc.filter((w) => w.progress === 100).length;
    const incomplete = withQc.filter((w) => w.progress > 0 && w.progress < 100).length;
    const notStarted = withQc.filter((w) => w.progress === 0).length;
    return [
      { label: '质控总览', value: total },
      { label: '已达标', value: completed },
      { label: '待完善', value: incomplete },
      { label: '未开始', value: notStarted }
    ];
  }, [records, qcRecords]);

  const filteredQcRecords = useMemo(() => {
    let items = records.map((r) => ({
      record: r,
      qc: getQcByRecordId(r.id),
      progress: getQcProgress(r.id, r.status),
      missing: getMissingQcItems(r.id, r.status)
    }));
    if (qcFilter !== '全部') {
      items = items.filter((w) => w.record.status === qcFilter);
    }
    return items.sort((a, b) => a.progress - b.progress || String(a.record.patient).localeCompare(String(b.record.patient)));
  }, [records, qcRecords, qcFilter]);

  const next14Days = useMemo(() => getNext14Days(), [today]);

  const boardRecords = useMemo(() => {
    return records.filter((r) => {
      if (!r.followUp) return false;
      const diff = diffDays(r.followUp, today);
      return diff < 14;
    });
  }, [records, today]);

  const boardMetrics = useMemo(() => {
    const overdue = boardRecords.filter((r) => getFollowUpStatus(r.followUp).key === 'overdue').length;
    const todayCount = boardRecords.filter((r) => getFollowUpStatus(r.followUp).key === 'today').length;
    const soon = boardRecords.filter((r) => getFollowUpStatus(r.followUp).key === 'soon').length;
    return [
      { label: '逾期复诊', value: overdue },
      { label: '今日复诊', value: todayCount },
      { label: '即将到期(3天内)', value: soon },
      { label: '14天内总计', value: boardRecords.length }
    ];
  }, [boardRecords]);

  const recordsByDate = useMemo(() => {
    const grouped = {};
    next14Days.forEach((d) => { grouped[d] = []; });
    const overdueRecords = [];
    boardRecords.forEach((r) => {
      const diff = diffDays(r.followUp, today);
      if (diff < 0) {
        overdueRecords.push(r);
      } else if (diff < 14) {
        if (!grouped[r.followUp]) grouped[r.followUp] = [];
        grouped[r.followUp].push(r);
      }
    });
    return { grouped, overdueRecords };
  }, [boardRecords, next14Days, today]);

  const filteredBoardRecordsByStatus = useMemo(() => {
    if (boardFilterStatus === '全部') return boardRecords;
    return boardRecords.filter((r) => getFollowUpStatus(r.followUp).key === boardFilterStatus);
  }, [boardRecords, boardFilterStatus]);

  return (
    <main className="shell" style={{ '--accent': appConfig.accent }}>
      <section className="hero">
        <div>
          <div className="eyebrow"><SmilePlus size={18} />{appConfig.domain}</div>
          <h1>{appConfig.title}</h1>
          <p>{appConfig.subtitle}</p>
        </div>
        <div className="port-card">
          <span>Local Port</span>
          <strong>{appConfig.port}</strong>
        </div>
      </section>

      <div className="tabs">
        <button
          className={'tab ' + (activeTab === 'records' ? 'active' : '')}
          onClick={() => setActiveTab('records')}
        >
          <ClipboardList size={16} />
          比色记录
        </button>
        <button
          className={'tab ' + (activeTab === 'todayFollowUps' ? 'active' : '')}
          onClick={() => setActiveTab('todayFollowUps')}
        >
          <CalendarCheck size={16} />
          今日复诊
          {todayFollowUps.length > 0 && (
            <span className="tab-badge">{todayFollowUps.length}</span>
          )}
        </button>
        <button
          className={'tab ' + (activeTab === 'patients' ? 'active' : '')}
          onClick={() => setActiveTab('patients')}
        >
          <Users size={16} />
          患者档案
        </button>
        <button
          className={'tab ' + (activeTab === 'shadeLibrary' ? 'active' : '')}
          onClick={() => setActiveTab('shadeLibrary')}
        >
          <Palette size={16} />
          牙色样本库
        </button>
        <button
          className={'tab ' + (activeTab === 'photoProcess' ? 'active' : '')}
          onClick={() => setActiveTab('photoProcess')}
        >
          <Camera size={16} />
          拍照流程
        </button>
        <button
          className={'tab ' + (activeTab === 'deliveryOrders' ? 'active' : '')}
          onClick={() => setActiveTab('deliveryOrders')}
        >
          <ArrowLeftRight size={16} />
          技工所交接单
        </button>
        <button
          className={'tab ' + (activeTab === 'followUpBoard' ? 'active' : '')}
          onClick={() => setActiveTab('followUpBoard')}
        >
          <CalendarRange size={16} />
          复诊排期看板
          {boardRecords.filter((r) => getFollowUpStatus(r.followUp).key === 'overdue').length > 0 && (
            <span className="tab-badge">
              {boardRecords.filter((r) => getFollowUpStatus(r.followUp).key === 'overdue').length}
            </span>
          )}
        </button>
        <button
          className={'tab ' + (activeTab === 'dataManagement' ? 'active' : '')}
          onClick={() => setActiveTab('dataManagement')}
        >
          <Database size={16} />
          数据管理
        </button>
        <button
          className={'tab ' + (activeTab === 'qualityControl' ? 'active' : '')}
          onClick={() => setActiveTab('qualityControl')}
        >
          <ShieldCheck size={16} />
          牙色复诊闭环质控
          {records.filter((r) => getMissingQcItems(r.id, r.status).length > 0).length > 0 && (
            <span className="tab-badge">
              {records.filter((r) => getMissingQcItems(r.id, r.status).length > 0).length}
            </span>
          )}
        </button>
        <button
          className={'tab ' + (activeTab === 'multiClinicCollab' ? 'active' : '')}
          onClick={() => setActiveTab('multiClinicCollab')}
        >
          <GitMerge size={16} />
          多诊室离线协作
        </button>
      </div>

      {activeTab === 'records' && (
        <>
          <section className="metrics">
            {metrics.map((metric) => (
              <article className="metric" key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </article>
            ))}
          </section>

          <section className="workspace">
            <form className="panel form-panel" onSubmit={addRecord}>
              <div className="panel-title">
                <ClipboardList size={18} />
                <h2>新增记录</h2>
              </div>

              <label>
                <span>选择患者（可选）</span>
                <div className="patient-select-wrapper">
                  <Users size={16} className="input-icon" />
                  <select
                    value={selectedPatientId}
                    onChange={(e) => handlePatientSelect(e.target.value)}
                    className="with-icon"
                  >
                    <option value="">手动输入患者信息</option>
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} - {p.phone || '无电话'}
                      </option>
                    ))}
                  </select>
                </div>
              </label>

              {selectedPatientId && (
                <div className="patient-info-card">
                  <div className="patient-info-header">
                    <UserPlus size={16} />
                    <span>已选患者信息</span>
                  </div>
                  <div className="patient-info-grid">
                    <div className="patient-info-item">
                      <Phone size={14} />
                      <span>{patients.find((p) => p.id === selectedPatientId)?.phone || '未填写'}</span>
                    </div>
                    <div className="patient-info-item">
                      <MapPin size={14} />
                      <span>常用牙位: {patients.find((p) => p.id === selectedPatientId)?.commonTooth || '未填写'}</span>
                    </div>
                    {(patients.find((p) => p.id === selectedPatientId)?.allergyNote && patients.find((p) => p.id === selectedPatientId)?.allergyNote !== '无') && (
                      <div className="patient-info-item allergy">
                        <AlertCircle size={14} />
                        <span>过敏: {patients.find((p) => p.id === selectedPatientId)?.allergyNote}</span>
                      </div>
                    )}
                    <div className="patient-info-item">
                      <FileText size={14} />
                      <span>历史比色: {patients.find((p) => p.id === selectedPatientId)?.shadeCount || 0} 次</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="form-grid">
                {appConfig.fields.map((field) => (
                  field.key === 'shade' ? (
                    <label key={field.key} className="wide">
                      <span>{field.label}</span>
                      <select value={form[field.key] || ''} onChange={(event) => setForm({ ...form, [field.key]: event.target.value })}>
                        {field.options.map((option) => <option key={option}>{option}</option>)}
                      </select>
                      <div className="shade-picker">
                        {field.options.map((option) => {
                          const shadeInfo = getShadeInfo(option);
                          return (
                            <div
                              key={option}
                              className={'shade-picker-item ' + (form.shade === option ? 'active' : '')}
                              onClick={() => {
                                setForm({ ...form, shade: option });
                                setShadeDetailModal(shadeInfo || { code: option });
                              }}
                            >
                              <div className={'shade-swatch-mini shade-' + option.charAt(0).toLowerCase()}>
                                <span>{option}</span>
                              </div>
                              <button
                                type="button"
                                className="shade-info-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShadeDetailModal(shadeInfo || { code: option });
                                }}
                                title="查看色号说明"
                              >
                                <Info size={12} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </label>
                  ) : field.key === 'tooth' ? (
                    <label key={field.key} className="wide">
                      <span>{field.label}</span>
                      <ToothChart
                        value={form[field.key] || ''}
                        onChange={(tooth) => setForm({ ...form, [field.key]: tooth })}
                        enabledTeeth={field.options}
                        records={records}
                      />
                    </label>
                  ) : (
                    <label key={field.key} className={field.type === 'textarea' ? 'wide' : ''}>
                      <span>{field.label}</span>
                      {field.type === 'textarea' ? (
                        <textarea value={form[field.key] || ''} onChange={(event) => setForm({ ...form, [field.key]: event.target.value })} placeholder={field.placeholder} />
                      ) : field.type === 'select' ? (
                        <select value={form[field.key] || ''} onChange={(event) => setForm({ ...form, [field.key]: event.target.value })}>
                          {field.options.map((option) => <option key={option}>{option}</option>)}
                        </select>
                      ) : (
                        <input type={field.type} value={form[field.key] || ''} onChange={(event) => setForm({ ...form, [field.key]: event.target.value })} placeholder={field.placeholder} />
                      )}
                    </label>
                  )
                ))}
                <label>
                  <span>当前状态</span>
                  <select value={form.status || appConfig.primaryStatus} onChange={(event) => setForm({ ...form, status: event.target.value })}>
                    {appConfig.statuses.map((status) => <option key={status}>{status}</option>)}
                  </select>
                </label>
              </div>
              <button className="primary" type="submit"><Plus size={18} />新增</button>
              <p className="hint">{appConfig.note}</p>
            </form>

            <section className="panel list-panel">
              <div className="toolbar">
                <div className="search">
                  <Search size={16} />
                  <input value={filters.query} onChange={(event) => setFilters({ ...filters, query: event.target.value })} placeholder={appConfig.filters[0]?.label || '搜索'} />
                </div>
                <select value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })}>
                  <option>全部</option>
                  {appConfig.statuses.map((status) => <option key={status}>{status}</option>)}
                </select>
              </div>

              <div className="records">
                {filteredRecords.map((item) => (
                  <article className={'record ' + (item.conflict ? 'conflict' : '')} key={item.id} onClick={() => setSelected(item)}>
                    <div className="record-head">
                      <div>
                        <h3>{item.patient}</h3>
                        <p>{`牙位 ${item.tooth} · ${item.shade}`}</p>
                      </div>
                      <span className={'status ' + statusClass(item.status)}>{item.status}</span>
                    </div>
                    <p className="record-detail">{item.photoNote}</p>
                    <div className="qc-progress-bar record-qc-bar">
                      {qcCheckItems.filter((ci) => ci.requiredFor.includes(item.status)).map((ci) => {
                        const qc = getQcByRecordId(item.id);
                        const isChecked = qc?.items[ci.key]?.checked;
                        return (
                          <div
                            key={ci.key}
                            className={'qc-progress-dot ' + (isChecked ? 'done' : 'pending')}
                            title={`${ci.label}${isChecked ? '（已完成）' : '（待完成）'}`}
                          />
                        );
                      })}
                      <span className="qc-progress-text">
                        {getQcProgress(item.id, item.status)}%
                      </span>
                    </div>
                    {getMissingQcItems(item.id, item.status).length > 0 && (
                      <div className="qc-missing-inline">
                        <ShieldAlert size={12} />
                        待完成：{getMissingQcItems(item.id, item.status).slice(0, 2).map((m) => m.label).join('、')}
                        {getMissingQcItems(item.id, item.status).length > 2 && ` 等${getMissingQcItems(item.id, item.status).length}项`}
                      </div>
                    )}
                    {item.conflict && <div className="warning"><AlertTriangle size={15} />发现冲突</div>}
                    <div className="actions" onClick={(event) => event.stopPropagation()}>
                      {appConfig.statuses.map((status) => {
                        const missing = getMissingQcItems(item.id, status);
                        const canTransition = missing.length === 0;
                        const isCurrent = item.status === status;
                        return (
                          <button
                            key={status}
                            type="button"
                            onClick={() => updateStatus(item.id, status)}
                            disabled={isCurrent || !canTransition}
                            title={isCurrent ? '当前状态' : canTransition ? `切换至${status}` : `需先完成: ${missing.map((m) => m.label).join('、')}`}
                          >
                            {status}
                            {!isCurrent && !canTransition && <ShieldAlert size={10} style={{ marginLeft: 2 }} />}
                          </button>
                        );
                      })}
                      <button type="button" onClick={() => duplicateRecord(item)}><RotateCcw size={14} />复制</button>
                      <button className="ghost-danger" type="button" onClick={() => removeRecord(item.id)}><Trash2 size={14} /></button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </section>

          <section className="insights">
            <div className="panel">
              <div className="panel-title">
                <CalendarDays size={18} />
                <h2>按复诊日期分组</h2>
              </div>
              <div className="date-groups">
                {Object.entries(groupedByDate).map(([date, items]) => (
                  <div key={date} className="date-group">
                    <strong>{date}</strong>
                    <span>{items.length}条记录</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="panel detail-panel">
              <div className="panel-title">
                <CheckCircle2 size={18} />
                <h2>详情</h2>
              </div>
              {selected ? (
                <div className="detail">
                  <h3>{selected.patient}</h3>
                  <p>{`牙位 ${selected.tooth} · ${selected.shade}`}</p>
                  <p>{selected.photoNote}</p>

                  <div className="detail-actions" style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e5e7eb' }}>
                    <button
                      className="primary"
                      type="button"
                      onClick={() => startPhotoProcess(selected.id)}
                    >
                      <Camera size={16} />
                      {getPhotoProcessByRecordId(selected.id) ? '继续拍照流程' : '开始拍照流程'}
                    </button>
                    {getPhotoProcessByRecordId(selected.id) && (
                      <p className="photo-process-start-hint">
                        <CheckCircle2 size={14} />
                        进度：{getPhotoProcessProgress(getPhotoProcessByRecordId(selected.id))}%
                      </p>
                    )}
                  </div>

                  {getPhotoProcessByRecordId(selected.id) && (
                    <>
                      <div className="detail-section-divider">
                        <ClipboardList size={16} />
                        拍照检查清单
                      </div>
                      <div className="photo-checklist">
                        {appConfig.photoSteps.map((step, idx) => {
                          const stepData = getPhotoProcessByRecordId(selected.id)?.steps[step.key];
                          const StepIcon = getStepIcon(step.icon);
                          const isChecked = stepData?.confirmed;
                          return (
                            <div key={step.key} className={'checklist-item ' + (isChecked ? 'checked' : '')}>
                              <div className="checklist-icon">
                                {isChecked ? <CheckCheck size={20} /> : <Square size={20} />}
                              </div>
                              <div className="checklist-content">
                                <div className="checklist-header">
                                  <StepIcon size={16} />
                                  <strong>步骤 {idx + 1}：{step.label}</strong>
                                  {isChecked && <span className="checklist-badge">已确认</span>}
                                </div>
                                {stepData?.remark ? (
                                  <p className="checklist-note">{stepData.remark}</p>
                                ) : (
                                  <p className="checklist-empty">暂无备注</p>
                                )}
                                {stepData?.environment && (
                                  <span className="checklist-env">
                                    <Sun size={12} /> {stepData.environment}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="checklist-summary">
                        {getPhotoProcessProgress(getPhotoProcessByRecordId(selected.id)) === 100 ? (
                          <p className="checklist-complete">✓ 所有步骤已完成确认</p>
                        ) : (
                          <p className="checklist-progress">已完成 {appConfig.photoSteps.filter((s) => getPhotoProcessByRecordId(selected.id)?.steps[s.key]?.confirmed).length} / {appConfig.photoSteps.length} 个步骤</p>
                        )}
                      </div>
                    </>
                  )}

                  {getShadeInfo(selected.shade) && (
                    <div className="shade-detail-card">
                      <div className="shade-detail-header">
                        <div className={'shade-swatch-sm shade-' + selected.shade.charAt(0).toLowerCase()}>
                          <span>{selected.shade}</span>
                        </div>
                        <div>
                          <h4>色号 {selected.shade} 说明</h4>
                          <button
                            type="button"
                            className="link-btn"
                            onClick={() => setShadeDetailModal(getShadeInfo(selected.shade))}
                          >
                            查看完整说明
                          </button>
                        </div>
                      </div>
                      <div className="shade-detail-content">
                        <p><strong>文字说明：</strong>{getShadeInfo(selected.shade)?.description}</p>
                        <p><strong>适用场景：</strong>{getShadeInfo(selected.shade)?.scenario}</p>
                        <p><strong>注意事项：</strong>{getShadeInfo(selected.shade)?.notes}</p>
                      </div>
                    </div>
                  )}

                  {getDeliveryOrderByRecordId(selected.id) && (
                    <div className="delivery-link-card">
                      <div className="delivery-link-header">
                        <ArrowLeftRight size={16} style={{ color: 'var(--accent)' }} />
                        <strong>关联交接单</strong>
                      </div>
                      <div className="delivery-link-content">
                        <div>
                          <p className="delivery-link-no">{getDeliveryOrderByRecordId(selected.id).orderNo}</p>
                          <p className="delivery-link-lab">{getDeliveryOrderByRecordId(selected.id).labName}</p>
                        </div>
                        <span className={'status ' + deliveryOrderStatusClass(getDeliveryOrderByRecordId(selected.id).status)}>
                          {getDeliveryOrderByRecordId(selected.id).status}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="link-btn"
                        style={{ marginTop: '8px' }}
                        onClick={() => {
                          setSelectedDeliveryOrder(getDeliveryOrderByRecordId(selected.id));
                          setActiveTab('deliveryOrders');
                        }}
                      >
                        查看交接单详情 →
                      </button>
                    </div>
                  )}

                  <div className="detail-section-divider">
                    <ShieldCheck size={16} />
                    质控检查（当前状态：{selected.status}）
                  </div>
                  <div className="qc-detail-progress record-detail-qc">
                    <div className="qc-progress-ring">
                      <svg viewBox="0 0 36 36" className="qc-ring-svg">
                        <path
                          className="qc-ring-bg"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="qc-ring-fill"
                          strokeDasharray={`${getQcProgress(selected.id, selected.status)}, 100`}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="qc-ring-text">{getQcProgress(selected.id, selected.status)}%</span>
                    </div>
                    <div className="qc-progress-summary">
                      <strong>质控进度</strong>
                      <p>
                        {getQcProgress(selected.id, selected.status) === 100
                          ? '所有必检项已完成'
                          : `还需完成 ${getMissingQcItems(selected.id, selected.status).length} 项检查`}
                      </p>
                    </div>
                  </div>
                  <div className="photo-checklist">
                    {qcCheckItems.map((ci) => {
                      const qc = getQcByRecordId(selected.id);
                      const isRequired = ci.requiredFor.includes(selected.status);
                      const isChecked = qc?.items[ci.key]?.checked;
                      const remark = qc?.items[ci.key]?.remark || '';
                      const checkedAt = qc?.items[ci.key]?.checkedAt;
                      const QcIcon = getQcIcon(ci.icon);

                      if (!isRequired && !isChecked) {
                        return (
                          <div key={ci.key} className="checklist-item qc-item-irrelevant">
                            <div className="checklist-icon"><Square size={20} /></div>
                            <div className="checklist-content">
                              <div className="checklist-header">
                                <QcIcon size={16} />
                                <strong>{ci.label}</strong>
                                <span className="qc-irrelevant-badge">当前状态无需</span>
                              </div>
                              <p className="checklist-empty">在更后续的状态中需要完成</p>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={ci.key} className={'checklist-item ' + (isChecked ? 'checked' : '') + (!isRequired ? ' qc-item-optional' : '')}>
                          <div className="checklist-icon">
                            {isChecked ? <CheckCheck size={20} /> : <Square size={20} />}
                          </div>
                          <div className="checklist-content">
                            <div className="checklist-header">
                              <QcIcon size={16} />
                              <strong>{ci.label}</strong>
                              {isChecked && <span className="checklist-badge">已确认</span>}
                              {!isRequired && isChecked && <span className="qc-optional-badge">可选</span>}
                              {isRequired && !isChecked && <span className="qc-required-badge">必检</span>}
                            </div>
                            <p className="qc-item-desc">{ci.description}</p>
                            {isChecked && checkedAt && (
                              <span className="checklist-env">
                                <Clock size={12} /> 确认于 {new Date(checkedAt).toLocaleString('zh-CN')}
                              </span>
                            )}
                            <div className="qc-remark-row" onClick={(e) => e.stopPropagation()}>
                              <input
                                type="text"
                                placeholder="添加备注..."
                                value={remark}
                                onChange={(e) => updateQcRemark(selected.id, ci.key, e.target.value)}
                              />
                              <button
                                type="button"
                                className={isChecked ? 'qc-toggle-btn qc-toggle-uncheck' : 'qc-toggle-btn qc-toggle-check'}
                                onClick={() => toggleQcItem(selected.id, ci.key)}
                              >
                                {isChecked ? <><X size={14} />撤销</> : <><CheckCheck size={14} />确认</>}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {getMissingQcItems(selected.id, selected.status).length > 0 && (
                    <div className="checklist-summary">
                      <p className="checklist-progress">
                        <ShieldAlert size={14} /> 缺少关键步骤：{getMissingQcItems(selected.id, selected.status).map((m) => m.label).join('、')}
                      </p>
                    </div>
                  )}

                  <div className="detail-actions" style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e5e7eb' }}>
                    <p className="hint">状态流转（缺少关键步骤不能直接标记完成）：</p>
                    <div className="actions">
                      {appConfig.statuses.map((status) => {
                        const missingForTarget = getMissingQcItems(selected.id, status);
                        const canTransition = missingForTarget.length === 0;
                        const isCurrent = selected.status === status;
                        return (
                          <button
                            key={status}
                            type="button"
                            onClick={() => updateStatus(selected.id, status)}
                            disabled={isCurrent || !canTransition}
                            title={isCurrent ? '当前状态' : canTransition ? `切换至${status}` : `需先完成: ${missingForTarget.map((m) => m.label).join('、')}`}
                          >
                            {status}
                            {!isCurrent && !canTransition && <ShieldAlert size={12} style={{ marginLeft: 4 }} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="timeline">
                    {(selected.timeline || []).map((step, index) => (
                      <span key={index}>{step.at} · {step.status} · {step.by}</span>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="empty">点击任意记录查看详情和状态流转。</p>
              )}
            </aside>
          </section>
        </>
      )}

      {activeTab === 'patients' && (
        <>
          <section className="metrics">
            {patientMetrics.map((metric) => (
              <article className="metric" key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </article>
            ))}
          </section>

          <section className="workspace">
            <form className="panel form-panel" onSubmit={addPatient}>
              <div className="panel-title">
                <UserPlus size={18} />
                <h2>{editingPatientId ? '编辑患者档案' : '新增患者档案'}</h2>
              </div>
              <div className="form-grid">
                <label className="wide">
                  <span>患者姓名</span>
                  <input
                    type="text"
                    value={patientForm.name}
                    onChange={(e) => setPatientForm({ ...patientForm, name: e.target.value })}
                    placeholder="请输入患者姓名"
                    required
                  />
                </label>
                <label className="wide">
                  <span>联系电话</span>
                  <input
                    type="tel"
                    value={patientForm.phone}
                    onChange={(e) => setPatientForm({ ...patientForm, phone: e.target.value })}
                    placeholder="请输入联系电话"
                  />
                </label>
                <label className="wide">
                  <span>常用牙位（逗号分隔）</span>
                  <input
                    type="text"
                    value={patientForm.commonTooth}
                    onChange={(e) => setPatientForm({ ...patientForm, commonTooth: e.target.value })}
                    placeholder="如：11, 21, 36"
                  />
                </label>
                <label className="wide">
                  <span>过敏备注</span>
                  <textarea
                    value={patientForm.allergyNote}
                    onChange={(e) => setPatientForm({ ...patientForm, allergyNote: e.target.value })}
                    placeholder="如：青霉素过敏、金属过敏等"
                    rows={3}
                  />
                </label>
              </div>
              <button className="primary" type="submit">
                {editingPatientId ? <><Edit3 size={18} />保存修改</> : <><Plus size={18} />新增患者</>}
              </button>
              {editingPatientId && (
                <button type="button" className="secondary" onClick={cancelEditPatient}>取消编辑</button>
              )}
              <p className="hint">患者档案数据保存在本地浏览器中。</p>
            </form>

            <section className="panel list-panel">
              <div className="toolbar">
                <div className="search">
                  <Search size={16} />
                  <input
                    value={patientQuery}
                    onChange={(e) => setPatientQuery(e.target.value)}
                    placeholder="搜索患者姓名或电话"
                  />
                </div>
              </div>

              <div className="records">
                {filteredPatients.map((patient) => (
                  <article
                    className="record patient-record"
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <div className="record-head">
                      <div>
                        <h3 className="patient-name">{patient.name}</h3>
                        <p className="patient-phone">{patient.phone || '未填写电话'}</p>
                      </div>
                      <span className="status status-b">{patient.shadeCount || 0} 次比色</span>
                    </div>
                    <p className="record-detail">
                      <strong>常用牙位：</strong>{patient.commonTooth || '未填写'}
                    </p>
                    {patient.allergyNote && patient.allergyNote !== '无' && (
                      <div className="allergy-tag">
                        <AlertCircle size={14} />
                        过敏: {patient.allergyNote}
                      </div>
                    )}
                    <div className="actions" onClick={(e) => e.stopPropagation()}>
                      <button type="button" onClick={() => editPatient(patient)}>
                        <Edit3 size={14} />编辑
                      </button>
                      <button className="ghost-danger" type="button" onClick={() => removePatient(patient.id)}>
                        <Trash2 size={14} />删除
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </section>

          <section className="insights">
            <div className="panel">
              <div className="panel-title">
                <Users size={18} />
                <h2>患者概览</h2>
              </div>
              <div className="date-groups">
                <div className="date-group">
                  <strong>活跃患者</strong>
                  <span>{patients.filter((p) => p.shadeCount > 0).length} 位</span>
                </div>
                <div className="date-group">
                  <strong>有过敏记录</strong>
                  <span>{patients.filter((p) => p.allergyNote && p.allergyNote !== '无').length} 位</span>
                </div>
                <div className="date-group">
                  <strong>本月新增</strong>
                  <span>{patients.filter((p) => {
                    const created = new Date(p.createdAt);
                    const now = new Date();
                    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
                  }).length} 位</span>
                </div>
              </div>
            </div>

            <aside className="panel detail-panel">
              <div className="panel-title">
                <CheckCircle2 size={18} />
                <h2>患者详情</h2>
              </div>
              {selectedPatient ? (
                <div className="detail">
                  <h3>{selectedPatient.name}</h3>
                  <p className="detail-item">
                    <Phone size={16} />
                    <span>{selectedPatient.phone || '未填写'}</span>
                  </p>
                  <p className="detail-item">
                    <MapPin size={16} />
                    <span>常用牙位: {selectedPatient.commonTooth || '未填写'}</span>
                  </p>
                  <p className="detail-item">
                    <AlertCircle size={16} />
                    <span>过敏备注: {selectedPatient.allergyNote || '无'}</span>
                  </p>
                  <p className="detail-item">
                    <FileText size={16} />
                    <span>历史比色: {selectedPatient.shadeCount || 0} 次</span>
                  </p>
                  <div className="timeline">
                    <span>创建时间: {new Date(selectedPatient.createdAt).toLocaleDateString('zh-CN')}</span>
                  </div>
                </div>
              ) : (
                <p className="empty">点击任意患者查看详细信息。</p>
              )}
            </aside>
          </section>
        </>
      )}

      {activeTab === 'shadeLibrary' && (
        <>
          <section className="metrics">
            <article className="metric">
              <span>色号总数</span>
              <strong>{shadeLibrary.length}</strong>
            </article>
            <article className="metric">
              <span>A系列</span>
              <strong>{shadeLibrary.filter((s) => s.code.startsWith('A')).length}</strong>
            </article>
            <article className="metric">
              <span>其他系列</span>
              <strong>{shadeLibrary.filter((s) => !s.code.startsWith('A')).length}</strong>
            </article>
          </section>

          <section className="workspace">
            <div className="panel form-panel">
              <div className="panel-title">
                <Edit3 size={18} />
                <h2>{editingShade ? '编辑色号说明' : '色号详情'}</h2>
              </div>
              {editingShade ? (
                <div className="form-grid">
                  <label className="wide">
                    <span>色号</span>
                    <input
                      type="text"
                      value={editingShade.code}
                      disabled
                      style={{ background: '#f9fafb', color: '#667085' }}
                    />
                  </label>
                  <label className="wide">
                    <span>文字说明</span>
                    <textarea
                      value={editingShade.description || ''}
                      onChange={(e) => setEditingShade({ ...editingShade, description: e.target.value })}
                      placeholder="请输入该色号的文字说明"
                      rows={3}
                    />
                  </label>
                  <label className="wide">
                    <span>适用场景</span>
                    <textarea
                      value={editingShade.scenario || ''}
                      onChange={(e) => setEditingShade({ ...editingShade, scenario: e.target.value })}
                      placeholder="请输入适用场景描述"
                      rows={3}
                    />
                  </label>
                  <label className="wide">
                    <span>注意事项</span>
                    <textarea
                      value={editingShade.notes || ''}
                      onChange={(e) => setEditingShade({ ...editingShade, notes: e.target.value })}
                      placeholder="请输入注意事项"
                      rows={3}
                    />
                  </label>
                </div>
              ) : (
                <div className="shade-preview-empty">
                  <Palette size={48} style={{ color: '#d0d5dd' }} />
                  <p>点击左侧色号卡片查看详情</p>
                  <p className="hint">或点击「编辑」按钮修改说明内容</p>
                </div>
              )}
              {editingShade && (
                <>
                  <button className="primary" type="button" onClick={saveShade}>
                    <Save size={18} />保存修改
                  </button>
                  <button type="button" className="secondary" onClick={cancelEditShade}>
                    取消编辑
                  </button>
                </>
              )}
            </div>

            <section className="panel list-panel">
              <div className="toolbar">
                <div className="panel-title" style={{ marginBottom: 0 }}>
                  <Palette size={18} />
                  <h2>色号列表</h2>
                </div>
              </div>

              <div className="shade-cards">
                {shadeLibrary.map((shade) => (
                  <article
                    className="shade-card"
                    key={shade.code}
                  >
                    <div className="shade-card-header">
                      <div className={'shade-swatch shade-' + shade.code.charAt(0).toLowerCase()}>
                        <span>{shade.code}</span>
                      </div>
                    </div>
                    <div className="shade-card-body">
                      <h3>{shade.code}</h3>
                      <p className="shade-desc">{shade.description}</p>
                    </div>
                    <div className="shade-card-footer">
                      <button type="button" onClick={() => editShade(shade)}>
                        <Edit3 size={14} />编辑
                      </button>
                      <button type="button" onClick={() => setShadeDetailModal(shade)}>
                        <Info size={14} />查看详情
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </section>
        </>
      )}

      {activeTab === 'todayFollowUps' && (
        <>
          <section className="metrics">
            <article className="metric">
              <span>今日复诊</span>
              <strong>{todayFollowUps.length}</strong>
            </article>
            <article className="metric">
              <span>待处理</span>
              <strong>{todayFollowUps.filter((item) => item.status === '待修复').length}</strong>
            </article>
            <article className="metric">
              <span>已完成</span>
              <strong>{todayFollowUps.filter((item) => item.status === '已完成修复').length}</strong>
            </article>
          </section>

          <section className="workspace">
            <section className="panel list-panel">
              <div className="panel-title">
                <Stethoscope size={18} />
                <h2>今日复诊清单 · {today}</h2>
              </div>

              {todayFollowUps.length > 0 ? (
                <div className="records">
                  {todayFollowUps.map((item) => (
                    <article
                      className={'record follow-up-record ' + (item.conflict ? 'conflict' : '')}
                      key={item.id}
                      onClick={() => setSelected(item)}
                    >
                      <div className="record-head">
                        <div>
                          <h3>{item.patient}</h3>
                          <p>{`牙位 ${item.tooth} · ${item.shade}`}</p>
                        </div>
                        <span className={'status ' + statusClass(item.status)}>{item.status}</span>
                      </div>
                      <p className="record-detail">{item.photoNote}</p>
                      {item.conflict && <div className="warning"><AlertTriangle size={15} />发现冲突</div>}
                      <div className="actions quick-actions" onClick={(event) => event.stopPropagation()}>
                        <button
                          type="button"
                          className="quick-action-btn"
                          onClick={() => updateStatus(item.id, '制作中')}
                          disabled={item.status === '制作中' || getMissingQcItems(item.id, '制作中').length > 0}
                          title={item.status === '制作中' ? '当前状态' : getMissingQcItems(item.id, '制作中').length > 0 ? `需先完成: ${getMissingQcItems(item.id, '制作中').map(m => m.label).join('、')}` : '切换至制作中'}
                        >
                          <RotateCcw size={14} />
                          制作中
                        </button>
                        <button
                          type="button"
                          className="quick-action-btn primary-action"
                          onClick={() => updateStatus(item.id, '已完成修复')}
                          disabled={item.status === '已完成修复' || getMissingQcItems(item.id, '已完成修复').length > 0}
                          title={item.status === '已完成修复' ? '当前状态' : getMissingQcItems(item.id, '已完成修复').length > 0 ? `需先完成: ${getMissingQcItems(item.id, '已完成修复').map(m => m.label).join('、')}` : '切换至已完成修复'}
                        >
                          <CheckCircle2 size={14} />
                          已完成
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <CalendarCheck size={48} style={{ color: '#d0d5dd' }} />
                  <h3>今日无复诊安排</h3>
                  <p className="empty">今天没有患者需要复诊，可以安心处理其他工作。</p>
                  <p className="hint">在比色记录中设置复诊日期后，患者会自动出现在这里。</p>
                </div>
              )}
            </section>

            <aside className="panel detail-panel">
              <div className="panel-title">
                <CheckCircle2 size={18} />
                <h2>复诊详情</h2>
              </div>
              {selectedTodayFollowUp ? (
                <div className="detail">
                  <h3>{selectedTodayFollowUp.patient}</h3>
                  <p>{`牙位 ${selectedTodayFollowUp.tooth} · ${selectedTodayFollowUp.shade}`}</p>
                  <p>{selectedTodayFollowUp.photoNote}</p>

                  {getShadeInfo(selectedTodayFollowUp.shade) && (
                    <div className="shade-detail-card">
                      <div className="shade-detail-header">
                        <div className={'shade-swatch-sm shade-' + selectedTodayFollowUp.shade.charAt(0).toLowerCase()}>
                          <span>{selectedTodayFollowUp.shade}</span>
                        </div>
                        <div>
                          <h4>色号 {selectedTodayFollowUp.shade} 说明</h4>
                          <button
                            type="button"
                            className="link-btn"
                            onClick={() => setShadeDetailModal(getShadeInfo(selectedTodayFollowUp.shade))}
                          >
                            查看完整说明
                          </button>
                        </div>
                      </div>
                      <div className="shade-detail-content">
                        <p><strong>文字说明：</strong>{getShadeInfo(selectedTodayFollowUp.shade)?.description}</p>
                        <p><strong>适用场景：</strong>{getShadeInfo(selectedTodayFollowUp.shade)?.scenario}</p>
                        <p><strong>注意事项：</strong>{getShadeInfo(selectedTodayFollowUp.shade)?.notes}</p>
                      </div>
                    </div>
                  )}

                  <div className="timeline">
                    {(selectedTodayFollowUp.timeline || []).map((step, index) => (
                      <span key={index}>{step.at} · {step.status} · {step.by}</span>
                    ))}
                  </div>

                  <div className="detail-actions">
                    <p className="hint">快速更新状态（需满足质控条件）：</p>
                    <div className="actions">
                      {appConfig.statuses.map((status) => {
                        const missing = getMissingQcItems(selectedTodayFollowUp.id, status);
                        const canTransition = missing.length === 0;
                        const isCurrent = selectedTodayFollowUp.status === status;
                        return (
                          <button
                            key={status}
                            type="button"
                            onClick={() => updateStatus(selectedTodayFollowUp.id, status)}
                            disabled={isCurrent || !canTransition}
                            title={isCurrent ? '当前状态' : canTransition ? `切换至${status}` : `需先完成: ${missing.map((m) => m.label).join('、')}`}
                          >
                            {status}
                            {!isCurrent && !canTransition && <ShieldAlert size={12} style={{ marginLeft: 4 }} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <Info size={48} style={{ color: '#d0d5dd' }} />
                  <p className="empty">点击左侧任意复诊记录查看详情和状态流转。</p>
                </div>
              )}
            </aside>
          </section>
        </>
      )}

      {activeTab === 'photoProcess' && (
        <>
          <section className="metrics">
            {photoProcessMetrics.map((metric) => (
              <article className="metric" key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </article>
            ))}
          </section>

          <section className="workspace">
            <section className="panel list-panel">
              <div className="toolbar">
                <div className="panel-title" style={{ marginBottom: 0, flex: 1 }}>
                  <Camera size={18} />
                  <h2>拍照流程列表</h2>
                </div>
                <select value={photoProcessFilter} onChange={(e) => setPhotoProcessFilter(e.target.value)}>
                  <option value="all">全部</option>
                  <option value="inProgress">进行中</option>
                  <option value="completed">已完成</option>
                </select>
              </div>

              {filteredPhotoProcesses.length > 0 ? (
                <div className="records">
                  {filteredPhotoProcesses.map((process) => {
                    const record = getRecordById(process.recordId);
                    const progress = getPhotoProcessProgress(process);
                    return (
                      <article
                        className={'record photo-process-record ' + (selectedPhotoProcess?.id === process.id ? 'selected' : '')}
                        key={process.id}
                        onClick={() => {
                          setSelectedPhotoProcess(process);
                          if (record) setSelected(record);
                        }}
                      >
                        <div className="record-head">
                          <div>
                            <h3>{record?.patient || '未知患者'}</h3>
                            <p>{record ? `牙位 ${record.tooth} · ${record.shade}` : '未关联记录'}</p>
                          </div>
                          <span className={'status ' + (process.completed ? 'status-c' : 'status-b')}>
                            {process.completed ? '已完成' : '进行中'}
                          </span>
                        </div>
                        <div className="step-progress-bar" style={{ marginTop: '10px' }}>
                          {appConfig.photoSteps.map((step, idx) => (
                            <div
                              key={step.key}
                              className={'step-progress-dot ' + (process.steps[step.key]?.confirmed ? 'done' : '')}
                              title={step.label}
                            />
                          ))}
                        </div>
                        <p className="record-detail" style={{ marginTop: '8px' }}>
                          完成进度：{progress}% · 上次更新：{new Date(process.updatedAt).toLocaleDateString('zh-CN')}
                        </p>
                        <div className="actions" onClick={(e) => e.stopPropagation()}>
                          <button type="button" onClick={() => {
                            setEditingPhotoProcess({ ...process });
                          }}>
                            <Edit3 size={14} />编辑
                          </button>
                          <button type="button" className="ghost-danger" onClick={() => {
                            if (confirm('确定删除该拍照流程吗？')) {
                              const next = photoProcesses.filter((pp) => pp.id !== process.id);
                              persistPhotoProcesses(next);
                              if (selectedPhotoProcess?.id === process.id) {
                                setSelectedPhotoProcess(null);
                              }
                            }
                          }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="empty-state">
                  <Camera size={48} style={{ color: '#d0d5dd' }} />
                  <h3>暂无拍照流程</h3>
                  <p className="empty">在比色记录中点击「开始拍照流程」按钮来创建。</p>
                </div>
              )}
            </section>

            <aside className="panel detail-panel">
              <div className="panel-title">
                <CheckCircle2 size={18} />
                <h2>拍照检查清单</h2>
              </div>
              {selectedPhotoProcess ? (
                <div className="detail">
                  <div className="photo-process-record-info">
                    <strong>{getRecordById(selectedPhotoProcess.recordId)?.patient || '未知患者'}</strong>
                    <span>{getRecordById(selectedPhotoProcess.recordId) ? `牙位 ${getRecordById(selectedPhotoProcess.recordId).tooth} · ${getRecordById(selectedPhotoProcess.recordId).shade}` : '未关联记录'}</span>
                  </div>
                  <div className="photo-checklist">
                    {appConfig.photoSteps.map((step, idx) => {
                      const stepData = selectedPhotoProcess.steps[step.key];
                      const StepIcon = getStepIcon(step.icon);
                      const isChecked = stepData?.confirmed;
                      return (
                        <div key={step.key} className={'checklist-item ' + (isChecked ? 'checked' : '')}>
                          <div className="checklist-icon">
                            {isChecked ? <CheckCheck size={20} /> : <Square size={20} />}
                          </div>
                          <div className="checklist-content">
                            <div className="checklist-header">
                              <StepIcon size={16} />
                              <strong>步骤 {idx + 1}：{step.label}</strong>
                              {isChecked && <span className="checklist-badge">已确认</span>}
                            </div>
                            {stepData?.remark ? (
                              <p className="checklist-note">{stepData.remark}</p>
                            ) : (
                              <p className="checklist-empty">暂无备注</p>
                            )}
                            {stepData?.environment && (
                              <span className="checklist-env">
                                <Sun size={12} /> {stepData.environment}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="checklist-summary">
                    {getPhotoProcessProgress(selectedPhotoProcess) === 100 ? (
                      <p className="checklist-complete">✓ 所有步骤已完成确认</p>
                    ) : (
                      <p className="checklist-progress">已完成 {appConfig.photoSteps.filter((s) => selectedPhotoProcess.steps[s.key]?.confirmed).length} / {appConfig.photoSteps.length} 个步骤</p>
                    )}
                  </div>
                  <div className="actions" style={{ marginTop: '16px' }}>
                    <button className="primary" type="button" onClick={() => {
                      setEditingPhotoProcess({ ...selectedPhotoProcess });
                    }}>
                      <Edit3 size={14} />继续编辑
                    </button>
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <ClipboardList size={48} style={{ color: '#d0d5dd' }} />
                  <p className="empty">点击左侧任意拍照流程查看完整检查清单。</p>
                </div>
              )}
            </aside>
          </section>
        </>
      )}

      {activeTab === 'deliveryOrders' && (
        <>
          <section className="metrics">
            {deliveryOrderMetrics.map((metric) => (
              <article className="metric" key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </article>
            ))}
          </section>

          <section className="workspace">
            <form className="panel form-panel" onSubmit={createDeliveryOrder}>
              <div className="panel-title">
                <ArrowLeftRight size={18} />
                <h2>新建交接单</h2>
              </div>

              <label className="wide">
                <span>技工所名称</span>
                <input
                  type="text"
                  value={deliveryOrderForm.labName}
                  onChange={(e) => setDeliveryOrderForm({ ...deliveryOrderForm, labName: e.target.value })}
                  placeholder="如：精准义齿技工所"
                  required
                />
              </label>

              <label className="wide">
                <span>交接备注</span>
                <textarea
                  value={deliveryOrderForm.remark}
                  onChange={(e) => setDeliveryOrderForm({ ...deliveryOrderForm, remark: e.target.value })}
                  placeholder="如：请加急处理、注意颈部颜色等"
                  rows={3}
                />
              </label>

              <div className="panel-title" style={{ marginTop: '8px' }}>
                <Layers size={16} />
                <h2 style={{ fontSize: '15px' }}>选择待修复记录（可多选）</h2>
                <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#667085', fontWeight: '600' }}>
                  已选 {deliveryOrderForm.recordIds?.length || 0} 条
                </span>
              </div>

              {pendingRecords.length > 0 ? (
                <div className="delivery-select-list">
                  {pendingRecords.map((record) => {
                    const isSelected = deliveryOrderForm.recordIds?.includes(record.id);
                    return (
                      <div
                        key={record.id}
                        className={'delivery-select-item ' + (isSelected ? 'selected' : '')}
                        onClick={() => toggleRecordForDelivery(record.id)}
                      >
                        <div className="delivery-select-checkbox">
                          {isSelected ? <CheckCheck size={18} /> : <Square size={18} />}
                        </div>
                        <div className="delivery-select-content">
                          <div className="delivery-select-head">
                            <strong>{record.patient}</strong>
                            <span className="do-tooth-shade">牙位 {record.tooth} · {record.shade}</span>
                          </div>
                          <p className="delivery-select-note">{record.photoNote || '无拍照备注'}</p>
                          {record.followUp && (
                            <span className="delivery-select-date">
                              <CalendarDays size={12} /> 复诊：{record.followUp}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="empty-state" style={{ padding: '30px 20px' }}>
                  <ClipboardList size={36} style={{ color: '#d0d5dd' }} />
                  <p className="empty">暂无可交接的待修复记录</p>
                  <p className="hint">所有待修复记录已创建交接单，或暂无待修复记录。</p>
                </div>
              )}

              <button className="primary" type="submit">
                <Send size={18} />生成交接单
              </button>
              <p className="hint">从已录入的牙位、比色结果、拍照备注和复诊日期自动生成交接信息。</p>
            </form>

            <section className="panel list-panel">
              <div className="toolbar">
                <div className="panel-title" style={{ marginBottom: 0, flex: 1 }}>
                  <Package size={18} />
                  <h2>交接单列表</h2>
                </div>
                <select value={deliveryOrderFilter} onChange={(e) => setDeliveryOrderFilter(e.target.value)}>
                  <option>全部</option>
                  {appConfig.deliveryOrderStatuses.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              {filteredDeliveryOrders.length > 0 ? (
                <div className="records">
                  {filteredDeliveryOrders.map((order) => (
                    <article
                      className={'record delivery-record ' + (selectedDeliveryOrder?.id === order.id ? 'selected' : '')}
                      key={order.id}
                      onClick={() => setSelectedDeliveryOrder(order)}
                    >
                      <div className="record-head">
                        <div>
                          <h3>{order.orderNo}</h3>
                          <p>{order.labName} · {order.recordIds.length} 条记录</p>
                        </div>
                        <span className={'status ' + deliveryOrderStatusClass(order.status)}>{order.status}</span>
                      </div>
                      {order.remark && <p className="record-detail">{order.remark}</p>}
                      <div className="delivery-order-meta">
                        <span><CalendarDays size={12} /> 创建：{new Date(order.createdAt).toLocaleDateString('zh-CN')}</span>
                        {order.sentAt && <span><Send size={12} /> 发送：{new Date(order.sentAt).toLocaleDateString('zh-CN')}</span>}
                      </div>
                      <div className="actions" onClick={(e) => e.stopPropagation()}>
                        {appConfig.deliveryOrderStatuses.map((status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => updateDeliveryOrderStatus(order.id, status)}
                            disabled={order.status === status}
                          >
                            {status}
                          </button>
                        ))}
                        <button className="ghost-danger" type="button" onClick={() => removeDeliveryOrder(order.id)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <Package size={48} style={{ color: '#d0d5dd' }} />
                  <h3>暂无交接单</h3>
                  <p className="empty">在左侧创建新的技工所交接单。</p>
                </div>
              )}
            </section>
          </section>

          <section className="insights">
            <div className="panel">
              <div className="panel-title">
                <Layers size={18} />
                <h2>技工所交接统计</h2>
              </div>
              <div className="date-groups">
                {appConfig.deliveryOrderStatuses.map((status) => {
                  const count = deliveryOrders.filter((d) => d.status === status).length;
                  return (
                    <div key={status} className="date-group">
                      <strong>{status}</strong>
                      <span>{count} 张交接单</span>
                    </div>
                  );
                })}
                <div className="date-group">
                  <strong>关联记录</strong>
                  <span>{deliveryOrders.reduce((sum, d) => sum + d.recordIds.length, 0)} 条</span>
                </div>
              </div>
            </div>

            <aside className="panel detail-panel">
              <div className="panel-title">
                <CheckCircle2 size={18} />
                <h2>交接单详情</h2>
              </div>
              {selectedDeliveryOrder ? (
                <div className="detail">
                  <div className="delivery-detail-header">
                    <div>
                      <h3>{selectedDeliveryOrder.orderNo}</h3>
                      <p style={{ marginTop: '4px' }}>{selectedDeliveryOrder.labName}</p>
                    </div>
                    <span className={'status ' + deliveryOrderStatusClass(selectedDeliveryOrder.status)}>
                      {selectedDeliveryOrder.status}
                    </span>
                  </div>

                  {selectedDeliveryOrder.remark && (
                    <div className="delivery-remark-box">
                      <Info size={14} />
                      <span>{selectedDeliveryOrder.remark}</span>
                    </div>
                  )}

                  <div className="detail-section-divider">
                    <ClipboardList size={16} />
                    交接记录清单（{selectedDeliveryOrder.recordIds.length} 条）
                  </div>

                  <div className="delivery-record-list">
                    {selectedDeliveryOrder.recordIds.map((rid) => {
                      const record = getRecordById(rid);
                      if (!record) return null;
                      return (
                        <div key={rid} className="delivery-record-item">
                          <div className="delivery-record-head">
                            <strong>{record.patient}</strong>
                            <span className="do-tooth-shade">牙位 {record.tooth} · {record.shade}</span>
                          </div>
                          {record.photoNote && <p className="delivery-record-note">{record.photoNote}</p>}
                          {record.followUp && (
                            <span className="delivery-record-date">
                              <CalendarDays size={12} /> 复诊日期：{record.followUp}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="timeline">
                    <span>创建时间 · {new Date(selectedDeliveryOrder.createdAt).toLocaleString('zh-CN')}</span>
                    {selectedDeliveryOrder.sentAt && (
                      <span>发送时间 · {new Date(selectedDeliveryOrder.sentAt).toLocaleString('zh-CN')}</span>
                    )}
                    {selectedDeliveryOrder.receivedAt && (
                      <span>回收时间 · {new Date(selectedDeliveryOrder.receivedAt).toLocaleString('zh-CN')}</span>
                    )}
                  </div>

                  <div className="detail-actions">
                    <p className="hint">更新交接状态：</p>
                    <div className="actions">
                      {appConfig.deliveryOrderStatuses.map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => updateDeliveryOrderStatus(selectedDeliveryOrder.id, status)}
                          disabled={selectedDeliveryOrder.status === status}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="empty">点击任意交接单查看详情和关联记录。</p>
              )}
            </aside>
          </section>
        </>
      )}

      {activeTab === 'followUpBoard' && (
        <>
          <section className="metrics" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
            {boardMetrics.map((metric) => (
              <article className={'metric ' + (metric.label === '逾期复诊' && metric.value > 0 ? 'metric-overdue' : '')} key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </article>
            ))}
          </section>

          <div className="panel" style={{ marginBottom: '18px' }}>
            <div className="board-toolbar">
              <div className="panel-title" style={{ marginBottom: 0 }}>
                <CalendarRange size={18} />
                <h2>未来14天复诊排期 · 拖拽卡片调整日期</h2>
              </div>
              <div className="board-filters">
                <select value={boardFilterStatus} onChange={(e) => setBoardFilterStatus(e.target.value)}>
                  <option value="全部">全部状态</option>
                  <option value="overdue">逾期</option>
                  <option value="today">今日</option>
                  <option value="soon">即将到期(3天内)</option>
                  <option value="normal">已排期</option>
                </select>
              </div>
            </div>
            <div className="board-legend">
              <div className="legend-item"><span className="legend-dot legend-overdue"></span>逾期</div>
              <div className="legend-item"><span className="legend-dot legend-today"></span>今日</div>
              <div className="legend-item"><span className="legend-dot legend-soon"></span>即将到期(3天内)</div>
              <div className="legend-item"><span className="legend-dot legend-normal"></span>已排期</div>
            </div>
          </div>

          <section className="board-container">
            {recordsByDate.overdueRecords.length > 0 && (
              <div className="board-column board-overdue-column">
                <div className="board-column-header board-header-overdue">
                  <div>
                    <AlertOctagon size={16} />
                    <strong>逾期未复诊</strong>
                  </div>
                  <span className="board-count">{recordsByDate.overdueRecords.length} 条</span>
                </div>
                <div
                  className="board-column-body"
                  onDragOver={(e) => handleDragOver(e, 'overdue')}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, addDays(today, -1))}
                >
                  {recordsByDate.overdueRecords.map((record) => {
                    const status = getFollowUpStatus(record.followUp);
                    const isFiltered = filteredBoardRecordsByStatus.find((r) => r.id === record.id);
                    if (boardFilterStatus !== '全部' && !isFiltered) return null;
                    return (
                      <div
                        key={record.id}
                        className={'board-card ' + status.class + ' ' + (boardSelectedRecord?.id === record.id ? 'selected' : '') + ' ' + (draggedRecordId === record.id ? 'dragging' : '')}
                        draggable
                        onDragStart={(e) => handleDragStart(e, record.id)}
                        onDragEnd={handleDragEnd}
                        onClick={() => setBoardSelectedRecord(record)}
                      >
                        <div className="board-card-header">
                          <GripVertical size={14} className="drag-handle" />
                          <h4>{record.patient}</h4>
                          <span className={'status ' + statusClass(record.status)}>{record.status}</span>
                        </div>
                        <div className="board-card-meta">
                          <span>牙位 {record.tooth} · {record.shade}</span>
                        </div>
                        <div className="board-card-footer">
                          <span className="board-followup-date">
                            <Clock size={12} />
                            {record.followUp}（逾期 {Math.abs(diffDays(record.followUp, today))} 天）
                          </span>
                        </div>
                        {editingFollowUpRecordId === record.id ? (
                          <div className="board-card-date-picker" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="date"
                              value={record.followUp || ''}
                              onChange={(e) => {
                                updateFollowUpDate(record.id, e.target.value);
                                setEditingFollowUpRecordId(null);
                              }}
                              autoFocus
                            />
                            <button type="button" onClick={() => setEditingFollowUpRecordId(null)}>
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="board-edit-date-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingFollowUpRecordId(record.id);
                            }}
                          >
                            <Edit3 size={12} /> 调整日期
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="board-scroll-wrapper">
              <div className="board-days-row">
                {next14Days.map((dateStr) => {
                  const dateInfo = formatDateLabel(dateStr);
                  const dayRecords = recordsByDate.grouped[dateStr] || [];
                  const isToday = dateStr === today;
                  const dayStatus = isToday ? 'today' : (diffDays(dateStr, today) <= 3 ? 'soon' : 'normal');
                  return (
                    <div
                      key={dateStr}
                      className={'board-column ' + (dragOverDate === dateStr ? 'drag-over' : '') + ' ' + (isToday ? 'board-column-today' : '')}
                    >
                      <div className={'board-column-header board-header-' + dayStatus}>
                        <div>
                          <strong>{dateInfo.date}</strong>
                          <span className="board-weekday">{dateInfo.weekday}</span>
                        </div>
                        <span className="board-count">{dayRecords.length} 条</span>
                      </div>
                      <div
                        className="board-column-body"
                        onDragOver={(e) => handleDragOver(e, dateStr)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, dateStr)}
                      >
                        {dayRecords.map((record) => {
                          const status = getFollowUpStatus(record.followUp);
                          const isFiltered = filteredBoardRecordsByStatus.find((r) => r.id === record.id);
                          if (boardFilterStatus !== '全部' && !isFiltered) return null;
                          return (
                            <div
                              key={record.id}
                              className={'board-card ' + status.class + ' ' + (boardSelectedRecord?.id === record.id ? 'selected' : '') + ' ' + (draggedRecordId === record.id ? 'dragging' : '')}
                              draggable
                              onDragStart={(e) => handleDragStart(e, record.id)}
                              onDragEnd={handleDragEnd}
                              onClick={() => setBoardSelectedRecord(record)}
                            >
                              <div className="board-card-header">
                                <GripVertical size={14} className="drag-handle" />
                                <h4>{record.patient}</h4>
                                <span className={'status ' + statusClass(record.status)}>{record.status}</span>
                              </div>
                              <div className="board-card-meta">
                                <span>牙位 {record.tooth} · {record.shade}</span>
                              </div>
                              <div className="board-card-footer">
                                <span className="board-followup-date">
                                  <Clock size={12} />
                                  {isToday ? '今日复诊' : `${diffDays(dateStr, today)}天后`}
                                </span>
                              </div>
                              {editingFollowUpRecordId === record.id ? (
                                <div className="board-card-date-picker" onClick={(e) => e.stopPropagation()}>
                                  <input
                                    type="date"
                                    value={record.followUp || ''}
                                    onChange={(e) => {
                                      updateFollowUpDate(record.id, e.target.value);
                                      setEditingFollowUpRecordId(null);
                                    }}
                                    autoFocus
                                  />
                                  <button type="button" onClick={() => setEditingFollowUpRecordId(null)}>
                                    <X size={14} />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  className="board-edit-date-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingFollowUpRecordId(record.id);
                                  }}
                                >
                                  <Edit3 size={12} /> 调整日期
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="insights">
            <div className="panel">
              <div className="panel-title">
                <CalendarDays size={18} />
                <h2>复诊排期统计（受筛选同步影响）</h2>
              </div>
              <div className="date-groups">
                {['overdue', 'today', 'soon', 'normal'].map((key) => {
                  const labels = { overdue: '逾期', today: '今日', soon: '即将到期', normal: '已排期' };
                  const count = filteredBoardRecordsByStatus.filter((r) => getFollowUpStatus(r.followUp).key === key).length;
                  return (
                    <div key={key} className="date-group">
                      <strong>{labels[key]}</strong>
                      <span>{count} 条记录</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <aside className="panel detail-panel">
              <div className="panel-title">
                <CheckCircle2 size={18} />
                <h2>复诊详情</h2>
              </div>
              {boardSelectedRecord ? (
                <div className="detail">
                  <h3>{boardSelectedRecord.patient}</h3>
                  <p>{`牙位 ${boardSelectedRecord.tooth} · ${boardSelectedRecord.shade}`}</p>
                  <p>{boardSelectedRecord.photoNote}</p>
                  <div className="detail-followup-status">
                    <div className={'followup-status-tag ' + getFollowUpStatus(boardSelectedRecord.followUp).class}>
                      {getFollowUpStatus(boardSelectedRecord.followUp).key === 'overdue' && <AlertOctagon size={14} />}
                      {getFollowUpStatus(boardSelectedRecord.followUp).key === 'today' && <CalendarCheck size={14} />}
                      {getFollowUpStatus(boardSelectedRecord.followUp).key === 'soon' && <Clock size={14} />}
                      {getFollowUpStatus(boardSelectedRecord.followUp).key === 'normal' && <CalendarDays size={14} />}
                      <strong>{getFollowUpStatus(boardSelectedRecord.followUp).label}</strong>
                      <span>· 复诊日期：{boardSelectedRecord.followUp}</span>
                    </div>
                  </div>
                  <div className="detail-section-divider">
                    <Edit3 size={16} />
                    调整复诊日期
                  </div>
                  <label className="wide">
                    <span>选择新的复诊日期</span>
                    <input
                      type="date"
                      value={boardSelectedRecord.followUp || ''}
                      onChange={(e) => updateFollowUpDate(boardSelectedRecord.id, e.target.value)}
                    />
                  </label>

                  {getShadeInfo(boardSelectedRecord.shade) && (
                    <div className="shade-detail-card">
                      <div className="shade-detail-header">
                        <div className={'shade-swatch-sm shade-' + boardSelectedRecord.shade.charAt(0).toLowerCase()}>
                          <span>{boardSelectedRecord.shade}</span>
                        </div>
                        <div>
                          <h4>色号 {boardSelectedRecord.shade} 说明</h4>
                          <button
                            type="button"
                            className="link-btn"
                            onClick={() => setShadeDetailModal(getShadeInfo(boardSelectedRecord.shade))}
                          >
                            查看完整说明
                          </button>
                        </div>
                      </div>
                      <div className="shade-detail-content">
                        <p><strong>文字说明：</strong>{getShadeInfo(boardSelectedRecord.shade)?.description}</p>
                        <p><strong>适用场景：</strong>{getShadeInfo(boardSelectedRecord.shade)?.scenario}</p>
                        <p><strong>注意事项：</strong>{getShadeInfo(boardSelectedRecord.shade)?.notes}</p>
                      </div>
                    </div>
                  )}

                  <div className="timeline">
                    {(boardSelectedRecord.timeline || []).map((step, index) => (
                      <span key={index}>{step.at} · {step.status} · {step.by}</span>
                    ))}
                  </div>

                  <div className="detail-actions">
                    <p className="hint">快速更新修复状态（需满足质控条件）：</p>
                    <div className="actions">
                      {appConfig.statuses.map((status) => {
                        const missing = getMissingQcItems(boardSelectedRecord.id, status);
                        const canTransition = missing.length === 0;
                        const isCurrent = boardSelectedRecord.status === status;
                        return (
                          <button
                            key={status}
                            type="button"
                            onClick={() => updateStatus(boardSelectedRecord.id, status)}
                            disabled={isCurrent || !canTransition}
                            title={isCurrent ? '当前状态' : canTransition ? `切换至${status}` : `需先完成: ${missing.map((m) => m.label).join('、')}`}
                          >
                            {status}
                            {!isCurrent && !canTransition && <ShieldAlert size={12} style={{ marginLeft: 4 }} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="empty-state" style={{ padding: '40px 20px' }}>
                  <Info size={48} style={{ color: '#d0d5dd' }} />
                  <p className="empty">点击看板中任意复诊记录查看详情和时间线。</p>
                  <p className="hint">可拖拽卡片至不同日期列，或点击「调整日期」按钮选择新日期。</p>
                </div>
              )}
            </aside>
          </section>
        </>
      )}

      {editingPhotoProcess && (
        <div className="modal-overlay" onClick={() => setEditingPhotoProcess(null)}>
          <div className="modal-content" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="panel-title" style={{ marginBottom: 0 }}>
                <Camera size={18} />
                <h2>比色拍照流程</h2>
              </div>
              <button className="modal-close" onClick={() => setEditingPhotoProcess(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="photo-process-record-info">
                <strong>{getRecordById(editingPhotoProcess.recordId)?.patient || '未知患者'}</strong>
                <span>{getRecordById(editingPhotoProcess.recordId) ? `牙位 ${getRecordById(editingPhotoProcess.recordId).tooth} · ${getRecordById(editingPhotoProcess.recordId).shade}` : '未关联记录'}</span>
              </div>

              <div className="step-stepper">
                {appConfig.photoSteps.map((step, idx) => {
                  const StepIcon = getStepIcon(step.icon);
                  const isActive = editingPhotoProcess.currentStep === idx;
                  const isCompleted = editingPhotoProcess.steps[step.key]?.confirmed;
                  return (
                    <div
                      key={step.key}
                      className={'step-item ' + (isActive ? 'active' : '') + ' ' + (isCompleted ? 'completed' : '')}
                      onClick={() => goToStep(idx)}
                    >
                      <div className="step-icon-wrap">
                        {isCompleted ? <CheckCheck size={18} /> : <StepIcon size={18} />}
                      </div>
                      <span className="step-label">{step.label}</span>
                    </div>
                  );
                })}
              </div>

              {(() => {
                const currentStepConfig = appConfig.photoSteps[editingPhotoProcess.currentStep];
                const currentStepData = editingPhotoProcess.steps[currentStepConfig.key];
                const StepIcon = getStepIcon(currentStepConfig.icon);
                return (
                  <div className="step-form">
                    <div className="step-form-header">
                      <StepIcon size={24} />
                      <div>
                        <h3>步骤 {editingPhotoProcess.currentStep + 1}：{currentStepConfig.label}</h3>
                        <p>{currentStepConfig.description}</p>
                      </div>
                    </div>

                    <div className="step-form-image">
                      {currentStepData?.imageUrl ? (
                        <div className="image-preview-box">
                          <img src={currentStepData.imageUrl} alt={currentStepConfig.label} />
                          <button
                            type="button"
                            className="image-remove-btn"
                            onClick={() => removeImage(currentStepConfig.key)}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <label className="image-upload-area">
                          <Upload size={32} style={{ color: '#9ca3af' }} />
                          <span>点击上传{currentStepConfig.label}</span>
                          <p className="hint">支持 JPG、PNG 格式</p>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => handleImageUpload(currentStepConfig.key, e)}
                          />
                        </label>
                      )}
                    </div>

                    <div className="step-form-fields">
                      <label className="wide">
                        <span>拍摄备注</span>
                        <textarea
                          value={currentStepData?.remark || ''}
                          onChange={(e) => updatePhotoProcessStep(currentStepConfig.key, 'remark', e.target.value)}
                          placeholder={currentStepConfig.placeholder}
                          rows={3}
                        />
                      </label>
                      <label className="wide">
                        <span>拍摄环境</span>
                        <select
                          value={currentStepData?.environment || ''}
                          onChange={(e) => updatePhotoProcessStep(currentStepConfig.key, 'environment', e.target.value)}
                        >
                          <option value="">请选择拍摄环境</option>
                          {appConfig.photoEnvironments.map((env) => (
                            <option key={env} value={env}>{env}</option>
                          ))}
                        </select>
                      </label>
                      <label className="wide step-confirm-label">
                        <div
                          className="step-confirm-row"
                          onClick={() => updatePhotoProcessStep(currentStepConfig.key, 'confirmed', !currentStepData?.confirmed)}
                        >
                          <input
                            type="checkbox"
                            checked={currentStepData?.confirmed || false}
                            onChange={(e) => updatePhotoProcessStep(currentStepConfig.key, 'confirmed', e.target.checked)}
                          />
                          <span>我已确认该照片符合要求，备注信息准确无误</span>
                        </div>
                      </label>
                    </div>

                    <div className="step-form-nav">
                      {editingPhotoProcess.currentStep > 0 ? (
                        <button type="button" className="secondary" onClick={prevStep}>
                          <ChevronLeft size={16} />上一步
                        </button>
                      ) : (
                        <button type="button" className="secondary" onClick={() => setEditingPhotoProcess(null)}>
                          取消
                        </button>
                      )}
                      {editingPhotoProcess.currentStep < appConfig.photoSteps.length - 1 ? (
                        <button type="button" className="primary" onClick={nextStep}>
                          下一步<ChevronRight size={16} />
                        </button>
                      ) : (
                        <button type="button" className="primary" onClick={() => savePhotoProcess()}>
                          <Save size={16} />完成并保存
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'qualityControl' && (
        <>
          <section className="metrics" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
            {qcMetrics.map((metric) => (
              <article className={'metric ' + (metric.label === '待完善' && metric.value > 0 ? 'metric-qc-incomplete' : '')} key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </article>
            ))}
          </section>

          <section className="workspace">
            <section className="panel list-panel">
              <div className="toolbar">
                <div className="panel-title" style={{ marginBottom: 0, flex: 1 }}>
                  <ShieldCheck size={18} />
                  <h2>质控检查清单</h2>
                </div>
                <select value={qcFilter} onChange={(e) => setQcFilter(e.target.value)}>
                  <option value="全部">全部状态</option>
                  {appConfig.statuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="qc-legend">
                {appConfig.statuses.map((status) => {
                  const items = qcCheckItems.filter((ci) => ci.requiredFor.includes(status));
                  const criticalItems = items.filter((ci) => ci.critical);
                  return (
                    <div key={status} className="qc-legend-item">
                      <span className={'status ' + statusClass(status)}>{status}</span>
                      <span className="qc-legend-label">
                        必检: {criticalItems.map((i) => i.label).join('、')}
                        {criticalItems.length < items.length && (
                          <span style={{ color: '#9ca3af', marginLeft: '4px' }}>
                            (+可选: {items.filter((i) => !i.critical).map((i) => i.label).join('、')})
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>

              {filteredQcRecords.length > 0 ? (
                <div className="records">
                  {filteredQcRecords.map(({ record, qc, progress, missing }) => {
                    const todoItems = getTodoItemsForStatus(record.id, record.status);
                    const criticalMissing = missing.filter((m) => m.critical);
                    const optionalMissing = missing.filter((m) => !m.critical);
                    return (
                      <article
                        className={'record qc-record ' + (progress === 100 ? 'qc-complete' : progress > 0 ? 'qc-inprogress' : 'qc-notstarted') + ' ' + (selectedQcRecord?.recordId === record.id ? 'selected' : '')}
                        key={record.id}
                        onClick={() => {
                          setSelectedQcRecord({ record, qc: qc || ensureQcForRecord(record.id), progress, missing });
                          setSelected(record);
                        }}
                      >
                        <div className="record-head">
                          <div>
                            <h3>{record.patient}</h3>
                            <p>{`牙位 ${record.tooth} · ${record.shade}`}</p>
                          </div>
                          <span className={'status ' + statusClass(record.status)}>{record.status}</span>
                        </div>

                        <div className="qc-progress-bar" style={{ marginTop: '10px' }}>
                          {todoItems.map((ci) => (
                            <div
                              key={ci.key}
                              className={'qc-progress-dot ' + (ci.isChecked ? 'done' : 'pending')}
                              title={`${ci.label}${ci.critical ? ' ★关键' : ''}${ci.isChecked ? '（已完成）' : '（待完成）'}`}
                            />
                          ))}
                        </div>

                        <p className="record-detail" style={{ marginTop: '8px' }}>
                          质控进度：{progress}%
                          {criticalMissing.length > 0 && (
                            <span className="qc-missing-tag">
                              <AlertOctagon size={12} /> 关键缺: {criticalMissing.map((m) => m.label).join('、')}
                            </span>
                          )}
                          {optionalMissing.length > 0 && criticalMissing.length === 0 && (
                            <span className="qc-missing-inline" style={{ marginLeft: '4px' }}>
                              <ShieldAlert size={12} /> 可选缺: {optionalMissing.map((m) => m.label).join('、')}
                            </span>
                          )}
                        </p>

                        <div className="qc-todo-list" onClick={(e) => e.stopPropagation()}>
                          {todoItems.map((ci) => (
                            <div
                              key={ci.key}
                              className={'qc-todo-item ' + (ci.isChecked ? 'qc-todo-done' : ci.critical ? 'qc-todo-critical' : 'qc-todo-optional')}
                            >
                              <button
                                type="button"
                                className="qc-todo-toggle"
                                onClick={() => toggleQcItem(record.id, ci.key)}
                                title={ci.isChecked ? '撤销' : '确认'}
                              >
                                {ci.isChecked ? <CheckCheck size={16} /> : <Square size={16} />}
                              </button>
                              <div className="qc-todo-content">
                                <span className="qc-todo-label">{ci.label}</span>
                                {ci.critical && !ci.isChecked && <span className="qc-critical-badge">关键</span>}
                                {!ci.critical && <span className="qc-optional-tag">可选</span>}
                                {ci.isChecked && ci.checkedAt && (
                                  <span className="qc-todo-time">
                                    <Clock size={10} /> {new Date(ci.checkedAt).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="empty-state">
                  <ShieldCheck size={48} style={{ color: '#d0d5dd' }} />
                  <h3>暂无质控记录</h3>
                  <p className="empty">在比色记录中添加记录后，质控检查会自动关联。</p>
                </div>
              )}
            </section>

            <aside className="panel detail-panel">
              <div className="panel-title">
                <ShieldCheck size={18} />
                <h2>质控详情</h2>
                <button
                  type="button"
                  className="qc-config-toggle"
                  onClick={() => setShowQcConfig(!showQcConfig)}
                  title={showQcConfig ? '关闭配置' : '检查项配置'}
                >
                  {showQcConfig ? <X size={14} /> : <Layers size={14} />}
                  {showQcConfig ? '关闭配置' : '配置检查项'}
                </button>
              </div>

              {showQcConfig ? (
                <div className="qc-config-panel">
                  <div className="qc-config-header">
                    <p className="qc-config-desc">配置质控检查项：添加、编辑或删除检查项，调整每个状态下所需的检查项及关键性。</p>
                  </div>

                  <div className="qc-config-list">
                    {qcCheckItems.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((ci, idx) => (
                      <div key={ci.key} className="qc-config-item">
                        <div className="qc-config-item-header">
                          <span className="qc-config-order">{idx + 1}</span>
                          <strong>{ci.label}</strong>
                          <span className="qc-config-key">({ci.key})</span>
                          {ci.critical && <span className="qc-critical-badge">关键</span>}
                          {!ci.critical && <span className="qc-optional-tag">可选</span>}
                          <div className="qc-config-item-actions">
                            <button type="button" className="btn-icon" onClick={() => setEditingQcItem({ ...ci })} title="编辑">
                              <Edit3 size={14} />
                            </button>
                            <button type="button" className="btn-icon" onClick={() => removeQcItemConfig(ci.key)} title="删除">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <p className="qc-config-item-desc">{ci.description}</p>
                        <div className="qc-config-status-toggles">
                          {appConfig.statuses.map((status) => {
                            const isActive = ci.requiredFor.includes(status);
                            return (
                              <label key={status} className="qc-config-status-label">
                                <input
                                  type="checkbox"
                                  checked={isActive}
                                  onChange={(e) => {
                                    const updated = {
                                      ...ci,
                                      requiredFor: e.target.checked
                                        ? [...ci.requiredFor, status]
                                        : ci.requiredFor.filter((s) => s !== status)
                                    };
                                    saveQcItemConfig(updated);
                                  }}
                                />
                                <span className={'status ' + statusClass(status)} style={{ fontSize: '11px', padding: '2px 6px' }}>
                                  {status}
                                </span>
                              </label>
                            );
                          })}
                          <label className="qc-config-status-label">
                            <input
                              type="checkbox"
                              checked={ci.critical}
                              onChange={(e) => {
                                saveQcItemConfig({ ...ci, critical: e.target.checked });
                              }}
                            />
                            <span style={{ fontSize: '11px', fontWeight: '700', color: ci.critical ? '#b91c1c' : '#6b7280' }}>关键项</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>

                  {editingQcItem && (
                    <div className="qc-config-edit-form">
                      <div className="qc-config-edit-header">
                        <strong>{editingQcItem.key && qcCheckItems.find((c) => c.key === editingQcItem.key) ? '编辑检查项' : '新增检查项'}</strong>
                        <button type="button" className="btn-icon" onClick={() => setEditingQcItem(null)}>
                          <X size={14} />
                        </button>
                      </div>
                      <div className="form-grid">
                        <label>
                          <span>检查项键名（英文）</span>
                          <input
                            type="text"
                            value={editingQcItem.key || ''}
                            onChange={(e) => setEditingQcItem({ ...editingQcItem, key: e.target.value.replace(/[^a-zA-Z0-9_]/g, '') })}
                            placeholder="如：initialShade"
                            disabled={!!qcCheckItems.find((c) => c.key === editingQcItem.key)}
                          />
                        </label>
                        <label>
                          <span>显示名称</span>
                          <input
                            type="text"
                            value={editingQcItem.label || ''}
                            onChange={(e) => setEditingQcItem({ ...editingQcItem, label: e.target.value })}
                            placeholder="如：初次比色"
                          />
                        </label>
                        <label className="wide">
                          <span>描述说明</span>
                          <input
                            type="text"
                            value={editingQcItem.description || ''}
                            onChange={(e) => setEditingQcItem({ ...editingQcItem, description: e.target.value })}
                            placeholder="如：完成患者牙位比色，确认色号选择准确"
                          />
                        </label>
                        <label>
                          <span>图标</span>
                          <select
                            value={editingQcItem.icon || 'ClipboardList'}
                            onChange={(e) => setEditingQcItem({ ...editingQcItem, icon: e.target.value })}
                          >
                            <option value="Palette">调色板</option>
                            <option value="Camera">相机</option>
                            <option value="ArrowLeftRight">交接</option>
                            <option value="Stethoscope">听诊器</option>
                            <option value="CheckCircle2">完成</option>
                            <option value="ClipboardList">清单</option>
                          </select>
                        </label>
                        <label>
                          <span>排序号</span>
                          <input
                            type="number"
                            value={editingQcItem.order ?? 1}
                            onChange={(e) => setEditingQcItem({ ...editingQcItem, order: parseInt(e.target.value) || 1 })}
                            min={1}
                          />
                        </label>
                      </div>
                      <div className="qc-config-edit-actions">
                        <button type="button" className="primary" onClick={() => saveQcItemConfig(editingQcItem)}>
                          <Save size={14} /> 保存
                        </button>
                        <button type="button" className="secondary" onClick={() => setEditingQcItem(null)}>
                          取消
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="qc-config-bottom-actions">
                    <button type="button" className="secondary" onClick={() => setEditingQcItem({ key: '', label: '', icon: 'ClipboardList', requiredFor: [], description: '', order: qcCheckItems.length + 1, critical: false })}>
                      <Plus size={14} /> 新增检查项
                    </button>
                    <button type="button" className="secondary" onClick={resetQcItemConfig}>
                      <RotateCcw size={14} /> 恢复默认配置
                    </button>
                  </div>
                </div>
              ) : selectedQcRecord ? (
                <div className="detail">
                  <div className="qc-detail-header">
                    <div>
                      <h3>{selectedQcRecord.record.patient}</h3>
                      <p>{`牙位 ${selectedQcRecord.record.tooth} · ${selectedQcRecord.record.shade}`}</p>
                    </div>
                    <span className={'status ' + statusClass(selectedQcRecord.record.status)}>
                      {selectedQcRecord.record.status}
                    </span>
                  </div>

                  <div className="qc-detail-progress">
                    <div className="qc-progress-ring">
                      <svg viewBox="0 0 36 36" className="qc-ring-svg">
                        <path
                          className="qc-ring-bg"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="qc-ring-fill"
                          strokeDasharray={`${selectedQcRecord.progress}, 100`}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="qc-ring-text">{selectedQcRecord.progress}%</span>
                    </div>
                    <div className="qc-progress-summary">
                      <strong>当前状态质控进度</strong>
                      <p>
                        {selectedQcRecord.progress === 100
                          ? '所有必检项已完成，可切换至下一状态'
                          : `还需完成 ${selectedQcRecord.missing.length} 项检查`}
                      </p>
                    </div>
                  </div>

                  <div className="detail-section-divider">
                    <ClipboardList size={16} />
                    待办项清单（当前状态：{selectedQcRecord.record.status}）
                  </div>

                  <div className="photo-checklist">
                    {qcCheckItems.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((ci) => {
                      const isRequired = ci.requiredFor.includes(selectedQcRecord.record.status);
                      const isChecked = selectedQcRecord.qc?.items[ci.key]?.checked;
                      const remark = selectedQcRecord.qc?.items[ci.key]?.remark || '';
                      const checkedAt = selectedQcRecord.qc?.items[ci.key]?.checkedAt;
                      const QcIcon = getQcIcon(ci.icon);

                      if (!isRequired && !isChecked) {
                        return (
                          <div key={ci.key} className="checklist-item qc-item-irrelevant">
                            <div className="checklist-icon"><Square size={20} /></div>
                            <div className="checklist-content">
                              <div className="checklist-header">
                                <QcIcon size={16} />
                                <strong>{ci.label}</strong>
                                <span className="qc-irrelevant-badge">当前状态无需</span>
                              </div>
                              <p className="checklist-empty">在更后续的状态中需要完成</p>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={ci.key} className={'checklist-item ' + (isChecked ? 'checked' : '') + (!isRequired ? ' qc-item-optional' : '') + (ci.critical && !isChecked ? ' qc-item-critical' : '')}>
                          <div className="checklist-icon">
                            {isChecked ? <CheckCheck size={20} /> : <Square size={20} />}
                          </div>
                          <div className="checklist-content">
                            <div className="checklist-header">
                              <QcIcon size={16} />
                              <strong>{ci.label}</strong>
                              {isChecked && <span className="checklist-badge">已确认</span>}
                              {!isRequired && isChecked && <span className="qc-optional-badge">可选</span>}
                              {isRequired && !isChecked && ci.critical && <span className="qc-critical-badge">关键</span>}
                              {isRequired && !isChecked && !ci.critical && <span className="qc-required-badge">必检</span>}
                            </div>
                            <p className="qc-item-desc">{ci.description}</p>
                            {isChecked && checkedAt && (
                              <span className="checklist-env">
                                <Clock size={12} /> 确认于 {new Date(checkedAt).toLocaleString('zh-CN')}
                              </span>
                            )}
                            <div className="qc-remark-row" onClick={(e) => e.stopPropagation()}>
                              <input
                                type="text"
                                placeholder="添加备注..."
                                value={remark}
                                onChange={(e) => {
                                  const updated = updateQcRemark(selectedQcRecord.record.id, ci.key, e.target.value);
                                  setSelectedQcRecord({
                                    ...selectedQcRecord,
                                    qc: updated,
                                    missing: getMissingQcItems(updated.recordId, selectedQcRecord.record.status)
                                  });
                                }}
                              />
                              <button
                                type="button"
                                className={isChecked ? 'qc-toggle-btn qc-toggle-uncheck' : 'qc-toggle-btn qc-toggle-check'}
                                onClick={() => {
                                  const updated = toggleQcItem(selectedQcRecord.record.id, ci.key);
                                  const newMissing = getMissingQcItems(updated.recordId, selectedQcRecord.record.status);
                                  const newProgress = getQcProgress(updated.recordId, selectedQcRecord.record.status);
                                  setSelectedQcRecord({
                                    ...selectedQcRecord,
                                    qc: updated,
                                    progress: newProgress,
                                    missing: newMissing
                                  });
                                }}
                              >
                                {isChecked ? <><X size={14} />撤销</> : <><CheckCheck size={14} />确认</>}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="checklist-summary">
                    {selectedQcRecord.progress === 100 ? (
                      <p className="checklist-complete">✓ 当前状态所有必检项已达标</p>
                    ) : (
                      <>
                        {getCriticalMissingQcItems(selectedQcRecord.record.id, selectedQcRecord.record.status).length > 0 && (
                          <p className="checklist-progress" style={{ color: '#b91c1c' }}>
                            <AlertOctagon size={14} /> 关键步骤缺失（不可跳过）：{getCriticalMissingQcItems(selectedQcRecord.record.id, selectedQcRecord.record.status).map((m) => m.label).join('、')}
                          </p>
                        )}
                        {(() => {
                          const nonCriticalMissing = selectedQcRecord.missing.filter((m) => !m.critical);
                          return nonCriticalMissing.length > 0 && (
                            <p className="checklist-progress" style={{ color: '#b45309', marginTop: '4px' }}>
                              <ShieldAlert size={14} /> 非关键步骤缺失（可跳过）：{nonCriticalMissing.map((m) => m.label).join('、')}
                            </p>
                          );
                        })()}
                      </>
                    )}
                  </div>

                  <div className="detail-actions">
                    <p className="hint">状态流转（关键步骤未完成不可跳过，非关键步骤可确认跳过）：</p>
                    <div className="actions">
                      {appConfig.statuses.map((status) => {
                        const criticalMissing = getCriticalMissingQcItems(selectedQcRecord.record.id, status);
                        const allMissing = getMissingQcItems(selectedQcRecord.record.id, status);
                        const isBlocked = criticalMissing.length > 0;
                        const hasOptionalMissing = criticalMissing.length === 0 && allMissing.length > 0;
                        const isCurrent = selectedQcRecord.record.status === status;
                        return (
                          <button
                            key={status}
                            type="button"
                            onClick={() => updateStatus(selectedQcRecord.record.id, status)}
                            disabled={isCurrent || isBlocked}
                            title={
                              isCurrent ? '当前状态' :
                              isBlocked ? `关键步骤未完成: ${criticalMissing.map((m) => m.label).join('、')}` :
                              hasOptionalMissing ? `非关键步骤未完成（可确认跳过）: ${allMissing.map((m) => m.label).join('、')}` :
                              `切换至${status}`
                            }
                          >
                            {status}
                            {isBlocked && !isCurrent && <AlertOctagon size={12} style={{ marginLeft: 4 }} />}
                            {hasOptionalMissing && !isCurrent && <ShieldAlert size={12} style={{ marginLeft: 4 }} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="empty-state" style={{ padding: '40px 20px' }}>
                  <ShieldCheck size={48} style={{ color: '#d0d5dd' }} />
                  <p className="empty">点击左侧任意记录查看质控详情和检查项。</p>
                  <p className="hint">不同修复状态下需要完成的检查项不同，关键步骤缺失时无法直接标记完成。</p>
                </div>
              )}
            </aside>
          </section>

          <section className="insights">
            <div className="panel">
              <div className="panel-title">
                <ClipboardList size={18} />
                <h2>质控规则说明</h2>
              </div>
              <div className="qc-rules-grid">
                {appConfig.statuses.map((status) => {
                  const items = qcCheckItems.filter((ci) => ci.requiredFor.includes(status));
                  const criticalItems = items.filter((ci) => ci.critical);
                  const count = records.filter((r) => r.status === status).length;
                  const doneCount = records.filter((r) => r.status === status && getQcProgress(r.id, status) === 100).length;
                  return (
                    <div key={status} className="qc-rule-card">
                      <div className="qc-rule-header">
                        <span className={'status ' + statusClass(status)}>{status}</span>
                        <span className="qc-rule-count">{doneCount}/{count} 达标</span>
                      </div>
                      <div className="qc-rule-items">
                        {items.map((ci) => {
                          const QcIcon = getQcIcon(ci.icon);
                          return (
                            <div key={ci.key} className="qc-rule-item">
                              <QcIcon size={14} />
                              <span>{ci.label}</span>
                              {ci.critical && <span className="qc-critical-badge" style={{ marginLeft: '4px' }}>关键</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}

      {activeTab === 'dataManagement' && (
        <section className="workspace data-management">
          <div className="panel form-panel data-panel">
            <div className="panel-title">
              <Download size={18} />
              <h2>数据导出</h2>
            </div>
            <p className="data-description">
              将当前浏览器中存储的牙色记录、患者档案和时间线数据导出为 JSON 文件，用于备份或迁移。
            </p>
            <div className="data-stats">
              <div className="data-stat-item">
                <ClipboardList size={20} />
                <div>
                  <strong>{records.length}</strong>
                  <span>牙色记录</span>
                </div>
              </div>
              <div className="data-stat-item">
                <Users size={20} />
                <div>
                  <strong>{patients.length}</strong>
                  <span>患者档案</span>
                </div>
              </div>
            </div>
            <button className="primary" type="button" onClick={exportData}>
              <Download size={18} />导出数据为 JSON
            </button>
          </div>

          <div className="panel list-panel data-panel">
            <div className="panel-title">
              <HardDriveUpload size={18} />
              <h2>数据导入</h2>
            </div>
            <p className="data-description">
              选择从本系统导出的 JSON 文件进行数据导入。导入前会展示详细的统计信息和冲突提示，确认后才会执行合并。
            </p>

            {!importPreview ? (
              <div className="import-area">
                <label className="import-label">
                  <Upload size={32} style={{ color: '#9ca3af' }} />
                  <span>点击选择 JSON 文件或拖拽到此处</span>
                  <p className="hint">仅支持由本系统导出的数据文件</p>
                  <input
                    type="file"
                    accept=".json,application/json"
                    style={{ display: 'none' }}
                    onChange={handleImportFile}
                  />
                </label>
                {importFileName && (
                  <p className="import-filename">已选择：{importFileName}</p>
                )}
              </div>
            ) : (
              <div className="import-preview">
                <div className="import-preview-header">
                  <CheckCircle2 size={20} style={{ color: 'var(--accent)' }} />
                  <h3>文件解析成功</h3>
                </div>

                <div className="import-stats">
                  <div className="import-stat-card">
                    <h4>牙色记录</h4>
                    <div className="import-stat-grid">
                      <div className="import-stat-item">
                        <span className="label">总计</span>
                        <strong>{importPreview.totalRecords}</strong>
                      </div>
                      <div className="import-stat-item">
                        <span className="label">新增</span>
                        <strong className="text-success">{importPreview.newRecords}</strong>
                      </div>
                      <div className="import-stat-item">
                        <span className="label">覆盖</span>
                        <strong className="text-warning">{importPreview.overwrittenRecords}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="import-stat-card">
                    <h4>患者档案</h4>
                    <div className="import-stat-grid">
                      <div className="import-stat-item">
                        <span className="label">总计</span>
                        <strong>{importPreview.totalPatients}</strong>
                      </div>
                      <div className="import-stat-item">
                        <span className="label">新增</span>
                        <strong className="text-success">{importPreview.newPatients}</strong>
                      </div>
                      <div className="import-stat-item">
                        <span className="label">覆盖</span>
                        <strong className="text-warning">{importPreview.overwrittenPatients}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {importPreview.duplicatePatientNames.length > 0 && (
                  <div className="import-warning">
                    <AlertTriangle size={18} />
                    <div>
                      <strong>检测到重复患者姓名</strong>
                      <p>以下患者姓名在当前数据中已存在：{importPreview.duplicatePatientNames.join('、')}</p>
                      <p className="hint">系统将按 ID 合并数据，如有冲突请确认导入后检查。</p>
                    </div>
                  </div>
                )}

                {importPreview.overwrittenRecords > 0 && (
                  <div className="import-warning">
                    <AlertTriangle size={18} />
                    <div>
                      <strong>将覆盖 {importPreview.overwrittenRecords} 条已有记录</strong>
                      <p>这些记录 ID 在当前数据中已存在，导入后将被新数据替换。</p>
                    </div>
                  </div>
                )}

                {importPreview.overwrittenPatients > 0 && (
                  <div className="import-warning">
                    <AlertTriangle size={18} />
                    <div>
                      <strong>将覆盖 {importPreview.overwrittenPatients} 个已有患者档案</strong>
                      <p>这些患者 ID 在当前数据中已存在，导入后将被新数据替换。</p>
                    </div>
                  </div>
                )}

                <div className="import-actions">
                  <button type="button" className="secondary" onClick={cancelImport}>
                    <X size={16} />取消
                  </button>
                  <button type="button" className="primary" onClick={confirmImport}>
                    <CheckCircle2 size={16} />确认合并导入
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {activeTab === 'multiClinicCollab' && (
        <section className="workspace collab-workspace" style={{ gridTemplateColumns: '420px minmax(0, 1fr)', gap: '18px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div className="panel data-panel">
              <div className="panel-title">
                <Tablet size={18} />
                <h2>当前设备</h2>
              </div>
              <p className="data-description">
                选择当前使用的诊室设备，所有新录入的记录将标记为该设备来源。
              </p>
              <div style={{ display: 'grid', gap: '10px' }}>
                {appConfig.devices.map(device => (
                  <button
                    key={device.id}
                    type="button"
                    onClick={() => switchDevice(device.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: currentDeviceId === device.id
                        ? `2px solid ${device.color}`
                        : '2px solid #e5e7eb',
                      background: currentDeviceId === device.id ? '#f0fdfa' : '#fff',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: device.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      flexShrink: 0
                    }}>
                      <Tablet size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: '800', color: '#111827' }}>{device.name}</div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{device.room}</div>
                    </div>
                    {currentDeviceId === device.id && (
                      <CheckCircle2 size={18} style={{ color: device.color }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="panel data-panel">
              <div className="panel-title">
                <Zap size={18} />
                <h2>模拟其他设备录入</h2>
              </div>
              <p className="data-description">
                模拟从其他诊室平板导入数据，用于测试离线协作合并流程。
              </p>
              <div style={{ display: 'grid', gap: '12px' }}>
                <label>
                  <span>选择模拟设备</span>
                  <select
                    value={collabSimulateDevice}
                    onChange={(e) => setCollabSimulateDevice(e.target.value)}
                  >
                    {appConfig.devices.filter(d => d.id !== currentDeviceId).map(d => (
                      <option key={d.id} value={d.id}>{d.name}（{d.room}）</option>
                    ))}
                  </select>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <label>
                    <span>患者姓名</span>
                    <input
                      type="text"
                      value={collabForm.patient}
                      onChange={(e) => setCollabForm({ ...collabForm, patient: e.target.value })}
                      placeholder="林雨"
                    />
                  </label>
                  <label>
                    <span>牙位</span>
                    <select
                      value={collabForm.tooth}
                      onChange={(e) => setCollabForm({ ...collabForm, tooth: e.target.value })}
                    >
                      {appConfig.fields.find(f => f.key === 'tooth').options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>比色结果</span>
                    <select
                      value={collabForm.shade}
                      onChange={(e) => setCollabForm({ ...collabForm, shade: e.target.value })}
                    >
                      {appConfig.fields.find(f => f.key === 'shade').options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>状态</span>
                    <select
                      value={collabForm.status}
                      onChange={(e) => setCollabForm({ ...collabForm, status: e.target.value })}
                    >
                      {appConfig.statuses.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <label>
                  <span>拍照备注</span>
                  <textarea
                    value={collabForm.photoNote}
                    onChange={(e) => setCollabForm({ ...collabForm, photoNote: e.target.value })}
                    placeholder="请输入拍照备注"
                  />
                </label>
                <label>
                  <span>复诊日期</span>
                  <input
                    type="date"
                    value={collabForm.followUp}
                    onChange={(e) => setCollabForm({ ...collabForm, followUp: e.target.value })}
                  />
                </label>
                <button
                  type="button"
                  className="primary"
                  onClick={simulateAddRecord}
                  style={{ marginTop: '4px' }}
                >
                  <RefreshCw size={16} />模拟导入该设备数据
                </button>
              </div>
            </div>

            <div className="panel data-panel">
              <div className="panel-title">
                <Download size={18} />
                <h2>导出本设备数据</h2>
              </div>
              <p className="data-description">
                将当前设备的所有记录和患者档案导出为 JSON 文件，用于导入其他设备。
              </p>
              <div className="data-stats">
                <div className="data-stat-item">
                  <ClipboardList size={20} />
                  <div>
                    <strong>{records.length}</strong>
                    <span>牙色记录</span>
                  </div>
                </div>
                <div className="data-stat-item">
                  <Users size={20} />
                  <div>
                    <strong>{patients.length}</strong>
                    <span>患者档案</span>
                  </div>
                </div>
              </div>
              <button type="button" className="primary" onClick={exportCollabData}>
                <Download size={18} />导出 {getDeviceInfo(currentDeviceId).name} 数据
              </button>
            </div>

            <div className="panel data-panel">
              <div className="panel-title">
                <HardDriveUpload size={18} />
                <h2>导入其他设备数据</h2>
              </div>
              <p className="data-description">
                选择从其他诊室平板导出的 JSON 文件，系统将自动检测冲突并提供处理方式。
              </p>
              {!collabImportPreview ? (
                <div className="collab-import-area">
                  <label className="import-label">
                    <Upload size={32} style={{ color: '#9ca3af' }} />
                    <span>点击选择 JSON 文件或拖拽到此处</span>
                    <p className="hint">仅支持由本系统多诊室协作功能导出的数据文件</p>
                    <input
                      type="file"
                      accept=".json,application/json"
                      style={{ display: 'none' }}
                      onChange={handleCollabImportFile}
                    />
                  </label>
                  {collabImportFileName && (
                    <p className="import-filename">已选择：{collabImportFileName}</p>
                  )}
                </div>
              ) : (
                <div className="collab-import-result">
                  <div className="collab-import-source">
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: getDeviceInfo(collabImportPreview.sourceDeviceId).color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      flexShrink: 0
                    }}>
                      <Tablet size={22} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <strong>{collabImportPreview.sourceDeviceName}</strong>
                      <span>
                        {getDeviceInfo(collabImportPreview.sourceDeviceId).room}
                        {collabImportPreview.exportedAt && ` · 导出时间 ${formatDateTime(collabImportPreview.exportedAt)}`}
                      </span>
                    </div>
                  </div>
                  <div className="collab-import-stats">
                    <div className="data-stat-item" style={{ flex: 1 }}>
                      <ClipboardList size={20} />
                      <div>
                        <strong>{collabImportPreview.totalRecords}</strong>
                        <span>记录总数</span>
                      </div>
                    </div>
                    <div className="data-stat-item" style={{ flex: 1 }}>
                      <Plus size={20} />
                      <div>
                        <strong style={{ color: '#059669' }}>{collabImportPreview.addedRecords?.length || 0}</strong>
                        <span>新增记录</span>
                      </div>
                    </div>
                    <div className="data-stat-item" style={{ flex: 1 }}>
                      <AlertTriangle size={20} />
                      <div>
                        <strong style={{ color: '#dc2626' }}>{collabImportPreview.conflicts?.length || 0}</strong>
                        <span>冲突记录</span>
                      </div>
                    </div>
                  </div>
                  {(!collabConflicts || collabConflicts.length === 0) ? (
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button type="button" className="secondary" onClick={cancelCollabImport}>
                        <X size={16} />取消
                      </button>
                      <button type="button" className="primary" onClick={confirmCollabImport}>
                        <CheckCircle2 size={16} />确认导入
                      </button>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {collabConflicts && collabConflicts.length > 0 && (
              <div className="panel data-panel collab-conflicts">
                <div className="collab-conflicts-header">
                  <AlertTriangle size={20} />
                  <h3>检测到 {collabConflicts.length} 条冲突记录，请选择处理方式</h3>
                </div>
                <ul className="collab-conflict-list">
                  {collabConflicts.map(conflict => {
                    const localInfo = getDeviceInfo(conflict.local.deviceId);
                    const importInfo = getDeviceInfo(conflict.import.deviceId);
                    return (
                      <li key={conflict.key} className="collab-conflict-item">
                        <div className="conflict-patient-info">
                          <Users size={18} style={{ color: 'var(--accent)' }} />
                          <strong>{conflict.patient}</strong>
                          <span>· 牙位 {conflict.tooth}</span>
                        </div>
                        <div className="conflict-compare">
                          <div className="conflict-side conflict-local">
                            <div className="conflict-side-label" style={{ color: localInfo.color }}>
                              本地版本 · {localInfo.name}
                            </div>
                            <div><strong style={{ fontSize: '16px' }}>{conflict.local.shade}</strong> · {conflict.local.status}</div>
                            <div style={{ color: '#6b7280', fontSize: '12px', marginTop: '4px' }}>
                              {conflict.local.photoNote || '无备注'}
                            </div>
                            <div className="conflict-time">
                              v{conflict.local.version} · {formatDateTime(conflict.local.lastModified)}
                            </div>
                          </div>
                          <div className="conflict-vs">VS</div>
                          <div className="conflict-side conflict-import">
                            <div className="conflict-side-label" style={{ color: importInfo.color }}>
                              导入版本 · {importInfo.name}
                            </div>
                            <div><strong style={{ fontSize: '16px' }}>{conflict.import.shade}</strong> · {conflict.import.status}</div>
                            <div style={{ color: '#6b7280', fontSize: '12px', marginTop: '4px' }}>
                              {conflict.import.photoNote || '无备注'}
                            </div>
                            <div className="conflict-time">
                              v{conflict.import.version} · {formatDateTime(conflict.import.lastModified)}
                            </div>
                          </div>
                        </div>
                        <div className="conflict-resolution">
                          <label
                            className={`conflict-option ${conflict.resolution === 'keepLocal' ? 'selected' : ''}`}
                          >
                            <input
                              type="radio"
                              name={`resolution-${conflict.key}`}
                              checked={conflict.resolution === 'keepLocal'}
                              onChange={() => setConflictResolution(conflict.key, 'keepLocal')}
                            />
                            <div className="conflict-option-content">
                              <strong>保留本地</strong>
                              <span>保留当前设备的数据，忽略导入版本</span>
                            </div>
                          </label>
                          <label
                            className={`conflict-option ${conflict.resolution === 'useImport' ? 'selected' : ''}`}
                          >
                            <input
                              type="radio"
                              name={`resolution-${conflict.key}`}
                              checked={conflict.resolution === 'useImport'}
                              onChange={() => setConflictResolution(conflict.key, 'useImport')}
                            />
                            <div className="conflict-option-content">
                              <strong>采用导入</strong>
                              <span>用导入的数据覆盖当前本地版本</span>
                            </div>
                          </label>
                          <label
                            className={`conflict-option ${conflict.resolution === 'makeCopy' ? 'selected' : ''}`}
                          >
                            <input
                              type="radio"
                              name={`resolution-${conflict.key}`}
                              checked={conflict.resolution === 'makeCopy'}
                              onChange={() => setConflictResolution(conflict.key, 'makeCopy')}
                            />
                            <div className="conflict-option-content">
                              <strong>生成副本</strong>
                              <span>两者都保留，导入数据作为副本新增</span>
                            </div>
                          </label>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="import-actions" style={{ marginTop: '16px' }}>
                  <button type="button" className="secondary" onClick={cancelCollabImport}>
                    <X size={16} />取消导入
                  </button>
                  <button type="button" className="primary" onClick={confirmCollabImport}>
                    <GitMerge size={16} />确认合并 ({collabConflicts.length} 条冲突)
                  </button>
                </div>
              </div>
            )}

            <div className="panel data-panel collab-timeline-panel">
              <div className="panel-title">
                <History size={18} />
                <h2>协作操作时间线</h2>
              </div>
              {collabTimeline.length === 0 ? (
                <div className="shade-preview-empty">
                  <History size={32} style={{ opacity: 0.3 }} />
                  <p>暂无协作操作记录</p>
                  <p className="hint" style={{ marginTop: '4px', fontSize: '13px' }}>
                    切换设备、导入导出、处理冲突等操作会记录在此
                  </p>
                </div>
              ) : (
                <ul className="collab-timeline-list">
                  {collabTimeline.slice(0, 50).map(entry => {
                    const device = getDeviceInfo(entry.deviceId);
                    const IconForType = () => {
                      switch (entry.type) {
                        case 'device-switch': return <RefreshCw size={14} />;
                        case 'export': return <Download size={14} />;
                        case 'import-added':
                        case 'import-patients': return <Plus size={14} />;
                        case 'conflict-resolve-keep': return <ShieldCheck size={14} />;
                        case 'conflict-resolve-import': return <ArrowLeftRight size={14} />;
                        case 'conflict-resolve-copy': return <Copy size={14} />;
                        case 'simulate': return <Zap size={14} />;
                        default: return <Clock size={14} />;
                      }
                    };
                    const typeClass = entry.type?.includes('conflict') ? ' conflict-entry' : '';
                    return (
                      <li key={entry.id} className={`collab-timeline-entry${typeClass}`}>
                        <div className="collab-tl-icon" style={{
                          background: entry.type?.includes('conflict')
                            ? '#fef2f2' : device.color ? `${device.color}15` : '#f3f4f6',
                          color: entry.type?.includes('conflict') ? '#dc2626' : (device.color || '#6b7280')
                        }}>
                          <IconForType />
                        </div>
                        <div className="collab-tl-content">
                          <div className="collab-tl-header">
                            <span className="collab-tl-type">{entry.title}</span>
                            {entry.deviceId && (
                              <span className="collab-tl-device" style={{
                                background: `${device.color}15`,
                                color: device.color
                              }}>
                                {device.name}
                              </span>
                            )}
                          </div>
                          <div className="collab-tl-detail">{entry.detail}</div>
                          <div className="collab-tl-time">{formatDateTime(entry.at)}</div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="panel data-panel">
              <div className="panel-title">
                <Layers size={18} />
                <h2>记录设备来源一览</h2>
              </div>
              <p className="data-description">
                查看当前所有记录的设备来源、最后修改时间和版本号信息。
              </p>
              <div className="records" style={{ maxHeight: '380px' }}>
                {records.length === 0 ? (
                  <p className="empty">暂无记录</p>
                ) : (
                  records.map(record => {
                    const device = getDeviceInfo(record.deviceId);
                    return (
                      <div key={record.id} className="record">
                        <div className="record-head">
                          <div>
                            <h3>{record.patient}</h3>
                            <p>牙位 {record.tooth} · 色号 {record.shade}</p>
                          </div>
                          <span className={`status ${statusClass(record.status)}`}>{record.status}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginTop: '10px',
                          paddingTop: '10px',
                          borderTop: '1px solid #f3f4f6',
                          flexWrap: 'wrap'
                        }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '3px 8px',
                            background: `${device.color}15`,
                            color: device.color,
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '700'
                          }}>
                            <Tablet size={12} />
                            {device.name}
                          </span>
                          <span style={{ color: '#9ca3af', fontSize: '11px', fontWeight: '600' }}>
                            v{record.version || 1}
                          </span>
                          <span style={{ color: '#9ca3af', fontSize: '11px', marginLeft: 'auto' }}>
                            {formatDateTime(record.lastModified)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {shadeDetailModal && (
        <div className="modal-overlay" onClick={() => setShadeDetailModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="panel-title" style={{ marginBottom: 0 }}>
                <div className={'shade-swatch-sm shade-' + shadeDetailModal.code.charAt(0).toLowerCase()}>
                  <span>{shadeDetailModal.code}</span>
                </div>
                <h2>色号 {shadeDetailModal.code} 详情</h2>
              </div>
              <button className="modal-close" onClick={() => setShadeDetailModal(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="shade-detail-section">
                <h4><Info size={16} />文字说明</h4>
                <p>{shadeDetailModal.description || '暂无说明'}</p>
              </div>
              <div className="shade-detail-section">
                <h4><ClipboardList size={16} />适用场景</h4>
                <p>{shadeDetailModal.scenario || '暂无描述'}</p>
              </div>
              <div className="shade-detail-section">
                <h4><AlertCircle size={16} />注意事项</h4>
                <p>{shadeDetailModal.notes || '暂无备注'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
