<template>
  <div>
    <router-link :to="'/product_detail/'+id">
      <div class="item-box">
        <div class="item-img">
          <img :src="img" alt="">
        </div>
        <p class="item-title">{{title}}</p>
        <a-row type="flex" justify="space-between">
          <a-col :span="12" class="item-price">￥<span>{{price}}</span></a-col>
          <a-col :span="12" class="item-sales">销量：{{sales}}</a-col>
        </a-row>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    props: {
      // ID
      id: String,
      // 图片
      img: String,
      // 价格
      price: Number,
      // 销量
      sales: Number,
      // 标题
      title: String
    },
    name: "CommodityItem"
  }
</script>

<style scoped>
  .item-box {
    padding: 20px 20px 0 20px;
    width: 238px;
    height: 334px;
    border: 1px solid transparent;
    overflow: hidden;
  }

  .item-box:hover {
    border: 1px solid orange;

  }

  .item-img {
    width: 197px;
    height: 197px;
    overflow: hidden;
  }

  .item-img img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .item-title {
    margin-top: 7px;
    line-height: 22px;
    height: 44px;
    font-size: 14px;
    color: #666;
    font-weight: normal;
    transition: color 0.3s;
    overflow: hidden;
  }

  .item-sales {
    line-height: 32px;
    text-align: end;
    font-size: 0.9em;
    color: #9ca0aa;
  }

  .item-price {
    text-align: start;
    color: #f40;
    line-height: 32px;
  }

  .item-price span {
    text-align: start;
    font-size: 1.6em;
    color: #f40;
    line-height: 32px;
  }
</style>
