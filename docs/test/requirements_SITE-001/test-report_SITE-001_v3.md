# 测试报告

- 需求编号：`SITE-001`
- 版本号：`v3`
- 执行时间：`2026-08-21`

## 1. 测试执行概览

- 结论：通过；自动化、构建和浏览器验收均无未关闭阻断项。
- Go：`go test ./... -count=1`、`go build ./...` 通过；预约 Controller 定向测试通过。
- Web：`bun run typecheck` 通过；最终发布范围 Vitest `6 files / 18 tests` 通过；`bun run build` 通过。
- i18n：七语言 `missingCount=0`、`extrasCount=0`；Enterprise Brain 作为专有名词在 ja/ru/zh 保持英文，报告的 1 个 untranslated 为预期。

## 2. 功能测试结果

| 用例 | 实际结果 | 状态 |
|---|---|---|
| FE-01 合法预约 | 同源 POST 200，页面切换为“已收到/24 小时回复” | passed |
| FE-02 API 失败 | 组件测试确认保留输入并显示可重试错误 | passed |
| FE-03 三大业务 | 中英文均显示 Token Supply、Enterprise Brain、FDE 业务结果；EB 数仓决策链路可见 | passed |
| FE-04 导航与品牌 | 原 Home/Console/Model Square/Rankings/Docs/About 导航恢复；首页/登录页/控制台只展示单一系统配置品牌；Footer 保留项目署名 | passed |
| I18N-01 | 七语言无缺 key/多余 key | passed |

## 3. 接口测试结果

| 用例 | 实际结果 | 状态 |
|---|---|---|
| API-01 | 合法字段 TrimSpace 后写入 `pending`；返回 ID | passed |
| API-02 | 缺字段、非法联系方式/枚举、过短场景、姓名/联系方式越界均 400 且写入数为 0 | passed |
| API-03 | 关闭测试数据库后返回 500；响应不含敏感姓名或邮箱 | passed |
| DB-01 | SQLite AutoMigrate 建表、复合索引模型和时间字段写入通过 | passed |

浏览器经 `POST /api/fde/appointments` 写入 ID `1`，数据库核对 name/company/title/contact/request/status/created_time 均正确；随后按 `id=1` 与测试联系方式精确删除该测试记录。

## 4. 权限与异常测试结果

- 权限：匿名访客可提交；未新增公开读取、修改或删除预约的接口。
- 限流/请求体：路由叠加 `CriticalRateLimit` 与匿名 body limit；项目全局 API limiter 继续生效。
- 异常：客户端必填/格式/长度校验可见；服务端对绕过前端的非法输入返回 400。
- PII：成功响应只返回 ID；失败响应不回显原始输入；日志只记录不含表单正文的持久化错误。
- 密码/密钥：本轮不采集，不适用；未发现明文凭据新增。

## 5. 浏览器验收结果

- 任务性质：本地确定性 UI/API 验收；按仓库策略使用 Playwright MCP（Chromium）。
- 地址：`http://localhost:5175/`，后端 `http://localhost:3000/`。
- 视口/缩放：1440×900、390×844；100%。
- 主题/语言：中文浅色、中文深色、英文深色；匿名访客。
- 结果：桌面与移动端无文档级横向溢出；原导航在桌面直接展示、移动端菜单完整展示。
- 品牌：最终候选不增加并排运营品牌；AppHeader/AuthLayout 组件测试确认只显示系统品牌。本地 SQLite 已有 `SystemName=iFAi`、`Logo` 为空，因此发布候选首页显示单一 iFAi 名称并继续使用默认 `/logo.png`；圆形 iFAi 资产仅作为可选静态文件保留。
- 键盘：390×844 打开移动菜单后焦点自动进入 Home；Shift+Tab 循环到 Sign in，Tab 回到 Home；Escape 关闭并把焦点恢复到菜单按钮。
- 通知：打开通知后可见“iFAi 定价模式”标题、三档表格和 DeepSeek 说明。
- 表单：空提交出现六项可访问错误；合法提交网络记录为 HTTP 200，成功状态可见，数据库记录已核验。
- Console：唯一 error 为匿名启动时既有 `/api/user/auth/refresh` 401，不影响页面；未发现本轮 JS 异常。
- 最终发布候选证据：
  - `site001-v3-release-candidate-snapshot.md`
  - `site001-v3-release-candidate-console.txt`
- 早期候选的截图和网络/键盘记录保留在本地测试目录中，因包含已退出发布范围的并排品牌候选，不纳入发布提交。

## 6. UI 参考截图与交互对比结果

- 复现模式：`reference-only`，不是完全复现。
- 截图条件：同一 Playwright Chromium 会话，100% 缩放；上述桌面/移动视口、中英与明暗主题。
- 参考/实现截图：参考事实源为 `docs/参考资源/intelligent-warehouse-architecture.html`、Logo 和定价图；实现截图见第 5 节证据。
- 字体、颜色、样式、间距、尺寸和布局差异：沿用 new-api 现有设计系统，不以参考 HTML 像素一致为目标；数据分层语义与定价内容已吸收，Logo 仅作为可选资产发布。
- 关键交互一致性：导航、通知、主题/语言、移动菜单、表单校验/提交/成功均通过。
- 允许偏差依据：SITE-001 v1 与 v3 需求确认均记录 `reference-only`。
- 复测结论：通过；无未关闭视觉或交互阻断差异。

## 7. 缺陷与风险

- 已修复问题：BUG-001（前后端联系方式长度与数据库容量不一致）、BUG-002（受影响 lint/gofmt 问题）、BUG-004（新增校验翻译键误放 locale 根级）、BUG-005（统一 mutation/error 处理、移动菜单可访问性与测试缺口）、BUG-006（移动菜单焦点陷阱和 Notice 配置边界）。BUG-003/007 的并排运营品牌候选已撤出最终发布范围。
- 未修复风险：默认 Notice 只在数据库未配置 Notice 时生效；管理员设置的非空公告优先，这是既有配置语义。Notice 属于后端动态运营内容，本轮按中文参考定价原文展示，不跟随前端 locale；如需多语言公告，需要后续扩展配置模型。匿名 refresh 401 为既有会话探测行为。
- 自动化沉淀：核心 API/组件行为已固化为 Go/Vitest；本轮浏览器流程用于发布验收，暂不新增 Playwright Test 依赖。
- 格式说明：本轮文件通过 protected-header-safe 格式检查；仓库全量 `format:check` 仍报告 5 个本轮未修改的既有文件，不属于 SITE-001 范围。
