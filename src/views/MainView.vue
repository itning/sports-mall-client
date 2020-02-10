<template>
  <div>
    <a-layout class="box-shadow" style="padding: 24px 0; background: #fff">
      <a-layout-sider collapsedWidth="0" style="background: #fff" v-model="collapsed">
        <LayoutSider/>
      </a-layout-sider>
      <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
        <CarouselTwo/>
      </a-layout-content>
    </a-layout>
    <RecommendedProducts/>
  </div>
</template>

<script>
  import CarouselTwo from "../components/CarouselTwo";
  import LayoutSider from "../components/LayoutSider";
  import RecommendedProducts from "../components/RecommendedProducts";

  export default {
    name: "MainView",
    components: {RecommendedProducts, CarouselTwo, LayoutSider},
    data: () => ({collapsed: false})
  }
</script>

<style scoped>

</style>
