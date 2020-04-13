<template>
  <div>
    <a-row>
      <a-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
        <a-carousel effect="fade" autoplay>
          <div v-for="item in horizontalData" :key="item.id">
            <a :href="item.link"><img :src="item.url" alt="" class="carousel_img"></a>
          </div>
        </a-carousel>
      </a-col>
      <a-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6">
        <a-carousel effect="fade" dotPosition="right" autoplay>
          <div v-for="item in verticalData" :key="item.id">
            <a :href="item.link"><img :src="item.url" alt="" class="carousel_vertical_img"></a>
          </div>
        </a-carousel>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import {Get} from "@itning/axios-helper";
  import {API} from "../api";

  export default {
    name: "CarouselTwo",
    data: () => ({
      horizontalData: [],
      verticalData: []
    }),
    methods: {
      initByType(type = 1) {
        Get(`${API.carousel.all}?type=${type}`)
          .withSuccessCode(200)
          .withErrorStartMsg("加载轮播图失败：")
          .do(response => {
            if (type === 1) {
              this.horizontalData = response.data.data;
            } else {
              this.verticalData = response.data.data;
            }
          })
      }
    },
    created() {
      this.initByType(1);
      this.initByType(2);
    }
  }
</script>

<style scoped>
  /*走马灯图片样式*/
  .carousel_img {
    width: 100%;
    height: 400px;
  }

  /*垂直走马灯图片样式*/
  .carousel_vertical_img {
    width: 100%;
    height: 400px;
  }
</style>
