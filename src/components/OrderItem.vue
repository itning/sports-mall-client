<template>
  <div class="item-box">
    <div class="item-info">
      <span>创建日期：{{createdTime}}</span>
      <span>订单号：{{id}}</span>
      <span>订单状态：{{status}}</span>
      <span class="del-order" @click="handleDelOrderBtn"><a-icon type="delete"/></span>
    </div>
    <a-row class="item-content" type="flex" justify="space-around" align="middle">
      <a-col :span="2">
        <img class="item-img"
             :src="img"
             alt="">
      </a-col>
      <a-col :span="8" class="item-title">{{title}}</a-col>
      <a-col :span="4">数量：{{count}}</a-col>
      <a-col :span="4">价格：￥{{price}}</a-col>
      <a-col :span="4">
        <a-button type="link">立即评价</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    props: {
      img: String,
      createdTime: String,
      id: String,
      status: String,
      title: String,
      count: Number,
      price: Number
    },
    name: "OrderItem",
    methods: {
      handleDelOrderBtn() {
        console.log("del: " + this.id);
      }
    }
  }
</script>

<style scoped>
  .item-box {
    margin-top: 12px;
    border: 2px solid #f1f1f1;
  }

  .item-content {
    margin: 12px 3px;
  }

  .item-title {
    font-size: 0.9em;
  }

  .item-info {
    background-color: #f1f1f1;
    padding: 6px;
    margin-bottom: 12px;
  }

  .item-info span {
    color: black;
    margin-right: 12px;
  }

  .item-img {
    max-width: 100%;
  }

  .del-order {
    float: right;
    cursor: pointer;
  }

  .del-order:hover {
    color: #1890ff;
  }
</style>
