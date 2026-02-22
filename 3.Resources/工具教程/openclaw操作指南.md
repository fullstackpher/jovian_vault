---
创建时间: 2026-02-17T07:01
更新时间: 2026-02-17T07:48
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

| 组件          | 要求                            |
| ----------- | ----------------------------- |
| **Node.js** | 版本 22+                        |
| **RAM**     | 最低 2GB（浏览器自动化建议 4GB+）         |
| **CPU**     | 最低双核                          |
| **存储**      | Docker 部署 20GB                |
| **操作系统**    | macOS、Linux、Windows（WSL2）、树莓派 |
| **网络**      | API 访问需互联网                    |
| **端口**      | 18789（Gateway）、18790（Bridge）  |

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
