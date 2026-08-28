# 前端设计

- 需求编号：`REQ_20260827_hero_every_token_counts`
- 版本号：`v1`

## 1. 影响范围

- 路由：主页路由不变。
- 页面：`web/src/features/company-site/`。
- 组件：Hero、SectionHead、01/02/03 三个 section 与对应 diagram。
- i18n：新增精简文案键，并确保 `Every Token Counts.` 在中文和英文环境均显示英文原文。
- 后端、接口、状态、权限、数据库：无变化。

## 2. 组件设计

- `SectionHead`：从“左右两栏长标题 + 长描述”改成紧凑的编号、栏目标签、短标题和一句说明。
- `BusinessPyramidDiagram`：改为无状态的三层 SVG 插画。
- `TokenToDealDiagram`：改为无状态的 Token 收束 SVG 插画。
- `WarehouseTowerDiagram`：改为无状态的四层数仓 SVG 插画。
- 三个 section：桌面双栏、移动单栏；02 桌面端视觉反向，DOM 顺序仍保持文字优先。

## 3. 性能与可访问性

- 删除三幅旧图的交互状态、按钮、Lucide 图标和大量运行时数组，降低主页渲染与 bundle 负担。
- SVG 坐标保持低精度，不引入 WebGL、Three.js 或远程图片。
- 每幅 SVG 使用 `role="img"`、`<title>` 和本地化 `aria-label`。
- 不新增持续动画；现有 reduced-motion 规则继续生效。

## 4. 验收点

- 中文、英文 Hero 均显示完整的 `Every Token Counts.`。
- 01/02/03 每段均显示编号、短标题、短说明和一幅可访问插画。
- 375、768、1024、1440 宽度下无横向滚动，文本不覆盖插画。
- 中文、英文、明暗主题均能正常显示；其他语言回退完整。
