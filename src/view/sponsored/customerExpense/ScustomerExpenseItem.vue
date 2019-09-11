<template>
  <div>
    <div class="main">
      <!-- 基本说明 -->
      <div>
        <h3>基本说明</h3>
        <ul class="info-content">
          <li><strong>报销事由</strong> <span>{{reimbursementInfo.shortInfo}}</span></li>
          <li><strong>流水号　</strong> <span>{{reimbursementInfo.ticketNum}}</span></li>
          <li><strong>报销人员</strong> <span>{{reimbursementInfo.chineseName}}</span></li>
          <li><strong>客户　　</strong> <span>{{reimbursementInfo.clientListStr}}</span></li>
          <li><strong>总金额　</strong> <span>{{reimbursementInfo.totalPrice}}</span></li>
          <li><strong>实报金额</strong> <span>{{reimbursementInfo.realTotalPrice}}</span></li>
          <li><strong>冲抵金额</strong> <span>{{reimbursementInfo.deductionTotalPrice}}</span></li>
          <!-- 个人转账 -->
          <li v-if="reimbursementInfo.zzKind == 1"><strong>转账类型</strong> <span>个人转账</span></li>
          <!-- 对公转账 -->
          <li v-if="reimbursementInfo.zzKind == 2">
            <strong>转账类型</strong> <span>对公转账</span>
          </li>
          <li v-if="reimbursementInfo.zzKind == 2">
            <strong>开户行</strong> <span>{{reimbursementInfo.bankName}}</span>
          </li>
          <li v-if="reimbursementInfo.zzKind == 2">
            <strong>账户名称</strong> <span>{{reimbursementInfo.accountName}}</span>
          </li>
          <li v-if="reimbursementInfo.zzKind == 2">
            <strong>银行账号</strong> <span>{{reimbursementInfo.bankNum}}</span>
          </li>
          <li v-if="reimbursementInfo.invoiceRadio == 'Y'">
            <strong>电子发票号</strong> <span>{{reimbursementInfo.invoiceCode}}</span>
          </li>
          <!-- 见票据 -->
          <li v-if="reimbursementInfo.zzKind == 3">
            <strong>转账类型</strong> <span>见票据</span>
          </li>
          <li v-if="reimbursementInfo.zzKind != 2">
            <strong>领款人</strong> <span>{{reimbursementInfo.payee}}</span>
          </li>
          <li>
            <strong>有无发票</strong>
            <span style="overflow: hidden">
                <checker v-model="reimbursementInfo.haveInvoice" type="radio"
                         default-item-class="check-defanult" selected-item-class="ckeck-sele">
                  <checker-item value="Y" disabled><x-icon type="ios-checkmark" size="20"></x-icon></checker-item> 有　
                  <checker-item value="N" disabled><x-icon type="ios-checkmark" size="20"></x-icon></checker-item> 无
                </checker>
              </span>
          </li>
        </ul>
      </div>
      <!-- 报销单据 -->
      <div class="reimbursement">
        <h3>
          报销单据({{kindType}})
          <span @click="$router.push({path: '/ScustomerExpenseItemData', query:{businessKey:businessKey}})">查看详情>></span>
        </h3>
        <ul class="info-content">
          <!-- 差旅费才有 -->
          <li v-if="reimbursementInfo.kind == 2"><strong>出差人　　</strong><span>{{tApp.businessTraveller}}</span></li>
          <li v-if="reimbursementInfo.kind == 2"><strong>出差事由　</strong><span>{{tApp.reason}}</span></li>
          <!-- 都有 -->
          <!-- 差旅 -->
          <li v-if="reimbursementInfo.kind == 2"><strong>报销总金额</strong><span>￥{{tApp.totalMoney}}</span></li>
          <!-- 普通 -->
          <li v-if="reimbursementInfo.kind == 1"><strong>报销总金额</strong><span>￥{{tApp.commonTotalMoney}}</span></li>
        </ul>
      </div>
      <!-- 借款抵扣信息 -->
      <div v-if="deductionDetailList.length">
        <h3>借款抵扣信息</h3>
        <x-table :cell-bordered="false" style="background-color:#fff;">
          <thead>
            <tr>
              <th>借款事由</th>
              <th>借款金额</th>
              <th>本次抵扣钱数</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in deductionDetailList" :key="item.id">
              <td>{{item.jkShortInfo}}</td>
              <td>{{item.jkTotalPrice}}</td>
              <td>{{item.deductionMoney}}</td>
            </tr>
          </tbody>
        </x-table>
      </div>
      <!-- 历史意见 -->
      <div>
        <h3>历史意见</h3>
        <x-table :cell-bordered="false" style="background-color:#fff;">
          <thead>
            <tr>
              <th>角色</th>
              <th>审批人员</th>
              <th>审批意见</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in opinion" :key="item.id">
              <td>{{item.role}}</td>
              <td>{{item.userName}}</td>
              <td>{{item.message}}</td>
            </tr>
            <tr v-if="opinion.length == 0">
              <td colspan="3"> 数据为空</td>
            </tr>
          </tbody>
        </x-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScustomerExpenseItem",
  data() {
    return {
      key: '',
      businessKey: '',
      processInstanceId: '',

      reimbursementInfo: {}, // 报销信息
      deductionDetailList: [], // 抵扣
      opinion: [], // 历史意见
      kindType: '', // 报销类型
      tApp: {}, // 费用
      allcontacts: [], //
    }
  },
  mounted() {
    this.getQuery();

    this.getReimbursementInfo();
    this.getOpinion();
  },
  methods: {
    // 获取参数
    getQuery() {
      this.key = this.$route.query.key
      this.businessKey = this.$route.query.businessKey
      this.processInstanceId = this.$route.query.processInstanceId
    },
    // 获取报销信息
    getReimbursementInfo() {
      this.axios.get(`wechatErp/expenseReimbursementClient/mobileQueryAllBxInfoById/${this.businessKey}`)
        .then(res => {
          // console.log(res)
          const {data} = res
          this.reimbursementInfo = data
          this.deductionDetailList = data.deductionDetailList
          if (data.kind == 1) this.kindType = '普', this.tApp = data.tAppCommonBx
          if (data.kind == 2) this.kindType = '旅', this.tApp = data.tAppBusinessTrip
          if (this.activityID !== 'businessMan') {
            // data.clientListStr
            let str = ''
            data.clientList.forEach(item => {
              str+=`${item.companyName},`
              data.clientListStr = str.substr(0,str.length - 1)
            })
          }
        })
    },
    // 意见
    getOpinion() {
      const data = {taskId: this.taskId, processInstanceId: this.processInstanceId,}
      this.axios
        .get(`wechatErp/center/getBeforeTaskComment`, {params: data})
        .then(res => {
          // console.log(res)
          this.opinion = res.data
        })
    },
  }
}
</script>

<style scoped>
@import '../../../assets/css/listItem.css';
@import '../../../assets/css/footer.css';
div.reimbursement > h3 > span {
  float: right;
  font-weight: 400;
  font-size: 14px;
  line-height: 25px;
}

/* 单选 */
.check-defanult {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #ccc;
  vertical-align: middle;
}
.ckeck-sele {
  border: 1px solid #6ea6ff;
}
.ckeck-sele .vux-x-icon {
  position: relative;
  top: -2px;
  left: -2px;
  fill: #6ea6ff;
}
.vux-x-icon {
  fill: transparent;
}

/* 选择客户 */
.chooseCustomer {
  display: inline-block;
  width: 65%;
  color: #999;
  font-size: 14px;

  /*overflow: scroll;*/
  /*white-space:nowrap;*/
  /*vertical-align: middle;*/
}
.contacts {
  width: 100%;
}
.contacts /deep/ .el-input.el-input--suffix input[type="text"]{
  border: none;
  padding-left: 0;
  /*border-top: 1px solid #D9D9D9;*/
  border-radius: 0;
}
</style>
