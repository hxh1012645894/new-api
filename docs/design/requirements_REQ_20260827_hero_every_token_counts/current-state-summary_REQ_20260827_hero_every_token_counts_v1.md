# 当前系统现状扫描摘要

- 需求编号: `REQ_20260827_hero_every_token_counts`
- 版本号: `v1`
- 扫描时间: `2026-08-27 21:49:37`
- 仓库根目录: `/Users/hutao/Desktop/new-api`

## 1. 前端现状

- 页面文件数量（截取展示）: 30
- 路由文件数量（截取展示）: 20
- 页面文件：
  - web/src/assets/brand-icons/icon-discord.tsx
  - web/src/assets/brand-icons/icon-docker.tsx
  - web/src/assets/brand-icons/icon-facebook.tsx
  - web/src/assets/brand-icons/icon-figma.tsx
  - web/src/assets/brand-icons/icon-github.tsx
  - web/src/assets/brand-icons/icon-gitlab.tsx
  - web/src/assets/brand-icons/icon-gmail.tsx
  - web/src/assets/brand-icons/icon-linuxdo.tsx
  - web/src/assets/brand-icons/icon-medium.tsx
  - web/src/assets/brand-icons/icon-notion.tsx
  - web/src/assets/brand-icons/icon-skype.tsx
  - web/src/assets/brand-icons/icon-slack.tsx
  - web/src/assets/brand-icons/icon-stripe.tsx
  - web/src/assets/brand-icons/icon-telegram.tsx
  - web/src/assets/brand-icons/icon-trello.tsx
  - web/src/assets/brand-icons/icon-wechat.tsx
  - web/src/assets/brand-icons/icon-whatsapp.tsx
  - web/src/assets/brand-icons/icon-zoom.tsx
  - web/src/assets/clerk-full-logo.tsx
  - web/src/assets/clerk-logo.tsx
  - web/src/assets/custom/icon-dir.tsx
  - web/src/assets/custom/icon-layout-compact.tsx
  - web/src/assets/custom/icon-layout-default.tsx
  - web/src/assets/custom/icon-layout-full.tsx
  - web/src/assets/custom/icon-sidebar-floating.tsx
  - web/src/assets/custom/icon-sidebar-inset.tsx
  - web/src/assets/custom/icon-sidebar-sidebar.tsx
  - web/src/assets/custom/icon-sub2api.tsx
  - web/src/assets/custom/icon-theme-dark.tsx
  - web/src/assets/custom/icon-theme-light.tsx
- 路由文件：
  - relay/channel/openrouter/constant.go
  - relay/channel/openrouter/dto.go
  - router/api-router.go
  - router/authz-router.go
  - router/channel-router.go
  - router/channel_router_test.go
  - router/dashboard.go
  - router/main.go
  - router/relay-router.go
  - router/relay_router_test.go
  - router/retired_frontend_routes_test.go
  - router/video-router.go
  - router/web-router.go
  - web/src/routes/(auth)/forgot-password.tsx
  - web/src/routes/(auth)/oauth.tsx
  - web/src/routes/(auth)/otp.tsx
  - web/src/routes/(auth)/register.tsx
  - web/src/routes/(auth)/reset.tsx
  - web/src/routes/(auth)/route.tsx
  - web/src/routes/(auth)/sign-in.tsx
- 路由路径：
  - /v1/models
  - /v1/models?key=modelstestkey
  - /
  - /search
  - /models
  - /models_enabled
  - /ops
  - /:id
  - /test
  - /test/:id
  - /update_balance
  - /update_balance/:id
  - /status/batch
  - /:id/status
  - /disabled
  - /tag/disabled
  - /tag/enabled
  - /tag
  - /batch
  - /fix
  - /fetch_models/:id
  - /fetch_models
  - /:id/codex/refresh
  - /:id/codex/usage
  - /:id/codex/usage/reset-credits
  - /:id/codex/usage/reset
  - /ollama/pull
  - /ollama/pull/stream
  - /ollama/delete
  - /ollama/version/:id
  - /batch/tag
  - /tag/models
  - /copy/:id
  - /multi_key/manage
  - /upstream_updates/apply
  - /upstream_updates/apply_all
  - /upstream_updates/detect
  - /upstream_updates/detect_all

## 2. 后端现状

- 控制器文件数量（截取展示）: 0
- 服务文件数量（截取展示）: 0
- 控制器文件：
  - 未扫描到明确控制器文件
- 主要接口：
  - 未扫描到明确接口映射
- 服务文件：
  - 未扫描到明确服务文件

## 3. 数据库与配置现状

- 配置命中：
  - 未扫描到显式 datasource/server.port 配置
- SQL 文件：
  - bin/migration_v0.2-v0.3.sql
  - bin/migration_v0.3-v0.4.sql
  - docs/sql/requirements_SITE-001/data-backfill_SITE-001_v3.sql
  - docs/sql/requirements_SITE-001/db-change_SITE-001_v3.sql
  - docs/sql/requirements_SITE-001/db-rollback_SITE-001_v3.sql
