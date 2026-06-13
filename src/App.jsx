import { useMemo, useState } from 'react';
import { SmilePlus, Plus, Search, Trash2, RotateCcw, CheckCircle2, AlertTriangle, ClipboardList, CalendarDays, Users, UserPlus, Edit3, Phone, MapPin, AlertCircle, FileText, Palette, Info, X, Save, CalendarCheck, Stethoscope, Camera, User, Sun, CheckSquare, ChevronRight, ChevronLeft, Upload, Image as ImageIcon, ArrowRight, Square, CheckCheck, Send, Package, ArrowLeftRight, Layers, GripVertical, Clock, AlertOctagon, CalendarRange, Download, Database, HardDriveUpload, Monitor, Merge } from 'lucide-react';
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
  "collabStorage": "hxwl-61301-collab",
  "collabTimelineStorage": "hxwl-61301-collab-timeline",
  "collabDeviceStorage": "hxwl-61301-collab-device",
  "accent": "#0f766e",
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
      "status": "待修复"
    },
    {
      "id": "zhou-hang-21",
      "patient": "周航",
      "tooth": "21",
      "shade": "B1",
      "photoNote": "临时冠试戴后复拍",
      "followUp": "2026-06-13",
      "status": "制作中"
    },
    {
      "id": "chen-cheng-36",
      "patient": "陈澄",
      "tooth": "36",
      "shade": "A3",
      "photoNote": "后牙咬合面补充照",
      "followUp": "2026-06-14",
      "status": "已完成修复"
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
  ]
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
    ...item
  }));
}

