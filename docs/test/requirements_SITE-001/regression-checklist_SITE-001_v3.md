# 回归检查清单

- 需求编号：`SITE-001`
- 版本号：`v3`

## 1. 回归范围

- 直接影响模块：公司首页、共享 Header/Footer、通知默认值、FDE 表单/API/数据表。
- 间接影响模块：控制台 Header、动态顶部导航、i18n、主库启动迁移、既有 Footer 项目署名。

## 2. 回归检查项

| 检查项 | 场景 | 预期结果 | 实际结果 | 状态 |
|---|---|---|---|---|
| 菜单路由 | 桌面/移动打开首页 | 原动态导航存在，移动菜单可展开 | 与 Home/Console/Model Square/Rankings/Docs/About 一致 | passed |
| 菜单可访问性 | 移动菜单关闭/展开/键盘导航 | `aria-expanded/controls` 正确，关闭 overlay inert；打开后焦点在菜单内循环，Escape 关闭并恢复按钮焦点 | 单测与 Playwright 390×844 键盘复验通过 | passed |
| 品牌保护 | 首页/Header/Footer/登录页/控制台 | 只展示既有系统配置品牌，New API/QuantumNous 标识与署名保留 | AppHeader/AuthLayout 组件测试确认无并排运营品牌 | passed |
| 自定义 Footer | 后台配置 `footerHtml` | 自定义内容、法律链接和项目署名保持既有行为 | 未发布显式运营品牌覆盖逻辑 | not-applicable |
| 定价通知 | 新启动且无数据库 Notice | 显示三档定价 Markdown | 通知弹层可见表格 | passed |
| 三大业务 | 中英文切换 | 三项业务和数仓决策语义清晰 | 中英文案可见 | passed |
| 表单校验 | 空提交/越界输入 | 错误可见，API 不写入 | 前端与后端测试通过 | passed |
| 表单提交 | 匿名合法预约 | 保存 `pending` 并显示成功 | HTTP 200、真实 SQLite 记录核验 | passed |
| 表单 pending/error | 请求等待/失败 | 提交按钮禁用并提示；统一错误处理且保留输入 | 组件测试通过 | passed |
| 保存失败 | 数据库不可用 | 500 且不泄露 PII | Controller 回归测试通过 | passed |
| 历史数据 | 新表上线 | 不修改既有表与数据 | 全量 Go 测试通过 | passed |
| i18n | 七语言同步 | 无缺 key/多余 key | sync 报告通过 | passed |
| 构建 | Go/Web 生产构建 | 无编译错误 | 两端构建通过 | passed |
| 浏览器验收 | Playwright Chromium | 主流程通过并保存证据 | 最终发布候选快照和 console 记录已落盘；早期候选证据不发布 | passed |
| UI 参考 | `reference-only` | 沿用语义，不做像素门禁 | 数仓/定价事实源已采用；Logo 仅提供可选资产 | passed |

## 3. 回归结论

- 通过项：14。
- 失败项：0。
- 阻塞项：0。
- 合并冲突后回归：本轮未发生 merge/rebase；后续若合并到其他分支必须重跑本清单。
