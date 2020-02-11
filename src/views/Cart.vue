<template>
  <div class="cart-box box-shadow box-radius">
    <div class="cart-info">
      <span>购物车 商品数量：{{data.length}}</span>
    </div>
    <CartItem v-for="item in data" :key="item.id" :img="item.img" :title="item.title" :price="item.price"
              :count="item.count"/>
    <div class="cart-pagination">
      <a-pagination showSizeChanger
                    @showSizeChange="onShowSizeChange"
                    :defaultCurrent="3"
                    :total="500"

      />
    </div>
  </div>
</template>

<script>
  import CartItem from "../components/CartItem";

  export default {
    name: "Cart",
    components: {CartItem},
    data: () => ({
        pageSize: 20,
        current: 4,
        data: [
          {
            id: "001",
            img: "https://img.alicdn.com/imgextra/i3/3055237276/O1CN01ki2s9c23cSKAXx1AW_!!3055237276.jpg_80x80.jpg",
            title: "【年货价】裤流秋冬季百搭束长裤潮牌",
            price: 10,
            count: 3
          },
          {
            id: "a001",
            img: "https://img.alicdn.com/imgextra/i3/3055237276/O1CN01ki2s9c23cSKAXx1AW_!!3055237276.jpg_80x80.jpg",
            title: "【年货价】裤流秋冬季百搭束长裤潮牌",
            price: 10,
            count: 3
          },
          {
            id: "b001",
            img: "https://img.alicdn.com/imgextra/i3/3055237276/O1CN01ki2s9c23cSKAXx1AW_!!3055237276.jpg_80x80.jpg",
            title: "【年货价】裤流秋冬季百搭束长裤潮牌",
            price: 10,
            count: 3
          },
          {
            id: "q001",
            img: "https://img.alicdn.com/imgextra/i3/3055237276/O1CN01ki2s9c23cSKAXx1AW_!!3055237276.jpg_80x80.jpg",
            title: "【年货价】裤流秋冬季百搭束长裤潮牌",
            price: 10,
            count: 3
          },
          {
            id: "w001",
            img: "https://img.alicdn.com/imgextra/i3/3055237276/O1CN01ki2s9c23cSKAXx1AW_!!3055237276.jpg_80x80.jpg",
            title: "【年货价】裤流秋冬季百搭束长裤潮牌",
            price: 10,
            count: 3
          },
          {
            id: "e001",
            img: "https://img.alicdn.com/imgextra/i3/3055237276/O1CN01ki2s9c23cSKAXx1AW_!!3055237276.jpg_80x80.jpg",
            title: "【年货价】裤流秋冬季百搭束长裤潮牌",
            price: 10,
            count: 3
          },
          {
            id: "r001",
            img: "https://img.alicdn.com/imgextra/i3/3055237276/O1CN01ki2s9c23cSKAXx1AW_!!3055237276.jpg_80x80.jpg",
            title: "【年货价】裤流秋冬季百搭束长裤潮牌",
            price: 10,
            count: 3
          },
          {
            id: "zz001",
            img: "https://img.alicdn.com/imgextra/i3/3055237276/O1CN01ki2s9c23cSKAXx1AW_!!3055237276.jpg_80x80.jpg",
            title: "【年货价】裤流秋冬季百搭束长裤潮牌",
            price: 10,
            count: 3
          },
        ]
      }
    ),
    methods: {
      onShowSizeChange(current, pageSize) {
        console.log(current, pageSize);
      },
    }
  }
</script>

<style scoped>
  .cart-box {
    background-color: #fff;
    padding: 12px;
    margin-bottom: 12px;
  }

  .cart-pagination {
    padding-top: 3px;
    display: flex;
    justify-content: flex-end;
  }

  .cart-info {
    height: 40px;
    line-height: 30px;
  }
</style>
