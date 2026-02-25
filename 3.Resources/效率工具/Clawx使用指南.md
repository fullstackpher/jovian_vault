---
创建时间: 2026-02-25T19:00
更新时间: 2026-02-25T20:51
tags:
  - 效率工具
  - 工具使用
---
Clawx是一个openclaw客户端，内置openclaw运行时，基于Eletron和React开发的

### 第一步：安装

- 安装参考[[ClawX（OpenClaw）安装文档.pdf]]

### 第二步：配置

#### 1. 配置模型

> [!danger]+ 安装指导配置选项要跳过模型配置

推荐使用国内稳定的中转平台 **LinoAPI**。它不仅支持支付宝/微信支付，还针对 OpenClaw/Claude 的数据传输做了专门优化。
首先，点击下方链接进入官网注册（新人注册通常会送 0.4元 体验金，足够跑通 ClawX 的测试流程了）：

👉 注册地址： https://linoapi.com/register?aff=28jK

进入后点击右上角的 “登录/注册” 即可。如果体验金用完了，可以在“钱包”里按需充值，丰俭由人。

![局部截取_20260225_195006.png](https://jovian-1257905003.cos.ap-shanghai.myqcloud.com/picture/%E5%B1%80%E9%83%A8%E6%88%AA%E5%8F%96_20260225_195006.png)


登录成功后，我们需要创建一个专门给 ClawX 用的“钥匙”：

1.点击主页中的 “控制台”。

2.点击左侧菜单栏的 【API 令牌】。

3.点击右上角的 【+ 添加令牌】。

在弹出的窗口中，请务必注意以下设置：

名称：随便填，比如 Claude Code。

分组：🔴 【非常重要】 为了确保模型权限正常，建议选择 “Claude Code专属” 和 “自动选择”（可同时添加）。

额度：可以设个上限（如 $50）或者默认“无限”。

设置好后，点击底部 【提交】。

![局部截取_20260225_194715.png](https://jovian-1257905003.cos.ap-shanghai.myqcloud.com/picture/%E5%B1%80%E9%83%A8%E6%88%AA%E5%8F%96_20260225_194715.png)

配置好令牌，直接复制这个秘钥，待会会用到

![配置模型1_无水印.png](https://jovian-1257905003.cos.ap-shanghai.myqcloud.com/picture/%E9%85%8D%E7%BD%AE%E6%A8%A1%E5%9E%8B1_%E6%97%A0%E6%B0%B4%E5%8D%B0.png)

在Clawx的设置页面，添加供应商
![配置模型2_无水印.png](https://jovian-1257905003.cos.ap-shanghai.myqcloud.com/picture/%E9%85%8D%E7%BD%AE%E6%A8%A1%E5%9E%8B2_%E6%97%A0%E6%B0%B4%E5%8D%B0.png)

这里选择”自定义“

**👉 请务必修改以下参数（这是连通的关键）：**

基础 URL：🔴 【非常重要】 官方默认是国外地址，这里必须改为 Lino API 的中转地址： https://linoapi.com/v1

API 密钥：粘贴你在上面中复制的 sk- 开头的密钥。

显示名称：为了方便区分，可以填入 **LinoAPI-Claude**。

模型ID：填写**claude-opus-4-6**

配置完成后，点击界面上的 **添加提供商** 按钮。


#### 2. 配置飞书

配置飞书要素：按照步骤来

- 第一步：创建自建应用，命名，描述
- 第二步：开启机器人能力，配置机器人名称
- 第三步：设置权限：
```json
```JSON
{
  "scopes": {
    "tenant": [
      "cardkit:card:write",
      "base:app:copy",
      "base:app:create",
      "base:app:read",
      "base:app:update",
      "base:collaborator:create",
      "base:collaborator:delete",
      "base:collaborator:read",
      "base:dashboard:copy",
      "base:dashboard:read",
      "base:field:create",
      "base:field:delete",
      "base:field:read",
      "base:field:update",
      "base:form:read",
      "base:form:update",
      "base:record:create",
      "base:record:delete",
      "base:record:read",
      "base:record:retrieve",
      "base:record:update",
      "base:role:create",
      "base:role:delete",
      "base:role:read",
      "base:role:update",
      "base:table:create",
      "base:table:delete",
      "base:table:read",
      "base:table:update",
      "base:view:read",
      "base:view:write_only",
      "base:workflow:read",
      "base:workflow:write",
      "bitable:app",
      "bitable:app:readonly",
      "board:whiteboard:node:create",
      "board:whiteboard:node:delete",
      "board:whiteboard:node:read",
      "board:whiteboard:node:update",
      "calendar:calendar.acl:create",
      "calendar:calendar.acl:read",
      "calendar:calendar.event:create",
      "calendar:calendar.event:delete",
      "calendar:calendar.event:read",
      "calendar:calendar.event:reply",
      "calendar:calendar.event:update",
      "calendar:calendar.free_busy:read",
      "calendar:calendar:create",
      "calendar:calendar:delete",
      "calendar:calendar:read",
      "calendar:calendar:readonly",
      "calendar:calendar:subscribe",
      "calendar:calendar:update",
      "calendar:exchange.bindings:create",
      "calendar:exchange.bindings:delete",
      "calendar:exchange.bindings:read",
      "calendar:settings.caldav:create",
      "calendar:settings.workhour:read",
      "calendar:time_off:create",
      "calendar:time_off:delete",
      "calendar:timeoff",
      "contact:contact.base:readonly",
      "docs:doc",
      "docs:doc:readonly",
      "docs:document.comment:create",
      "docs:document.comment:read",
      "docs:document.comment:update",
      "docs:document.comment:write_only",
      "docs:document.content:read",
      "docs:document.media:download",
      "docs:document.media:upload",
      "docs:document.subscription",
      "docs:document.subscription:read",
      "docs:document:copy",
      "docs:document:export",
      "docs:document:import",
      "docs:event.document_deleted:read",
      "docs:event.document_edited:read",
      "docs:event.document_opened:read",
      "docs:event:subscribe",
      "docs:permission.member",
      "docs:permission.member:auth",
      "docs:permission.member:create",
      "docs:permission.member:delete",
      "docs:permission.member:readonly",
      "docs:permission.member:retrieve",
      "docs:permission.member:transfer",
      "docs:permission.member:update",
      "docs:permission.setting",
      "docs:permission.setting:read",
      "docs:permission.setting:readonly",
      "docs:permission.setting:write_only",
      "docx:document",
      "docx:document.block:convert",
      "docx:document:create",
      "docx:document:readonly",
      "docx:document:write_only",
      "drive:drive",
      "drive:drive.metadata:readonly",
      "drive:drive.search:readonly",
      "drive:drive:readonly",
      "drive:drive:version",
      "drive:drive:version:readonly",
      "drive:export:readonly",
      "drive:file",
      "drive:file.like:readonly",
      "drive:file.meta.sec_label.read_only",
      "drive:file:download",
      "drive:file:readonly",
      "drive:file:upload",
      "drive:file:view_record:readonly",
      "im:app_feed_card:write",
      "im:biz_entity_tag_relation:read",
      "im:biz_entity_tag_relation:write",
      "im:chat",
      "im:chat.access_event.bot_p2p_chat:read",
      "im:chat.announcement:read",
      "im:chat.announcement:write_only",
      "im:chat.chat_pins:read",
      "im:chat.chat_pins:write_only",
      "im:chat.collab_plugins:read",
      "im:chat.collab_plugins:write_only",
      "im:chat.managers:write_only",
      "im:chat.members:bot_access",
      "im:chat.members:read",
      "im:chat.members:write_only",
      "im:chat.menu_tree:read",
      "im:chat.menu_tree:write_only",
      "im:chat.moderation:read",
      "im:chat.tabs:read",
      "im:chat.tabs:write_only",
      "im:chat.top_notice:write_only",
      "im:chat.widgets:read",
      "im:chat.widgets:write_only",
      "im:chat:create",
      "im:chat:delete",
      "im:chat:moderation:write_only",
      "im:chat:operate_as_owner",
      "im:chat:read",
      "im:chat:readonly",
      "im:chat:update",
      "im:datasync.feed_card.time_sensitive:write",
      "im:message",
      "im:message.group_at_msg:readonly",
      "im:message.group_msg",
      "im:message.p2p_msg:readonly",
      "im:message.pins:read",
      "im:message.pins:write_only",
      "im:message.reactions:read",
      "im:message.reactions:write_only",
      "im:message.urgent",
      "im:message.urgent.status:write",
      "im:message.urgent:phone",
      "im:message.urgent:sms",
      "im:message:readonly",
      "im:message:recall",
      "im:message:send_as_bot",
      "im:message:send_multi_depts",
      "im:message:send_multi_users",
      "im:message:send_sys_msg",
      "im:message:update",
      "im:resource",
      "im:tag:read",
      "im:tag:write",
      "im:url_preview.update",
      "im:user_agent:read",
      "sheets:spreadsheet",
      "sheets:spreadsheet.meta:read",
      "sheets:spreadsheet.meta:write_only",
      "sheets:spreadsheet:create",
      "sheets:spreadsheet:read",
      "sheets:spreadsheet:readonly",
      "sheets:spreadsheet:write_only",
      "slides:presentation:create",
      "slides:presentation:read",
      "slides:presentation:update",
      "slides:presentation:write_only",
      "space:document.event:read",
      "space:document:delete",
      "space:document:move",
      "space:document:retrieve",
      "space:document:shortcut",
      "space:folder:create",
      "wiki:member:create",
      "wiki:member:retrieve",
      "wiki:member:update",
      "wiki:node:copy",
      "wiki:node:create",
      "wiki:node:move",
      "wiki:node:read",
      "wiki:node:retrieve",
      "wiki:node:update",
      "wiki:setting:read",
      "wiki:setting:write_only",
      "wiki:space:read",
      "wiki:space:retrieve",
      "wiki:space:write_only",
      "wiki:wiki",
      "wiki:wiki:readonly"
    ],
    "user": [
      "contact:contact.base:readonly"
    ]
  }
}
```

- 第四步：在 **版本管理与发布** 页面创建版本，发布应用

接下来将配置


#### 3. 配置Agent