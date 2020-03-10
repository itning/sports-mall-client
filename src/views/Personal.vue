<template>
  <div class="personal-box box-shadow box-radius">
    <div class="personal-item">
      <p>
        <a-icon type="right"/>
        更改密码：
      </p>
      <a-input-password style="margin-bottom: 6px;" placeholder="在此输入旧密码.." v-model="userData.oldPwd"/>
      <a-input-password style="margin-bottom: 6px;" placeholder="在此输入新密码.." v-model="userData.newPwd"/>
      <a-input-password placeholder="再输入一次新密码.." v-model="userData.confimPwd"/>
      <a-button type="primary" class="personal-btn" @click="handleBtnClick('password')">保存</a-button>
    </div>
    <div class="personal-item">
      <p>
        <a-icon type="right"/>
        更改邮箱：
      </p>
      <a-input placeholder="在此输入..." v-model="userData.email"/>
      <a-button type="primary" class="personal-btn" @click="handleBtnClick('email')">保存</a-button>
    </div>
    <div class="personal-item">
      <p>
        <a-icon type="right"/>
        更改手机号：
      </p>
      <a-input placeholder="在此输入..." v-model="userData.tel"/>
      <a-button type="primary" class="personal-btn" @click="handleBtnClick('phone')">保存</a-button>
    </div>
    <div class="personal-item">
      <p>
        <a-icon type="right"/>
        更改收货地址：
      </p>
      <a-textarea v-model="userData.address"/>
      <a-button type="primary" class="personal-btn" @click="handleBtnClick('address')">保存</a-button>
    </div>
  </div>
</template>

<script>
  import {Patch, Post} from "@itning/axios-helper";
  import {API} from "../api";

  export default {
    name: "Personal",
    data: () => ({
      userData: {}
    }),
    methods: {
      handleBtnClick(key) {
        switch (key) {
          case 'password': {
            if (this.userData.newPwd !== this.userData.confimPwd) {
              this.$message.error("密码不一致");
            } else {
              if (this.userData.newPwd.trim() === "") {
                this.$message.error("不能为空");
              } else {
                Post(API.user.pwd)
                  .withSuccessCode(200)
                  .withErrorStartMsg("密码修改失败：")
                  .withURLSearchParams({oldPwd: this.userData.oldPwd, newPwd: this.userData.newPwd})
                  .do(response => {
                    this.userData.oldPwd = '';
                    this.userData.newPwd = '';
                    this.userData.confimPwd = '';
                    this.$message.success("密码修改成功");
                  })
              }
            }
            break;
          }
          case 'email': {
            if (this.userData.email.trim() === "") {
              this.$message.error("不能为空");
              return;
            }
            this.changeUserInfo({email: this.userData.email}, "更改邮箱失败：");
            break;
          }
          case 'phone': {
            if (this.userData.tel.trim() === "") {
              this.$message.error("不能为空");
              return;
            }
            this.changeUserInfo({tel: this.userData.tel}, "更改电话失败：");
            break;
          }
          case 'address': {
            if (this.userData.address.trim() === "") {
              this.$message.error("不能为空");
              return;
            }
            this.changeUserInfo({address: this.userData.address}, "更改收货地址失败：");
            break;
          }
        }
      },
      changeUserInfo(obj, errorMsg) {
        Patch(API.user.modify)
          .withSuccessCode(204)
          .withErrorStartMsg(errorMsg)
          .withJson(obj)
          .do(response => {
            this.$message.success('保存成功');
          })
      }
    },
    created() {
      this.userData = this.$user.loginUser();
    }
  }
</script>

<style scoped>
  .personal-box {
    background-color: #fff;
    padding: 12px;
    margin-bottom: 12px;
  }

  .personal-btn {
    margin: 12px 0;
  }

  .personal-item {
    margin: 12px;
  }
</style>
