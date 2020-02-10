<template>
  <div>
    a {{keyword}}
  </div>
</template>

<script>
  export default {
    name: "Search",
    methods: {},
    data() {
      return {
        keyword: null
      }
    },
    created() {
      this.keyword = this.$route.params.keyword;
    },
    beforeRouteUpdate(to, from, next) {
      this.keyword = to.params.keyword;
      next();
    }
  }
</script>

<style scoped>

</style>
