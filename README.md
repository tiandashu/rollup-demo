### 环境
```
node v14.3.0
npm v6.14.5
rollup v2.32.0
```

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

# vue2
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


### 

