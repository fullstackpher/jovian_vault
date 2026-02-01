---
创建时间: 2026-02-01T15:24
更新时间: 2026-02-01T18:48
tags:
  - JavaScript
---
## 时间的表示方式

- 不同区域位置使用的时间是不同的
- **GMT**：英国伦敦的皇家格林威治（Greenwich）天文台的标准时间（刚好在本初子午线经过的地方），这个时间叫GMT（Greenwich Mean Time）
	- 其他时区：东部时区（GMT+8），西部时区（GMT-8）
- **UTC**：公转有误差，所以GMT也就有误差，就推出了原子钟计算的标准时间UTC

> [!tip]+ 目前GMT依然在用，主要表示的是某个时区中的时间，而UTC是标准时间

## 创建Date对象
> [!example]+ 直接创建

```js
let date = new Date()
```

> [!example]+ 时间字符串

```js
let date = new Date("2026-01-01")
```

> [!example]+ 具体时分秒

```js
let date = new Date(2026, 01, 01, 09, 00, 08, 333)
```

## Date获取Unix时间戳
- Unix时间戳：它是一个整数值，表示自从1970年1月1日00:00:00 UTC以来的毫秒数

## getFullYear()
- 获取年份
> [!example]+ 获取年份

```js
let date = new Date()
console.log(date.getFullYear())
```

## getMonth()
- 获取月份（`从0~~11`）
> [!example]+ 获取月份

```js
let date = new Date()
console.log("从 Date 对象返回月份 (0 ~ 11)。",date.getMonth());
```

## getDate()
- 获取一月中的某一天（`从1~31`）
> [!example]+ 获取某天

```js
let date = new Date()
console.log("从 Date 对象返回一个月中的某一天 (1 ~ 31)。", date.getDate());
```

## getDay()
- 获取一周中的某一天（`从0~6`）
```js
let date = new Date()
console.log("从 Date 对象返回一周中的某一天 (0 ~ 6)。", date.getDay());
```

