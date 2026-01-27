module.exports = {
    entry: async (QuickAdd) => {
        const { app, quickAddApi } = QuickAdd;
        // 关键修正：使用 app.workspace.getActiveViewOfType 获取当前md视图
        const activeView = app.workspace.getActiveViewOfType(app.workspace.getLeaf().viewType === 'markdown' ? 'markdown' : null);
        if (!activeView) {
            new Notice('请打开一个Markdown笔记再使用此宏。');
            return;
        }
        const editor = activeView.editor;

        // 1. 定义Callout类型选项
        const calloutTypes = {
            "💡 重点": "tip",
            "❓ 疑问": "question",
            "📌 摘要": "abstract",
            "⚠️ 警告": "warning",
            "🔬 示例": "example",
            "✅ 成功": "success"
        };

        // 2. 让用户选择类型
        const chosenDisplayName = await quickAddApi.suggester(
            Object.keys(calloutTypes),
            Object.keys(calloutTypes)
        );
        if (!chosenDisplayName) return;
        const calloutType = calloutTypes[chosenDisplayName];

        // 3. 让用户输入内容
        const content = await quickAddApi.inputPrompt(`请输入「${chosenDisplayName}」的内容：`, "", "可以输入多行。");
        if (!content) return;

        // 4. 构建并插入Callout文本
        const formattedContent = content.split('\n').map(line => `> ${line}`).join('\n');
        const finalCallout = `> [!${calloutType}]+ ${chosenDisplayName}\n${formattedContent}\n\n`;
        editor.replaceSelection(finalCallout);

        new Notice(`已插入 ${chosenDisplayName} Callout`);
    }
};