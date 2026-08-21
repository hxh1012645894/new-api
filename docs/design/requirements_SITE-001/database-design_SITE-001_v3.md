# 数据库设计

- 需求编号：`SITE-001`
- 版本号：`v3`

## 新表 `fde_appointments`

| 字段 | 类型/长度 | 约束 | 用途 |
|---|---|---|---|
| id | bigint | GORM 主键 | 预约 ID |
| name | varchar(50) | not null | 联系人 |
| company | varchar(100) | not null | 公司 |
| title | varchar(50) | not null | 职位 |
| contact | varchar(200) | not null | 邮箱或手机号 |
| scenario | text | not null | 业务场景 |
| request | varchar(64) | not null | 合作诉求枚举 |
| status | varchar(16) | not null | 初始 `pending` |
| created_time | bigint | not null | Unix 秒 |
| updated_time | bigint | not null | Unix 秒 |

## 索引与读写

- 主键 `id` 由 GORM/目标数据库生成；复合索引 `(status, created_time)` 支持后续按处理状态和时间查看。
- 单次写入，无外键、无联表、无历史数据回填。
- 联系方式不建索引，减少 PII 扩散和无必要存储开销。

## 迁移与回滚

- 迁移：将模型加入 `migrateDB` 与 `migrateDBFast` 的 `AutoMigrate` 列表。
- 兼容：只使用 GORM 的 varchar/text/bigint 和普通索引，覆盖 SQLite、MySQL ≥5.7.8、PostgreSQL ≥9.6。
- 回滚：应用回滚可保留表和预约数据；确需删表时必须先导出并由运维显式执行，不在应用启动时自动删除。
