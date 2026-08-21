# 后端设计

- 需求编号：`SITE-001`
- 版本号：`v3`

## 链路

`POST /api/fde/appointments` → `controller.CreateFdeAppointment` → `service.CreateFdeAppointment` → `model.FdeAppointment.Insert`。

## 校验

- JSON 必须可解析，字符串统一 `TrimSpace`。
- 姓名 1–50、公司 1–100、职位 1–50、联系方式 1–200、场景 10–1000 个 Unicode 字符。
- 联系方式必须为常规邮箱或中国大陆手机号。
- 合作诉求只允许五个前端既有枚举值。
- 公开接口沿用全局 API 限流，并叠加 CriticalRateLimit 与匿名请求体限制。

## 安全与日志

- 不记录姓名、联系方式、业务场景等 PII 到普通日志；仅在持久化失败时记录无请求正文的错误。
- 不把原始输入回传；成功只返回数据库 ID。
- 无需登录即可提交；不提供本轮未要求的公开查询接口。

## 兼容与异常

- 参数错误返回 HTTP 400；保存失败返回 HTTP 500；成功返回 HTTP 200。
- 新表由 GORM 自动迁移，SQLite/MySQL/PostgreSQL 共用同一模型。
