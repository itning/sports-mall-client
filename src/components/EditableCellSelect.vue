<template>
  <div>
    <div v-if="editable">
      <a-select :defaultValue="value" style="width: 80%" @change="handleChange">
        <a-select-option v-for="(v,k) in values" :key="k" :value="v.value">{{v.name}}</a-select-option>
      </a-select>
      <a-icon style="margin-left: 12px" type="check" @click="check"/>
    </div>
    <div v-else>
      {{ s || ' ' }}
      <a-icon type="edit" @click="edit"/>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      s: String,
      text: String,
      values: Array
    },
    name: "EditableCellSelect",
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
