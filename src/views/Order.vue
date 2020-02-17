<template>
  <div class="order-box box-shadow box-radius">
    <div class="order-radio">
      <a-radio-group defaultValue="all" buttonStyle="solid" @change="handleRadioBtnChange">
        <a-radio-button value="all">所有订单</a-radio-button>
        <a-radio-button value="1">待付款</a-radio-button>
        <a-radio-button value="2">待发货</a-radio-button>
        <a-radio-button value="3">待收货</a-radio-button>
        <a-radio-button value="4">待评价</a-radio-button>
      </a-radio-group>
    </div>
    <a-empty v-if="loading.empty"/>
    <div v-if="!loading.empty">
      <div>
        <OrderItem v-for="item in data" :key="item.id" :created-time="item.time" :img="item.commodity.imgMain"
                   :id="item.id"
                   :status="item.status" :title="item.commodity.name" :count="item.countNum"
                   :price="item.commodity.price" :sumPrice="item.sumPrice"
                   @delOrder="delOrder" @ok="handleNextStatus"/>
      </div>
      <div class="order-pagination">
        <a-pagination showSizeChanger
                      @showSizeChange="onShowSizeChange"
                      @change="onPageChange"
                      :total="pagination.totalElements"

        />
      </div>
    </div>
    <a-modal title="评价商品" v-model="comment.visible" :confirmLoading="comment.confirmLoading" @ok="handleNewComment">
      <a-textarea placeholder="在此评论..." :rows="4" v-model="comment.newComment"/>
    </a-modal>
  </div>
</template>

<script>
  import OrderItem from "../components/OrderItem";
  import {Del, Get, Post} from "../http";
  import {API} from "../api";
  import moment from "moment";
  import 'moment/locale/zh-cn';

  moment.locale('zh-cn');

  export default {
    name: "Order",
    components: {OrderItem},
    data: () => ({
      pageSize: 20,
      current: 4,
      data: [],
      comment: {
        // 评价模态框
        visible: false,
        confirmLoading: false,
        // 新评论内容
        newComment: '',
        // 评论ID
        id: null
      },
      pagination: {
        // 数据总数
        totalElements: 0,
        // 页码
        page: 1,
        // 每页数量
        size: 10,
        // 订单状态
        status: ''
      },
      loading: {
        empty: false
      }
    }),
    methods: {
      handleRadioBtnChange(e) {
        if (e.target.value === "all") {
          this.pagination.status = "";
        } else {
          this.pagination.status = e.target.value;
        }
        this.initAllOrders();
      },
      onShowSizeChange(current, pageSize) {
        this.pagination.page = current;
        this.pagination.size = pageSize;
        this.initAllOrders();
      },
      onPageChange(page, pageSize) {
        this.pagination.page = page;
        this.pagination.size = pageSize;
        this.initAllOrders();
      },
      initAllOrders() {
        Get(`${API.order.all}?page=${this.pagination.page - 1}&size=${this.pagination.size}&status=${this.pagination.status}`)
          .withSuccessCode(200)
          .withErrorStartMsg("获取订单信息失败：")
          .do(response => {
            this.pagination.totalElements = response.data.data.totalElements;
            if (response.data.data.content.length === 0) {
              this.loading.empty = true;
              this.data = [];
            } else {
              this.loading.empty = false;
              this.data = response.data.data.content.map(item => {
                item.time = moment(item.gmtModified).format("YYYY年MM月DD日 HH:mm:ss");
                return item;
              });
            }
          })
      },
      delOrder(id) {
        Del(API.order.del + id)
          .withSuccessCode(204)
          .withErrorStartMsg("删除失败：")
          .do(response => {
            this.$message.success('删除成功');
          })
          .doAfter(() => {
            this.initAllOrders();
          })
      },
      handleNextStatus(o) {
        if (o.status !== 1 && o.status !== 3 && o.status !== 4) {
          return;
        }
        switch (o.status) {
          case 1: {
            this.pay(o.id);
            break;
          }
          case 3: {
            this.receipt(o.id);
            break;
          }
          case 4: {
            this.comment.id = o.id;
            this.comment.visible = true;
            break;
          }
        }
      },
      pay(id) {
        console.log("pay" + id);
        Post(API.order.pay)
          .withSuccessCode(201)
          .withURLSearchParams({orderId: id})
          .do(response => {
            this.$message.success('付款成功');
          })
          .doAfter(() => {
            this.initAllOrders();
          })
      },
      receipt(id) {
        console.log("receipt" + id);
        Post(API.order.receipt)
          .withSuccessCode(201)
          .withURLSearchParams({orderId: id})
          .do(response => {
            this.$message.success('收货成功');
          })
          .doAfter(() => {
            this.initAllOrders();
          })
      },
      handleNewComment() {
        if (this.comment.newComment.trim() === '') {
          this.$message.error("必须填写内容");
          return;
        }
        this.comment.confirmLoading = true;
        Post(API.comment.add)
          .withSuccessCode(201)
          .withErrorStartMsg("评论失败：")
          .withURLSearchParams({orderId: this.comment.id, content: this.comment.newComment})
          .do(response => {
            this.$message.success("评论成功");
            this.comment.visible = false;
          })
          .doAfter(() => {
            this.comment.confirmLoading = false;
            this.initAllOrders();
          })
      }
    },
    created() {
      this.initAllOrders();
    }
  }
</script>

<style scoped>
  .order-box {
    background-color: #fff;
    padding: 12px;
    margin-bottom: 12px;
  }

  .order-pagination {
    padding-top: 24px;
    display: flex;
    justify-content: flex-end;
  }

  .order-radio {
    height: 40px;
    margin-top: 6px;
  }
</style>
