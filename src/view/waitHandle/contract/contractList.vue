<template>
  <div class="waitHandleList">
    <!-- main -->
    <div class="main">
      <!-- 搜索框 -->
      <div class="search" v-if="false">
        <input type="text" v-model="searchValue" placeholder="搜索" disabled>
      </div>
      <!-- 上拉加载 -->
      <scroller lock-x height="100%" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
        <div class="list">
          <ul>
            <li class="listItem clearfix" v-for="item in list" :key="item.id" @click="routerLink(item)">
              <div class="clearfix listItem_top" style="margin-bottom: 0.17rem;">
                <span>{{item.startUser}}</span>
                <h4>{{item.projectName}}</h4>
              </div>
              <div class="clearfix listItem_bottom">
                <span class="time">{{item.dataFormat}}</span>
                <span>{{item.name}}</span>
              </div>
              <div class="icon">
                <x-icon type="ios-arrow-right" size="24"></x-icon>
              </div>
            </li>
            <li v-if="list.length == 0" style="text-align: center;">数据为空</li>
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
@import '../../../assets/css/waitHandleList.css';
.waitHandleList {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.search {
  height: 0.5rem;
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
  height: 100%;
  box-sizing: border-box;
}
</style>
