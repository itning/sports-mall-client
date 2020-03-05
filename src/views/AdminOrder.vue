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
        <AdminOrderItem v-for="item in data" :key="item.id" :created-time="item.time" :img="item.commodity.imgMain"
                        :id="item.id"
                        :status="item.status" :title="item.commodity.name" :count="item.countNum"
                        :price="item.commodity.price" :sumPrice="item.sumPrice"
                        @delOrder="delOrder" @ok="handleNextStatus" @changePrice="handleChangePrice"/>
      </div>
      <div class="order-pagination">
        <a-pagination showSizeChanger
                      @showSizeChange="onShowSizeChange"
                      @change="onPageChange"
                      :total="pagination.totalElements"

        />
      </div>
    </div>
    <a-modal title="发货" v-model="expressInformation.visible" :confirmLoading="expressInformation.confirmLoading"
             @ok="handleHip">
      <a-textarea placeholder="快递信息..." :rows="4" v-model="expressInformation.newHip"/>
    </a-modal>
  </div>
</template>

<script>
  import OrderItem from "../components/OrderItem";
  import {Delete, Get, Post} from "@itning/axios-helper";
  import {API} from "../api";
  import moment from "moment";
  import 'moment/locale/zh-cn';
  import AdminOrderItem from "../components/AdminOrderItem";

  moment.locale('zh-cn');

  export default {
    name: "AdminOrder",
    components: {AdminOrderItem, OrderItem},
    data: () => ({
      pageSize: 20,
      current: 4,
      data: [],
      expressInformation: {
        // 快递模态框
        visible: false,
        confirmLoading: false,
        // 新快递内容
        newHip: '',
        // ID
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
        Get(`${API.order.admin_all}?page=${this.pagination.page - 1}&size=${this.pagination.size}&status=${this.pagination.status}`)
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
        Delete(API.order.del + id)
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
        if (o.status === 2) {
          this.expressInformation.id = o.id;
          this.expressInformation.visible = true;
        }
      },
      handleHip() {
        if (this.expressInformation.newHip.trim() === '') {
          this.$message.error("必须填写内容");
          return;
        }
        this.expressInformation.confirmLoading = true;
        Post(API.order.hip)
          .withSuccessCode(201)
          .withErrorStartMsg("发货失败：")
          .withURLSearchParams({
            orderId: this.expressInformation.id,
            expressInformation: this.expressInformation.newHip
          })
          .do(response => {
            this.$message.success("发货成功");
            this.expressInformation.visible = false;
          })
          .doAfter(() => {
            this.expressInformation.confirmLoading = false;
            this.initAllOrders();
          })
      },
      handleChangePrice(obj) {
        Post(API.order.admin_modify_price)
          .withSuccessCode(201)
          .withErrorStartMsg("修改总价失败：")
          .withURLSearchParams(obj)
          .do(response => {
            this.$message.success("修改总价成功");
          })
          .doAfter(() => {
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
