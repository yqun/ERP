<template>
  <div class="contract-item">
    <!-- 头部导航 -->
    <x-header style="background-color:#4b77b0;"
              :left-options="{backText: ''}"
              title="业务报销">
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
          <li>
            <strong>报销项目</strong>
            <span>
              <select id="selectBusinessMan" :disabled="this.activityID !== 'businessMan'">
                <option :selected="projectInfo.projectName == ''">请选择项目名称</option>
                <option :value="item.name"
                        v-for="item in projectAll"
                        :key="item.id">
                  {{item.name}}
                </option>
              </select>
            </span>
          </li>
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
          <!-- 见票据 -->
          <li v-if="projectInfo.zzKind == 3"><strong>转账类型</strong><span>见票据</span></li>
          <li v-if="projectInfo.zzKind != 2"><strong>领款人　</strong><span>{{projectInfo.payee}}</span></li>
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
          <span @click="$router.push({path: 'serviceExpenseItemData', query: {businessKey:businessKey}})">查看详情>></span>
        </h3>
        <ul class="info-content">
          <!-- 差旅费才有 -->
          <li v-if="projectInfo.kind == 2"><strong>出差人　　</strong><span>{{tApp.businessTraveller}}</span></li>
          <li v-if="projectInfo.kind == 2"><strong>出差事由　</strong><span>{{tApp.reason}}</span></li>
          <!-- 都有 -->
          <li><strong>报销总金额</strong><span>￥{{tApp.totalMoney}}</span></li>
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
            <tr v-for="item in opinion" :key="item.id">
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
          <flexbox-item>
            <div class="flex-demo">
              <x-button type="warn" style="backgroundColor: #dc4141; color: #fff;" @click.native="refuse()">拒绝</x-button>
            </div>
          </flexbox-item>
          <flexbox-item>
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
export default {
  name: "serviceExpenseItem",
  data() {
    return {
      data: {},
      key: '',
      taskId: '',
      activityID: '',
      businessKey: '',
      processInstanceId: '',
      projectInfo: {}, // 项目表单数据
      deductionDetailList: [],
      tApp: {},
      invoiceRadio: '',
      contractRadio: '',
      kindType: '',
      projectAll: [],
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
      let flag = true

      return flag;
    },
    // 回退按钮显示隐藏
    regressionHide() {
      let flag = true

      return flag;
    },
  },
  created() {
    this.getUserInfo();
    this.getQuery();
    this.getRoleInfo();      // 打开代办事项
    this.getProjectInfo();   // 项目表单数据
    this.getBusinessProject(); // 业务员项目
    this.getOpinion();       // 意见

  },
  methods: {
    // 获取 userInfo
    getUserInfo() {
      const user = JSON.parse(window.sessionStorage.getItem('data'))
      this.data.loginName = user.loginName
      this.data.password = user.password
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
        .get(`wechatErp/expenseReimbursement/mobileQueryAllBxInfoById/${this.businessKey}`)
        .then(res => {
          // console.log(res)
          const {data} = res
          this.projectInfo = data
          this.deductionDetailList = data.deductionDetailList
          this.invoiceRadio = data.haveInvoice || 'N'
          this.contractRadio = data.buildContract || 'N'
          if (data.kind == 1) this.kindType = '普', this.tApp = data.tAppCommonBx
          if (data.kind == 2) this.kindType = '旅', this.tApp = data.tAppBusinessTrip
        })
    },
    // 获取 业务员项目
    getBusinessProject() {
      const id = JSON.parse(window.sessionStorage.getItem('data')).id
      this.axios
        .get(`wechatErp/projectManager/getAllProjectList?createBy=${id}`)
        .then(res => {
          console.log(res)
          this.projectAll = res.data
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
          // console.log(res)
          this.opinion = res.data
        })
    },
    // 拒绝
    refuse() {
      console.log('拒绝')
      this.toastShow = true
      this.toastVal = '拒绝'
    },
    // 回退
    regression() {
      console.log('回退')
    },
    // 审批
    approval() {
      console.log('审批')
      // 数据
      const data = {
        message: this.message,
        taskId: this.taskId,
        procInstId: this.processInstanceId,
        role: this.roleInfo.roleName,
        businessKey : this.businessKey,
      }
      // 经理
      if (this.activityID == 'businessManager' || this.activityID == 'deptManager') {
        data.projectId = this.projectInfo.projectId,
        data.processInstanceId = this.processInstanceId,
        data.activityID = this.activityID
        // data.serviceMoney = serviceMoney,
        // data.forecastGrossProfit = forecastGrossProfit,
        // data.forecastInterestRate = forecastInterestRate
      }
      // 总经理
      if (this.activityID == 'gm') {
        data.contractVest = 123,
        data.isPass = 'Y'
      }
      console.log(data)
      //发送数据
      // if (this.activityID == 'businessManager' || this.activityID == 'deptManager') {
      //   this.managerSend(data)
      // }
      // else if (this.activityID == 'gm') {
      //   this.otherSend(data)
      // }
    },
    // 经理发送请求
    managerSend(data) {
      if (!this.message) {
        this.toastShow = true
        return this.toastVal = '请填写意见'
      }
      this.axios
        .post(`wechatErp/contract/saveServiceMoney`, data)
        .then(res => {
          console.log(res)
          this.toastShow = true
          this.toastVal = '审批成功'
          setTimeout(() => {
            this.$router.push('/serviceExpenseList')
          }, 800)
        })
    },
    // 其他角色发送请求
    otherSend(data) {
      if (!this.message) {
        this.toastShow = true
        return this.toastVal = '请填写意见'
      }
      this.axios
        .post(`wechatErp/contract/saveComment`, data)
        .then(res => {
          console.log(res)
          this.toastShow = true
          this.toastVal = '成功'
          setTimeout(() => {
            this.$router.push('/serviceExpenseList')
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
  font-size: 14px;
  margin-bottom: 0.1rem;
}
.info-content li strong {
  display: inline-block;
  width: 31%;
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
#selectBusinessMan {
  min-width: 100px;
  outline: none;
  border: none;
  vertical-align: top;
  background-color: transparent;
  color: #999;
  /* 清除 下拉小箭头 */
  appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;
  padding-right: 14px;
}
select::-ms-expand { display: none; }
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
</style>
