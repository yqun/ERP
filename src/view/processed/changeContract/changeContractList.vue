<template>
  <div class="serviceExpense">
    <!-- 报销业务信息 -->
    <div class="main">
      <!--上拉加载-->
      <scroller lock-x height="100%" @  on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
        <div class="list">
          <ul>
            <li class="listItem clearfix" v-for="item in list" :key="item.id" @click="routerLink(item)">
              <div class="clearfix" style="margin-bottom: 0.17rem;">
                <h4 style="float: left;">{{item.projectName}}</h4>
                <x-icon type="ios-arrow-right" size="24"></x-icon>
                <button style="float: right;">{{$store.state.listBtnText}}</button>
              </div>
              <div class="clearfix p">
                <span style="float: left;">{{item.startTime | moment}}</span>
                <span style="float: right;">{{item.name || '已完结'}}</span>
              </div>
            </li>
            <li v-if="list.length == 0" style="text-align: center; margin-top: 10px;">暂无数据</li>
          </ul>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
export default {
  name: "PchangeContractList",
  data() {
    return {
      userInfoData: {}, //
      scrollBottom: true, // 上拉加载
      iDisplayStart: 0,
      iDisplayLength: 10,
      isData: true, // 判断是否还有数据
      list: [], // 代办列表
    }
  },
  mounted() {
    const user = JSON.parse(window.sessionStorage.getItem('data'));
    this.userInfoData.loginName = user.loginName;
    this.userInfoData.password = user.password;
    this.getListData()
  },
  methods: {
    // 列表数据
    getListData() {
      const data = {
        ...this.userInfoData,
        iDisplayStart: this.iDisplayStart,
        iDisplayLength: this.iDisplayLength
      }
      if (!this.isData) return false;
      this.axios.get(`wechatErp/contractChange/getContractChangeAlreadyDoneTask`, {params: data})
        .then(res => {
          // console.log(res)
          const {data} = res.data
          this.list.push(...data)
          const page = Math.ceil(res.data.page.totalResult/10)
          if (page > (this.iDisplayStart/10 + 1)) {
            this.iDisplayStart+=10
          } else {
            this.isData = false;
          }
        })
    },
    // 上拉加载
    onScrollBottom () {
      if (!this.scrollBottom) return false;
      this.getListData();
      this.scrollBottom = false
      setTimeout(() => {this.scrollBottom = true}, 2000)
    },
    // 路由跳转
    routerLink(item) {
      this.$router.push({
        path: '/processed/changeContractItem',
        query: {
          key: item.key,
          businessKey: item.businessKey,
          processInstanceId: item.processInstanceId
        }
      })
    }
  }
}
</script>

<style scoped>
@import '../../../assets/css/list.css';
.serviceExpense {
  width: 100%;
  height: 100%;
}
/* 上拉加载 */
.main {
  height: 100%;
  box-sizing: border-box;
  z-index: 0;
}
</style>

