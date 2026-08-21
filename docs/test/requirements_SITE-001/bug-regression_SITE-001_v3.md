# 缺陷回归记录

- 需求编号：`SITE-001`
- 版本号：`v3`

## 回归记录

| 缺陷编号 | 回归场景 | 预期结果 | 实际结果 | 回归人 | 状态 |
|---|---|---|---|---|---|
| BUG-001 | 前端/后端提交 >200 字符联系方式 | 前端提示长度错误；绕过前端则 HTTP 400、数据库 0 写入 | Zod 与 Controller 定向测试通过 | Codex | closed |
| BUG-002 | 受影响前端 lint、Go gofmt/full test/build | 无 lint error/格式 diff/编译失败 | 全部通过；Footer 仅有既有 no-danger warning | Codex | closed |
| BUG-003 | `footerHtml` 非空且显式传运营品牌 | 不发布并排品牌覆盖逻辑，保持既有 Footer 行为 | 候选代码与测试未纳入发布提交 | Codex | withdrawn |
| BUG-004 | 检查七语言 locale 命名空间并运行 i18n sync | 键位于 `translation` 且无 missing/extras | 七语言 jq 抽查与 sync 通过 | Codex | closed |
| BUG-005 | API pending/error、三卡布局、移动菜单开合与关闭态 | 统一 mutation/error；按钮反馈；菜单状态可感知且关闭不可聚焦 | 相关组件测试、Playwright ARIA 抽查、typecheck/lint/build 通过 | Codex | closed |
| BUG-006 | 移动菜单键盘循环、Escape、AppHeader 默认品牌和 Notice 配置边界 | 打开后聚焦 Home；Shift+Tab/Tab 在菜单首尾循环；Escape 关闭并恢复按钮焦点；品牌与配置边界有测试/文档保护 | PublicHeader/AppHeader 测试通过；Playwright 实测 Home → Sign in → Home，Escape 后焦点回到按钮 | Codex | closed |
| BUG-007 | 首页、认证布局和控制台运营品牌 | 不新增并排品牌；统一读取既有系统配置 | AppHeader/AuthLayout 测试确认无附加运营品牌；圆形 PNG 仅作为可选资产 | Codex | withdrawn |

## 回归结论

- 已关闭缺陷：BUG-001、BUG-002、BUG-004、BUG-005、BUG-006。
- 退出范围：BUG-003、BUG-007。
- 未关闭缺陷：无。
- 阻塞项：无。
