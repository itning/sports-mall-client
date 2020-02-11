<template>
  <div class="confirm-box box-shadow box-radius">
    <a-row type="flex" justify="space-around" align="middle">
      <a-col :span="2">
        <img style="width: 80px;height: 80px"
             src="https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i1/2494290284/O1CN01AWEO651Dy73roztZL_!!2494290284.jpg_430x430q90.jpg"
             alt="">
      </a-col>
      <a-col :span="10">
        顺丰正常发罗技g502主宰者hero有线机械游戏鼠标专用电竞CF穿越火线LOL吃鸡宏罗技502电脑鼠标大手配重
      </a-col>
      <a-col :span="5">
        <p class="height-120">数量：
          <a-input-number size="small" :min="1" :max="100000" :defaultValue="Number(produceCount)"
                          @change="onCountChange"/>
        </p>
      </a-col>
      <a-col :span="5"><p class="height-80">价格：￥400</p></a-col>
    </a-row>
    <div style="margin: 24px 6px">
      <p style="margin-bottom: 12px">收货地址：
        <a-config-provider :autoInsertSpaceInButton="false">
          <a-button type="link" @click="handleModifyAddress">{{addressReadOnly?'修改':'保存'}}</a-button>
        </a-config-provider>
      </p>
      <a-textarea placeholder="在此填写收货地址" autosize :readonly="addressReadOnly"/>
    </div>
    <div class="confirm-btn">
      <a-button type="primary">立即下单</a-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ConfirmOrder",
    data() {
      return {
        // 商品ID
        productId: null,
        // 商品购买数量
        produceCount: null,
        // 收货地址框只读
        addressReadOnly: true
      }
    },
    methods: {
      onCountChange(value) {
        console.log('changed', value);
        this.produceCount = value;
      },
      handleModifyAddress() {
        this.addressReadOnly = !this.addressReadOnly;
      }
    },
    created() {
      this.productId = this.$route.params.id;
      this.produceCount = this.$route.params.count;
    }
  }
</script>

<style scoped>
  .confirm-box {
    background-color: #fff;
    padding: 24px;
    margin-bottom: 12px;
  }

  .confirm-btn {
    display: flex;
    flex-direction: row-reverse;
  }
</style>
