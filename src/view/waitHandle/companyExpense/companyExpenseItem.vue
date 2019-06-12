<template>
  <div class="contract-item">
    <!-- 头部导航 -->
    <x-header style="background-color:#4b77b0;"
              :left-options="{backText: ''}"
              title="公司报销">
    </x-header>
    <!-- 内容 -->
    <div class="main">
      <!-- 项目信息 -->
      <div class="project-info">
        <h3>基本说明</h3>
        <ul class="info-content">
          <li><strong>报销事由</strong><span>{{projectInfo.shortInfo}}</span></li>
          <li><strong>流水号　</strong><span>{{projectInfo.ticketNum}}</span></li>
          <li><strong>报销人员</strong><span>{{projectInfo.chineseName}}</span></li>
          <!-- projectInfo.projectName -->
          <li><strong>所属公司</strong><span>{{companyName}}</span></li>
          <li><strong>总金额　</strong><span>{{projectInfo.totalPrice}}</span></li>
          <li><strong>实报金额</strong><span>{{projectInfo.realTotalPrice}}</span></li>
          <li><strong>冲抵金额</strong><span>{{projectInfo.deductionTotalPrice}}</span></li>
          <!-- 个人转账 -->
          <li v-if="projectInfo.zzKind == 1"><strong>转账类型</strong><span>个人转账</span></li>
          <!-- 对公转账 -->
          <li v-if="projectInfo.zzKind == 2"><strong>转账类型</strong><span>对公转账</span></li>
          <li v-if="projectInfo.zzKind == 2"><strong>开户行</strong><span>{{projectInfo.bankName}}</span></li>
          <li v-if="projectInfo.zzKind == 2"><strong>账户名称</strong><span>{{projectInfo.accountName}}</span></li>
          <li v-if="projectInfo.zzKind == 2"><strong>银行账号</strong><span>{{projectInfo.bankNum}}</span></li>
          <li v-if="invoiceRadio == 'Y'"><strong>电子发票号</strong><span>{{projectInfo.invoiceCode}}</span></li>
          <!-- 见票据 -->
          <li v-if="projectInfo.zzKind == 3"><strong>转账类型</strong><span>见票据</span></li>
          <li v-if="projectInfo.zzKind != 2"><strong>领款人　</strong><span>{{projectInfo.payee}}</span></li>
          <!-- 填写凭证号 -->
          <li v-if="activityID == 'cwSecond' || activityID == 'cn'"><strong>凭证号　</strong>
            <span>
              <input id="voucher" type="text"
                     placeholder="请填写凭证号"
                     v-model="voucherNum"
                     :disabled="activityID == 'cn'">
            </span>
          </li>
          <li>
            <strong>有无发票</strong>
            <span>
              <checker v-model="invoiceRadio" type="radio"
                 default-item-class="check-defanult" selected-item-class="ckeck-sele">
                <checker-item value="Y" disabled><x-icon type="ios-checkmark" size="20"></x-icon></checker-item> 有　
                <checker-item value="N" disabled><x-icon type="ios-checkmark" size="20"></x-icon></checker-item> 无
              </checker>
            </span>
          </li>
          <li>
            <strong>签订合同</strong>
            <span>
              <checker v-model="contractRadio" type="radio" :radio-required="true"
                 default-item-class="check-defanult" selected-item-class="ckeck-sele">
                <checker-item value="Y" disabled><x-icon type="ios-checkmark" size="20"></x-icon></checker-item> 是　
                <checker-item value="N" disabled><x-icon type="ios-checkmark" size="20"></x-icon></checker-item> 否
              </checker>
            </span>
          </li>
        </ul>
      </div>
      <!-- 报销充借 -->
      <div>
        <h3>报销充借</h3>
        <div class="info-content">
          <x-table :content-bordered="false" :cell-bordered="false">
            <thead>
            <tr>
              <th style="font-weight: 700">序号</th>
              <th style="font-weight: 700">借款事由</th>
              <th style="font-weight: 700">借款金额</th>
              <th style="font-weight: 700">本次抵扣钱数</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in deductionDetailList" :key="item.id">
              <td>{{index+1}}</td>
              <td>{{item.jkShortInfo}}</td>
              <td>{{item.jkTotalPrice}}</td>
              <td>{{item.deductionMoney}}</td>
            </tr>
            <tr v-if="deductionDetailList.length == 0">
              <td colspan="4">数据为空</td>
            </tr>
            </tbody>
          </x-table>
        </div>
      </div>
      <!-- 报销单据 -->
      <div class="reimbursement">
        <h3>
          报销单据({{kindType}})
          <span @click="$router.push({path: 'companyExpenseItemData', query: {businessKey:businessKey}})">查看详情>></span>
        </h3>
        <ul class="info-content">
          <!-- 差旅费才有 -->
          <li v-if="projectInfo.kind == 2"><strong>出差人　　</strong><span>{{tApp.businessTraveller}}</span></li>
          <li v-if="projectInfo.kind == 2"><strong>出差事由　</strong><span>{{tApp.reason}}</span></li>
          <!-- 都有 -->
          <!-- 差旅 -->
          <li v-if="projectInfo.kind == 2"><strong>报销总金额</strong><span>￥{{tApp.totalMoney}}</span></li>
          <!-- 普通 -->
          <li v-if="projectInfo.kind == 1"><strong>报销总金额</strong><span>￥{{tApp.commonTotalMoney}}</span></li>
        </ul>
      </div>
      <!-- 历史意见 -->
      <div>
        <h3>历史意见</h3>
        <div class="info-content">
          <x-table :content-bordered="false" :cell-bordered="false">
            <thead>
            <tr>
              <th style="font-weight: 700">角色</th>
              <th style="font-weight: 700">审批人</th>
              <th style="font-weight: 700">审批意见</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in opinion" :key="item.id" v-if="item.message">
              <td>{{item.role}}</td>
              <td>{{item.userName}}</td>
              <td>{{item.message}}</td>
            </tr>
            <tr v-if="opinion.length == 0">
              <td colspan="3">数据为空</td>
            </tr>
            </tbody>
          </x-table>
        </div>
      </div>
      <!-- 我的意见 -->
      <div>
        <h3>我的意见</h3>
        <group>
          <x-textarea placeholder="请填写我的审批意见" v-model="message"></x-textarea>
        </group>
      </div>
      <!-- 底部按钮 -->
      <div class="footer">
        <flexbox>
          <flexbox-item v-if="refuseHide">
            <div class="flex-demo">
              <x-button type="warn" style="backgroundColor: #dc4141; color: #fff;" @click.native="refuse()">拒绝</x-button>
            </div>
          </flexbox-item>
          <flexbox-item v-if="regressionHide">
            <div class="flex-demo">
              <x-button type="warn" style="backgroundColor: #dc4141; color: #fff;" @click.native="regression()">回退</x-button>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">
              <x-button type="primary" style="backgroundColor: #6ea6ff; color: #fff;" @click.native="approval()">流转</x-button>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
      <!-- 提示信息 -->
      <toast v-model="toastShow" :text="toastVal" position="middle" type="text"></toast>
    </div>
  </div>
