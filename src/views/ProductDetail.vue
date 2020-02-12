<template>
  <div class="product-box box-shadow box-radius">
    <a-row type="flex" justify="space-around" align="top" style="margin-top: 12px">
      <a-col :span="10">
        <ProductDetailCarousel :imgs="imgs"/>
      </a-col>
      <a-col :span="14" class="product-info">
        <div class="product-title">{{productData.name}}</div>
        <div class="product-price">价格：￥<span>{{productData.price}}</span></div>
        <div>数量：
          <a-input-number size="small" :min="1" :max="100000" :defaultValue="productCount" @change="onCountChange"/>
          <span>&nbsp;件</span>
        </div>
        <div>
          <span>库存：<span style="color: red">{{productData.stock}}</span></span>
        </div>
        <div>
          <span>销量：<span style="color: red">{{productData.sales}}</span></span>
        </div>
        <div>
          <a-button type="primary" @click="handleBuyBtnClick">立即购买</a-button>
          <a-button>加入购物车</a-button>
        </div>
      </a-col>
    </a-row>
    <div style="margin-top: 80px;padding-left: 24px">
      <a-radio-group defaultValue="a" @change="onProductRadioChange">
        <a-radio-button value="a">商品详情</a-radio-button>
        <a-radio-button value="b">累计评价</a-radio-button>
      </a-radio-group>
    </div>
    <div style="margin: 24px">
      <router-view name="product"/>
    </div>
  </div>
</template>

<script>
  import ProductDetailCarousel from "../components/ProductDetailCarousel";
  import {Get} from "../http";
  import {API} from "../api";

  export default {
    name: "ProductDetail",
    components: {ProductDetailCarousel},
    data() {
      return {
        productId: null,
        productCount: 1,
        imgs: [],
        productData: {}
      }
    },
    methods: {
      onCountChange(value) {
        console.log('changed', value);
        this.productCount = value;
      },
      onProductRadioChange(e) {
        if (e.target.value === "a") {
          this.$router.push("/product_detail/" + this.productId).catch(err => {
          });
        } else {
          this.$router.push("/product_detail/" + this.productId + "/comment").catch(err => {
          });
        }
        window.scrollTo(0,0);
      },
      handleBuyBtnClick() {
        this.$router.push(`/confirm_order/${this.productId}/${this.productCount}`).catch(err => {
        });
      },
      initProductDetail() {
        Get(API.commodity.one + this.productId)
          .withSuccessCode(200)
          .withErrorStartMsg("商品加载失败；")
          .do(response => {
            this.productData = response.data.data;
            this.imgs = this.productData.imgSecond.split(";");
          })
          .doAfter(() => {

          })
          .watchError(errorResponse => {
            this.router.back();
          })
      }
    },
    created() {
      this.productId = this.$route.params.id;
      this.initProductDetail();
    },
    beforeRouteUpdate(to, from, next) {
      this.productId = to.params.id;
      next();
    }
  }
</script>

<style scoped>
  .product-box {
    padding: 12px;
    margin-bottom: 12px;
    background-color: #fff;
    min-height: 550px;
  }

  .product-title {
    font-size: 1.5em;
    color: black;
    font-weight: bold;
  }

  .product-price {
    color: red;
  }

  .product-price span {
    font-size: 2.5em;
  }

  .product-info {

  }

  .product-info div {
    margin-bottom: 24px;
    max-width: 80%;
  }

  .product-info button {
    margin-right: 12px;
    margin-top: 12px;
  }
</style>
