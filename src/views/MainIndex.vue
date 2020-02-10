<template>
  <a-layout>
    <a-layout-header style="background-color: #f0f2f5">
      <LayoutHeader/>
    </a-layout-header>
    <a-layout-content style="margin: 0 50px">
      <a-back-top/>
      <router-view name="subContent"/>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      <a-button type="link">管理员登录</a-button>
      <div>© 2020-现在 基于Web的体育用品销售系统的设计与实现 哈尔滨信息工程学院 毕业项目</div>
    </a-layout-footer>
  </a-layout>
</template>

<script>
  import LayoutHeader from "../components/LayoutHeader";

  export default {
    name: "MainIndex",
    components: {LayoutHeader},
    data: () => ({collapsed: false})
  }
</script>

<style scoped>

</style>
