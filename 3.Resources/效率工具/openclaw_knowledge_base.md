---
创建时间: 2026-02-27T14:14
更新时间: 2026-02-27T14:14
---
# 🤖 OpenClaw 完整知识库

> 整理自 Chrome 书签 OpenClaw 节点 | 2026年2月27日

---

## 📌 什么是 OpenClaw？

OpenClaw 是一个开源 AI 助手平台，给你一个 24/7 的个人 AI。它理解你、帮助你，并代表你执行任务。

**核心理念**：从被动聊天 → 主动执行任务的 AI Agent

**数据统计**：
- 215K+ GitHub Stars（史上增长最快的开源项目）
- 1700+ 社区 Skills
- 339+ 教程资源
- 31 个技能分类

---

## 🗂️ 核心资源导航

### 官网 & 文档
| 资源 | 链接 |
|------|------|
| OpenClaw 官网 | https://openclaw.ai |
| 官方文档 | https://docs.openclaw.ai |
| GitHub 仓库 | https://github.com/openclaw/openclaw |
| ClawHub 技能市场 | https://clawhub.ai |

### 中文学习资源
| 资源 | 链接 |
|------|------|
| OpenClaw 101 (7天入门) | https://openclaw101.dev |
| 飞书知识库 - 7天指南 | https://my.feishu.cn/wiki/YkWgwqSchi9xW3kEuZscAm0lnFf |
| 菜鸟教程 | https://www.runoob.com/ai-agent/openclaw-clawdbot-tutorial.html |
| Heyuan110 博客 | https://www.heyuan110.com/tags/openclaw/ |
| 远哥教程 | https://tbbbk.com/openclaw-advanced-config-guide/ |

---

## 📚 7天学习路径

| Day | 主题 | 内容 |
|-----|------|------|
| Day 1 | 👋 Meet OpenClaw | 理解真正的 AI 助手含义 |
| Day 2 | 💬 Deep Conversations | 高效与 AI 沟通技巧 |
| Day 3 | 📁 Files & Code | 文件处理、代码编写、脚本运行 |
| Day 4 | 🌐 Web Capabilities | 搜索、爬虫、API 调用 |
| Day 5 | 🧩 Skill Extensions | 安装社区技能扩展能力 |
| Day 6 | ⏰ Automation | Cron 任务、心跳检查、主动提醒 |
| Day 7 | 🚀 Advanced Techniques | 多 Agent、浏览器控制、设备集成 |

---

## 🧩 技能生态系统 (1700+ Skills)

### 热门技能分类统计

| 分类 | 数量 | 代表技能 |
|------|------|----------|
| AI & LLMs | 159 | kimi-integration, chatgpt-apps, chromadb-memory |
| Search & Research | 148 | exa-plus, deepwiki, technews |
| DevOps & Cloud | 144 | cloudflare, docker-essentials, kubernetes |
| Marketing & Sales | 94 | seo-audit, social-content, email-sequence |
| Notes & PKM | 61 | logseq, obsidian, notion, newsletter-digest |
| Communication | 58 | slack, discord, telegram, smtp-send |
| Smart Home & IoT | 50 | homeassistant, adguard, emporia-energy |
| Web & Frontend | 46 | frontend-design, nextjs-expert, ui-audit |
| Speech & Audio | 44 | aliyun-tts, whisper, azure-ai-voicelive |
| Health & Fitness | 35 | workout-logger, fasting-tracker, habit-tracker |
| Gaming | 7 | dnd, moltpet, winamp |

### 安装命令
```bash
# 通过 ClawHub 安装
npx clawhub@latest install <skill-name>

# 示例
npx clawhub@latest install weather
npx clawhub@latest install obsidian
npx clawhub@latest install coding-agent
```

---

## ☁️ 云平台部署教程

| 云服务商 | 教程 |
|----------|------|
| 阿里云 | 轻量应用服务器一键部署 + 钉钉集成 |
| 腾讯云 | Lighthouse + 飞书机器人配置 |
| DigitalOcean | One-Click 部署 |
| AWS | Mac 实例部署 |
| Vercel | AI Gateway 集成 |
| Hostinger | VPS 部署 |

