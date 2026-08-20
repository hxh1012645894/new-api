# 前端设计 v2（官网首页 · SITE-001 迭代）

- 需求编号: `SITE-001`
- 版本号: `v2`（相对 v1 的增量）
- 迭代输入：PPT 全量 OCR 结果（`docs/参考资源/iFAi 业务简介_2608C_图片/ocr/iFAi_业务简介_2608C.md`）与用户澄清（FDE = Forward Deployed Engineer）。

## 1. 变更点

### 1.1 术语修正（用户澄清）

- `FDE — Frontline Deployment Engineers` → **`FDE — Forward Deployed Engineers`**（中文保持「FDE 一线部署工程师」，与参考 demo 及 PPT 直读一致）。
- 同步修正 OCR 文档中的误读标注（"Foundation Distribution Engine" 为 image15 OCR 误读）。

### 1.2 能力链文案充实（依据 PPT「四大业务能力」）

- 01 · Token 接入与成本优化：新增成本优化维度 chips —— Prompt 优化 / Cache 优化 / 模型路由 / 推理调度。
- 03 · FDE：描述更新为「进场交付」语义（接入与使用培训、Agent 定制与交付、工作流再造 → 与团队验证改进）；卡片新增 3 枚 chips：AI 接入与使用培训 / Agent 定制与交付 / 工作流再造。
- 02 · Enterprise Brain：保持不变（居中高亮）。

### 1.3 模型矩阵条（依据 PPT「我们是谁」）

能力链下方新增一条模型矩阵（品牌词不翻译）：主流大模型统一接入 —— Claude · GPT · Gemini · Qwen · GLM · KIMI · Seedance · 更多模型接入中。

## 2. 实现

- `web/src/features/company-site/components/sections/capability-chain.tsx`：`ChainItem` 增加可选 `chips`；新增模型矩阵条。
- i18n：新增 11 键、删除 2 个旧键（FDE 旧标题与旧描述），7 语言全部通过 `scripts/add-missing-keys.mjs`（临时脚本，用完即删）+ `bun run i18n:sync` 更新。
- 测试：`sections.test.tsx` 更新 FDE 标题断言，新增成本优化 chips、进场交付 chips、模型矩阵断言。

## 3. 验证

- typecheck / lint（新增与修改文件 0 error）/ 单测 12/12 / 生产构建通过；
- 浏览器验证（Chrome，1440×900，zh + en）：01/03 卡片 chips、模型矩阵条、FDE 新全称与描述均正确渲染；证据 `screenshot-capabilities-v2.png`。

## 4. 未纳入（待确认口径）

- image15 示意数据（日调度 1,023 亿、节省率 37.6%、¥2,368 万）未上首页，需真实口径确认；
- 「熵评」业务体系名为 OCR 读法，未经确认，未使用；
- image12/21 核心优势与产品解决方案页 OCR 错字多，暂不引用。
