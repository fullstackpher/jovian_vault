---
创建时间: 2026-02-17T07:01
更新时间: 2026-02-17T07:31
tags:
  - 教程
  - AI
  - 智能体
  - Agent
  - OpenClaw
aliases:
  - OpenClaw 操作指南
  - Clawdbot 操作指南
  - Moltbot 操作指南
系列: AI 工具教程
---

# OpenClaw 操作指南

## 📖 教程概览

OpenClaw（原名 Clawdbot、Moltbot）是一个**本地、自托管的 AI 个人智能助手**，由 PSPDFKit 创始人 Peter Steinberger 通过 AI 编程打造。它通过将消息平台与 LLM、智能体深度整合，实现了从电脑操作、日程提醒、会议摘要生成到网页操作的全场景自动化。

### 🌟 核心特点

| 特点 | 说明 |
|------|------|
| **真简单** | 一条命令即可本地启动，无需搭建复杂的向量数据库和调度系统 |
| **真能用** | 不是演示，能真的发消息、跑脚本、读写文件 |
| **真惊喜** | 让用户意识到"原来 LLM 真的可以替我操作电脑" |
| **主动性** | 支持定时任务，能在特定条件下自动执行任务 |

### 📊 项目亮点

- **GitHub 增长最快项目之一**：短短 3 周突破 190,000+ stars（超过 langchain、dify 等）
- **本地优先、自托管**：数据完全可控，支持隐私保护
- **多平台支持**：macOS、Linux、Windows（WSL2）、树莓派
- **多消息平台**：WhatsApp、Telegram、Discord、Slack 等

---

## 📚 目录导航

