# 需求确认结论

- 需求编号：`REQ_20260827_hero_every_token_counts`
- 版本号：`v1`
- 确认日期：`2026-08-27`

## 1. 本次迭代范围

- 公司主页 Hero 的中文、英文标题统一显示 `Every Token Counts.`。
- 精简主页 01、02、03 三个叙事段落，每段只保留编号、短标题、一句说明和一幅主视觉。
- 主页路由、登录卡片、CTA、FDE 段落、页头和页尾保持不变。

## 2. 当前系统真实现状

- 页面由 `web/src/features/company-site/index.tsx` 组装。
- 01、02、03 分别由 `CapabilityChain`、`TokenToDeal`、`Warehouse` 渲染。
- 三段已有完整交互图，但包含大量卡片、按钮、标签和说明，信息密度更接近产品文档，不符合本轮主页的简洁目标。
- 变更仅涉及前端展示和 i18n，不涉及接口、权限、数据库或状态流转。

## 3. UI 参考复现确认

- 参考事实源：用户提供的两张图片，以及：
  - `docs/deployment/参考网页图/01-把Token用量指向成交.html`
  - `docs/deployment/参考网页图/warehouse-vortex-3d.html`
- 复现模式：`reference-only`。用户已明确使用“可以参考”，不是逐像素完全复现。
- 沿用项：深色技术插画、层级堆叠、Token 流收束、发光成交环、ODS/DWD/DWS/ADS 四层结构。
- 调整项：沿用项目现有主题、容器宽度、字体和响应式体系；用轻量内联 SVG 替代外部图片和 WebGL。
- 不适用项：参考图中的长篇中文说明、尺寸标注、复杂 HUD、拖拽/缩放交互和第三方脚本依赖。

## 4. 确认结论

- 已确认项：`reference-only`；三段都要“图 + 少量文字”；Hero 中英文均使用 `Every Token Counts.`。
- 未确认项：无阻塞项。
