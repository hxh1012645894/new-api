# 测试报告

- 需求编号: `REQ_20260827_hero_every_token_counts`
- 版本号: `v1`

## 1. 测试执行概览

- Vitest：2 个文件、4 个测试通过。
- TypeScript：`bun run typecheck` 通过。
- Build：`bun run build` 通过。
- Format：`bun run format:check` 通过。
- i18n：`bun run i18n:sync` 完成，七个 locale 均无缺失键或多余键。
- 受影响文件定向 lint：无 error；全仓 lint 的既有错误不属于本次改动。

## 2. 功能测试结果

- Hero slogan、01/02/03 短文案、三幅可访问 SVG 均通过。

## 3. 接口测试结果

- 本轮无接口改动；Playwright 使用 mock status/setup/home content 验证默认首页渲染。

## 4. 权限与异常测试结果

- 未登录默认首页通过；无新增权限或异常分支。

## 5. 浏览器验收结果

- Playwright Chromium：375、768、1024、1440 均无横向溢出；三幅图文段落均可见。收尾复核再次验证 375/1440，Hero 标题、01/02/03 和三幅 SVG 正常。

## 6. UI 参考截图与交互对比结果

- 复现模式：`reference-only`。
- 截图条件：Chromium、100%、1440/375、light、zh，公开首页配置使用 mock，动画稳定后截取。
- 参考/实现截图：实现截图见 `evidence/company-site-desktop-1440.png`、`evidence/company-site-mobile-375.png`；截图阶段隐藏开发调试浮窗。
- 字体、颜色、样式、间距、尺寸和布局差异：参考仅为方向；项目主题、导航、登录卡片和 FDE 段落保持原样，三幅新图采用内联 SVG。
- 关键交互一致性：响应式重排和主题切换通过；参考 WebGL 拖拽/缩放不在范围内。
- 允许偏差依据：用户明确“可以参考”。
- 复测结论：通过。

## 7. 缺陷与风险

- 已修复问题：将原有长篇交互信息图替换为主页级短文案与轻量视觉。
- 未修复风险：全仓 lint 存在与本次无关的既有 error；未执行逐像素复现验收。
