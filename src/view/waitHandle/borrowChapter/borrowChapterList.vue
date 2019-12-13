<template>
  <div class="serviceExpense" :style="{paddingBottom: paddingBottom}">
    <!-- nav导航 -->
    <div class="nav" v-if="false">
      <div>
        <select placeholder="请选择" class="select">
          <option value ="部门">部门</option>
        </select>
      </div>
      <div>
        <select placeholder="请选择" class="select">
          <option value ="业务员">业务员</option>
        </select>
      </div>
      <div><button>查询</button></div>
      <div><button>重置</button></div>
    </div>
    <!-- nav -->
    <div class="batchEdit" v-if="false">
      <span @click="batchEdit">编辑</span>
      <span @click="chooseAll()" v-if="isbatch">全部选择</span>
    </div>
    <!-- 报销业务信息 -->
    <div class="main">
      <!--上拉加载-->
      <scroller lock-x height="100%" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
        <div class="list">
          <ul>
            <li class="listItem clearfix"
                v-for="item in waitHandleList" :key="item.id"
                @click="routerLink(item)" :style="liStyle">

              <div class="clearfix listItem_top" style="margin-bottom: 0.17rem;">
                <h4>{{item.projectName}}</h4>
                <span>{{item.startUser}}</span>
              </div>
              <div class="clearfix listItem_bottom">
                <span class="time">{{item.createTime}}</span>
                <span>{{item.name}}</span>
              </div>

              <div class="batchBtn" v-if="isbatch" @click.stop="chooseBatchState()">
                <check-icon :value.sync="item.batchState" ></check-icon>
              </div>
              <div class="icon" v-if="!isbatch">
                <x-icon type="ios-arrow-right" size="24"></x-icon>
              </div>
            </li>
            <li v-if="waitHandleList.length == 0" style="text-align: center; margin-top: 10px;">暂无数据</li>
          </ul>
        </div>
      </scroller>
    </div>
    <div class="batchFooter" v-if="isbatch">
      <span class="impred" @click="cancelChoose()">取消</span>
      <span class="impblue">提交</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "borrowChapterList",
    data() {
      return {
        userInfoData: {}, //
        scrollBottom: true, // 上拉加载
        iDisplayStart: 0,
        iDisplayLength: 10,
        isData: true, // 判断是否还有数据
        waitHandleList: [], // 代办列表
        isbatch: false, // 批量审批
        paddingBottom: 0,
        liStyle: {},
      }
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
        };
        if (!this.isData) return false;
        this.axios
          .get(`wechatErp/sealBorrow/getToDoList`, {params: data})
          .then(res => {
            console.log(res);
            const {data} = res.data;
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
      batchEdit() {
        this.isbatch = true;
        this.paddingBottom = '40px';
        this.liStyle.paddingRight = '10px';
        this.liStyle.paddingLeft = '46px';

      },
      chooseAll() {
        this.waitHandleList.forEach(item => {
          this.$set(item, 'batchState', true)
        })
      },
      cancelChoose() {
        this.isbatch = false;
        this.liStyle = {};
        this.waitHandleList.forEach(item => {
          this.$set(item, 'batchState', false)
        })
      },
      chooseBatchState() {
        console.log(this.waitHandleList)

      },
      // 路由跳转
      routerLink(item) {
        this.$router.push({
          path: '/waithandle/borrowChapterItem',
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
  /*padding-top: 40px;*/
  /*box-sizing: border-box;*/
  position: relative;
}
/* 上拉加载 */
.main {
  height: 100%;
  box-sizing: border-box;
  z-index: 0;
}
.nav {
  width: 100%;
  height: 40px;
  line-height: 40px;
  position: absolute;
  top: 0;
  z-index: 999;
  box-sizing: border-box;
}
.nav > div {
  width: 25%;
  float: left;
  text-align: center;
}
.select {
  width: 60px;
  height: 24px;
  font-size: 12px;
  border-radius: 6px;
  outline: none;
}
.nav > div > button {
  padding: 5px 16px;
  border-radius: 6px;
  background-color: #6ea6ff;
  font-size: 12px;
  color: #fff;
  border: none;
}
</style>
