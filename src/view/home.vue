<template>
  <div>
    <!-- 头部导航 -->
    <x-header style="background-color:#4b77b0;"
              :left-options="{backText: ''}"
              title="内部IMP系统">
    </x-header>
    <!-- banner -->
    <div class="banner">
      <img src="../assets/images/banner.jpg" alt="banner">
    </div>
    <!-- main -->
    <div class="main">
      <!-- 三个按钮 -->
      <div class="status">
        <grid :show-lr-borders="false" :show-vertical-dividers="false">
          <grid-item class="statusItem">
            <img slot="icon" src="../assets/images/697d11c73f391af74e3bc5b31ec433f.png">
            <span slot="label">我发起的</span>
          </grid-item>
          <grid-item class="statusItem" link="/waithandle">
            <i v-if="waitHandleNum">{{waitHandleNum}}</i>
            <img slot="icon" src="../assets/images/4cdb9e3da1522ef57d3c7c61c3cae54.png">
            <span slot="label">待处理</span>
          </grid-item>
          <grid-item class="statusItem">
            <img slot="icon" src="../assets/images/606204896a7e1b053a0c88b601fceef.png">
            <span slot="label">已处理</span>
          </grid-item>
        </grid>
      </div>

      <!-- 常用应用 application -->
      <div class="application">
        <h3>常用应用</h3>
        <swiper height="4.05rem" dots-position="center" :show-dots="false" class="swiperstyle">
          <!-- 第一页 -->
          <swiper-item class="applicationItem">
            <grid :show-lr-borders="false" :show-vertical-dividers="false" :cols="4">
              <grid-item>
                <img slot="icon" src="../assets/images/application/组36@2x.png" style="">
                <span slot="label">报销(业务)</span>
              </grid-item>
              <grid-item>
                <img slot="icon" src="../assets/images/application/组37@2x.png" style="height: 0.9rem;">
                <span slot="label">报销(平台)</span>
              </grid-item>
            </grid>
          </swiper-item>
          <!--<swiper-item></swiper-item>-->
        </swiper>
      </div>
    </div>
    <!-- over -->
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      waitHandleNum: '99',
    }
  },
  created() {
    console.log(this)
  },
  methods: {

  },
}
</script>

<style scoped>
@import '../assets/css/vux-grid.css';
.banner {
  width: 100%;
  height: 2.5rem;
  position: relative;
  overflow: hidden;
}
.banner img {
  display: block;
  width: 100%;
  position: absolute;
  margin: auto;
  left: 50%;
  transform: translate(-50%);
}
/* 内容区域 */
.main {
  width: 100%;
  padding: 0px 10px;
  box-sizing: border-box;
  position: relative;
  top: -0.45rem;
}
/* 我发起的  待处理  已处理 */
.main > .status {
  background-color: #fff;
  height: 2.4rem;
  border-radius: 5px;
  box-shadow: 5px 8px 15px rgba(49, 101, 166, 0.33);
  box-sizing: border-box;
  padding: 10px;
}
.statusItem {
  font-size: 16px;
  text-align: center;
  color: #333;
  position: relative;
}
.statusItem img {
  display: inline-block;
  width: 1.2rem;
  height: 1.2rem;
  vertical-align: middle;
}
.statusItem i {
  display: block;
  padding: 0px 0.1rem;
  border-radius: 0.15rem;
  font-size: 0.2rem;
  position: absolute;
  top: 5%;
  left: 54%;
  font-style: normal;
  background-color: red;
}
/* 常用应用 */
.application {
  margin-top: 25px;
}
.application > h3 {
  font-size: 0.273rem;
  margin-bottom: 14px;
}
.application .applicationItem {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  box-sizing: border-box;
  padding: 10px;
}
.applicationItem a.weui-grid {
  padding: 0;
  height: 50%;
}
.applicationItem a.weui-grid >>> .weui-grid__icon {
  padding-top: 15px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.applicationItem img {
  height: 1rem;
  width: 1rem;
  margin: auto;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.applicationItem span {
  font-size: 14px;
}
/*swiper 样式修改*/
.vux-slider {
  border-radius: 5px;
  box-shadow: 5px 8px 15px rgba(49, 101, 166, 0.33);
}
.swiperstyle >>> .vux-indicator{
  bottom: -16px;
}
/* 点 */
.swiperstyle >>> .vux-indicator i.vux-icon-dot {
  width: 10px;
  height: 3px;
}
</style>
