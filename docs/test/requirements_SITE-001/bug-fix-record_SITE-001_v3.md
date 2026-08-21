# 缺陷修复记录

- 需求编号：`SITE-001`
- 版本号：`v3`

## 修复记录

### BUG-001

- 来源：Controller 边界回归测试。
- 问题描述：联系方式字段未在前后端完整限制到模型 varchar(200) 容量。
- 影响页面/接口/表：FDE 表单、`POST /api/fde/appointments`、`fde_appointments.contact`。
- 修复方案：先增加后端 `contact too long` 失败测试并确认出现 200/写入，再加入服务端 Unicode 1–200 限制；Spec 复审发现前端仍不对齐后，再以失败的 Zod 用例补齐 `.max(200)` 和七语言错误文案。
- 修复分支或提交：当前未提交工作区。
- 是否更新设计/测试文档：是。
- 修复完成时间：`2026-08-20`。
- 修复后状态：Controller 与前端 validation 测试通过，closed。

### BUG-002

- 来源：oxlint、gofmt 检查。
- 问题描述：共享 Header/Footer 受影响文件存在 lint error，Router 新路由缩进不符合 gofmt。
- 影响页面/接口/表：共享布局和 API Router 源码质量门禁，不改变业务数据。
- 修复方案：改为顶层 type import、去除单子 Fragment、使用稳定数据 key、展开嵌套三元，并对改动 Go 文件执行 gofmt。
- 修复分支或提交：当前未提交工作区。
- 是否更新设计/测试文档：是。
- 修复完成时间：`2026-08-20`。
- 修复后状态：受影响 oxlint 无 error，gofmt 无 diff，closed。

### BUG-003

- 来源：Spec 双轴评审。
- 问题描述：`footerHtml` 非空时 Footer 提前返回，没有渲染 CompanySite 显式传入的 iFAi Logo/名称。
- 影响页面/接口/表：首页 Footer；数据库与 API 不受影响。
- 修复方案：先增加“自定义 HTML + 显式品牌”失败组件测试，再在自定义 Footer 布局中仅对显式 `logo/name` 渲染品牌位，同时保留自定义 HTML、法律链接和 New API 项目署名。
- 修复分支或提交：当前未提交工作区。
- 是否更新设计/测试文档：是。
- 修复完成时间：`2026-08-20`。
- 修复后状态：候选修复通过组件测试，但因最终采用单一系统品牌机制，相关代码与测试不纳入发布，withdrawn。

### BUG-004

- 来源：Spec 复审。
- 问题描述：新增 `Contact must be within 200 characters` 被临时 i18n 脚本写到 JSON 根级，运行时命名空间不会读取该翻译。
- 影响页面/接口/表：FDE 表单非英文长度错误提示；API/数据库不受影响。
- 修复方案：通过临时 `add-missing-keys.mjs` 将七语言键移动到 `translation` 对象，删除根级键，运行 `bun run i18n:sync` 后删除临时脚本和报告副产物。
- 修复分支或提交：当前未提交工作区。
- 是否更新设计/测试文档：是。
- 修复完成时间：`2026-08-20`。
- 修复后状态：七语言根级键为空、`translation` 键存在，sync 无缺 key，closed。

### BUG-005

- 来源：Standards 双轴评审。
- 问题描述：FDE 表单直接维护异步状态且未调用统一错误处理；PublicHeader 移动菜单缺 `aria-expanded/controls`，关闭 overlay 未 inert；缺少 pending、同级三卡和移动菜单展开测试。
- 影响页面/接口/表：FDE 表单请求体验、首页移动导航键盘访问与前端回归门禁；数据库契约不变。
- 修复方案：FdeForm 改用 React Query `useMutation`，失败调用 `handleServerError` 并保留表内错误；移动按钮增加 ARIA 关系，关闭 overlay 设置 `aria-hidden`/`inert`；新增 pending、三业务同级布局和移动菜单可访问性测试；同时恢复版权头首位并收紧领域命名。
- 修复分支或提交：当前未提交工作区。
- 是否更新设计/测试文档：是。
- 修复完成时间：`2026-08-20`。
- 修复后状态：受影响 TypeScript、lint、组件测试和生产构建通过，closed。

### BUG-006

- 来源：Standards 最终复审前检查。
- 问题描述：移动菜单打开后仅阻止页面滚动，Tab 仍可能离开全屏菜单；AppHeader 系统品牌缺少回归测试；定价 Notice 仅中文但未说明其配置内容边界。
- 影响页面/接口/表：首页移动导航、控制台共享 Header、默认系统通知；FDE API 与数据库契约不变。
- 修复方案：PublicHeader 打开菜单后聚焦首个链接，并把 Tab/Shift+Tab 限制在菜单内，支持 Escape 关闭及焦点回到菜单按钮；新增 PublicHeader/AppHeader 测试；在配置记录中明确 Notice 是后端动态运营内容，按中文参考定价原文展示，不属于前端 locale 静态文案。
- 修复分支或提交：当前未提交工作区。
- 是否更新设计/测试文档：是。
- 修复完成时间：`2026-08-20`。
- 修复后状态：移动导航焦点自动化测试和 Playwright 390×844 键盘复验通过，closed。

### BUG-007

- 来源：用户对品牌落位的视觉复核。
- 问题描述：候选 iFAi 图片包含圆形标志之外的矩形底图/下方字样；候选并排运营品牌与最终单一系统品牌口径不一致。
- 影响页面/接口/表：首页与控制台 Header、登录/注册等认证布局、首页 Footer；后端 API 与数据库不受影响。
- 修复方案：保留圆形透明外沿的 512×512 PNG 作为可选静态资源；撤出 CompanyBrand 和认证布局并排运营品牌候选，统一复用既有系统设置品牌。
- 修复分支或提交：当前未提交工作区。
- 是否更新设计/测试文档：是。
- 修复完成时间：`2026-08-20`。
- 修复后状态：最终发布范围 6 个测试文件 18 项测试、typecheck、生产构建通过；并排品牌需求不纳入发布，withdrawn。
