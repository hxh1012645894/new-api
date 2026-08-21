# 需求迭代记录

- 需求编号: `SITE-001`

## 记录

### [2026-08-19] v1

- 本次动作：依据 `docs/参考资源`（PPT、两版首页 demo HTML、数仓方案、定价说明图）完成公司官网首页的整体设计与实现。
- 变更摘要：
  - 新增 `web/src/features/company-site/`：站点导航、首屏（Every Token Counts + Token 轨迹圆环）、盲区痛点、三层次能力链（突出 EB）、审计链路（90 天摘要留存 + 脱敏控制台示意）、数仓业务价值、FDE 预约表单；
  - `web/src/features/home/index.tsx`：默认回退内容切换为 `CompanySite`，后台自定义首页逻辑保留；
  - i18n：en/zh/zh-TW/fr/ru/ja/vi 新增 ~138 键；`static-keys.ts` 登记枚举与校验消息键；
  - 测试：`__tests__/` 3 文件 12 用例（schema 校验 + 区块结构 + 表单交互）。
- 新增/更新文档：
  - `requirements-confirmation_SITE-001_v1.md`（复现模式确认：reference-only）
  - `frontend-design_SITE-001_v1.md`
  - `docs/test/requirements_SITE-001/test-report_SITE-001_v1.md`
  - 本轮为纯前端迭代，`backend-design`/`database-design`/`system-design`/`ui-design` 等骨架文档不适用，保留待补充状态。
- 用户确认结论：demo HTML 仅作结构与功能参考（reference-only）；数仓板块酌情加入；定价图属后台配置口径不进首页 —— 三项均为用户在需求中直接给出，未产生待确认问题。
- 关联分支：未建 feature 分支（工作区直接迭代，未提交；如需合入请按项目 `feature_<需求编号>_<功能短名>` 规范建分支）。
- 测试结论：单元/组件测试 12/12 通过；typecheck/lint（新文件）/build 通过；浏览器验收（桌面/移动/明暗/中英/表单四态）通过。
- 风险与待办：
  - FDE 表单生产环境需配置 `VITE_FDE_FORM_ENDPOINT` 接入真实预约后端（或后续在 new-api 后端增加预约落库接口）；
  - 公司品牌（Logo/系统名称）由部署方在后台站点设置中配置后自动生效；
  - 旧默认首页区块（Hero/Stats/Features/HowItWorks/CTA 及其 i18n 键）按受保护信息政策保留在代码库中，未删除。

### [2026-08-19] v1 收尾（提交）

- 本次动作：
  - 删除未使用的 barrel `web/src/features/company-site/components/index.ts`；
  - `knip.config.ts` 增加旧首页区块保留说明（受保护信息政策，不判死代码）；
  - 移动端页头补充语言切换（与桌面端对齐），浏览器复验通过（`screenshot-mobile-header.png`）；
  - 不适用的脚手架文档（backend/database/system/ui design、test-plan、bug 系列）标记「本轮不适用」；
  - 提交 `f2454b0d`（54 文件，+3320/-42），未推送（需明确授权）。

### [2026-08-20] v2（PPT 全量 OCR 消化 + 首页文案充实）

- 本次动作：
  - PPT 全量读取：27 张内嵌图（含 EMF 壳内 JPEG 剥离）经 `http://192.168.10.208:8100` 逐张 OCR，并与接口直读 PPTX 结果合并整理为 `docs/参考资源/iFAi 业务简介_2608C_图片/ocr/iFAi_业务简介_2608C.md`（已去除图片引用干扰，含业务信息总结 + 正文 + 逐页附录）；
  - 用户澄清 **FDE = Forward Deployed Engineer**，修正首页术语（i18n 7 语言），并更正 OCR 文档中的误读标注；
  - 依据 PPT 四大业务能力与模型矩阵充实能力链：01 卡片新增成本优化 chips（Prompt/Cache/模型路由/推理调度）、03 FDE 卡片更新为进场交付语义并新增 chips、新增「主流大模型统一接入」模型矩阵条（Claude/GPT/Gemini/Qwen/GLM/KIMI/Seedance）；
  - i18n：新增 11 键、删除 2 个旧键，走 `add-missing-keys.mjs` 脚本 + `i18n:sync`（临时脚本已删）；
  - 测试更新（能力链断言扩充），typecheck/lint/test/build 通过，浏览器 zh/en 验证通过。
- 新增/更新文档：`frontend-design_SITE-001_v2.md`。
- 用户确认结论：FDE 全称 = Forward Deployed Engineer；示意数据（37.6% 节省率等）与「熵评」名称暂不采用（口径未确认）。
- 关联分支：直接提交 main（同前）。
- 测试结论：12/12 通过；浏览器验证新 chips/模型矩阵/FDE 全称均正常。
- 风险与待办：
  - image15 示意数据如获确认可作为首页数据背书补充；
  - image12/21（核心优势、产品与解决方案）OCR 质量差，如需引用建议人工核对原图。

### [2026-08-20] v3（公司业务、系统品牌配置、定价通知与 FDE 预约落库）

- 本次动作：恢复公司首页原 `PublicHeader` 导航；将 Token 供给、Enterprise Brain、FDE 改为三项平级主营业务；首页、登录页、控制台和 Footer 复用单一系统配置品牌；把参考资源中的三档定价写入默认系统通知；新增 FDE 预约公开 API 与数据库表。
- 后端：新增 `POST /api/fde/appointments`，按 Router → Controller → Service → Model 分层；服务端规范化并验证 Unicode 长度、邮箱/手机号和合作诉求白名单；GORM 自动迁移 `fde_appointments`，状态固定 `pending`，错误响应和普通日志不记录表单 PII。
- 前端：FDE 表单固定调用同源 API，覆盖 invalid/loading/error/success；新增可选静态资源 `/ifai-logo.png`，但不改默认 Logo/favicon/名称；七语言补齐 17 个新增业务/校验文案。
- 测试结论：Go 全量测试与构建通过；最终发布范围 Vitest 18/18、TypeScript、生产构建通过；Playwright 在 1440×900 与 390×844 覆盖中英、明暗、原导航、移动菜单焦点循环、定价通知、表单校验和真实 SQLite 落库，无横向页面溢出；最终单品牌候选由 AppHeader/AuthLayout 组件测试复核。
- 数据处理：浏览器验收记录以 `site001-v3@example.com` 写入一条 `pending` 记录，核对字段后已按精确 ID/联系方式删除测试数据；无客户历史数据回填。
- Git：使用 `codex/site-001-company-site` 发布分支；用户已授权提交、推送与服务器同步，不合并默认分支；`.codegraph/`、`docs/参考资源/`、受保护品牌替换和数据库品牌写入不纳入发布。
