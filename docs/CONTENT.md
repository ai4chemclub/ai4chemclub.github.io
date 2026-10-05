# 公开内容清单与编辑方法

此文件记录提炼后的事实、待确认项与编辑规则。原始邮件和聊天记录保持在仓库之外。

## 内容状态

| 内容 | 依据 / 状态 | 当前处理 |
| --- | --- | --- |
| AI for Chemistry Club 正式名称 | 注册确认与项目账户名称一致 | 已用于本地预览 |
| AI4Chem Club 简称 | 讨论采用的展示名称 | 已用于预览 |
| 化学为基础，覆盖其他科学及 AI 本身 | 用户明确说明 | 已写入关注方向与简介 |
| 当初制定的 objectives | 用户于 2026-09-22 提供原文，并随后授权先修改网页 | 已用于首屏、About、活动方向与基础学习说明；当前文案于 2026-09-23 暂时定稿 |
| 英文简介、标语 | AI 根据需求起草并按反馈修改；用户于 2026-09-23 确认当前版本暂时定稿 | 作为当前文案基线，逐段记录见 REVIEW.md |
| HKUST 化学系支持的 DAG 身份及学校标识 | 注册材料支持身份事实；用户于 2026-09-22 确认校名、校徽均可使用 | `affiliation.approvedForPublicUse: true`；页首官方标识、归属短句、首屏及 About 均已体现 |
| 注册生效期 | 2026-09-01 至 2027-08-31 | 留在计划供维护；不自动当作成立日宣传 |
| 首批 Members | 用户确认三位均同意公开下列姓名与职务 | Shaokang Li — Person in Charge (PIC)；Zongmin Zhang — Vice President；Lixue Cheng — Faculty Adviser。张宗民主页由用户于 2026-09-23 指定加入；程立雪主页由用户于 2026-10-05 指定为 https://sherrylixuecheng.github.io/，已核对页面姓名与 HKUST 化学系归属；李少康主页及三人的照片为空 |
| 学校社团邮箱 | 注册往来确认激活；2026-09-23 用户确认能正常收信，由本人负责查看和回复 | 使用 ai4chemclub@ust.hk；收件安排已确认，页面不增加个人联系方式 |
| 筹备中的 workshops | 用户要求不保留具体名称，改为 Git 培训、vibe coding 等技术培训方向；现有英文随整页暂时定稿 | 使用栏目描述 Workshops in preparation；说明列出 Git 和 AI-assisted coding (vibe coding)，标为 `planning`，日期/地点/链接均为空，`copyApproved: true` |
| OSI 黑客松 | 聊天中的外部活动线索 | 尚未核实具体活动及组队状态，页面暂不添加 |
| 活动照片、成员照片 | 尚无经过确认的公开照片 | 成员使用姓名缩写占位，不制造人像；校徽来源另见 ASSETS |

## 社团原定 objectives（2026-09-22 补充）

来源：用户在本次对话中提供的社团原定宗旨。以下仅保留宗旨正文，不包含原始通信、个人信息或附件元数据；不推断它已单独获得学校的网页使用批准。

> The AI for Chemistry Club aims to establish a student-led academic community under the support of the Department of Chemistry for students interested in the intersection of artificial intelligence, chemistry, and related AI for Science fields. The Club will promote learning, discussion, and practical exploration of AI-enabled approaches in chemical science through seminars, reading groups, workshops, and student sharing. It will also encourage interdisciplinary communication, peer mentoring, and responsible use of AI tools in scientific research and learning.

### 与当前页面的对应关系

| 原定宗旨 | 当前页面 | 表述边界 |
| --- | --- | --- |
| 学生主导的学术社群，化学系支持 | 首屏与页脚明确 student-led academic community；页首与 About 明确 HKUST 化学系归属 | 校名及标识使用已由用户确认；不表述为大学官方管理部门 |
| AI、化学及相关 AI for Science 交叉 | 已覆盖；数学、物理、AI 本身来自用户此前补充；生物学为 2026-09-23 用户新增 | 保留化学基础及跨学科范围；具体学科举例来自用户补充，不改写宗旨原文 |
| seminars、reading groups、workshops、student sharing | 活动介绍中已列出四种形式，以 We aim to 表达目标 | 不据此生成已确定的具体活动、日期或成果 |
| interdisciplinary communication、peer mentoring | About 已写入跨学科交流与同伴互助 | 表达共同学习的目标，不宣称导师配对制度已经运行 |
| responsible use of AI tools in scientific research and learning | About 已明确科研和学习中负责任使用 AI 的目标 | 不扩写成未经制定的制度或认证 |

这段原定宗旨是当前简介与活动介绍的主要依据，结合用户此前对 AI 基础、Git/GitHub 和更广泛学科兴趣的补充。首屏保留简短介绍，About 与活动介绍承载具体目标。用户于 2026-09-23 确认当前版本暂时定稿，并于 2026-09-24 同意继续网站仓库与首次上线；实际部署结果见 PLAN。

## 修改内容

公开文案集中在 `src/data/club.json`。JSON 中的文字用双引号，最后一项后面不加逗号。修改后运行 `pnpm check`、`pnpm build` 并查看页面。

- `description`：首页简介及搜索描述。
- `tagline`：首页标语的文字片段；用空格连接后显示在科学主题视觉区，按屏幕宽度自然换行。
- `about`：社团定位和愿景。
- `learningNote`：解释基础 AI 和开发协作工具如何服务于后续科学项目。
- `activitiesIntro`：活动方向与形式的简介；宗旨中的活动形式不等于已有确定日程。
- `focusAreas`：关注方向；每项有 `title` 和 `description`。
- `activities`：活动动态；数组为空时自动隐藏活动区域及导航。
- `people`：Members 中的公开成员卡片；导航保持显示，数组为空时显示待补充说明。
- `affiliation.label` / `affiliation.text`：学校归属短句及完整说明；`approvedForPublicUse` 记录确认结果。当前页面直接显示这些文字，发布检查要求该字段为 `true`。
- `contactEmail`：当前检查允许学校社团邮箱；增加其他渠道时同步调整内容检查规则。