- 数据层相关文件：
  - bin/migration_v0.2-v0.3.sql
  - bin/migration_v0.3-v0.4.sql
  - common/node_identity.go
  - model/external_identity_claim.go
  - model/external_identity_claim_test.go
  - model/frontend_option_migration.go
  - model/frontend_option_migration_test.go
  - model/user_session_migration_test.go
  - web/src/features/home/lib/icon-mapper.tsx
  - web/src/features/rankings/components/entity-links.tsx
  - web/src/features/usage-logs/lib/mappers.ts

## 4. 模块归纳

### 模块：Clerk Full Logo

- 页面/静态页：web/src/assets/clerk-full-logo.tsx
- 主要接口：无明显接口痕迹
- 服务文件：无明显服务痕迹
- 数据痕迹：无明显数据痕迹

### 模块：Clerk Logo

- 页面/静态页：web/src/assets/clerk-logo.tsx
- 主要接口：无明显接口痕迹
- 服务文件：无明显服务痕迹
- 数据痕迹：无明显数据痕迹

### 模块：Icon Dir

- 页面/静态页：web/src/assets/custom/icon-dir.tsx
- 主要接口：无明显接口痕迹
- 服务文件：无明显服务痕迹
- 数据痕迹：无明显数据痕迹

### 模块：Icon Discord

- 页面/静态页：web/src/assets/brand-icons/icon-discord.tsx
- 主要接口：无明显接口痕迹
- 服务文件：无明显服务痕迹
- 数据痕迹：无明显数据痕迹

### 模块：Icon Docker

- 页面/静态页：web/src/assets/brand-icons/icon-docker.tsx
- 主要接口：无明显接口痕迹
- 服务文件：无明显服务痕迹
- 数据痕迹：无明显数据痕迹

### 模块：Icon Facebook

- 页面/静态页：web/src/assets/brand-icons/icon-facebook.tsx
- 主要接口：无明显接口痕迹
- 服务文件：无明显服务痕迹
- 数据痕迹：无明显数据痕迹

### 模块：Icon Figma

- 页面/静态页：web/src/assets/brand-icons/icon-figma.tsx
- 主要接口：无明显接口痕迹
- 服务文件：无明显服务痕迹
- 数据痕迹：无明显数据痕迹

### 模块：Icon Github

- 页面/静态页：web/src/assets/brand-icons/icon-github.tsx
- 主要接口：无明显接口痕迹
- 服务文件：无明显服务痕迹
- 数据痕迹：无明显数据痕迹

### 模块：Icon Gitlab

- 页面/静态页：web/src/assets/brand-icons/icon-gitlab.tsx
- 主要接口：无明显接口痕迹
- 服务文件：无明显服务痕迹
- 数据痕迹：无明显数据痕迹

### 模块：Icon Gmail

- 页面/静态页：web/src/assets/brand-icons/icon-gmail.tsx
- 主要接口：无明显接口痕迹
- 服务文件：无明显服务痕迹
- 数据痕迹：无明显数据痕迹


## 5. 现有文档沉淀

