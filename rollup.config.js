import json from "@rollup/plugin-json"; // 加载json文件
import babel from "@rollup/plugin-babel"; // 配置babel
import resolve from "@rollup/plugin-node-resolve"; // 加载外部模块
import commonjs from "@rollup/plugin-commonjs"; // 将cjs模块转换成es模块
import VuePlugin from "rollup-plugin-vue";
import { terser } from "rollup-plugin-terser";
import image from "@rollup/plugin-image";
import scss from "rollup-plugin-scss";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import alias from "@rollup/plugin-alias";
import replace from "@rollup/plugin-replace";
import url from "@rollup/plugin-url"; // 支持引入文件模块，png svg..

import progress from "rollup-plugin-progress";
import filesize from "rollup-plugin-filesize";

import clear from "rollup-plugin-clear";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import path from 'path'

const pathresolve = dir => path.resolve(__dirname, dir)

let isProd = process.env.NODE_ENV === "production";
console.log(
  `-------------------------${process.env.NODE_ENV}--------------------`
);
console.log(`-------------------------${process.env.AAA}--------------------`);

export default {
  input: "src/index.js",
  external: ["lodash", "jquery"],
  output: {
    file: "dist/bundle.js",
    format: "umd",
    name: "Tian",
    // 一般和external选项配合使用，并且配置的插件只有在使用到的时候才会构建到产物中
    globals: {
      lodash: "_",
      jquery: "$",
      vue: "Vue",
    },
    // sourcemap: true, // 开启压缩后设置该属性才有效
  },
  plugins: [
    clear({
      // required, point out which directories should be clear.
      targets: ["dist"],
      // optional, whether clear the directores when rollup recompile on --watch mode.
      // watch: true, // default: false
    }),
    alias({
      entries: [{ find: "utils", replacement: "./src/utils/index.js" }],
    }),
    replace({
      // alternatively, one could pass process.env.NODE_ENV or 'development` to stringify
      "process.env.NODE_ENV": JSON.stringify("production"),
      __buildDate__: () => new Date(),
      qiqi: JSON.stringify("可爱"),
    }),
    commonjs(),
    resolve(),
    json(),
    image(),
    url(),
    scss({
      output: true,
      // prefix: `@import "./fonts.scss";`,
      processor: (css) =>
        postcss([autoprefixer({ overrideBrowserslist: "Edge 18" })]),
      // 监听文件变化，触发自动构建
      // TODO 无法触发自动构建
      // watch: ["packages/jdwl-demo/src"],
      // watch: [ pathresolve("packages/jdwl-demo/src")],
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
    VuePlugin(),
    terser(),
    serve({
      contentBase: ["dist", "public"],
      // contentBase: '',
      open: true,
    }),
    livereload(),
    progress(),
    filesize(),
  ],
};
