<template>
  <div class="box-shadow box-style">
    <p class="mail-title">
      <a-icon type="caret-right"/>
      推荐商品
    </p>
    <a-empty v-if="loading.empty"/>
    <a-spin :spinning="loading.all">
      <div class="commodity-items">
        <CommodityItem v-for="item in data" :key="item.id" :id="item.id" :img="item.imgMain" :sales="item.sales"
                       :price="item.price"
                       :title="item.name"/>
        <i></i><i></i><i></i><i></i><i></i>
      </div>
    </a-spin>
  </div>
</template>

<script>
  import CommodityItem from "./CommodityItem";
  import {Get} from "../http";
  import {API} from "../api";

  export default {
    name: "RecommendedProducts",
    components: {CommodityItem},
    data: () => ({
      loading: {all: true, empty: false},
      data: []
    }),
    methods: {
      initRecommendedData() {
        Get(API.commodity.recommend)
          .withSuccessCode(200)
          .withErrorStartMsg("推荐商品加载失败：")
          .do(response => {
            this.data = response.data.data;
            if (this.data.length === 0) {
              this.loading.empty = true;
            }
          })
          .doAfter(() => {
            this.loading.all = false;
          })
      }
    },
    created() {
      this.initRecommendedData();
    }
  }
</script>

<style scoped>
  .box-style {
    background-color: #fff;
    margin: 12px 0;
    padding-bottom: 12px;
    min-height: 250px;
  }

  .mail-title {
    color: orange;
    padding-top: 12px;
    margin-left: 12px;
    font-size: 1.5em;
  }

  .commodity-items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 12px;
  }

  .commodity-items > i {
    width: 238px;
    margin-right: 10px;
  }
</style>
