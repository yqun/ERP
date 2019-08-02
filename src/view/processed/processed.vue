<template>
  <div class="waitHandle">
    <!-- 头部导航 -->
    <!--<x-header style="background-color:#4b77b0;"-->
              <!--:left-options="{backText: ''}"-->
              <!--title="已处理">-->
    <!--</x-header>-->
    <!-- 主体内容  main -->
    <div class="main">
      <!-- 按钮 -->
      <ul class="clearfix">
        <!--<li class="waitHandleItem" @click="$router.push({path: '/PContractList'})">-->
          <!--<h3 :style="{'font-size': size}">{{ContractSum}}</h3>-->
          <!--<i>({{ContractSum}})</i>-->
          <!--<p>合同审批</p>-->
        <!--</li>-->
        <li class="waitHandleItem" v-for="item in info" :key="item.name" @click="$router.push({path: item.path})">
          <h3 :style="{'font-size': item.fontSize}">{{item.num}}</h3>
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "processed",
  data() {
    return {
      size: '0.55rem',
      data: {}, // 用户登陆账号 密码
      ContractSum: '',        // 合同审批总条数
      ServiceExpenseSum: '',  // 业务报销总条数
      CompanyExpenseSum: '',  // 公司报销条数
      info: [
        {name: '合同审批', path: '/PContractList', fontSize: '0.55rem', num: ''},
        {name: '项目报销', path: '/PserviceExpenseList', fontSize: '0.55rem', num: ''},
        {name: '公司报销', path: '/PcompanyExpenseList', fontSize: '0.55rem', num: ''},
        {name: '报销月计划', path: '/PmonthList', fontSize: '0.55rem', num: ''},
        {name: '项目启动', path: '/PinitiationList', fontSize: '0.55rem', num: ''},
        {name: '公司借款', path: '/PcompanyLoanList', fontSize: '0.55rem', num: ''},
        {name: '项目借款', path: '/PserviceLoanList', fontSize: '0.55rem', num: ''},
        {name: '物品领用', path: '/PgoodsReceiveList', fontSize: '0.55rem', num: ''},
      ],
    }
  },
  created() {
    this.getUserInfo();
    this.loopAddress();
  },
  methods: {
    // 获取用户信息
    getUserInfo () {
      const user = JSON.parse(window.sessionStorage.getItem('data'))
      this.data.loginName = user.loginName
      this.data.password  = user.password
    },
    // 根据地址发送请求
    loopAddress() {
      const addressArr = [
        'wechatErp/contract/getContractAlreadyDoneTaskCount',
        'wechatErp/expenseReimbursement/getBusinessBxAlreadyDoneTaskCount',
        'wechatErp/expenseReimbursementPlatform/getPlatformBxAlreadyDoneTaskCount',
        'wechatErp/costPlan/getCostPlanAlreadyDoneTaskCount',
        'wechatErp/projectStart/getProjectStartAlreadyDoneTaskCount',
        'wechatErp/expenseBorrowPlatform/getPlatformBorrowAlreadyDoneTaskCount',
        'wechatErp/expenseBorrow/getExpenseBorrowAlreadyDoneTaskCount',
        'wechatErp/wareHouse/getWareHouseAlreadyDoneTaskCount',
      ]
      addressArr.forEach((item, index) => {
        this.getSum(item, index)
      })
    },
    // 获取数据
    async getSum(url, index) {
      const res = await this.axios.get(url, {params: this.data})
      // 判断url
      this.info[index].num = res.data || 0;
      // 根据数字长度判断 字体大小
      if (this.info[index].num <= 99999) this.info[index].fontSize = '0.45rem'
      if (this.info[index].num <= 9999)  this.info[index].fontSize = '0.5rem'
      if (this.info[index].num <= 999)   this.info[index].fontSize = '0.55rem'
    },
  }
}
</script>

<style scoped>
/* 页面背景 */
.waitHandle {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
}
/* 主体内容 */
.main {
  height: 100%;
  padding: 0 12px;
  box-sizing: border-box;
  overflow: hidden;
}
.main > ul {
  width: 110%;
}
.waitHandleItem {
  width: 1.8rem;
  height: 1.8rem;
  background-color: #fff;
  text-align: center;
  float: left;
  border-radius: 10px;
  box-shadow:4px 4px 14px rgba(202, 228, 251, 0.5);
  margin-right: 0.3rem;
  margin-top: 0.26rem;
  padding-top: 0.3rem;
  box-sizing: border-box;
}
.waitHandleItem h3 {
  font-size: 0.55rem;
  color: #6ea6ff;
  height: 0.8rem;
  line-height: 0.8rem;
}
.waitHandleItem i {
  font-style: normal;
  font-size: 0.21rem;
}
.waitHandleItem p {
  font-size: 0.273rem;
}
</style>
