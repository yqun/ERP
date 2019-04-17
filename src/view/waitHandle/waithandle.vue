<template>
  <div class="waitHandle">
    <!-- 头部导航 -->
    <x-header style="background-color:#4b77b0;"
              :left-options="{backText: ''}"
              title="待处理">
    </x-header>
    <!-- 主体内容  main -->
    <div class="main">
      <!-- 按钮 -->
      <ul class="clearfix">
        <li class="waitHandleItem" @click="$router.push({path: '/contractList'})">
          <h3>{{ContractSum}}</h3>
          <p>合同审批</p>
        </li>
        <li class="waitHandleItem" @click="$router.push('/serviceExpenseList')">
          <h3>{{ServiceExpenseSum}}</h3>
          <p>项目报销</p>
        </li>
        <li class="waitHandleItem" @click="$router.push('/companyExpenseList')">
          <h3>{{CompanyExpenseSum}}</h3>
          <p>公司报销</p>
        </li>
        <!--<li class="waitHandleItem">-->
          <!--<h3>9</h3>-->
          <!--<p>标书购买</p>-->
        <!--</li>-->
        <!--<li class="waitHandleItem">-->
          <!--<h3>15</h3>-->
          <!--<p>标书购买</p>-->
        <!--</li>-->
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
      ]
      for(let i = 0; i < addressArr.length; i++) {
        this.getSum(addressArr[i])
      }
    },
    // 获取数据
    async getSum(url) {
      const res = await this.axios.get(url, {params: this.data})
      // 判断url
      switch(url) {
        case 'wechatErp/contract/getToDoForContractCount':
          this.ContractSum = res.data || 0;
          break;
        case 'wechatErp/expenseReimbursement/getToDoForBusinessBxCount':
          this.ServiceExpenseSum = res.data || 0
          break;
        case 'wechatErp/expenseReimbursementPlatform/getToDoForPlatformBxCount':
          this.CompanyExpenseSum = res.data || 0
          break;
      }
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
