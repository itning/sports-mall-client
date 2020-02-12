<template>
  <div class="item-comment">
    <a-row type="flex" justify="space-around" align="middle">
      <a-col :span="19" style="padding:12px">
        {{content}}
      </a-col>
      <a-col :span="5" class="item-buy">
        <div>{{time}}</div>
        <div>买家：{{username}}</div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    props: {
      username: String,
      content: String,
      time: String
    },
    name: "CommentItem"
  }
</script>

<style scoped>
  .item-comment {
    border: 2px solid #1890ff;
    min-height: 100px;
    margin-top: 12px
  }

  .item-buy {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    background-color: #1890ff;
    min-height: 100px;
    padding: 12px;
    line-height: 25px;
  }
</style>
