<template>
  <div class="waitHandle">
    <!-- 头部导航 -->
    <x-header style="background-color:#4b77b0;"
              :left-options="{backText: ''}"
              title="待处理">
    </x-header>
    <!-- 主体内容  main -->
    <div class="main">
      <ul class="clearfix">
        <li class="waitHandleItem"
            v-for="item in info"
            :key="item.name"
            @click="$router.push(item.path)">
          <h3>{{item.num}}</h3>
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "waitHandle",
  data() {
    return {
      data: {}, // 用户登陆账号 密码
      ContractSum: '',       // 合同审批总条数
      ServiceExpenseSum: '', // 项目报销总条数
      CompanyExpenseSum: '', // 公司报销总条数
      reimbursementMonth:'', // 报销月计划
      info: [
        {name: '合同审批', path: '/contractList', num: ''},
        {name: '项目报销', path: '/serviceExpenseList', num: ''},
        {name: '公司报销', path: '/companyExpenseList', num: ''},
        {name: '报销月计划', path: '/monthList', num: ''},
        {name: '项目启动', path: '/initiationList', num: ''},
        // {name: '公司借款', path: '/companyLoanList', num: ''},
        // {name: '物品领用', path: '/goodsReceiveList', num: ''},
      ]
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
      this.data.password = user.password
    },
    // 根据地址发送请求
    loopAddress() {
      const addressArr = [
        'wechatErp/contract/getToDoForContractCount',
        'wechatErp/expenseReimbursement/getToDoForBusinessBxCount',
        'wechatErp/expenseReimbursementPlatform/getToDoForPlatformBxCount',
        'wechatErp/costPlan/getToDoForCostPlanCount',
        'wechatErp/projectStart/getToDoForProjectStartCount',
        // 'wechatErp/projectStart/getToDoForProjectStartCount',
        // 'wechatErp/projectStart/getToDoForProjectStartCount',
      ]
      addressArr.forEach((item, index) => {
        this.getSum(item, index)
      })
    },
    // 获取数据
    async getSum(url, index) {
      const res = await this.axios.get(url, {params: this.data})
      // console.log(res)
      this.info[index].num = res.data || 0;
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
  padding: 10px 12px;
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
}
.waitHandleItem p {
  font-size: 0.273rem;
}
</style>
