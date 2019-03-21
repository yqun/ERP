<template>
  <div class="waitHandleList">
    <!-- 头部导航 -->
    <x-header style="background-color:#4b77b0;"
              :left-options="{backText: ''}"
              title="合同评审">
    </x-header>
    <!-- main -->
    <div class="main">
      <!-- 搜索框 -->
      <div class="search">
        <input type="text" v-model="searchValue" placeholder="搜索">
      </div>
      <!-- 上拉加载 -->
      <scroller lock-x height="93%" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
        <div class="list">
          <ul>
            <li class="listItem clearfix" v-for="i in 15" :key="i" @click="$router.push({path: '/waitHandleItem', query: {id: i}})">
              <div class="clearfix" style="margin-bottom: 0.17rem;">
                <h4 style="float: left;">北京市中关村第一小学机房建设项目</h4>
                <x-icon type="ios-arrow-right" size="24" style="float: right;"></x-icon>
                <button style="float: right;">未审核</button>
              </div>
              <div class="clearfix p">
                <span style="float: left;">X1234567</span>
                <span style="float: right;">￥20000.00</span>
              </div>
            </li>
          </ul>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
export default {
  name: "waitHandleList",
  data() {
    return {
      scrollBottom: true, // 控制上拉加载
      list: [],
      searchValue: '', // 搜索关键字
    }
  },
  created() {

  },
  methods: {
    onScrollBottom () {
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
.waitHandleList {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.search {
  height: 0.5rem;
  /*background-color: red;*/
  padding-bottom: 0.15rem;
}
.search input {
  vertical-align: top;
  width: 100%;
  height: 100%;
  border: none;
  background-color: #e3e3e3;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 0 10px;
  outline: none;
  color: #fff;
}
.main {
  width: 100%;
  height: 92%;
  box-sizing: border-box;
  padding: 10px;
}
.listItem {
  font-size: 16px;
  border-bottom: 1px solid #e9e9e9;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0.25rem 4px 0.17rem 4px;
}
.listItem h4 {
  font-size: 0.24rem;
  color: #333;
  width: 75%;
  font-weight: 400;
}
.listItem button {
  font-size: 0.24rem;
  color: #fff;
  background-color: #6ea6ff;
  border: none;
  padding: 4px 4px;
  border-radius: 5px;
  margin-right: 0.1rem;
}
.listItem span {
  font-size: 0.24rem;
}
</style>
