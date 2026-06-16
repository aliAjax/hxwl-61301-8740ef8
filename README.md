# 牙科诊所牙色比色记录

平板优先的患者牙位比色与复诊跟进台账

## 运行

```bash
npm install
npm run dev
```

默认端口：61301

## 质量门禁

### 一键全量检查

```bash
npm run check
```

依次执行：类型检查 → 单元测试 → 生产构建 → 浏览器冒烟测试。任意环节失败即中止并报错。

### 分项命令

| 命令 | 说明 |
|------|------|
| `npm run typecheck` | TypeScript 类型检查 (`tsc --noEmit`) |
| `npm run test` | Vitest 单元测试（核心数据层） |
| `npm run test:watch` | Vitest 监听模式 |
| `npm run build` | 生产构建（`tsc -b && vite build`） |
| `npm run test:e2e` | Playwright 浏览器冒烟测试 |

### 浏览器冒烟覆盖

E2E 测试自动启动开发服务器（复用 61301 端口），覆盖以下关键入口：

- 新增比色记录（填写表单并提交）
- 切换到数据管理页
- 导出完整备份包（验证下载文件名）
- 协作时间线展示
- 全部标签页加载验证

首次运行 E2E 需安装浏览器：

```bash
npx playwright install chromium
```

## 最小闭环

- 新增、筛选、删除业务记录
- 本地存储保存数据
- 状态流转和详情查看
- 场景化统计与分组视图
