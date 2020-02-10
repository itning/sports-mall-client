<template>
  <div>
    <a-row>
      <a-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
        <a-carousel effect="fade" autoplay>
          <div><a href=""><img src="image/p1.webp" alt="" class="carousel_img"></a>
          </div>
          <div><a href=""><img src="image/p2.jpg" alt="" class="carousel_img"></a>
          </div>
          <div><a href=""><img src="image/p3.webp" alt="" class="carousel_img"></a>
          </div>
          <div><a href=""><img src="image/p4.webp" alt="" class="carousel_img"></a>
          </div>
        </a-carousel>
      </a-col>
      <a-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6">
        <a-carousel effect="fade" vertical autoplay>
          <div><a href=""><img src="image/v1.jpg" alt="" class="carousel_vertical_img"></a>
          </div>
          <div><a href=""><img src="image/v2.png" alt="" class="carousel_vertical_img"></a>
          </div>
          <div><a href=""><img src="image/v1.jpg" alt="" class="carousel_vertical_img"></a>
          </div>
          <div><a href=""><img src="image/v2.png" alt="" class="carousel_vertical_img"></a>
          </div>
        </a-carousel>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    name: "CarouselTwo"
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
