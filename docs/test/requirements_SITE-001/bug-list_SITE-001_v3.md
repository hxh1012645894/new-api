# 缺陷清单

- 需求编号：`SITE-001`
- 版本号：`v3`

## 缺陷列表

| 缺陷编号 | 来源 | 功能点 | 问题描述 | 严重级别 | 影响范围 | 当前状态 |
|---|---|---|---|---|---|---|
| BUG-001 | 边界测试/Spec 评审 | FP-4 预约落库 | 超过 200 字符的合法格式邮箱先后能通过服务端或前端校验，但数据库列为 varchar(200) | 中 | 表单/API/数据库一致性 | closed |
| BUG-002 | lint/格式检查 | FP-1/FP-2 | 受影响 Header/Footer 存在类型导入、无用 Fragment、index key/嵌套三元 lint error；Router 插入缩进未 gofmt | 低 | 前端维护性/Go 格式门禁 | closed |
| BUG-003 | Spec 评审 | FP-1 公司品牌 | 配置自定义 Footer HTML 时提前返回，忽略 CompanySite 显式传入的 iFAi logo/name | 中 | 已配置自定义 Footer 的部署 | withdrawn：显式并排运营品牌不发布 |
| BUG-004 | Spec 复审 | FP-4/i18n | 联系方式长度错误文案误写到 locale JSON 根级，非当前 `translation` namespace | 低 | 非英文运行时翻译 | closed |
| BUG-005 | Standards 评审 | FP-2/FP-3/FP-4 | 表单未走统一 mutation/error 处理；关闭的移动菜单仍可聚焦且缺 aria 状态；pending/布局/展开测试不足 | 中 | 请求错误体验/键盘访问/回归门禁 | closed |
| BUG-006 | Standards 复审 | FP-1/FP-2 | 移动全屏菜单打开后没有焦点陷阱；控制台默认运营品牌缺少回归测试；默认 Notice 的中文配置内容缺少 i18n 边界说明 | 中 | 键盘访问/共享 Header 回归/配置治理 | closed |
| BUG-007 | 用户视觉复核 | FP-1 公司品牌 | iFAi 资产带矩形外层，运营品牌不可点击，登录页未展示 iFAi 品牌 | 中 | 首页/登录页/控制台/Header/Footer | withdrawn：最终复用单一系统品牌 |

当前无 open/blocked 缺陷；BUG-003/007 对应候选实现已退出发布范围。
