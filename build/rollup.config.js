import nodeResolve from "rollup-plugin-node-resolve"; // 帮助寻找node_modules里的包
import commonjs from "@rollup/plugin-commonjs"; // 将非ES6语法的包转为ES6可用
import babel from "rollup-plugin-babel"; // rollup 的 babel 插件，ES6转ES5

// 配置scss
import scss from "rollup-plugin-scss";
import postcss from "postcss";
import base64 from "postcss-base64";
import autoprefixer from "autoprefixer";

import vue from "rollup-plugin-vue"; // 处理vue文件
import json from "@rollup/plugin-json"; // 识别json文件
import image from "@rollup/plugin-image";
import url from "rollup-plugin-url";
import alias from "@rollup/plugin-alias"; // 配置路径别名
import clear from "rollup-plugin-clear";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import path from 'path'
let isProd = process.env.NODE_ENV === "production";
const resolve = (dir) => path.resolve(__dirname, dir)
const plugins = [
  // 清除上次构建的产物
  clear({
    targets: ["dist"],
  }),
  json(),
  nodeResolve(),
  commonjs(),
  image(),
  alias({
    entries: {
      utils: resolve("../src/utils"),
    },
  }),
  vue({ css: false }),
  babel({
    exclude: "node_modules/**", // 只编译我们的源代码
  }),
  url({
    limit: 10 * 1024,
  }),
  serve({
    open: true,
    port: 3001,
    contentBase: ["example", "dist"], // 设置静态服务的根目录
  }),
  livereload(),
]


export default [
  {
    input: "packages/jdwl-demo/index.js",
    output: [
      {
        name: "JdwlWidgets",
        file: "dist/jdwl-demo/jdwl-demo.umd.js",
        format: "umd",
        sourcemap: false,
      },
    ],
    external: ["vue", "element-ui"],
    //告诉rollup 全局变量Vue即是vue。一般和external配合使用
    global: {
      vue: "Vue",
      "element-ui": "ElmentUi",
    },
    plugins: [
      scss({
        output: `dist/style/jdwl-demo.css`,
        // 输出之前调用postcss
        processor: (css) =>
          postcss({
            plugins: [
              autoprefixer({ overrideBrowserslist: "Edge 18" }),
              base64({
                // extensions: [".png", ".jpeg"],
                // root: "./packages/",
              }),
            ],
          }),
        watch: ["packages"],
      }),
      ...plugins,
    ]
  },
  {
    input: "packages/jdwl-notice/index.js",
    output: [
      {
        name: "JdwlWidgets",
        file: "dist/jdwl-notice.umd.js",
        format: "umd",
        sourcemap: false,
      },
    ],
    external: ["vue", "element-ui"],
    //告诉rollup 全局变量Vue即是vue。一般和external配合使用
    global: {
      vue: "Vue",
      "element-ui": "ElmentUi",
    },
    plugins: [
      scss({
        output: `dist/style/jdwl-notice.css`,
        // 输出之前调用postcss
        processor: (css) =>
          postcss({
            plugins: [
              autoprefixer({ overrideBrowserslist: "Edge 18" }),
              base64({
                // extensions: [".png", ".jpeg"],
                // root: "./packages/",
              }),
            ],
          }),
        watch: ["packages"],
      }),
      ...plugins,
    ]
  }
];
