module.exports = async (params) => {
    const quickadd = params.app.plugins.plugins.quickadd.api;

    // 1. 选择类型
    const typeChoice = await quickadd.suggester(
        ["💡 重点", "❓ 疑问", "📌 摘要", "⚠️ 警告", "🔬 示例"],
        ["tip", "question", "abstract", "danger", "example"]
    );
    if (!typeChoice) return;

    // 2. 输入内容
    const content = await quickadd.inputPrompt(`输入「${typeChoice}」内容`);
    if (!content) return;

    // 3. 格式化并插入到当前光标
    const editor = params.app.workspace.activeEditor.editor;
    if (editor) {
        const callout = `> [!${typeChoice}]+ ${content.replace(/\n/g, "\n> ")}`;
        editor.replaceSelection(callout);
        new Notice(`Callout 已插入`);
    }
};

