<template>
  <!-- 客户报销 -->
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
              <span>{{item.startTime | moment}}</span>
              <span>{{item.name || $store.state.listLinkText}}</span>
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
</template>

<script>
export default {
  name: "SorderSheetList",
  data() {
    return {
      userInfoData: {},
      scrollBottom: true, // 上拉加载
      iDisplayStart: 0,
      iDisplayLength: 10,
      isData: true, // 判断是否还有数据
      waitHandleList: [], // 代办列表
    }
  },
  mounted() {
    const user = JSON.parse(window.sessionStorage.getItem('data'));
    this.userInfoData.loginName = user.loginName;
    this.userInfoData.password = user.password;
    this.getListData();
  },
  methods: {
    // 列表数据
    getListData() {
      const data = {
        ...this.userInfoData,
        iDisplayStart: this.iDisplayStart,
        iDisplayLength: this.iDisplayLength
      };
      if (!this.isData) return false;
      this.axios
        .get(`wechatErp/purchaseExamine/getPurchaseExamineMyStartProcess`, {params: data})
        .then(res => {
          // console.log(res);
          const {data} = res.data;
          this.waitHandleList.push(...data);
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
        this.scrollBottom = false;
        setTimeout(() => {
          this.scrollBottom = true
        }, 2000)
      }
    },
    // 路由跳转
    routerLink(item) {
      this.$router.push({
        path: '/sponsored/orderSheetItem',
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
@import '../../../assets/css/waitHandleList.css';
.main {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
