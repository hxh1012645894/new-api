# 发布计划

## 1. 基本信息

- 需求编号：`SITE-001`
- 版本号：`v3`
- 发布环境：GitHub + `ubuntu@52.77.177.97`
- 发布时间窗口：`2026-08-21`
- 发布分支：`codex/site-001-company-site`
- 服务器目录：`/home/ubuntu/new-api`

## 2. 发布范围

- 前端：首页三大业务、原导航、单一系统配置品牌、定价通知、FDE 预约表单；圆形图片仅作为可选静态资源发布。
- 后端：匿名 `POST /api/fde/appointments` 及 Router → Controller → Service → Model 持久化链路。
- 数据库：新增 `fde_appointments`，由项目既有 GORM `AutoMigrate` 在应用启动时创建。
- 配置：默认 Notice 更新；服务器使用 PostgreSQL 时通过 `SQL_DSN` 注入连接串，不提交凭据。

## 3. 发布步骤

1. 在本地完成测试、类型检查、受影响 lint/format、前后端构建和文档校验。
2. 从当前工作区创建 `codex/site-001-company-site`，仅暂存已审查的 SITE-001 文件，排除 `.codegraph/`、`docs/参考资源/` 和受保护品牌替换改动。
3. 提交并普通推送到 GitHub `origin/codex/site-001-company-site`，记录提交 SHA。
4. SSH 到 `ubuntu@52.77.177.97`；若 `/home/ubuntu/new-api` 不存在则克隆仓库，否则只在工作区干净时 fetch/pull。
5. 服务器检出并快进到同一提交 SHA；本轮仅同步代码，不擅自启动、重启或替换现有服务。
6. 若后续启动应用，先确认 PostgreSQL 已备份、`SQL_DSN` 可用且数据库账号具备建表/建索引权限，再由单个应用实例执行迁移。

## 4. 发布后验证

- GitHub 分支 SHA 与本地提交 SHA 一致。
- 服务器 `HEAD` 与 GitHub 发布分支 SHA 一致，工作区干净。
- 后续部署应用时验证首页、登录页、控制台读取同一系统配置品牌，并验证通知。
- 调用合法预约请求并确认 PostgreSQL `fde_appointments` 写入 `pending`；验证后精确清理测试记录。
- 按项目策略使用 Playwright 验证桌面/移动、系统品牌主页跳转和 FDE 表单。

## 5. PostgreSQL 兼容与风险

- 项目正式支持 PostgreSQL；`model/main.go` 根据 PostgreSQL 风格 `SQL_DSN` 选择 postgres dialector。
- 新表只使用 GORM 通用 `bigint/varchar/text`、普通复合索引和 `AutoMigrate`，兼容 PostgreSQL ≥9.6。
- 当前本地未设置 `SQL_DSN`，因此使用 SQLite `one-api.db`；这不影响服务器配置 PostgreSQL。
- 本地 SQLite 当前 `SystemName=iFAi`、`Logo` 为空；本轮不新增品牌数据库写入，服务器也不执行品牌配置更新。
- 首次启动会创建新表和索引；启动前需备份并避免多个实例同时首次迁移。
- 回滚应用默认保留 `fde_appointments`，避免删除客户预约；对应只读回滚核查 SQL 已落盘。

## 6. 回滚点

- GitHub 基线：`85a25724ae91b808628cae05ca6f08c26ce68723`。
- 代码回滚：服务器检出发布前 SHA；不使用强制推送或破坏性 reset。
- 数据回滚：保留新表及预约数据；确需删表时先导出并由 DBA 针对 PostgreSQL 显式审批执行。
