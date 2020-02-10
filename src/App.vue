<template>
  <div>
    <a-locale-provider :locale="locale">
      <router-view/>
    </a-locale-provider>
  </div>
</template>

<script>
  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';

  export default {
    name: 'App',
    data: () => ({locale: zh_CN}),
    methods: {}
  }
</script>

<style>
  /*阴影效果*/
  .box-shadow {
    box-shadow: 5px 5px 8px 2px #E4E4E4;
  }

  /*阴影效果：鼠标移入*/
  .box-shadow:hover {
    box-shadow: 0 1px 8px 2px #E4E4E4;
  }
</style>
