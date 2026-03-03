---
tags:
  - skill
  - diagram
created: 2026-03-03
创建时间: 2026-03-03T12:43
更新时间: 2026-03-03T12:43
---

# Diagram-Generator 图表生成技能

> 通过自然语言生成各类图表

## 技能简介

支持生成 drawio、Mermaid、Excalidraw 三种格式的图表。

## 三种格式

| 格式 | 特点 | 适用场景 |
|------|------|----------|
| drawio | 复杂、专业 | 网络拓扑、架构图 |
| mermaid | 快速、代码友好 | 流程图、时序图 |
| excalidraw | 手绘风格 | 头脑风暴 |

## 支持的图表类型

1. 流程图
2. 时序图
3. 类图
4. ER图
5. 思维导图
6. 架构图
7. 网络拓扑（⚠️ 必须用 drawio）

## 使用方法

直接说：
- "画一个用户登录流程图"
- "创建网络拓扑图"
- "画一个系统架构图"

## 环境配置（重要！）

需要配置 MCP Server：

```json
{
  "mcpServers": {
    "mcp-diagram-generator": {
      "command": "npx",
      "args": ["-y", "mcp-diagram-generator"]
    }
  }
}
```

## 网络拓扑层级

```
Environment → Datacenter → Zone → Device
```

## 常用命令

- get_config() - 查看配置
- init_config() - 初始化
- generate_diagram() - 生成图表
