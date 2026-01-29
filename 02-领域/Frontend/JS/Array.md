---
创建时间: 2026-01-29T13:55
更新时间: 2026-01-29T19:41
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

> [!tip]+ length属性是可写的

- 减小长度（截断数组）

```js
const arr = [1,2,3,4,5]
arr.length = 3
console.log(arr) // [1,2,3]
```

- 增大长度（创建空位）

```js
const arr = [1, 2, 3];
arr.length = 5;
console.log(arr); // [1, 2, 3, empty × 2]
console.log(arr[3]); // undefined
```

- 清空数组（高效）

```js
const arr = [1, 2, 3, 4, 5];
arr.length = 0;
console.log(arr); // []
console.log(arr.length); // 0
```

- 预分配数组：创建N个空位：`arr.length = n` （某些场景下可优化性能）

### 遍历数组

```js
var colors = ['orange', 'green', 'yellow']
// 遍历数组中的元素，传统的for循环
for (var i = 0; i < colors.length; i++) {
    console.log(colors[i]);
}
// 遍历数组中的元素
for (var color of colors) {
    console.log(color);
}
// 遍历数组中的元素，同时获取索引
for (var index in colors) {
    console.log(index, colors[index]);
}
```

### slice方法

- `arr.slice` 方法：用于对数组进行截取（类似于字符串的slice方法）
	- `start`：截取的开始位置，从0开始
	- `end`：截取的结束位置（不包含end元素）
- **slice** 方法返回一个新数组，原始数组不会被改变
- **slice** 方法是一个复制方法，它不改变this，而是返回一个浅拷贝，复制原数组部分相同的元素

```js
var colors = ['orange', 'green', 'yellow']
var newColors = colors.slice(0, 2)
console.log(newColors); // ['orange', 'green']
console.log(colors); // ['orange', 'green', 'yellow']
```

### concat方法

- `arr.concat` 方法：将多个数组拼接在一起，返回一个新数组

```js
// concat方法用于合并两个或多个数组
var colors = ['orange', 'green', 'yellow']
var newColors = colors.concat(['red', 'blue'])
console.log(newColors); // ['orange', 'green', 'yellow', 'red', 'blue']
console.log(colors); // ['orange', 'green', 'yellow']
```

### join方法

- `arr.join` 方法：将数组的元素连接成一个字符串并返回这个字符串（用指定分隔符）

```js
// join方法用于将数组中的元素合并为一个字符串
var time = ['2026', '01', '29']
var timeStr = time.join('-')
console.log(timeStr); // '2026-01-29'
```

### indexOf方法

- `arr.indexOf(index)`：数组中查找元素，返回元素第一次出现的位置索引，没有返回-1

```js
// indexOf方法用于查找数组中指定元素的第一个索引
var colors = ['orange', 'green', 'yellow']
console.log(colors.indexOf('green')); // 1
console.log(colors.indexOf('red')); // -1
```

### find方法

- `arr.find(callback)`：返回数组中满足提供的测试函数的第一个元素的值，否则返回undefined

```js
var students = [
    {id: 1001, name: '张三', age: 18},
    {id: 1002, name: '李四', age: 19},
    {id: 1003, name: '王五', age: 20}
]
// 查找id是1003的学生信息
var student = students.find(stu => stu.id === 1003)
console.log(student);
```

### forEach方法

- `arr.forEach(callback)`：对数组的每个元素执行一次提供的函数

```js
// forEach方法用于遍历数组中的元素，对每个元素执行指定的操作
var colors = ['orange', 'green', 'yellow']
colors.forEach(function(color) {
    console.log(color);
})
// 箭头函数的写法
colors.forEach(color => console.log(color))
```

> [!tip]+ forEach方法没有返回值，它只是对数组中的每个元素执行指定的回调函数
> >[!danger] 用于数组遍历并进行操作

### map方法

- `arr.map(callback)`：返回一个新数组，每个元素都是回调函数的结果
- `map()` 方法按照原数组顺序依次处理元素

```js
// map方法用于遍历数组中的元素，对每个元素执行指定的操作，返回一个新数组
var colors = ['orange', 'green', 'yellow']
var newColors = colors.map(function(color) {
    return color.toUpperCase()
})
console.log(newColors); // ['ORANGE', 'GREEN', 'YELLOW']
console.log(colors); // ['orange', 'green', 'yellow']
```

### filter方法

- `arr.filter(callback)`：用于创建一个新数组，其中包含通过测试（函数判断） 的所有元素

```js
const newArray = array.filter(callback(element[, index[, array]])[, thisArg])
```





### reduce方法

- `arr.reduce(callback)`：