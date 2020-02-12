<template>
  <div>
    <a-layout class="box-shadow" style="padding: 24px 0; background: #fff">
      <a-layout-sider collapsedWidth="0" style="background: #fff" v-if="showSider">
        <LayoutSider :data="commodityTypeData"/>
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
  import {Get} from "../http";
  import {API} from "../api";

  export default {
    name: "MainView",
    components: {RecommendedProducts, CarouselTwo, LayoutSider},
    data: () => ({
      commodityTypeData: [],
      showSider: true
    }),
    methods: {
      initAllCommodityType() {
        Get(API.commodityType.all)
          .withSuccessCode(200)
          .withErrorStartMsg("加载分类失败：")
          .do(response => {
            if (response.data.data.length === 0) {
              this.showSider = false;
            } else {
              this.showSider = true;
              this.commodityTypeData = response.data.data;
            }
          })
      }
    },
    created() {
      this.initAllCommodityType();
    }
  }
</script>

<style scoped>

</style>
