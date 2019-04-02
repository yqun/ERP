<template>
  <div class="contract-item">
    <!-- 头部导航 -->
    <x-header style="background-color:#4b77b0;"
              :left-options="{backText: ''}"
              title="业务报销">
    </x-header>

    <!-- 内容部分 -->
    <div class="main">
      <scroller lock-x height="100%" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
        <div class="list">
          <!-- 表头 -->
          <h3>{{title}}</h3>
          <ul>
            <li class="info-content" v-for="item in 10" :key="item" v-if="false">
              <p><strong>报销科目</strong><span>汽油费</span></p>
              <p><strong>替票科目</strong><span>汽油费</span></p>
              <p><strong>摘要　　</strong><span>汽油费</span></p>
              <p><strong>报销项目</strong><span>汽油费</span></p>
              <p><strong>金额　　</strong><span>汽油费</span></p>
              <p><strong>附单据数</strong><span>汽油费</span></p>
            </li>
            <li class="info-content travel" v-for="item in 10" :key="item" v-if="true">
              <p><strong>出发　　</strong><span>1111</span></p>
              <p><strong>到达　　</strong><span>1111</span></p>
              <p><strong>人数　　</strong><span>1111</span></p>
              <p><strong>交通　　</strong><span>高铁　￥200.00</span></p>
              <p><strong>出差补助</strong><span>2天　100元/天　<i>￥200.00</i></span></p>
              <p><strong>住宿费用</strong><span><i>￥1200.00</i></span></p>
              <p><strong>室内交通</strong><span><i>￥1200.00</i></span></p>
              <p><strong>其他费用</strong><span><i>￥1200.00</i></span></p>
              <p><strong>合计　　</strong><span><i>￥1200.00</i></span></p>
            </li>
          </ul>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
export default {
  name: "serviceExpenseItemData",
  data() {
    return {
      title: '普通费用',
      scrollBottom: true, // 上拉加载
    }
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = true;  // 让 A 缓存，即不刷新
    next();
  },
  methods: {
    onScrollBottom() {
      if (this.scrollBottom) {
        console.log(1)
        this.scrollBottom = false
        setTimeout(() => {
          this.scrollBottom = true
        }, 2000)
      }
    }
  }
}
</script>

<style scoped>
/* 固定头部导航 */
.contract-item {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 46px;
  font-size:16px;
  background-color: #f8f8f8;
}
.vux-header {
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
}
/* 内容 */
.main {
  box-sizing: border-box;
  padding: 0 10px;
  height: 100%;
  width: 100%;
  font-size: 14px;
}
h3 {
  color: #6ea6ff;
  padding: 10px 0;
  border-bottom: 1px solid #dcdcdc;
}
.info-content {
  border-bottom: 1px solid #dcdcdc;
  padding: 5px 0;
}
.info-content p {
  margin: 6px 0;
}
.info-content p strong {
  display: inline-block;
  width: 30%;
}
.info-content p span {
  display: inline-block;
  max-width: 65%;
  color: #999;
}
li.info-content.travel p span i {
  color: #eb4f4f;
  font-style: normal;
}
</style>
