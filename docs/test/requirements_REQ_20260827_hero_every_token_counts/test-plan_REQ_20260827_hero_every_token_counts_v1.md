# 测试计划

- 需求编号: `REQ_20260827_hero_every_token_counts`
- 版本号: `v1`

## 1. 测试范围

- 功能测试
- 接口测试
- 权限测试
- 异常与边界测试
- 浏览器验收
- UI 参考复现模式验证
- `full-reproduction` 同条件参考/实现截图对比与交互一致性验证

## 2. 测试环境

- 前端 Bun/Vitest；Playwright Chromium 本地预览 `http://127.0.0.1:4173/`。
- 视口：375、768、1024、1440；主题：light/dark；语言：en/zh。

## 3. 测试数据

- Mock `/api/status`、`/api/setup`、`/api/home_page_content`，使默认 CompanySite 可稳定渲染。

## 4. UI 参考截图基线

- 复现模式：`reference-only`。
- 参考事实源：用户两张 PNG 和 `docs/deployment/参考网页图/` 下两个 HTML。
- 浏览器、视口、缩放、主题、语言和权限：Playwright Chromium、100%、375/768/1024/1440、light/dark、en/zh、未登录。
- 关键状态：默认首页、Hero slogan、三段插画、移动端重排、主题切换。
- 实现截图路径：`evidence/company-site-desktop-1440.png`、`evidence/company-site-mobile-375.png`。
- 允许偏差：参考仅作为方向；不要求文字、HUD、WebGL、拖拽和逐像素一致。

## 5. 用例矩阵

| 用例编号 | 功能点 | 场景 | 前置条件 | 操作步骤 | 预期结果 | 实际结果 | 状态 |
|---|---|---|---|---|---|---|---|
| TC-001 | Hero slogan | en/zh 首页 | setup/status mock | 打开首页 | H1 为 `Every Token Counts.` | 通过 | passed |
| TC-002 | 01/02/03 视觉 | 桌面与移动 | CompanySite 可渲染 | 访问 1440/375 | 三个 `svg[role=img]`，每段有编号和短文案 | 通过 | passed |
| TC-003 | 响应式 | 375/768/1024/1440 | 首页加载 | 调整视口 | `scrollWidth <= innerWidth` | 通过 | passed |
| TC-004 | 主题 | light/dark | 首页加载 | 切换主题 | 标题与三幅图仍可见，无溢出 | 通过 | passed |
