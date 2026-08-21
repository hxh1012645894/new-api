# 测试计划

- 需求编号：`SITE-001`
- 版本号：`v3`
- TDD seam：公开预约 API；FDE 表单和公司首页可观察行为。

| 编号 | 场景 | 预期 |
|---|---|---|
| API-01 | 合法预约 | 200、success=true、数据库存在规范化后的 pending 记录 |
| API-02 | 非法 JSON/缺字段/Unicode 长度越界（含联系方式 >200）/非法联系方式/非法枚举 | 400、数据库不写入 |
| API-03 | DB 写入失败 | 500、不泄露原始输入 |
| FE-01 | 合法表单提交 | 固定调用本站 API，显示成功状态 |
| FE-02 | API 失败 | 保留表单并显示可重试错误 |
| FE-03 | 三大业务 | Token、EB 数据数仓决策、FDE AI 落地文案可见 |
| FE-04 | 导航与品牌 | 原 PublicHeader、通知和单一系统配置品牌可用；首页/登录页/控制台不增加并排运营品牌；移动菜单焦点循环、Escape 关闭并恢复焦点 |
| DB-01 | 自动迁移 | SQLite 测试库能建表并写入；模型字段和状态正确 |
| I18N-01 | 七语言同步 | 无缺 key，sync 报告通过 |
| BROWSER-01 | 1440×900/390×844，明暗、中英 | 无横向溢出；导航、通知、表单状态可操作 |

## 自动化边界

- Go：controller 集成测试通过真实 Gin handler 和 SQLite 测试库验证 API 契约与持久化。
- React：Testing Library 从用户角度输入、提交并断言状态，只 mock 网络边界。
- 浏览器：本地固定流程使用 Playwright；`reference-only` 不做像素差异门禁。

## 环境与数据

- 后端：Go 1.22+，Gin，GORM，SQLite 本地测试库；全量测试同时覆盖项目既有跨库兼容代码。
- 前端：Bun、Vitest/jsdom、Rsbuild；浏览器为 Playwright Chromium。
- 视口：1440×900 与 390×844，100% 页面缩放；中文/英文、浅色/深色交叉覆盖。
- 角色：匿名访客；FDE 预约不要求登录，后台查询/管理不在本轮范围。
- 浏览器预约数据：`site001-v3@example.com`，核对落库后按精确 ID 清理。
- UI 参考：`docs/参考资源/intelligent-warehouse-architecture.html` 等，模式为 `reference-only`。

## 安全检查

- 预约响应、500 错误和普通日志不得包含姓名、联系方式、公司和业务场景原文。
- API 叠加匿名请求体限制和 CriticalRateLimit；不新增公开查询接口。
- 本轮不处理密码、密钥、令牌或验证码；密码存储检查不适用。
