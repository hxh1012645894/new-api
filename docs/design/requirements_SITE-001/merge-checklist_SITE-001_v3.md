# 合并检查清单

- 需求编号：`SITE-001`
- 版本号：`v3`

## 合并前检查

| 检查项 | 说明 | 状态 |
|---|---|---|
| 基线已确认 | 发布分支 `codex/site-001-company-site`，固定点 `85a25724` | passed |
| 文档已更新 | SITE-001 v3 设计、数据库、测试、评审文档已同步 | passed |
| 自测完成 | Go 全量测试/构建、前端 typecheck/受影响测试/build 通过 | passed |
| 回归完成 | 预约边界、i18n、单一系统品牌、通知和历史页面构建通过 | passed |
| 浏览器验收 | Playwright 覆盖桌面/移动、明暗、中英、通知、表单校验与落库 | passed |
| 数据库交付 | AutoMigrate、验证 SQL、无回填、保数据回滚方案齐全 | passed |
| 代码评审 | Standards/Spec/Delivery Impact 门禁无未关闭阻断项 | passed |
| Git 操作 | 用户已授权提交和推送发布分支；不合并默认分支 | authorized |
