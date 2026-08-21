# 数据库变更

- 需求编号：`SITE-001`
- 版本号：`v3`

## 变更概览

| 表名 | 变更类型 | 说明 | 是否兼容旧代码 |
|---|---|---|---|
| `fde_appointments` | 新建表 | 保存 FDE 预约、处理状态和 Unix 秒时间 | 是；旧版本不读写该表 |

## 正式迁移方式

- `model.FdeAppointment` 同时加入 `migrateDB` 与 `migrateDBFast`，由 GORM `AutoMigrate` 生成目标方言 DDL。
- 这是项目同时兼容 SQLite、MySQL ≥5.7.8、PostgreSQL ≥9.6 的正式迁移入口；不在单一 SQL 文件中硬编码 `AUTO_INCREMENT`、`SERIAL` 或方言引号。
- 无外键；复合索引 `(status, created_time)` 与表一同创建。

## 前置、幂等与验证

- 前置：应用账号具备建表/建索引权限；发布前完成主库备份。
- 幂等：`AutoMigrate` 可在表已存在时重复运行，不删除已有数据。
- 验证：执行 `docs/sql/requirements_SITE-001/db-change_SITE-001_v3.sql` 中的跨库只读查询，确认字段可访问、索引由数据库管理工具核验。
