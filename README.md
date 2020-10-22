### 环境
```
node v14.3.0
npm v6.14.5
rollup v2.32.0
```

### 包结构
package-name
 ┣ build      // rollup 配置
 ┣ dist       // 编译产物
 ┣ docs       // 文档
 ┣ example    // 使用示例
 ┣ packages   // 源文件
 ┣ src        // 入口文件
 ┣ test       // 测试
 ┣ README.md
 ┗ package.json

### rollup 命令
```
-c 指定配置文件，默认rollup.config.js
-w 监听文件改变，自动构建。不需要安装插件。 scss文件改动不会触发重新构建
--environment NODE_ENV:production 指定环境变量
```

### plugins

配置cjs
```
npm i -D '@rollup/plugin-node-resolve'; // 加载外部模块
npm i -D '@rollup/plugin-commonjs'; // cjs 模块转换成es模块
```

配置babel
```
npm i -D @rollup/plugin-babel
npm i -D @babel/core @babel/preset-env

# .babelrc
{
  "presets": [
    "@babel/env"
  ]
}
```

配置babel6
```
npm i -D rollup-plugin-babel@3.0.0
npm i -D babel-plugin-external-helpers
npm i -D babel-core babel-preset-env babel-preset-stage-3

# .babelrc
{
  "presets": [
    ["env", { "modules": false }],
    "stage-3"
  ],
  // external-helpers允许 Rollup 在包的顶部只引用一次 helpers ，而不是每个使用它们的模块中都引用一遍
  "plugins": ["external-helpers"]
}
```

配置json
```
npm i -D @rollup/plugin-json
```

配置本地服务及实时刷新
```
npm i -D rollup-plugin-serve rollup-plugin-livereload
```

压缩js
```
npm i -D  rollup-plugin-terser
```

配置vue
```
# vue最新版本
npm i -D rollup-plugin-vue  @vue/compiler-sfc

# vue2 使用此版本构建
npm i -D rollup-plugin-vue@5 vue-template-compiler
```

配置image
```
npm i -D @rollup/plugin-image
```

配置scss
```
npm install -D rollup-plugin-scss postcss autoprefixer
```


配置可视化
```
# 显示构建进度
npm i rollup-plugin-progress --save-dev

# 显示构建包大小
npm install rollup-plugin-filesize
```


### 注意事项
- 配置多个入口，将配置文件改成[] 数组即可
- 尽量使用es模块，发挥rollup的tree-shaking
- 注意插件的使用顺序，从上到下，从左到右
- format:五种输出格式：amd /  es6 / iife / umd / cjs
- name:'A',  //当format为iife和umd时必须提供，将作为全局变量挂在window(浏览器环境)下：window.A=...
- 编写组件样式的时候最好添加上scoped


### 问题
样式的热刷新