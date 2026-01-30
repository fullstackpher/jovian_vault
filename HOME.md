---
title: 🏠 主页
created: 2026-01-30
updated: 2026-01-30
tags:
  - dashboard
  - homepage
cssclass: dashboard
创建时间: 2026-01-30T14:28
更新时间: 2026-01-30T14:28
---

<div class="header-actions">
  <button id="btn-light" class="action-btn" onclick="toggleTheme('light')">☀️ 开灯</button>
  <button id="btn-dark" class="action-btn" onclick="toggleTheme('dark')">🌙 关灯</button>
  <button class="action-btn" onclick="app.commands.executeCommandById('app:new-note')">📝 新建TODO</button>
  <button class="action-btn" onclick="app.commands.executeCommandById('obsidian-tasks-plugin:show-archived-tasks')">📦 归档TODO</button>
</div>

---

## 📝 正在进行的笔记

```dataviewjs
const currentFile = dv.current().file.path;
const openFiles = app.workspace.getLeaf('tab').map(leaf => leaf.view?.file?.path).filter(p => p && p !== currentFile);

// 获取最近编辑的文件（排除当前页）
const recentFiles = dv.pages()
  .where(p => !p.file.path.includes("模板") && !p.file.path.includes("README"))
  .sort(p => p.file.mtime, 'desc')
  .limit(8);

dv.table(["笔记名称", "修改时间", "位置"],
  recentFiles.map(p => [
    `[[${p.file.path}|${p.file.name}]]`,
    p.file.mday.from("now"),
    p.file.path.split('/')[0]
  ])
);
```

---

## ✅ 今日待办

```dataviewjs
const today = dv.date("today");
const tomorrow = dv.date("tomorrow");

// 从Tasks插件获取今天的待办
const tasksToday = dv.pages('"7.Daily 日周记"')
  .where(p => p.file.name.includes(dv.date("today").toFormat("yyyy-MM-dd")))
  .file.tasks
  .where(t => !t.completed)
  .limit(10);

if (tasksToday.length > 0) {
  dv.paragraph("**今日任务** (" + tasksToday.length + "项)");
  for (let task of tasksToday) {
    dv.paragraph("- [ ] " + (task.link ? task.link : task.text));
  }
} else {
  dv.paragraph("✅ 今天没有待办任务！");
}

// 明日即将到期
const tomorrowTasks = dv.pages('"0.Inbox 缓存箱"')
  .concat(dv.pages('"1.Projects 项目"'))
  .concat(dv.pages('"7.Daily 日周记"'))
  .file.tasks
  .where(t => !t.completed && t.due && dv.date(t.due) === tomorrow)
  .limit(5);

if (tomorrowTasks.length > 0) {
  dv.paragraph("\n**⚠️ 明日到期任务**");
  for (let task of tomorrowTasks) {
    dv.paragraph("- [ ] " + (task.link ? task.link : task.text));
  }
}
```

---

## 📊 追踪学习进度

```dataviewjs
// 学习项目统计
const learningProjects = dv.pages('"1.Projects 项目"')
  .where(p => p.file.name !== "README.md" && p.file.name !== "项目看板.md");

const totalNotes = learningProjects.length;
const totalWords = learningProjects.reduce((sum, p) => sum + (p.file.outlinks?.length || 0), 0);

// 今日学习时间（从日报中统计）
const todayNotes = dv.pages('"7.Daily 日周记"')
  .where(p => p.file.name.includes(dv.date("today").toFormat("yyyy-MM-dd")));

const todayLearning = todayNotes.length;

// 最近7天学习统计
const last7Days = dv.pages('"7.Daily 日周记"')
  .where(p => {
    const fileDate = dv.date(p.file.name.replace(/\D/g, '-'));
    return fileDate >= dv.date("today").minus({days: 7});
  });

dv.paragraph(`
<div class="progress-grid">
  <div class="progress-card">
    <div class="progress-icon">📚</div>
    <div class="progress-value">${totalNotes}</div>
    <div class="progress-label">学习项目</div>
  </div>
  <div class="progress-card">
    <div class="progress-icon">📝</div>
    <div class="progress-value">${todayLearning}</div>
    <div class="progress-label">今日学习</div>
  </div>
  <div class="progress-card">
    <div class="progress-icon">📅</div>
    <div class="progress-value">${last7Days.length}</div>
    <div class="progress-label">最近7天</div>
  </div>
</div>
`);

// 学习进度表格
dv.paragraph("\n**各项目进度**");
dv.table(["项目", "笔记数", "完成状态"],
  learningProjects.map(p => {
    const notes = dv.pages(`"${p.file.path}"`).length;
    return [
      `[[${p.file.path}|${p.file.name}]]`,
      notes.toString(),
      notes > 0 ? "🟢 进行中" : "⚪ 未开始"
    ];
  })
);
```

---

## 📋 清单状态

