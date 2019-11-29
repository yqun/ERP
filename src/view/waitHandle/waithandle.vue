<template>
  <div class="waitHandle">
    <!-- 主体内容  main -->
    <div class="main">
      <ul class="clearfix">
        <li class="waitHandleItem"
            v-for="item in info"
            :key="item.name"
            @click="$router.push(item.path)">
          <h3><span :style="{'backgroundColor': item.bgColor}">{{item.num}}</span></h3>
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
        {bgColor: '#feb206', name: '合同审批', path: '/contractList', num: ''},
        {bgColor: '#539cfa', name: '项目报销', path: '/serviceExpenseList', num: ''},
        {bgColor: '#539cfa', name: '公司报销', path: '/companyExpenseList', num: ''},
        {bgColor: '#3dcf52', name: '报销月计划', path: '/monthList', num: ''},
        {bgColor: '#3dcf52', name: '项目启动', path: '/initiationList', num: ''},
        {bgColor: '#539cfa', name: '公司借款', path: '/companyLoanList', num: ''},
        {bgColor: '#539cfa', name: '项目借款', path: '/serviceLoanList', num: ''},
        {bgColor: '#3dcf52', name: '物品领用', path: '/goodsReceiveList', num: ''},
        {bgColor: '#47b3e1', name: '采购追加', path: '/purchaseAppendList', num: ''},
        {bgColor: '#47b3e1', name: '采购流程', path: '/purchaseProcessList', num: ''},
        {bgColor: '#539cfa', name: '客户报销', path: '/customerExpenseList', num: ''},
        {bgColor: '#3dcf52', name: '公章借用', path: '/waithandle/borrowChapterList', num: ''},
        {bgColor: '#feb206', name: '客户管理', path: '/waithandle/customerManageList', num: ''},
        {bgColor: '#feb206', name: '合同变更', path: '/waithandle/changeContractList', num: ''},
        {bgColor: '#3dcf52', name: '公章使用', path: '/waithandle/borrowUseList', num: ''},
        {bgColor: '#539cfa', name: '分摊报销', path: '/waithandle/shareExpenseList', num: ''},
      ]
    }
  },
  mounted() {
    this.getUserInfo();
    this.loopAddress();
  },
  methods: {
    // 获取用户信息
    getUserInfo () {
      const user = JSON.parse(window.sessionStorage.getItem('data'));
      this.data.loginName = user.loginName;
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
        'wechatErp/expenseBorrowPlatform/getToDoForPlatformBorrowCount',
        'wechatErp/expenseBorrow/getToDoForExpenseBorrowCount',
        'wechatErp/wareHouse/getToDoForWareHouseCount',
        'wechatErp/purchaseAppend/getToDoForPurchaseAppendCount',
        'wechatErp/purchaseFlow/getToDoForPurchaseFlowCount',
        'wechatErp/expenseReimbursementClient/getToDoForClientBxCount',
        'wechatErp/sealBorrow/getToDoCount',
        'wechatErp/client/getToDoForClientCount',
        'wechatErp/contractChange/getToDoForContractChangeCount',
        'wechatErp/sealUse/getToDoForSealUseCount',
        'wechatErp/expenseReimbursementDivide/getToDoForDivideBxCount',
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
  background-color: #f8f8f8;
  /*height: 100%;*/
  /*overflow-y: auto;*/
}
/* 主体内容 */
.main {
  height: 100%;
  padding: 0 12px;
  box-sizing: border-box;
  overflow: hidden;
}
.main > ul {
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 0 4px 0 rgba(0,0,0,0.1);
  margin: 10px 0;
  width: 100%;
}
.waitHandleItem {
  width: 25%;
  height: 90px;
  padding: 20px 0 10px;
  background-color: #fff;
  text-align: center;
  float: left;
  box-sizing: border-box;
  border-right: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
}
.waitHandleItem h3 {
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 6px;
}
.waitHandleItem h3 span{
  display: block;
  margin: 0 auto;
  width: 30px;
  line-height: 30px;
  color:#fff;
  border-radius: 4px;
  background-color: skyblue;
}
.waitHandleItem p {
  font-size: 14px;
}
</style>
