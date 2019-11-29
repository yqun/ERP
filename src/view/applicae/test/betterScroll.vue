<template>
  <div class="main">
    <div class="wrapper" ref="wrapper">
      <ul class="clearfix">
        <li v-for="item in 10">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  name: "betterScroll",
  data() {
    return {

    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper,{
        startX:0,
        click:true,
        scrollX:true,
        scrollY:false,
        eventPassthrough:'vertical'
      });
    });
  },
  methods: {

  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
}
.wrapper{
  overflow:hidden;
  height:200px;
  background-color: #ccc;
  width: 200px;
}
ul li{
  height:50px;
  float: left;
  width: 50px;
  margin-bottom: 10px;
  background-color: #efefef;
}
</style>
