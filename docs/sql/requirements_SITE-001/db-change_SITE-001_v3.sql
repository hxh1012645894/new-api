-- 需求编号: `SITE-001`
-- 版本号: `v3`
-- 用途: GORM AutoMigrate 完成后的跨库结构可用性验证
-- 正式 DDL 入口: model/main.go 的 migrateDB / migrateDBFast。
-- 原因: 项目同时支持 SQLite、MySQL >= 5.7.8、PostgreSQL >= 9.6，
--       主键生成语法不兼容，因此不在此硬编码 AUTO_INCREMENT/SERIAL。
-- 前置: 应用主节点已成功启动并完成 AutoMigrate。
-- 幂等性: 下列查询只读，可重复执行。

SELECT
    id,
    name,
    company,
    title,
    contact,
    scenario,
    request,
    status,
    created_time,
    updated_time
FROM fde_appointments
WHERE 1 = 0;

SELECT status, COUNT(*) AS appointment_count
FROM fde_appointments
GROUP BY status;
