---
创建时间: 2026-01-12T15:29
更新时间: 2026-01-17T18:45
---
## 📊 学习进度仪表板

### 技术栈掌握度
```dataviewjs
// 修复后的进度条查询代码
const pages = dv.pages('#技术栈');

if (pages.length === 0) {
    dv.paragraph("⚠️ 未找到带有 #技术栈 标签的笔记");
} else {
    // 创建表格
    dv.table(
        ["技术栈", "进度", "完成率"],
        pages.map(page => {
            // 从页面内容中提取任务列表
            const content = page.file.content;
            const taskRegex = /- $(x|X|\/| )$/g;  // 修正的正则表达式
            const allTasks = content?.match(taskRegex) || [];
            const completedTasks = allTasks.filter(task => 
                task.includes('[x]') || task.includes('[X]') || task.includes('[/]')
            ).length;
            
            const totalTasks = allTasks.length;
            const progressPercent = totalTasks > 0 ? 
                Math.round((completedTasks / totalTasks) * 100) : 0;
            
            // 创建进度条HTML
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