```dataviewjs
// Inbox 统计
const inboxFiles = dv.pages('"0.Inbox 缓存箱"')
  .where(p => !p.file.name.includes("README"));

// 项目统计
const projectFiles = dv.pages('"1.Projects 项目"')
  .where(p => !p.file.name.includes("README"));

// 领域统计
const areaFiles = dv.pages('"2.Areas 领域"')
  .where(p => !p.file.name.includes("README"));

// 资源统计
const resourceFiles = dv.pages('"3.Resources 资源"')
  .where(p => !p.file.name.includes("README"));

// 日报统计
const dailyFiles = dv.pages('"7.Daily 日周记"');

// 未完成任务统计
const allTasks = dv.pages('"0.Inbox 缓存箱"')
  .concat(dv.pages('"1.Projects 项目"'))
  .concat(dv.pages('"7.Daily 日周记"'))
  .file.tasks
  .where(t => !t.completed);

dv.paragraph(`
<div class="status-grid">
  <div class="status-card inbox">
    <div class="status-title">📥 收件箱</div>
    <div class="status-count">${inboxFiles.length} 条</div>
    <div class="status-detail">待整理</div>
  </div>
  <div class="status-card projects">
    <div class="status-title">🚀 项目</div>
    <div class="status-count">${projectFiles.length} 项</div>
    <div class="status-detail">${allTasks.length} 个待办</div>
  </div>
  <div class="status-card areas">
    <div class="status-title">🎯 领域</div>
    <div class="status-count">${areaFiles.length} 个</div>
    <div class="status-detail">持续积累</div>
  </div>
  <div class="status-card resources">
    <div class="status-title">📚 资源</div>
    <div class="status-count">${resourceFiles.length} 份</div>
    <div class="status-detail">工具参考</div>
  </div>
  <div class="status-card daily">
    <div class="status-title">📔 日记</div>
    <div class="status-count">${dailyFiles.length} 篇</div>
    <div class="status-detail">${todayLearning} 篇今日</div>
  </div>
</div>
`);

// 未完成任务列表
dv.paragraph("\n**🔴 未完成的任务**");
const incompleteTasks = allTasks.limit(5);
if (incompleteTasks.length > 0) {
  for (let task of incompleteTasks) {
    dv.paragraph("- [ ] " + (task.link ? `[[${task.path}|${task.text}]]` : task.text));
  }
} else {
  dv.paragraph("✅ 所有任务已完成！");
}
```

---

> 💡 **提示**: 使用 `Ctrl/Cmd + 点击` 按钮可以执行对应操作

<script>
// 主题切换功能
function toggleTheme(theme) {
  const body = document.body;
  if (theme === 'light') {
    body.classList.remove('theme-dark');
    body.classList.add('theme-light');
  } else {
    body.classList.remove('theme-light');
    body.classList.add('theme-dark');
  }
}

// 初始化主题
document.addEventListener('DOMContentLoaded', () => {
  const isDark = document.body.classList.contains('theme-dark') ||
                 !document.body.classList.contains('theme-light');
});
</script>

<style>
/* 仪表盘基础样式 */
.dashboard {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #1a1a2e;
  --text-secondary: #4a4a68;
  --accent: #6366f1;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --border: #e2e8f0;
}

.theme-dark .dashboard {
  --bg-primary: #1a1a2e;
  --bg-secondary: #16213e;
  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
  --accent: #818cf8;
  --success: #34d399;
  --warning: #fbbf24;
  --danger: #f87171;
  --border: #334155;
}

.dashboard {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  padding: 20px;
  border-radius: 12px;
}

/* 头部按钮样式 */
.header-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
  padding: 16px;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  border-radius: 12px;
  border: 1px solid var(--border);
}

.action-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  background: var(--accent);
  color: white;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.action-btn:active {
  transform: translateY(0);
}

/* 进度卡片网格 */
.progress-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin: 20px 0;
}

.progress-card {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  border: 1px solid var(--border);
  transition: transform 0.3s ease;
}

.progress-card:hover {
  transform: translateY(-4px);
}

.progress-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.progress-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--accent);
}

.progress-label {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 4px;
}

/* 状态卡片网格 */
.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin: 20px 0;
}

.status-card {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid var(--accent);
  transition: all 0.3s ease;
}

.status-card:hover {
  transform: translateX(4px);
}

.status-card.inbox { border-left-color: #f59e0b; }
.status-card.projects { border-left-color: #6366f1; }
.status-card.areas { border-left-color: #10b981; }
.status-card.resources { border-left-color: #8b5cf6; }
.status-card.daily { border-left-color: #ec4899; }

.status-title {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 8px;
}

.status-count {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
}

.status-detail {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 4px;
}

/* Dataview 表格样式 */
.dashboard table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
}

.dashboard th,
.dashboard td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

.dashboard th {
  background: var(--bg-secondary);
  font-weight: 600;
  color: var(--text-secondary);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dashboard tr:hover {
  background: var(--bg-secondary);
}

/* 段落样式 */
.dashboard p {
  margin: 12px 0;
  line-height: 1.6;
}

.dashboard hr {
  border: none;
  border-top: 1px solid var(--border);
  margin: 24px 0;
}
</style>
