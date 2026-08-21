# 前后端一致性

- 需求编号：`SITE-001`
- 版本号：`v3`

## 预约契约

| 项目 | 前端 | 后端/数据库 | 对齐结论 |
|---|---|---|---|
| 路径 | `POST /api/fde/appointments` | 公开 API 同路径 | 一致 |
| 字段 | `name/company/title/contact/scenario/request` | DTO 同名 JSON 字段 | 一致 |
| 长度 | 50/100/50/200/1000；场景最少 10 | Unicode 字符按同一上下界校验 | 一致 |
| 联系方式 | 邮箱或大陆手机号 | 同一邮箱/手机号规则 | 一致 |
| 合作诉求 | 五个固定 value；label 走 i18n | 五个 value 白名单 | 一致 |
| 成功 | 显示已收到、24 小时内回复 | HTTP 200，`success=true`，返回 `data.id` | 一致 |
| 失败 | 保留输入并显示可重试错误 | 400 参数错误、500 存储错误，不回传 PII | 一致 |
| 状态 | 前端不允许指定 | 数据库固定写入 `pending` | 一致 |

## 展示与配置

- `CompanySite` 复用 `PublicHeader`，动态导航与通知继续来自既有后端配置。
- 默认 Notice 展示参考资源的三档定价，但实际费率仍由后台模型/分组配置决定。
- iFAi 是部署运营品牌追加位；New API/QuantumNous 项目身份和 Footer 署名继续保留。
