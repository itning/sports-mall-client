<template>
  <a-menu mode="vertical">
    <a-sub-menu key="aa">
      <span slot="title"><span>羽毛球</span></span>
      <a-menu-item key="13">羽毛球拍</a-menu-item>
      <a-menu-item key="14">羽毛球</a-menu-item>
      <a-menu-item key="15">羽毛球鞋</a-menu-item>
      <a-menu-item key="16">羽毛球服</a-menu-item>
      <a-menu-item key="17">尤尼克斯</a-menu-item>
      <a-menu-item key="18">川崎</a-menu-item>
      <a-menu-item key="19">威克多</a-menu-item>
      <a-menu-item key="20">李宁</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="c">
      <span slot="title"><span>乒网篮足</span></span>
      <a-menu-item key="23">乒乓球</a-menu-item>
      <a-menu-item key="24">乒乓球</a-menu-item>
      <a-menu-item key="25">乒乓球桌</a-menu-item>
      <a-menu-item key="26">网球拍</a-menu-item>
      <a-menu-item key="27">网球</a-menu-item>
      <a-menu-item key="28">网球包</a-menu-item>
      <a-menu-item key="29">篮球</a-menu-item>
      <a-menu-item key="30">足球</a-menu-item>
    </a-sub-menu>
    <a-menu-item key="d">
      轮滑滑板
    </a-menu-item>
    <a-menu-item key="e">
      高尔夫
    </a-menu-item>
    <a-menu-item key="1">
      排球
    </a-menu-item>
    <a-menu-item key="2">
      羽毛球
    </a-menu-item>
    <a-sub-menu key="sub1">
      <span slot="title"><span>篮球</span></span>
      <a-menu-item key="3">Option 3</a-menu-item>
      <a-menu-item key="4">Option 4</a-menu-item>
      <a-sub-menu key="sub1-2" title="Submenu">
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
      </a-sub-menu>
    </a-sub-menu>
    <a-sub-menu key="sub2">
      <span slot="title"><span>足球</span></span>
      <a-menu-item key="7">Option 7</a-menu-item>
      <a-menu-item key="8">Option 8</a-menu-item>
      <a-menu-item key="9">Option 9</a-menu-item>
      <a-menu-item key="10">Option 10</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
  export default {
    name: "LayoutSider"
  }
</script>

<style scoped>

</style>
