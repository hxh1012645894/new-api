# 需求追踪矩阵

- 需求编号：`SITE-001`
- 版本号：`v3`

## 追踪矩阵

| 需求项 | 页面/路由 | 前端组件 | 后端接口 | 数据表/字段 | 测试用例 | 分支名 | 文档版本 | 状态 |
|---|---|---|---|---|---|---|---|---|
| R1 三大业务 | `/` | `CapabilityChain`、`Warehouse` | 无 | 无 | FE-03、I18N-01、BROWSER-01 | 当前工作区 | `v3` | passed |
| R2 原导航与定价通知 | `/` | `PublicHeader`、`NotificationPopover` | `GET /api/notice` | `options.Notice` 默认值 | FE-04、BROWSER-01 | 当前工作区 | `v3` | passed |
| R3 品牌配置 | `/`、登录页、控制台布局、Footer | 共享 Header/Footer/AuthLayout | 既有 `/api/status` | 既有 `options.SystemName/Logo` | FE-04 | `codex/site-001-company-site` | `v3` | partial：保留系统配置入口；受保护品牌替换不发布 |
| R4 FDE 预约落库 | `/#fde` | `FdeForm` | `POST /api/fde/appointments` | `fde_appointments` | API-01～03、FE-01～02、DB-01、BROWSER-01 | 当前工作区 | `v3` | passed |
