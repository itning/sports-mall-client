<template>
  <div class="confirm-box box-shadow box-radius">
    <p class="confirm-title">确认订单：</p>
    <a-row type="flex" justify="space-around" align="middle">
      <a-col :span="2">
        <img class="confirm-img"
             :src="productData.imgMain"
             alt="">
      </a-col>
      <a-col :span="10">
        {{productData.name}}
      </a-col>
      <a-col :span="5">
        <p>数量：
          <a-input-number size="small" :min="1" :max="100000" :defaultValue="Number(produceCount)"
                          @change="onCountChange"/>
        </p>
      </a-col>
      <a-col :span="5"><p>单价：￥{{productData.price}}</p></a-col>
    </a-row>
    <div class="confirm-address-box">
      <p>收货地址：
        <a-config-provider :autoInsertSpaceInButton="false">
          <a-button type="link" @click="handleModifyAddress">{{addressReadOnly?'修改':'保存'}}</a-button>
        </a-config-provider>
      </p>
      <a-textarea placeholder="在此填写收货地址" autoSize :read-only="addressReadOnly" ref="addressTextarea" v-model="address"/>
    </div>
    <div class="confirm-btn">
      <a-button type="primary" @click="handleOrder" :loading="loading.order">立即下单</a-button>
    </div>
  </div>
</template>

<script>
  import {Get, Patch, Post} from "@itning/axios-helper";
  import {API} from "../api";

  export default {
    name: "ConfirmOrder",
    data() {
      return {
        // 商品ID
        productId: null,
        // 商品购买数量
        produceCount: null,
        // 收货地址框只读
        addressReadOnly: true,
        // 商品数据
        productData: {},
        // 收货地址
        address: '',
        loading: {
          order: false
        }
      }
    },
    methods: {
      onCountChange(value) {
        console.log('changed', value);
        this.produceCount = value;
      },
      handleModifyAddress() {
        this.addressReadOnly = !this.addressReadOnly;
        if (this.addressReadOnly) {
          Patch(API.user.modify)
            .withSuccessCode(204)
            .withErrorStartMsg("修改地址失败：")
            .withJson({address: this.address})
            .do(response => {
              this.$message.success('保存成功');
            })
        } else {
          this.$refs.addressTextarea.focus();
        }
      },
      initProductDetail() {
        Get(API.commodity.one + this.productId)
          .withSuccessCode(200)
          .withErrorStartMsg("商品加载失败；")
          .do(response => {
            this.productData = response.data.data;
          })
          .withErrorHandle(errorResponse => {
            this.$router.back();
          })
      },
      handleOrder() {
        Post(API.order.add)
          .withSuccessCode(201)
          .withErrorStartMsg("下单失败：")
          .withURLSearchParams({commodityId: this.productId, count: this.produceCount, address: this.address})
          .do(response => {
            this.$message.success("下单成功");
            this.$router.replace("/order").catch(error => {
            });
          })
      }
    },
    created() {
      this.productId = this.$route.params.id;
      this.produceCount = this.$route.params.count;
      this.initProductDetail();
      this.address = this.$user.loginUser().address;
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

  .confirm-title {
    margin: 24px 6px;
  }

  .confirm-img {
    width: 80px;
    height: 80px;
  }

  .confirm-address-box {
    margin: 24px 6px;
  }

  .confirm-address-box p {
    margin-bottom: 12px;
  }
</style>
