<template>
  <div>
    <div class="main">
      <div>
        <h3>基本信息</h3>
        <ul class="info-content">
          <li><strong>申请类型</strong><span>公司借款</span></li>
          <li><strong>借款事由</strong><span>{{projectInfo.shortInfo}}</span></li>
          <li><strong>创建人　</strong><span>{{projectInfo.chineseName}}</span></li>
          <li><strong>所属公司</strong><span>{{companyName}}</span></li>
          <li><strong>总金额　</strong><span>{{projectInfo.totalPrice}}</span></li>
          <li><strong>部门名称</strong><span>{{projectInfo.deptName}}</span></li>
          <li v-if="projectInfo.zzKind == 1"><strong>领款人　</strong><span>{{projectInfo.payee}}</span></li>
          <li v-if="projectInfo.zzKind == 2"><strong>开户行　</strong><span>{{projectInfo.bankName}}</span></li>
          <li v-if="projectInfo.zzKind == 2"><strong>银行账号</strong><span>{{projectInfo.bankNum}}</span></li>
          <li v-if="projectInfo.zzKind == 2"><strong>银行账户</strong><span>{{projectInfo.bankAccount}}</span></li>
        </ul>
      </div>
      <!-- 借款单据 -->
      <div style="padding-bottom: 5px;">
        <h3>借款单据</h3>
        <x-table :cell-bordered="false">
          <thead>
          <tr>
            <th>事由</th>
            <th>内容</th>
            <th>金额</th>
            <th>附表单据</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in expenseBorrowDetailList" :key="item.id">
            <td>{{item.bxReasonName}}</td>
            <td>{{item.content}}</td>
            <td>{{item.singleTotalMoney}}</td>
            <td>{{item.invoiceNum}}</td>
          </tr>
          <tr v-if="!expenseBorrowDetailList.length">
            <td colspan="4">数据为空</td>
          </tr>
          </tbody>
        </x-table>
      </div>
      <!-- 审批意见 -->
      <div style="padding-bottom: 5px;">
        <h3>审批意见</h3>
        <x-table :cell-bordered="false">
          <thead>
          <tr>
            <th>角色</th>
            <th>审批人员</th>
            <th>审批意见</th>
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
      <!--　我的意见　-->
      <div>
        <h3 style="border-bottom: none;">我的意见</h3>
        <group :gutter="0">
          <x-textarea v-model="message" placeholder="请填写意见"></x-textarea>
        </group>
      </div>
    </div>
    <div class="footer">
      <div><x-button style="background-color: #6ea6ff;" @click.native="approval()">流转</x-button></div>
      <div v-if="activityID != 'cn'"><x-button type="warn" @click.native="refuse()">拒绝</x-button></div>
    </div>
  </div>
</template>
  <!-- 申请人部门经理      deptManager -->
  <!-- 营销中心总经理审批   marketingGeneralManager -->
  <!-- 总经理审核          gm -->
  <!-- 财务初审           cwFirst -->
  <!-- 财务总监           cfo -->
  <!-- 出纳              cn -->
<script>
export default {
  name: "companyLoanItem",
  data() {
    return {
      data: {},
      key: '',
      taskId: '',
      activityID: '',
      businessKey: '',
      processInstanceId: '',

      roleInfo: {}, // 代办事项
      projectInfo: {}, // 项目表单数据
      companyName: '', // 公司名称
      expenseBorrowDetailList: [], // 借款单据
      opinion: [], //意见
      message: '',
    }
  },
  mounted () {
    this.getUserInfo()
    this.getQuery()
    this.getRoleInfo()
    this.getProjectInfo()
    this.getOpinion()
  },
  methods: {
    // 获取 userInfo
    getUserInfo() {
      const user = JSON.parse(window.sessionStorage.getItem('data'))
      this.data.loginName = user.loginName
      this.data.currentUserId = user.id
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
      const data =  {key: this.key, taskId: this.taskId, activityId: this.activityID,}
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
        .get(`wechatErp/expenseBorrowPlatform/mobileQueryAllBxInfoById/${this.businessKey}`)
        .then(res => {
          // console.log(res)
          const {data} = res
          this.projectInfo = data
          this.expenseBorrowDetailList = data.expenseBorrowDetailList
          this.getcompany();
        })
    },
    // 获取 公司
    getcompany() {
      this.axios
        .post(`wechatErp/center/getSubEnumModalsByCode/COMPANY-FLAG`)
        .then(res => {
          // console.log(res)
          this.companyName = res.data.filter(item => {
            return item.code == this.projectInfo.companyCode
          })[0].name
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
    // 审批
    approval() {
      if (!this.message.trim()) return this.$vux.toast.text('请填写审批意见')
      const data = {
        ...this.data,
        businessKey: this.businessKey,
        taskId: this.taskId,
        processInstanceId: this.processInstanceId,
        activityID: this.activityID,
        roleName: this.roleInfo.roleName,
        id: this.projectInfo.id,
        creatorId:this.projectInfo.creatorId,
        isPass: 'Y',
        message: this.message,
      }
      // console.log(this.activityID)
      if (this.activityID == 'cwFirst') {
        this.cwFirst(data)
      } else {
        this.allSendData(data)
      }
    },
    // 拒绝
    refuse() {
      if (!this.message.trim()) return this.$vux.toast.text('请填写审批意见')
      const data = {
        ...this.data,
        businessKey: this.businessKey,
        taskId: this.taskId,
        processInstanceId: this.processInstanceId,
        activityID: this.activityID,
        roleName: this.roleInfo.roleName,
        id: this.projectInfo.id,
        creatorId:this.projectInfo.creatorId,
        isPass: 'N',
        message: this.message,
      }
      // console.log(data)
      if (this.activityID == 'cwFirst') {
        this.cwFirst(data)
      } else {
        this.allSendData(data)
      }
    },
    allSendData (data) {
      this.axios
        .post(`wechatErp/expenseBorrowPlatform/flowToNextActivityForQueryOnly`, data)
        .then(res => {
          // console.log(res)
          const {resultState, resultInfo} = res.data
          if (resultState == -1) return this.$vux.toast.text(resultInfo)
          this.$vux.toast.text('流转成功')
          setTimeout(() => {this.$router.go(-1)}, 800)
        })
    },
    // 财务初审 接口
    cwFirst(data) {
      this.axios
        .post(`wechatErp/expenseBorrowPlatform/flowToNextActivity`, data)
        .then(res => {
          // console.log(res)
          const {resultState, resultInfo} = res.data
          if (resultState == -1) return this.$vux.toast.text(resultInfo)
          this.$vux.toast.text('流转成功')
          setTimeout(() => {this.$router.go(-1)}, 800)
        })
    }
  }
}
</script>

<style scoped>
@import '../../../assets/css/listItem.css';
@import '../../../assets/css/footer.css';
</style>
