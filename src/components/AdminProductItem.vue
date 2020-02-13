<template>
  <div class="item-box">
    <div class="item-info">
      <span>修改日期：{{time}}</span>
      <label style="margin-left: 12px">推荐商品：
        <input type="checkbox" :checked="recommended" @change="handleChange($event.target.checked,'recommended')">
      </label>
      <a-popconfirm
        title="确定下架该商品吗？"
        @confirm="handleDelBtn"
        okText="确定"
        cancelText="取消"
      >
        <span class="del-order"><a-icon type="delete"/></span>
      </a-popconfirm>
    </div>
    <a-row class="item-content" type="flex" justify="space-around" align="middle">
      <a-col :span="2">
        <EditableCellImg :text="img" @change="handleChange($event,'imgMain')"/>
      </a-col>
      <a-col :span="5" class="item-title">
        <EditableCell :text="title" @change="handleChange($event,'name')"/>
      </a-col>
      <a-col :span="4">单价：￥
        <EditableCellNumber :text="String(price)" @change="handleChange($event,'price')"/>
      </a-col>
      <a-col :span="3">库存：
        <EditableCellNumber :text="String(stock)" @change="handleChange($event,'stock')"/>
      </a-col>
      <a-col :span="3">分类：
        <EditableCellSelect :text="type.id" :s="type.name" :values="productTyped"
                            @change="handleChange($event,'commodityType')"/>
      </a-col>
      <a-col :span="3">
        <a-button type="link">修改商品</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import EditableCell from "./EditableCell";
  import EditableCellNumber from "./EditableCellNumber";
  import EditableCellSelect from "./EditableCellSelect";
  import EditableCellImg from "./EditableCellImg";

  export default {
    components: {EditableCellImg, EditableCellSelect, EditableCellNumber, EditableCell},
    props: {
      id: String,
      img: String,
      title: String,
      price: Number,
      stock: Number,
      time: String,
      type: Object,
      recommended: Boolean,
      productType: Array
    },
    name: "AdminProductItem",
    computed: {
      productTyped: function () {
        return this.productType.map(item => {
          item.value = item.id;
          return item;
        })
      }
    },
    data() {
      return {}
    },
    methods: {
      handleDelBtn() {
        this.$emit('del', this.id);
      },
      handleChange(value, index) {
        this.$emit('change', {id: this.id, key: index, value: value});
      }
    }
  }
</script>

<style scoped>
  .item-box {
    border: 2px solid #f1f1f1;
    margin-bottom: 12px;
  }

  .item-img {
    max-width: 100%;
  }

  .item-content {
    margin: 12px 3px;
  }

  .item-title {
    font-size: 0.9em;
  }

  .item-info {
    background-color: #f1f1f1;
    padding: 6px;
    margin-bottom: 12px;
  }

  .del-order {
    float: right;
    cursor: pointer;
  }

  .del-order:hover {
    color: #1890ff;
  }
</style>
