<template>
  <a-carousel arrows dotsClass="slick-dots slick-thumb">
    <a slot="customPaging" slot-scope="props">
      <img :src="getImgUrl(props.i)"/>
    </a>
    <div v-for="item in imgs">
      <img :src="item"/>
    </div>
  </a-carousel>
</template>

<script>
  export default {
    props: {
      imgs: Array
    },
    name: "ProductDetailCarousel",
    data() {
      return {
      };
    },
    methods: {
      getImgUrl(i) {
        return this.imgs[i];
      },
    },
  }
</script>

<style scoped>
  .ant-carousel >>> .slick-dots {
    height: auto;
  }

  .ant-carousel >>> .slick-slide img {
    border: 5px solid #fff;
    display: block;
    margin: auto;
    max-width: 80%;
  }

  .ant-carousel >>> .slick-thumb {
    bottom: -45px;
  }

  .ant-carousel >>> .slick-thumb li {
    width: 60px;
    height: 45px;
  }

  .ant-carousel >>> .slick-thumb li img {
    width: 100%;
    height: 100%;
    filter: grayscale(100%);
  }

  .ant-carousel >>> .slick-thumb li.slick-active img {
    filter: grayscale(0%);
  }
</style>
