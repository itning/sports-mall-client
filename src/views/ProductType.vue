<template>
  <div class="product-type-box">
    <a-spin :spinning="loading.all">
      <p class="product-type-info">{{typeName}}分类商品 共计：{{data.length}}</p>
      <a-empty v-if="showEmpty">
        <span slot="description">该分类下没有商品</span>
        <a-button type="primary" @click="handleReturnPageBtnClick">返回</a-button>
      </a-empty>
      <div v-if="data.length!==0">
        <div style="height: 40px;padding-left: 12px">
          <a-radio-group defaultValue="gmtModified" buttonStyle="solid" @change="handleSortRadioChange">
            <a-radio-button value="gmtModified">综合排序</a-radio-button>
            <a-radio-button value="sales,desc">销量排序</a-radio-button>
            <a-radio-button value="price,desc">价格从高到低排序</a-radio-button>
            <a-radio-button value="price">价格从低到高排序</a-radio-button>
          </a-radio-group>
        </div>
        <a-spin :spinning="loading.item">
          <div class="commodity-items">
            <CommodityItem v-for="item in data" :key="item.id" :id="item.id" :img="item.imgMain" :sales="item.sales"
                           :price="item.price"
                           :title="item.name"/>
            <i></i><i></i><i></i><i></i><i></i>
          </div>
        </a-spin>
        <div class="product-type-pagination">
          <a-pagination showSizeChanger
                        @showSizeChange="onShowSizeChange"
                        @change="onPageChange"
                        :total="pagination.totalElements"

          />
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
  import CommodityItem from "../components/CommodityItem";
  import {Get} from "@itning/axios-helper";
  import {API} from "../api";

  export default {
    name: "ProductType",
    components: {CommodityItem},
    data() {
      return {
        // 商品分类ID
        id: null,
        pagination: {
          // 数据总数
          totalElements: 0,
          // 页码
          page: 1,
          // 每页数量
          size: 10,
          // 排序
          sort: 'gmtModified'
        },
        // 商品数据
        data: [],
        // 商品分类名
        typeName: '',
        // 显示空状态
        showEmpty: false,
        // 加载进度
        loading: {all: true, item: true}
      }
    },
    methods: {
      handleReturnPageBtnClick() {
        this.$router.back();
      },
      handleSortRadioChange(e) {
        this.pagination.sort = e.target.value;
        this.initAllCommodityByType();
      },
      onShowSizeChange(current, pageSize) {
        this.pagination.page = current;
        this.pagination.size = pageSize;
        this.initAllCommodityByType();
      },
      onPageChange(page, pageSize) {
        this.pagination.page = page;
        this.pagination.size = pageSize;
        this.initAllCommodityByType();
      },
      initAllCommodityByType() {
        this.loading.item = true;
        Get(`${API.commodity.type}?typeId=${this.id}&page=${this.pagination.page - 1}&size=${this.pagination.size}&sort=${this.pagination.sort}`)
          .withSuccessCode(200)
          .withErrorStartMsg("获取分类商品失败：")
          .do(response => {
            this.data = response.data.data.content;
            this.pagination.totalElements = response.data.data.totalElements;
            if (this.data.length !== 0) {
              this.typeName = this.data[0].commodityType.name;
            } else {
              this.showEmpty = true;
            }
          })
          .doAfter(() => {
            this.loading.all = false;
            this.loading.item = false;
          })
      }
    },
    created() {
      this.id = this.$route.params.id;
      this.initAllCommodityByType();
    },
    beforeRouteUpdate(to, from, next) {
      this.id = to.params.id;
      next();
    }
  }
</script>

<style scoped>
  .product-type-box {
    min-height: 250px;
    background-color: #fff;
  }

  .product-type-info {
    padding: 12px;
    color: #9ca0aa;
    font-size: 1em;
    height: 12px;
    line-height: 12px;
  }

  .product-type-pagination {
    padding-bottom: 24px;
    display: flex;
    justify-content: flex-end;
  }

  .commodity-items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 12px;
  }

  .commodity-items > i {
    width: 238px;
    margin-right: 10px;
  }
</style>
