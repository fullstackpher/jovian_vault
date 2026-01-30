# 📊 个人工作台
```meta-bind-button
label: 开灯
icon: sun
style: default
class: ""
cssStyle: ""
backgroundImage: ""
tooltip: ""
id: dark
hidden: true
actions:
  - type: command
    command: theme:toggle-light-dark

```
```meta-bind-button
label: 关灯
icon: moon
style: default
class: ""
cssStyle: ""
backgroundImage: ""
tooltip: ""
id: light
hidden: true
actions:
  - type: command
    command: theme:toggle-light-dark

```
```meta-bind-button
label: todo
icon: list-todo
style: default
class: ""
cssStyle: ""
backgroundImage: ""
tooltip: ""
id: todo-list
hidden: true
actions:
  - type: command
    command: quickadd:choice:2f5aceae-0f05-491e-a315-ef8759ac9ebb

```

`BUTTON[dark]` `BUTTON[light]` `BUTTON[todo-list]` 


---

## ✅ 今日任务

### 日常任务
```tasks
not done
due on or before today
short mode
sort by due
limit 10
```

### 已完成任务
```tasks
done on today
short mode
```

---

## 📁 项目进度看板

```dataviewjs
// 1. 定义数据来源：可以按文件夹或标签筛选
// 示例A：获取指定文件夹下的所有笔记
const pages = dv.pages('"1.Projects 项目"');
// 示例B：或获取包含特定标签（如#项目）的所有笔记
// const pages = dv.pages('#项目');

// 2. 定义看板的列，与你“状态”字段的值保持一致
const columns = ["待处理", "进行中", "已完成"];

// 3. 为每一列渲染卡片
for (let col of columns) {
    // 筛选出“状态”字段等于当前列名的笔记
    const filesInColumn = pages.where(p => p.状态 === col);
    
    // 渲染列标题（包含该列下的笔记数量）
    dv.header(3, col + ` (${filesInColumn.length})`);
    
    // 以列表形式渲染卡片，显示笔记链接和优先级（如果存在）
    dv.list(filesInColumn.map(p => {
        let display = p.file.link;
        if (p.优先级) {
            display += ` ➜ 优先级：${p.优先级}`;
        }
        return display;
    }));
}
```

### 🔥 进行中项目详情

```dataviewjs
function ringProgress(p) {
    const r = 8, c = 2 * Math.PI * r, o = c - (p / 100) * c;
    const lvl = p >= 80 ? "done" : p >= 60 ? "high" : p >= 40 ? "medium" : "low";
    return `<span class="progress-ring">
        <svg><circle class="bg" cx="10" cy="10" r="${r}"/>
            <circle class="fill ${lvl}" cx="10" cy="10" r="${r}" stroke-dasharray="${c}" stroke-dashoffset="${o}"/></svg>
        <span class="label">${p}%</span></span>`;
}

function calcProgress(page) {
    if (page.进度) return page.进度;
    const allTasks = dv.pages().file.tasks;
    const pageTasks = allTasks.filter(t => t.path === page.file.path);
    if (pageTasks.length === 0) return 0;
    return Math.round(pageTasks.filter(t => t.completed).length / pageTasks.length * 100);
}

const pages = dv.pages('#项目')
    .where(p => p.状态 === "进行中" && !p.file.path.includes("Templates"))
    .sort(p => p.截止时间, 'asc')
    .limit(5);

dv.table(["项目", "进度", "截止时间"],
    pages.map(p => [p.file.link, ringProgress(calcProgress(p)),
        p.截止时间 ? dv.date(p.截止时间).toFormat("MM-dd") : "-"]));
```

### 📈 项目总览

```dataview
TABLE WITHOUT ID
  file.link AS "项目",
  状态 AS "状态",
  dateformat(截止时间, "yyyy-MM-dd") AS "截止时间"
FROM #项目
WHERE !contains(file.path, "Templates")
SORT 截止时间
```

---

## 🎓 学习进度追踪

### 技术栈掌握度
```dataviewjs
function ringProgress(p) {
    const r = 8, c = 2 * Math.PI * r, o = c - (p / 100) * c;
    const lvl = p >= 80 ? "done" : p >= 60 ? "high" : p >= 40 ? "medium" : "low";
    return `<span class="progress-ring">
        <svg><circle class="bg" cx="10" cy="10" r="${r}"/>
            <circle class="fill ${lvl}" cx="10" cy="10" r="${r}" stroke-dasharray="${c}" stroke-dashoffset="${o}"/></svg>
        <span class="label">${p}%</span></span>`;
}

const pages = dv.pages('#技术栈');

if (pages.length === 0) {
    dv.paragraph("⚠️ 未找到带有 #技术栈 标签的笔记");
} else {
    dv.table(["技术栈", "掌握度", "完成任务"],
        pages.map(p => {
            const t = dv.pages(`"${p.file.path}"`).file.tasks || [];
            const done = t.filter(x => x.completed).length;
            const total = t.length;
            const prog = total > 0 ? Math.round(done / total * 100) : 0;
            return [p.file.link, ringProgress(prog), `${done}/${total}`];
        }));
}
```

### 📊 本周学习统计

```dataview
TABLE sum(time) AS "总时长"
FROM #日报
WHERE date >= date(now) - dur(7 days) AND !contains(file.path, "Templates")
SORT date DESC
```

### 📈 学习趋势

```dataview
TABLE WITHOUT ID
  dateformat(date, "MM-dd") AS "日期",
  time AS "学习时长"
FROM #日报
WHERE date >= date(now) - dur(14 days) AND !contains(file.path, "Templates")
SORT date DESC
LIMIT 7
```

---

## 🚨 待解决问题

```dataview
LIST FROM #问题解决
WHERE !contains(状态, "已完成") AND !contains(file.path, "Templates")
LIMIT 10
```

---

## ⚡ 快速入口

|        📝 日报         |       📚 学习        |   💻 项目    |    🔧 工具     |
| :------------------: | :----------------: | :--------: | :----------: |
| [[Templates/今日日报模板]] | [[Frontend知识体系总览]] |  [[项目看板]]  |  [[开发工具汇总]]  |
|       [[周报模板]]       |  [[JavaScript基础]]  |  [[学习前端]]  | [[WebStorm]] |
|                      |     [[HTML标签]]     | [[学习Java]] | [[VS Code]]  |

---

> [!tip] 快捷键提示
> - `Ctrl+Shift+Q` → 新增日报（需配置QuickAdd）
> - `Ctrl+Shift+A` → 快速添加任务（需配置QuickAdd）
> - `Ctrl+Shift+H` → 回到主页