### Docker 部署
```bash
# 官方 Docker 部署
docker run -d \
  --name openclaw \
  -p 8080:8080 \
  -v ~/.openclaw:/home/node/.openclaw \
  openclaw/openclaw:latest
```

---

## 📹 视频教程汇总

### 中文视频
- B站 - 超详细最强 AI 部署教程 (2026版)
- B站 - 本地部署接入微信/飞书/钉钉/QQ 10分钟教程
- B站 - OpenClaw 多 Agent 高级玩法
- B站 - Kimi Claw 让 AI 在飞书里 7×24 小时工作

### 英文视频
- YouTube - Full OpenClaw Setup Tutorial
- YouTube - Install OpenClaw in 10 Minutes (Feb 2026)
- Lex Fridman Podcast #491 - OpenClaw
- YouTube - Master OpenClaw in 30 Minutes

---

## 🔒 安全须知 ⚠️

### 重要安全提示
- **恶意技能事件**: ClawHavoc 攻击 (341+ 恶意技能)
- **CVE 漏洞**: 多个漏洞已披露 (CVE-2026-25253 等)
- **安全建议**:
  - 安装第三方技能前务必审查源码
  - 使用 SecureClaw 进行安全审计
  - 关注 CVE 漏洞披露
  - 限制 API 权限

### 安全资源
- The Hacker News - 341 个恶意 ClawHub 技能
- Microsoft Security Blog - 安全运行 OpenClaw
- SecureClaw - OWASP 对齐的安全插件
- NanoClaw - 最小权限隔离版

---

## 🛠️ 常用命令大全

### 安装 & 运行
```bash
# 克隆仓库
git clone https://github.com/openclaw/openclaw
cd openclaw
pnpm install
pnpm build

# 启动
pnpm start        # 生产模式
pnpm onboard      # 初始化配置
```

### CLI 命令
```bash
openclaw docs           # 查看文档
openclaw status        # 查看状态
openclaw configure     # 配置
openclaw agents list   # 列出 Agent
openclaw skills list   # 列出技能
```

---

## 📰 最新动态 (2026年2月)

### 大事件
- **2026.02.25** OpenClaw 突破 226K Stars
- **2026.02.24** v2026.2.24 发布 - 多语言停止指令支持
- **2026.02.23** v2026.2.23 - 安全加固 + Claude Opus 4.6
- **2026.02.20** Apple Watch 伴侣 App 发布
- **2026.02.17** v2026.2.17 - Claude Sonnet 4.6 + 1M 上下文
- **2026.02.15** 创始人 Peter Steinberger 加入 OpenAI

---

## 💡 实战用例

### 日常生活
- ☀️ 晨间简报 (天气 + 日程 + 新闻)
- 📧 邮件自动分类和处理
- 📅 日程管理
- 💊 喝水/运动提醒

### 工作效率
- 📝 会议记录和摘要
- 🔍 竞品分析和研究
- 📊 数据报告生成
- 📢 社交媒体自动化

### 开发工作
- 💻 代码审查和优化
- 🐛 Bug 分析和修复
- 📚 技术文档生成
- 🔧 CI/CD 自动化

---

## 🔗 社区 & 支持

| 社区 | 链接 |
|------|------|
| Discord | https://discord.com/invite/clawd |
| Reddit | https://www.reddit.com/r/ThinkingDeeplyAI/ |
| 飞书群 | 通过 OpenClaw 101 加入 |

---

## 🐈‍⬛ 相关项目

- **MoltBot**: OpenClaw 前身名称
- **Clawdbot**: OpenClaw 前身名称
- **NanoClaw**: 安全优先的轻量版
- **SecureClaw**: 安全审计插件
- **Kimi Claw**: Moonshot 云端托管版本

---

*由 魔卡 整理*
*来源: Chrome 书签 OpenClaw 节点*
*共整理 25+ 相关链接*
*整理时间: 2026-02-27*