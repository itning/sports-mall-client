<template>
  <div>
    <AdminProductItem v-for="item in data" :key="item.id" :id="item.id" :img="item.imgMain" :title="item.name"
                      :time="item.time" :price="item.price" :stock="item.stock" :type="item.commodityType"
                      :recommended="item.recommended" :productType="productType"
                      @change="handleSave" @del="handleDel"/>
    <div class="product-pagination">
      <a-pagination showSizeChanger
                    @showSizeChange="onShowSizeChange"
                    @change="onPageChange"
                    :total="pagination.totalElements"

      />
    </div>
  </div>
</template>

<script>
  import AdminProductItem from "../components/AdminProductItem";
  import {Get, Patch} from "../http";
  import {API} from "../api";
  import moment from "moment";
  import 'moment/locale/zh-cn';

  moment.locale('zh-cn');

  export default {
    name: "AdminProduct",
    components: {AdminProductItem},
    data() {
      return {
        data: [],
        productType: [],
        pagination: {
          // 数据总数
          totalElements: 0,
          // 页码
          page: 1,
          // 每页数量
          size: 10
        },
      }
    },
    methods: {
      onShowSizeChange(current, pageSize) {
        this.pagination.page = current;
        this.pagination.size = pageSize;
        this.initAllProduct();
      },
      onPageChange(page, pageSize) {
        this.pagination.page = page;
        this.pagination.size = pageSize;
        this.initAllProduct();
      },
      initAllProduct() {
        Get(`${API.commodity.admin_all}?page=${this.pagination.page - 1}&size=${this.pagination.size}`)
          .withSuccessCode(200)
          .withErrorStartMsg("加载商品信息失败：")
          .do(response => {
            this.pagination.totalElements = response.data.data.totalElements;
            this.data = response.data.data.content.map(item => {
              item.time = moment(item.gmtModified).format("YYYY年MM月DD日 HH:mm:ss");
              return item;
            });
          })
      },
      initProductType() {
        Get(API.commodityType.all)
          .withSuccessCode(200)
          .withErrorStartMsg("加载分类失败：")
          .do(response => {
            this.productType = response.data.data;
          })
      },
      handleSave(obj) {
        let send = {id: obj.id};
        if (obj.key === 'commodityType') {
          send['commodityType'] = {id: obj.value};
        } else {
          send[obj.key] = obj.value;
        }
        console.log(send);
        Patch(API.commodity.admin_modify)
          .withSuccessCode(204)
          .withErrorStartMsg("修改失败：")
          .withJSONData(send)
          .do(response => {
            this.$message.success("修改成功");
          })
          .doAfter(() => {
            this.initAllProduct();
          })
      },
      handleDel(id) {
        Patch(API.commodity.admin_modify)
          .withSuccessCode(204)
          .withErrorStartMsg("下架失败：")
          .withJSONData({id: id, takeOff: true})
          .do(response => {
            this.$message.success("下架成功");
          })
          .doAfter(() => {
            this.initAllProduct();
          })
      }
    },
    created() {
      this.initAllProduct();
      this.initProductType();
    }
  }
</script>

<style scoped>
  .product-pagination {
    padding-top: 24px;
    display: flex;
    justify-content: flex-end;
  }
</style>
