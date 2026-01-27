module.exports = {
    entry: async (QuickAdd, settings, params) => {
        const { app, quickAddApi } = QuickAdd;
        const markdownView = app.workspace.getActiveViewOfType(markdown);
        if (!markdownView) {
            new Notice('请在Markdown编辑器中使用此宏。');
            return;
        }
        const editor = markdownView.editor;

        // 1. 定义Callout类型选项（显示名称 : 实际类型）
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
            Object.keys(calloutTypes), // 显示给用户的列表
            Object.keys(calloutTypes)  // 实际返回的值
        );
        if (!chosenDisplayName) return;
        const calloutType = calloutTypes[chosenDisplayName];

        // 3. 让用户输入内容
        const content = await quickAddApi.inputPrompt(`请输入「${chosenDisplayName}」的内容：`, "", "可以输入多行。");
        if (!content) return;

        // 4. 构建Callout文本
        // 将用户输入的多行内容，每行前面都加上一个 `> `，以符合Callout语法
        const formattedContent = content.split('\n').map(line => `> ${line}`).join('\n');
        const finalCallout = `> [!${calloutType}]+ ${chosenDisplayName}\n${formattedContent}\n\n`;

        // 5. 插入到当前光标位置
        editor.replaceSelection(finalCallout);

        // 6. （可选）轻微的视觉反馈
        new Notice(`已插入 ${chosenDisplayName} Callout`);
    },
    settings: {}
};