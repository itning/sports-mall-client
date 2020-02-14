<template>
  <div>
    <p>商品共计：{{pagination.totalElements}}
      <a-button type="link">新增商品</a-button>
    </p>
    <AdminProductItem v-for="item in data" :key="item.id" :id="item.id" :img="item.imgMain" :title="item.name"
                      :time="item.time" :price="item.price" :stock="item.stock" :type="item.commodityType"
                      :recommended="item.recommended" :productType="productType"
                      @change="handleSave" @del="handleDel" @btnClick="handleClick"/>
    <div class="product-pagination">
      <a-pagination showSizeChanger
                    @showSizeChange="onShowSizeChange"
                    @change="onPageChange"
                    :total="pagination.totalElements"

      />
    </div>
    <div>
      <a-modal
        title="轮播图和商品介绍"
        :visible="modify.visible"
        @ok="handleOk"
        :confirmLoading="modify.confirmLoading"
        @cancel="handleModalClose"
      >
        <div style="margin:12px 0">
          <p>轮播图设置：</p>
          <div style="margin-bottom: 12px" v-for="(item,index) in modify.imgSecondArray">
            <a-input placeholder="轮播图片" style="width: 90%" v-model="modify.imgSecondArrayNew[index]"/>
            <a-icon type="close" style="margin-left: 6px" @click="modify.imgSecondArrayNew.splice(index,1)"/>
          </div>
          <a-button type="primary" @click="handleAddInput">添加轮播图</a-button>
        </div>
        <div>
          <p>商品介绍：</p>
          <a-textarea v-model="modify.detail"/>
        </div>
      </a-modal>
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
        modify: {
          modifyId: '',
          detailId: '',
          detail: '',
          visible: false,
          confirmLoading: false,
          imgSecondArray: [],
          imgSecondArrayNew: [],
        },
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
      },
      handleClick(id) {
        this.modify.modifyId = id;
        this.modify.detail = "加载中...";
        Get(API.commodity.commodityDetail + id)
          .withSuccessCode(200)
          .withErrorStartMsg("加载详情失败：")
          .do(response => {
            this.modify.detailId = response.data.data.id;
            this.modify.detail = response.data.data.detail;
          })
          .doAfter(() => {
            const t = this.data.filter(item => item.id === id)[0];
            this.modify.imgSecondArray = t.imgSecond.split(';');
            this.modify.imgSecondArrayNew = this.modify.imgSecondArray;
            this.modify.visible = true;
          });
      },
      handleAddInput() {
        this.modify.imgSecondArray.push("");
      },
      handleModalClose() {
        this.modify.visible = false;
        this.modify.imgSecondArray = [];
        this.modify.imgSecondArrayNew = [];
        this.modify.detail = '';
      },
      handleOk() {
        let imgSecond = '';
        this.modify.imgSecondArrayNew.forEach(item => {
          if (item.trim() !== '') {
            imgSecond += item + ';'
          }
        });
        imgSecond = imgSecond.substring(0, imgSecond.length - 1);
        this.modify.confirmLoading = true;
        Patch(API.commodity.admin_modify)
          .withSuccessCode(204)
          .withErrorStartMsg("修改失败：")
          .withJSONData({id: this.modify.modifyId, imgSecond: imgSecond})
          .do(response => {
            this.$message.success("修改轮播图成功");
            this.modify.visible = false;
          })
          .doAfter(() => {
            this.modify.confirmLoading = false;
            this.initAllProduct();
          });
        Patch(API.commodity.admin_modify_detail)
          .withSuccessCode(204)
          .withErrorStartMsg("修改详情失败：")
          .withJSONData({id: this.modify.detailId, detail: this.modify.detail, commodity: {id: this.modify.modifyId}})
          .do(response => {
            this.$message.success("修改详情成功");
          })
      },
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
