<template>
  <div>
    <p>商品总评分：5分</p>
    <div>
      <CommentItem/>
      <CommentItem/>
      <CommentItem/>
    </div>
    <div class="comment-pagination">
      <a-pagination showSizeChanger
                    @showSizeChange="onShowSizeChange"
                    :defaultCurrent="3"
                    :total="500"

      />
    </div>
  </div>
</template>

<script>
  import CommentItem from "../components/CommentItem";

  export default {
    name: "ProduceDetailComment",
    components: {CommentItem},
    data() {
      return {
        productId: null,
        pageSize: 20,
        current: 4,
      }
    },
    methods: {
      onShowSizeChange(current, pageSize) {
        console.log(current, pageSize);
      },
    },
    created() {
      this.productId = this.$route.params.id;
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
