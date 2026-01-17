---
创建时间: 2026-01-12T15:29
更新时间: 2026-01-17T19:12
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
            const lines = content.split('\n');
            
            // 匹配任务行：以可选的“> ”开头，然后是短横线或星号，然后可能有空白，然后是任务状态括号
            const taskLines = lines.filter(line => /^(>\s*)?[-*]\s*\[( |x|X|\/)\]/.test(line));
            const totalTasks = taskLines.length;
            
            // 匹配已完成的任务：状态为x、X或/
            const completedTasks = taskLines.filter(line => /^(>\s*)?[-*]\s*\[(x|X|\/)\]/.test(line)).length;
            
            const progressPercent = totalTasks > 0 ? 
                Math.round((completedTasks / totalTasks) * 100) : 0;
            
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

