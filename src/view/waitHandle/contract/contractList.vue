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
        <input type="text" v-model="searchValue" placeholder="搜索" disabled>
      </div>
      <!-- 上拉加载 -->
      <scroller lock-x height="93%" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
        <div class="list">
          <ul>
            <li class="listItem clearfix" v-for="item in list" :key="item.id" @click="routerLink(item)">
              <div class="clearfix" style="margin-bottom: 0.17rem;">
                <h4 style="float: left;">{{item.projectName}}</h4>
                <x-icon type="ios-arrow-right" size="24" style="float: right;"></x-icon>
                <button style="float: right;">{{item.status}}</button>
              </div>
              <div class="clearfix p">
                <span style="float: left;">{{item.dataFormat}}</span>
                <span style="float: right;">{{item.startUser}}</span>
              </div>
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
  name: "contractList",
  data() {
    return {
      data: {},
      searchValue: '', // 搜索关键字
      list: [],
      scrollBottom: true, // 控制上拉加载
      // 分页数据
      iDisplayStart: 0,
      iDisplayLength: 10,
      isData: true, // 判断是否还有数据
    }
  },
  created() {
    this.getUserInfo()
    this.getContractInfo()
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
      this.getContractInfo()
      this.scrollBottom = false
      setTimeout(() => {
        this.scrollBottom = true
      }, 2000)
    },
    // 获取数据
    getContractInfo() {
      const data = {
        ...this.data,
        iDisplayStart: this.iDisplayStart,
        iDisplayLength: this.iDisplayLength
      }
      if (!this.isData) return false;
      this.axios
        .get(`wechatErp/contract/getToDoForContract`, {params: data})
        .then(res => {
          console.log(res)
          const {data} = res.data
          data.forEach(item => {
            item.dataFormat = dateFormat(item.taskCreateTime, 'YYYY-MM-DD HH:mm:ss')
          })
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
        path: '/contractItem',
        query: {
          key: contract.key,
          taskId: contract.id,
          activityId: contract.activityID,
          businessKey: contract.businessKey,
          processInstanceId: contract.processInstanceId
        }
      })
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
