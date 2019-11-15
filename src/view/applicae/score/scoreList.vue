<template>
  <div class="contract">
    <!-- 内容 -->
    <div class="main">
      <scroller lock-x height="100%" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
        <div class="list">
          <ul>
            <li class="listItem clearfix" v-for="item in 5" :key="item.id" @click="routerLink(item)">
              <div class="clearfix" style="margin-bottom: 0.17rem;">
                <h4 style="float: left; width: 70%;">{{item.name}}</h4>
                <x-icon type="ios-arrow-right" size="24" style="float: right;"></x-icon>
                <button style="float: right;">{{item.chineseName}}</button>
              </div>
              <div class="clearfix p">
                <span style="float: left;">{{item.code}}</span>
                <span style="float: right;">{{item.createTime | moment}}</span>
              </div>
            </li>
            <!-- 数据为空时显示 -->
            <li v-if="list.length == 0" style="text-align: center;">数据为空</li>
          </ul>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
export default {
  name: "scoreList",
  data() {
    return {
      list: [],
      iDisplayStart: 0,
      iDisplayLength: 10,
      scrollBottom: true,
      isData: true,
    }
  },
  mounted() {
    // this.$vux.loading.show({text: 'Loading'});
    this.getMonthInfo();
  },
  methods: {
    // 下拉加载
    onScrollBottom () {
      if (!this.scrollBottom) return false;
      this.getMonthInfo()
      this.scrollBottom = false
      setTimeout(() => {
        this.scrollBottom = true
      }, 2000)
    },
    // 获取数据
    getMonthInfo() {
      const data = {
        ...this.$store.state.data,
        iDisplayStart: this.iDisplayStart,
        iDisplayLength: this.iDisplayLength
      };
      if (!this.isData) return false;
      this.axios.post(`wechatErp/projectManager/page`, data)
        .then(res => {
          // this.$vux.loading.hide();
          const {data} = res.data
          console.log(res)
          this.list.push(...data)
          const page = Math.ceil(res.data.page.totalResult/10)
          // 总页数 大于当前页数
          if (page > (this.iDisplayStart/10 + 1)) {
            this.iDisplayStart+=10
          } else {
            this.isData = false;
          }
        })
    },
    // 路由跳转
    routerLink(contract) {
      this.$router.push({
        path: '/applicae/scoreItem',
        query: {
          id: contract.id,
          createBy: contract.createBy
        }
      })
    }
  }
}
</script>

<style scoped>
@import '../../../assets/css/list.css';
.contract {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /*padding-top: 46px;*/
  font-size:16px;
  background-color: #f8f8f8;
}
.main {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  /*background-color: #fff;*/
}
</style>
