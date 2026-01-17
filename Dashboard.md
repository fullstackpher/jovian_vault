---
创建时间: 2026-01-12T15:29
更新时间: 2026-01-17T19:01
---
## 📊 学习进度仪表板

### 技术栈掌握度
```dataviewjs
const pages = dv.pages('#技术栈');

if (pages.length === 0) {
    dv.paragraph("⚠️ 未找到带有 #技术栈 标签的笔记");
} else {
    dv.table(
        ["技术栈", "进度", "完成率", "总任务数", "已完成", "调试信息"],
        pages.map(page => {
            const content = page.file.content || "";
            
            // 调试：显示内容前100个字符
            const preview = content.substring(0, 100) + "...";
            
            // 测试多种正则表达式
            const regex1 = /^- \[( |x|X|\/)\].*$/gm;  // 标准格式
            const regex2 = /^\s*[-*]\s*\[( |x|X|\/)\].*$/gm;  // 更宽松的格式
            const regex3 = /\[( |x|X|\/)\]/g;  // 最简单的格式
            
            const allTasks1 = content.match(regex1) || [];
            const allTasks2 = content.match(regex2) || [];
            const allTasks3 = content.match(regex3) || [];
            
            // 使用最匹配的那个
            const allTasks = allTasks1.length > 0 ? allTasks1 : 
                           allTasks2.length > 0 ? allTasks2 : allTasks3;
            
            // 调试：显示匹配到的任务
            const sampleTask = allTasks.length > 0 ? allTasks[0] : "无匹配";
            
            const completedTasks = allTasks.filter(task => 
                /^- \[(x|X|\/)\]/.test(task.trim())
            ).length;
            
            const totalTasks = allTasks.length;
            const progressPercent = totalTasks > 0 ? 
                Math.round((completedTasks / totalTasks) * 100) : 0;
            
            const progressBar = `<progress max="100" value="${progressPercent}" 
                style="width: 150px; height: 20px;"></progress>`;
            
            return [
                page.file.link,
                progressBar,
                `${progressPercent}% (${completedTasks}/${totalTasks})`,
                totalTasks,
                completedTasks,
                `匹配:${allTasks1.length}/${allTasks2.length}/${allTasks3.length} 示例:${sampleTask}`
            ];
        })
    );
}
```

### 项目完成情况
```dataview
TABLE 状态 as "状态", dateformat(截止时间, "yyyy-MM-dd") as "截止时间"
FROM #项目
WHERE !contains(file.path, "_Templates") 
SORT deadline
```

### 本周学习时间统计
```dataview
TABLE sum(time) as "总时长"
FROM #日报
WHERE date >= date(now) - dur(7 days)
```

### 待解决问题
```dataview
LIST FROM #问题解决 WHERE !contains(状态, "已完成")
```

