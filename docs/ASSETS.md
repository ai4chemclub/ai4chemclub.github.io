# 图片与标识来源

## HKUST 标识

- 本地文件：`public/branding/hkust-logo.svg`
- 来源：[HKUST Brand Assets Unit 官网](https://brand.hkust.edu.hk/) 页首实际使用的官方 SVG。
- [原始文件地址](https://brand.hkust.edu.hk/profiles/ust/modules/custom/hkust_signature_affiliate/assets/images/hkust_logo_small.svg)
- 获取日期：2026-09-22；用户在本轮确认校名与校徽均可用于本网站。
- 原始尺寸 / viewBox：150 × 48，为白色反白版本。保留文件内容、配色及比例，置于深蓝色底；当前放在浮动页首左侧的独立蓝色底块，不把校徽融入社团自制图标。
- SHA-256：`198605cebd6d79b5572c60355f2ed143a9a6672f61433772bf8dc50ef84e90ac`
- SVG 已检查，无脚本、嵌入图片或外部资源引用。本网站直接提供该本地文件，不向外部站点请求标识图片。
- 学校标识是大学的品牌资产，不因放入本仓库而被重新授予开源许可。

## 成员照片

目前没有成员照片。卡片使用文字缩写；空目录仅显示待补充说明。后续获得照片及公开同意后，再添加来源和处理记录。

## 学术主页视觉参考

- 用户于 2026-09-22 指定 [Xin-Jiaqi/minimal-academic-homepage](https://github.com/Xin-Jiaqi/minimal-academic-homepage) 替换原配色与版式。
- 已核对的源提交：`1e026d736a25017a1bb7f97181b32e44a11e33e3`；同时目视查看了[演示页面](https://xin-jiaqi.github.io/minimal-academic-homepage/)。
- 该提交的 [README Rights status](https://github.com/Xin-Jiaqi/minimal-academic-homepage/blob/1e026d736a25017a1bb7f97181b32e44a11e33e3/README.md#rights-status) 明确表示未选择标准开源许可，公开可见不等于授予复用权。检索缓存中的旧 README 说法不同，本次以固定提交中的文件为准。
- 本次借鉴浅灰背景、白色圆角面板、横向导航、紧凑介绍及分区卡片这些通用设计方式，用现有项目的 Astro / CSS 重新编写。没有将参考仓库的 HTML/CSS 源文件、人物照片、占位 SVG、工作流或测试复制到受版本管理的文件和构建产物中。
- 下载用于阅读的源文件只保存在被 Git 忽略的 `.local/reference/` 下，不参与构建。现有内容数据与官方 HKUST SVG 继续使用；当时的文字 favicon 已在后续资产打磨中替换，见下文。
- 如果后续决定直接复用该模板代码或图片，需先确认相应许可或取得作者授权；本轮没有因此创建外部账号、联系作者或公开发布。

## FLEX / Materia Viva 界面样式改编

2026-09-23 用户明确要求直接照这两个项目的前端尝试。该要求覆盖此前仅提炼原则的范围；实际仅改编指定界面层，不引入研究数据或原项目服务。

- **FLEX**：[固定提交](https://github.com/AI4QC/FLEX/tree/9a0060223751c09e75d6200479dc66ce181f8624)，参考 `Webapp/frontend/src/theme.css`、`App.tsx` 和 `pages/PublicLanding.tsx`。采用品牌/底色/强调色的语义分工、分色方向区块及导航强调；主色改为本项目的科大蓝，删除数据读取、统计图、登录和管理功能。
- 已核对 FLEX 的 MIT 许可，完整通知存于 `public/licenses/FLEX-MIT.txt`，包含原始版权通知。此文件随静态页面构建。
- **Materia Viva**：[固定提交](https://github.com/AI4QC/materia-viva/tree/a2f73df5e9cae792dc4a21520767c2cbbdd565b7)，改编 `frontend/src/styles/tokens.css` 与 `global.css` 中的纸色、酒红强调、阴影值、浮动导航、面板及大视觉区/侧栏结构。其 `demo/MateriaViva_demo_2K60_cover.png` 只用于布局观察，没有复制到站点；该演示配色与当前源码不完全相同。
- README 明确项目自身代码为 CC BY-NC 4.0，LICENSE 原文存于 `public/licenses/Materia-Viva-CC-BY-NC-4.0.txt`。当前用途为非商业学生社团介绍；后续若改变用途需重新核对许可范围。没有把数据源的许可推断为界面代码的许可，未使用其集成数据。
- 2026-09-24 暂存检查移除了上述 LICENSE 末尾的一行空白，许可正文和通知保持完整。
- 代码改动说明：React/应用交互改为单页静态 Astro；替换全部业务内容；使用本地字体回退；调整颜色、字号、手机布局和文字溢出处理；取消原项目的数据控件、主题切换和动画。来源、许可与修改说明也在页脚原生折叠的 Design credits 中提供。
- 版权/许可通知属于上游代码复用信息，不表示对应项目或版权持有人是本社团成员、赞助者或合作者。

## 科学主题装饰图

- 文件：`public/illustrations/science-network.svg`；本项目在本轮自行用 SVG 绘制，约 5.2 KB，无外部引用和脚本。
- 内容为装饰性的球棍网络与节点连接，呼应化学与 AI 的交叉。坐标为设计坐标，没有具体物质名称、单位、实验数值或训练结果，不是材料记录或社团研究成果。
- 作为装饰图使用。2026-09-23 细节打磨后将本地 SVG 在构建时内联，容器 `aria-hidden="true"`；文本宗旨与方向入口在图外保持可访问。未调用图片生成服务，也没有修改或使用参考项目的研究截图作为站点图像。

## 图标与轻量动效（主体认可后）

- **Lucide**：[固定提交](https://github.com/lucide-icons/lucide/tree/f06ac67e33d645c40b8ce19a0419c85c5d7dd751)。从 `icons/` 选取 `flask-conical.svg`、`orbit.svg`、`terminal.svg`、`mail.svg`、`chevron-up.svg` 的路径，保存在 `src/components/Icon.astro`。统一 24 × 24 viewBox、2 单位线宽、默认 18px 显示，沿用原蓝/酒红/金色角色；金色线条略加深以适应浅色背景。
- 核对并保留该提交完整 LICENSE，文件为 `public/licenses/Lucide-LICENSE.txt`，页脚 Design credits 可访问。它同时包含 Lucide ISC 通知与 Feather 衍生图标的 MIT 通知（本次使用的 terminal / chevron-up 在其名单内）。没有安装整套图标包、字体或客户端加载器。
- 所有小图标与现有文字并列，SVG 为 `aria-hidden="true"`、`focusable="false"`；链接用途由文字表达，不增加重复的屏幕阅读器标签。
- 对照了 [Tabler Icons](https://github.com/tabler/tabler-icons) 的图标方案，最终未引入其文件，以保持同一套线条。
- 交互动效参考 [lucide-animated](https://github.com/pqoqubbw/icons/tree/072c38b1b04ea738d90a084485ccaad4b890ddca) 中 `icons/mail-check.tsx` 的鼠标进入时触发一次路径变化方式；没有复制它的 React / Motion 代码、教程、演示素材或整套动效。本站自行用 CSS 实现主图连线变化，不声称复用了该项目的动画组件。
- 主图只增加 `.science-bridge` 样式钩子，原 SVG 几何与颜色未改。一次 1.2 秒虚线位移/透明度变化，结束后恢复静态；仅响应鼠标移入或方向链接的键盘可见焦点，减少动态偏好下没有动画，触屏不依赖悬停。它是交互装饰，不表示计算任务、数据传输或研究模拟。
- `public/favicon.svg` 为本项目自绘的三节点网络小图标，使用深蓝底、白色连线和主图已有的金色/红色节点。替换此前灰色文字图标，无字体依赖、脚本或外部资源。已检查 16 / 24 / 32 / 64px 深浅底效果；不替换 HKUST 原标识，也不声明为已正式通过的社团 logo。
