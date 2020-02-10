<template>
  <div>
    <a-row type="flex" justify="space-between">
      <a-col :xs="0" :sm="8" :md="8" :lg="8" :xl="8">
        <div>体育用品商城</div>
      </a-col>
      <a-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
        <a-input-search placeholder="搜索商品" @search="" enterButton style="vertical-align: middle;"/>
      </a-col>
      <a-col :xs="0" :sm="8" :md="8" :lg="8" :xl="8">
        <a-row type="flex" justify="end">
          <a-col :xs="0" :sm="8" :md="7" :lg="5" :xl="4">
            <a-config-provider :autoInsertSpaceInButton="false">
              <a-button type="link">我的订单</a-button>
            </a-config-provider>
          </a-col>
          <a-col :xs="0" :sm="10" :md="9" :lg="6" :xl="5">
            <a-config-provider :autoInsertSpaceInButton="false">
              <a-button type="link">
                <a-icon type="shopping-cart"/>
                购物车
              </a-button>
            </a-config-provider>
          </a-col>
          <a-col :xs="0" :sm="5" :md="4" :lg="3" :xl="3">
            <a-config-provider :autoInsertSpaceInButton="false">
              <a-button type="link">登录</a-button>
            </a-config-provider>
          </a-col>
          <a-col :xs="0" :sm="1" :md="2" :lg="4" :xl="4">
            <a-config-provider :autoInsertSpaceInButton="false">
              <a-button type="link">注册</a-button>
            </a-config-provider>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    name: "LayoutHeader"
  }
</script>

<style scoped>

</style>
