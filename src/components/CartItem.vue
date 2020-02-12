<template>
  <div class="item-box">
    <div class="item-info">
      <span>加入日期：{{time}}</span>
      <span class="del-order" @click="handleDelCartBtn"><a-icon type="delete"/></span>
    </div>
    <a-row class="item-content" type="flex" justify="space-around" align="middle">
      <a-col :span="2">
        <img class="item-img"
             :src="img"
             alt="">
      </a-col>
      <a-col :span="5" class="item-title">{{title}}</a-col>
      <a-col :span="3">单价：￥{{price}}</a-col>
      <a-col :span="5">数量：
        <a-input-number size="small" :min="1" :max="100000" :defaultValue="count" @change="onCountChange"/>
      </a-col>
      <a-col :span="4">金额：￥{{totalPrice}}</a-col>
      <a-col :span="3">
        <a-button type="link" @click="handleBuyBtnClick">立即购买</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    props: {
      id: String,
      img: String,
      title: String,
      price: Number,
      count: Number,
      time: String
    },
    name: "CartItem",
    data() {
      return {
        // 应向服务器发送该数量
        syncCount: this.count
      }
    },
    computed: {
      totalPrice: function () {
        return (this.syncCount * this.price).toFixed(2);
      }
    },
    methods: {
      handleBuyBtnClick() {
        this.$router.push(`/confirm_order/${this.id}/${this.syncCount}`).catch(error => {
        })
      },
      onCountChange(value) {
        this.syncCount = value;
        this.$emit("countChange", {id: this.id, value: value});
      },
      handleDelCartBtn() {
        this.$emit("delCart", this.id);
      }
    }
  }
</script>

<style scoped>
  .item-box {
    border: 2px solid #f1f1f1;
    margin-bottom: 12px;
  }

  .item-img {
    max-width: 100%;
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

  .del-order {
    float: right;
    cursor: pointer;
  }

  .del-order:hover {
    color: #1890ff;
  }
</style>
