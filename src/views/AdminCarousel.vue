<template>
  <div>
    <a-table bordered :dataSource="dataSource" :columns="columns" :pagination="false" :rowKey="'id'" :scroll="{x:true}">
      <template slot="url" slot-scope="text, record">
        <EditableCell :text="text" @change="onCellChange(record.id, 'url', $event)"/>
      </template>
      <template slot="link" slot-scope="text, record">
        <EditableCell :text="text" @change="onCellChange(record.id, 'link', $event)"/>
      </template>
      <template slot="type" slot-scope="text, record">
        <EditableCellSelect :values="[{value:'1',name:'水平'},{value:'2',name:'垂直'}]" :text="String(text)"
                            :s="record.typeCN"
                            @change="onCellChange(record.id, 'type', $event)"/>
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="dataSource.length"
          title="确定删除？"
          @confirm="() => onDelete(record.id)"
        >
          <a href="javascript:;">删除</a>
        </a-popconfirm>
      </template>
    </a-table>
    <a-button style="margin: 12px 0" @click="visible=!visible">添加</a-button>
    <a-modal
      title="新增走马灯"
      :visible="visible"
      @ok="handleAdd"
      :confirmLoading="confirmLoading"
      @cancel="visible=false"
    >
      <a-input placeholder="图片地址" v-model="newImg" style="margin-bottom: 12px"/>
      <a-input placeholder="对应链接" v-model="newLink" style="margin-bottom: 12px"/>
      <a-select defaultValue="1" v-model="newType">
        <a-select-option value="1">水平</a-select-option>
        <a-select-option value="2">竖直</a-select-option>
      </a-select>
    </a-modal>
  </div>
</template>

<script>
  import {Delete, Get, Patch, Post} from "@itning/axios-helper";
  import {API} from "../api";
  import EditableCell from "../components/EditableCell";
  import EditableCellSelect from "../components/EditableCellSelect";

  export default {
    name: "AdminCarousel",
    components: {EditableCellSelect, EditableCell},
    data() {
      return {
        newType: '1',
        newImg: '',
        newLink: '',
        visible: false,
        confirmLoading: false,
        dataSource: [],
        count: 2,
        columns: [
          {
            title: '图片地址',
            dataIndex: 'url',
            scopedSlots: {customRender: 'url'},
          },
          {
            title: '对应链接',
            dataIndex: 'link',
            scopedSlots: {customRender: 'link'},
          },
          {
            title: '分类',
            dataIndex: 'type',
            scopedSlots: {customRender: 'type'},
          },
          {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: {customRender: 'operation'},
          },
        ],
      };
    },
    methods: {
      initAllCarousel() {
        Get(API.carousel.all)
          .withSuccessCode(200)
          .withErrorStartMsg("获取轮播图数据失败：")
          .do(response => {
            this.dataSource = response.data.data.map(item => {
              switch (item.type) {
                case 1: {
                  item.typeCN = "水平";
                  break;
                }
                case 2: {
                  item.typeCN = "竖直";
                  break;
                }
              }
              return item;
            });
          })
      },
      onCellChange(key, dataIndex, value) {
        console.log(key, dataIndex, value);
        let modifyObj = {id: key};
        modifyObj[dataIndex] = value;
        Patch(API.carousel.modify)
          .withSuccessCode(204)
          .withErrorStartMsg("修改失败：")
          .withJson(modifyObj)
          .do(response => {
            this.$message.success("修改成功");
          })
          .doAfter(() => {
            this.initAllCarousel();
          })
      },
      onDelete(key) {
        Delete(API.carousel.del + key)
          .withSuccessCode(204)
          .withErrorStartMsg("删除失败：")
          .do(response => {
            this.$message.success("删除成功");
          })
          .doAfter(() => {
            this.initAllCarousel();
          })
      },
      handleAdd() {
        Post(API.carousel.add)
          .withSuccessCode(201)
          .withErrorStartMsg("添加失败：")
          .withURLSearchParams({url: this.newImg, link: this.newLink, type: this.newType})
          .do(response => {
            this.$message.success("添加成功");
            this.newImg = '';
            this.newLink = '';
            this.newType = '1';
          })
          .doAfter(() => {
            this.visible = false;
            this.initAllCarousel();
          })
      },
    },
    created() {
      this.initAllCarousel();
    }
  }
</script>

<style scoped>
  .ant-table td {
    white-space: nowrap;
  }
</style>
