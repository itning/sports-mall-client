<template>
  <div>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="商品标题" has-feedback>
        <a-input
          v-decorator="[
          'name',
          {
            rules: [
              {
                required: true,
                message: '请输入商品标题!',
              },
            ],
          },
        ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="商品单价">
        <a-input-number
          :min="0"
          :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\￥\s?|(,*)/g, '')"
          v-decorator="[
          'price',
          {
            rules: [
              {
                required: true,
                message: '请输入商品单价!',
              },
            ],
          },
        ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="商品库存">
        <a-input-number
          :min="0"
          :step="1"
          v-decorator="[
          'stock',
          {
            rules: [
              {
                required: true,
                message: '请输入商品库存!',
              },
            ],
          },
        ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="推荐商品">
        <a-checkbox
          v-decorator="[
          'recommended',
          {
            rules: [
              {
                required: true,
                message: '请选择是否是推荐商品!',
              },
            ],
          },
        ]">
        </a-checkbox>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="商品分类" has-feedback>
        <a-select
          v-decorator="[
          'commodityTypeId',
          { rules: [{ required: true, message: '请选择商品分类!' }] },
        ]"
          placeholder="请选择分类"
        >
          <a-select-option v-for="item in productType" :key="item.id" :value="item.id">
            {{item.name}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="商品主图URL" has-feedback>
        <a-input
          v-decorator="[
          'imgMain',
          {
            rules: [
              {
                required: true,
                message: '请输入商品主图URL!',
              },
            ],
          },
        ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" has-feedback>
        <span slot="label">
       商品轮播图URL
        <a-tooltip title="至少一个。多个请使用英文分号进行分隔，最后一个末尾无需加英文分号。">
          <a-icon type="question-circle-o"/>
        </a-tooltip>
      </span>
        <a-textarea
          v-decorator="[
          'imgSecond',
          {
            rules: [
              {
               required: true,
                message: '请输入商品轮播URL!',
              },
              {
                validator: validateImgArray,
              }
            ],
          },
        ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="商品介绍">
        <a-textarea
          v-decorator="[
          'detail',
          {
            rules: [
              {
                required: false
              },
            ],
          },
        ]"
        />
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button type="primary" html-type="submit" :loading="loading">
          添加商品
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import {Get, Post} from "@itning/axios-helper";
  import {API} from "../api";

  export default {
    name: 'AdminProductNew',
    data() {
      return {
        loading: false,
        productType: [],
        formItemLayout: {
          labelCol: {
            xs: {span: 24},
            sm: {span: 8},
          },
          wrapperCol: {
            xs: {span: 24},
            sm: {span: 16},
          },
        },
        tailFormItemLayout: {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 16,
              offset: 8,
            },
          },
        },
      };
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.loading = true;
            Post(API.commodity.admin_add)
              .withURLSearchParams(values)
              .withSuccessCode(201)
              .withErrorStartMsg("添加失败：")
              .do(response => {
                this.$message.success("添加成功");
                this.$router.push("/admin/product").catch(error => {
                });
              })
              .doAfter(() => {
                this.loading = false;
              })
          }
        });
      },
      validateImgArray(rule, value, callback) {
        if (value && value.endsWith(";")) {
          callback('最后的URL请不要加英文分号');
        } else {
          callback();
        }
      },
      initProductType() {
        Get(API.commodityType.all)
          .withSuccessCode(200)
          .withErrorStartMsg("加载分类失败：")
          .do(response => {
            this.productType = response.data.data;
            if (this.productType.length === 0) {
              this.$message.error("请添加商品分类后再添加商品！");
              this.$router.push("/admin/productType").catch(error => {
              });
            }
          })
      },
    },
    beforeCreate() {
      this.form = this.$form.createForm(this, {name: 'product_new'});
    },
    created() {
      this.initProductType();
    }
  };
</script>

<style scoped>

</style>
