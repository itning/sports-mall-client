<template>
  <div>
    <a-row type="flex" justify="space-around" style="background-color: #f0f2f5">
      <a-col :span="4" style="line-height: 50px">体育用品商城->找回密码</a-col>
      <a-col :span="4" style="line-height: 50px">已有账号？
        <router-link to="/login">立即登录</router-link>
      </a-col>
    </a-row>
    <div class="forget-box">
      <a-steps :current="forgetStatusIndex" style="margin-bottom: 24px;width: 315px;">
        <a-step title="填写信息"/>
        <a-step title="找回密码"/>
      </a-steps>
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="邮箱">
          <a-input
            v-decorator="[
          'email',
          {
            rules: [
              {
                type: 'email',
                message: '有输入正确的邮箱地址!',
              },
              {
                required: true,
                message: '请输入邮箱!',
              },
            ],
          },
        ]"
          />
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout">
          <a-button type="primary" html-type="submit">立即找回</a-button>
          <a-button html-type="button" @click="handleReturnClick" style="margin-left: 8px">返回</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
  // MEMO: This view not developed and ready to remove this feature.
  export default {
    name: "ForgetPassword",
    data() {
      return {
        forgetStatusIndex: 0,
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
      }
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      },
      handleReturnClick() {
        this.$router.back();
      }
    },
    beforeCreate() {
      this.form = this.$form.createForm(this, {name: 'forget_pwd'});
    },
  }
</script>

<style scoped>
  .forget-box {
    max-width: 300px;
    margin: 24px auto;
  }
</style>
