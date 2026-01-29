---
创建时间: 2026-01-29T13:55
更新时间: 2026-01-29T16:51
tags:
  - JavaScript
---
> [!note]+ 什么是数组

数组是一系列有序的集合，可以通过索引来访问它的元素

可以通过`[]`来创建一个数组

- 数组是一种特殊的对象类型

### 创建数组

> [!example]+ 直接量方式

```js
const arr = ['a', 'b', 'c']
```

> [!example]+ 构造函数方式

```js
const arr = new Array('a', 'b', 'c')
```

> [!tip]+ 数组元素从0开始编号（索引index)

- 一些编程语言允许我们使用负数索引来实现这一点，例如 `fruits[-1]`
- JavaScript并不支持这一点

### 访问数组

> [!example]+ 访问数组的元素

```js
var colors = ['avocado', 'banana', 'orange']
// 访问数组中的元素
console.log(colors[0]); // avocado
console.log(colors.at(0)); // avocado

console.log(colors[-1]); // undefined
console.log(colors.at(-1)); // orange
```

- `Array.prototype.at(index)`：index允许正数和负数，负数索引表示从数组末尾元素开始倒数
- `array[index]`：index为-1，直接返回undefined，不支持

### 修改数组

- 通过给 `arr[index]`赋值的方式修改数组中index位置的值