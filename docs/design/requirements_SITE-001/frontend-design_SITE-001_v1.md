# 前端设计（官网首页）

- 需求编号: `SITE-001`
- 版本号: `v1`

## 1. 页面结构

`/` 默认首页 = `CompanySite`（`web/src/features/company-site/index.tsx`）。

```
SiteHeader（fixed，滚动后毛玻璃 + 底部描边）
main
├─ Hero             #top       Every Token Counts + Token 轨迹圆环 + 双 CTA
├─ Pain                      01 盲区：聚合账单不可逐笔解释（收据示意）
├─ CapabilityChain #capabilities 02 三层次能力链（突出 EB）+ 4 价值卡 + 通Token·通数据·通业务
├─ AuditTrail      #audit     03 调用→归因→可解释记录→可审计账单 + 暗色审计控制台示意 + 90 天标签
├─ Warehouse       #warehouse 04 三断裂痛点 → 分层数仓/AI开发链/决策引擎示意 + 安全横切 + 6 价值点
└─ FdeSection      #fde       05 CTA 文案 + FDE 预约表单
Footer（复用共享 Footer：系统品牌 + 产品/公司链接列 + New API 归属署名）
```

## 2. 组件清单（web/src/features/company-site/）

- `components/site-header.tsx` — 品牌（系统 Logo/名称，回退 iFAi + 四色点阵）、锚点导航（能力/审计链路/数仓/FDE）、语言切换、主题切换、登录/进入控制台、预约 FDE；移动端汉堡菜单（`aria-expanded`/`aria-controls`）。
- `components/section-head.tsx` — 通用版式头（编号 eyebrow + 大标题 + 右栏说明），接收已本地化字符串。
- `components/sections/hero.tsx` — 首屏；`landing-animate-fade-up` 渐进动画；右侧 Token 轨迹圆环（同心圆环 + 四色节点调用/归因/账单/优化 + TOKEN TRACE 内核，蓝色节点带 ping 动效，`role="img"` + aria-label）。
- `components/sections/pain.tsx` — 痛点 + 聚合账单表格示意（移动端横向滚动 `min-w-[560px]`）。
- `components/sections/capability-chain.tsx` — 三层次链：01 Token 接入与成本优化（蓝）、02 Enterprise Brain（紫，EB 徽标 + 「EB 辅助企业决策」tagline + 高亮描边面板，**突出 EB**）、03 FDE（黄）；下接 4 张价值卡与「｜通Token｜通数据｜通业务｜」行。
- `components/sections/audit-trail.tsx` — 四阶段链路（调用→归因→可解释记录→可审计账单，顶部连线 md+ 显示）；深色控制台示意（scope/trace/retention=90d + 脱敏表格）；标签：敏感内容默认脱敏 / 摘要留存 90 天 / 权限范围内可追溯；尾注：平衡兼顾优化、审计与数据安全。
- `components/sections/warehouse.tsx` — 三断裂痛点卡（系统断裂/链路断裂/开发断裂）→ 分层示意（决策引擎层→AI 开发链→数仓分层 ODS→DWD→DWS→ADS→业务数据源）+ 安全横切条（表级/列级掩码/行级 RLS/AD 身份/审计留痕）+ 6 价值点。
- `components/sections/fde-section.tsx` + `components/fde-form.tsx` — 文案 + 表单。
- `lib/schema.ts` — zod 校验（姓名/公司/职位 1–50/100/50 字符；联系方式=邮箱或大陆手机号；业务场景 10–1000；合作诉求枚举）。
- `lib/submit-fde.ts` — 提交逻辑：`VITE_FDE_FORM_ENDPOINT` 配置则 POST（复用统一 `api` 实例），未配置则模拟 900ms 演示提交。

## 3. 表单行为

- React Hook Form + `zodResolver`；字段错误通过 `t(message)` 展示（消息为 i18n 键，已登记 `static-keys.ts`）。
- 状态：校验错误（`aria-invalid` + 字段级错误文案）→ 提交中（按钮禁用 + 「正在提交…」）→ 成功（替换为 `role="status"` 成功面板）→ 失败（`role="alert"` 错误条）。

## 4. 样式与设计语言

- 使用项目 Tailwind v4 令牌（`bg-background`/`bg-card`/`border-border`/`text-muted-foreground`），明暗主题自适应；
- 参考 demo 的编辑风格保留：大字号紧字距标题、编号 eyebrow、发丝线分区（`border-t border-border/60`）、四色圆点（blue/violet/yellow/red）、深色控制台面板（`bg-[#15161a]`）；
- 动效复用 `landing-animate-*`（全局已带 `prefers-reduced-motion` 降级）；锚点平滑滚动 + `scroll-mt-20` 避免固定头部遮挡。

## 5. i18n 策略

- 全部用户可见文案走 `t('English source key')`，键以英文为源；品牌词（iFAi、Every Token Counts、Enterprise Brain、EB、TOKEN TRACE、ODS/DWD/DWS/ADS、ERP/MES/CRM/DDI）保留原文；
- 非字面量键（合作诉求枚举、zod 消息）登记于 `web/src/i18n/static-keys.ts`；
- 7 个语言文件全部补齐（en/zh/zh-TW/fr/ru/ja/vi），`bun run i18n:sync` 校验通过；仅品牌词 `Enterprise Brain` 在各语言保留英文（同步报告中的预期项）。

## 6. 集成点与兼容

- `features/home/index.tsx` 仅替换「无自定义内容」回退分支为 `<CompanySite />`；后台自定义首页（URL/HTML/Markdown）与 iframe 主题/语言同步逻辑原样保留；
- 共享 `Footer` 继续输出 New API 项目署名（受保护信息，未改动）；
- 登录态：导航与首屏「进入控制台」指向 `/dashboard`，未登录指向 `/sign-in`。
