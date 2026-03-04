---
tags:
  - skill
  - feishu
  - bridge
created: 2026-03-03
创建时间: 2026-03-03T12:52
更新时间: 2026-03-03T12:52
---

# Feishu-Bridge 飞书桥接技能

> WebSocket 连接飞书机器人

## 技能简介

通过 WebSocket 将飞书机器人连接到 OpenClaw，无需公网服务器或 ngrok。

## 架构

```
飞书用户 → 飞书云 ←WS→ bridge.mjs (本地) ←WS→ OpenClaw Gateway → AI
```

## 功能

- 实时消息接收
- 自动回复
- 群聊支持
- 无需公网暴露

## 配置步骤

1. 在 open.feishu.cn 创建自建应用
2. 添加机器人能力
3. 开启权限：
   - im:message
   - im:message.group_at_msg
   - im:message.p2p_msg
4. 添加事件：im.message.receive_v1
5. 设置为 WebSocket 长连接
6. 发布应用，获取 App ID 和 Secret

## 管理命令

- 查看桥接状态
- 启动/停止桥接
- 查看日志

## 相关技能

- [[Feishu-Messaging]] - 飞书消息
- [[Feishu-Doc]] - 飞书文档
- [[Feishu-Bitable]] - 多维表格
