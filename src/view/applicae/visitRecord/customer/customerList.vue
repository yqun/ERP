<template>
  <div style="height: 100%;">
    <!--上拉加载-->
    <scroller lock-x height="100%" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
      <group :gutter="0" class="list">
        <cell :title="item.companyName" v-for="item in list" :key="item.id" @click.native="routerLink(item)">
          <div slot="default">
            <rater v-model="item.level" :max="5" active-color="#04BE02" disabled :font-size="15"></rater>
          </div>
        </cell>
        <!--<ul>-->
          <!--<li class="listItem clearfix" v-for="item in list" :key="item.index" @click="routerLink(item)">-->
            <!--<div>{{item.companyName}}</div>-->
            <!--<div><rater v-model="item.level" :max="5" active-color="#04BE02" disabled :font-size="15"></rater></div>-->
          <!--</li>-->
          <!--&lt;!&ndash;<li v-if="list.length == 0" style="text-align: center; margin-top: 10px;">暂无数据</li>&ndash;&gt;-->
        <!--</ul>-->
      </group>
    </scroller>
  </div>
</template>

<script>
export default {
  name: "customerList",
  data() {
    return {
      value: '请输入账号',
      value1: '请输入密码',
      list: [], // 客户列表
      userInfoData: {}, // 账号，密码
      scrollBottom: true, // 上拉加载
      iDisplayStart: 0,
      iDisplayLength: 10,
      isData: true, // 判断是否还有数据
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
      }
      if (!this.isData) return false;
      this.axios
        .post(`wechatErp/crm/page`, data)
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
      const data = {
        name: '参数' + item.level
      }
      this.$store.commit('changeCustomer', data)
      this.$router.push({path: '/customerItem',})
    }
  }
}
</script>

<style scoped>
li.listItem {
  padding: 10px 15px;
  background-color: #fff;
  border-bottom: 1px solid #efefef;
}
li.listItem > div {
  float: left;
}
li.listItem > div:first-child {
  width: 70%;
  max-width: 300px;
}
li.listItem > div:last-child {
  width: 30%;
}
.weui-cell {
  font-size:16px;
}
</style>
