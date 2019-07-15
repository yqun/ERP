<template>
  <div>
    <div class="main">
      <div>
        <h3>基本信息</h3>
        <ul class="info-content">
          <li><strong>申请类型</strong><span>项目借款</span></li>
          <li><strong>借款事由</strong><span>{{projectInfo.shortInfo}}</span></li>
          <li><strong>创建人　</strong><span>{{projectInfo.chineseName}}</span></li>
          <li><strong>项目　　</strong><span>{{projectInfo.projectName}}</span></li>
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
    name: "PserviceLoanItem",
    data() {
      return {
        data: {},
        key: '',
        businessKey: '',
        processInstanceId: '',

        roleInfo: {}, // 代办事项
        projectInfo: {}, // 项目表单数据
        projectName: [], // 业务员选择的项目
        projectId: '',
        buildContract: 'N', // 是否签订合同
        expenseBorrowDetailList: [], // 借款单据
        opinion: [], //意见
      }
    },
    mounted () {
      this.getQuery()
      this.getProjectInfo()
    },
    methods: {
      // 获取参数
      getQuery() {
        this.key = this.$route.query.key
        this.businessKey = this.$route.query.businessKey
        this.processInstanceId = this.$route.query.processInstanceId
      },
      // 获取项目表单数据
      getProjectInfo() {
        this.axios
          .get(`wechatErp/expenseBorrowPlatform/mobileQueryAllBxInfoById/${this.businessKey}`)
          .then(res => {
            console.log(res)
            const {data} = res
            this.projectInfo = data
            this.expenseBorrowDetailList = data.expenseBorrowDetailList
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
.vux-selector.weui-cell_select-after {
  padding-left: 0;
  font-size: 14px;
}
.vux-selector.weui-cell_select-after /deep/ .weui-select {
  height: 100%;
  line-height: unset;
}
.vux-selector.weui-cell_select-after /deep/ .weui-cell__hd {
  font-weight: 700;
}
</style>
