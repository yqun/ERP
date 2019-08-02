<template>
  <div>
    <div class="main">
      <!-- 物品基本信息 -->
      <div>
        <h3>物品基本信息</h3>
        <ul class="info-content">
          <li><strong>费用所属</strong><span>{{costOwnership}}</span></li>
          <li v-if="projectInfo.costBelong == 'COST_BELONG-PROJECT'">
            <strong>项目名称</strong><span>{{projectInfo.projectName }}</span>
          </li>
          <li><strong>申请人</strong><span>{{projectInfo.userName}}</span></li>
          <li><strong>总金额</strong><span>{{projectInfo.totalMoney}}</span></li>
          <li v-if="projectInfo.receiptorName"><strong>领取人</strong><span>{{projectInfo.receiptorName}}</span></li>
        </ul>
      </div>
      <!-- 申请列表 -->
      <div>
        <h3>申请列表</h3>
        <table>
          <thead>
          <tr>
            <td>名称</td>
            <td>数量</td>
            <td>单价(元)</td>
            <td>总价(元)</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in warehouseApplyList" :key="item.id">
            <td>{{item.name}}</td>
            <td>{{item.count}}</td>
            <td>{{item.price}}</td>
            <td>{{item.totalPrice}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- 申请理由 -->
      <div>
        <h3 style="border: none;">申请理由</h3>
        <group :gutter="0">
          <x-textarea v-model="projectInfo.reason" readonly></x-textarea>
        </group>
      </div>
      <!-- 历史意见 -->
      <div>
        <h3>历史意见</h3>
        <table>
          <thead>
          <tr>
            <td>角色</td>
            <td>审批人员</td>
            <td>审批意见</td>
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
        </table>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "PgoodsReceiveItem",
  data() {
    return {
      key: '',
      businessKey: '',
      processInstanceId: '',

      projectInfo: {}, // 项目表单数据
      costOwnership: '', //项目所属
      warehouseApplyList: [], // 申请列表
      opinion: [], //意见

    }
  },
  mounted () {
    this.getQuery()
    this.getProjectInfo()
    this.getOpinion()
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
        .get(`wechatErp/wareHouse/getModelById/${this.businessKey}`)
        .then(res => {
          console.log(res)
          const {data} = res
          this.projectInfo = data
          this.warehouseApplyList = data.warehouseApplyList

          this.getCostOwnership(data.costBelong)
        })
    },
    // 获取费用所属
    getCostOwnership(costBelong) {
      this.axios
        .get(`wechatErp/center/subEnum/getSubEnumNameByCode/COST_BELONG/${costBelong}`)
        .then(res => {
          // console.log(res)
          this.costOwnership = res.data
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
/* 申请列表 */
table, table thead, table tbody, tr{
  width: 100%;
}
table thead tr {
  font-weight: 700;
}
td{
  width: 25%;
  text-align: center;
  font-size: 14px;
  padding: 4px 6px;
}
table tbody td {
  font-size: 12px;
}
</style>
