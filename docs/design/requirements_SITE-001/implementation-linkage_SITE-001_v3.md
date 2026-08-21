# 实施联动矩阵

- 需求编号：`SITE-001`
- 版本号：`v3`

## 联动矩阵

| 功能点 | 页面/路由 | 前端组件 | 后端接口 | 数据表/字段 | 测试用例 | 分支名 | 状态 |
|---|---|---|---|---|---|---|---|
| FP-1 品牌配置 | `/`、登录页、控制台布局、Footer | `PublicHeader`、`AppHeader`、`AuthLayout`、`Footer` | `/api/status` 既有系统配置 | `options.SystemName/Logo`（本轮不写） | FE-04 | `codex/site-001-company-site` | partial：只复用单一系统品牌，不发布替换默认品牌的改动 |
| FP-2 原导航与定价 | `/`、通知弹层 | `PublicHeader`、`NotificationPopover` | `GET /api/notice` | `options` 既有表/内存默认值 | FE-04、BROWSER-01 | 当前工作区 | passed |
| FP-3 三大业务 | `/` | `CapabilityChain`、`Warehouse` | 无 | 无 | FE-03、I18N-01、BROWSER-01 | 当前工作区 | passed |
| FP-4 预约落库 | `/#fde`、`POST /api/fde/appointments` | `FdeForm`、`submitFdeAppointment` | Controller → Service → Model | `fde_appointments` 全字段 | API-01～03、FE-01～02、DB-01 | 当前工作区 | passed |
