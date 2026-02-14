---
创建时间: 2026-02-14T16:19
更新时间: 2026-02-14T16:42
tags:
  - JavaScript
  - 领域/前端
---
## 认识DOM
DOM：文档对象模型，Document Object Model，简称DOM   
DOM是浏览器给开发人员提供的一套API集合，通过这些API可以去对HTML页面进行操作

## document对象
整个HTML文档被抽象到document对象中
document.documentElement对应的是html标签
document.body对应的是body标签
documnet.head对应的是head标签

## DOM Tree
在一个网页中，html结构最终形态是一个树结构
浏览器对html抽象到document对象的时候，也会形成一个树结构，就叫DOM Tree

## DOM节点类型

DOM Tree中的每个节点都属于以下几种类型：

| 节点类型 | nodeType | 说明 |
|---------|----------|------|
| ELEMENT_NODE | 1 | 元素节点（如 div, p, span） |
| ATTRIBUTE_NODE | 2 | 属性节点（如 class, id） |
| TEXT_NODE | 3 | 文本节点 |
| COMMENT_NODE | 8 | 注释节点 |
| DOCUMENT_NODE | 9 | 文档节点 |
| DOCUMENT_FRAGMENT_NODE | 11 | 文档片段节点 |

```javascript
// 检查节点类型
element.nodeType === 1; // true - 元素节点
textNode.nodeType === 3; // true - 文本节点
```

## DOM选择器

### 传统选择器

```javascript
// 通过ID选择
document.getElementById('myId');

// 通过标签名选择
document.getElementsByTagName('div');
element.getElementsByTagName('span'); // 从某元素开始搜索

// 通过类名选择
document.getElementsByClassName('myClass');

// 通过name属性选择
document.getElementsByName('username');
```

### 现代选择器（推荐）

```javascript
// 选择单个元素
document.querySelector('.myClass'); // 类选择器
document.querySelector('#myId');     // ID选择器
document.querySelector('div.active'); // 组合选择器
document.querySelector('a[href^="https"]'); // 属性选择器

// 选择所有元素
document.querySelectorAll('p'); // 所有p标签
document.querySelectorAll('.item'); // 所有类名为item的元素
```

### 节点关系遍历

```javascript
// 父节点
element.parentNode;
element.parentElement; // 只返回元素节点

// 子节点
element.childNodes;    // 所有子节点（包括文本、注释等）
element.children;      // 只包含元素节点
element.firstChild;    // 第一个子节点
element.lastChild;     // 最后一个子节点
element.firstElementChild; // 第一个元素子节点
element.lastElementChild;  // 最后一个元素子节点

// 兄弟节点
element.previousSibling;     // 上一个兄弟节点
element.nextSibling;         // 下一个兄弟节点
element.previousElementSibling; // 上一个元素兄弟节点
element.nextElementSibling;     // 下一个元素兄弟节点
```

## DOM节点操作

### 创建节点

```javascript
// 创建元素节点
const div = document.createElement('div');
const p = document.createElement('p');

// 创建文本节点
const text = document.createTextNode('Hello World');

// 创建文档片段（性能优化）
const fragment = document.createDocumentFragment();
```

### 插入节点

```javascript
// 追加到父元素末尾
parent.appendChild(child);

// 插入到指定节点之前
parent.insertBefore(newNode, referenceNode);

// 现代方法（推荐）
element.append(child);           // 可以插入多个，不返回值
element.prepend(child);          // 插入到开头
element.after(sibling);          // 插入到后面作为兄弟
element.before(sibling);         // 插入到前面作为兄弟

// 使用insertAdjacentElement
element.insertAdjacentElement('beforebegin', newElement); // 元素前面
element.insertAdjacentElement('afterbegin', newElement);  // 元素内部开头
element.insertAdjacentElement('beforeend', newElement);   // 元素内部末尾
element.insertAdjacentElement('afterend', newElement);    // 元素后面
```

### 删除和替换节点

```javascript
// 删除节点
element.remove(); // 现代方法
parent.removeChild(child); // 传统方法

// 替换节点
parent.replaceChild(newNode, oldNode);
```

### 克隆节点

```javascript
// 克隆节点
const clone = element.cloneNode(false); // 浅克隆，不包含子节点
const deepClone = element.cloneNode(true); // 深克隆，包含所有子节点
```

## DOM属性操作

### class操作

```javascript
// className（覆盖式）
element.className = 'active highlighted';

// classList（推荐）
element.classList.add('active');
element.classList.remove('active');
element.classList.toggle('active'); // 切换类名
element.classList.contains('active'); // 检查是否有类名
element.classList.replace('old', 'new'); // 替换类名
```

### style操作

```javascript
// 直接设置style
element.style.color = 'red';
element.style.fontSize = '16px';
element.style.backgroundColor = '#f0f0f0';

// 获取计算后的样式
const computedStyle = window.getComputedStyle(element);
const color = computedStyle.color;

// 清除样式
element.style = '';
```

### 属性操作

