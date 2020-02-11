<template>
  <div class="order-box">
    <div style="height: 40px;">
      <a-radio-group defaultValue="a" buttonStyle="solid">
        <a-radio-button value="a">所有订单</a-radio-button>
        <a-radio-button value="b">待付款</a-radio-button>
        <a-radio-button value="c">待发货</a-radio-button>
        <a-radio-button value="d">待收货</a-radio-button>
        <a-radio-button value="e">待评价</a-radio-button>
      </a-radio-group>
    </div>
    <div>
      <OrderItem v-for="item in data" :key="item.id" :created-time="item.createdTime" :id="item.id"
                 :status="item.status" :title="item.title" :count="item.count" :price="item.price"/>
    </div>
  </div>
</template>

<script>
  import OrderItem from "../components/OrderItem";

  export default {
    name: "Order",
    components: {OrderItem},
    data: () => ({
      data: [
        {
          createdTime: "2019年12月01日",
          id: "2313132",
          status: "已发货",
          title: "【年货价】裤流秋冬季百搭束长裤潮牌",
          count: 1,
          price: 200
        },
        {
          createdTime: "2019年12月01日",
          id: "23113132",
          status: "已发货",
          title: "【年货价】裤流秋冬季百搭束长裤潮牌",
          count: 1,
          price: 200
        },
        {
          createdTime: "2019年12月01日",
          id: "231311132",
          status: "已发货",
          title: "【年货价】裤流秋冬季百搭束长裤潮牌",
          count: 1,
          price: 200
        },
        {
          createdTime: "2019年12月01日",
          id: "42313111132",
          status: "已发货",
          title: "【年货价】裤流秋冬季百搭束长裤潮牌",
          count: 1,
          price: 200
        },
        {
          createdTime: "2019年12月01日",
          id: "32313111132",
          status: "已发货",
          title: "【年货价】裤流秋冬季百搭束长裤潮牌",
          count: 1,
          price: 200
        },
        {
          createdTime: "2019年12月01日",
          id: "22313111132",
          status: "已发货",
          title: "【年货价】裤流秋冬季百搭束长裤潮牌",
          count: 1,
          price: 200
        },
        {
          createdTime: "2019年12月01日",
          id: "12313111132",
          status: "已发货",
          title: "【年货价】裤流秋冬季百搭束长裤潮牌",
          count: 1,
          price: 200
        },
      ]
    })
  }
</script>

<style scoped>
  .order-box {
    background-color: #fff;
    padding: 12px;
  }
</style>
