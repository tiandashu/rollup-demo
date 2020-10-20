<template>
  <div class="demo">
    这是一个红色的字
    <img src="./title.png" alt="" srcset="">
    <el-button>默认按钮8</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
  </div>
</template>

<script>
import { logA } from 'utils'
export default {
  name: "JdwlDemo",
  mounted() {
    logA()
    console.log('@rollup/plugin-replace 注入的全局变量---------------', process.env.NODE_ENV, '__buildDate__', qiqi)
  }
};
</script>

<style lang="scss" scoped>
@import './main.scss';
</style>
