---
title: 🏠 主页
created: 2026-01-30
updated: 2026-01-30
tags:
  - dashboard
  - homepage
cssclass: dashboard
创建时间: 2026-01-30T14:28
更新时间: 2026-01-30T14:42
---

<div class="header-actions">
  <button class="action-btn" id="btn-light" onclick="toggleTheme('light')">
    <span class="btn-icon">☀️</span>
    <span class="btn-text">开灯</span>
  </button>
  <button class="action-btn" id="btn-dark" onclick="toggleTheme('dark')">
    <span class="btn-icon">🌙</span>
    <span class="btn-text">关灯</span>
  </button>
  <button class="action-btn" onclick="openQuickAdd('63feb5e5-e68f-4fa9-84a3-e72588165c40')">
    <span class="btn-icon">📝</span>
    <span class="btn-text">新建TODO</span>
  </button>
  <button class="action-btn" onclick="runCommand('obsidian-tasks-plugin:show-archived-tasks')">
    <span class="btn-icon">📦</span>
    <span class="btn-text">归档TODO</span>
  </button>
  <button class="action-btn" onclick="openCommandPalette()">
    <span class="btn-icon">⚡</span>
    <span class="btn-text">命令面板</span>
  </button>
</div>

---

## 📝 正在进行的笔记

```dataviewjs
const currentFile = dv.current().file.path;

// 获取最近编辑的文件（排除当前页和模板）
const recentFiles = dv.pages()
  .where(p =>
    !p.file.path.includes("模板") &&
    !p.file.path.includes("README") &&
    p.file.path !== currentFile
  )
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

// 获取今日日期格式
const todayStr = today.toFormat("yyyy-MM-dd");

// 从日报中获取今日待办
const todayTasks = dv.pages('"7.Daily 日周记"')
  .where(p => p.file.name.includes(todayStr))
  .file.tasks
  .where(t => !t.completed)
  .limit(10);

dv.paragraph("**今日任务** (" + todayTasks.length + "项)");

if (todayTasks.length > 0) {
  for (let task of todayTasks) {
    const link = task.link ? task.link.toString() : `[[7.Daily 日周记/${todayStr} 学习日报|任务]]`;
    dv.paragraph("- [ ] " + link + " \\(" + task.text + "\\)");
  }
} else {
  dv.paragraph("✅ 今天没有待办任务！");
}

// 明日到期任务
const tomorrowTasks = dv.pages('"0.Inbox 缓存箱"')
  .concat(dv.pages('"1.Projects 项目"'))
  .concat(dv.pages('"7.Daily 日周记"'))
  .file.tasks
  .where(t => !t.completed && t.due && dv.date(t.due) === tomorrow)
  .limit(5);

if (tomorrowTasks.length > 0) {
  dv.paragraph("\n**⚠️ 明日到期任务**");
  for (let task of tomorrowTasks) {
    dv.paragraph("- [ ] " + task.text);
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

// 今日学习时间（从日报中统计）
const today = dv.date("today");
const todayStr = today.toFormat("yyyy-MM-dd");
const todayNotes = dv.pages('"7.Daily 日周记"')
  .where(p => p.file.name.includes(todayStr));

const todayLearning = todayNotes.length;

// 最近7天学习统计
const last7Days = dv.pages('"7.Daily 日周记"')
  .where(p => {
    const fileDateStr = p.file.name.substring(0, 10);
    const fileDate = dv.date(fileDateStr);
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
dv.table(["项目", "笔记数", "状态"],
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
// 各文件夹统计
const inboxFiles = dv.pages('"0.Inbox 缓存箱"')
  .where(p => !p.file.name.includes("README"));

const projectFiles = dv.pages('"1.Projects 项目"')
  .where(p => !p.file.name.includes("README"));

const areaFiles = dv.pages('"2.Areas 领域"')
  .where(p => !p.file.name.includes("README"));

const resourceFiles = dv.pages('"3.Resources 资源"")
  .where(p => !p.file.name.includes("README"));

const dailyFiles = dv.pages('"7.Daily 日周记");

const today = dv.date("today");
const todayStr = today.toFormat("yyyy-MM-dd");
const todayNotes = dv.pages('"7.Daily 日周记"')
  .where(p => p.file.name.includes(todayStr));

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
    <div class="status-count">${inboxFiles.length}</div>
    <div class="status-detail">待整理</div>
  </div>
  <div class="status-card projects">
    <div class="status-title">🚀 项目</div>
    <div class="status-count">${projectFiles.length}</div>
    <div class="status-detail">${allTasks.length} 个待办</div>
  </div>
  <div class="status-card areas">
    <div class="status-title">🎯 领域</div>
    <div class="status-count">${areaFiles.length}</div>
    <div class="status-detail">持续积累</div>
  </div>
  <div class="status-card resources">
    <div class="status-title">📚 资源</div>
    <div class="status-count">${resourceFiles.length}</div>
    <div class="status-detail">工具参考</div>
  </div>
  <div class="status-card daily">
    <div class="status-title">📔 日记</div>
    <div class="status-count">${dailyFiles.length}</div>
    <div class="status-detail">${todayNotes.length} 篇今日</div>
  </div>
</div>
`);

