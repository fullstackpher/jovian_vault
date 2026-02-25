---
创建时间: 2026-02-23T01:52
更新时间: 2026-02-25T19:16
---
# Obsidian 与 Notion 使用指南

本文档介绍 Obsidian 与 Notion 之间的数据同步和共享方法。

## 常用方法概览

### 方法一：Notion2Obsidian（Notion → Obsidian）

将 Notion 笔记导出为 Obsidian 可用的 Markdown 格式。

**工具推荐：**
- [notion-to-obsidian](https://github.com/connertennery/Notion-to-Obsidian-Export) - 开源导出工具
- [Obsidian Notion Sync](https://github.com/Elexy191/obsidian-notion-sync) - 双向同步插件

**使用方法：**
1. 在 Notion 中创建要导出的页面
2. 使用导出工具将 Notion 页面转为 Markdown
3. 导入到 Obsidian vault 中

---

### 方法二：Obsidian → Notion（单向推送）

将 Obsidian 笔记推送到 Notion。

**工具推荐：**
- [Obsidian to Notion](https://github.com/Antony-Ju/Obsidian-to-Notion) - 开源工具
- [Notion Publisher](https://github.com/Antony-Ju/Obsidian-to-Notion) - Obsidian 插件

**配置步骤：**
1. 在 Notion 创建 Integration：https://www.notion.so/my-integrations
2. 获取 `Internal Integration Token`
3. 复制 Token 到 Obsidian 插件设置中
4. 指定目标 Notion 页面

---

### 方法三：使用自动化平台（Zapier / Make）

通过 API 实现更灵活的双向同步。

**Zapier 方案：**
- Trigger: Notion 新建/更新页面 → Action: 创建 Obsidian 笔记
- 反之亦然

**Make (原 Integromat) 方案：**
- 支持更复杂的同步逻辑
- 可处理图片、附件等富媒体

---

### 方法四：手动导出/导入

**Notion 导出：**
1. 打开目标页面 → `...` 菜单 → `Export` → 选择 `Markdown & CSV`
2. 导出文件解压后放入 Obsidian vault

**Obsidian 导出到 Notion：**
1.  Obsidian 右上角 `...` → `Export` → `Markdown`
2.  使用导入工具或手动复制到 Notion

---

## 同步策略建议

| 场景 | 推荐方案 |
|------|----------|
| 临时迁移 | 手动导出导入 |
| 定期同步 | Zapier/Make 自动化 |
| 双向实时同步 | 第三方同步工具 |
| 一次性迁移 | Notion2Obsidian |

---

## 注意事项

1. **格式兼容性**：Notion 的某些块（如数据库视图）在 Markdown 中可能丢失格式
2. **图片处理**：建议使用图床服务（如 Imgur）确保图片可访问
3. **标签同步**：Notion 无原生标签系统，导出时可能需要手动处理
4. **API 限制**：注意 Notion API 的请求频率限制

---

## 相关资源

- [Notion API 文档](https://developers.notion.com/)
- [Obsidian 插件市场](https://obsidian.md/plugins)
