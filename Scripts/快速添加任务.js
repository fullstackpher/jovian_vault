module.exports = async (params) => {
    const { app } = params;
    const quickadd = app.plugins.plugins.quickadd.api;

    // 1. 选择任务类型
    const taskType = await quickadd.suggester(
        ["📝 今日任务", "📅 指定日期任务", "🔄 习惯任务", "📁 项目任务"],
        ["today", "scheduled", "habit", "project"]
    );
    if (!taskType) return;

    // 2. 输入任务描述
    const taskDesc = await quickadd.inputPrompt("任务描述", "");
    if (!taskDesc) return;

    let taskContent = "";

    // 3. 根据类型生成任务
    switch (taskType) {
        case "today":
            taskContent = `- [ ] ${taskDesc} #today`;
            break;
        case "scheduled":
            taskContent = `- [ ] ${taskDesc} 📅 {date}`;
            break;
        case "habit":
            taskContent = `- [ ] ${taskDesc} #habit 🔁 every day`;
            break;
        case "project":
            const projectName = await quickadd.inputPrompt("项目名称", "");
            taskContent = `- [ ] ${taskDesc} #project/${projectName || "未命名"}`;
            break;
    }

    // 4. 获取当前编辑器
    const activeLeaf = app.workspace.activeLeaf;
    if (activeLeaf && activeLeaf.view && activeLeaf.view.editor) {
        const editor = activeLeaf.view.editor;
        editor.replaceSelection(taskContent);
        new Notice(`✅ 任务已添加：${taskDesc}`);
    } else {
        // 如果没有打开编辑器，提示用户
        new Notice(`⚠️ 请先打开一个笔记文件`);
    }
};
