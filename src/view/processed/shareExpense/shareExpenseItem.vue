<template>
  <div :style="styleNorol">
    <div class="main">
      <!-- 基本说明 -->
      <div>
        <h3>基本说明</h3>
        <ul class="info-content">
          <li><strong>报销事由</strong> <span>{{reimbursementInfo.shortInfo}}</span></li>
          <li><strong>流水号　</strong> <span>{{reimbursementInfo.ticketNum}}</span></li>
          <li><strong>报销人员</strong> <span>{{reimbursementInfo.chineseName}}</span></li>
          <li><strong>所属公司</strong> <span>{{companyInfo.name}}</span></li>
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
          <li v-if="activityID == 'cwSecond'">
            <strong>凭证号</strong>
            <span>
              <group :gutter="0">
                <x-input v-model="voucherNum" placeholder="请填写凭证号"></x-input>
              </group>
            </span>
          </li>
        </ul>
      </div>
      <!-- 报销单据 -->
      <div class="reimbursement">
        <h3>
          报销单据(普)
          <span @click="$router.push({path: '/processed/shareExpenseItemData', query:{businessKey:businessKey}})">查看详情>></span>
        </h3>
        <ul class="info-content">
          <!-- 普通 -->
          <li><strong>单张票据</strong><span>{{tApp.allInvoiceNum}}</span></li>
          <li><strong>报销总金额</strong><span>￥{{tApp.commonTotalMoney}}</span></li>
          <ul class="info-content">
            <li class="download clearfix">
              <strong>报销凭证</strong>
              <div>
                <p v-for="item in attachmentList" :key="item.id">
                  <span>{{item.name}}</span>
                  <a :href="axiosUrl + item.path">查看</a>
                </p>
              </div>
            </li>
          </ul>
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
  name: "PshareExpenseItem",
  data() {
    return {
      styleNorol: {
        overflow: 'hidden',
        height: 'unset'
      },
      key: '',
      taskId: '',
      activityID: '',
      businessKey: '',
      processInstanceId: '',
      roleInfo: {},

      reimbursementInfo: {}, // 报销信息
      deductionDetailList: [], // 抵扣
      attachmentList: [], // 报销凭证
      companyInfo: {}, // 公司信息
      opinion: [], // 历史意见
      kindType: '', // 报销类型
      tApp: {}, // 费用
      voucherNum: '', //财务填写凭证号
      message: '', // 审批意见
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
      this.axios.get(`wechatErp/expenseReimbursementDivide/mobileQueryAllBxInfoById/${this.businessKey}`)
        .then(res => {
          console.log(res)
          const {data} = res
          this.reimbursementInfo = data
          this.deductionDetailList = data.deductionDetailList
          this.attachmentList = data.attachmentList
          this.tApp = data.tAppCommonBx

          this.getCompany();
        })
    },
    // 获取公司信息
    getCompany() {
      this.axios.post(`wechatErp/center/getSubEnumModalsByCode/COMPANY-FLAG`)
        .then(res => {
          // console.log(res)
          const data = res.data
          this.companyInfo = data.filter(item => {
            return item.code == this.reimbursementInfo.companyCode
          })[0]
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
</style>
