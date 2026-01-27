// module.exports = async (params) => {
//     const quickadd = params.app.plugins.plugins.quickadd.api;

//     // 1. 选择类型
//     const typeChoice = await quickadd.suggester(
//         ["💡 重点", "❓ 疑问", "📌 摘要", "⚠️ 警告", "🔬 示例"],
//         ["tip", "question", "abstract", "warning", "example"]
//     );
//     if (!typeChoice) return;

//     // 2. 输入内容
//     const content = await quickadd.inputPrompt(`输入「${typeChoice}」内容`);
//     if (!content) return;

//     // 3. 格式化并插入到当前光标
//     const editor = params.app.workspace.activeEditor.editor;
//     if (editor) {
//         const callout = `> [!${typeChoice}]+\n> ${content.replace(/\n/g, "\n> ")}`;
//         editor.replaceSelection(callout);
//         new Notice(`Callout 已插入`);
//     }
// };

module.exports = async (params) => {
    const quickadd = params.app.plugins.plugins.quickadd.api;
    const app = params.app;

    // 1. 选择Callout类型
    const typeMap = {
        "💡 重点": "tip",
        "❓ 疑问": "question",
        "📌 摘要": "abstract",
        "⚠️ 警告": "warning",
        "🔬 示例": "example"
    };
    
    const userChoice = await quickadd.suggester(
        Object.keys(typeMap),
        Object.keys(typeMap)
    );
    if (!userChoice) return;
    
    const calloutType = typeMap[userChoice];

    // 2. 输入内容
    const content = await quickadd.inputPrompt(`请输入「${userChoice}」的内容：`, "");
    if (content === null || content.trim() === "") return;

    // 3. 获取编辑器并插入
    const activeView = app.workspace.getActiveViewOfType(require('obsidian').MarkdownView);
    if (!activeView) {
        new Notice('请在Markdown编辑器中运行此宏。');
        return;
    }
    const editor = activeView.editor;
    
    // 4. 格式化内容（处理多行）
    const formattedContent = content.split('\n').map(line => `> ${line}`).join('\n');
    const finalCallout = `> [!${calloutType}]+ ${userChoice}\n${formattedContent}\n\n`;
    
    editor.replaceSelection(finalCallout);
    new Notice(`已插入 ${userChoice}`);
};