<template>
  <div class="contract">
    <!-- 搜索框 -->
    <div class="search" v-if="false">
      <p style="float: left;">项目名称<i></i></p>
      <p style="float: right;">创建时间 <input type="text"> 到 <input type="text"></p>
    </div>
    <!-- 内容 -->
    <div class="main">
      <scroller lock-x height="100%" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
        <div class="list">
          <ul>
            <li class="listItem clearfix" v-for="item in list" :key="item.id" @click="routerLink(item)">
              <div class="clearfix listItem_top" style="margin-bottom: 0.17rem;">
                <span>{{item.startUser}}</span>
                <h4>{{item.projectName}}</h4>
              </div>
              <div class="clearfix listItem_bottom">
                <span>{{item.createTime}}</span>
                <span>{{item.name}}</span>
              </div>
              <div class="icon">
                <x-icon type="ios-arrow-right" size="24"></x-icon>
              </div>
            </li>
            <!-- 数据为空时显示 -->
            <li v-if="list.length == 0"
                style="text-align: center;">
              数据为空
            </li>
          </ul>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
import { dateFormat } from 'vux'
export default {
  name: "initiationList",
  data() {
    return {
      data: {},
      list: [],
      iDisplayStart: 0,
      iDisplayLength: 10,
      scrollBottom: true,
      isData: true,
    }
  },
  created() {
    this.$vux.loading.show({text: 'Loading'});
    this.getUserInfo ();
    this.getMonthInfo();
  },
  methods: {
    // 获取用户信息
    getUserInfo () {
      const user = JSON.parse(window.sessionStorage.getItem('data'))
      this.data.loginName = user.loginName
      this.data.password = user.password
    },
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
        ...this.data,
        iDisplayStart: this.iDisplayStart,
        iDisplayLength: this.iDisplayLength
      }
      if (!this.isData) return false;
      this.axios
        .get(`wechatErp/projectStart/getToDoForProjectStart`, {params: data})
        .then(res => {
          this.$vux.loading.hide();
          console.log(res)
          const {data} = res.data
          // data.forEach(item => {
          //   item.dataFormat = dateFormat(item.createTime, 'YYYY-MM-DD')
          // })
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
        path: '/createInitiation',
        query: {
          id: contract.id,
          key: contract.key,
          activityID: contract.activityID,
          businessKey: contract.businessKey,
          processInstanceId: contract.processInstanceId
        }
      })
    }
  }
}
</script>

<style scoped>
@import '../../../assets/css/waitHandleList.css';
.contract {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /*padding-top: 86px;*/
  font-size:16px;
  background-color: #f8f8f8;
}
div.vux-header {
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
}
/* search */
.search {
  position: fixed;
  z-index: 999;
  top: 46px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0 10px;
}
.search p {
  font-size: 14px;
}
.search p input {
  width: 70px;
  border: none;
  outline: none;
  background-color: #f2f2f2;
}
.main {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 0;
  /*background-color: #fff;*/
}
</style>