function loadRecords() {
  const raw = localStorage.getItem(appConfig.storage);
  if (raw) {
    try {
      return JSON.parse(raw);
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

function loadCollabRecords() {
  const raw = localStorage.getItem(appConfig.collabStorage);
  if (raw) {
    try { return JSON.parse(raw); } catch { return []; }
  }
  return [];
}

function loadCollabTimeline() {
  const raw = localStorage.getItem(appConfig.collabTimelineStorage);
  if (raw) {
    try { return JSON.parse(raw); } catch { return []; }
  }
  return [];
}

function loadCollabDevice() {
  const raw = localStorage.getItem(appConfig.collabDeviceStorage);
  if (raw) {
    try { return JSON.parse(raw); } catch { return null; }
  }
  return null;
}

function generateDeviceId() {
  const prefix = 'ROOM';
  const num = String(Math.floor(Math.random() * 90 + 10));
  return `${prefix}-${num}-${uid().slice(0, 4).toUpperCase()}`;
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
  const [collabDevice, setCollabDevice] = useState(loadCollabDevice);
  const [collabRecords, setCollabRecords] = useState(loadCollabRecords);
  const [collabTimeline, setCollabTimeline] = useState(loadCollabTimeline);
  const [collabImportData, setCollabImportData] = useState(null);
  const [collabImportFileName, setCollabImportFileName] = useState('');
  const [collabConflicts, setCollabConflicts] = useState([]);
  const [collabConflictResolutions, setCollabConflictResolutions] = useState({});
  const [collabForm, setCollabForm] = useState({ patient: '', tooth: '11', shade: 'A2', photoNote: '', followUp: '' });

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

  function persistCollabDevice(next) {
    setCollabDevice(next);
    localStorage.setItem(appConfig.collabDeviceStorage, JSON.stringify(next));
  }

  function persistCollabRecords(next) {
    setCollabRecords(next);
    localStorage.setItem(appConfig.collabStorage, JSON.stringify(next));
  }

  function persistCollabTimeline(next) {
    setCollabTimeline(next);
    localStorage.setItem(appConfig.collabTimelineStorage, JSON.stringify(next));
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
    const nextRecord = {
      id: uid(),
      ...form,
      status: form.status || appConfig.primaryStatus,
      createdAt: new Date().toISOString(),
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
    const next = records.map((item) => item.id === id ? {
      ...item,
      status,
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
    if (selected?.id === id) setSelected(null);
    if (selectedPhotoProcess?.recordId === id) setSelectedPhotoProcess(null);
  }

  function duplicateRecord(item) {
    const copied = { ...item, id: uid(), status: appConfig.primaryStatus, timeline: [{ status: appConfig.primaryStatus, at: today, by: '复制' }] };
    persistRecords([copied, ...records]);
    setSelected(copied);
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

  function registerDevice(name) {
    const device = { id: generateDeviceId(), name: name || '未命名诊室', registeredAt: new Date().toISOString() };
    persistCollabDevice(device);
    addCollabTimelineEntry('设备注册', `诊室 ${device.name} (${device.id}) 已注册`);
    return device;
  }

  function addCollabRecord(event) {
    event.preventDefault();
    if (!collabDevice) return;
    if (!collabForm.patient) { alert('请输入患者姓名'); return; }
    const version = 1;
    const now = new Date().toISOString();
    const newRecord = {
      id: uid(),
      ...collabForm,
      status: '待修复',
      deviceId: collabDevice.id,
      deviceName: collabDevice.name,
      version,
      lastModifiedAt: now,
      createdAt: now,
      timeline: [{ status: '待修复', at: today, by: `诊室 ${collabDevice.name}` }]
    };
    const next = [newRecord, ...collabRecords];
    persistCollabRecords(next);
    addCollabTimelineEntry('新增记录', `${collabForm.patient} 牙位${collabForm.tooth} 比色${collabForm.shade}，来源：${collabDevice.name}`);
    setCollabForm({ patient: '', tooth: '11', shade: 'A2', photoNote: '', followUp: '' });
  }

  function updateCollabRecordStatus(id, status) {
    const next = collabRecords.map((r) => {
      if (r.id === id) {
        return {
          ...r,
          status,
          version: r.version + 1,
          lastModifiedAt: new Date().toISOString(),
          timeline: [...(r.timeline || []), { status, at: today, by: `诊室 ${collabDevice?.name || '未知'}` }]
        };
      }
      return r;
    });
    persistCollabRecords(next);
  }

  function removeCollabRecord(id) {
    const record = collabRecords.find((r) => r.id === id);
    const next = collabRecords.filter((r) => r.id !== id);
    persistCollabRecords(next);
    if (record) {
      addCollabTimelineEntry('删除记录', `${record.patient} 牙位${record.tooth} 记录已删除`);
    }
  }

  function addCollabTimelineEntry(type, detail) {
    const entry = {
      id: uid(),
      type,
      detail,
      at: new Date().toISOString(),
      deviceId: collabDevice?.id || '',
      deviceName: collabDevice?.name || ''
    };
    const next = [entry, ...collabTimeline];
    persistCollabTimeline(next);
  }

  function exportCollabData() {
    if (!collabDevice) { alert('请先注册诊室设备'); return; }
    const exportObj = {
      type: 'collab-export',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      device: collabDevice,
      records: collabRecords.filter((r) => r.deviceId === collabDevice.id)
    };
    const jsonStr = JSON.stringify(exportObj, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `collab-${collabDevice.id}-${getLocalDateString().replace(/-/g, '')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addCollabTimelineEntry('导出数据', `本诊室数据已导出，含 ${exportObj.records.length} 条记录`);
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
        if (data.type !== 'collab-export' || !data.device || !data.records) {
          throw new Error('非本系统协作导出文件');
        }
        if (data.device.id === collabDevice?.id) {
          throw new Error('不能导入本设备导出的数据');
        }
        const conflicts = detectCollabConflicts(data.records);
        setCollabImportData(data);
        setCollabConflicts(conflicts);
        const defaultResolutions = {};
        conflicts.forEach((c) => { defaultResolutions[c.localRecord.id] = 'keepLocal'; });
        setCollabConflictResolutions(defaultResolutions);
      } catch (err) {
        alert('导入失败：' + (err.message || '文件格式错误'));
        setCollabImportData(null);
        setCollabImportFileName('');
        setCollabConflicts([]);
        setCollabConflictResolutions({});
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  function detectCollabConflicts(importRecords) {
    const conflicts = [];
    importRecords.forEach((ir) => {
      const localMatch = collabRecords.find(
        (lr) => lr.patient === ir.patient && lr.tooth === ir.tooth
      );
      if (localMatch) {
        const localNewer = localMatch.lastModifiedAt > ir.lastModifiedAt;
        const sameVersion = localMatch.version === ir.version && localMatch.lastModifiedAt === ir.lastModifiedAt;
        if (!sameVersion) {
          conflicts.push({
            localRecord: localMatch,
            importRecord: ir,
            localNewer
          });
        }
      }
    });
    return conflicts;
  }

  function setConflictResolution(localRecordId, resolution) {
    setCollabConflictResolutions((prev) => ({ ...prev, [localRecordId]: resolution }));
  }

  function executeCollabMerge() {
    if (!collabImportData) return;
    const importRecords = collabImportData.records || [];
    const sourceDevice = collabImportData.device;
    let nextRecords = [...collabRecords];
    const timelineEntries = [];

    const nonConflictImports = importRecords.filter((ir) => {
      return !collabConflicts.some((c) => c.importRecord.id === ir.id);
    });

    nonConflictImports.forEach((ir) => {
      nextRecords.push({ ...ir });
      timelineEntries.push({ type: '无冲突导入', detail: `${ir.patient} 牙位${ir.tooth} 比色${ir.shade}，来源：${ir.deviceName || sourceDevice.name}` });
    });

    collabConflicts.forEach((conflict) => {
      const resolution = collabConflictResolutions[conflict.localRecord.id] || 'keepLocal';
      const lr = conflict.localRecord;
      const ir = conflict.importRecord;

      if (resolution === 'keepLocal') {
        timelineEntries.push({
          type: '冲突-保留本地',
          detail: `${lr.patient} 牙位${lr.tooth}：本地版本(v${lr.version}) 优先，忽略导入版本(v${ir.version}，来源：${ir.deviceName || sourceDevice.name})`
        });
      } else if (resolution === 'useImport') {
        nextRecords = nextRecords.map((r) => r.id === lr.id ? {
          ...ir,
          id: lr.id,
          version: lr.version + 1,
          lastModifiedAt: new Date().toISOString(),
          timeline: [...(lr.timeline || []), { status: `冲突覆盖: 比色${ir.shade}`, at: today, by: `合并自 ${ir.deviceName || sourceDevice.name}` }]
        } : r);
        timelineEntries.push({
          type: '冲突-采用导入',
          detail: `${lr.patient} 牙位${lr.tooth}：采用导入版本(v${ir.version}，来源：${ir.deviceName || sourceDevice.name}) 替换本地(v${lr.version})`
        });
      } else if (resolution === 'duplicate') {
        const dupRecord = {
          ...ir,
          id: uid(),
          version: 1,
          lastModifiedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          status: lr.status,
          timeline: [{ status: lr.status, at: today, by: `副本：冲突自 ${ir.deviceName || sourceDevice.name}` }]
        };
        nextRecords = [dupRecord, ...nextRecords];
        timelineEntries.push({
          type: '冲突-生成副本',
          detail: `${lr.patient} 牙位${lr.tooth}：本地(v${lr.version}) 与导入(v${ir.version}，来源：${ir.deviceName || sourceDevice.name}) 均保留，导入版本生成为新副本`
        });
      }
    });

    persistCollabRecords(nextRecords);

    const now = new Date().toISOString();
    const newTimelineEntries = timelineEntries.map((te) => ({
      id: uid(),
      ...te,
      at: now,
      deviceId: collabDevice?.id || '',
      deviceName: collabDevice?.name || ''
    }));
    persistCollabTimeline([...newTimelineEntries, ...collabTimeline]);

    const conflictCount = collabConflicts.length;
    const keptLocal = Object.values(collabConflictResolutions).filter((r) => r === 'keepLocal').length;
    const usedImport = Object.values(collabConflictResolutions).filter((r) => r === 'useImport').length;
    const duplicated = Object.values(collabConflictResolutions).filter((r) => r === 'duplicate').length;
    addCollabTimelineEntry('合并完成', `导入 ${importRecords.length} 条记录，冲突 ${conflictCount} 条（保留本地${keptLocal}，采用导入${usedImport}，生成副本${duplicated}）`);

    cancelCollabImport();
  }

  function cancelCollabImport() {
    setCollabImportData(null);
    setCollabImportFileName('');
    setCollabConflicts([]);
    setCollabConflictResolutions({});
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

  const collabMetrics = useMemo(() => {
    const total = collabRecords.length;
    const localCount = collabRecords.filter((r) => r.deviceId === collabDevice?.id).length;
    const importedCount = total - localCount;
    const devices = new Set(collabRecords.map((r) => r.deviceId));
    return [
      { label: '协作记录', value: total },
      { label: '本诊室录入', value: localCount },
      { label: '外诊室导入', value: importedCount },
      { label: '来源诊室数', value: devices.size }
    ];
  }, [collabRecords, collabDevice]);

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
          className={'tab ' + (activeTab === 'collab' ? 'active' : '')}
          onClick={() => setActiveTab('collab')}
        >
          <Monitor size={16} />
          多诊室离线协作
          {collabConflicts.length > 0 && (
            <span className="tab-badge">{collabConflicts.length}</span>
          )}
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
                    {item.conflict && <div className="warning"><AlertTriangle size={15} />发现冲突</div>}
                    <div className="actions" onClick={(event) => event.stopPropagation()}>
                      {appConfig.statuses.map((status) => (
                        <button key={status} type="button" onClick={() => updateStatus(item.id, status)}>{status}</button>
                      ))}
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
                          disabled={item.status === '制作中'}
                        >
                          <RotateCcw size={14} />
                          制作中
                        </button>
                        <button
                          type="button"
                          className="quick-action-btn primary-action"
                          onClick={() => updateStatus(item.id, '已完成修复')}
                          disabled={item.status === '已完成修复'}
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
                    <p className="hint">快速更新状态：</p>
                    <div className="actions">
                      {appConfig.statuses.map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => updateStatus(selectedTodayFollowUp.id, status)}
                          disabled={selectedTodayFollowUp.status === status}
                        >
                          {status}
                        </button>
                      ))}
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
                    <p className="hint">快速更新修复状态：</p>
                    <div className="actions">
                      {appConfig.statuses.map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => updateStatus(boardSelectedRecord.id, status)}
                          disabled={boardSelectedRecord.status === status}
                        >
                          {status}
                        </button>
                      ))}
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

      {activeTab === 'collab' && (
        <section className="workspace collab-workspace">
          <div className="panel form-panel">
            <div className="panel-title">
              <Monitor size={18} />
              <h2>诊室设备</h2>
            </div>
            {!collabDevice ? (
              <div className="collab-device-register">
                <p className="collab-hint">首次使用需注册当前诊室设备，注册后设备标识将绑定在本浏览器中，用于多诊室协作时识别数据来源。</p>
                <form className="collab-register-form" onSubmit={(e) => { e.preventDefault(); registerDevice(e.target.deviceName.value); }}>
                  <div className="field">
                    <label>诊室名称</label>
                    <input name="deviceName" placeholder="例如：1号诊室" required />
                  </div>
                  <button type="submit" className="primary">
                    <Monitor size={16} />注册设备
                  </button>
                </form>
              </div>
            ) : (
              <div className="collab-device-info">
                <div className="collab-device-card">
                  <div className="collab-device-id">
                    <Monitor size={24} style={{ color: 'var(--accent)' }} />
                    <div>
                      <strong>{collabDevice.name}</strong>
                      <span className="collab-device-code">{collabDevice.id}</span>
                    </div>
                  </div>
                  <span className="collab-device-since">注册于 {new Date(collabDevice.registeredAt).toLocaleString('zh-CN')}</span>
                </div>
                <div className="collab-form-section">
                  <h3><Plus size={16} />录入牙色记录</h3>
                  <form className="collab-add-form" onSubmit={addCollabRecord}>
                    <div className="collab-form-grid">
                      <div className="field">
                        <label>患者姓名</label>
                        <input value={collabForm.patient} onChange={(e) => setCollabForm({ ...collabForm, patient: e.target.value })} placeholder="林雨" required />
                      </div>
                      <div className="field">
                        <label>牙位</label>
                        <select value={collabForm.tooth} onChange={(e) => setCollabForm({ ...collabForm, tooth: e.target.value })}>
                          {["11","12","13","14","15","16","17","18","21","22","23","24","25","26","27","28","31","32","33","34","35","36","37","38","41","42","43","44","45","46","47","48"].map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div className="field">
                        <label>比色结果</label>
                        <select value={collabForm.shade} onChange={(e) => setCollabForm({ ...collabForm, shade: e.target.value })}>
                          {["A1","A2","A3","B1","B2","C1","D2"].map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div className="field">
                        <label>复诊日期</label>
                        <input type="date" value={collabForm.followUp} onChange={(e) => setCollabForm({ ...collabForm, followUp: e.target.value })} />
                      </div>
                    </div>
                    <div className="field">
                      <label>拍照备注</label>
                      <textarea value={collabForm.photoNote} onChange={(e) => setCollabForm({ ...collabForm, photoNote: e.target.value })} placeholder="自然光下正面照，颈部略深" rows={2} />
                    </div>
                    <button type="submit" className="primary"><Plus size={16} />添加记录</button>
                  </form>
                </div>
              </div>
            )}
          </div>

          <div className="panel list-panel">
            <div className="panel-title">
              <Layers size={18} />
              <h2>协作记录</h2>
            </div>
            <section className="metrics collab-metrics">
              {collabMetrics.map((m) => (
                <article className="metric" key={m.label}>
                  <span>{m.label}</span>
                  <strong>{m.value}</strong>
                </article>
              ))}
            </section>
            {collabRecords.length === 0 ? (
              <p className="empty">暂无协作记录，请先注册设备并录入数据</p>
            ) : (
              <ul className="item-list collab-item-list">
                {collabRecords.map((r) => (
                  <li key={r.id} className={'item-card collab-item' + (r.deviceId === collabDevice?.id ? ' collab-local' : ' collab-remote')}>
                    <div className="collab-item-header">
                      <strong className="collab-item-patient">{r.patient}</strong>
                      <span className={'collab-device-badge ' + (r.deviceId === collabDevice?.id ? 'badge-local' : 'badge-remote')}>
                        {r.deviceName || r.deviceId}
                      </span>
                    </div>
                    <div className="collab-item-meta">
                      <span>牙位 {r.tooth}</span>
                      <span>比色 {r.shade}</span>
                      <span className={'status-pill ' + statusClass(r.status)}>{r.status}</span>
                    </div>
                    {r.photoNote && <p className="collab-item-note">{r.photoNote}</p>}
                    <div className="collab-item-footer">
                      <span className="collab-version">v{r.version}</span>
                      <span className="collab-modified">{new Date(r.lastModifiedAt).toLocaleString('zh-CN')}</span>
                      {r.deviceId === collabDevice?.id && (
                        <div className="collab-item-actions">
                          {r.status !== '制作中' && <button className="btn-icon" title="标记为制作中" onClick={() => updateCollabRecordStatus(r.id, '制作中')}><RotateCcw size={14} /></button>}
                          {r.status !== '已完成修复' && <button className="btn-icon" title="标记为已完成修复" onClick={() => updateCollabRecordStatus(r.id, '已完成修复')}><CheckCircle2 size={14} /></button>}
                          <button className="btn-icon" title="删除" onClick={() => removeCollabRecord(r.id)}><Trash2 size={14} /></button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="panel form-panel collab-transfer-panel">
            <div className="panel-title">
              <Merge size={18} />
              <h2>导入导出</h2>
            </div>
            {!collabDevice ? (
              <p className="collab-hint">请先注册诊室设备后再使用导入导出功能</p>
            ) : (
              <>
                <div className="collab-transfer-section">
                  <h4><Download size={16} />导出本诊室数据</h4>
                  <p className="collab-hint">将本诊室录入的记录导出为 JSON 文件，供其他诊室设备导入合并。</p>
                  <button className="primary" type="button" onClick={exportCollabData}>
                    <Download size={16} />导出协作数据
                  </button>
                </div>
                <div className="collab-transfer-section">
                  <h4><HardDriveUpload size={16} />导入其他诊室数据</h4>
                  <p className="collab-hint">选择其他诊室导出的 JSON 文件，系统将自动检测同一患者同一牙位的冲突记录。</p>
                  {!collabImportData ? (
                    <div className="collab-import-area">
                      <label className="import-label">
                        <Upload size={32} style={{ color: '#9ca3af' }} />
                        <span>选择其他诊室导出的 JSON 文件</span>
                        <p className="hint">仅支持由本模块导出的协作数据文件</p>
                        <input type="file" accept=".json,application/json" style={{ display: 'none' }} onChange={handleCollabImportFile} />
                      </label>
                      {collabImportFileName && <p className="import-filename">已选择：{collabImportFileName}</p>}
                    </div>
                  ) : (
                    <div className="collab-import-result">
                      <div className="import-preview-header">
                        <CheckCircle2 size={20} style={{ color: 'var(--accent)' }} />
                        <h3>文件解析成功</h3>
                      </div>
                      <div className="collab-import-source">
                        <Monitor size={18} />
                        <div>
                          <strong>来源诊室：{collabImportData.device.name}</strong>
                          <span>设备ID：{collabImportData.device.id}</span>
                        </div>
                      </div>
                      <div className="collab-import-stats">
                        <div className="data-stat-item">
                          <ClipboardList size={20} />
                          <div>
                            <strong>{collabImportData.records.length}</strong>
                            <span>导入记录</span>
                          </div>
                        </div>
                        <div className="data-stat-item">
                          <AlertTriangle size={20} style={{ color: '#d97706' }} />
                          <div>
                            <strong>{collabConflicts.length}</strong>
                            <span>冲突记录</span>
                          </div>
                        </div>
                        <div className="data-stat-item">
                          <CheckCircle2 size={20} style={{ color: '#059669' }} />
                          <div>
                            <strong>{collabImportData.records.length - collabConflicts.length}</strong>
                            <span>无冲突</span>
                          </div>
                        </div>
                      </div>
                      {collabConflicts.length > 0 && (
                        <div className="collab-conflicts">
                          <div className="collab-conflicts-header">
                            <AlertOctagon size={18} />
                            <h3>冲突记录处理（{collabConflicts.length} 条）</h3>
                          </div>
                          <p className="collab-hint">以下记录与本地数据存在同一患者同一牙位冲突，请逐条选择处理方式。</p>
                          <ul className="collab-conflict-list">
                            {collabConflicts.map((c, idx) => (
                              <li key={c.localRecord.id} className="collab-conflict-item">
                                <div className="conflict-patient-info">
                                  <strong>{c.localRecord.patient}</strong>
                                  <span>牙位 {c.localRecord.tooth}</span>
                                </div>
                                <div className="conflict-compare">
                                  <div className="conflict-side conflict-local">
                                    <span className="conflict-side-label">本地版本</span>
                                    <span>比色 {c.localRecord.shade}</span>
                                    <span>v{c.localRecord.version}</span>
                                    <span className="conflict-time">{new Date(c.localRecord.lastModifiedAt).toLocaleString('zh-CN')}</span>
                                  </div>
                                  <div className="conflict-vs">VS</div>
                                  <div className="conflict-side conflict-import">
                                    <span className="conflict-side-label">导入版本</span>
                                    <span>比色 {c.importRecord.shade}</span>
                                    <span>v{c.importRecord.version}</span>
                                    <span className="conflict-time">{new Date(c.importRecord.lastModifiedAt).toLocaleString('zh-CN')}</span>
                                  </div>
                                </div>
                                <div className="conflict-resolution">
                                  <label className={'conflict-option' + (collabConflictResolutions[c.localRecord.id] === 'keepLocal' ? ' selected' : '')}>
                                    <input type="radio" name={`conflict-${idx}`} checked={collabConflictResolutions[c.localRecord.id] === 'keepLocal'} onChange={() => setConflictResolution(c.localRecord.id, 'keepLocal')} />
                                    <div className="conflict-option-content">
                                      <strong>保留本地</strong>
                                      <span>忽略导入，保持本地数据不变</span>
                                    </div>
                                  </label>
                                  <label className={'conflict-option' + (collabConflictResolutions[c.localRecord.id] === 'useImport' ? ' selected' : '')}>
                                    <input type="radio" name={`conflict-${idx}`} checked={collabConflictResolutions[c.localRecord.id] === 'useImport'} onChange={() => setConflictResolution(c.localRecord.id, 'useImport')} />
                                    <div className="conflict-option-content">
                                      <strong>采用导入</strong>
                                      <span>用导入版本替换本地记录</span>
                                    </div>
                                  </label>
                                  <label className={'conflict-option' + (collabConflictResolutions[c.localRecord.id] === 'duplicate' ? ' selected' : '')}>
                                    <input type="radio" name={`conflict-${idx}`} checked={collabConflictResolutions[c.localRecord.id] === 'duplicate'} onChange={() => setConflictResolution(c.localRecord.id, 'duplicate')} />
                                    <div className="conflict-option-content">
                                      <strong>生成副本</strong>
                                      <span>同时保留两份，导入版本创建新记录</span>
                                    </div>
                                  </label>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="import-actions">
                        <button type="button" className="secondary" onClick={cancelCollabImport}><X size={16} />取消</button>
                        <button type="button" className="primary" onClick={executeCollabMerge}><Merge size={16} />确认合并</button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="panel list-panel collab-timeline-panel">
            <div className="panel-title">
              <Clock size={18} />
              <h2>协作时间线</h2>
            </div>
            {collabTimeline.length === 0 ? (
              <p className="empty">暂无协作时间线记录</p>
            ) : (
              <ul className="collab-timeline-list">
                {collabTimeline.map((entry) => (
                  <li key={entry.id} className={'collab-timeline-entry collab-tl-' + entry.type.replace(/[^\w]/g, '-').toLowerCase()}>
                    <div className="collab-tl-icon">
                      {entry.type.includes('冲突') ? <AlertOctagon size={14} /> :
                       entry.type === '合并完成' ? <Merge size={14} /> :
                       entry.type === '设备注册' ? <Monitor size={14} /> :
                       entry.type.includes('导出') ? <Download size={14} /> :
                       entry.type.includes('导入') ? <HardDriveUpload size={14} /> :
                       <Clock size={14} />}
                    </div>
                    <div className="collab-tl-content">
                      <div className="collab-tl-header">
                        <span className="collab-tl-type">{entry.type}</span>
                        {entry.deviceName && <span className="collab-tl-device">{entry.deviceName}</span>}
                      </div>
                      <p className="collab-tl-detail">{entry.detail}</p>
                      <span className="collab-tl-time">{new Date(entry.at).toLocaleString('zh-CN')}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
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
