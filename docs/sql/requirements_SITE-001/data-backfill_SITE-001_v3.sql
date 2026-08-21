-- 需求编号: `SITE-001`
-- 版本号: `v3`
-- 用途: 无历史数据回填；迁移后只读核查
-- 说明: 旧 FDE 表单没有持久化事实源，不从日志或浏览器状态构造 PII。
-- 幂等性: 只读，可重复执行。

SELECT COUNT(*) AS appointments_after_migration
FROM fde_appointments;
