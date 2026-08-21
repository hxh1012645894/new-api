# 代码评审记录

- 需求编号：`SITE-001`
- 版本号：`v3`
- 评审时间：`2026-08-20`
- Fixed point：`main@85a25724`
- 评审范围：该 fixed point 到当前未提交工作区的 SITE-001 v3 变更

## 1. Standards

### 评审结果

- 阻断项：无。
- 非阻断项：无。
- 结论：通过。

### 核对结论

- 后端遵循 Router → Controller → Service → Model；请求 JSON 使用 `common.DecodeJson`，没有新增直接 marshal/unmarshal 调用。
- FDE 预约只使用 GORM 通用字段、`AutoMigrate` 和普通复合索引，未引入 SQLite/MySQL/PostgreSQL 方言专属 SQL。
- 项目规则要求主键由 GORM/目标数据库生成，因此本表不另建雪花 ID 生成器；该选择优先于通用交付模板的雪花 ID 建议。
- PublicHeader 移动菜单具备 `aria-expanded`、`aria-controls`、关闭态 `inert`、打开后焦点循环、Escape 关闭和焦点恢复。
- FDE 表单使用 React Query mutation 与项目统一错误处理，pending/error/success 均有可观察反馈。
- AppHeader、PublicHeader、AuthLayout 和公司首页均继续消费单一系统配置品牌；回归测试明确不存在并排运营品牌。
- 默认 Notice 是后端运营方动态配置内容，不是前端静态 UI 翻译键；按中文定价参考原文展示的 i18n 豁免成立。
- New API/QuantumNous 项目标识和署名继续保留；默认 Logo/favicon/名称替换不进入提交，符合仓库治理规则。

## 2. Spec

### 评审结果

- 阻断项：无。
- 非阻断项：无。
- 结论：通过。

### 需求符合性

- 首页以同级三卡清楚展示 Token Supply、Enterprise Brain、FDE 三大业务。
- Enterprise Brain 呈现客户业务数据到 ODS/DWD/DWS/ADS、受控 AI 检索和有证据决策的链路，吸收参考数仓语义。
- 首页恢复共享 PublicHeader 原导航，系统通知展示参考资源中的三档定价与 DeepSeek 说明。
- 首页、登录页、控制台和 Footer 统一读取既有系统品牌；不新增双品牌并排展示。用户要求的默认品牌替换受仓库治理规则限制，不纳入发布。
- FDE 表单固定提交 `POST /api/fde/appointments`，合法预约规范化后以 `pending` 状态真实写入数据库。
- 七语言新增静态文案均位于 `translation` 命名空间，缺失/多余 key 为 0。

## 3. Delivery Impact

### 页面与接口

- 页面、DTO、接口与数据库字段已对齐：`name/company/title/contact/scenario/request`。
- 联系方式前后端统一限制为 1–200 个 Unicode 字符，并校验邮箱或大陆手机号；业务场景与合作诉求边界一致。
- 成功响应只返回预约 ID；400/500 不回显表单 PII；没有新增公开读取、修改或删除接口。
- 匿名提交叠加 API 既有限流、`CriticalRateLimit` 和请求体限制。

### 数据库与配置

- `fde_appointments` 无外键、无联表，写路径单表；`(status, created_time)` 索引支持后续处理队列。
- 正式 DDL 入口沿用项目 GORM `AutoMigrate`；SQL 目录提供迁移后结构核验、无回填声明和保数据回滚核查，避免硬编码跨方言主键语法。
- 时间字段沿用项目 Unix 秒格式；不适用 `yyyy-MM-dd HH:mm:ss` 展示格式检查。
- 默认 Notice 只在数据库没有非空配置时生效；管理员已有公告继续优先，不改变既有配置覆盖语义。

### 安全、兼容与测试

- 本轮不采集密码、密钥或令牌；Spring Boot/logback 检查不适用于 Go 项目。
- 预约包含联系人 PII，响应与普通错误日志已最小化；浏览器验收测试数据核验后已精确删除。
- `go test ./... -count=1`、`go build ./...`、`bun run typecheck`、最终发布范围 Vitest `6 files / 18 tests` 和 `bun run build` 均通过。
- Playwright Chromium 覆盖 1440×900、390×844，中英、明暗、通知、表单、真实落库及移动菜单键盘焦点循环。

## 4. Gate Conclusion

- 阻断项：无。
- 非阻断风险：无。
- 已知运行语义：已有非空 Notice 覆盖新默认值；Notice 当前是单值中文动态内容；匿名启动时既有 refresh 探测返回 401。
- 复审条件：业务、导航、通知与 FDE 持久化范围已最终复审通过；品牌替换范围已从发布提交排除。
- 总体结论：可发布范围质量门禁通过。
- 是否允许发布：允许将已审查范围提交到 `codex/site-001-company-site` 并按用户授权普通推送；不合并默认分支。