### 添加活动

每项保留以下字段：

```json
{
  "title": "经过确认的活动标题",
  "summary": "面向同学的准确说明",
  "status": "planning",
  "relationship": "club-organized",
  "date": null,
  "location": null,
  "url": null,
  "copyApproved": false
}
```

- `planning`：筹备方向；不填确定日期和场地。
- `upcoming`：日程已经确认的活动；填写有效的 `YYYY-MM-DD` 日期。
- `completed`：确已完成的活动；保留实际日期，说明改为回顾。
- `relationship`：社团举办为 `club-organized`；参加外部活动为 `external-participation`，页面会注明关系。
- `url`：已核实的 HTTPS 官方活动/详情地址，否则 `null`。
- `copyApproved`：只有这条公开措辞被实际确认后才设为 `true`。

已确认具体时刻、时区、报名等需求出现时再扩展字段，不在简介里硬编码一套无从维护的日程。

### 添加成员

只在本人同意公开这些具体信息后加入：

```json
{
  "name": "本人确认的英文姓名",
  "role": "确认的社团职务",
  "url": null,
  "photo": null,
  "approvedForPublicUse": true
}
```

不收集个人密码、私人邮箱、学号、内部名单或未获同意的头像。确认记录用“某项已确认”的简短状态即可，不把聊天截图存进 Git。

`photo` 可省略或为 `null`，此时名录显示姓名缩写。当前版式使用 56px 小圆角方形缩写占位，姓名与职务排列在旁边。取得照片及对应公开同意后，将图片放入 `public/images/members/`，填写例如 `images/members/shaokang-li.jpg`。仅允许 PNG、JPG/JPEG、WebP、AVIF 的本地路径；文件名使用小写英文字母、数字、连字符或下划线。上线前检查图片中及元数据内有无私人信息，并目视确认裁切效果和显示尺寸。不要把网络头像地址直接填入该字段。

本轮展示职务采用用户确认的 PIC / Vice President / Faculty Adviser；PIC 展开为 Person in Charge。张宗民的职务已由用户确认，不再保留“副 PIC”的未定说法。姓名与职务的同意不自动涵盖未来添加的照片、邮箱或其他资料。

## 发布状态

`release.languageConfirmed` 为 `true`（英文为主）。用户于 2026-09-23 确认当前版本暂时定稿，因此 `release.copyApproved` 与现有工作坊的 `copyApproved` 为 `true`；2026-09-24 用户同意继续网站仓库与首次上线，`release.launchApproved` 更新为 `true`。这些字段记录实际确认，不代替确认本身。发布检查使用真实 SITE_URL `https://ai4chemclub.github.io`；它通过不等于线上部署已经完成，实际结果见 PLAN。

`noindex` 只减少索引，不提供访问控制。草稿保密依赖本地保存和不公开上传，不能依赖这个标签。

公开仓库会暴露源码与历史，甚至页面没有显示的源码字段也可被读取。绝不通过 `draft` / `hidden` 字段保存私人信息。

## 首版信息确认与可选补充

1. 英文简介与具体文案已于 2026-09-23 暂时定稿。
2. 大学名称与标识已获用户确认，保持官方文件比例及来源记录。
3. 已按用户要求去掉具体 workshop 名称，改为概括性筹备说明；最终英文随整页暂时定稿，活动安排仍未确定。
4. 社团邮箱能正常收信、由 PIC 查看和回复已确认；后续维护时保持这一安排有效。
5. 首批三人姓名与角色已确认，张宗民与程立雪的主页已由用户指定加入；可选补充其他获同意公开的主页与照片。

网站正式身份和联系渠道优先；OSI、完整成员名单、额外活动不必阻塞首版。

## 当前英文文案的中文释义（用于审阅）

实际网页文案以 `src/data/club.json` 和页面标题为准，以下是意思说明，不是第二套发布语言。

- **首页标语**：保持好奇，一起探索（Stay curious. Explore together.）。化学基础继续由社团名称、简介与 About 体现。
- **简介**：位于科大的学生主导学术社群，探索人工智能、化学及相关 AI for Science 领域。
- **About**：汇聚对 AI 与化学交叉感兴趣的同学，促进学习、讨论和实践探索，也鼓励与数学、物理、生物学及 AI 本身建立联系；希望通过跨学科交流和同伴互助，让大家相互学习，并在科研和学习中负责任地使用 AI。
- **三个关注方向**：AI 与化学、其他 AI for Science、AI 基础与实用工具。
- **基础学习说明**：理解 AI 方法、学习 Git/GitHub 等工具，为一起探索科学问题积累技能。
- **活动方向**：希望通过讲座、读书会、工作坊和同学分享，创造讨论和实践 AI 的机会；不表示这些活动均已开始举办。
- **工作坊**：正在筹备 Git、AI 辅助编程（vibe coding）等技术培训工作坊；以筹备方向介绍，不给具体活动命名，安排确认后再公布。
- **联系**：同学可以通过社团邮箱询问社团情况或交流想法。
- **Members**：展示社团的学生组织者与指导老师；三张卡片现有姓名与职务，姓名缩写暂代尚未提供的照片。

主体视觉及当前英文已暂时定稿，工作坊保留概括性筹备说明；活动时间与成员照片可后续补充。逐段英文集中列在 [REVIEW.md](REVIEW.md)，作为之后修改时的参照。
