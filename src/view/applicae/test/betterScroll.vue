<template>
  <div class="main">
    <div class="wrapper" ref="wrapper">
      <ul class="clearfix">
        <li v-for="item in list">{{item}}</li>
        <li>{{upLoadText}}</li>
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
      scroll: null,
      list: 5,
      flag: true,
      upLoadText: '上拉加载',
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper,{
        startX:0,
        click:true,
        scrollX:false,
        scrollY:true,
        eventPassthrough:'horizontal',
        bounce: true, // 回弹效果，默认 true
        probeType: 2,
        bindToWrapper: false, //滚动的move事件绑定位置，false为document上，true为滚动的容器上
        pullUpLoad: { // 上拉加载
          threshold: 0,
          moreTxt: 'Load more',
          noMoreTxt: 'There is no more data',
        },
      });
      this.scroll.on('pullingUp', () => {
        if (!this.flag) return false;
        if (this.list > 20) return this.upLoadText = '到底了';
        this.upLoadText = '正在加载';
        this.flag = false;
        console.log('加载数据');
        setTimeout(() => {
          this.list += 5;
          this.scroll.finishPullUp();
          console.log('数据重置');
          this.flag = true
        },2000)
      })
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
  width: 100%;
  text-align: center;
  line-height: 50px;
  margin-bottom: 10px;
  background-color: #efefef;
}
</style>
