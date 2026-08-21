# 发布检查清单

| 检查项 | 说明 | 状态 |
|---|---|---|
| 发布范围确认 | SITE-001 v3 前端、后端、数据库和配置范围已记录 | passed |
| 分支策略 | 使用 `codex/site-001-company-site`，不直接提交默认分支 | passed |
| 文档齐全 | 设计、测试、评审、SQL、发布材料齐全 | passed |
| 数据库方案确认 | GORM AutoMigrate 新建 `fde_appointments`，PostgreSQL 兼容 | passed |
| SQL 脚本齐全 | 结构核验、无回填、保数据回滚 SQL 已落盘 | passed |
| 配置确认 | PostgreSQL 使用 `SQL_DSN`；不提交服务器凭据 | passed |
| 配置变更记录 | Notice 和表单同源 API 变更已记录 | passed |
| 回归完成 | Go 全量测试/构建、Web 18 项发布范围测试/typecheck/build 已通过 | passed |
| 浏览器验收 | 首页、登录页、移动导航、FDE 表单已有 Playwright 证据 | passed |
| 品牌治理 | 单一系统品牌机制保留；默认 Logo/favicon/名称替换和数据库品牌写入不执行 | passed |
| GitHub 推送 | 待创建提交并推送发布分支 | in-progress |
| 服务器代码同步 | SSH 已连通；目标目录将使用 `/home/ubuntu/new-api` | in-progress |
| 服务重启 | 本次未授权，不执行 | not-applicable |
| 数据库迁移执行 | 代码同步不触发；后续应用启动前需确认备份与 `SQL_DSN` | not-run |
| 回滚方案明确 | 代码基线与保数据数据库回滚方案已记录 | passed |
