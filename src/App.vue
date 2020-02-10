<template>
  <a-layout>
    <a-layout-header style="background-color: #f0f2f5">
      <LayoutHeader/>
    </a-layout-header>
    <a-layout-content style="margin: 0 50px">
      <a-layout class="box-shadow" style="padding: 24px 0; background: #fff">
        <a-layout-sider collapsedWidth="0" style="background: #fff" v-model="collapsed">
          <LayoutSider/>
        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
          <CarouselTwo/>
        </a-layout-content>
      </a-layout>
      <RecommendedProducts/>
      <a-back-top />
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      <a-button type="link">管理员登录</a-button>
      <div>© 2020-现在 基于Web的体育用品销售系统的设计与实现 哈尔滨信息工程学院 毕业项目</div>
    </a-layout-footer>
  </a-layout>
</template>

<script>
  import LayoutHeader from "./components/LayoutHeader";
  import LayoutSider from "./components/LayoutSider";
  import CarouselTwo from "./components/CarouselTwo";
  import RecommendedProducts from "./components/RecommendedProducts";

  export default {
    name: 'App',
    components: {RecommendedProducts, CarouselTwo, LayoutSider, LayoutHeader},
    data: () => ({collapsed: false}),
    methods: {}
  }
</script>

<style>
  .box-shadow {
    box-shadow: 5px 5px 8px 2px #E4E4E4;
  }

  .box-shadow:hover {
    box-shadow: 0 1px 8px 2px #E4E4E4;
  }
</style>
