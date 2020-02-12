<template>
  <a-menu mode="vertical">
    <a-menu-item v-for="item in data" :key="item.id" @click="handleTypeBtnClick(item.id)">
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
    methods: {
      handleTypeBtnClick(id) {
        this.$router.push("/product_type/" + id).catch(err => {
        });
      }
    }
  }
</script>

<style scoped>

</style>
