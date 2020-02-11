<template>
  <div class="item-box">
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
      <a-col :span="3">金额：￥{{totalPrice}}</a-col>
      <a-col :span="4">
        <a-button type="link">立即购买</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    props: {
      img: String,
      title: String,
      price: Number,
      count: Number
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
        return this.syncCount * this.price;
      }
    },
    methods: {
      onCountChange(value) {
        console.log('changed', value);
        this.syncCount = value;
      },
    }
  }
</script>

<style scoped>
  .item-box {
    border: 1px solid #9ca0aa;
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
</style>
