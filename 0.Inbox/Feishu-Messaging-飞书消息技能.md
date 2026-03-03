---
tags:
  - skill
  - feishu
  - messaging
created: 2026-03-03
创建时间: 2026-03-03T12:42
更新时间: 2026-03-03T12:42
---

# Feishu-Messaging 飞书消息技能

> 发送飞书消息、查找群成员、群ID

## 技能简介

Feishu-Messaging 是 OpenClaw 的飞书消息发送技能，让你可以通过 AI 直接发送飞书消息。

## 核心功能

| 功能 | 状态 | 所需权限 |
|------|------|----------|
| 发送文本消息 | ✅ 可用 | im:message:send_as_bot |
| 获取群聊列表 | ✅ 可用 | im:chat:readonly |
| 获取群成员 | ✅ 可用 | im:chat.members:read |

## 使用方法

### 发送消息给指定用户

直接说：
```
给 [姓名] 发一条飞书消息，告诉他 [内容]
```

示例：
- "给张三发一条飞书消息，告诉他会议改了"
- "告诉李四明天上午10点开会"

### 发送消息到群聊

```
在 [群名] 发一条消息 [内容]
```

## 配置要求

- FEISHU_APP_ID
- FEISHU_APP_SECRET

## 相关技能

- [[Feishu-Doc]] - 飞书文档操作
- [[Feishu-Bridge]] - 飞书桥接
- [[Feishu-Bitable]] - 飞书多维表格
