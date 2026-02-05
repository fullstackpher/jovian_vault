/**
 * 智能闪念 QuickAdd 脚本
 *
 * 基于 List Callout 插件，快速捕获和分类闪念
 *
 * 闪念类型：
 * - ~ 灵感 💡 记录突发的想法和创意
 * - ! 重要 🔴 标记重要事项或提醒
 * - @ 心情 😊 记录当下情绪和感受
 * - $ 待办 ☑️ 需要完成的任务
 * - & 记事 📝 一般性记录和备注
 * - % 语言 🌐 外语学习或专业术语
 *
 * 输出：始终追加到今日日记的 ## 💭 Thoughts 标题下
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

    // ===== 1. 获取输入内容 =====
    let content = null;

    // 从 Capture 获取输入
    if (params.userInput && params.userInput.length > 0) {
        content = params.userInput;
    }

    // 如果没有传入内容，提示输入
    if (!content) {
        content = await quickadd.inputPrompt("记录闪念");
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
    const timestamp = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
    const formattedLines = lines.map((line, index) => {
        if (index === 0) {
            return `- ${typeChoice.symbol} [${timestamp}] ${line}`;
        } else {
            // 多行内容保持缩进
            return `  ${line}`;
        }
    });
    const result = formattedLines.join("\n");

    // ===== 4. 追加到今日日记的 Thoughts 标题下 =====
    // 获取今日日期，构造日记路径
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD
    const diaryPath = `7.Daily/每日日志/${dateStr}.md`;

    try {
        const diaryFile = app.vault.getAbstractFileByPath(diaryPath);
        if (!diaryFile) {
            new Notice(`⚠️ 今日日记不存在：${diaryPath}`);
            return;
        }

        // 读取日记内容
        let diaryContent = await app.vault.read(diaryFile);

        // 检查是否存在 ## 💭 Thoughts 标题
        const thoughtsHeader = "## 💭 Thoughts";
        const thoughtsPattern = new RegExp(`^${thoughtsHeader}.*$`, 'm');

        if (thoughtsPattern.test(diaryContent)) {
            // 找到 Thoughts 标题，在其后追加内容
            diaryContent = diaryContent.replace(
                thoughtsPattern,
                match => `${match}\n${result}`
            );
        } else {
            // 没找到 Thoughts 标题，在最后一个 ## 二级标题后追加
            const lastHeaderMatch = diaryContent.match(/^## .+$/m);
            if (lastHeaderMatch) {
                diaryContent = diaryContent.replace(
                    lastHeaderMatch,
                    `${lastHeaderMatch}\n\n${thoughtsHeader}\n${result}`
                );
            } else {
                // 完全没有二级标题，在文件末尾追加
                diaryContent += `\n\n${thoughtsHeader}\n${result}`;
            }
        }

        // 写入修改后的内容
        await app.vault.modify(diaryFile, diaryContent);
        new Notice(`✅ 已写入日记 Thoughts：${typeChoice.icon}`);

    } catch (error) {
        new Notice(`❌ 写入失败：${error.message}`);
    }
};
