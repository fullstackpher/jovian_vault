---
title: OpenClaw教程 - 25个Tools + 53个Skills使用指南
tags:
  - OpenClaw
  - 教程
  - 工具
  - 技能
date: 2026-02-17
source: 外部收集
paracategory: Resources
创建时间: 2026-02-22T23:01
更新时间: 2026-02-22T23:43
---
更新时间: 2026-02-22T23:31

---
> 🌐 这篇文章也有英文版本 [Read in English →](https://yu-wenhao.com/en/blog/openclaw-tools-skills-tutorial/)

![](https://jovian-1257905003.cos.ap-shanghai.myqcloud.com/picture/openclaw-tools-skills-tutorial.webp)

OpenClaw 装完了，然后呢？

Tools 散在不同文件，Skills 预设自动载入——你甚至不知道有些东西已经开了。全开怕出事，全关等于白装，但要自己从文件和codebase 拼出全貌，还是得花点时间。

这篇是我自己装完之后的研究笔记——25 个Tools 和53 个官方bundled Skills 各是什么、该不该开、我怎么配、为什么这样配（社群另有3000+ 个第三方Skills，不在这篇范围）。安全面的分析在 [上一篇](https://yu-wenhao.com/zh-TW/blog/2026-02-04-is-openclaw-safe-security-guide) ，这篇讲每个Tool 和Skill 在干嘛、以及怎么根据需求配置。

---

## 先搞懂：OpenClaw Tools 和Skills 的差别

很多人搞混这两个，其实很简单。

**Tools 是器官** ——决定OpenClaw「能不能」做某件事。 `read` 和 `write` 让它读写档案， `exec` 让它执行系统命令， `web_search` 让它像Google 一样搜寻， `web_fetch` 让它点进网页读内容， `browser` 让它操作网页（点按钮、填表单、截图）。没开Tool，就像没有手，什么都做不了。

**Skills 是教科书** ——教OpenClaw「怎么组合Tools」来完成任务。 `gog` 教它怎么用Google Workspace 收发Email 和管行事历， `obsidian` 教它怎么整理笔记， `github` 教它怎么操作repo， `slack` 教它怎么发讯息到频道。 53 个官方Skills 涵盖笔记、Email、社群、开发、智慧家居等场景。

装Skill 会不会自动给OpenClaw 新权限？ **不会。**

举例：你装了 `obsidian` Skill，OpenClaw 知道怎么组织笔记——但如果没开 `write` Tool，它根本写不了档案。 Skill 只是说明书，真正的开关在Tools。

OpenClaw 要用Skill 帮你做事，有三个条件要满足。拿「帮你读Gmail」举例：

1. **设定** ：你有没有在设定档里允许OpenClaw 执行命令？ （没开 `exec` ，它连启动程式都做不到）
2. **安装** ：电脑上有没有装 `gog` 这个桥接工具？ （没装的话，OpenClaw 知道怎么做但连不上Google）
3. **授权** ：你有没有登入Google 帐户并允许存取？ （没授权，Google 不会让它进来）

三个条件缺一不可。所以Skill 只是说明书，能不能做到要看这三个条件有没有满足。

---

## 同心圆架构：从核心到外围

把25 个Tools 和53 个Skills 全部列出来太乱了。我用同心圆的方式整理：

- **Layer 1 核心能力（8 Tools）** ：读写档案、执行命令、网路存取。几乎每个人都会开。
- **Layer 2 进阶能力（17 Tools）** ：浏览器、记忆、多Session、自动化。按需开启。
- **Layer 3 知识层（53 Skills）** ：教OpenClaw 操作Google、Obsidian、Slack 等服务。用什么装什么。

![OpenClaw 同心圆架构：Layer 1 核心工具（read、write、exec）、Layer 2 进阶工具（browser、memory、automation）、Layer 3 知识层含53 个Skills 依场景分类](https://yu-wenhao.com/images/blog/openclaw-tools-skills-tutorial/openclaw-tools-skills-architecture.webp)

---

## Layer 1：核心能力（8 Tools）

这8 个是OpenClaw 最基本的能力——只开这些的话，它就是一个能读写档案、跑命令、上网查资料的ChatGPT，不会记住你的偏好，也不会主动推讯息给你。真正让OpenClaw 变成「助理」而不是「聊天机器人」的是Layer 2。但没有Layer 1，Layer 2 也跑不起来。

### 档案操作：read、write、edit、apply\_patch

`read` 只能读。 `write` 和 `edit` 能改档案， `apply_patch` 套用程式码修改。这四个是最基本的档案操作，大多数人都会开。

### 执行与程序管理：exec、process

`exec` 让OpenClaw 执行任何shell 命令——安装套件、跑脚本、操作系统。 「任何」是关键字：它能帮你装套件，也能 `rm -rf` （删除所有档案）你的整台机器。不开 `exec` ，大部分任务都做不了；开了但不设防，等于把root 权限交出去。

所以我强烈建议开 `exec` 的同时开审批——每个命令执行前，OpenClaw 会先显示它要跑什么，你确认了才会执行：

```json
{

  "approvals": {

    "exec": { "enabled": true }

  }

}
```

会不会很烦？老实说会。但这是最基本的保护——万一哪天AI 误判或被Prompt Injection 攻击，这道关卡就是你的最后防线。

`process` 管理背景程序——列出任务、查看输出、终止卡住的程序。通常跟 `exec` 一起开。

`web_search` 做关键字搜寻， `web_fetch` 抓取网页内容。搭配起来就是让OpenClaw 能上网查资料。

---

## Layer 2：进阶能力（17 Tools）

Layer 1 是「能不能用」，Layer 2 是「好不好用」。这一层的Tools 让OpenClaw 从一个指令执行器变成真正的助理——记得你的偏好、能操作浏览器、会定时推送讯息。但每多开一个，攻击面就多一块，要自己判断值不值得。

### 浏览器：browser、canvas、image

`browser` 让OpenClaw 操作Chrome——点按钮、填表单、截图。我会让它帮我上网比价、整理规格、把东西加到购物车，但结帐一定自己来。涉及付款的「最后一哩」不交给AI，这是我的底线。

`canvas` 是视觉化工作区，画流程图、架构图。 `image` 让OpenClaw「看懂」图片。

让OpenClaw 记住跨session 的资讯。用了一个多星期后，它记得我用Astro 写blog、部署在Azure、偏好繁体中文，不用每次都重新解释。用越久越懂你。

### 多Session：sessions 系列（5 个）

可以同时开多个Session 处理不同任务——例如一个在跟你讨论新的产品点子，一个在帮你查旅游资料，互不干扰。

`sessions_list` 和 `sessions_history` 查看session， `session_status` 查状态。 `sessions_send` 和 `sessions_spawn` 让session 之间能互相通讯和启动子任务。

### 讯息：message

让OpenClaw 发讯息到Discord、Slack、Telegram、WhatsApp、iMessage。

这个Tool 我有开，但只用来让OpenClaw 传讯息给我自己——不让它代替我跟任何人沟通。原因很简单：AI 用你的名义发出去的讯息，收回不了。万一它理解错意思、语气不对、甚至被Prompt Injection 骗去发讯息，后果是你自己承担。

我用OpenClaw 当作 [目标管理系统](https://yu-wenhao.com/zh-TW/blog/ai-goal-management-system) 的沟通界面，而启用 `message` 是让它可以主动传讯息给我——每天推送Daily Brief、任务通知、待办提醒，全部都是发给我自己。

### 硬体控制：nodes

跨设备控制硬体——远端截图、GPS 定位、开相机。

我第一次看到这个Tool 的时候想了一下：什么情况需要AI 主动开我的相机？想不到。截图的话，自己在Telegram 传给它就好，多一步但安心很多。关掉。

### 自动化：cron、gateway

`cron` 设定定时任务， `gateway` 让它能重启自己。

每天早上6:47，我的Telegram 会收到OpenClaw 整理好的Daily Brief——今天要做什么、有哪些待回覆的讯息、天气预报。这就是 `cron` 搭配 `message` 的效果，也是我 [AI 目标管理系统](https://yu-wenhao.com/zh-TW/blog/ai-goal-management-system) 的核心。

### Agent 通讯：agents\_list

列出可用的Agent ID。 OpenClaw 支持多Agent 架构，但官方文档没详细说明。如果只用一个OpenClaw，这个用不到。

### Extension Tools：llm\_task、lobster

`lobster` 是工作流引擎，定义多步骤流程。 `llm_task` 在工作流中插入LLM 处理步骤。

如果没有用工作流引擎，这两个不需要开。

---

## Layer 3：知识层（53 个官方Skills）

53 个听起来很多，但扫过一遍之后你会发现，跟自己相关的大概就十几个。剩下的像是外送、智慧家居、语音通话——不是不好，是跟你的使用场景无关就不用管。

**重要：bundled Skills 预设会自动载入** ——只要对应的CLI 工具已安装在系统上，该Skill 就会自动启用。不是「不装就没有」，而是「不关就全开」。如果你不想让某个Skill 被启用，需要用 `skills.allowBundled` 白名单模式，只保留你需要的（设定范例见下方「我的设定」段落）。

ClawHub 社群另有3000+ 个第三方Skills，但第三方的安全风险另当别论（见 [安全指南](https://yu-wenhao.com/zh-TW/blog/2026-02-04-is-openclaw-safe-security-guide) ）。

以下按使用场景分类。

### 📝 笔记管理

笔记相关有4 个Skill： `obsidian` 、 `notion` 、 `apple-notes` 、 `bear-notes` 。但能不能用取决于你的部署方式。

`apple-notes` 和 `bear-notes` 只能在Mac 上本机跑，OpenClaw 装在VM 的话直接排除。 `obsidian` 操作的是本地档案。我自己用Obsidian，但vault 在本机、OpenClaw 在Azure VM，中间隔了一层，所以笔记这块我用本机的Claude Code 协作，不经过OpenClaw。如果你希望OpenClaw 直接帮你管笔记，而它又跑在VM 上， `notion` 是云端服务，不受部署位置限制，最没有障碍。

### ✅ 工作生产力

Email 有两个Skill： `gog` 和 `himalaya` 。 `gog` 整合整个Google Workspace（Gmail、Calendar、Tasks、Drive、Docs、Sheets）， `himalaya` 走IMAP/SMTP，只管收发信。如果你用Google，直接选 `gog` ——功能更完整，而且可以随时从Google 帐户撤销存取。我全开了，因为工作上都用得到。

任务管理有 `things-mac` （Things 3）、 `apple-reminders` 、 `trello` ，但如果你已经装了 `gog` ，Google Tasks 就包含在内，不需要额外装。

### 💬 即时通讯& 社群媒体

`wacli` （WhatsApp）、 `imsg` （iMessage）、 `bird` （X/Twitter）、 `slack` 、 `discord` ——这些Skill 让OpenClaw 深度操作各平台，包括搜寻历史讯息、同步对话记录、管理频道等。跟 `message` tool（只负责发讯息）不同，装了这些等于让它完整存取你在该平台上的资料。

我一个都没装。对外沟通的最后一步，一定自己来。

### 🐙 开发者工具

- `github` ：透过 `gh` CLI 操作GitHub，需要OAuth，权限可控
- `tmux` ：管理多个终端session
- `session-logs` ：搜寻和分析过去的对话记录
- `coding-agent` ：在背景呼叫其他AI 编程助手（Codex、Claude Code 等）

我有装 `github` 、 `tmux` 、 `session-logs` 。写程式码在本地用Claude Code，但OpenClaw 随时都能透过Telegram 操作——例如人在外面，CI/CD 突然挂了，直接在手机问「帮我看一下这个PR 为什么build fail」，它就会去查GitHub Actions 的error log，告诉你原因。

`coding-agent` 目前没装，但这块潜力很大——可以在OpenClaw 的VM 上安装Claude Code，让OpenClaw 在背景调用它处理编程任务。想像一下：你在Telegram 跟OpenClaw 说「我在GitHub 上看到这个repo 很有趣，帮我clone 下来、研究一下、做成一个可以demo 的网站」，它就自动启动Claude Code 执行，完成后推送通知给你。等于让AI 协调AI。我还没深入研究，有空再来试试能不能整合到工作流。

### 🔐 密码管理

`1password` 让OpenClaw 存取你的1Password 密码库——帮你查密码、自动登入、填写表单。使用情境像是：「帮我登入AWS Console」或「这个网站的密码是什么」。

但它的权限模式是一旦授权就是整个密码库，没办法只开放某几组密码，你存了什么它就能读什么。我选择不装。如果真的需要，可以建立「AI 专用vault」，只放可以让AI 存取的密码。

### 🎨 其他场景

上面是我有在用或认真考虑过的分类。其余像音乐播放、智慧家居、图片生成、语音转文字、外送等场景，我都没装，完整清单见文末附录。

---

## 我的OpenClaw 设定：怎么根据需求配置Tools 和Skills

我的OpenClaw 跑在Azure VM 上，透过Telegram 操作。搭配桌面端的Claude Code，形成移动端+ 桌面端的双系统工作流——移动端随时讨论、研究、捕捉想法，对话记录自动同步，桌面端直接接手执行。日常还用它管Email、行事历、查资料，以及每天早上推送Daily Brief。

以下是我目前的设定，以及每个选择背后的原因。

### Tools（25 个开了21 个）

我的判断原则很简单： **想不到使用场景的就不开。**

```json
{

  "tools": {

    "allow": [

      "read", "write", "edit", "apply_patch",

      "exec", "process",

      "web_search", "web_fetch",

      "browser", "image",

      "memory_search", "memory_get",

      "sessions_list", "sessions_history", "sessions_send", "sessions_spawn", "session_status",

      "message", "cron", "gateway", "agents_list"

    ],

    "deny": ["nodes", "canvas", "llm_task", "lobster"]

  },

  "approvals": {

    "exec": { "enabled": true }

  }

}
```

**开了21 个，关了4 个** ： `nodes` （想不到场景）、 `canvas` （用不到）、 `llm_task` / `lobster` （没用工作流引擎）。 `exec` 开审批， `message` 只用来传给自己。

### Skills（53 个只开9 个）

前面提过，bundled Skills 预设全部自动载入。我用 `allowBundled` 白名单限制只开需要的：

```json
{

  "skills": {

    "allowBundled": [

      "gog", "github", "tmux", "session-logs",

      "weather", "summarize", "clawhub",

      "healthcheck", "skill-creator"

    ]

  }

}
```

简单来说： `gog` 管Email 和行事历、 `github` 管repo、其余是Daily Brief 和系统管理用的基础工具。

---

## 下一步：开始设定你的OpenClaw

25 个Tools 不用全开，53 个bundled Skills 预设全开——用 `allowBundled` 只留你需要的。打开你的 `openclaw.json` ，从这三个原则开始：

1. **想不到场景的就不开**
2. **能力越大，管控越严** —— `exec` 开审批， `message` 只传给自己
3. **最后一哩自己来** ——结帐、发讯息、发文，收不回来的操作不交给AI

我的配置可以直接当起点，复制上去再根据自己的需求删减。安全设定的部分，搭配 [安全指南](https://yu-wenhao.com/zh-TW/blog/2026-02-04-is-openclaw-safe-security-guide) 一起看。

OpenClaw 对我来说不只是工具——它是让一个人能做到一整个团队事情的基础建设。

*喜欢这类内容？我每周写一封信，聊怎么把AI 用在真实生活和工作里，和一路上想通的道理。 [订阅直接寄给你](https://yu-wenhao.com/zh-TW/) 。*

---

## 常见问题FAQ

### Skills 安装后权限会改变吗？

不会。 Skills 只是教科书，真正控制能力的是 `tools.allow` 。

### 1password Skill 真的能读取所有密码吗？

是的。一旦授权，整个密码库都能存取——你存了什么它就能读什么。

### 如何撤销gog 的Google 存取权限？

[Google 帐户](https://myaccount.google.com/) → 安全性→ 第三方应用程式存取权→ 找到gog → 移除。

### ClawHub 的第三方Skills 安全吗？

不能预设安全。安装前务必审查GitHub repo。详细的审查方法和prompt，请见 [安全指南](https://yu-wenhao.com/zh-TW/blog/2026-02-04-is-openclaw-safe-security-guide) 。

### 为什么是25 个Tools？

官方文档列18 个，我从codebase 整理出25 个。多出来的是session 相关、 `agents_list` 、以及工作流引擎（ `llm_task` 、 `lobster` ）等文档没列的Tools。

### OpenClaw 跟ChatGPT 有什么不同？

ChatGPT 是聊天工具，OpenClaw 是Agent。差别在「聊完之后」：

- **ChatGPT** ：讨论完，你要手动复制内容、贴到别的地方。它只能跟你聊天。
- **OpenClaw** ：讨论完，它可以接着帮你做事——上网查资料、读写文件、操作日历、读你的Gmail 并草稿回覆、自动同步到电脑让Claude Code 接手执行。

连「同步」的意义都不同：LLM App 的同步是你在手机和电脑都能看到对话记录；OpenClaw 的同步是对话记录直接变成电脑资料夹里的文件，其他工具可以直接读取、接手工作。一个是「看得到」，一个是「能接着用」。

如果你只是想聊天，ChatGPT 够用。如果你想聊完之后让AI 接着帮你做事，那需要OpenClaw 这种Agent。

### OpenClaw 可以自动化哪些任务？

搭配 `cron` （排程）和 `message` （讯息推送）这两个Tools，OpenClaw 可以定时执行任务并把结果推送给你。我每天早上6:47 会收到它整理好的Daily Brief——今天要做什么、有哪些待回覆的讯息、天气预报。

除了定时推送，常见的自动化场景还包括：定期整理Email 并摘要重点、监控GitHub repo 的CI/CD 状态、定时收集特定主题的热门讨论整理成写作素材、定期追踪产业动态并摘要重点。基本上只要能拆成「触发条件+ 执行步骤」的任务，OpenClaw 都能自动化。

### 不会写程式也能用OpenClaw 吗？

日常使用完全不需要写程式——你用自然语言跟它对话就好。 「帮我查今天有什么Email」、「帮我排一个明天早上9 点的提醒」，这些都是直接说就行。

但OpenClaw 是开源专案，安装和设定有门槛。你可以部署到云端VM，也可以本机安装——但基于安全性，建议用一台独立的机器来跑，不要装在你的主力电脑上。安装过程中如果有在用Claude Code 之类的AI CLI 工具，可以让它协助你完成设定，会省很多摸索的时间。

建议搭配这三篇一起看： [部署成本全攻略](https://yu-wenhao.com/zh-TW/blog/2026-02-01-openclaw-deploy-cost-guide) 搞清楚要花多少钱、 [安全指南](https://yu-wenhao.com/zh-TW/blog/2026-02-04-is-openclaw-safe-security-guide) 搞清楚怎么防护、这篇搞清楚功能怎么配。

---

## 附录：完整清单

📦 点击展开25 个Tools 完整表格

| Layer | Tool | 功能 | 风险 |
| --- | --- | --- | --- |
| 1 | `read` | 读取档案 | 🟢 低 |
| 1 | `write` | 写入档案 | 🟡 中 |
| 1 | `edit` | 结构化编辑 | 🟡 中 |
| 1 | `apply_patch` | 套用patch | 🟡 中 |
| 1 | `exec` | 执行命令 | 🔴 极高 |
| 1 | `process` | 管理程序 | 🟡 中 |
| 1 | `web_search` | 搜索 | 🟢 低 |
| 1 | `web_fetch` | 抓取网页 | 🟡 中 |
| 2 | `browser` | 浏览器操作 | 🟠 高 |
| 2 | `canvas` | 视觉化工作区 | 🟢 低 |
| 2 | `image` | 图片分析 | 🟢 低 |
| 2 | `memory_search` | 搜寻记忆 | 🟡 中 |
| 2 | `memory_get` | 取得记忆 | 🟡 中 |
| 2 | `sessions_list` | 列出session | 🟢 低 |
| 2 | `sessions_history` | 对话历史 | 🟡 中 |
| 2 | `sessions_send` | 发送讯息 | 🟠 高 |
| 2 | `sessions_spawn` | 启动子Agent | 🟠 高 |
| 2 | `session_status` | 状态检查 | 🟢 低 |
| 2 | `message` | 跨平台讯息 | 🔴 极高 |
| 2 | `nodes` | 硬体控制 | 🔴 极高 |
| 2 | `cron` | 排程任务 | 🟠 高 |
| 2 | `gateway` | Gateway 管理 | 🟠 高 |
| 2 | `agents_list` | 列出Agent | 🟢 低 |
| Ext | `llm_task` | 工作流LLM 步骤 | 🟡 中 |
| Ext | `lobster` | 工作流引擎 | 🟡 中 |

🎯 点击展开53 个Skills 完整表格

| 场景 | Skill | 平台/功能 | 风险 |
| --- | --- | --- | --- |
| 📝 笔记 | `obsidian` | Obsidian | 🟢 低 |
| 📝 笔记 | `notion` | Notion | 🟡 中 |
| 📝 笔记 | `apple-notes` | Apple Notes | 🟢 低 |
| 📝 笔记 | `bear-notes` | Bear | 🟢 低 |
| ✅ 任务 | `things-mac` | Things 3 | 🟢 低 |
| ✅ 任务 | `apple-reminders` | Reminders | 🟢 低 |
| ✅ 任务 | `trello` | Trello | 🟡 中 |
| 📧 工作 | `gog` | Google Workspace | 🟡 中 |
| 📧 工作 | `himalaya` | IMAP/SMTP | 🔴 高 |
| 💬 通讯 | `slack` | Slack | 🟡 中 |
| 💬 通讯 | `discord` | Discord | 🟡 中 |
| 💬 通讯 | `wacli` | WhatsApp | 🔴 极高 |
| 💬 通讯 | `imsg` | iMessage | 🔴 极高 |
| 💬 通讯 | `bluebubbles` | iMessage (外部) | 🟠 高 |
| 🐦 社群 | `bird` | X (Twitter) | 🔴 极高 |
| 🐙 开发 | `github` | GitHub | 🟡 中 |
| 🐙 开发 | `coding-agent` | AI 编程 | 🟡 中 |
| 🐙 开发 | `tmux` | 终端机 | 🟢 低 |
| 🐙 开发 | `session-logs` | 记录搜寻 | 🟢 低 |
| 🎵 音乐 | `spotify-player` | Spotify | 🟢 低 |
| 🎵 音乐 | `sonoscli` | Sonos | 🟢 低 |
| 🎵 音乐 | `blucli` | BluOS | 🟢 低 |
| 💡 家居 | `openhue` | Philips Hue | 🟢 低 |
| 💡 家居 | `eightctl` | Eight Sleep | 🟢 低 |
| 🍔 外送 | `food-order` | 多平台 | 🟠 高 |
| 🍔 外送 | `ordercli` | Foodora | 🟡 中 |
| 🎨 创作 | `openai-image-gen` | OpenAI 图片 | 🟢 低 |
| 🎨 创作 | `nano-banana-pro` | Gemini 图片 | 🟢 低 |
| 🎨 创作 | `video-frames` | 影片截图 | 🟢 低 |
| 🎨 创作 | `gifgrep` | GIF 搜寻 | 🟢 低 |
| 🎙️ 语音 | `sag` | ElevenLabs TTS | 🟢 低 |
| 🎙️ 语音 | `openai-whisper` | 语音转文字 | 🟢 低 |
| 🎙️ 语音 | `openai-whisper-api` | 云端STT | 🟢 低 |
| 🎙️ 语音 | `sherpa-onnx-tts` | 离线TTS | 🟢 低 |
| 🔐 密码 | `1password` | 1Password | 🔴 极高 |
| 🤖 AI | `gemini` | Gemini | 🟢 低 |
| 🤖 AI | `oracle` | Oracle CLI | 🟢 低 |
| 🤖 AI | `mcporter` | MCP 整合 | 🟡 中 |
| 🛠️ 系统 | `clawhub` | Skill 管理 | 🟢 低 |
| 🛠️ 系统 | `skill-creator` | 建立Skill | 🟢 低 |
| 🛠️ 系统 | `healthcheck` | 安全检查 | 🟢 低 |
| 🛠️ 系统 | `summarize` | 摘要 | 🟢 低 |
| 🛠️ 系统 | `weather` | 天气 | 🟢 低 |
| 📍 地点 | `goplaces` | Google Places | 🟢 低 |
| 📍 地点 | `local-places` | 本地proxy | 🟢 低 |
| 📸 媒体 | `camsnap` | RTSP 相机 | 🟡 中 |
| 📰 资讯 | `blogwatcher` | RSS 监控 | 🟢 低 |
| 📄 文件 | `nano-pdf` | PDF 编辑 | 🟢 低 |
| 📊 监控 | `model-usage` | 用量追踪 | 🟢 低 |
| 🖥️ 系统 | `peekaboo` | macOS UI | 🟠 高 |
| 📞 通讯 | `voice-call` | 语音通话 | 🟠 高 |
| 🎨 创作 | `canvas` | Canvas 操作 | 🟢 低 |
| 🎵 音乐 | `songsee` | 音频视觉化 | 🟢 低 |

⚡ Tool Groups 快捷

| Group | 包含 |
| --- | --- |
| `group:fs` | read, write, edit, apply\_patch |
| `group:web` | web\_search, web\_fetch |
| `group:ui` | browser, canvas |
| `group:memory` | memory\_search, memory\_get |
| `group:sessions` | sessions\_list, sessions\_history, sessions\_send, sessions\_spawn, session\_status |
| `group:messaging` | message |
| `group:nodes` | nodes |
| `group:automation` | cron, gateway |

---

## 延伸阅读

- [OpenClaw 安全吗？ 5 个必做的安全设定](https://yu-wenhao.com/zh-TW/blog/2026-02-04-is-openclaw-safe-security-guide)
- [OpenClaw 部署成本全攻略：$0-8/月打造你的AI 助理](https://yu-wenhao.com/zh-TW/blog/2026-02-01-openclaw-deploy-cost-guide)
- [Claude Code 教学：5 分钟完成安装与第一个任务](https://yu-wenhao.com/zh-TW/blog/claude-code-tutorial)

---

*最后更新：2026-02-05*

＃人工智能 #一人公司 #OpenClaw #self-hosted AI #数位工具

## FAQ

Skills 安装后权限会改变吗？

不会。 Skills 只是教科书，真正控制能力的是tools.allow。

1password Skill 真的能读取所有密码吗？

是的。一旦授权，整个密码库都能存取——你存了什么它就能读什么。

如何撤销gog 的Google 存取权限？

Google 帐户→ 安全性→ 第三方应用程式存取权→ 找到gog → 移除。

ClawHub 的第三方Skills 安全吗？

不能预设安全。安装前务必审查GitHub repo。详细的审查方法和prompt，请见安全指南。

OpenClaw 跟ChatGPT 有什么不同？

ChatGPT 是聊天工具，OpenClaw 是Agent。差别在「聊完之后」：ChatGPT 只能跟你聊天，OpenClaw 可以接着帮你做事——上网查资料、读写文件、操作日历、读你的Gmail 并草稿回覆。

OpenClaw 可以自动化哪些任务？

搭配cron（排程）和message（讯息推送），OpenClaw 可以定时执行任务并推送结果。常见场景包括：每日Daily Brief、定期整理Email、监控CI/CD 状态、收集热门讨论整理成写作素材。

不会写程式也能用OpenClaw 吗？

日常使用不需要写程式，用自然语言对话就好。但安装和设定有门槛，建议用Claude Code 之类的AI CLI 工具协助完成设定。

## 相关文章

[![OpenClaw 安全吗？ 5 个必做的安全设定](https://yu-wenhao.com/images/blog/openclaw-security-guide.webp)](https://yu-wenhao.com/zh-TW/blog/2026-02-04-is-openclaw-safe-security-guide/)

OpenClaw 安全吗？ 5 个必做的安全设定

AI 实战

[View original](https://yu-wenhao.com/zh-TW/blog/2026-02-04-is-openclaw-safe-security-guide/)

[![OpenClaw 部署成本全攻略：$0-8/月打造你的私人AI 助理](https://yu-wenhao.com/images/blog/openclaw-deploy-cost.webp)

AI 实战

### OpenClaw 部署成本全攻略：$0-8/月打造你的私人AI 助理

](https://yu-wenhao.com/zh-TW/blog/2026-02-01-openclaw-deploy-cost-guide/)[![Agentic Coding 完全指南：定义、工具比较、实战框架与入门路径](https://yu-wenhao.com/images/blog/agentic-coding-guide.webp)

AI 实战

### Agentic Coding 完全指南：定义、工具比较、实战框架与入门路径

](https://yu-wenhao.com/zh-TW/blog/agentic-coding-guide/)

[所有文章](https://yu-wenhao.com/zh-TW/blog)