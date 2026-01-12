## 📊 学习进度仪表板

### 技术栈掌握度
```dataview
TABLE progress as "进度"
FROM #技术栈 
WHERE progress
SORT progress desc

```

### 项目完成情况
```dataview
TABLE status as "状态", deadline as "截止日期"
FROM #项目
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
LIST FROM #问题解决 WHERE !contains(status, "done")
```
