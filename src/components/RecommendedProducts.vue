<template>
  <div class="box-shadow box-style">
    <p class="mail-title">
      <a-icon type="caret-right"/>
      推荐商品
    </p>
    <div class="commodity-items">
      <CommodityItem v-for="item in data" :key="item.img" :img="item.img" :sales="item.sales" :price="item.price"
                     :title="item.title"/>
      <i></i><i></i><i></i><i></i><i></i>
    </div>
  </div>
</template>

<script>
  import CommodityItem from "./CommodityItem";

  export default {
    name: "RecommendedProducts",
    components: {CommodityItem},
    data: () => ({
      data: [
        {
          img: "https://img.alicdn.com/bao/uploaded/i4/TB1DICRMVXXXXXFXVXXXXXXXXXX_!!0-item_pic.jpg_200x200q90.jpg_.webp",
          title: "Scosche Rhythm+高精度心率检测智能手环蓝牙运动手表跑步心率表",
          price: 473,
          sales: 12
        },
        {
          img: "https://img.alicdn.com/bao/uploaded/i1/106231177/TB2VBbRnamgSKJjSsplXXaICpXa_!!106231177.jpg_200x200q90.jpg_.webp",
          title: "OPPO蓝牙耳机4.1运动跑步音乐入领夹式重低音塞华为苹果vivo通用",
          price: 69,
          sales: 4
        },
        {
          img: "https://img.alicdn.com/bao/uploaded/i1/12637022208057892/T1NpypXvxXXXXXXXXX_!!0-item_pic.jpg_200x200q90.jpg_.webp",
          title: "包邮 瑞斯漫 电脑手托架鼠标护腕垫手臂托架手托板桌/椅两用",
          price: 3.5,
          sales: 91
        },
        {
          img: "https://img.alicdn.com/bao/uploaded/i4/14431894/O1CN01WBEpSM1PrUcp9BTSA_!!0-saturn_solar.jpg_200x200q90.jpg_.webp",
          title: "11 23号刀片3 4号刀柄美工刀雕刻刀剪纸刀",
          price: 29.8,
          sales: 3050
        },
        {
          img: "https://img.alicdn.com/bao/uploaded/i3/TB1Vo6yPpXXXXaaXFXXXXXXXXXX_!!0-item_pic.jpg_200x200q90.jpg_.webp",
          title: "ZIDLI磁动力牛头人酋长ZM5 ZM2100网吧网咖游戏电竞LOL",
          price: 109,
          sales: 33
        },
        {
          img: "https://img.alicdn.com/bao/uploaded/i1/TB1vNW7SpXXXXaRXpXXXXXXXXXX_!!0-item_pic.jpg_200x200q90.jpg_.webp",
          title: "ZIDLI磁动力牛头人酋长ZM5 ZM2100网吧网咖游戏电竞LOL",
          price: 449,
          sales: 10
        },
        {
          img: "https://img.alicdn.com/bao/uploaded/i4/48629080/O1CN01NNTWmO2Gwgn3wsYgN_!!0-saturn_solar.jpg_200x200q90.jpg_.webp",
          title: "工业热缩枪热风枪塑料焊枪吹风机汽车贴膜",
          price: 55,
          sales: 66
        }
      ]
    }),
  }
</script>

<style scoped>
  .box-style {
    background-color: #fff;
    margin: 12px 0;
    padding-bottom: 12px;
  }

  .mail-title {
    color: orange;
    padding-top: 12px;
    margin-left: 12px;
    font-size: 1.5em;
  }

  .commodity-items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 12px;
  }

  .commodity-items > i {
    width: 100px;
    margin-right: 10px;
  }
</style>
