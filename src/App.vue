<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data: () => ({}),
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
