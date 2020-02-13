<template>
  <div>
    <a-row type="flex" justify="space-around" style="background-color: #f0f2f5">
      <a-col :span="4" style="line-height: 50px">体育用品商城</a-col>
      <a-col :span="4" style="line-height: 50px">已有账号？
        <router-link to="/login">立即登录</router-link>
      </a-col>
    </a-row>
    <div class="reg-box">
      <a-steps :current="regStatusIndex" style="margin-bottom: 24px;width: 315px;">
        <a-step title="填写信息"/>
        <a-step title="注册成功"/>
      </a-steps>
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout">
      <span slot="label">
        用户名
      </span>
          <a-input
            v-decorator="[
          'username',
          {
            rules: [{ required: true, message: '请输入用户名!', whitespace: true }],
          },
        ]"
          />
        </a-form-item>
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
        <a-form-item v-bind="formItemLayout" label="手机号">
          <a-input
            v-decorator="[
          'phone',
          {
            rules: [{ required: true, message: '请输入电话号码!' }, {
                validator: validatorPhoneNumber,
              },],
          },
        ]"
            style="width: 100%"
          >
          </a-input>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="密码">
          <a-input
            v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: '请输入密码!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
            type="password"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="确认密码">
          <a-input
            v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: '请输入确认密码!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
            type="password"
            @blur="handleConfirmBlur"
          />
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout">
          <a-button type="primary" html-type="submit" :loading="loading">注册</a-button>
          <a-button html-type="button" @click="handleReturnClick" style="margin-left: 8px">返回</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
  import {Post} from "../http";
  import {API} from "../api";

  export default {
    name: "Registration",
    data() {
      return {
        loading: false,
        regStatusIndex: 0,
        confirmDirty: false,
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
            this.loading = true;
            Post(API.user.reg)
              .withSuccessCode(201)
              .withErrorStartMsg("注册失败：")
              .withURLSearchParams({
                username: values.username,
                email: values.email,
                phone: values.phone,
                password: values.password
              })
              .do(response => {
                this.$message.success("注册成功");
                this.$router.push("/login").catch(error => {
                })
              })
              .doAfter(() => {
                this.loading = false;
              })
          }
        });
      },
      handleConfirmBlur(e) {
        const value = e.target.value;
        this.confirmDirty = this.confirmDirty || !!value;
      },
      compareToFirstPassword(rule, value, callback) {
        const form = this.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('两次密码不一致!');
        } else {
          callback();
        }
      },
      validateToNextPassword(rule, value, callback) {
        const form = this.form;
        if (value && this.confirmDirty) {
          form.validateFields(['confirm'], {force: true});
        }
        callback();
      },
      validatorPhoneNumber(rule, value, callback) {
        if (!(/^1([3456789])\d{9}$/.test(value))) {
          callback('请输入正确的手机号');
        } else {
          callback();
        }
      },
      handleReturnClick() {
        this.$router.back();
      }
    },
    beforeCreate() {
      this.form = this.$form.createForm(this, {name: 'register'});
    },
  }
</script>

<style scoped>
  .reg-box {
    max-width: 300px;
    margin: 24px auto;
  }
</style>
