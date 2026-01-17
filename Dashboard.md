---
创建时间: 2026-01-12T15:29
更新时间: 2026-01-17T19:04
---
## 📊 学习进度仪表板

### 技术栈掌握度
```dataviewjs
const pages = dv.pages('#技术栈');

if (pages.length === 0) {
    dv.paragraph("⚠️ 未找到带有 #技术栈 标签的笔记");
} else {
    dv.table(
        ["技术栈", "进度", "完成率"],
        pages.map(page => {
            const content = page.file.content || "";
            
            // 通用正则：匹配任何以 - 或 * 开头，后面有 [ ]、[x]、[X]、[/] 的行
            // 允许前面有空格（支持嵌套），允许标记和描述间有0或多个空格
            const taskRegex = /^\s*[-*]\s*\[( |x|X|\/)\]\s*.*$/gmi;
            const allTasks = content.match(taskRegex) || [];
            
            // 统计完成的任务：包含 [x]、[X]、[/]
            const completedTasks = allTasks.filter(task => 
                /\[(x|X|\/)\]/.test(task)
            ).length;
            
            const totalTasks = allTasks.length;
            const progressPercent = totalTasks > 0 ? 
                Math.round((completedTasks / totalTasks) * 100) : 0;
            
            // 创建进度条
            const progressBar = `<progress max="100" value="${progressPercent}" 
                style="width: 150px; height: 20px;"></progress>`;
            
            return [
                page.file.link,
                progressBar,
                `${progressPercent}% (${completedTasks}/${totalTasks})`
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