// 未完成任务列表
dv.paragraph("\n**🔴 未完成的任务**");
const incompleteTasks = allTasks.limit(5);
if (incompleteTasks.length > 0) {
  for (let task of incompleteTasks) {
    const link = task.path ? `[[${task.path}|${task.text.substring(0, 20)}...]]` : task.text;
    dv.paragraph("- [ ] " + link);
  }
} else {
  dv.paragraph("✅ 所有任务已完成！");
}
```

---

## 🔧 快捷命令

<div class="quick-commands">
  <button class="quick-cmd" onclick="runCommand('app:new-note')">
    <span class="cmd-icon">📄</span>
    <span class="cmd-text">新建空白笔记</span>
  </button>
  <button class="quick-cmd" onclick="openQuickAdd('3e140b36-edc5-42c1-9a3e-bfc747cc3482')">
    <span class="cmd-icon">📔</span>
    <span class="cmd-text">创建日记</span>
  </button>
  <button class="quick-cmd" onclick="openQuickAdd('13baf9b5-5d7b-4e60-a021-f2a4a37297d2')">
    <span class="cmd-icon">🚀</span>
    <span class="cmd-text">创建项目</span>
  </button>
  <button class="quick-cmd" onclick="runCommand('command-runner:run:toggle-dark-mode')">
    <span class="cmd-icon">🌓</span>
    <span class="cmd-text">切换主题</span>
  </button>
</div>

---

> 💡 **提示**: 使用 `Ctrl/Cmd + P` 打开命令面板 | `Ctrl/Cmd + 点击` 按钮执行操作

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

// 运行 Obsidian 命令
function runCommand(commandId) {
  try {
    app.commands.executeCommandById(commandId);
  } catch (e) {
    console.log('命令执行失败:', commandId, e);
  }
}

// 打开 QuickAdd 选择
function openQuickAdd(choiceId) {
  try {
    app.commands.executeCommandById('quickadd:choice:' + choiceId);
  } catch (e) {
    // 如果 QuickAdd 命令失败，尝试新建笔记
    app.commands.executeCommandById('app:new-note');
  }
}

// 打开 Better Command Palette
function openCommandPalette() {
  try {
    app.commands.executeCommandById('obsidian-better-command-palette:open');
  } catch (e) {
    // 备用：打开默认命令面板
    app.commands.executeCommandById('app:open-command-palette');
  }
}

// 初始化主题检测
document.addEventListener('DOMContentLoaded', () => {
  // 主题已在 Obsidian 设置中管理
});
</script>

<style>
/* ===== 仪表盘基础样式 ===== */
.dashboard {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #1a1a2e;
  --text-secondary: #64748b;
  --accent: #6366f1;
  --accent-hover: #4f46e5;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --border: #e2e8f0;
  --shadow: rgba(99, 102, 241, 0.15);
}

.theme-dark .dashboard {
  --bg-primary: #1e1e2e;
  --bg-secondary: #181825;
  --text-primary: #cdd6f4;
  --text-secondary: #a6adc8;
  --accent: #89b4fa;
  --accent-hover: #b4befe;
  --success: #a6e3a1;
  --warning: #f9e2af;
  --danger: #f38ba8;
  --border: #313244;
  --shadow: rgba(137, 180, 250, 0.15);
}

.dashboard {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  padding: 24px;
  border-radius: 16px;
}

/* ===== 头部按钮样式 ===== */
.header-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 28px;
  padding: 20px;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  border-radius: 16px;
  border: 1px solid var(--border);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, var(--accent), var(--accent-hover));
  color: white;
  box-shadow: 0 4px 12px var(--shadow);
}

.action-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 20px var(--shadow);
}

.action-btn:active {
  transform: translateY(-1px) scale(0.98);
}

.btn-icon {
  font-size: 16px;
}

/* ===== 快捷命令样式 ===== */
.quick-commands {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-top: 20px;
}

.quick-cmd {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  border: 2px solid var(--border);
  border-radius: 12px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.quick-cmd:hover {
  border-color: var(--accent);
  background: var(--bg-primary);
  transform: translateX(4px);
}

.cmd-icon {
  font-size: 18px;
}

/* ===== 进度卡片网格 ===== */
.progress-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin: 24px 0;
}

.progress-card {
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  border-radius: 16px;
  padding: 24px 20px;
  text-align: center;
  border: 1px solid var(--border);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px var(--shadow);
}

.progress-icon {
  font-size: 36px;
  margin-bottom: 12px;
}

.progress-value {
  font-size: 32px;
  font-weight: 800;
  background: linear-gradient(135deg, var(--accent), var(--accent-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.progress-label {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 8px;
  font-weight: 500;
}

/* ===== 状态卡片网格 ===== */
.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
  margin: 24px 0;
}

.status-card {
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: 20px;
  border-left: 4px solid var(--accent);
  transition: all 0.3s ease;
}

.status-card:hover {
  transform: translateX(6px) scale(1.02);
}

.status-card.inbox { border-left-color: #f59e0b; }
.status-card.projects { border-left-color: #6366f1; }
.status-card.areas { border-left-color: #10b981; }
.status-card.resources { border-left-color: #8b5cf6; }
.status-card.daily { border-left-color: #ec4899; }

.status-title {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 10px;
  color: var(--text-primary);
}

.status-count {
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(135deg, var(--text-primary), var(--text-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.status-detail {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 6px;
}

/* ===== Dataview 表格样式 ===== */
.dashboard table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 20px 0;
  border-radius: 12px;
  overflow: hidden;
}

.dashboard th,
.dashboard td {
  padding: 14px 18px;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

.dashboard th {
  background: var(--bg-secondary);
  font-weight: 600;
  color: var(--text-secondary);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.dashboard tr:first-child td {
  border-top: none;
}

.dashboard tr:hover {
  background: var(--bg-secondary);
}

/* ===== 段落和分隔线样式 ===== */
.dashboard p {
  margin: 14px 0;
  line-height: 1.7;
}

.dashboard hr {
  border: none;
  border-top: 2px dashed var(--border);
  margin: 32px 0;
}

/* ===== 响应式设计 ===== */
@media (max-width: 768px) {
  .header-actions {
    padding: 16px;
  }

  .action-btn {
    padding: 10px 16px;
    font-size: 13px;
  }

  .progress-card,
  .status-card {
    padding: 16px;
  }

  .progress-value,
  .status-count {
    font-size: 24px;
  }
}
</style>
