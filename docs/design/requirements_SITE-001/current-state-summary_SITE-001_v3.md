# 当前系统现状扫描摘要

- 需求编号：`SITE-001`
- 版本号：`v3`
- 扫描时间：`2026-08-20 21:31:58`

## 前端现状

- `/` 在未配置自定义首页时渲染 `web/src/features/company-site/`。
- 公司首页已有独立 `SiteHeader`，其导航按能力、审计、数仓、FDE 重新分区，没有复用项目原有 `PublicHeader`，因此缺少原导航的动态菜单和系统通知入口。
- 首页已有 Token、Enterprise Brain、FDE 三层能力，但 Token 仍偏“接入与成本优化”，Enterprise Brain 与数据仓库/决策的关系不够直接，FDE 对“业务难题快速落地”的表达不够明确。
- FDE 表单仅在配置 `VITE_FDE_FORM_ENDPOINT` 时调用外部地址；未配置时等待 900ms 后模拟成功，不会保存数据。
- `PublicHeader` 与控制台 `AppHeader` 均显示系统配置中的 Logo/名称；默认仍为 New API。Footer 已保留 New API/QuantumNous 项目署名。

## 后端与数据库现状

- `/api` 已统一配置全局限流和匿名请求体大小限制，可新增公开预约入口。
- 当前没有 FDE 预约 DTO、Controller、Service、Model 或数据表。
- 主库通过 GORM `AutoMigrate` 同时支持 SQLite、MySQL、PostgreSQL；新表必须加入普通和 fast 两条迁移列表。
- 系统通知来自 `OptionMap["Notice"]`，新库默认空字符串；首页原导航和控制台通知均消费同一 `/api/notice`。

## 参考事实源

- 品牌：`docs/参考资源/logo.png`、`iFAi_业务简介_2608C.md`。
- 三大业务：业务简介中的 Token 供给、Enterprise Brain、FDE 三维堆栈。
- Enterprise Brain 数据能力：`intelligent-warehouse-architecture.html` 的业务源 → ODS/DWD/DWS/ADS → AI Skills → 决策引擎链路。
- 定价通知：`对外售价折扣参考...png` 中三档月规模折扣。
- 导航：SITE-001 之前的 `PublicHeader` 及当前动态顶部导航配置。

## 约束

- 参考 HTML 继续沿用 SITE-001 v1 已确认的 `reference-only` 模式。
- 仓库政策保护 New API 与 QuantumNous 标识；本轮新增 iFAi 运营公司品牌，但保留项目署名和链接。
