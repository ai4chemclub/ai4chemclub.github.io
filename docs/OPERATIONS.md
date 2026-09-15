# 本地运行、GitHub 与上线手册

## 当前状态

- 本阶段在本地准备网站，不创建组织或远程仓库，不公开发布。
- 用户与老师可以在接近上线时决定由谁创建 GitHub Organization。
- 候选名称 `ai4chemclub` 未保留，最终名称以实际创建结果为准。
- 使用 Node.js 24、pnpm 11.19.0、Astro 7.3.2，依赖锁定于 `pnpm-lock.yaml`。

## 本机运行方法

通常有 Node/pnpm 的电脑：

```sh
pnpm install --frozen-lockfile
pnpm dev
```

这台 Mac 的 Codex 已捆绑 Node/pnpm，但未加入全局 PATH。可运行以下命令，仅对当前命令设置路径，不修改 shell 配置：

```sh
PATH="$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" \
  "$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm" dev
```

将末尾 `dev` 换成 `check`、`test`、`build` 或 `preview` 即可执行对应操作。若捆绑路径随应用升级改变，重新查询 Codex workspace dependencies；不要把缓存路径当作跨机器标准。

本次本地预览运行在 `http://127.0.0.1:4321/`。Astro 7 会将开发服务器留在后台；重新运行 `pnpm dev` 会复用本项目服务。需要停止时，在本项目目录用上述 Node PATH 和 pnpm 路径执行 `exec astro dev stop`。不要停其他项目的服务。

## 验证

```sh
pnpm check
pnpm test
pnpm build
pnpm preview
```

- `check`：数据结构、活动状态、日期、公开资料规则。
- `test`：上述关键规则的回归测试。
- `build`：先检查内容，再产出静态 HTML/CSS 到 `dist/`。
- `preview`：检查真正构建出来的网页，而非仅开发模式。
- `check:release`：发布前确认检查，草稿现在**应当失败**。

内容检查不是通用机密扫描器，也不能识别每一句话的事实真伪。公开前仍需人工阅读拟提交文件、生成文件与 Git 历史。

## 为什么这样搭建

Astro 只在开发和构建时运行；输出是静态文件，适配 GitHub Pages。内容、页面和样式分别放置，减少后续换人维护的负担。暂无登录、后端、数据库、分析脚本或外部字体。精确版本和锁文件保证依赖安装可重复。

## 接近上线时准备 GitHub

1. 用户与老师确认组织的创建者、名称及管理人。
2. 创建 GitHub Free Organization；成员使用各自个人账号。
3. 在组织内创建 `<组织名>.github.io` 仓库。免费 Pages 使用公开仓库，因此先完成公开内容与历史检查。
4. 本地仓库设置 `origin` 指向这个**已验证存在的仓库**。本地文件夹不必改名。
5. 若以后确实先在个人账号建立远程仓库，可使用 GitHub 的 Transfer 功能迁移；迁移后重新核对仓库名、Pages 设置、域名和本地 remote。Pages 旧网址不会自动重定向。
6. 只有在明确授权邀请后，再邀请指定维护者；第二位 owner 建议由社团决定。

## 发布配置

当前 `.github/workflows/check.yml` 是检查定义。`.github/workflows/pages.yml.disabled` 是尚未启用的发布草案，不会被 GitHub 执行。

第一次上线按顺序：

1. 完成 `PLAN.md` 的 P1/P2 及发布前检查；获得本版公开发布授权。
2. 更新 `src/data/club.json` 中实际已经确认的内容和 release 状态。
3. 确认真实仓库。设置 Repository Actions variables：
   - `SITE_URL`：已核实的 HTTPS 源站，例如 `https://<组织名>.github.io`；不带项目子目录。
   - `BASE_PATH`：组织主页为 `/`；如果使用项目页则为 `/<仓库名>/`。
   - `PAGES_ENABLED`：首次上线确认后设为 `true`。
4. 将 `pages.yml.disabled` 改名为 `pages.yml`；在仓库 Settings → Pages 选择 GitHub Actions。
5. 在相同 SITE_URL/BASE_PATH 环境下运行 `pnpm check:release` 和 `pnpm build`。
6. 核对并显式暂存本次文件，提交、推送已授权范围。Pages workflow 只上传 `dist/`，不上传仓库根目录。
7. 检查 GitHub Actions 的 build 和 deploy 都成功，再访问真实网址验证主页、样式、图标、导航、手机显示和邮件链接。
8. 将真实网址、发布结果、维护方法写回计划和本手册。不要把本地通过写成“已上线”。

第一次公开推送之前，复查 Git author/committer email。当前仓库应使用 GitHub noreply 地址，避免把个人邮箱写入公开提交元数据。

## 日常更新与交接

1. 开始前读 `PLAN.md`，确认当前任务和公开边界。
2. 修改对应内容文件；重要的日期/人物/外部活动先核实。
3. 执行检查和本地预览。
4. 维护者审阅后按授权范围提交、推送，等待 Pages 成功。
5. 线上复查并更新计划日志。

出现问题时保留构建日志，先定位对应提交。必要时对具体提交使用 `git revert` 创建修复提交；不要用强制推送覆盖他人历史。

DAG 与学校邮箱当前有效期到 2027-08-31，需由社团负责人安排年度续期。此文件不是自动提醒，也没有建立任何定时任务。

## 官方参考（2026-09-15 核对）

- [GitHub Pages 类型与域名](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [GitHub 组织与个人账号](https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts)
- [创建组织](https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/creating-a-new-organization-from-scratch)
- [仓库转移与 Pages 地址](https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository)
- [Astro 部署到 GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
