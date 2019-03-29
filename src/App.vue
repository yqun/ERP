<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

html, body, #app {
  width: 100%;
  height: 100%;
  /*overflow: hidden;*/
}
body {
  background-color: #f2f2f2;
  font-size: 16px;
}
</style>
