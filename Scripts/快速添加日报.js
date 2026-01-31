module.exports = async (params) => {
    const { app } = params;
    const { moment } = require("moment");
    const quickadd = app.plugins.plugins.quickadd.api;

    // 1. 获取今日日期
    const today = moment().format("YYYY-MM-DD");
    const todayZh = moment().format("YYYY年M月D日");

    // 2. 输入今日学习时长
    const timeInput = await quickadd.inputPrompt("今日学习时长（如：4小时）", "4小时");
    if (!timeInput) return;

    // 3. 选择重点领域
    const focusAreas = await quickadd.suggester(
        ["前端", "后端", "学习", "项目", "工具"],
        ["前端", "后端", "学习", "项目", "工具"]
    );
    if (!focusAreas) return;

    // 4. 输入今日完成事项
    const completed = await quickadd.inputPrompt("今日完成事项（用逗号分隔）", "");

    // 5. 输入明日计划
    const tomorrow = await quickadd.inputPrompt("明日计划（用逗号分隔）", "");

    // 6. 生成文件名
    const fileName = `${today} 学习日报.md`;
    const filePath = `7.Daily 日周记/${fileName}`;

    // 7. 构建内容
    const content = `---
date: ${today}
focus_areas:
  - ${focusAreas}
time: ${timeInput}
tags:
  - 日报
created_by: QuickAdd
---

# ${todayZh} 学习日报

## ⏰ 时间分配

\`\`\`mermaid
pie title 今日时间分配
    "编码" : 2
    "学习" : 2
    "解决问题" : 1
    "规划" : 1
\`\`\`

## 📝 今日完成

${completed ? completed.split(',').map(item => `- ${item.trim()}`).join('\n') : '-'}

### 🔧 问题解决

-

### 📚 技术学习

-

## 🎯 明日计划

${tomorrow ? tomorrow.split(',').map(item => `- ${item.trim()}`).join('\n') : '-'}

---
*使用 QuickAdd 自动生成*
`;

    // 8. 创建文件
    await app.vault.createFolder(`7.Daily 日周记`);
    await app.vault.create(filePath, content);

    // 9. 打开新创建的文件
    await app.workspace.openLinkText(fileName, `7.Daily 日周记`);

    new Notice(`✅ 日报已创建：${fileName}`);
};
