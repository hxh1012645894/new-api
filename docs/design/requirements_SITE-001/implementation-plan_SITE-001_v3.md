# 实施计划

- 需求编号：`SITE-001`
- 版本号：`v3`

| 功能点 | 目标 | 前端 | 后端 | 数据库 | 验证 |
|---|---|---|---|---|---|
| FP-1 品牌配置 | 首页、登录页、控制台和 Footer 复用单一系统品牌 | 共享 Header/AuthLayout/Footer，不增加并排品牌 | 无 | 沿用 `options.SystemName/Logo`，本轮不写 | 组件测试 |
| FP-2 原导航与定价 | 复用原 PublicHeader；通知展示三档定价 | CompanySite 放用 PublicHeader | Notice 默认内容 | options 既有表 | 通知 UI/API |
| FP-3 三大业务 | 讲清 Token、EB、FDE | 能力链和数仓文案 | 无 | 无 | 区块测试/i18n |
| FP-4 预约落库 | 公开预约 API 和真实提交 | `/api/fde/appointments` | Controller → Service → Model | 新表 `fde_appointments` | API 集成/表单 |

## 顺序

1. 在公开 API 和表单 seam 写失败测试。
2. 增加 FDE DTO、校验、服务、模型、路由和自动迁移。
3. 前端切换真实 API，复用原导航和单一系统品牌，加入业务文案。
4. 通过脚本补齐七语言翻译，完成单测、Go 测试、类型检查、lint、build。
5. 浏览器验证桌面/移动、明暗主题、通知和预约成功/失败状态。

## UI 参考

- 模式：`reference-only`
- 视口：1440×900、390×844；100% 缩放；中文/英文；明暗主题。
- 沿用：当前 SITE-001 的编辑式结构、Token 轨迹视觉、语义色与组件系统。
- 调整：恢复 `PublicHeader` 信息架构；三大业务成为清晰平级业务入口；品牌继续由系统设置统一提供，不新增并排展示。
