<template>
  <div>
    <p>商品评价数：{{data.length}}</p>
    <a-empty v-if="loading.empty"/>
    <div v-if="!loading.empty">
      <div>
        <CommentItem v-for="item in data" :key="item.id" :username="item.username" :content="item.content"
                     :time="item.time"/>
      </div>
      <div class="comment-pagination">
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
  import CommentItem from "../components/CommentItem";
  import {Get} from "@itning/axios-helper";
  import {API} from "../api";
  import moment from "moment";
  import 'moment/locale/zh-cn';

  moment.locale('zh-cn');

  export default {
    name: "ProduceDetailComment",
    components: {CommentItem},
    data() {
      return {
        productId: null,
        pageSize: 20,
        current: 4,
        data: [],
        pagination: {
          // 数据总数
          totalElements: 0,
          // 页码
          page: 1,
          // 每页数量
          size: 10
        },
        loading: {
          empty: false
        }
      }
    },
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
      initProduceDetailComment() {
        Get(`${API.comment.all}${this.productId}?page=${this.pagination.page - 1}&size=${this.pagination.size}`)
          .withSuccessCode(200)
          .withErrorStartMsg("加载评论失败：")
          .do(response => {
            this.pagination.totalElements = response.data.data.totalElements;
            if (response.data.data.content.length === 0) {
              this.loading.empty = true;
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
      this.productId = this.$route.params.id;
      this.initProduceDetailComment();
    }
  }
</script>

<style scoped>
  .comment-pagination {
    padding-top: 24px;
    display: flex;
    justify-content: flex-end;
  }
</style>
