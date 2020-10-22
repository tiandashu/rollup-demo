import path from 'path';
import serve from'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import configList from './rollup.base'

const resolveFile = filePath => path.resolve(__dirname, filePath);

// 合并rollup.config.js中的基础配置
configList.map((config, index) => {
  config.output.sourcemap = true;
  if (index === 0) {
    config.plugins = [
      ...config.plugins,
      ...[
        serve({
          open: true,
          port: 3000,
          contentBase: [ resolveFile('../dist'), resolveFile('../example')]
        }),
        livereload(resolveFile('../dist')) // 启动重载，并且监听 dist 目录
      ]
    ];
  }
  return config;
});

export default configList