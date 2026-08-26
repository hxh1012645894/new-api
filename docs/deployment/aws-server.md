# AWS 服务器部署指南

本文档记录 new-api 生产环境的部署架构、SSH 访问方式和域名配置。

## 服务器信息

| 项 | 值 |
|---|---|
| 云平台 | AWS EC2 |
| 实例 | `i-0086d27f370e69528`(t3.large, 2 vCPU / 8GB / 20GB gp3, 已迁移至香港) |
| 系统 | Ubuntu 24.04/26.04 LTS (x86_64) |
| 区域 | 中国香港 ap-east-1 (香港机房) |
| 公网 IP | `43.199.235.81`(香港弹性 IP) |
| 域名 | **https://ifai.club/**(www 同指向) |
| 密钥对 | `new-api-key-2`(私钥 `new-api-key-2.pem`,仓库根目录,已被 .gitignore 排除) |

## SSH 连接

```bash
ssh -i new-api-key-2.pem ubuntu@43.199.235.81
```

或配 `~/.ssh/config` 别名后 `ssh new-api`:

```
Host new-api
  HostName 43.199.235.81
  User ubuntu
  IdentityFile /path/to/new-api-key-2.pem
```

⚠️ 私钥文件永不提交仓库、永不外发;丢失后无法找回(AWS 不保存私钥)。

## 部署架构

```
公网 80/443 ──▶ nginx:alpine 容器
                ├── /ifai-logo.png → /data/nginx-static/(磁盘静态文件)
                ├── /.well-known/acme-challenge → certbot 验证
                └── 其他 → new-api 容器(内网 newapi-net,3000 端口)

new-api ──▶ pgsql(postgres:16-alpine,数据持久化在 /data/pgsql)
```

| 容器 | 镜像 | 说明 |
|---|---|---|
| nginx | nginx:alpine | 80/443 入口,SSL 终止,静态文件,流式转发 |
| new-api | ghcr.io/hxh1012645894/new-api:latest | 业务服务,连 PostgreSQL |
| pgsql | postgres:16-alpine | 数据库,数据卷 /data/pgsql |

关键配置:
- Nginx 配置:`/data/nginx/nginx.conf`(含 HTTP→HTTPS 跳转、proxy_buffering off 保流式)
- 流式输出(SSE): Nginx 必须关闭缓冲(`proxy_buffering off; proxy_cache off; chunked_transfer_encoding on; proxy_http_version 1.1;`),API 请求使用 `"stream": true` 实现即时打字机输出,避免非流式等待模型全部生成(约 30s)
- SSL 证书:`/data/nginx/certs/`(Let's Encrypt,自动续期)
- 数据库连接:new-api 通过 `SQL_DSN` 环境变量连 `pgsql:5432`(密码在服务器容器环境变量中,不入仓库)

## 发布流程

1. 代码推送到 GitHub main → Actions 自动构建镜像推 GHCR(`.github/workflows/build-image.yml`)
2. 服务器拉取并**重建容器**:

```bash
sudo docker pull ghcr.io/hxh1012645894/new-api:latest && \
sudo docker rm -f new-api && \
sudo docker run -d --name new-api --network newapi-net \
  -e SQL_DSN='postgres://newapi:<DB_PASSWORD>@pgsql:5432/newapi' \
  -e TZ=Asia/Shanghai --restart always \
  ghcr.io/hxh1012645894/new-api:latest
```

> ⚠️ **不要用 `docker restart` 发布更新**:容器在创建时就绑定了当时的镜像,`restart` 只重启同一容器,仍运行旧镜像。必须 `rm -f` + `run` 重建容器,pull 的新镜像才会生效(实际踩过的坑:前端一直显示旧版本)。

## 域名(DNS)

域名 `ifai.club` 注册于 Namecheap(账户:timoxue),到期 2027-08-24。

DNS 记录(Namecheap Advanced DNS):

| 类型 | Host | 值 |
|---|---|---|
| A | @ | 43.199.235.81 (香港新 IP) |
| A | www | 43.199.235.81 (香港新 IP) |
| TXT | @ | SPF(邮件,勿删) |

## 证书续期

Let's Encrypt 证书 90 天有效,服务器 certbot.timer 自动续期:
- pre-hook 停 nginx(standalone 模式验证)
- deploy-hook 复制证书到 /data/nginx/certs/ 并重启 nginx
- 手动续期测试:`sudo certbot renew --dry-run`

## 日常运维速查

```bash
sudo docker ps                          # 容器状态
sudo docker logs -f new-api             # 业务日志
sudo docker restart new-api             # 重启业务
sudo docker exec pgsql psql -U newapi -d newapi -c "SELECT ..."   # 查数据库
```
