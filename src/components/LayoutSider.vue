<template>
  <a-menu mode="vertical">
    <a-menu-item v-for="item in data" :key="item.id">
      {{item.name}}
    </a-menu-item>
  </a-menu>
</template>

<script>
  export default {
    props: {
      data: Array
    },
    name: "LayoutSider",
  }
</script>

<style scoped>

</style>
