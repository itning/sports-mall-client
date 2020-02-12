<template>
  <div class="cart-box box-shadow box-radius">
    <div class="cart-info">
      <span>购物车 商品数量：{{data.length}}</span>
    </div>
    <a-empty v-if="loading.empty"/>
    <div v-if="!loading.empty">
      <CartItem v-for="item in data" :key="item.id" :id="item.commodity.id" :img="item.commodity.imgMain"
                :title="item.commodity.name"
                :price="item.commodity.price"
                :count="item.countNum" :time="item.time" @countChange="handleCountChange"
                @delCart="handleDelCart"/>
      <div class="cart-pagination">
        <a-pagination showSizeChanger
                      @showSizeChange="onShowSizeChange"
                      @change="onPageChange"
                      :total="pagination.totalElements"

        />
      </div>
    </div>
  </div>
</template>

<script>
  import CartItem from "../components/CartItem";
  import {Del, Get, Post} from "../http";
  import {API} from "../api";
  import moment from "moment";

  export default {
    name: "Cart",
    components: {CartItem},
    data: () => ({
        pageSize: 20,
        current: 4,
        pagination: {
          // 数据总数
          totalElements: 0,
          // 页码
          page: 1,
          // 每页数量
          size: 10
        },
        data: [],
        loading: {empty: false}
      }
    ),
    methods: {
      onShowSizeChange(current, pageSize) {
        this.pagination.page = current;
        this.pagination.size = pageSize;
        this.initProduceDetailComment();
      },
      onPageChange(page, pageSize) {
        this.pagination.page = page;
        this.pagination.size = pageSize;
        this.initProduceDetailComment();
      },
      handleCountChange(value) {
        Post(API.cart.add)
          .withURLSearchParams({commodityId: value.id, num: value.value, cumulative: false})
          .withSuccessCode(201)
          .withErrorStartMsg("操作失败：")
          .withOnceErrorToast(true)
          .do(response => {
          })
      },
      handleDelCart(id) {
        console.log(id);
        Del(API.cart.del + id)
          .withSuccessCode(204)
          .withErrorStartMsg("购物车删除失败：")
          .do(response => {
            this.$message.success("删除成功");
          })
          .doAfter(() => {
            this.initCartData();
          })
      },
      initCartData() {
        Get(`${API.cart.all}?page=${this.pagination.page - 1}&size=${this.pagination.size}`)
          .withSuccessCode(200)
          .withErrorStartMsg("加载购物车数据失败：")
          .do(response => {
            this.pagination.totalElements = response.data.data.totalElements;
            if (response.data.data.content.length === 0) {
              this.loading.empty = true;
              this.data = [];
            } else {
              this.loading.empty = false;
              this.data = response.data.data.content.map(item => {
                item.time = moment(item.gmtCreate).format("YYYY年MM月DD日 HH:mm:ss");
                return item;
              });
            }
          })
      }
    },
    created() {
      this.initCartData();
    }
  }
</script>

<style scoped>
  .cart-box {
    background-color: #fff;
    padding: 12px;
    margin-bottom: 12px;
  }

  .cart-pagination {
    padding-top: 3px;
    display: flex;
    justify-content: flex-end;
  }

  .cart-info {
    height: 40px;
    line-height: 30px;
  }
</style>
