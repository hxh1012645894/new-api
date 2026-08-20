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
