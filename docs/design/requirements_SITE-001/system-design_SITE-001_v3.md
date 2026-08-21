# 系统设计

- 需求编号：`SITE-001`
- 版本号：`v3`

## 边界

- 营销展示仍位于 `web/src/features/company-site`。
- 顶部导航和通知复用共享 layout 模块；首页、登录页和控制台只展示既有系统配置品牌，不新增并排品牌位。
- 预约按 Router → Controller → Service → Model 分层；主数据库是唯一预约事实源。

## 数据流

```text
访客填写表单
  → Zod 客户端校验
  → POST /api/fde/appointments
  → 匿名请求体限制 + 限流
  → 服务端规范化/校验
  → GORM 写入 fde_appointments
  → 返回 id
  → 页面显示成功状态
```

## 发布影响

- 应用启动先自动建表，再提供 API；前后端同版本发布。
- 旧部署无历史预约数据，无需回填。
- 定价通知只作为对外信息展示，实际扣费继续由现有后台费率配置决定，避免把公告当作计费逻辑。
