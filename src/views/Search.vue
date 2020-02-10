<template>
  <div class="search-box">
    <p class="search-info">搜索 ”{{keyword}}“ 耗时 0.025ms</p>
    <div style="height: 40px;padding-left: 12px">
      <a-radio-group defaultValue="a" buttonStyle="solid">
        <a-radio-button value="a">综合排序</a-radio-button>
        <a-radio-button value="b">销量排序</a-radio-button>
        <a-radio-button value="c">价格从高到低排序</a-radio-button>
        <a-radio-button value="d">价格从低到高排序</a-radio-button>
      </a-radio-group>
    </div>
    <div class="commodity-items">
      <CommodityItem v-for="item in data" :key="item.title" :img="item.img" :sales="item.sales" :price="item.price"
                     :title="item.title"/>
      <i></i><i></i><i></i><i></i><i></i>
    </div>
    <div class="search-pagination">
      <a-pagination showSizeChanger
                    @showSizeChange="onShowSizeChange"
                    :defaultCurrent="3"
                    :total="500"

      />
    </div>
  </div>
</template>

<script>
  import CommodityItem from "../components/CommodityItem";

  export default {
    name: "Search",
    components: {CommodityItem},
    data() {
      return {
        keyword: null,
        pageSize: 20,
        current: 4,
        data: [
          {
            img: "https://img.alicdn.com/bao/uploaded/i4/TB1DICRMVXXXXXFXVXXXXXXXXXX_!!0-item_pic.jpg_200x200q90.jpg_.webp",
            title: "1Scosche Rhythm+高精度心率检测智能手环蓝牙运动手表跑步心率表",
            price: 473,
            sales: 12
          },
          {
            img: "https://img.alicdn.com/bao/uploaded/i1/106231177/TB2VBbRnamgSKJjSsplXXaICpXa_!!106231177.jpg_200x200q90.jpg_.webp",
            title: "2OPPO蓝牙耳机4.1运动跑步音乐入领夹式重低音塞华为苹果vivo通用",
            price: 69,
            sales: 4
          },
          {
            img: "https://img.alicdn.com/bao/uploaded/i1/12637022208057892/T1NpypXvxXXXXXXXXX_!!0-item_pic.jpg_200x200q90.jpg_.webp",
            title: "5包邮 瑞斯漫 电脑手托架鼠标护腕垫手臂托架手托板桌/椅两用",
            price: 3.5,
            sales: 91
          },
          {
            img: "https://img.alicdn.com/bao/uploaded/i4/14431894/O1CN01WBEpSM1PrUcp9BTSA_!!0-saturn_solar.jpg_200x200q90.jpg_.webp",
            title: "411 23号刀片3 4号刀柄美工刀雕刻刀剪纸刀",
            price: 29.8,
            sales: 3050
          },
          {
            img: "https://img.alicdn.com/bao/uploaded/i3/TB1Vo6yPpXXXXaaXFXXXXXXXXXX_!!0-item_pic.jpg_200x200q90.jpg_.webp",
            title: "3ZIDLI磁动力牛头人酋长ZM5 ZM2100网吧网咖游戏电竞LOL",
            price: 109,
            sales: 33
          },
          {
            img: "https://img.alicdn.com/bao/uploaded/i1/TB1vNW7SpXXXXaRXpXXXXXXXXXX_!!0-item_pic.jpg_200x200q90.jpg_.webp",
            title: "7ZIDLI磁动力牛头人酋长ZM5 ZM2100网吧网咖游戏电竞LOL",
            price: 449,
            sales: 10
          },
          {
            img: "https://img.alicdn.com/bao/uploaded/i4/48629080/O1CN01NNTWmO2Gwgn3wsYgN_!!0-saturn_solar.jpg_200x200q90.jpg_.webp",
            title: "8工业热缩枪热风枪塑料焊枪吹风机汽车贴膜",
            price: 55,
            sales: 66
          },
          {
            img: "https://img.alicdn.com/bao/uploaded/i1/12637022208057892/T1NpypXvxXXXXXXXXX_!!0-item_pic.jpg_200x200q90.jpg_.webp",
            title: "9包邮 瑞斯漫 电脑手托架鼠标护腕垫手臂托架手托板桌/椅两用",
            price: 3.5,
            sales: 91
          },
          {
            img: "https://img.alicdn.com/bao/uploaded/i4/14431894/O1CN01WBEpSM1PrUcp9BTSA_!!0-saturn_solar.jpg_200x200q90.jpg_.webp",
            title: "011 23号刀片3 4号刀柄美工刀雕刻刀剪纸刀",
            price: 29.8,
            sales: 3050
          },
        ]
      }
    },
    methods: {
      onShowSizeChange(current, pageSize) {
        console.log(current, pageSize);
      },
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
    width: 100px;
    margin-right: 10px;
  }
</style>
