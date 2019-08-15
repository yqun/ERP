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
          <li v-if="activityID == 'warehouseManager'">
            <strong>领取人</strong><span style="overflow: unset;width: 60%;">
            <el-autocomplete
              class="inline-input"
              popper-class="confirmlist"
              :popper-append-to-body="false"
              v-model="receiverName"
              :fetch-suggestions="querySearch"
              placeholder="业务员"
              value-key="chineseName"
              @select="handleSelect">
            </el-autocomplete>
            </span>
          </li>
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
      <!-- 审批意见 -->
      <div>
        <h3 style="border: none;">审批意见</h3>
        <group :gutter="0">
          <x-textarea v-model="message"></x-textarea>
        </group>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="footer">
      <div><x-button style="background-color: #6ea6ff;" @click.native="confirm()">通过</x-button></div>
      <div><x-button type="warn" @click.native="cancel()">拒绝</x-button></div>
      <div><x-button style="background-color: #bababa;" @click.native="$router.go(-1)">返回</x-button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodsReceiveItem",
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
      costOwnership: '', //项目所属
      warehouseApplyList: [], // 申请列表
      opinion: [], //意见
      message: '', //审批意见

      allUser: [],
      receiverName: '',
      receiverId: ''
    }
  },
  mounted () {
    this.getUserInfo()
    this.getQuery()
    this.getRoleInfo()
    this.getProjectInfo()
    this.getOpinion()

    this.getAllUser()
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.allUser;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.chineseName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      this.receiverId = item.id
    },
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
      const data =  {key: this.key, taskId: this.taskId, activityId: this.activityID}
      this.axios
        .get(`wechatErp/center/toTaskPage`, {params: data})
        .then(res => {
          // console.log(res)
          this.roleInfo = res.data
        })
    },
    // 获取所有业务员
    getAllUser() {
      this.axios
        .get(`wechatErp/projectManager/getAllUser`)
        .then(res => {
          // console.log(res)
          this.allUser = res.data
        })
    },
    // 获取项目表单数据
    getProjectInfo() {
      this.axios
        .get(`wechatErp/wareHouse/getModelById/${this.businessKey}`)
        .then(res => {
          // console.log(res)
          const {data} = res
          this.projectInfo = data
          this.warehouseApplyList = data.warehouseApplyList
          this.receiverName = data.receiptorName

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
    // 确定
    confirm() {
      if (!this.message.trim()) return this.$vux.toast.text('请填写审批意见')
      const data = {
        ...this.data,
        businessKey: this.businessKey,
        taskId: this.taskId,
        processInstanceId: this.processInstanceId,
        activityID: this.activityID,
        roleName: this.roleInfo.roleName,
        receiptor : this.receiverId || this.projectInfo.receiptor,
        totalMoney : this.projectInfo.totalMoney,
        isPass: 'Y',
        message: this.message,
      }
      this.sendData(data)
    },
    // 取消
    cancel() {
      if (!this.message.trim()) return this.$vux.toast.text('请填写审批意见')
      const data = {
        ...this.data,
        businessKey: this.businessKey,
        taskId: this.taskId,
        processInstanceId: this.processInstanceId,
        activityID: this.activityID,
        roleName: this.roleInfo.roleName,
        receiptor : this.receiverId || this.projectInfo.receiptor,
        totalMoney : this.projectInfo.totalMoney,
        isPass: 'N',
        message: this.message,
      }
      this.sendData(data);
    },
    sendData(data) {
      this.axios
        .post(`wechatErp/wareHouse/flowToNextActivity`, data)
        .then(res => {
          // console.log(res)
          const {resultState, messageInfo} = res.data
          if (resultState == 0) {
            this.$vux.toast.text('操作成功');
            setTimeout(() => {this.$router.go(-1)}, 800)
          } else {
            this.$vux.toast.text(res.data.resultInfo);
          }
        })
    }
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
/deep/ .confirmlist div.el-autocomplete-suggestion__wrap {
  max-height: 150px !important;
}
</style>
