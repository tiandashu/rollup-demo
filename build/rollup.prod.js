import { terser } from "rollup-plugin-terser";
import configList from "./rollup.base";

let isProd = process.env.NODE_ENV === "production";

// 合并rollup.config.js中的基础配置
configList.map((config, index) => {
  config.plugins = [...config.plugins, terser()];
  return config;
});

export default configList;
