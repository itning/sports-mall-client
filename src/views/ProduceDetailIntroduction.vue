<template>
  <div style="margin: 0 auto;width: 100%;min-height: 220px">
    <a-spin :spinning="loading">
      <div v-html="detail"></div>
    </a-spin>
  </div>
</template>

<script>
  import {Get} from "@itning/axios-helper";
  import {API} from "../api";

  export default {
    name: "ProduceDetailIntroduction",
    data() {
      return {
        productId: null,
        detail: "",
        loading: true
      }
    },
    methods: {
      initProduceDetailIntroduction() {
        this.loading = true;
        Get(API.commodity.commodityDetail + this.productId)
          .withSuccessCode(200)
          .withErrorStartMsg("加载详情失败：")
          .do(response => {
            if (response.data.data.detail === null || response.data.data.detail === '') {
              this.detail = "<h1>暂无详情</h1>";
            } else {
              this.detail = response.data.data.detail;
            }
          })
          .doAfter(() => {
            this.loading = false;
          })
      }
    },
    created() {
      this.productId = this.$route.params.id;
      this.initProduceDetailIntroduction();
    }
  }
</script>

<style scoped>

</style>
