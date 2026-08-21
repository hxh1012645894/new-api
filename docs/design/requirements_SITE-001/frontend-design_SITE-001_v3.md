# 前端设计

- 需求编号：`SITE-001`
- 版本号：`v3`

## 变更

- `CompanySite` 改用现有 `PublicHeader`，继续使用后端动态导航和系统通知，不再维护能力/审计/数仓/FDE 的自定义顶部分类。
- 首页、登录页、控制台与 Footer 继续统一读取既有系统配置中的 `SystemName`/`Logo`，不新增并排运营品牌组件；New API/QuantumNous 项目标识和署名保持不变。
- 能力区改写为 Token Supply、Enterprise Brain、FDE 三大业务；EB 明确业务数据 → AI-ready 数仓 → 证据化决策；FDE 明确从业务难题到可上线 AI 工作流。
- FDE 表单固定调用本站 `/api/fde/appointments`，移除 demo 延时和外部 endpoint 配置。

## 品牌配置边界

- 圆形 iFAi 图片作为可选静态资源 `/ifai-logo.png` 随前端包发布，但不改默认 Logo、favicon 或系统名称。
- 本地 SQLite 当前已有 `SystemName=iFAi`、`Logo` 为空；本轮不写入品牌配置。服务器品牌设置由授权管理员通过既有系统设置维护。

## 接口

```text
POST /api/fde/appointments
body: { name, company, title, contact, scenario, request }
response: { success: true, data: { id } }
```

## 状态

- client validation：保持现有 Zod 长度、联系方式和枚举校验。
- submitting：按钮禁用并显示“提交中”。
- success：表单替换为 24 小时响应提示。
- API/网络失败：保留表单数据并显示可重试错误。

## 性能与 i18n

- 不新增依赖或重型模块；API 调用由点击事件触发，不增加首屏请求瀑布。
- 新增 UI 文案全部用 `t()`；locale 只通过 `add-missing-keys.mjs` 写入并运行 `bun run i18n:sync`。
