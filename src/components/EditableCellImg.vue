<template>
  <div>
    <div v-if="editable">
      <a-input :value="value" @change="handleChange" @pressEnter="check" style="width: 90%"/>
      <a-icon style="margin-left: 12px" type="check" @click="check"/>
    </div>
    <div v-else>
      <img style="max-width: 100%;" :src="text" alt="">
      <a-icon type="edit" @click="edit"/>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      text: String,
    },
    name: "EditableCellImg",
    data() {
      return {
        value: this.text,
        editable: false,
      };
    },
    methods: {
      handleChange(e) {
        this.value = e.target.value;
      },
      check() {
        this.editable = false;
        this.$emit('change', this.value);
      },
      edit() {
        this.editable = true;
      },
    },
  };
</script>
