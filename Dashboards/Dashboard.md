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
label: todo-list
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
    command: 

```



`BUTTON[dark]` `BUTTON[light]` `BUTTON[todo-list]`

---

## 📅 今日概览

| 今日任务 | 进行中项目 | 本周学习 | 待解决问题 |
| :--: | :---: | :--: | :---: |
| `-`  |  `-`  | `-h  |  `-`  |

### 🗓️ 日历

```calendar
type: week
showCurrent: true
showArrow: true
weekStart: 1
```

### ⏰ 今日时间追踪

> 今日已学习: `-` 小时 | 专注次数: `-` 次

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
// 项目状态看板
const columns = ["待处理", "进行中", "已完成"];
const pages = dv.pages('#项目').where(p => !p.file.path.includes("Templates"));

for (let col of columns) {
    const filesInColumn = pages.where(p => p.状态 === col);
    dv.header(4, `### ${col} (${filesInColumn.length})`);

    if (filesInColumn.length === 0) {
        dv.paragraph("*暂无*");
    } else {
        dv.list(filesInColumn.map(p => {
            const progress = p.进度 || 0;
            return `${p.file.link} ${progress}%`;
        }));
    }
}
```

### 🔥 进行中项目详情

```dataview
TABLE 状态 AS "状态", 进度 AS "进度", dateformat(截止时间, "MM-dd") AS "截止"
FROM #项目
WHERE 状态 = "进行中" AND !contains(file.path, "Templates")
SORT 截止时间 ASC
LIMIT 5
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
const pages = dv.pages('#技术栈');

if (pages.length === 0) {
    dv.paragraph("⚠️ 未找到带有 #技术栈 标签的笔记");
} else {
    const tableData = pages.map(page => {
        const tasks = dv.pages(`"${page.file.path}"`).file.tasks || [];
        const completedTasks = tasks.filter(t => t.completed).length;
        const totalTasks = tasks.length;
        const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        const progressBar = progressPercent >= 100 ? "🟢 100%" :
                           progressPercent >= 75 ? "🟡 " + progressPercent + "%" :
                           progressPercent >= 50 ? "🟠 " + progressPercent + "%" :
                           "🔴 " + progressPercent + "%";

        return [
            page.file.link,
            progressBar,
            `${completedTasks}/${totalTasks}`
        ];
    });

    dv.table(
        ["技术栈", "掌握度", "完成任务"],
        tableData
    );
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
|                      |                    |            |              |

---

> [!tip] 快捷键提示
> - `Ctrl+Shift+Q` → 新增日报（需配置QuickAdd）
> - `Ctrl+Shift+A` → 快速添加任务（需配置QuickAdd）
> - `Ctrl+Shift+H` → 回到主页
