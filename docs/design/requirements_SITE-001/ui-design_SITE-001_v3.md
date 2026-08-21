# UI 设计

- 需求编号：`SITE-001`
- 版本号：`v3`
- 参考模式：`reference-only`

## 方向

- 关键词：企业 AI 基础设施、精确、可信、克制、可审计。
- 沿用当前语义色和明暗主题；不引入搜索工具建议中的橙色 CTA 或社证轮播，避免偏离既有品牌四原色与实际内容。
- 视觉签名继续使用 Token Trace 环；三大业务通过同层级标题、业务结果和能力标签表达，不再让 EB 的高亮造成“只有一个主营业务”的误解。

## Token

- 色板：沿用 `background/foreground/card/border/muted`；业务点位使用蓝、紫、黄、红四原色。
- 字体：沿用项目 Public Sans；数据/编号使用现有等宽字体，不新增远程字体依赖。
- 容器：统一 `max-w-6xl`；区块纵向 80–112px；卡片 12–16px 圆角；阴影只用于表单和浮动导航。
- 品牌资产：提供 `docs/参考资源/logo.png` 的圆形透明发布副本 `/ifai-logo.png`，供授权管理员在系统设置中引用；不修改默认资源。

## 核心组件

| 组件 | 规则 | 状态 |
|---|---|---|
| 顶部导航 | 复用 PublicHeader 原结构和单一系统配置品牌；保留通知、语言、主题、登录 | 滚动收拢、移动菜单、键盘焦点 |
| 三业务 | 三项同等业务层级；标题先说业务，描述再说结果 | 移动端单列，无横向滚动 |
| FDE 表单 | 使用既有 Field/Input/Textarea/NativeSelect/Button 组合 | invalid、disabled/loading、error、success 均有文本反馈 |
| Footer | 读取单一系统配置品牌；New API/QuantumNous 项目署名继续保留 | 响应式换行 |

## 可访问性

- Logo 使用系统名称作为替代文本；表单 label 与控件 id 对应；错误使用 `aria-invalid`，提交错误使用 `role=alert`。
- 所有交互保留可见焦点；动效服从 `prefers-reduced-motion`；正文对比度满足 WCAG AA。
