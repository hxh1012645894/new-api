# 实施计划

- 需求编号: `REQ_20260827_hero_every_token_counts`
- 版本号: `v1`
- 计划日期: `2026-08-27 21:49:37`

## 1. 计划依据

- 已确认项：
  - `reference-only`：参考图和 HTML 只提供视觉方向。
  - Hero 中英文统一显示 `Every Token Counts.`。
  - 01/02/03 每段保留少量文字和一幅主视觉。
- 未确认项：
  - 无
- 确认后才允许实施的事项：
  - 无

## 2. 当前系统真实现状摘要

- 模块现状：
  - Clerk Full Logo；Clerk Logo；Icon Dir；Icon Discord；Icon Docker；Icon Facebook
- 页面现状：
  - web/src/assets/clerk-full-logo.tsx；web/src/assets/clerk-logo.tsx；web/src/assets/custom/icon-dir.tsx；web/src/assets/brand-icons/icon-discord.tsx；web/src/assets/brand-icons/icon-docker.tsx
- 接口现状：
  - 待人工确认接口现状
- 数据现状：
  - bin/migration_v0.2-v0.3.sql；bin/migration_v0.3-v0.4.sql；docs/sql/requirements_SITE-001/data-backfill_SITE-001_v3.sql；docs/sql/requirements_SITE-001/db-change_SITE-001_v3.sql；docs/sql/requirements_SITE-001/db-rollback_SITE-001_v3.sql；common/node_identity.go

## 3. 需求与现状差异摘要

1. 需求描述：主页 01/02/03 文案过长，需要少量文字和图。
   实际现状：三段使用 562/约 180/345 行的交互式信息图，含大量卡片、筛选和说明。
   差异说明：现状信息密度高于主页叙事需要。
   影响：改造三个 diagram 为轻量 SVG，并收紧 SectionHead。

## 4. 功能点拆分

| 功能点 | 目标 | 前端影响 | 后端影响 | 数据库影响 | 风险 | 分支名 |
|---|---|---|---|---|---|---|
| Hero slogan | 中文、英文统一显示 `Every Token Counts.` | `company-site/components/sections/hero.tsx` | 无 | 无 | 低 | `feature_REQ_20260827_hero_every_token_counts_hero` |
| 01/02/03 叙事视觉 | 每段短标题、短说明和一幅 SVG 图 | `company-site/components/section-head.tsx`、三个 section、三个 diagram | 无 | 无 | 低 | `feature_REQ_20260827_hero_every_token_counts_sections` |

## 5. UI 参考复现计划

- 是否提供 UI HTML、截图、设计稿、可运行原型或参考页面：是
- 参考事实源与依赖资源：两张 PNG、`docs/deployment/参考网页图/01-把Token用量指向成交.html`、`warehouse-vortex-3d.html`
- 复现模式：`reference-only`
- 页面与路由范围：首页公司站默认路由
- 目标浏览器、视口、缩放、主题和语言：Playwright Chromium；375/768/1024/1440；100%；中英文、明暗主题
- 关键交互与状态：正常首屏、响应式重排、主题切换；不复刻拖拽/缩放
- 字体、图片、图标、Logo 等资产可用性：沿用项目字体和 Logo；插画改为内联 SVG
- 已确认允许偏差：不逐像素复现；保留现有项目导航、登录卡片和 FDE 段落
- 截图基线与保存位置：`docs/test/requirements_REQ_20260827_hero_every_token_counts/evidence/`
- 未确认前禁止实施的事项：无

## 6. 实施顺序

1. Hero slogan：统一 Hero 标题和 i18n。
2. 01/02/03 叙事视觉：输出 UI/前端设计并替换图形组件。
3. 测试与浏览器验收：定向测试、构建、响应式截图和主题验证。

## 7. 每个功能点的执行清单

### Hero slogan

- 目标：中文、英文均渲染完整 `Every Token Counts.`。
- 类型：optimization
- 修改页面：`web/src/features/company-site/components/sections/hero.tsx`
- 修改接口：无
- 修改数据表：无
- 兼容性影响：按已确认结论兼容
- 自测范围：功能点1 主流程、异常流程、回归路径
- 分支名：`feature_REQ_20260827_hero_every_token_counts_hero`
- 合并条件：标题、i18n、Hero 测试和构建通过

### 01/02/03 叙事视觉

- 目标：三段每段保留编号、短标题、短说明和可访问 SVG。
- 类型：optimization
- 修改页面：`web/src/features/company-site/components/section-head.tsx`、`components/sections/*.tsx`、`components/diagrams/*.tsx`
- 修改接口：无
- 修改数据表：无
- 兼容性影响：按已确认结论兼容
- 自测范围：功能点2 主流程、异常流程、回归路径
- 分支名：`feature_REQ_20260827_hero_every_token_counts_sections`
- 合并条件：定向测试、typecheck、build、响应式截图和主题验证通过

## 8. 合并与回归策略

- 合并目标分支：`dev`
- 冲突处理策略：若与其他功能点冲突，优先回看确认结论与现状差异文档，再解决冲突并复测
- 合并后回归范围：菜单与路由：；权限：；状态流转：；报表统计：；历史数据兼容：
- 浏览器验收范围：核心列表、详情、表单、状态流转和数据回显闭环；适配器服从项目策略
- UI 完全复现截图对比范围：按确认的参考事实源、目标视口和关键状态执行；非完全复现时标记不适用