</template>

<script>
import { dateFormat } from 'vux'
export default {
  name: "companyExpenseItem",
  data() {
    return {
      data: {},
      key: '',
      taskId: '',
      activityID: '',
      businessKey: '',
      processInstanceId: '',
      projectInfo: {}, // 项目表单数据
      voucherNum: '',
      deductionDetailList: [],
      tApp: {},
      invoiceRadio: '',
      contractRadio: '',
      kindType: '',
      companyCode: '', // 所属公司code
      companyName: '', // 所属公司
      roleInfo: {}, // 代办事项
      opinion: [], // 意见
      message: '',
      // 提示信息
      toastShow: false,
      toastVal: '',
    }
  },
  computed: {
    // 拒绝按钮显示隐藏
    refuseHide() {
      let flag = false
      if (this.activityID == 'businessManager' || this.activityID == 'deptManager'
        || this.activityID == 'gm' || this.activityID == 'marketGm' ) flag = true
      return flag;
    },
    // 回退按钮显示隐藏
    regressionHide() {
      let flag = false
      if (this.activityID == 'cwFirst' || this.activityID == 'cfo') flag = true
      return flag;
    },
  },
  created() {
    this.getUserInfo();
    this.getQuery();
    this.getRoleInfo();      // 打开代办事项
    this.getProjectInfo();   // 项目表单数据
    this.getOpinion();       // 意见
  },
  methods: {
    // 获取 userInfo
    getUserInfo() {
      const user = JSON.parse(window.sessionStorage.getItem('data'))
      this.data.loginName = user.loginName
      this.data.password = user.password
      this.data.id = user.id
    },
    // 获取参数
    getQuery() {
      this.key = this.$route.query.key
      this.taskId = this.$route.query.taskId
      this.activityID = this.$route.query.activityID
      this.businessKey = this.$route.query.businessKey
      this.processInstanceId = this.$route.query.processInstanceId
    },
    // 打开代办事项
    getRoleInfo() {
      // console.log(this.data)
      const data =  {
        key: this.key,
        taskId: this.taskId,
        activityId: this.activityID,
      }
      this.axios
        .get(`wechatErp/center/toTaskPage`, {params: data})
        .then(res => {
          // console.log(res)
          this.roleInfo = res.data
        })
    },
    // 获取项目表单数据
    getProjectInfo() {
      this.axios
        .get(`wechatErp/expenseReimbursementPlatform/mobileQueryAllBxInfoById/${this.businessKey}`)
        .then(res => {
          // console.log(res)
          const {data} = res
          this.projectInfo = data
          this.deductionDetailList = data.deductionDetailList
          this.voucherNum = data.voucherNum
          // 所属公司
          this.companyCode = data.companyCode
          // 合同 发票
          this.contractRadio = data.buildContract || 'N'
          this.invoiceRadio = data.haveInvoice || 'N'
          if (data.kind == 1) this.kindType = '普', this.tApp = data.tAppCommonBx
          if (data.kind == 2) this.kindType = '旅', this.tApp = data.tAppBusinessTrip

          this.getcompany(); // 获取所属公司
        })
    },
    // 获取 公司
    getcompany() {
      const id = JSON.parse(window.sessionStorage.getItem('data')).id
      var a = 'COMPANY-FLAG'
      this.axios
        .post(`wechatErp/center/getSubEnumModalsByCode/${a}`)
        .then(res => {
          res.data.forEach(item => {
            if (item.code == this.companyCode) {
              this.companyName = item.name
            }
          })
        })
    },
    // 意见
    getOpinion() {
      const data = {
        taskId: this.taskId,
        processInstanceId: this.processInstanceId,
      }
      this.axios
        .get(`wechatErp/center/getBeforeTaskComment`, {params: data})
        .then(res => {
          console.log(res)
          this.opinion = res.data
        })
    },
    // 拒绝
    refuse() {
      const data = {  // 审批数据
        loginName: this.data.loginName,
        currentUserId: this.data.id,
        businessKey : this.businessKey,
        taskId: this.taskId,
        processInstanceId: this.processInstanceId,
        activityID: this.activityID,
        roleName: this.roleInfo.roleName,
        id: this.projectInfo.id,
        creatorId: this.projectInfo.creatorId,
        kind: this.projectInfo.kind,
        isPass: 'N',
        message: this.message,
      };
      //发送数据
      this.processSend(data)
    },
    // 回退
    regression() {
      const data = {  // 审批数据
        loginName: this.data.loginName,
        currentUserId: this.data.id,
        businessKey : this.businessKey,
        taskId: this.taskId,
        processInstanceId: this.processInstanceId,
        activityID: this.activityID,
        roleName: this.roleInfo.roleName,
        id: this.projectInfo.id,
        creatorId: this.projectInfo.creatorId,
        kind: this.projectInfo.kind,
        isPass: 'N',
        message: this.message,
      };
      //发送数据
      this.processSend(data)
    },
    // 审批
    approval() {
      const data = {  // 审批数据
        loginName: this.data.loginName,
        currentUserId: this.data.id,
        businessKey : this.businessKey,
        taskId: this.taskId,
        processInstanceId: this.processInstanceId,
        activityID: this.activityID,
        roleName: this.roleInfo.roleName,
        id: this.projectInfo.id,
        creatorId: this.projectInfo.creatorId,
        kind: this.projectInfo.kind,
        isPass: 'Y',
        message: this.message,
      };
      if (this.activityID == 'cwSecond') { // 财务填写凭证号
        data.voucherNum = this.voucherNum
      }
      console.log(data)
      //发送数据
      this.processSend(data)
    },
    // 发送请求
    processSend(data) {
      if (this.activityID == 'cwSecond' && !data.voucherNum.trim() && data.isPass == 'Y') return this.toastShow = true, this.toastVal = '请填写凭证号'
      if (!this.message.trim()) return this.toastShow = true, this.toastVal = '请填写意见'
      this.axios
        .post(`wechatErp/expenseReimbursementPlatform/flowToNextActivityForQueryOnly`, data)
        .then(res => {
          // console.log(res)
          const {resultState, messageInfo} = res.data
          this.toastShow = true
          this.toastVal = messageInfo
          if (resultState == -1) return false;
          setTimeout(() => {
            this.$router.go(-1)
          }, 800)
        })
    }
  }
}
</script>

