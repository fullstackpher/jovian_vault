module.exports = {
  entry: async (QuickAdd) => {
    // 1. 让用户选择Callout类型
    const calloutType = await QuickAdd.suggester(
      ["疑问", "重点", "示例", "总结"], // 显示给用户的选项
      ["question", "tip", "example", "abstract"] // 对应的实际callout类型
    );

    // 2. 让用户输入Callout内容
    const content = await QuickAdd.inputPrompt("输入" + calloutType + "内容：");
    if (!content) return;

    // 3. 构造完整的Callout语法
    const calloutText = `> [!${calloutType}]+ ${calloutType}\n> ${content.replace(/\n/g, "\n> ")}`;

    // 4. 获取当前活动笔记编辑器并插入
    const activeView = app.workspace.getActiveViewOfType(markdown);
    if (activeView) {
      const editor = activeView.editor;
      const cursor = editor.getCursor();
      editor.replaceRange(calloutText, cursor);
    }
  },
};