<template>
  <a-layout style="height: 100%;background-color: white">
    <a-layout-sider :trigger="null" collapsible style="background-color: #fff">
      <div class="rainbow-text" style="min-height: 64px;line-height: 64px">
        体育用品商城
      </div>
      <a-menu theme="light" mode="inline" :defaultSelectedKeys="['1']">
        <a-menu-item key="1" @click="routerTo('/admin/productType')">
          <a-icon type="user"/>
          <span>分类管理</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera"/>
          <span>商品管理</span>
        </a-menu-item>
        <a-menu-item key="3" @click="routerTo('/admin/order')">
          <a-icon type="upload"/>
          <span>订单管理</span>
        </a-menu-item>
        <a-menu-item key="4" @click="routerTo('/admin/carousel')">
          <a-icon type="upload"/>
          <span>轮播管理</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #f9fffd; padding: 0">
        <p style="margin-left: 24px">管理员端</p>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view name="subContent"/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
  export default {
    name: "AdminIndex",
    data() {
      return {
        collapsed: false,
      };
    },
    methods: {
      routerTo(where) {
        this.$router.push(where).catch(error => {
        })
      }
    }
  }
</script>

<style scoped>

</style>
