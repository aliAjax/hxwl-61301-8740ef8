import { useMemo, useState } from 'react';
import { SmilePlus, Plus, Search, Trash2, RotateCcw, CheckCircle2, AlertTriangle, ClipboardList, CalendarDays, Users, UserPlus, Edit3, Phone, MapPin, AlertCircle, FileText, Palette, Info, X, Save, CalendarCheck, Stethoscope } from 'lucide-react';
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
  "accent": "#0f766e",
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
      "patient": "林雨",
      "tooth": "11",
      "shade": "A2",
      "photoNote": "自然光下正面照，颈部略深",
      "followUp": "2026-06-13",
      "status": "待修复"
    },
    {
      "patient": "周航",
      "tooth": "21",
      "shade": "B1",
      "photoNote": "临时冠试戴后复拍",
      "followUp": "2026-06-13",
      "status": "制作中"
    },
    {
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
      "name": "林雨",
      "phone": "13800138001",
      "commonTooth": "11, 21",
      "allergyNote": "青霉素过敏",
      "shadeCount": 2
    },
    {
      "name": "周航",
      "phone": "13900139002",
      "commonTooth": "21, 22",
      "allergyNote": "无",
      "shadeCount": 1
    },
    {
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
  }
};

const today = new Date().toISOString().slice(0, 10);

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function withIds(items) {
  return items.map((item) => ({ id: uid(), timeline: item.timeline || [{ status: item.status, at: today, by: '系统' }], ...item }));
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
  return patients.map((p) => ({ id: uid(), createdAt: new Date().toISOString(), ...p }));
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

function statusClass(status) {
  const index = appConfig.statuses.indexOf(status);
  return ['status-a', 'status-b', 'status-c', 'status-d'][index] || 'status-a';
}

function App() {
  const [activeTab, setActiveTab] = useState('records');
  const [records, setRecords] = useState(loadRecords);
  const [patients, setPatients] = useState(loadPatients);
  const [shadeLibrary, setShadeLibrary] = useState(loadShadeLibrary);
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
  }

  function removeRecord(id) {
    const next = records.filter((item) => item.id !== id);
    persistRecords(next);
    if (selected?.id === id) setSelected(null);
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
