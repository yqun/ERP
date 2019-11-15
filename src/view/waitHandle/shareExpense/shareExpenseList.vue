<template>
  <!-- 客户报销 -->
  <div class="main">
    <!--上拉加载-->
    <scroller lock-x height="100%" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
      <div class="list">
        <ul>
          <li class="listItem clearfix" v-for="item in waitHandleList" :key="item.id" @click="routerLink(item)">
            <div class="clearfix" style="margin-bottom: 0.17rem;">
              <h4 style="float: left;">{{item.startUser}}</h4>
              <x-icon type="ios-arrow-right" size="24" style="float: right;position: relative;top: 18px;"></x-icon>
              <button style="float: right;">正在流转</button>
            </div>
            <div class="clearfix p">
              <span style="float: left;">{{item.createTime}}</span>
              <span style="float: right;">{{item.name}}</span>
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
    name: "shareExpenseList",
    data() {
      return {
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
    created() {
      this.getListData()
    },
    methods: {
      // 列表数据
      getListData() {
        const data = {
          ...this.$store.state.data,
          iDisplayStart: this.iDisplayStart,
          iDisplayLength: this.iDisplayLength
        }
        if (!this.isData) return false;
        this.axios
          .get(`wechatErp/expenseReimbursementDivide/getToDoForDivideBx`, {params: data})
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
          path: '/waithandle/shareExpenseItem',
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
@import '../../../assets/css/list.css';
.main {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
