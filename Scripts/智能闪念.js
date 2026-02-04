/**
 * 智能闪念 QuickAdd 脚本
 *
 * 基于 List Callout 插件，快速捕获和分类闪念
 *
 * 使用方法：
 * 1. 【宏】单独使用：选择类型 → 输入内容 → 插入光标
 * 2. 【Capture结合】Capture输入 → 宏处理 → 追加到Inbox
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
    const app = params.app;

    // 闪念类型配置（带Emoji便于识别）
    const types = [
        { label: "~ 灵感", symbol: "~", icon: "💡", desc: "记录突发的想法和创意" },
        { label: "! 重要", symbol: "!", icon: "🔴", desc: "标记重要事项或提醒" },
        { label: "@ 心情", symbol: "@", icon: "😊", desc: "记录当下情绪和感受" },
        { label: "$ 待办", symbol: "$", icon: "☑️", desc: "需要完成的任务" },
        { label: "& 记事", symbol: "&", icon: "📝", desc: "一般性记录和备注" },
        { label: "% 语言", symbol: "%", icon: "🌐", desc: "外语学习或专业术语" },
    ];

    // ===== 方式1：从 Capture 获取内容 =====
    // 如果 params 中有用户输入（来自 Capture 的 Prompt），则使用它
    let content = null;

    // 检查是否有从 Capture 传递的参数
    if (params.userInput && params.userInput.length > 0) {
        content = params.userInput;
    }

    // 如果没有传入内容，则先提示输入
    if (!content) {
        content = await quickadd.inputPrompt("输入闪念内容");
        if (!content) return;
    }

    // ===== 2. 选择闪念类型 =====
    const typeChoice = await quickadd.suggester(
        types.map(t => `${t.label} ${t.desc}`),
        types.map(t => t)
    );
    if (!typeChoice) return;

    // ===== 3. 格式化内容（处理多行） =====
    const lines = content.split("\n");
    const timestamp = new Date().toFormat("HH:mm");
    const formattedLines = lines.map((line, index) => {
        if (index === 0) {
            return `- ${typeChoice.symbol} [${timestamp}] ${line}`;
        } else {
            // 多行内容：保持缩进
            return `  ${line}`;
        }
    });
    const result = formattedLines.join("\n");

    // ===== 4. 判断输出方式 =====
    // 如果有打开的编辑器，插入到光标位置（单独使用）
    const editor = app.workspace.activeEditor?.editor;
    if (editor) {
        editor.replaceSelection(result);
        new Notice(`✅ 闪念已记录：${typeChoice.icon}`);
    } else {
        // 如果没有编辑器（Capture 场景），追加到 Inbox
        const inboxPath = "8.Info/0-Inbox.md";
        try {
            const inboxFile = app.vault.getAbstractFileByPath(inboxPath);
            if (inboxFile) {
                // 读取现有内容
                const existingContent = await app.vault.read(inboxFile);
                // 添加新内容（空行分隔）
                const newContent = existingContent + (existingContent.trim() ? "\n" : "") + result + "\n";
                // 写入文件
                await app.vault.modify(inboxFile, newContent);
                new Notice(`✅ 已追加到 Inbox：${typeChoice.icon}`);
            } else {
                new Notice(`⚠️ Inbox 文件不存在：${inboxPath}`);
            }
        } catch (error) {
            new Notice(`❌ 写入失败：${error.message}`);
        }
    }
};