<style scoped>
/* 固定头部导航 */
.contract-item {
  width: 100%;
  box-sizing: border-box;
  padding-top: 46px;
  font-size:16px;
  background-color: #f8f8f8;
}
.vux-header {
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
}
/* 内容 */
.main {
  width: 100%;
}
.main > div {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.26rem;
  margin-bottom: 0.17rem;
  background-color: #fff;
}
.main > div h3 {
  font-size: 16px;
  color: #6ea6ff;
  border-bottom: 1px solid #dcdcdc;
  padding: 0.17rem 0;
}
.main > div .info-content {
  padding: 0.2rem 0 0.17rem 0;
}
.info-content li {
  font-size: 0;
  margin-bottom: 0.1rem;
}
.info-content li strong {
  display: inline-block;
  width: 31%;
  font-size: 14px;
  vertical-align: middle;
}
.info-content li span {
  display: inline-block;
  max-width: 69%;
  color: #999;
  font-size: 14px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space:nowrap;
  vertical-align: middle;
}
.info-content li span::-webkit-scrollbar {
  display: none;
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
/* 凭证号 */
#voucher {
  outline: none;
  border: none;
  background-color: transparent;
}
/* 报销单据 */
.main .reimbursement > h3 span {
  float: right;
  font-weight: 400;
  font-size: 14px;
  line-height: 25px;
}
/*报销充借*/
table.vux-table {
  font-size: 12px;
}
.vux-table td:before, .vux-table th:before {
  border: none;
}
.vux-table:after {
  border: none;
}
.vux-table td {
  color: #999;
}
/* 我的意见 */
/deep/ .weui-cells:after,
/deep/ .weui-cells:before {
  border: none;
}
.weui-cell.vux-x-textarea {
  border: 1px solid #dcdcdc;
  border-radius: 10px;
}
/deep/ .weui-textarea {
  font-size: 14px;
}
/* 按钮 */
div.footer {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin: 0;
}
  /* 表格 */
.vux-table td {
  max-width: 100px;
}
.vux-table {
  line-height: 20px;
}
</style>
