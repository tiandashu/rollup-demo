import clear from "rollup-plugin-clear"; // 清除产物
import nodeResolve from "rollup-plugin-node-resolve"; // 帮助寻找node_modules里的包
import commonjs from "@rollup/plugin-commonjs"; // 将非ES6语法的包转为ES6可用
import json from "@rollup/plugin-json"; // 识别json文件
import alias from "@rollup/plugin-alias"; // 配置路径别名

// 配置scss
import scss from "rollup-plugin-scss";
import postcss from "postcss";
import base64 from "postcss-base64";
import autoprefixer from "autoprefixer";

import vue from "rollup-plugin-vue"; // 处理vue文件
import babel from "rollup-plugin-babel"; // rollup 的 babel 插件，ES6转ES5
import image from "@rollup/plugin-image";
import url from "rollup-plugin-url";
import replace from "rollup-plugin-replace"; // 替换待打包文件里的一些变量，如process在浏览器端是不存在的，需要被替换

import progress from "rollup-plugin-progress";
import filesize from "rollup-plugin-filesize";

import path from "path";
import fs from "fs-extra";
import pkg from "../package.json";
const resolve = (dir) => path.resolve(__dirname, dir);
const isDir = (dir) => fs.lstatSync(dir).isDirectory();

// 区分全局和组件
const globals = {
  vue: "Vue",
  "element-ui": "ELEMENT",
}

function outputConfig(name) {
  if(pkg.name === name ) {
    return [
      {
        file: pkg.module,
        format: "es",
        globals
      },
      {
        file: pkg.main,
        format: "cjs",
        globals
      },
      {
        name: pkg.name,
        file: pkg.browser,
        format: "umd",
        globals
      },
    ]
  } else {
    return  [
      {
        file: `dist/${name}/index.umd.js`,
        format: "umd",
        name: name,
        globals
      },
      {
        file: `dist/index.esm.js`,
        format: "esm",
        globals
      },
    ]
  }
};

// 自动读取文件
const packages = {
  [pkg.name]: `src/index.js`,
};
const dir = path.join(__dirname, "../packages");
const files = fs.readdirSync(dir);
files.forEach((file) => {
  const absolutePath = path.join(dir, file);
  if (isDir(absolutePath)) {
    packages[file] = `packages/${file}/index.js`;
  }
});

// 生成配置文件
const buildPackages = [];
for (let name in packages) {
  const file = packages[name];
  buildPackages.push(createRollupConfig(file, name));
}

function createRollupConfig(file, name) {
  return {
    input: file,
    external: ["vue", "element-ui"],
    output: outputConfig(name),
    plugins: [
     
      nodeResolve(),
      commonjs(),
      clear({
        targets: ["dist"],
      }),
      // 只能配置.js文件路径
      alias({
        entries: {
          utils: resolve("../src/utils"),
        },
      }),
      
      json(),
      image(),
      scss({
        output: true,
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
        watch: ["src", "packages"],
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify(
          process.env.NODE_ENV || "development"
        ),
      }),
      vue({
        css: false,
      }),
      babel({
        exclude: "node_modules/**", // 只编译我们的源代码
      }),
      url({
        limit: 10 * 1024,
      }),
      progress(),
      filesize(),
    ]
  };
}


export default buildPackages