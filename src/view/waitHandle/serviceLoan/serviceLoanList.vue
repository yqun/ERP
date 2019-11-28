<template>
  <!-- 公司借款 -->
  <div class="serviceExpense">
    <!-- nav导航 -->
    <div class="nav" v-if="false">
      <div>
        <select class="select">
          <option value ="">请选择流程名称</option>
        </select>
        <select class="select">
          <option value ="">请选择流程发起人</option>
        </select>
      </div>
      <div><button>查询</button></div>
      <div><button>重置</button></div>
    </div> <!-- nav -->
    <!-- 报销业务信息 -->
    <div class="main">
      <!--上拉加载-->
      <scroller lock-x height="100%" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
        <div class="list">
          <ul>
            <li class="listItem clearfix" v-for="item in waitHandleList" :key="item.id" @click="routerLink(item)">
              <div class="clearfix listItem_top" style="margin-bottom: 0.17rem;">
                <span>{{item.startUser}}</span>
                <h4>{{item.projectName || '非项目流程'}}</h4>
              </div>
              <div class="clearfix listItem_bottom">
                <span>{{item.createTime}}</span>
                <span>{{item.name}}</span>
              </div>
              <div class="icon">
                <x-icon type="ios-arrow-right" size="24"></x-icon>
              </div>
            </li>
            <li v-if="waitHandleList.length == 0" style="text-align: center; margin-top: 10px;">暂无数据</li>
          </ul>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
  export default {
    name: "serviceLoanList",
    data() {
      return {
        userInfoData: {}, //
        scrollBottom: true, // 上拉加载
        iDisplayStart: 0,
        iDisplayLength: 10,
        isData: true, // 判断是否还有数据
        waitHandleList: [], // 代办列表
      }
    },
    // 列表也去到详情页  不保存信息
    beforeRouteLeave(to, from, next) {
      to.meta.keepAlive = false;
      next();
    },
    mounted() {
      this.getUserInfo()
      this.getListData()
    },
    methods: {
      // 获取用户信息
      getUserInfo () {
        const user = JSON.parse(window.sessionStorage.getItem('data'))
        this.userInfoData.loginName = user.loginName
        this.userInfoData.password = user.password
      },
      // 列表数据
      getListData() {
        const data = {
          ...this.userInfoData,
          iDisplayStart: this.iDisplayStart,
          iDisplayLength: this.iDisplayLength
        }
        if (!this.isData) return false;
        this.axios
          .get(`wechatErp/expenseBorrow/getToDoForExpenseBorrow`, {params: data})
          .then(res => {
            // console.log(res)
            const {data} = res.data
            this.waitHandleList.push(...data)
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
        if (this.scrollBottom) {
          this.getListData();
          this.scrollBottom = false
          setTimeout(() => {
            this.scrollBottom = true
          }, 2000)
        }
      },
      // 路由跳转
      routerLink(item) {
        this.$router.push({
          path: '/serviceLoanItem',
          query: {
            key: item.key,
            taskId: item.id,
            activityID: item.activityID,
            businessKey: item.businessKey,
            processInstanceId: item.processInstanceId
          }
        })
      }
    }
  }
</script>

<style scoped>
@import '../../../assets/css/waitHandleList.css';
.serviceExpense {
  width: 100%;
  height: 100%;
  font-size: 16px;
  position: relative;
}
.nav {
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  position: relative;
  z-index: 999;
  box-sizing: border-box;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
}
.nav > div {
  /*width: 25%;*/
  float: left;
  text-align: center;
}
.nav > div:first-child {
  /*width: 50%;*/
}
/* 上拉加载 */
.main {
  width: 100%;
  height: 100%;
  /*padding-top: 0.8rem;*/
  /*margin-top: -0.8rem;*/
  position: relative;
  box-sizing: border-box;
  z-index: 0;
}
.select {
  /*width: 60px;*/
  height: 24px;
  font-size: 12px;
  border-radius: 6px;
  outline: none;
}
.nav > div > button {
  padding: 5px 16px;
  margin-left: 4px;
  border-radius: 6px;
  background-color: #6ea6ff;
  font-size: 12px;
  color: #fff;
  border: none;
}
</style>
