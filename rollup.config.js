import json from "@rollup/plugin-json"; // 加载json文件
import babel from "@rollup/plugin-babel"; // 配置babel
import resolve from "@rollup/plugin-node-resolve"; // 加载外部模块
import cjs from "@rollup/plugin-commonjs"; // 将cjs模块转换成es模块
import VuePlugin from 'rollup-plugin-vue';
import { terser } from "rollup-plugin-terser";

import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

let isProd = process.env.NODE_ENV === "production";

export default {
  input: "src/main.js",
  external: ['lodash', 'jquery'],
  output: {
    file: "dist/bundle.js",
    format: "umd",
    name: "Tian",
    // 一般和external选项配合使用，并且配置的插件只有在使用到的时候才会构建到产物中
    globals: {
      lodash: "_",
      jquery: '$',
      vue: 'Vue'
    },
    // sourcemap: true, // 开启压缩后设置该属性才有效
  },
  plugins: [
    json(),
    resolve(),
    cjs(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
    // 默认vue作为外部依赖
    VuePlugin(),
    // terser(),
    serve({
      contentBase: ["dist", "public"],
      open: true,
    }),
    livereload(),
  ],
};
