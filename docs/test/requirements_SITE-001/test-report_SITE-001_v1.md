# 测试报告

- 需求编号: `SITE-001`
- 版本号: `v1`
- 测试日期: 2026-08-19

## 1. 测试执行概览

| 类型 | 结果 |
| ---- | ---- |
| 单元/组件测试（Vitest + RTL） | 3 文件 / 12 用例全部通过 |
| 类型检查（tsgo -b） | 通过 |
| Lint（oxlint，新增文件范围） | 0 error（仓库既有 364 个历史 error 不属本轮） |
| 格式（oxfmt） | 通过（仅新文件格式化，无关文件已回退） |
| 生产构建（rsbuild build） | 通过 |
| 浏览器验收（Playwright + 真实 Go 后端 + SQLite） | 通过，证据见第 4 节 |

## 2. 功能测试结果

- `validation.test.ts`（6 例）：完整预约通过；邮箱联系方式通过；大陆手机号通过；非法联系方式拒绝；场景 <10 字符拒绝；姓名 >50 字符拒绝；空合作诉求拒绝。
- `sections.test.tsx`（3 例）：痛点区渲染聚合账单 + 3 条「不可逐笔解释」；能力链渲染三层次 + EB 徽标；数仓区渲染三断裂 + ODS/DWD/DWS/ADS 分层。
- `fde-form.test.tsx`（3 例）：空表单提交展示全部字段错误；非法联系方式展示对应错误；有效提交后展示成功态。

## 3. 接口测试结果

- 无新增/变更后端接口。`VITE_FDE_FORM_ENDPOINT` 为可选配置项，未配置时表单走演示提交路径（已在组件测试覆盖）。
- 回归：`GET /api/home_page_content`（后台自定义首页）与既有 `/`、`/sign-in`、`/dashboard`、`/pricing` 路由不受影响（未改动相关代码）。

## 4. 浏览器验收记录

环境：Chrome（Playwright），前端 dev server `:3001`，Go 后端 `:3000`（SQLite 全新库，完成初始化向导），100% 缩放。

| 用例 | 视口 | 结果 | 证据 |
| ---- | ---- | ---- | ---- |
| 首屏（zh/浅色）：Every Token Counts、双 CTA、Token 轨迹圆环 | 1440×900 | 通过 | `screenshot-hero-light.png` |
| 整页五大板块 + 页脚（含 New API 署名） | 1440×900 | 通过 | `screenshot-full-light.png` |
| 暗色主题 | 1440×900 | 通过 | `screenshot-hero-dark.png` |
| 移动端布局（单列、圆环缩放） | 390×844 | 通过 | `screenshot-mobile-hero.png` |
| 移动端汉堡菜单 + 登录/预约按钮 | 390×844 | 通过 | `screenshot-mobile-menu.png` |
| FDE 表单空提交字段错误（含 `aria-invalid`） | 1440×900 | 通过 | 无障碍快照 |
| FDE 表单有效提交 → 成功面板 | 1440×900 | 通过 | 无障碍快照 |
| 语言切换 zh → en（五大板块文案全部切换） | 1440×900 | 通过 | 无障碍快照 |
| 控制台错误 | — | 通过（仅未登录态 `/api/user/auth/refresh` 401，属应用既有行为） | console log |

## 5. 遗留项

- 生产接入真实 FDE 预约后端：部署时配置 `VITE_FDE_FORM_ENDPOINT`。
- 部署方在后台「系统设置 → 站点」配置公司 Logo/系统名称后，页头与页脚自动显示公司品牌（当前本地验证环境显示默认名称 New API）。