- [OpenClaw 是什么](#openclaw-是什么)
- [系统架构深度解析](#系统架构深度解析)
- [部署与配置指南](#部署与配置指南)
- [核心功能详解](#核心功能详解)
- [免费大模型配置](#免费大模型配置)
- [ClawHub 技能市场](#clawhub-技能市场)
- [最佳实践与技巧](#最佳实践与技巧)
- [常见问题解答](#常见问题解答)
- [附录与资源](#附录与资源)

---

## 🔗 外部资源

| 资源类型 | 链接 |
|----------|------|
| GitHub 仓库 | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| 官方文档 | [docs.openclaw.ai](https://docs.openclaw.ai/concepts/models) |
| ClawHub 技能市场 | [clawdhub.com](https://clawdhub.com) |
| 免费大模型 | [智谱 AI 开放平台](https://www.bigmodel.cn/glm-coding) |

---

## OpenClaw 是什么

### 🎯 定位与价值

在 2024-2025 年，开发者社区对「只会聊天的 AI」产生了明显疲劳。ChatGPT、Claude 等虽然聪明，但它们停留在 web 端页面里，只能输出文字告诉你"应该怎么做"，不能真正替你完成实际任务。

OpenClaw 恰好卡位在这个断层上：

```
┌─────────────────────────────────────────────────────────────┐
│  Chatbot (只会说)          AutoGPT (太复杂)                  │
│  "你应该这样做..."         需要复杂工程配置                    │
│  ❌ 无法执行              ❌ 成功率不稳定                       │
│                                                          │
│                OpenClaw 💎 (完美平衡)                       │
│           ✅ 一条命令启动  ✅ 真实执行  ✅ 即时反馈          │
└─────────────────────────────────────────────────────────────┘
```

### 🔄 Agent vs Chatbot

| 特性 | Chatbot | Agent (OpenClaw) |
|------|---------|------------------|
| **行为** | 只会说 | 会说 + 会做 |
| **执行** | 仅文字回复 | 可执行命令、操作文件、控制浏览器 |
| **记忆** | 对话级（用完即忘） | 持久化记忆（长期记忆） |
| **主动性** | 被动响应 | 可主动提醒、定时任务 |
| **集成** | 独立应用 | 与多个应用和工具深度整合 |

### 🎭 典型使用场景

> 💡 **真实用户反馈**：

- "我让 AI 监控一个新闻网页，一有新信息就自动总结。"
- "我只是连上 WhatsApp，它就变成了我的私人助理。"
- "帮我设置一下提醒，每天早上 8 点提醒我看晨报。"
- "帮我在京东搜索机械键盘，找一个 500 元以下评价最好的。"

### 📈 与其他智能体对比

```
能力深度 (垂直轴)
    │
    │         OpenClaw
    │            █
    │            █
    │     Manus █
    │            █
    │            █
    │  AutoGPT  █
    │            █
    └────────────┴─────────────▶ 易用性 (水平轴)
           简单           复杂
```

---

## 系统架构深度解析

OpenClaw 采用**分层架构设计**，实现了清晰的逐层分离和模块化扩展。

### 🏗️ 整体架构图

```
┌──────────────────────────────────────────────────────────────┐
│                        用户层                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │WhatsApp  │ │Telegram │ │Discord  │ │ iMessage │       │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘       │
└───────┼────────────┼────────────┼────────────┼──────────────┘
        │            │            │            │
        └────────────┼────────────┼────────────┘
                     │            │
         ┌───────────▼────────────▼─────────────┐
         │      Gateway (网关层)                  │
         │  会话管理 · 权限验证 · 消息路由       │
         │  WebSocket: ws://127.0.0.1:18789      │
         └───────────┬────────────┬─────────────┘
                     │            │
         ┌───────────▼────────────▼─────────────┐
         │      Agent (智能体层)                 │
         │  ┌───────────────────────────────┐   │
         │  │  Agent Loop (思考-行动循环)   │   │
         │  │  思考 → 规划 → 行动 → 观察   │   │
         │  └───────────────────────────────┘   │
         └───────────┬────────────┬─────────────┘
                     │            │
        ┌────────────▼────────────▼─────────────┐
        │       Tools & Skills (工具层)          │
        │  bash · read · write · edit · browser  │
        └────────────┬────────────┬─────────────┘
                     │            │
        ┌────────────▼────────────▼─────────────┐
        │        Nodes (设备层)                  │
        │  iOS · Android · macOS · Linux        │
        │  摄像头 · 位置 · 通知 · 屏幕录制       │
        └───────────────────────────────────────┘
```

### 🧩 五大核心组件

| 组件 | 功能定位 | 技术细节 |
|------|----------|----------|
| **Gateway (网关)** | 中央控制平面 | Node.js 守护进程，负责会话管理、权限验证与路由 |
| **Agent (智能体)** | 推理大脑 | 处理自然语言、制定任务计划、选择工具 |
| **Skills (技能)** | 执行能力集 | 模块化插件系统，支持文件操作、浏览器控制、API 调用 |
| **Channels (通道)** | 通信接口 | 连接 WhatsApp、Telegram、Discord、Slack 等即时通讯软件 |
| **Nodes (节点)** | 设备端扩展 | 运行在 iOS/Android/macOS 上的轻量级智能体，提供摄像头、地理位置、系统通知 |

### 🔌 Gateway 组件详解

Gateway 是 openClaw 系统的**核心枢纽**，负责：

1. **接收消息**：从各个渠道收集用户指令
2. **路由分发**：决定消息交给哪个 Agent 处理
3. **回复投递**：把 Agent 的回复发送回对应渠道

#### 默认配置

```yaml
WebSocket 端点: ws://127.0.0.1:18789
Canvas 服务器: HTTP 端口 18793，路径 /__openClaw__/canvas/
服务模式: 每台主机运行单个 Gateway
```

#### WebSocket 协议

```json
// 请求格式
{
  "type": "req",
  "id": "unique-id",
  "method": "chat.sendMessage",
  "params": { ... }
}

// 响应格式
{
  "type": "res",
  "id": "unique-id",
  "ok": true,
  "payload": { ... }
}

// 事件格式
{
  "type": "event",
  "event": "agent",
  "payload": { ... },
  "seq": 123,
  "stateVersion": "v1"
}
```

### 🧠 Agent 组件详解

#### Agent Loop 核心机制

```
用户提问 → 思考 → 规划 → 行动 → 观察 → 思考 → 行动 → ... → 完成
   ↓          ↓       ↓       ↓       ↓       ↓       ↓
  输入     LLM思考  制定计划  执行工具  获取结果  评估  继续或完成
```

**核心区别**：Chatbot 只会说，Agent 会做。

#### Agent 的四个核心阶段

```
阶段 1: 上下文组装 (Context Assembly)
├── 系统提示：Agent 身份、规则、工具列表
├── 会话历史：之前的对话记录
└── Bootstrap 文件：AGENTS.md、SOUL.md、TOOLS.md

阶段 2: 模型推理 (Model Inference)
├── 直接回复用户文字
├── 生成工具调用代码 (Tool Call)
└── 请求更多信息

阶段 3: 工具执行 (Tool Execution)
├── 解析 Tool Call 参数
├── 执行工具 (exec、read、write、browser...)
└── 返回执行结果

阶段 4: 回复分发 (Reply Dispatch)
├── 格式化回复内容
├── 通过 Gateway 发送回渠道
└── 支持流式输出
```

#### 核心工具 (仅 4 个即可实现有效智能体)

```bash
1. bash   - 执行 shell 命令
2. read   - 读取文件内容
3. write  - 写入文件内容
4. edit   - 编辑文本文件
```

### 🛠️ Skills 系统详解

Skills 是 openClaw 的核心扩展机制，遵循 **AgentSkills 开放标准**（Anthropic 开发，已被 Claude Code、Cursor、VS Code、GitHub Copilot 等广泛采用）。

#### SKILL.md 格式规范

```markdown
---
name: nano-banana-pro
description: 通过 Gemini 3 Pro 生成或编辑图像
homepage: https://example.com
user-invocable: true
disable-model-invocation: false
command-dispatch: tool
command-tool: image-gen
command-arg-mode: raw
metadata: {
  "openClaw": {
    "requires": {
      "bins": ["uv"],
      "env": ["GEMINI_API_KEY"],
      "config": ["browser.enabled"]
    },
    "primaryEnv": "GEMINI_API_KEY"
  }
}
---

这里是技能的详细说明和使用指南...
```

#### Skills 加载优先级

```
优先级从高到低：

1. Workspace Skills   <workspace>/skills/
   └── 项目级别，只在该项目生效

2. User Skills        ~/.clawdbot/skills/
   └── 用户级别，所有项目共享

3. Bundled Skills     内置技能
   └── 随安装包分发
```

#### 内置 Skills (49+)

| 类别 | 包含技能 |
|------|----------|
| **Apple 生态** | Notes、Reminders、Things 3、Bear Notes |
| **Google Workspace** | Gmail、Calendar、Drive、Docs、Sheets |
| **通信工具** | Slack、iMessage、Twitter/X、Discord |
| **智能家居** | Philips Hue、Sonos、Eight Sleep |
| **开发工具** | GitHub CLI、Claude Code 子进程、Whisper 转录 |

### 📡 Channels 系统详解

Channels 负责连接各消息平台到中央 Gateway。

| Channel | 协议/库 | 特性 |
|---------|---------|------|
| WhatsApp | Baileys | QR 登录、媒体支持、群组提及 |
| Telegram | grammY | 流式传输、Webhook 支持 |
| Discord | discord.js | 原生命令、DM 策略 |
| Slack | Bolt | DM 配对策略、频道白名单 |
| Signal | signal-cli | 需本地安装 signal-cli |
| iMessage | imsg CLI | 仅 macOS |

> ⚠️ **注意**：微信暂无支持（未开放 API），未来可能支持飞书或钉钉。

#### WhatsApp 配置示例

```json
{
  "channels": {
    "whatsapp": {
      "allowFrom": ["+15555550123"],
      "groups": { "*": { "requireMention": true } }
    }
  },
  "messages": {
    "groupChat": { "mentionPatterns": ["@clawd"] }
  }
}
```

### 📱 Nodes 系统详解

Nodes 是连接到 Gateway 的子设备，提供设备本地功能：

#### Node 支持类型

| 平台 | 功能 |
|------|------|
| **iOS Node** | Canvas、语音唤醒、摄像头拍照/录像、屏幕录制、语音触发 |
| **Android Node** | Canvas、语音交互、摄像头、屏幕截图、短信集成 |
| **macOS Node** | system.run（执行命令）、system.notify（通知）、Canvas/摄像头 |

#### Node 通信协议

```json
// 列出已连接的节点
{ "tool": "nodes", "action": "status" }

// 在 Mac 节点上执行命令
{
  "tool": "nodes",
  "action": "run",
  "node": "office-mac",
  "command": ["echo", "Hello"]
}

// 拍照
{
  "tool": "nodes",
  "action": "camera_snap",
  "node": "iphone-1"
}

// 屏幕录制
{
  "tool": "nodes",
  "action": "screen_record",
  "node": "office-mac",
  "duration": "10s"
}

// 获取位置
{
  "tool": "nodes",
  "action": "location_get",
  "node": "iphone-1"
}
```

**架构理念**："远程大脑，本地双手" — Gateway 运行在远程服务器，Nodes 通过 Tailscale 连接执行本地操作。

### 💾 Memory 系统详解

openClaw 的记忆系统基于**纯 Markdown 文件**，文件是真实来源，模型只"记住"写入磁盘的内容。

#### 记忆文件结构

```
~/clawd/
├── AGENTS.md          # 智能体的描述和提示词
├── BOOTSTRAP.md       # 初始系统设置
├── HEARTBEAT.md       # 系统健康检查清单
├── IDENTITY.md        # 智能体身份/人设
├── SOUL.md            # 性格特征
├── TOOLS.md           # 可用工具参考
├── USER.md            # 用户偏好/上下文
├── MEMORY.md          # 长期策划记忆
├── canvas/            # 可视化工作区
├── memory/            # 持久化记忆目录
│   ├── 2026-01-28.md  # 每日笔记
│   └── 2026-01-29.md
└── skills/            # 已安装 skills
```

#### 向量记忆搜索

```json
{
  "agents": {
    "defaults": {
      "memorySearch": {
        "query": {
          "hybrid": {
            "enabled": true,
            "vectorWeight": 0.7,      // 向量检索 70%
            "textWeight": 0.3,        // BM25 全文检索 30%
            "candidateMultiplier": 4
          }
        }
      }
    }
  }
}
```

**实际效果**：

```
你（3 个月前）：我打算学习 Rust，主要是想写高性能的系统工具

你（今天）：我之前想学什么编程语言来着？

Clawdbot：你 3 个月前提到想学习 Rust，主要目的是写高性能的系统工具。
```

---

## 部署与配置指南

### 📋 系统要求

| 组件 | 要求 |
|------|------|
| **Node.js** | 版本 22+ |
| **RAM** | 最低 2GB（浏览器自动化建议 4GB+） |
| **CPU** | 最低双核 |
| **存储** | Docker 部署 20GB |
| **操作系统** | macOS、Linux、Windows（WSL2）、树莓派 |
| **网络** | API 访问需互联网 |
| **端口** | 18789（Gateway）、18790（Bridge） |

### 🚀 一键快速安装

#### macOS/Linux

```bash
curl -fsSL https://openClaw.bot/install.sh | bash
```

#### Windows (PowerShell)

```powershell
iwr -useb https://molt.bot/install.ps1 | iex
```

#### npm 安装

```bash
npm install -g openClaw@latest
# 或
pnpm add -g openClawt@latest
```

#### 从源码构建

```bash
git clone https://github.com/openClaw/openClaw.git
cd openClaw
pnpm install
pnpm ui:build
pnpm build
openClaw onboard --install-daemon
```

### 🧭 引导向导配置

运行以下命令启动配置向导：

```bash
openClaw onboard --install-daemon
```

向导会显示有趣的 ASCII 龙虾 Logo：

```
░████░█░░░░░█████░█░░░█░███░░████░░████░░▀█▀
█░░░░░█░░░░░█░░░█░█░█░█░█░░█░█░░░█░█░░░█░░█░
█░░░░░█░░░░░█████░█░█░█░█░░█░████░░█░░░█░░█░
█░░░░░█░░░░░█░░░█░█░█░█░█░░█░█░░█░░█░░░█░░█░
░████░█████░█░░░█░░█░█░░███░░████░░░███░░░█░
              🦞 FRESH DAILY 🦞
```

#### 步骤 1：安全确认

```
◇  Security ───────────────────────────────────────────────────────╮
│  Clawdbot agents can run commands, read/write files, and act     │
│  through any tools you enable.                                   │
│  Please read: https://docs.clawd.bot/security                    │
├──────────────────────────────────────────────────────────────────╯

◇  I understand this is powerful and inherently risky. Continue?
│  Yes
```

#### 步骤 2：选择 AI 后端

```
◇  Model/auth provider
│  Anthropic

◆  Anthropic auth method
│  ● Anthropic token (paste setup-token) ← 推荐 Claude Max 用户
│  ○ Anthropic token (Claude Code CLI)
│  ○ Anthropic API key
◆ token
│  XXXX-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx...
```

#### 步骤 3：配置消息平台（以 Telegram 为例）

```
◇  Channel status ────────────────────────────╮
│  Telegram: not configured                   │
│  WhatsApp: not configured                   │
│  Discord: not configured                    │
│  ...共支持 12+ 平台                          │
├─────────────────────────────────────────────╯

◇  Select channel (QuickStart)
│  Telegram (Bot API)
```

> 💡 **提示**：配置对应 app 的 Token 请搜索或问 AI

#### 步骤 4：安装 Gateway 服务

```
◇  Gateway service runtime ────────────────────────────────────────────╮
│  QuickStart uses Node for the Gateway service (stable + supported).  │
├──────────────────────────────────────────────────────────────────────╯

◒  Installing Gateway service…
Installed LaunchAgent: /Users/your-username/Library/LaunchAgents/com.clawdbot.gateway.plist
Logs: /Users/your-username/.clawdbot/logs/gateway.log
◇  Gateway service installed
```

#### 步骤 5：完成配置

```
◇
Telegram: ok (@YourBotName) (1416ms)  ← 你的 Bot 已连接
Agents: main (default)
Heartbeat interval: 1h (main)
Session store (main): /Users/your-username/.clawdbot/agents/main/sessions/sessions.json

◇  Control UI ─────────────────────────────────────────────────────────╮
│  Web UI: http://127.0.0.1:18789/                                     │
│  Web UI (with token): http://127.0.0.1:18789/?token=your-token...    │
│  Gateway WS: ws://127.0.0.1:18789                                    │
├──────────────────────────────────────────────────────────────────────╯

└  Onboarding complete.
```

#### 步骤 6：首次对话与配对验证

去 Telegram 给你的 Bot 发消息，你会收到配对码：

```
Clawdbot: access not configured.

Your Telegram user id: 1234567890

Pairing code: ABC12345

Ask the bot owner to approve with:
clawdbot pairing approve telegram <code>
```

### 🔧 关键环境变量

| 变量 | 说明 |
|------|------|
| `ANTHROPIC_API_KEY` | Anthropic Claude API 密钥 |
| `OPENAI_API_KEY` | OpenAI API 密钥 |
| `CLAWDBOT_GATEWAY_TOKEN` | Gateway 认证令牌 |
| `CLAWDBOT_CONFIG_DIR` | 配置目录（默认：`~/.clawdbot`） |
| `CLAWDBOT_WORKSPACE_DIR` | 工作区目录（默认：`~/clawd`） |
| `CLAWDBOT_GATEWAY_PORT` | Gateway 端口（默认：`18789`） |
| `CLAWDBOT_GATEWAY_BIND` | 绑定地址（`loopback/lan/tailnet`） |

### 🐳 Docker Compose 部署（高级）

#### 快速启动

```bash
./docker-setup.sh
```

#### docker-compose.yml 配置

```yaml
services:
  openClaw-gateway:
    image: ${CLAWDBOT_IMAGE:-openClaw:local}
    environment:
      HOME: /home/node
      CLAWDBOT_GATEWAY_TOKEN: ${CLAWDBOT_GATEWAY_TOKEN}
      ANTHROPIC_API_KEY: ${ANTHROPIC_API_KEY}
    volumes:
      - ${CLAWDBOT_CONFIG_DIR}:/home/node/.clawdbot
      - ${CLAWDBOT_WORKSPACE_DIR}:/home/node/clawd
    ports:
      - "${CLAWDBOT_GATEWAY_PORT:-18789}:18789"
      - "${CLAWDBOT_BRIDGE_PORT:-18790}:18790"
    init: true
    restart: unless-stopped
    command:
      - "node"
      - "dist/index.js"
      - "gateway"
      - "--bind"
      - "${CLAWDBOT_GATEWAY_BIND:-lan}"
```

#### 智能体沙箱配置

```json
{
  "agents": {
    "defaults": {
      "sandbox": {
        "docker": {
          "image": "openClaw-sandbox:bookworm-slim",
          "workdir": "/workspace",
          "readOnlyRoot": true,
          "network": "none",
          "memory": "1g",
          "cpus": 1,
          "pidsLimit": 256
        }
      }
    }
  }
}
```

#### 沙箱模式说明

| 模式 | 说明 |
|------|------|
| `"none"` | 无沙箱（工具在主机运行） |
| `"non-main"` | 仅非主会话沙箱化 |
| `"all"` | 所有会话沙箱化 |

#### 安全容器运行示例

```bash
docker run \
  --name openClaw-secure \
  --read-only \
  --tmpfs /tmp:rw,noexec,nosuid,size=64M \
  --security-opt=no-new-privileges \
  --cap-drop=ALL \
  --cap-add=NET_BIND_SERVICE \
  --cpus="1.0" \
  --memory="2g" \
  -u 1000:1000 \
  openClaw/agent:latest
```

---

## 核心功能详解

### 💾 长期记忆系统

记忆是 OpenClaw 最核心的差异化能力。

```
普通聊天机器人：用完就忘
     ↓
vs
     ↓
OpenClaw：记住你的一切
```

#### 混合检索机制

当你问"我上周说的那个投资想法"时，OpenClaw 会：

1. **向量检索**（70% 权重）：找到语义相近的内容
2. **BM25 全文检索**（30% 权重）：找到关键词匹配的内容
3. **融合排序**：返回最相关的记忆

### 🛠️ 技能系统（Skills）与 ClawdHub

#### Skills 的作用

就像手机的 App Store，通过"技能"来扩展 AI 的能力：

- 一个 Markdown 文件（`SKILL.md`）+ 可选的脚本
- 定义特定场景下 AI 应该如何行动
- 可以调用外部工具和 API

#### 安装技能

```bash
# 从 ClawdHub 安装
clawdhub install weather-forecast

# 或手动创建
mkdir -p ~/.clawdbot/skills/my-skill
cat > ~/.clawdbot/skills/my-skill/SKILL.md << 'EOF'
---
name: my-skill
description: 我的自定义技能
triggers:
  - "帮我做XXX"
---

当用户请求 XXX 时，按以下步骤执行：
1. ...
2. ...
EOF
```

### ⏰ 主动提醒能力（Cron 任务）

这是普通聊天机器人做不到的——OpenClaw 可以**主动找你**。

#### 设置提醒示例

```
你：每天早上 8 点提醒我看晨报
OpenClaw：好的，已设置每日 8:00 的提醒

→ 第二天早上 8:00，OpenClaw 发消息：
  "早上好！该看晨报了。"
```

#### Cron 命令示例

**一次性提醒**：

```bash
openClaw cron add \
  --name "发送提醒" \
  --at "2026-01-12T18:00:00Z" \
  --session main \
  --system-event "提醒：提交费用报告。" \
  --wake now \
  --delete-after-run
```

**周期性任务**：

```bash
openClaw cron add \
  --name "早间状态" \
  --cron "0 7 * * *" \
  --tz "Asia/Shanghai" \
  --session isolated \
  --message "总结今天的收件箱和日历。" \
  --deliver \
  --channel whatsapp \
  --to "+8613800138000"
```

#### 高级配置示例

```json
// ~/.clawdbot/clawdbot.json
{
  "cron": {
    "tasks": [
      {
        "name": "morning-brief",
        "schedule": "0 8 * * *",
        "action": "send_message",
        "prompt": "生成今日简报，包括天气、日程、未读消息摘要"
      }
    ]
  }
}
```

### 🎤 语音支持（ElevenLabs）

OpenClaw 可以和你语音对话，就像真正的助手一样。

#### 语音模式流程

```
你说话 → 语音转文字 → AI 处理 → 文字转语音 → 播放回复
```

#### 配置方式

```json
// ~/.clawdbot/clawdbot.json
{
  "nodes": {
    "talk": {
      "voiceId": "XB0fDUnXU5LcNxj5cHcI",  // ElevenLabs 语音 ID
      "modelId": "eleven_v3",
      "apiKey": "your-elevenlabs-api-key"
    }
  }
}
```

#### 支持场景

- macOS App（原生支持）
- iOS/Android App（通过节点）
- 需要 ElevenLabs API Key

### 🌐 浏览器控制

OpenClaw 可以帮你操作浏览器，执行复杂的网页任务。

#### 示例

```
输入：帮我在京东搜索"机械键盘"，找一个 500 元以下评价最好的

OpenClaw：
1. 打开京东
2. 搜索"机械键盘"
3. 筛选价格 < 500
4. 按评价排序
5. 返回前 3 个结果的截图和链接
```

#### 技术实现

- 使用 Chrome DevTools Protocol (CDP)
- 支持截图、点击、输入、滚动等操作
- 可以处理登录态（需要手动授权一次）

### 💓 Heartbeat 心跳机制

Heartbeat 实现定时任务的自动行为——OpenClaw 可在无用户提示时主动联系用户。

#### 配置示例

```json
{
  "agent": {
    "heartbeat": {
      "every": "30m",
      "activeHours": {
        "start": "08:00",
        "end": "22:00"
      }
    }
  }
}
```

#### 工作原理

在 `~/clawd/HEARTBEAT.md` 创建检查清单：

```markdown
# 心跳检查清单

- 检查邮件中的紧急消息
- 查看未来 2 小时的日历事件
- 如果空闲超过 8 小时，发送简短问候
```

---

## 免费大模型配置

### 🎯 GLM-4.7-Flash 免费模型

智谱 AI 提供 Flash 系列免费模型，非常适合个人使用。

#### 注册步骤

1. 访问 [智谱 AI 开放平台](https://www.bigmodel.cn/glm-coding)
2. 注册账号
3. 创建 API Key

#### 配置到 OpenClaw

```json
{
  "agent": {
    "model": "zai/GLM-4.7-flash"
  }
}
```

### 🌟 多 LLM 提供商支持

#### Anthropic Claude

```json
{
  "agent": {
    "model": "anthropic/claude-opus-4-5"
  }
}
```

#### GLM zai

```json
{
  "agent": {
    "model": "zai/GLM-4.7"
  }
}
```

#### Ollama 本地模型

```json
{
  "models": {
    "providers": {
      "ollama": {
        "baseUrl": "http://127.0.0.1:11434/v1"
      }
    }
  }
}
```

#### LM Studio 本地

```json
{
  "models": {
    "providers": {
      "lmstudio": {
        "baseUrl": "http://localhost:1234/v1",
        "apiKey": "LMSTUDIO_KEY",
        "api": "openai-completions",
        "models": [{
          "id": "minimax-m2.1-gs32",
          "name": "MiniMax M2.1",
          "contextWindow": 200000
        }]
      }
    }
  }
}
```

**注意**：模型选择使用 `provider/model` 格式（如 `zai/GLM-4.7`），并支持模型故障转移。

---

## ClawHub 技能市场

### 🌐 ClawHub 介绍

ClawHub 是 OpenClaw 的官方开源技能商店与插件市场，可以用来：

- 发布技能
- 搜索技能
- 安装技能

无缝衔接 OpenClaw。

### 🔍 访问 ClawHub

网站：[https://clawdhub.com](https://clawdhub.com)

---

## 最佳实践与技巧

### ✅ 使用建议

1. **从小任务开始**：先用简单任务熟悉系统
2. **定期备份记忆**：定期备份 `~/clawd/memory/` 目录
3. **安全第一**：了解安全文档 [docs.clawd.bot/security](https://docs.clawd.bot/security)
4. **使用沙箱**：生产环境建议使用 Docker 沙箱隔离
5. **监控日志**：定期检查 `~/.clawdbot/logs/` 日志文件

### 🚀 性能优化

- 使用本地模型（Ollama/LM Studio）提升响应速度
- 合理设置记忆索引大小
- 限制沙箱容器资源使用

### 🔒 安全建议

- 仅启用必要的 Skills
- 使用沙箱模式隔离 Agent
- 定期审查执行命令
- 限制 Gateway 访问范围（默认 loopback）

---

## 常见问题解答

### ❓ 安装相关

**Q: Windows 上可以使用吗？**
A: 可以，建议使用 WSL2 或 PowerShell 一键安装脚本。

**Q: 需要多强的硬件配置？**
A: 最低要求：2GB RAM、双核 CPU。浏览器自动化建议 4GB+ RAM。

### ❓ 配置相关

**Q: 如何更换 AI 模型？**
A: 修改配置文件中的 `model` 字段，格式为 `provider/model`。

**Q: 支持微信吗？**
A: 暂不支持（微信未开放 API），未来可能支持飞书或钉钉。

### ❓ 使用相关

**Q: 如何让 OpenClaw 主动提醒我？**
A: 使用 Cron 任务或 Heartbeat 机制配置定时提醒。

**Q: 如何备份我的记忆？**
A: 定期备份 `~/clawd/memory/` 和 `~/clawd/MEMORY.md` 文件。

---

## 附录与资源

### 📅 项目时间线

| 时间节点 | 里程碑事件 |
|----------|-----------|
| 2024 年 4 月 | 开始构思"生活助手"项目 |
| 2024 年 11 月 | 在 Twitter 发布"We are so back 🚀" |
| 2025 年末 | 作为业余项目开发 Clawdbot |
| 2026 年 1 月 26 日 | 正式发布 Clawdbot |
| 2026 年 1 月 26 日 | 首日获得 9,000 GitHub stars |
| 2026 年 1 月 27 日 | 收到 Anthropic 商标通知，宣布更名 |
| 2026 年 1 月 28 日 | 发布 Moltbot 更名公告 |
| 2026 年 1 月 30 日 | 正式发布 OpenClaw 更名公告 |
| 2026 年 2 月 | 突破 190,000+ GitHub stars |

### 📚 相关文章

- [一文读懂：openClaw 分析与教程](https://zhuanlan.zhihu.com/p/2000850539936765122)
- [一文揭秘 OpenClaw 的底层技术与核心功能](https://zhuanlan.zhihu.com/p/2004307328464359855)
- [读懂 AI Agent：基于大模型的智能体](https://zhuanlan.zhihu.com/p/657937696)

### 🔗 技术栈

| 技术 | 用途 |
|------|------|
| Node.js | Gateway 运行时 |
| WebSocket | 通信协议 |
| Markdown | 配置和记忆文件 |
| Docker | 沙箱隔离 |
| Chrome DevTools Protocol | 浏览器控制 |

---

## 总结

OpenClaw 代表了个人 AI 助手领域的重要突破：

### 🌟 核心优势

1. **本地优先、自托管**：数据完全可控，支持隐私保护
2. **记忆 + 主动性 + 执行力**：三合一的完整 AI 助手
3. **简单易用**：一条命令即可启动，无需复杂配置
4. **高度可扩展**：通过 Skills 系统支持各种场景
5. **开源免费**：完全开源，社区驱动

### ⚠️ 注意事项

- 配置疏忽可能带来安全风险
- 默认设置需要谨慎使用
- 社区生态仍在发展中
- 中文生态支持有待加强

### 🎯 展望

如果把 OpenClaw 看作是一只脱壳中的龙虾——它的新壳既漂亮也脆弱——但它在飞速成长，每一个 AI 开发者都不应该错过它。

---

## 💡 关键心得

> **OpenClaw 的核心不是聊天，而是执行。**
>
> **最好的 AI 助手是能够让你忘记任务存在的助手。**
>
> **记忆是智能体最核心的差异化能力。**
>
> **简单的系统提示词（约 1000 tokens）证明了前沿模型无需冗长指令即可理解上下文。**

---

## ✅ 学习检查清单

- [ ] 理解 OpenClaw 的核心功能和价值
- [ ] 掌握系统架构五大组件的作用
- [ ] 能够完成基本安装和配置
- [ ] 理解 Agent Loop 工作原理
- [ ] 掌握 Skills 系统的使用方法
- [ ] 能够配置和使用 Cron 定时任务
- [ ] 了解 Memory 系统的工作机制
- [ ] 能够配置免费的 GLM 模型
- [ ] 掌握基本的安全配置
- [ ] 能够使用 ClawHub 安装技能

---

**最后更新时间**: 2026-02-17
**文档版本**: v1.0
openClaw（原名Clawdbot、Moltbot，改了好几次）在短短 3周内突破 190,000+ stars，成为 GitHub 历史上增长最快的开源项目之一（langchain、dify也就120k左右stars）。

这款由 [PSPDFKit](https://zhida.zhihu.com/search?content_id=269802431&content_type=Article&match_order=1&q=PSPDFKit&zhida_source=entity) 创始人 Peter Steinberger （亿万富翁）通过AI编程打造的本地、自托管 AI 个人智能助手，通过将消息平台与 [LLM](https://zhida.zhihu.com/search?content_id=269802431&content_type=Article&match_order=1&q=LLM&zhida_source=entity) 、智能体深度整合，有界面，有第三方集成能力，实现了从电脑操作，日程提醒，会议摘要生成到网页操作等的全场景自动化。

我们今天就来拆解这个项目。

> **如果你只想看安装部署教程，就直接点目录：openClaw部署与配置指南；**  
> **如果想免费的大模型就点链接：**[glm大模型平台，flash系列模型免费](https://link.zhihu.com/?target=https%3A//www.bigmodel.cn/glm-coding%3Fic%3D4RMWPOBCBC)

![](https://pic4.zhimg.com/v2-0b8a524eb899be7c400ee97b48344511_1440w.jpg)

开源地址：[openclaw的github.](https://link.zhihu.com/?target=https%3A//github.com/openclaw/openclaw)

使用文档：[openclaw官方文档](https://link.zhihu.com/?target=https%3A//docs.openclaw.ai/concepts/models)

如果还不知道什么是 Agent 智能体，[就点这个链接](https://zhuanlan.zhihu.com/p/657937696?share_code=FasYhBZHdaeK&utm_psn=2004509424669184775)

![](https://pic1.zhimg.com/v2-e1dc03f2657b5fd45ec797167685e86c_1440w.jpg)

官方宣传主要是在mac上，但WINDOWS也可以。

## openClaw 是何方神圣？

openClaw 的走红，并不是一次偶然的“刷屏”，而是多股技术与期望情绪叠加后的结果。

在 2024–2025 年，开发者社区其实已经对「只会聊天的 AI」产生了明显疲劳。ChatGPT、Claude、deepseek 很聪明，但它们停留在web端页面里：不能真正替你完成电脑的实际任务，只能输出文字告诉你“应该怎么做”。与此同时，AutoGPT这类“自治智能体”项目又显得过于学术化、工程负担重、成功率不稳定。Manus和openmanus有有点不够用。

openClaw刚好卡位在中间那条断层上：

- 真简单：一条命令即可本地启动，不需要先搭一整套复杂的向量数据库和调度系统。
- 真能用：不是演示，而是能真的发消息、跑脚本、读写文件。
- 真惊喜：它第一次让大量普通用户意识到——“哇，原来 LLM 真的可以替我操作电脑”。

![](https://picx.zhimg.com/v2-b2112230cb7c87e5025b761e5b35d8bd_1440w.jpg)

真正点燃社区热情的，是大量“第一天就能复现”的体验分享，一键安装即可。吸引了一众技术和非技术用户：

“我让AI监控一个新闻网页，一有新 信息 就自动总结。”  
“我只是连上 whatsapp，它就变成了我的私人助理。”

“帮我设置一下提醒，xxxx”

![](https://pica.zhimg.com/v2-26298f9023725d63624728ffdf28852e_1440w.jpg)

**这种即时反馈 + 可控性，是 _openClaw_ 爆火的第一推动力。**

![](https://pica.zhimg.com/v2-8cddb6826d99bb886698b196d4a61ace_1440w.jpg)

对比其他的智能体：

![](https://pic2.zhimg.com/v2-b6ee76236721bade9ef0e8dedd3e3fef_1440w.jpg)

## **系统架构深度解析**

### **整体架构概览**

[ClawdBot](https://zhida.zhihu.com/search?content_id=269802431&content_type=Article&match_order=1&q=ClawdBot&zhida_source=entity) 的智能体架构设计相对完整，并验证了可行性：

- [Gateway](https://zhida.zhihu.com/search?content_id=269802431&content_type=Article&match_order=1&q=Gateway&zhida_source=entity) 统一多渠道接入
- Tools + [Skills](https://zhida.zhihu.com/search?content_id=269802431&content_type=Article&match_order=1&q=Skills&zhida_source=entity) 定义能力边界
- Memory 实现持久化记忆和自我进化
- 定时触发任务执行

![](https://pic3.zhimg.com/v2-fdee089bc15b534bce0a10f83e1acf88_1440w.jpg)

从架构上来看，你可以把 openClaw 想象成一间智能平台，有五个重要功能区：

- **Gateway**（大门）：管理会话、路由请求、做鉴权。它通常在本地运行，默认将控制面板绑定到 loopback（只允许本机访问），并支持通过 Tailscale 等私有网络扩展远程访问。
- **Agent**（大脑）：有专门的人设，负责理解上下文意图、制定分步计划、决定要调用哪些工具或技能。
- **Skills**（工具箱）：一组插件/技能（以 Markdown 与脚本描述），让 Agent 可以“开门、倒咖啡、发邮件、跑脚本”。
- **[Channels](https://zhida.zhihu.com/search?content_id=269802431&content_type=Article&match_order=1&q=Channels&zhida_source=entity)**（通道）：连接 各种app，如WhatsApp、Telegram、Discord、Slack、SMS 等，让 AI 与用户的日常通信无缝对接。
- **[Nodes](https://zhida.zhihu.com/search?content_id=269802431&content_type=Article&match_order=1&q=Nodes&zhida_source=entity)**（传感器/终端）：运行在用户端设备（手机、笔记本、Raspberry Pi，台式机）的小智能体，可以提供摄像头、地理位置或系统通知等本地能力。

![](https://picx.zhimg.com/v2-0719a8caa18a59afe901ff28322673c7_1440w.jpg)

  

|   |   |   |
|---|---|---|
|组件名称|功能定位|技术细节|
|Gateway (网关)|中央控制平面|运行在本地或 VPS 上的 Node.js 守护进程，负责会话管理、权限验证与路由 1。|
|Pi Agent (智能体)|推理大脑|负责处理自然语言、制定任务计划并选择合适的工具。支持 Claude、GPT-4 及 Ollama 本地模型 1。|
|Skills (技能)|执行能力集|模块化的插件系统，通过 SKILL.md 定义功能，支持文件操作、浏览器控制、API 调用等 1。|
|Channels (通道)|通信接口|连接用户现有的即时通讯软件（WhatsApp, Telegram, Discord, Slack 等） 1。|
|Nodes (节点)|设备端扩展|运行在 iOS/Android 或 macOS 上的轻量级智能体，允许 AI 访问相机、地理位置或发送系统通知 1。|

这样的分层设计方式让 openClaw 既能快速扩展社区技能skill和mcp等，也能够在不同设备间弹性部署和执行任务。

### **Gateway 组件：中央控制平面**

Gateway 是openclawd系统的核心枢纽——负责长期运行的守护进程，负责管理所有消息通道并作为 WebSocket 控制平面。ClawdBot 支持**多 Agent 创建和运行**。一个 Gateway 可以托管多个独立的 Agent。

Gateway 主要做三件事：

1. **接收消息**：从各个渠道收集用户指令
2. **路由分发**：决定这条消息应该交给哪个 Agent 处理
3. **回复投递**：把 Agent 的回复发送回对应的渠道

![](https://pic1.zhimg.com/v2-1d7c681804f939e555ae9ccb7fe749e2_1440w.jpg)

![](https://pic2.zhimg.com/v2-a64c32a8d0674339bfd4db09897c490f_1440w.jpg)

默认配置：

- WebSocket 端点：ws://127.0.0.1:18789
- Canvas 服务器：HTTP 端口 18793，路径 /__openClaw__/canvas/
- 每台主机建议运行单个 Gateway（独占 WhatsApp Web 会话）

![](https://pic4.zhimg.com/v2-56675132207aeaef59a2983ef7489d87_1440w.jpg)

WebSocket 协议详解

传输协议方式如下：

- 传输层：WebSocket 文本，JSON 格式
- 首帧必须为 connect
- 请求格式：{type:"req", id, method, params} → 响应：{type:"res", id, ok, payload|error}
- 事件格式：{type:"event", event, payload, seq?, stateVersion?}
- 支持事件类型：agent、chat、presence、health、heartbeat、cron、tick、shutdown

![](https://picx.zhimg.com/v2-3b84c298f3d10e1e17f1c7b04faa2995_1440w.jpg)

### Agent：推理引擎

Agent在接收到消息与任务后，动用自己的脑袋（LLM/大模型）、手脚（Tools）、专业知识（Skills），尽可能的完成任务，其中可能会访问Web、运行命令、读写文件、编写代码，甚至调用其他Nodes能力（比如摄像头）。

ClawdBot 的核心运行的核心是**Agent Loop。**

Agent Loop 的核心是一个 **“思考-行动”循环**：

```text
提问 → 思考 → 规划 → 行动 → 观察 → 思考 → 行动 → 等待 → 检查  → 纠错  ... → 完成
```

LLM 负责”思考”（决定做什么），Tools 负责”行动”（执行操作），执行结果作为”观察”反馈给 LLM，然后继续下一轮循环。

**这就是 Agent 和 Chatbot 的本质区别：Chatbot 只会说，Agent 会做。**

![](https://pica.zhimg.com/v2-da1770bfddc48355cfaddbf7ae6eea08_1440w.jpg)

### agent的四个核心阶段

**阶段 1：上下文组装（**Context Assembly**）**

Agent 需要告诉 LLM “你是谁、你能做什么、你有什么工具，用户说了什么”。这包括：

- **系统提示**：Agent 的身份、规则、工具列表
- **会话历史**：之前的对话记录或者记忆
- **Bootstrap 文件**：AGENTS.md、SOUL.md、TOOLS.md 等工作区文件

openClawd 会把这些文本内容拼接成一个完整的 Prompt，然后发送给 LLM。

**阶段 2：模型推理（**Model Inference**）**

LLM 收到 Prompt 后，思考决定下一步行动。它可能：

- 直接回复用户文字
- 生成调用一个工具（Tool Call）的代码
- 其他，如请求更多信息

**阶段 3：工具执行（**Tool Execution**）**

如果 LLM 决定调用工具，Agent 会：

1. 解析 Tool Call 参数
2. 执行对应的工具（exec、read、write、browser…）
3. 把执行结果（状态、内容)返回给 LLM

**阶段 4：回复分发（**Reply Dispatch**）**

当 LLM 生成最终回复后，Agent 会：

1. 格式化回复内容，变成用户语言
2. 通过 Gateway 发送回对应的消息渠道
3. 支持流式输出（边生成边发送）

  

Clawdbot支持多Agent模式，可以互不干扰，也可以相互协作。每个Agent有自己的工作区，放置专属配置与记忆，甚至自己的技能。

其内核Pi Agent 是一个精简高效的编程智能体，核心特点包括：

- Agent Loop（智能体循环）：处理用户消息、执行工具调用、将结果反馈给 LLM，循环直到模型生成无工具调用的响应
- 事件驱动架构：循环过程发射生命周期事件，支持响应式 UI
- 消息队列：支持两种模式（逐条处理或批量处理）
- 工具流式传输：支持块流式传输和增量流式传输，实现实时输出

核心工具仅用如下 4 个，即可实现有效智能体：

1. bash - 执行 shell 命令
2. read - 读取文件内容
3. write - 写入文件内容
4. edit - 编辑文本文件

系统提示词也极为精简，仅约 1000 tokens（包含工具定义），大模型可以理解编程智能体上下文。

### 多 LLM 提供商支持

openClaw 内置 pi-ai 目录，支持多种提供商：

```text
// Anthropic Claude
{
  "agent": { "model": "anthropic/claude-opus-4-5" }
}

// GLM zai
{
  "agent": { "model": "zai/GLM-4.7" }
}

// Ollama 本地模型
{
  "models": {
    "providers": {
      "ollama": { "baseUrl": "http://127.0.0.1:11434/v1" }
    }
  }
}

// LM Studio 本地
{
  "models": {
    "providers": {
      "lmstudio": {
        "baseUrl": "http://localhost:1234/v1",
        "apiKey": "LMSTUDIO_KEY",
        "api": "openai-completions",
        "models": [{
          "id": "minimax-m2.1-gs32",
          "name": "MiniMax M2.1",
          "contextWindow": 200000
        }]
      }
    }
  }
}
```

模型选择使用 provider/model 格式（如 zai/GLM系列），并支持模型故障转移。

### **Skills 系统：能力扩展机制**

Skills 是 智能体执行任务或者使用工具的指引，openClaw 的核心扩展机制，遵循 AgentSkills 规范——这是 Anthropic 开发的开放标准，已被 Claude Code、Cursor、VS Code、OpenAI Codex、Gemini CLI、GitHub Copilot 等广泛采用。

SKILL.md 格式规范：

```text
---
name: nano-banana-pro
description: 通过 Gemini 3 Pro 生成或编辑图像
homepage: https://example.com
user-invocable: true
disable-model-invocation: false
command-dispatch: tool
command-tool: image-gen
command-arg-mode: raw
metadata: {"openClawt":{"requires":{"bins":["uv"],"env":["GEMINI_API_KEY"],"config":["browser.enabled"]},"primaryEnv":"GEMINI_API_KEY"}}
---
```

Skills元数据字段详解（metadata.openClaw 下）：

|   |   |
|---|---|
|字段|说明|
|always: true|始终加载（跳过条件检查）|
|emoji|可选表情符号（macOS Skills UI 显示）|
|homepage|网站链接|
|os|支持平台：["darwin", "linux", "win32"]|
|requires.bins|必需的 PATH 二进制文件列表|
|requires.env|必需的环境变量|
|requires.config|必需的配置路径|
|primaryEnv|主要环境变量（对应 skills.entries.<name>.apiKey）|
|install|安装器规范（brew/node/go/uv/download）|

Skill 加载优先级（从高到低）：

1.工作区 skills：<workspace>/skills
2.托管/本地 skills：~/.clawdbot/skills
3.内置 skills：随安装包分发

内置 Skills（49+ 个）涵盖：

- Apple 生态：Notes、Reminders、Things 3、Bear Notes
- Google Workspace：Gmail、Calendar、Drive、Docs、Sheets（通过 gog CLI）
- 通信工具：Slack、iMessage、Twitter/X、Discord
- 智能家居：Philips Hue、Sonos、Eight Sleep
- 开发工具：GitHub CLI、Claude Code 子进程、Whisper 转录

### **Channels 系统：多平台消息集成**

Channels 负责连接各消息平台到中央 Gateway。根据配置与不同的渠道（比如飞书）建立安全链接，完成消息收发（通常是WebSocket 协议）以及格式转换 — 即翻译成 Clawdbot 能听懂的格式。

|   |   |   |
|---|---|---|
|Channel|协议/库|特性|
|WhatsApp|Baileys（WhatsApp Web 协议）|QR 登录、媒体支持、群组提及网关|
|Telegram|grammY（Bot API）|流式传输、Webhook 支持|
|Discord|discord.js|原生命令、DM 策略|
|Slack|Bolt|DM 配对策略、频道白名单|
|Signal|signal-cli|需本地安装 signal-cli|
|iMessage|imsg CLI|仅 macOS|
|Google Chat|Chat API|扩展渠道|
|Matrix、Teams|扩展插件|社区支持|

WhatsApp 配置示例：

```text
{
  "channels": {
    "whatsapp": {
      "allowFrom": ["+15555550123"],
      "groups": { "*": { "requireMention": true } }
    }
  },
  "messages": { 
    "groupChat": { "mentionPatterns": ["@clawd"] } 
  }
}
```

由于微信没有开放API，现在还没有微信的支持。未来可能会有飞书或者钉钉的支持。

### Nodes 系统：移动/桌面扩展

Nodes 就是在主机之外的其他“能力”节点，连接到 Gateway 的子设备（iOS、Android、macOS），提供设备本地功能：

旧手机、闲置电脑都可以作为 Node 加入网络，以提供更多的能力，比如摄像头、屏幕录制、系统控制、屏幕共享、显示可交互式的UI界面等。Nodes 需要在远程设备上运行相应的Node 客户端 App。

Node 支持的类型：

|   |   |
|---|---|
|平台|功能|
|iOS Node|Canvas、语音唤醒、摄像头拍照/录像、屏幕录制、语音触发|
|Android Node|Canvas、语音交互、摄像头、屏幕截图、短信集成（可选）|
|macOS Node|system.run（执行命令）、system.notify（通知）、Canvas/摄像头|

Node 通信协议：

- 传输：Gateway WebSocket（LAN/Tailscale/SSH 隧道）
- 发现：node.list / node.describe 枚举能力
- 执行：node.invoke 运行设备本地操作
- 命令：camera.snap/camera.clip（拍照/录像）、screen.record、location.get、notifications

这实现了"远程大脑，本地双手"的架构——Gateway 可运行在远程 Linux 实例，而 Nodes 通过 Tailscale 连接，执行操作运行在设备本地。

**场景**：Gateway 跑在 Linux 服务器上，但你想用 Mac 的摄像头拍照。

```text
// 列出已连接的节点
{ "tool": "nodes", "action": "status" }

// 在 Mac 节点上执行命令
{ "tool": "nodes", "action": "run", "node": "office-mac", "command": ["echo", "Hello"] }

// 拍照
{ "tool": "nodes", "action": "camera_snap", "node": "iphone-1" }

// 屏幕录制
{ "tool": "nodes", "action": "screen_record", "node": "office-mac", "duration": "10s" }

// 获取位置
{ "tool": "nodes", "action": "location_get", "node": "iphone-1" }
```

### Memory 系统：持久化记忆

openClaw 的记忆系统非常简单明了，直接基于纯 Markdown 文件——文件是真实来源，模型只"记住"写入磁盘的内容。

记忆文件结构：

```text
~/clawd/
├── AGENTS.md          # 智能体的描述和提示词
├── BOOTSTRAP.md       # 初始系统设置
├── HEARTBEAT.md       # 系统健康检查清单
├── IDENTITY.md        # openClaw智能体 身份/人设
├── SOUL.md            # 性格特征
├── TOOLS.md           # 可用工具参考
├── USER.md            # 用户偏好/上下文
├── MEMORY.md          # 长期策划记忆（可选）
├── canvas/            # 可视化工作区
├── memory/            # 持久化记忆目录
│   ├── 2026-01-28.md  # 每日笔记
│   └── 2026-01-29.md
└── skills/            # 已安装 skills
```

向量记忆搜索：

- 默认启用
- 索引文件：MEMORY.md + memory/**/*.md
- 分块策略：约 400 token 目标，80 token 重叠
- 存储：sqlite-vec 加速向量搜索
- 嵌入提供商（自动选择顺序）：local → openai → gemini

混合搜索（BM25 + 向量结合）配置：

```text
{
  "agents": {
    "defaults": {
      "memorySearch": {
        "query": {
          "hybrid": {
            "enabled": true,
            "vectorWeight": 0.7,
            "textWeight": 0.3,
            "candidateMultiplier": 4
          }
        }
      }
    }
  }
}
```

自动记忆刷新机制：当会话接近自动压缩时，触发静默智能体回合，提示模型将持久记忆写入磁盘。

## 工作流与实现细节

### 消息处理完整流程

```text
用户消息 (WhatsApp/Telegram/Discord/等)
        ↓
    Channel Adapter（标准化为内部格式）
        ↓
    Gateway (WebSocket API - ws://127.0.0.1:18789)
        ↓
    Agent Runtime (Pi agent via RPC)
        ↓
    LLM Provider (Claude/GPT/本地模型)
        ↓
    Tool Execution（按需执行）
        ↓
    Response → Gateway → Channel Adapter → 用户
```

以“自动整理会议纪要并发 WhatsApp 提醒”为例：

1. 感知：Slack 的 webhook 或文件上传触发消息到 Gateway。
2. 计划：Agent 从短期对话与长期记忆（本地的 MEMORY.md 等持久文件）中抓取上下文，生成一个 multi-step plan。
3. 执行：按计划调用 Skill（可能在 Docker 沙箱中执行浏览器脚本或 shell 命令）。
4. 反哺：结果写回本地记忆并发送给用户，同时将关键操作记录供将来检索。

这套闭环让 openClaw看起来像一个“会思考的执行器”，而不是只会说话的聊天机器人。

### Heartbeat 心跳机制

Heartbeat 实现定时任务的自动行为——openClaw 可在无用户提示时主动联系用户。

配置示例：

```text
{
  "agent": {
    "heartbeat": {
      "every": "30m",
      "activeHours": { "start": "08:00", "end": "22:00" }
    }
  }
}
```

工作原理： 在 ~/clawd/HEARTBEAT.md 创建检查清单：

心跳检查清单

- 检查邮件中的紧急消息
- 查看未来 2 小时的日历事件
- 如果空闲超过 8 小时，发送简短问候

### Cron 定时任务（插件）

一次性提醒：

```text
openClaw cron add \
  --name "发送提醒" \
  --at "2026-01-12T18:00:00Z" \
  --session main \
  --system-event "提醒：提交费用报告。" \
  --wake now \
  --delete-after-run
```

周期性任务：

```text
openClaw cron add \
  --name "早间状态" \
  --cron "0 7 * * *" \
  --tz "Asia/Shanghai" \
  --session isolated \
  --message "总结今天的收件箱和日历。" \
  --deliver \
  --channel whatsapp \
  --to "+8613800138000"
```

### Docker 沙箱隔离

沙箱配置：

```text
{
  "agents": {
    "defaults": {
      "sandbox": {
        "mode": "non-main",
        "scope": "agent",
        "workspaceAccess": "none"
      }
    }
  }
}
```

  

沙箱模式：

- "none"：无沙箱（工具在主机运行）
- "non-main"：仅非主会话沙箱化
- "all"：所有会话沙箱化

隔离范围：

- "agent"（默认）：每智能体一个容器
- "session"：更严格的每会话隔离
- "shared"：单容器共享（安全性较低）

工作区访问级别：

- "none"（默认）：智能体工作区不可访问
- "ro"：智能体工作区只读挂载到 /agent
- "rw"：智能体工作区读写挂载到 /workspace

安全容器运行示例：

```text
docker run \
  --name openClaw-secure \
  --read-only \
  --tmpfs /tmp:rw,noexec,nosuid,size=64M \
  --security-opt=no-new-privileges \
  --cap-drop=ALL \
  --cap-add=NET_BIND_SERVICE \
  --cpus="1.0" \
  --memory="2g" \
  -u 1000:1000 \
  openClaw/agent:latest
```

  

---

## openClaw**部署与配置指南**

![](https://pic4.zhimg.com/v2-00b9f2832e3d41adbe6d379f580ce6af_1440w.jpg)

### 系统要求

|   |   |
|---|---|
|组件|要求|
|Node.js——需要提前安装|版本 22+|
|RAM|最低 2GB（浏览器自动化建议 4GB+）|
|CPU|最低双核|
|存储|Docker 部署 20GB|
|操作系统|macOS、Linux、Windows（WSL2）、树莓派也可以|
|网络|API 访问需互联网|
|端口（默认）|18789（Gateway）、18790（Bridge）|

  

### 一键快速安装

macOS/Linux：

```text
curl -fsSL https://openClaw.bot/install.sh | bash
```

Windows (PowerShell)：

```text
iwr -useb https://molt.bot/install.ps1 | iex
```

npm 安装：

```text
npm install -g openClaw@latest
# 或
pnpm add -g openClawt@latest
```

从源码构建：

```text
git clone https://github.com/openClaw/openClaw.git
cd openClaw
pnpm install
pnpm ui:build
pnpm build
openClaw onboard --install-daemon
```

### 引导向导

运行 openClaw onboard --install-daemon 配置：

- 本地 vs 远程 Gateway 选择
- 认证：OAuth（OpenAI Code/Codex）、API 密钥或 claude setup-token
- Channel：WhatsApp QR 登录、Telegram/Discord bot tokens
- 守护进程：后台安装（launchd/systemd）
- Gateway token：自动生成并存储
- 工作区引导 + skills 配置

### 配置启动

4.3 初始配置（Onboarding 向导详解）

运行以下命令启动配置向导：

```bash
clawdbot onboard
```

向导会显示一个有趣的 ASCII 龙虾 Logo：

```text
░████░█░░░░░█████░█░░░█░███░░████░░████░░▀█▀
█░░░░░█░░░░░█░░░█░█░█░█░█░░█░█░░░█░█░░░█░░█░
█░░░░░█░░░░░█████░█░█░█░█░░█░████░░█░░░█░░█░
█░░░░░█░░░░░█░░░█░█░█░█░█░░█░█░░█░░█░░░█░░█░
░████░█████░█░░░█░░█░█░░███░░████░░░███░░░█░
              🦞 FRESH DAILY 🦞
```

步骤 1：安全确认

```text
◇  Security ───────────────────────────────────────────────────────╮
│  Clawdbot agents can run commands, read/write files, and act     │
│  through any tools you enable.                                   │
│  Please read: https://docs.clawd.bot/security                    │
├──────────────────────────────────────────────────────────────────╯

◇  I understand this is powerful and inherently risky. Continue?
│  Yes
```

步骤 2：选择 AI 后端和认证方式

```text
◇  Model/auth provider
│  Anthropic

◆  Anthropic auth method
│  ● Anthropic token (paste setup-token) ← 推荐 Claude Max 用户
│  ○ Anthropic token (Claude Code CLI)
│  ○ Anthropic API key
◆ token
│  XXXX-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx...
```

然后输入key即可

步骤 3：配置消息平台（以 Telegram 为例）

```text
◇  Channel status ────────────────────────────╮
│  Telegram: not configured                   │
│  WhatsApp: not configured                   │
│  Discord: not configured                    │
│  ...共支持 12+ 平台                          │
├─────────────────────────────────────────────╯

◇  Select channel (QuickStart)
│  Telegram (Bot API)
```

配置对应app的 Token请执行检索或者问AI

步骤 4：安装配置 Gateway 服务

```text
◇  Gateway service runtime ────────────────────────────────────────────╮
│  QuickStart uses Node for the Gateway service (stable + supported).  │
├──────────────────────────────────────────────────────────────────────╯

◒  Installing Gateway service…
Installed LaunchAgent: /Users/your-username/Library/LaunchAgents/com.clawdbot.gateway.plist
Logs: /Users/your-username/.clawdbot/logs/gateway.log
◇  Gateway service installed
```

  

步骤 5：完成配置

```text
◇
Telegram: ok (@YourBotName) (1416ms)  ← 你的 Bot 已连接
Agents: main (default)
Heartbeat interval: 1h (main)
Session store (main): /Users/your-username/.clawdbot/agents/main/sessions/sessions.json

◇  Control UI ─────────────────────────────────────────────────────────╮
│  Web UI: http://127.0.0.1:18789/                                     │
│  Web UI (with token): http://127.0.0.1:18789/?token=your-token...    │
│  Gateway WS: ws://127.0.0.1:18789                                    │
├──────────────────────────────────────────────────────────────────────╯

└  Onboarding complete.
```

Gateway 服务管理（重要）

![](https://pic1.zhimg.com/v2-d49303dd662aee970efe2199a999e8aa_1440w.jpg)

步骤 6： 首次对话与配对验证

去 Telegram 给你的 Bot 发消息，你会收到一个配对码：

```text
Clawdbot: access not configured.

Your Telegram user id: 1234567890

Pairing code: ABC12345

Ask the bot owner to approve with:
clawdbot pairing approve telegram <code>
```

### 关键环境变量

![](https://pica.zhimg.com/v2-3ff6b45144acfe465a9e33c24a6648b8_1440w.jpg)

|   |   |
|---|---|
|变量|说明|
|ANTHROPIC_API_KEY|Anthropic Claude API 密钥|
|OPENAI_API_KEY|OpenAI API 密钥|
|CLAWDBOT_GATEWAY_TOKEN|Gateway 认证令牌|
|CLAWDBOT_CONFIG_DIR|配置目录（默认：~/.clawdbot）|
|CLAWDBOT_WORKSPACE_DIR|工作区目录（默认：~/clawd）|
|CLAWDBOT_GATEWAY_PORT|Gateway 端口（默认：18789）|
|CLAWDBOT_GATEWAY_BIND|绑定地址（loopback/lan/tailnet）|

### Docker Compose 部署模式（新手可以略过）

快速启动：

```text
./docker-setup.sh
```

docker-compose.yml 配置：

```text
services:
  openClaw-gateway:
    image: ${CLAWDBOT_IMAGE:-openClaw:local}
    environment:
      HOME: /home/node
      CLAWDBOT_GATEWAY_TOKEN: ${CLAWDBOT_GATEWAY_TOKEN}
      ANTHROPIC_API_KEY: ${ANTHROPIC_API_KEY}
    volumes:
      - ${CLAWDBOT_CONFIG_DIR}:/home/node/.clawdbot
      - ${CLAWDBOT_WORKSPACE_DIR}:/home/node/clawd
    ports:
      - "${CLAWDBOT_GATEWAY_PORT:-18789}:18789"
      - "${CLAWDBOT_BRIDGE_PORT:-18790}:18790"
    init: true
    restart: unless-stopped
    command:
      - "node"
      - "dist/index.js"
      - "gateway"
      - "--bind"
      - "${CLAWDBOT_GATEWAY_BIND:-lan}"
```

智能体沙箱配置：

```text
{
  "agents": {
    "defaults": {
      "sandbox": {
        "docker": {
          "image": "openClaw-sandbox:bookworm-slim",
          "workdir": "/workspace",
          "readOnlyRoot": true,
          "network": "none",
          "memory": "1g",
          "cpus": 1,
          "pidsLimit": 256
        }
      }
    }
  }
}
```

构建沙箱镜像：scripts/sandbox-setup.sh

---

## 核心功能详解

### 长期记忆系统

记忆是 Clawdbot 最核心的差异化能力。

普通聊天机器人：用完就忘 VS Clawdbot：记住你的一切

  
记忆架构：

混合检索：

当你问"我上周说的那个投资想法"时，Clawdbot 会：

1. 向量检索（70% 权重）：找到语义相近的内容
2. BM25 全文检索（30% 权重）：找到关键词匹配的内容
3. 融合排序：返回最相关的记忆

实际效果：

```text
你（3 个月前）：我打算学习 Rust，主要是想写高性能的系统工具


你（今天）：我之前想学什么编程语言来着？


Clawdbot：你 3 个月前提到想学习 Rust，主要目的是写高性能的系统工具。
```

### 技能系统（Skills）与 ClawdHub

Clawdbot 通过"技能"来扩展能力，就像手机的 App Store。

技能包括什么？

- 一个 Markdown 文件（[SKILL.md](https://link.zhihu.com/?target=http%3A//skill.md/)）+ 可选的脚本
- 定义了特定场景下 AI 应该如何行动
- 可以调用外部工具和 API

三层加载机制：

```text
优先级从高到低：


1. Workspace Skills   <当前目录>/.claude/skills/
   └── 项目级别，只在该项目生效


2. User Skills        ~/.clawdbot/skills/
   └── 用户级别，所有项目共享


3. Bundled Skills     内置技能
   └── Clawdbot 自带的基础技能
```

安装技能：

```text
# 从 ClawdHub 安装
clawdhub install weather-forecast


# 或手动创建
mkdir -p ~/.clawdbot/skills/my-skill
cat > ~/.clawdbot/skills/my-skill/SKILL.md << 'EOF'
---
name: my-skill
description: 我的自定义技能
triggers:
  - "帮我做XXX"
---


当用户请求 XXX 时，按以下步骤执行：
1. ...
2. ...
EOF
```

ClawdHub 社区的技能市场：[https://clawdhub.com](https://link.zhihu.com/?target=https%3A//clawdhub.com/)

### 主动提醒能力（Cron 任务）

这是普通聊天机器人做不到的——Clawdbot 可以主动找你。

  

设置提醒：

```text
你：每天早上 8 点提醒我看晨报
Clawdbot：好的，已设置每日 8:00 的提醒


→ 第二天早上 8:00，Clawdbot 发消息：
  "早上好！该看晨报了。"
```

**技术实现：**

Clawdbot 内置了 Cron 工具，支持：

- 一次性提醒
- 周期性提醒（每天/每周/每月）
- 条件触发（当某事发生时）

配置示例（高级用户）：

```text
// ~/.clawdbot/clawdbot.json
{
  "cron": {
    "tasks": [
      {
        "name": "morning-brief",
        "schedule": "0 8 * * *",
        "action": "send_message",
        "prompt": "生成今日简报，包括天气、日程、未读消息摘要"
      }
    ]
  }
}
```

### **语音支持（ElevenLabs）**

Clawdbot 可以和你语音对话，就像真正的助手一样。

  
语音模式：

```text
开启语音模式后：


你说话 → 语音转文字 → AI 处理 → 文字转语音 → 播放回复
```

  

配置方式：

  

```text
// ~/.clawdbot/clawdbot.json
{
  "nodes": {
    "talk": {
      "voiceId": "XB0fDUnXU5LcNxj5cHcI",  // ElevenLabs 语音 ID
      "modelId": "eleven_v3",
      "apiKey": "your-elevenlabs-api-key"
    }
  }
}
```

  

支持的场景：

- 苹果电脑macOS App（原生支持）
- 手机iOS/Android App（通过节点）
- 需要 ElevenLabs API Key

5.5 浏览器控制

openClawd可以帮你操作浏览器，执行复杂的网页任务。

示例：

```text
输入：帮我在京东搜索"机械键盘"，找一个 500 元以下评价最好的


openClawd：
1. 打开京东
2. 搜索"机械键盘"
3. 筛选价格 < 500
4. 按评价排序
5. 返回前 3 个结果的截图和链接
```

  

技术实现：

- 使用 Chrome DevTools Protocol (CDP)
- 支持截图、点击、输入、滚动等操作
- 可以处理登录态（需要手动授权一次）

## clawhub

ClawHub是OpenClaw的官方的开源skill技能商店与插件市场网站，可以用来发布、搜索、安装AI智能体的技能，无缝衔接openclaw。

![](https://pic4.zhimg.com/v2-c947bb87f6fc237f982b440ff68ee19d_1440w.jpg)

  

![](https://pic4.zhimg.com/v2-0f861bef0b07dbf9bf2f2ac28fc26fc7_1440w.jpg)

## 免费大模型

点击 glm注册链接：[智谱AI开放平台](https://link.zhihu.com/?target=https%3A//www.bigmodel.cn/glm-coding%3Fic%3D4RMWPOBCBC)

注册完以后创建api-key

配置到openclaw里 记得选flash类型的模型（这有这种是免费的），如glm-4.7-flash。

---

## 总结与展望

openClaw 代表了个人 AI 助手领域的重要突破：通过本地优先、自托管的架构，将 LLM 能力与真实世界的执行能力深度整合。

这个智能体和以往的大模型或者智能体最大的不一样就是：它在原来的智能体和大模型的能力上增加了定时任务的能力，设置了任务以后，特定的条件，它就会自动执行对应的任务，比如钉盘，舆情，收邮件等。

从技术架构角度，其分层设计（Gateway → Agent → Skills → Channels/Nodes）实现了清晰的逐层分离；

AgentSkills 开放标准确保了与 Claude Code、Cursor 等工具的生态兼容；

精简的系统提示词（约 1000 tokens）证明了前沿模型无需冗长指令即可理解智能体的上下文。

openClaw 是一次用开源实验回答未来个人计算问题的大胆尝试。它把“记忆”“主动性”“执行力”这三件事结合起来，展示了个人 AI 助手能如何真正融入工作流。但任何一项超能力都伴随着代价：配置的疏忽、默认设置的危险、以及社区生态的信任问题。

唯一的不足就是对中文生态支持还不算深入。任务的执行深度和交互性还是需要加强一点。

如果把 openClaw看作是一只脱壳中的龙虾——它的新壳既漂亮也脆弱——但他在飞速的成长，每一个AI开发者都不应该错过它。

[![](https://picx.zhimg.com/v2-19a7318f0b7895612435d5b96c17064e.jpg?source=7e7ef6e2&needBackground=1)一文读懂：openClaw 分析与教程（Moltbot、Clawdbot）— 2更415 赞同 · 41 评论](https://zhuanlan.zhihu.com/p/2000850539936765122?share_code=4ruTB0pTeMs2&utm_psn=2000889580946223420) 文章

  

[![](https://picx.zhimg.com/v2-dd8699e91a51d2a89938493932142382.jpg?source=7e7ef6e2&needBackground=1)一文揭秘 OpenClaw的底层技术与核心功能Moltbot/Clawdbot/6 赞同 · 1 评论](https://zhuanlan.zhihu.com/p/2004307328464359855?share_code=7f9bVfOOdKBU&utm_psn=2004430957718050674) 文章

[![](https://pica.zhimg.com/v2-a9d22b0b6709690d7ec683db8a16aad9.jpg?source=7e7ef6e2&needBackground=1)读懂AI Agent：基于大模型的智能体（类clawdbot的框架）935 赞同 · 34 评论](https://zhuanlan.zhihu.com/p/657937696?share_code=ZDpFfqM4oTh6&utm_psn=2000889767534019599) 文章

  

[全面解读：openClaw分析与教程（Moltbot、Clawdbot）blog.csdn.net/zyjwjck/article/details/157580337?sharetype=blog&shareId=157580337&sharerefer=APP&sharesource=zyjwjck&sharefrom=link](https://link.zhihu.com/?target=https%3A//blog.csdn.net/zyjwjck/article/details/157580337%3Fsharetype%3Dblog%26shareId%3D157580337%26sharerefer%3DAPP%26sharesource%3Dzyjwjck%26sharefrom%3Dlink)

## 附录：

从 Clawdbot 到 Moltbot到openClaw：项目时间线：

  

|   |   |
|---|---|
|时间节点|里程碑事件|
|2024 年 4 月|开始构思"生活助手"项目，但因认为大公司会开发此类产品而搁置|
|2024 年 11 月|在 Twitter 发布"We are so back 🚀"，宣告回归|
|2025 年末|作为业余项目开发 Clawdbot|
|2026 年 1 月 26 日|正式发布 Clawdbot|
|首日|获得 9,000 GitHub stars|
|数日内|突破 100,000+ stars|
|2026 年 1 月 27 日|收到 Anthropic 商标通知，同日宣布更名|
|2026 年 1 月 28 日|正发布 Moltbot 更名公告|
|2026 年 1 月 30 日|正式发布 openClaw 更名公告，并宣告商业化目标|

![](https://pic1.zhimg.com/v2-315aee804cceeb7e63d06307e2c586da_1440w.jpg)

  

---