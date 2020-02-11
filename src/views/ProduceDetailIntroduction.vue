<template>
  <div style="margin: 0 auto;width: 100%">
    <div v-html="hhh"></div>
  </div>
</template>

<script>
  export default {
    name: "ProduceDetailIntroduction",
    data() {
      return {
        productId: null,
        hhh:"<h1>渲染</h1>"
      }
    },
    created() {
      this.productId = this.$route.params.id;
      console.log(this.productId);
    }
  }
</script>

<style scoped>

</style>
