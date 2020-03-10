<template>
  <div>
    <a-table bordered :dataSource="dataSource" :columns="columns" :pagination="false" :rowKey="'id'" :scroll="{x:true}">
      <template slot="name" slot-scope="text, record">
        <EditableCell :text="text" @change="onCellChange(record.id, 'name', $event)"/>
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
      title="新增分类"
      :visible="visible"
      @ok="handleAdd"
      :confirmLoading="confirmLoading"
      @cancel="visible=false"
    >
      <a-input placeholder="在此输入..." v-model="newType"/>
    </a-modal>
  </div>
</template>

<script>
  import {Delete, Get, Patch, Post} from "@itning/axios-helper";
  import {API} from "../api";
  import EditableCell from "../components/EditableCell";

  export default {
    name: "AdminProductType",
    components: {EditableCell},
    data() {
      return {
        newType: '',
        visible: false,
        confirmLoading: false,
        dataSource: [],
        count: 2,
        columns: [
          {
            title: '名称',
            dataIndex: 'name',
            width: '50%',
            scopedSlots: {customRender: 'name'},
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
      initProductType() {
        Get(API.commodityType.all)
          .withSuccessCode(200)
          .withErrorStartMsg("加载分类失败：")
          .do(response => {
            this.dataSource = response.data.data;
          })
      },
      onCellChange(key, dataIndex, value) {
        Patch(API.commodityType.modify)
          .withSuccessCode(204)
          .withErrorStartMsg("修改失败：")
          .withJson({id: key, name: value})
          .do(response => {
            this.$message.success("修改成功");
          })
          .doAfter(() => {
            this.initProductType();
          })
      },
      onDelete(key) {
        Delete(API.commodityType.del + key)
          .withSuccessCode(204)
          .withErrorStartMsg("删除失败：")
          .do(response => {
            this.$message.success("删除成功");
          })
          .doAfter(() => {
            this.initProductType();
          })
      },
      handleAdd() {
        if (this.newType.trim() === '') {
          this.$message.error("请输入类别内容");
          return;
        }
        this.confirmLoading = true;
        Post(API.commodityType.add)
          .withURLSearchParams({name: this.newType})
          .withSuccessCode(201)
          .withErrorStartMsg("新增失败：")
          .do(response => {
            this.visible = false;
            this.$message.success("新增成功");
          })
          .doAfter(() => {
            this.confirmLoading = false;
            this.initProductType();
          })
      },
    },
    created() {
      this.initProductType();
    }
  }
</script>

<style scoped>
  .ant-table td {
    white-space: nowrap;
  }
</style>
