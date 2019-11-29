<template>
  <div class="waitHandle">
    <!-- 主体内容  main -->
    <div class="main">
      <!-- 按钮 -->
      <ul class="clearfix">
        <li class="waitHandleItem" v-for="item in info" :key="item.name" @click="$router.push(item.path)">
          <h3><span :style="{'backgroundColor': item.bgColor}">{{item.num}}</span></h3>
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
        {bgColor: '#feb206', name: '合同审批', path: '/SContractList', num: ''},
        {bgColor: '#539cfa', name: '项目报销', path: '/SserviceExpenseList', num: ''},
        {bgColor: '#539cfa', name: '公司报销', path: '/ScompanyExpenseList', num: ''},
        {bgColor: '#3dcf52', name: '报销月计划', path: '/SmonthList', num: ''},
        {bgColor: '#3dcf52', name: '项目启动', path: '/SinitiationList', num: ''},
        {bgColor: '#539cfa', name: '公司借款', path: '/ScompanyLoanList', num: ''},
        {bgColor: '#539cfa', name: '项目借款', path: '/SserviceLoanList', num: ''},
        {bgColor: '#3dcf52', name: '物品领用', path: '/SgoodsReceiveList', num: ''},
        {bgColor: '#47b3e1', name: '采购追加', path: '/SpurchaseAppendList', num: ''},
        {bgColor: '#47b3e1', name: '采购流程', path: '/SpurchaseProcessList', num: ''},
        {bgColor: '#539cfa', name: '客户报销', path: '/ScustomerExpenseList', num: ''},
        {bgColor: '#3dcf52', name: '公章借用', path: '/sponsored/borrowChapterList', num: ''},
        {bgColor: '#feb206', name: '客户管理', path: '/sponsored/customerManageList', num: ''},
        {bgColor: '#feb206', name: '合同变更', path: '/sponsored/changeContractList', num: ''},
        {bgColor: '#3dcf52', name: '公章使用', path: '/sponsored/borrowUseList', num: ''},
        {bgColor: '#539cfa', name: '分摊报销', path: '/sponsored/shareExpenseList', num: ''},
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
        'wechatErp/expenseReimbursementClient/getClientBxtMyStartProcessCount',
        'wechatErp/sealBorrow/getMyStartProcessCount',
        'wechatErp/client/getClientMyStartProcessCount',
        'wechatErp/contractChange/getContractChangetMyStartProcessCount',
        'wechatErp/sealUse/getSealUseMyStartProcessCount',
        'wechatErp/expenseReimbursementDivide/getDivideBxtMyStartProcessCount',
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
  background-color: #f8f8f8;
  /*height: 100%;*/
  /*padding-bottom: 0.26rem;*/
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
