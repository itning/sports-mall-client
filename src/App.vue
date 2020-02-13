<template>
  <div style="height: 100%">
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

  /*圆角效果*/
  .box-radius {
    border-radius: 15px;
  }
  @keyframes hue {
    from {
      filter: hue-rotate(0);
    }

    to {
      filter: hue-rotate(360deg);
    }
  }

  .rainbow-text {
    margin-left: 8px;
    display: inline-block;
    position: relative;
    font-size: 2em;
    color: transparent;
    animation: hue 2s linear infinite;
    background-image: linear-gradient(to right bottom, rgb(255, 0, 0), rgb(255, 128, 0), rgb(255, 255, 0), rgb(0, 255, 0), rgb(0, 255, 128), rgb(0, 255, 255), rgb(0, 128, 255), rgb(0, 0, 255), rgb(128, 0, 255), rgb(255, 0, 255), rgb(255, 0, 128));
    -webkit-background-clip: text;
  }
</style>
