/**
 * 智能闪念 QuickAdd 脚本
 *
 * 基于 List Callout 插件，快速捕获和分类闪念
 *
 * 使用方法：
 * 1. 在 QuickAdd 中添加宏，选择此脚本
 * 2. 设置快捷键（如 Ctrl+Shift+S）
 * 3. 随时调用，快速记录闪念
 *
 * 闪念类型：
 * - ~ 灵感 💡 记录突发的想法和创意
 * - ! 重要 🔴 标记重要事项或提醒
 * - @ 心情 😊 记录当下情绪和感受
 * - $ 待办 ☑️ 需要完成的任务
 * - & 记事 📝 一般性记录和备注
 * - % 语言 🌐 外语学习或专业术语
 */

module.exports = async (params) => {
    const quickadd = params.app.plugins.plugins.quickadd.api;

    // 闪念类型配置（带Emoji便于识别）
    const types = [
        { label: "~ 灵感", symbol: "~", icon: "💡", desc: "记录突发的想法和创意" },
        { label: "! 重要", symbol: "!", icon: "🔴", desc: "标记重要事项或提醒" },
        { label: "@ 心情", symbol: "@", icon: "😊", desc: "记录当下情绪和感受" },
        { label: "$ 待办", symbol: "$", icon: "☑️", desc: "需要完成的任务" },
        { label: "& 记事", symbol: "&", icon: "📝", desc: "一般性记录和备注" },
        { label: "% 语言", symbol: "%", icon: "🌐", desc: "外语学习或专业术语" },
    ];

    // 1. 选择闪念类型
    const typeChoice = await quickadd.suggester(
        types.map(t => `${t.label} ${t.desc}`),
        types.map(t => t)
    );
    if (!typeChoice) return;

    // 2. 输入闪念内容（自动添加emoji提示）
    const content = await quickadd.inputPrompt(
        `输入${typeChoice.icon}内容`,
        typeChoice.symbol === "$" ? "完成后按回车键" : ""
    );
    if (!content) return;

    // 3. 获取当前编辑器
    const editor = params.app.workspace.activeEditor?.editor;
    if (!editor) {
        new Notice("⚠️ 请先打开一个笔记");
        return;
    }

    // 4. 格式化内容（处理多行）
    const lines = content.split("\n");
    const formattedLines = lines.map((line, index) => {
        if (index === 0) {
            return `- ${typeChoice.symbol} ${line}`;
        } else {
            // 多行内容：保持缩进
            return `  ${line}`;
        }
    });
    const result = formattedLines.join("\n");

    // 5. 插入到光标位置
    editor.replaceSelection(result);
    new Notice(`✅ 闪念已记录：${typeChoice.icon}`);
};
