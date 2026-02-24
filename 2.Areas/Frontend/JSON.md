---
创建时间: 2026-02-23T20:40
更新时间: 2026-02-23T20:55
tags:
  - 领域/前端
  - JavaScript
---
### JSON的由来

在目前的开发中，**JSON是一种非常重要的数据格式**，它并不是编程语言，而是一种可以在**服务器端和客户端之间传输的数据格式**

> [!tip]+ JSON的全称是JavaScript Object Notation（JavaScript对象符号）

- JSON是有Douglas Crockford构想和设计的一种轻量级资料交换格式，算是JavaScript的一个子集
- 虽然JSON被提出来的时候是主要应用JavaScript中，但是目前已经独立于编程语言，可以在各个编程语言中使用
- 很多编程语言都实现了将JSON转换成对应模型的方式

> [!summary]+ 其他的传输格式：

- `XML`：在早期的网络传输中主要是使用XML来进行数据交换的，但是这种格式在解析、传输等各方面都弱于JSON，所以目前已经很少在被使用了
- `Protobuf`：另外一个在网络传输中目前已经越来越多使用的传输格式是protobuf，直到2021年的3.x才支持JavaScript，目前在前端使用的较少

> [!example]+ 目前JSON被使用的场景也越来越多：

- 网络数据传输JSON数据
- 项目的某些配置文件
- 非关系型数据库（NoSQL）将json作为存储格式

### JSON语法规则

JSON的语法非常简单，有以下几条核心规则：

1. **数据以键值对（key-value）形式存在**
2. **数据之间用逗号分隔**
3. **对象用大括号 `{}` 包裹**
4. **数组用中括号 `[]` 包裹**
5. **键名必须用双引号包裹**（这是JSON和JavaScript对象字面量最重要的区别）
6. **值可以是字符串、数字、布尔值、null、数组或对象**

> [!warning]+ JSON vs JavaScript对象字面量
> JSON和JavaScript对象字面量看起来非常像，但有一个关键区别：**JSON的键名必须使用双引号**，而JavaScript对象可以省略引号。

```json
// 正确的JSON格式
{"name": "张三", "age": 25, "isStudent": false}

// 错误的JSON（这是JavaScript对象，不是JSON）
{name: "张三", age: 25}
```

### JSON支持的数据类型

| 类型 | 说明 | 示例 |
|------|------|------|
| 字符串 | 必须用双引号包裹 | `"Hello World"` |
| 数字 | 整数或浮点数 | `42`, `3.14` |
| 布尔值 | `true` 或 `false` | `true` |
| 空值 | 表示空或不存在 | `null` |
| 对象 | 键值对的集合 | `{"key": "value"}` |
| 数组 | 值的有序列表 | `["a", "b", "c"]` |

> [!note]+ 注意：
> JSON**不支持**以下JavaScript中的数据类型：
> - `undefined`
> - 函数（function）
> - 日期（Date）→ 会转换成字符串
> - 正则（RegExp）→ 会变成空对象
> - `Symbol`

### JavaScript中操作JSON

#### 1. 序列化：将JavaScript对象转换为JSON字符串

```javascript
const user = {
  name: "张三",
  age: 25,
  hobbies: ["coding", "reading"]
};

// JSON.stringify() - 将对象序列化为JSON字符串
const jsonStr = JSON.stringify(user);
console.log(jsonStr);
// 输出: {"name":"张三","age":25,"hobbies":["coding","reading"]}

// 格式化输出（带缩进）
const formattedJson = JSON.stringify(user, null, 2);
```

#### 2. 反序列化：将JSON字符串转换为JavaScript对象

```javascript
const jsonStr = '{"name":"李四","age":30}';

// JSON.parse() - 将JSON字符串解析为JavaScript对象
const user = JSON.parse(jsonStr);
console.log(user.name); // 输出: 李四
```

> [!warning]+ 安全性注意
> 使用 `JSON.parse()` 时，如果JSON字符串来自不可信来源，可能存在**原型污染**风险。在处理用户输入的JSON时，应该使用 `Object.create(null)` 创建纯净对象，或使用专门的库进行安全解析。

### 常用工具选项

#### JSON.stringify() 的第二个参数（ replacer ）

```javascript
const user = {
  name: "王五",
  age: 28,
  password: "secret123"
};

// 只保留name和age字段
const jsonStr = JSON.stringify(user, ["name", "age"]);
console.log(jsonStr); // {"name":"王五","age":28}
```

#### JSON.stringify() 的第三个参数（ space ）

```javascript
const data = { name: "赵六", city: "北京" };

// 设置缩进空格数
JSON.stringify(data, null, 2);
/*
输出:
{
  "name": "赵六",
  "city": "北京"
}
*/
```

### JSON在项目中的实际应用

```javascript
// 1. API请求中发送JSON
fetch("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ name: "新用户", age: 20 })
});

// 2. 读取JSON配置文件
import config from "./config.json"; // webpack/vite等构建工具支持

// 3. localStorage存储（只能存字符串）
localStorage.setItem("user", JSON.stringify({ name: "测试用户" }));
const storedUser = JSON.parse(localStorage.getItem("user"));
```

### 常见错误及解决方案

| 错误 | 原因 | 解决方案 |
|------|------|----------|
| `JSON.parse: unexpected character` | JSON字符串格式错误 | 使用在线JSON校验工具检查 |
| `Unexpected token in JSON` | 有多余的逗号或引号 | 检查并修正格式 |
| `Converting circular structure to JSON` | 对象包含循环引用 | 移除循环引用的属性 |

> [!summary]+ 总结
> JSON作为轻量级的数据交换格式，已经成为现代Web开发的标准。无论是前后端数据交互、配置文件还是数据存储，JSON都发挥着重要作用。掌握JSON的语法和操作方法是前端开发者的必备技能。