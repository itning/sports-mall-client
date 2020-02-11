<template>
  <div class="item-comment">
    <a-row type="flex" justify="space-around" align="middle">
      <a-col :span="19" style="padding:12px">
        感谢您对罗技强袭专卖店的支持，亲的满意是我们最大的追求，我们是罗技授权的天猫专卖店，只卖罗技正品，支持罗技官方售后全国免费联保，亲们可以放心购买使用哦，如果使用后期发现问题的话
        请及时联系我们在线客服为您解决哦，感谢您对本店的支持与信任，祝生活愉快，工作顺利！期待您的下次光临！
      </a-col>
      <a-col :span="5" class="item-buy">
        <div>2019年12月31日 12:30</div>
        <div>买家：a13323</div>
        <div>评分：5</div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
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
    color: white;
    background-color: #1890ff;
    min-height: 100px;
    padding: 12px;
    line-height: 25px;
  }
</style>
