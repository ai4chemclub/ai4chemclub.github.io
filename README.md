# AI for Chemistry Club · Website

AI for Chemistry Club 的网站仓库。**2026-09-24 已完成首次 GitHub Pages 发布及线上验收。** 后续工作见 [工作计划](docs/PLAN.md)。

- 网站地址：https://ai4chemclub.github.io/
- 源码仓库：https://github.com/ai4chemclub/ai4chemclub.github.io

## 从哪里继续

- **[工作计划与当前进度](docs/PLAN.md)**：下一步做什么、完成条件、尚未解决的问题。
- [需求与设计方向](docs/BRIEF.md)：我们已确认的定位，以及暂定选择。
- [公开内容清单](docs/CONTENT.md)：哪些能写、哪些还需核实、如何补充活动和成员。
- [当前文案暂定稿](docs/REVIEW.md)：已确认的英文正文与中文核对要点。
- [运行、GitHub 与上线手册](docs/OPERATIONS.md)：本地预览、组织/仓库安排、发布与维护。
- [给后续维护者和 AI 的规则](AGENTS.md)：每次接手先读计划，完成后更新进度。

## 本地运行

需要 Node.js 24 和 pnpm 11.19.0。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

打开终端打印的本地地址。修改文件后页面自动更新。

```sh
pnpm check    # 检查公开内容数据
pnpm test     # 检查关键内容/发布规则
pnpm build    # 生成 dist/ 静态网页
pnpm preview  # 查看构建后的网页
```

这台电脑可使用 Codex 的捆绑运行环境，见 [本机运行方法](docs/OPERATIONS.md#本机运行方法)。不要求修改系统环境。

## 文件结构

```text
src/
  data/club.json       社团简介、关注方向、活动、公开成员资料
  components/Icon.astro  仅打包所需的静态 Lucide 图标
  pages/index.astro    主页结构
  styles/global.css   配色、字体、布局、手机适配
public/favicon.svg    三节点网络网站图标
public/branding/      官方 HKUST 标识
public/illustrations/ 科学主题装饰 SVG
public/licenses/      上游样式与图标的许可通知
scripts/              内容检查及其测试
docs/                 工作计划、需求、内容和维护说明
.github/workflows/    自动检查与 GitHub Pages 发布
```

Astro 在本地或 GitHub Actions 上把内容转换为普通 HTML/CSS；GitHub Pages 只需托管生成的 `dist/`。访客不需要登录，站点没有数据库或后台服务。

> 公开 Git 仓库会暴露其中的文件与历史。内部邮件、聊天截图、凭据和私人信息不属于本仓库内容。`.gitignore` 只是辅助，不能代替公开前的内容核对。
