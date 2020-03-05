<template>
  <div class="search-box">
    <p class="search-info">搜索 ”{{keyword}}“ 共有{{data.length}}件</p>
    <a-empty v-if="loading.empty"/>
    <div v-if="!loading.empty">
      <div style="height: 40px;padding-left: 12px">
        <a-radio-group defaultValue="gmtModified" buttonStyle="solid" @change="handleSortRadioChange">
          <a-radio-button value="gmtModified">综合排序</a-radio-button>
          <a-radio-button value="sales,desc">销量排序</a-radio-button>
          <a-radio-button value="price,desc">价格从高到低排序</a-radio-button>
          <a-radio-button value="price">价格从低到高排序</a-radio-button>
        </a-radio-group>
      </div>
      <div class="commodity-items">
        <CommodityItem v-for="item in data" :key="item.id" :id="item.id" :img="item.imgMain" :sales="item.sales"
                       :price="item.price"
                       :title="item.name"/>
        <i></i><i></i><i></i><i></i><i></i>
      </div>
      <div class="search-pagination">
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
  import CommodityItem from "../components/CommodityItem";
  import {Get} from "@itning/axios-helper";
  import {API} from "../api";
  import moment from "moment";

  export default {
    name: "Search",
    components: {CommodityItem},
    data() {
      return {
        keyword: null,
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
        loading: {
          empty: false
        },
        data: []
      }
    },
    watch: {
      keyword: function () {
        this.initProduceData();
      }
    },
    methods: {
      handleSortRadioChange(e) {
        this.pagination.sort = e.target.value;
        this.initProduceData();
      },
      onShowSizeChange(current, pageSize) {
        this.pagination.page = current;
        this.pagination.size = pageSize;
        this.initProduceData();
      },
      onPageChange(page, pageSize) {
        this.pagination.page = page;
        this.pagination.size = pageSize;
        this.initProduceData();
      },
      initProduceData() {
        Get(`${API.commodity.search}${this.keyword}?page=${this.pagination.page - 1}&size=${this.pagination.size}&sort=${this.pagination.sort}`)
          .withSuccessCode(200)
          .withErrorStartMsg("搜索失败：")
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
      }
    },
    created() {
      this.keyword = this.$route.params.keyword;
    },
    beforeRouteUpdate(to, from, next) {
      this.keyword = to.params.keyword;
      next();
    }
  }
</script>

<style scoped>
  .search-box {
    background-color: #fff;
    min-height: 200px;
  }

  .search-info {
    padding: 12px;
    color: #9ca0aa;
    font-size: 1em;
    height: 12px;
    line-height: 12px;
  }

  .search-pagination {
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
