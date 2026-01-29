---
创建时间: 2026-01-29T13:55
更新时间: 2026-01-29T18:19
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

### 数组操作（CRUD）

#### 访问数组元素

> [!example]+ 访问数组的元素

```js
var colors = ['red', 'blue', 'orange']
// 访问数组中的元素
console.log(colors[0]); // avocado
console.log(colors.at(0)); // avocado

console.log(colors[-1]); // undefined
console.log(colors.at(-1)); // orange
```

- `Array.prototype.at(index)`：index允许正数和负数，负数索引表示从数组末尾元素开始倒数
- `array[index]`：index为-1，直接返回undefined，不支持

#### 修改数组元素

- 通过给 `arr[index]`赋值的方式修改数组中index位置的值

```js
const colors = ['orange', 'green', 'yellow']
colors[2] = 'blue'
```


#### 新增数组元素

- 通过给 `arr[index]`赋值的方式添加数组的元素（开发中不推荐）

```js
const colors = ['orange', 'green', 'yellow']
colors[5] = 'pink'
```

#### 删除数组元素

- 通过 `delete arr[index]` 方式删除数组index位置的元素（开发中不推荐）
- 不改变数组结构，还是原数组的长度，只是该位置的元素变成了undefined

### 新增数组元素

- `push()`：不改变原数组，数组末尾添加元素，返回数组的新长度
- `unshift()`：不改变原数组，数组头部添加元素，返回数组的新长度

### 删除数组元素

- `pop()`：不改变原数组，数组末尾删除元素，返回被删除的元素
- `shift()`：不改变原数组，数组头部删除元素，返回被删除的元素

> [!example]+ 栈方法（后进先出）

```js
var colors = ['orange', 'green']
// 新增元素
var newColors = colors.push('yellow')
alert(newColors); // 3
newColors = colors.push('blue')
alert(newColors); // 4

var item = colors.pop()
alert(item); // blue
alert(colors.length); // 3
```

> [!example]+ 队列方法（先进先出）

```js
// 实现队列方法
var colors = new Array()
var count = colors.push('orange', 'green')
alert(count); // 2
count = colors.push('yellow')
alert(count); // 3

var items = colors.shift()
alert(items); // orange
alert(colors.length); // 2
```

### splice方法

- `splice` 方法可以说是处理数组的利器，它可以做任何事：**添加，删除和替换元素**
- 语法：`array.splice(start[, deleteCount[, item1[, item2[, ...]]]])`
	- 从 `start` 位置开始，处理数组中的元素
	- `deleteCount`：要删除元素的个数，如果为0或者负数表示不删除
	- `item1`，`item2`，`...`：在添加元素时，需要添加的元素
	- 返回值：由被删除元素组成的数组，如果没有删除的元素，则返回空数组

> [!example]+ splice示例

```js
var colors = ['orange', 'green', 'yellow']
// 在索引1位置添加purple
colors.splice(1, 0, 'purple')
console.log(colors); // ['orange', 'purple', 'green', 'yellow']
// 在索引2位置删除1个元素，替换为black
colors.splice(2, 1, 'black')
console.log(colors); // ['orange', 'purple', 'black', 'yellow']
// 在索引1位置删除1个元素   
colors.splice(1, 1)
console.log(colors); // ['orange', 'black', 'yellow']
```

> [!danger]+ 注意事项

- **修改原数组**：`splice()` 会改变原数组。
- **返回被删除元素**：即使只添加元素，也会返回空数组。
- **负索引**：`start` 可以为负数，表示从末尾开始计数。
- **deleteCount省略**：如果省略，则删除从 `start` 到末尾的所有元素。

### length属性

- length属性用于获取数组的长度
- 当修改数组的时候，length属性会自动更新

> [!tip]+ length属性可写

- 可以扩容，手动给length设置一个大于默认length的值，它的数组长度会扩容到指定值
- 减少它，数组会被截断
- 清空数组，给length设为0即可