- 已存在文档：
  - docs/authentication.md
  - docs/channel/other_setting.md
  - docs/deployment/NAMECHEAP.md
  - docs/deployment/accountTest/METHOD.md
  - docs/deployment/accountTest/README.md
  - docs/deployment/aws-server.md
  - docs/design/requirements_REQ_20260827_hero_every_token_counts/backend-design_REQ_20260827_hero_every_token_counts_v1.md
  - docs/design/requirements_REQ_20260827_hero_every_token_counts/conflict-resolution_REQ_20260827_hero_every_token_counts_v1.md
  - docs/design/requirements_REQ_20260827_hero_every_token_counts/current-state-summary_REQ_20260827_hero_every_token_counts_v1.md
  - docs/design/requirements_REQ_20260827_hero_every_token_counts/database-design_REQ_20260827_hero_every_token_counts_v1.md
  - docs/design/requirements_REQ_20260827_hero_every_token_counts/frontend-backend-alignment_REQ_20260827_hero_every_token_counts_v1.md
  - docs/design/requirements_REQ_20260827_hero_every_token_counts/frontend-design_REQ_20260827_hero_every_token_counts_v1.md
  - docs/design/requirements_REQ_20260827_hero_every_token_counts/git-branch-strategy_REQ_20260827_hero_every_token_counts_v1.md
  - docs/design/requirements_REQ_20260827_hero_every_token_counts/implementation-linkage_REQ_20260827_hero_every_token_counts_v1.md
  - docs/design/requirements_REQ_20260827_hero_every_token_counts/implementation-plan_REQ_20260827_hero_every_token_counts_v1.md
  - docs/design/requirements_REQ_20260827_hero_every_token_counts/iteration-record_REQ_20260827_hero_every_token_counts.md
  - docs/design/requirements_REQ_20260827_hero_every_token_counts/merge-checklist_REQ_20260827_hero_every_token_counts_v1.md
  - docs/design/requirements_REQ_20260827_hero_every_token_counts/requirements-confirmation_REQ_20260827_hero_every_token_counts_v1.md
  - docs/design/requirements_REQ_20260827_hero_every_token_counts/system-design_REQ_20260827_hero_every_token_counts_v1.md
  - docs/design/requirements_REQ_20260827_hero_every_token_counts/traceability-matrix_REQ_20260827_hero_every_token_counts_v1.md
  - docs/design/requirements_REQ_20260827_hero_every_token_counts/ui-design_REQ_20260827_hero_every_token_counts_v1.md
  - docs/design/requirements_SITE-001/backend-design_SITE-001_v1.md
  - docs/design/requirements_SITE-001/backend-design_SITE-001_v3.md
  - docs/design/requirements_SITE-001/code-review_SITE-001_v3.md
  - docs/design/requirements_SITE-001/config-change_SITE-001_v3.md
  - docs/design/requirements_SITE-001/conflict-resolution_SITE-001_v1.md
  - docs/design/requirements_SITE-001/conflict-resolution_SITE-001_v3.md
  - docs/design/requirements_SITE-001/current-state-summary_SITE-001_v1.md
  - docs/design/requirements_SITE-001/current-state-summary_SITE-001_v3.md
  - docs/design/requirements_SITE-001/data-backfill_SITE-001_v3.md
  - docs/design/requirements_SITE-001/database-design_SITE-001_v1.md
  - docs/design/requirements_SITE-001/database-design_SITE-001_v3.md
  - docs/design/requirements_SITE-001/db-change_SITE-001_v3.md
  - docs/design/requirements_SITE-001/db-release-order_SITE-001_v3.md
  - docs/design/requirements_SITE-001/db-rollback_SITE-001_v3.md
  - docs/design/requirements_SITE-001/frontend-backend-alignment_SITE-001_v1.md
  - docs/design/requirements_SITE-001/frontend-backend-alignment_SITE-001_v3.md
  - docs/design/requirements_SITE-001/frontend-design_SITE-001_v1.md
  - docs/design/requirements_SITE-001/frontend-design_SITE-001_v2.md
  - docs/design/requirements_SITE-001/frontend-design_SITE-001_v3.md
  - docs/design/requirements_SITE-001/git-branch-strategy_SITE-001_v1.md
  - docs/design/requirements_SITE-001/git-branch-strategy_SITE-001_v3.md
  - docs/design/requirements_SITE-001/implementation-linkage_SITE-001_v1.md
  - docs/design/requirements_SITE-001/implementation-linkage_SITE-001_v3.md
  - docs/design/requirements_SITE-001/implementation-plan_SITE-001_v1.md
  - docs/design/requirements_SITE-001/implementation-plan_SITE-001_v3.md
  - docs/design/requirements_SITE-001/iteration-record_SITE-001.md
  - docs/design/requirements_SITE-001/merge-checklist_SITE-001_v1.md
  - docs/design/requirements_SITE-001/merge-checklist_SITE-001_v3.md
  - docs/design/requirements_SITE-001/release-checklist_SITE-001_v3.md
  - docs/design/requirements_SITE-001/release-plan_SITE-001_v3.md
  - docs/design/requirements_SITE-001/requirements-confirmation_SITE-001_v1.md
  - docs/design/requirements_SITE-001/requirements-confirmation_SITE-001_v3.md
  - docs/design/requirements_SITE-001/review-checklist_SITE-001_v3.md
  - docs/design/requirements_SITE-001/system-design_SITE-001_v1.md
  - docs/design/requirements_SITE-001/system-design_SITE-001_v3.md
  - docs/design/requirements_SITE-001/traceability-matrix_SITE-001_v1.md
  - docs/design/requirements_SITE-001/traceability-matrix_SITE-001_v3.md
  - docs/design/requirements_SITE-001/ui-design_SITE-001_v1.md
  - docs/design/requirements_SITE-001/ui-design_SITE-001_v3.md

## 6. 用于待确认文档的现状摘要

- 模块现状：
  - Clerk Full Logo；Clerk Logo；Icon Dir；Icon Discord；Icon Docker；Icon Facebook
- 页面现状：
  - web/src/assets/clerk-full-logo.tsx；web/src/assets/clerk-logo.tsx；web/src/assets/custom/icon-dir.tsx；web/src/assets/brand-icons/icon-discord.tsx；web/src/assets/brand-icons/icon-docker.tsx
- 接口现状：
  - 待人工确认接口现状
- 数据现状：
  - bin/migration_v0.2-v0.3.sql；bin/migration_v0.3-v0.4.sql；docs/sql/requirements_SITE-001/data-backfill_SITE-001_v3.sql；docs/sql/requirements_SITE-001/db-change_SITE-001_v3.sql；docs/sql/requirements_SITE-001/db-rollback_SITE-001_v3.sql；common/node_identity.go

## 7. 风险与待补充

- 未扫描到明确的后端控制器，需确认接口实现是否在其他模块或尚未存在
