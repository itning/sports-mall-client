<template>
  <div class="item-box">
    <div class="item-info">
      <span>创建日期：{{createdTime}}</span>
      <span>订单号：{{id}}</span>
      <span>订单状态：{{statusCN}}</span>
      <a-popconfirm
        title="确定删除该订单吗？"
        @confirm="handleDelOrderBtn"
        okText="确定"
        cancelText="取消"
      >
        <span class="del-order"><a-icon type="delete"/></span>
      </a-popconfirm>
    </div>
    <a-row class="item-content" type="flex" justify="space-around" align="middle">
      <a-col :span="2">
        <img class="item-img"
             :src="img"
             alt="">
      </a-col>
      <a-col :span="8" class="item-title">{{title}}</a-col>
      <a-col :span="4">数量：{{count}}</a-col>
      <a-col :span="4">单价：￥{{price}}</a-col>
      <a-col :span="4">
        <a-button type="link" :disabled="status===5||status===2">{{btnText}}</a-button>
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
      status: Number,
      title: String,
      count: Number,
      price: Number
    },
    name: "OrderItem",
    computed: {
      statusCN: function () {
        switch (this.status) {
          case 1: {
            return "已下单";
          }
          case 2: {
            return "待发货";
          }
          case 3: {
            return "待收货";
          }
          case 4: {
            return "待评价";
          }
          case 5: {
            return "订单已完成";
          }
        }
      },
      btnText: function () {
        switch (this.status) {
          case 1: {
            return "立即付款";
          }
          case 2: {
            return "等待发货";
          }
          case 3: {
            return "确认收货";
          }
          case 4: {
            return "评价商品";
          }
          case 5: {
            return "订单已完成";
          }
        }
      }
    },
    methods: {
      handleDelOrderBtn() {
        console.log("del: " + this.id);
        this.$emit("delOrder", this.id);
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
