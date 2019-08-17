<template>
  <div class="waitHandle">
    <!-- 主体内容  main -->
    <div class="main">
      <!-- 按钮 -->
      <ul class="clearfix">
        <li class="waitHandleItem" v-for="item in info" :key="item.name" @click="$router.push(item.path)">
          <h3>{{item.num}}</h3>
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "sponsored",
  data() {
    return {
      data: {}, // 用户登陆账号 密码
      ContractSum: '', // 合同审批总条数
      ServiceExpenseSum: '', //业务报销条数
      CompanyExpenseSum: '', // 公司报销总条数
      info: [
        {name: '合同审批', path: '/SContractList', num: ''},
        {name: '项目报销', path: '/SserviceExpenseList', num: ''},
        {name: '公司报销', path: '/ScompanyExpenseList', num: ''},
        {name: '报销月计划', path: '/SmonthList', num: ''},
        {name: '项目启动', path: '/SinitiationList', num: ''},
        {name: '公司借款', path: '/ScompanyLoanList', num: ''},
        {name: '项目借款', path: '/SserviceLoanList', num: ''},
        {name: '物品领用', path: '/SgoodsReceiveList', num: ''},
        {name: '采购追加', path: '/SpurchaseAppendList', num: ''},
        {name: '采购流程', path: '/SpurchaseProcessList', num: ''},
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
        'wechatErp/contract/getContractMyStartProcessCount',
        'wechatErp/expenseReimbursement/getBusinessBxtMyStartProcessCount',
        'wechatErp/expenseReimbursementPlatform/getPlatformBxtMyStartProcessCount',
        'wechatErp/costPlan/getCostPlantMyStartProcessCount',
        'wechatErp/projectStart/getProjectStartMyStartProcessCount',
        'wechatErp/expenseBorrowPlatform/getPlatformBorrowMyStartProcessCount',
        'wechatErp/expenseBorrow/getExpenseBorrowMyStartProcessCount',
        'wechatErp/wareHouse/getWareHouseMyStartProcessCount',
        'wechatErp/purchaseAppend/getPurchaseAppendMyStartProcessCount',
        'wechatErp/purchaseFlow/getPurchaseFlowMyStartProcessCount',
      ]
      addressArr.forEach((item, index) => {
        this.getSum(item, index)
      })
    },
    // 获取数据
    async getSum(url, index) {
      const res = await this.axios.get(url, {params: this.data})
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
}
.waitHandleItem p {
  font-size: 0.273rem;
}
</style>
