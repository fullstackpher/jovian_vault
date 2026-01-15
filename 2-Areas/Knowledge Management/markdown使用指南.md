---
创建时间: 2026-01-15T13:08
更新时间: 2026-01-15T20:05
tags:
  - 2026-01-15
  - 知识管理
  - obsidian
---
# 1.标题
使用`#`表示标题级别
```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

# 2.段落与换行
- 段落：用换行分隔
- 换行：行末加两个空格或使用`<br>`

# 3.字体样式
```markdown
*斜体文本* 或 _斜体文本_
**粗体文本** 或 __粗体文本__
***粗斜体*** 或 ___粗斜体___
~~删除线文本~~
```

# 4.列表
## 无序列表
```markdown
- 项目一
- 项目二
  - 子项目（缩进两个空格）
* 也可用星号
+ 也可用加号
```

## 有序列表
```markdown
1. 第一项
2. 第二项
   3. 子项一
   4. 子项二
```

## 任务列表
```markdown
- [ ] 未完成任务
- [x] 已完成任务
```

# 5.链接与图片
```markdown
[链接文字](URL “可选标题”)
![图片描述](图片URL “可选标题”)
```

# 6.引用
```markdown
> 引用文本
>> 嵌套引用
```

# 7.代码
## 行内代码
用反引号包裹：`` `代码` ``

## 代码块
用三个反引号包围，可指定语言：
```markdown
```python
def hello():
    print("Hello World!")
```


# 8.水平线
```markdown
---
***
___
```

# 9.表格
```markdown
| 表头1 | 表头2 | 表头3 |
|-------|-------|-------|
| 内容1 | 内容2 | 内容3 |
| 左对齐 | 居中对齐 | 右对齐 |
```

对齐方式：
- 左对齐：`:---`
- 居中对齐：`:---:`
- 右对齐：`---:`

# 10.转义字符
在特殊字符前加`\`：
```markdown
\* 正常显示星号而不是斜体
```

# 扩展语法 （部分实现支持）
## 1. 脚注
```markdown
这是带脚注的文本[^1]。

[^1]: 这是脚注内容。
```


## 2.定义列表
```markdown
术语
: 定义内容
```

## 3.缩写
```markdown
*[HTML]: 超文本标记语言
```

## 4. 目录（某些渲染器支持）
```markdown
[TOC]
```

## 5.数学公式（部分平台支持）
```markdown
行内公式：$E = mc^2$

块级公式：
$$
\sum_{i=1}^n i = \frac{n(n+1)}{2}
$$
```

# 实用技巧
## 1.嵌套使用
```markdown
> 1. **列表项加粗**
> 2. `代码` 在列表中
```

## 2. 链接引用式写法
```markdown
这是一个[示例链接][1]

[1]: https://example.com "可选标题"
```

## 3. 自动链接
```markdown
<https://example.com>
<email@example.com>
```

## 4. 嵌入HTML
markdown支持直接嵌入HTML
```markdown
<div style="color: red;">
  红色文本
</div>
```

## 学习资源

1. [Markdown 官方文档](https://daringfireball.net/projects/markdown/)

2. [CommonMark 规范](https://commonmark.org/)

3. [GitHub Markdown 指南](https://guides.github.com/features/mastering-markdown/)

4. [Markdown 教程](https://www.markdowntutorial.com/)