```javascript
// 获取属性
element.getAttribute('data-id');
element.getAttribute('href');

// 设置属性
element.setAttribute('data-id', '123');
element.setAttribute('class', 'active');

// 删除属性
element.removeAttribute('data-id');

// 检查属性是否存在
element.hasAttribute('data-id');

// 直接访问（适用于标准属性）
element.id = 'myId';
element.href = 'https://example.com';
element.disabled = true;

// dataset（data-*属性）
element.dataset.userId = '123';
console.log(element.dataset.userId);
```

## DOM内容操作

```javascript
// 获取和设置HTML内容
element.innerHTML = '<span>Hello</span>';
const htmlContent = element.innerHTML;

// 获取和设置文本内容
element.textContent = '纯文本内容';
const textContent = element.textContent;

// innerHTML vs textContent
// innerHTML: 解析HTML，可以设置标签
// textContent: 纯文本，自动转义HTML标签（防止XSS）

// 获取表单值
input.value = 'Hello';
select.value = 'option1';
checkbox.checked = true;
```

## DOM事件

### 事件监听

```javascript
// 添加事件监听
element.addEventListener('click', function(event) {
    console.log('Clicked!', event);
});

// 带选项的监听
element.addEventListener('click', handler, {
    once: true,        // 只触发一次
    passive: true,     // 不会阻止默认行为
    capture: false     // 捕获阶段触发
});

// 移除事件监听
element.removeEventListener('click', handler);

// 传统方式（不推荐）
element.onclick = function(event) {
    // 同一事件只能有一个处理函数
};
```

### 事件对象

```javascript
element.addEventListener('click', function(event) {
    // 阻止事件冒泡
    event.stopPropagation();

    // 阻止默认行为
    event.preventDefault();

    // 同时阻止冒泡和默认行为
    event.stopImmediatePropagation();

    // 获取事件目标
    const target = event.target;
    const currentTarget = event.currentTarget;

    // 获取坐标
    console.log(event.clientX, event.clientY);
    console.log(event.offsetX, event.offsetY);

    // 获取按键（键盘事件）
    console.log(event.key, event.code);

    // 获取鼠标按键
    console.log(event.button); // 0:左键, 1:中键, 2:右键
});
```

### 事件委托

```javascript
// 利用事件冒泡，在父元素上处理子元素事件
parent.addEventListener('click', function(event) {
    // 检查是否点击了目标元素
    if (event.target.matches('.item')) {
        console.log('Item clicked:', event.target.dataset.id);
    }
});
```

### 常用事件类型

```javascript
// 鼠标事件
click          // 单击
dblclick       // 双击
mousedown      // 鼠标按下
mouseup        // 鼠标释放
mouseover      // 鼠标移入（冒泡）
mouseenter     // 鼠标进入（不冒泡）
mouseout       // 鼠标移出（冒泡）
mouseleave     // 鼠标离开（不冒泡）
mousemove      // 鼠标移动

// 键盘事件
keydown        // 键盘按下
keyup          // 键盘释放
keypress       // 字符键按下（已废弃，用keydown代替）

// 表单事件
submit         // 表单提交
change         // 值改变（input, select, checkbox）
input          // 输入时实时触发
focus          // 获得焦点
blur           // 失去焦点

// 文档/窗口事件
load           // 页面加载完成
DOMContentLoaded // DOM加载完成（不等待资源）
resize         // 窗口大小改变
scroll         // 滚动事件
```

## DOM性能优化

### 批量操作

```javascript
// ❌ 不推荐：多次回流
const container = document.getElementById('container');
for (let i = 0; i < 100; i++) {
    const div = document.createElement('div');
    container.appendChild(div); // 每次都触发回流
}

// ✅ 推荐：使用文档片段
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
    const div = document.createElement('div');
    fragment.appendChild(div);
}
container.appendChild(fragment); // 只触发一次回流

// ✅ 推荐：使用innerHTML
const html = Array(100).fill('<div></div>').join('');
container.innerHTML = html;
```

### 减少DOM查询

```javascript
// ❌ 不推荐：重复查询
function update() {
    document.getElementById('myElement').classList.add('active');
    document.getElementById('myElement').style.color = 'red';
}

// ✅ 推荐：缓存查询结果
const element = document.getElementById('myElement');
function update() {
    element.classList.add('active');
    element.style.color = 'red';
}
```

### 事件节流和防抖

```javascript
// 防抖：延迟执行，重复触发则重置延迟
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// 节流：固定时间间隔执行
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}

// 使用
window.addEventListener('scroll', throttle(handleScroll, 200));
input.addEventListener('input', debounce(handleInput, 300));
```

## 相关概念

### 回流（Reflow）
- 元素的位置、大小等布局信息改变时触发
- 消耗性能较大

### 重绘（Repaint）
- 元素的样式改变（如颜色、背景）但不影响布局时触发
- 比回流消耗小

### 合成（Composite）
- 利用GPU进行图层合成
- transform 和 opacity 等属性的改变不会触发回流重绘

## 参考资料
- [MDN Web Docs - DOM](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)
- [DOM Living Standard](https://dom.spec.whatwg.org/)

