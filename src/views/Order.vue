<template>
  <div class="order-box box-shadow box-radius">
    <div class="order-radio">
      <a-radio-group defaultValue="a" buttonStyle="solid">
        <a-radio-button value="a">所有订单</a-radio-button>
        <a-radio-button value="b">待付款</a-radio-button>
        <a-radio-button value="c">待发货</a-radio-button>
        <a-radio-button value="d">待收货</a-radio-button>
        <a-radio-button value="e">待评价</a-radio-button>
      </a-radio-group>
    </div>
    <div>
      <OrderItem v-for="item in data" :key="item.id" :created-time="item.createdTime" :img="item.img" :id="item.id"
                 :status="item.status" :title="item.title" :count="item.count" :price="item.price"/>
    </div>
    <div class="order-pagination">
      <a-pagination showSizeChanger
                    @showSizeChange="onShowSizeChange"
                    :defaultCurrent="3"
                    :total="500"

      />
    </div>
  </div>
</template>

<script>
  import OrderItem from "../components/OrderItem";

  export default {
    name: "Order",
    components: {OrderItem},
    data: () => ({
      pageSize: 20,
      current: 4,
      data: [
        {
          img: "https://img.alicdn.com/imgextra/i3/3055237276/O1CN01ki2s9c23cSKAXx1AW_!!3055237276.jpg_80x80.jpg",
          createdTime: "2019年12月01日",
          id: "2313132",
          status: "已发货",
          title: "【年货价】裤流秋冬季百搭束长裤潮牌",
          count: 1,
          price: 200
        },
        {
          img: "https://img.alicdn.com/imgextra/i3/3055237276/O1CN01ki2s9c23cSKAXx1AW_!!3055237276.jpg_80x80.jpg",
          createdTime: "2019年12月01日",
          id: "23113132",
          status: "已发货",
          title: "【年货价】裤流秋冬季百搭束长裤潮牌",
          count: 1,
          price: 200
        },
        {
          img: "https://img.alicdn.com/imgextra/i3/3055237276/O1CN01ki2s9c23cSKAXx1AW_!!3055237276.jpg_80x80.jpg",
          createdTime: "2019年12月01日",
          id: "231311132",
          status: "已发货",
          title: "【年货价】裤流秋冬季百搭束长裤潮牌",
          count: 1,
          price: 200
        },
        {
          img: "https://img.alicdn.com/imgextra/i3/3055237276/O1CN01ki2s9c23cSKAXx1AW_!!3055237276.jpg_80x80.jpg",
          createdTime: "2019年12月01日",
          id: "42313111132",
          status: "已发货",
          title: "【年货价】裤流秋冬季百搭束长裤潮牌",
          count: 1,
          price: 200
        },
        {
          img: "https://img.alicdn.com/imgextra/i3/3055237276/O1CN01ki2s9c23cSKAXx1AW_!!3055237276.jpg_80x80.jpg",
          createdTime: "2019年12月01日",
          id: "32313111132",
          status: "已发货",
          title: "【年货价】裤流秋冬季百搭束长裤潮牌",
          count: 1,
          price: 200
        },
        {
          img: "https://img.alicdn.com/imgextra/i3/3055237276/O1CN01ki2s9c23cSKAXx1AW_!!3055237276.jpg_80x80.jpg",
          createdTime: "2019年12月01日",
          id: "22313111132",
          status: "已发货",
          title: "【年货价】裤流秋冬季百搭束长裤潮牌",
          count: 1,
          price: 200
        },
        {
          img: "https://img.alicdn.com/imgextra/i3/3055237276/O1CN01ki2s9c23cSKAXx1AW_!!3055237276.jpg_80x80.jpg",
          createdTime: "2019年12月01日",
          id: "12313111132",
          status: "已发货",
          title: "【年货价】裤流秋冬季百搭束长裤潮牌",
          count: 1,
          price: 200
        },
      ]
    }),
    methods: {
      onShowSizeChange(current, pageSize) {
        console.log(current, pageSize);
      },
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
