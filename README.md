### 环境
```
node v14.3.0
npm v6.14.5
rollup v2.32.0
```

### rollup 命令
```
-c 指定配置文件，默认rollup.config.js
-w 监听文件改变，自动构建。不需要安装插件
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
npm i -D rollup-plugin-vue  @vue/compiler-sfc
```