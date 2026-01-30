---
创建时间: 2026-01-22T12:19
更新时间: 2026-01-22T13:07
tags:
  - CSS
---
# PostCSS 详细使用指南

## 一、什么是 PostCSS？

PostCSS 是一个用 JavaScript 工具和插件转换 CSS 代码的工具。它本身并不直接处理 CSS，而是通过插件体系来转换 CSS。

### 核心特点：
- **模块化**：每个功能都是独立的插件
- **基于 AST**：将 CSS 解析为抽象语法树（AST）进行处理
- **高性能**：比传统预处理器更快
- **高度可扩展**：可通过 JavaScript 编写自定义插件

## 二、安装与基础配置

### 1. 基本安装
```bash
# 使用 npm
npm install postcss postcss-cli --save-dev

# 使用 yarn
yarn add postcss postcss-cli --dev

# 使用 pnpm
pnpm add postcss postcss-cli --save-dev
```

### 2. 基础配置文件
创建 `postcss.config.js`：
```javascript
module.exports = {
  plugins: [
    // 插件列表
  ]
}
```

或使用 `.postcssrc`、`postcss.config.json` 等配置文件格式。

## 三、核心插件介绍

### 1. Autoprefixer - 自动添加浏览器前缀
```bash
npm install autoprefixer --save-dev
```

配置示例：
```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: [
        'last 2 versions',
        '> 1%',
        'iOS >= 7',
        'Android >= 4'
      ]
    })
  ]
}
```

### 2. PostCSS Preset Env - 使用未来 CSS 特性
```bash
npm install postcss-preset-env --save-dev
```

配置示例：
```javascript
module.exports = {
  plugins: [
    require('postcss-preset-env')({
      stage: 3, // 使用 stage 3 的特性
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'color-mod-function': true
      }
    })
  ]
}
```

### 3. CSS Modules - CSS 模块化
```bash
npm install postcss-modules --save-dev
```

配置示例：
```javascript
module.exports = {
  plugins: [
    require('postcss-modules')({
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      // 其他配置选项
    })
  ]
}
```

## 四、常用插件集合

### 语法增强类
- **postcss-nested**: 支持 Sass 风格的嵌套语法
- **postcss-mixins**: 支持混合宏（mixins）
- **postcss-extend**: 类似 Sass 的 @extend 功能
- **postcss-simple-vars**: 支持 Sass 风格的变量

### 优化类
- **cssnano**: CSS 压缩和优化
- **postcss-uncss**: 移除未使用的 CSS
- **postcss-zindex**: 优化 z-index 值
- **postcss-discard-comments**: 移除注释

### 工具类
- **postcss-import**: 支持 @import 规则
- **postcss-url**: 处理 URL 引用
- **postcss-assets**: 管理资源路径
- **postcss-sprites**: 生成雪碧图

### 校验类
- **stylelint**: CSS 代码检查
- **doiuse**: 检查浏览器兼容性

## 五、完整配置示例

### 基础项目配置
```javascript
// postcss.config.js
module.exports = {
  parser: 'postcss-scss', // 如果需要解析 Sass 语法
  plugins: {
    'postcss-import': {},
    'postcss-mixins': {},
    'postcss-simple-vars': {},
    'postcss-nested': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true
      }
    },
    'autoprefixer': {
      grid: true
    },
    'cssnano': process.env.NODE_ENV === 'production' ? {} : false
  }
}
```

## 六、与构建工具集成

### 1. Webpack 集成
```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      }
    ]
  }
}
```

### 2. Gulp 集成
```javascript
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

gulp.task('css', () => {
  const plugins = [
    autoprefixer(),
    cssnano()
  ];
  
  return gulp.src('./src/*.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dist'));
});
```

### 3. Vite 集成
Vite 默认支持 PostCSS，只需创建 `postcss.config.js` 即可。

## 七、自定义插件开发

### 简单插件示例
```javascript
// postcss-plugins/simple-plugin.js
const postcss = require('postcss');

module.exports = postcss.plugin('simple-plugin', (options = {}) => {
  return (root, result) => {
    // 遍历所有规则
    root.walkRules(rule => {
      // 遍历所有声明
      rule.walkDecls(decl => {
        // 示例：将 px 转换为 rem
        if (decl.value.includes('px')) {
          const pxValue = parseFloat(decl.value);
          const remValue = pxValue / 16;
          decl.value = `${remValue}rem`;
        }
      });
    });
  };
});
```

## 八、实战示例

### 1. 移动端适配方案
```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-pxtorem')({
      rootValue: 16,
      propList: ['*'],
      minPixelValue: 2
    }),
    require('autoprefixer')()
  ]
}
```

### 2. CSS-in-JS 支持
```javascript
module.exports = {
  plugins: [
    require('postcss-jsx')(),
    require('postcss-preset-env')({
      stage: 3
    })
  ]
}
```

## 九、最佳实践建议

1. **按需引入插件**：只安装项目需要的插件
2. **开发/生产环境区分**：生产环境启用压缩优化
3. **保持插件顺序**：注意插件执行的先后顺序
4. **定期更新**：保持插件和 PostCSS 版本更新
5. **性能优化**：使用缓存提高构建速度

## 十、常见问题解决

### 1. 插件顺序问题
```javascript
// 正确的顺序
module.exports = {
  plugins: [
    require('postcss-import'),          // 1. 处理 @import
    require('postcss-mixins'),          // 2. 混合宏
    require('postcss-simple-vars'),     // 3. 变量
    require('postcss-nested'),          // 4. 嵌套
    require('autoprefixer'),            // 5. 自动前缀
    require('cssnano')                  // 6. 压缩（最后）
  ]
}
```

### 2. 浏览器兼容性配置
```javascript
// .browserslistrc
last 2 versions
> 1%
not dead
iOS >= 9
Android >= 4.4
```

### 3. 性能优化配置
```javascript
module.exports = {
  map: process.env.NODE_ENV === 'development' ? 'inline' : false,
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 3,
      autoprefixer: { grid: true }
    },
    'cssnano': process.env.NODE_ENV === 'production' ? {
      preset: ['default', {
        discardComments: { removeAll: true }
      }]
    } : false
  }
}
```

## 总结

PostCSS 通过其插件化的架构，为 CSS 处理提供了极大的灵活性。无论是传统的 CSS 预处理需求，还是现代化的 CSS 特性支持，都能找到合适的插件解决方案。关键在于理解项目的具体需求，选择合适的插件组合，并正确配置执行顺序。