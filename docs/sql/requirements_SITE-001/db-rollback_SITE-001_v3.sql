-- 需求编号: `SITE-001`
-- 版本号: `v3`
-- 用途: 应用回滚前的数据保留核查
-- 默认策略: 回退应用但保留 fde_appointments，避免删除客户预约。
-- 幂等性: 只读，可重复执行。
-- 危险操作: 本文件故意不包含 DROP TABLE。确需删表时，必须先导出、审批，
--           再由 DBA 针对目标数据库方言人工执行。

SELECT status, COUNT(*) AS appointments_to_preserve
FROM fde_appointments
GROUP BY status;
