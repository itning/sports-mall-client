<template>
  <div>
    <div v-if="editable">
      <a-input-number v-model="value" :step="step" @pressEnter="check" @change="handleChange" style="width: 90%"/>
      <a-icon style="margin-left: 12px" type="check" @click="check"/>
    </div>
    <div v-else>
      {{ value || ' ' }}
      <a-icon type="edit" @click="edit"/>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      step: Number,
      text: String,
    },
    name: "EditableCellNumber",
    data() {
      return {
        value: this.text,
        editable: false,
      };
    },
    methods: {
      handleChange(e) {
        this.value = e;
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
