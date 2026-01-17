---
创建时间: 2026-01-12T15:29
更新时间: 2026-01-17T19:07
---
## 📊 学习进度仪表板

### 技术栈掌握度
```dataviewjs
const pages = dv.pages('#技术栈');

if (pages.length === 0) {
    dv.paragraph("⚠️ 未找到带有 #技术栈 标签的笔记");
} else {
    // 方法1：逐行分析
    pages.forEach(page => {
        dv.header(3, `分析: ${page.file.name}`);
        
        const content = page.file.content || "";
        const lines = content.split('\n');
        
        // 查找所有包含方括号的行
        const bracketLines = lines.filter(line => 
            line.includes('[') && line.includes(']')
        );
        
        dv.paragraph(`找到 ${bracketLines.length} 个可能包含任务的行`);
        
        // 显示这些行
        bracketLines.forEach((line, i) => {
            dv.paragraph(`${i+1}. ${line.substring(0, 100)}`);
        });
        
        // 方法2：尝试不同正则表达式
        const patterns = [
            /\[( |x|X|\/)\]/g,  // 最简单的：包含[ ]、[x]、[X]、[/]
            /-\s*\[( |x|X|\/)\]/g,  // 以-开头
            /\*\s*\[( |x|X|\/)\]/g,  // 以*开头
            /\d+\.\s*\[( |x|X|\/)\]/g,  // 以数字开头
        ];
        
        patterns.forEach((pattern, index) => {
            const matches = content.match(pattern) || [];
            dv.paragraph(`模式${index+1}匹配到 ${matches.length} 个`);
            if (matches.length > 0) {
                dv.paragraph(`示例: ${matches[0]}`);
            }
        });
        
        dv.el("hr", "");
    });
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

