<template>
  <div>
    <div class="main">
      <!-- 客户信息 -->
      <div>
        <h3>客户信息</h3>
        <ul class="info-content">
          <li><strong>客户名称</strong><span>{{customerInfo.companyName || '无'}}</span></li>
          <li><strong>行业类型</strong><span>{{industryType || '无'}}</span></li>
          <li>
            <strong>客户级别</strong>
            <span v-if="!!customerInfo.level">
              <rater disabled v-model="customerInfo.level*1" :max="5" active-color="green" :font-size="20"></rater>
            </span>
          </li>
          <li>
            <strong>省/市/区</strong>
            <span v-if="!!customerInfo.provinceName || !!customerInfo.cityName || !!customerInfo.areaName">
              {{customerInfo.provinceName}}/{{customerInfo.cityName}}/{{customerInfo.areaName}}
            </span>
          </li>
          <li><strong>　　邮编</strong><span>{{customerInfo.postalCode || '无'}}</span></li>
          <li><strong>　　固话</strong><span>{{customerInfo.phone || '无'}}</span></li>
          <li><strong>客户类型</strong><span>{{customerInfo.typeStr || '无'}}</span></li>
          <li><strong>电子邮件</strong><span>{{customerInfo.email || '无'}}</span></li>
          <li><strong>　　传真</strong><span>{{customerInfo.fax || '无'}}</span></li>
          <li><strong>　　主页</strong><span>{{customerInfo.homePage || '无'}}</span></li>
          <li><strong>通讯地址</strong><span>{{customerInfo.address || '无'}}</span></li>
          <li><strong>承诺金额</strong><span>{{customerInfo.committedAmount || '无'}}</span></li>
          <li><strong>简介</strong></li>
          <li>
            <x-textarea placeholder="简介" disabled v-model="customerInfo.companyIntro"></x-textarea>
          </li>
        </ul>
      </div>
      <!-- 主要联系人 -->
      <div>
        <h3>主要联系人</h3>
        <ul class="info-content">
          <li><strong>联系人姓名</strong><span>{{contactsInfo.name || '无'}}</span></li>
          <li><strong>联系人职务</strong><span>{{contactsInfo.duty || '无'}}</span></li>
          <li><strong>　出生日期</strong><span>{{contactsInfo.birthday | momentDay}}</span></li>
          <li><strong>　家庭电话</strong><span>{{contactsInfo.homePhone || '无'}}</span></li>
          <li><strong>　　　传真</strong><span>{{contactsInfo.fax || '无'}}</span></li>
          <li><strong>　　　部门</strong><span>{{contactsInfo.department || '无'}}</span></li>
          <li><strong>　　子部门</strong><span>{{contactsInfo.subDepartment || '无'}}</span></li>
          <li><strong>　移动电话</strong><span>{{contactsInfo.mobilePhone || '无'}}</span></li>
          <li><strong>　通讯地址</strong><span>{{contactsInfo.address || '无'}}</span></li>
          <li><strong>　办公电话</strong><span>{{contactsInfo.officePhone || '无'}}</span></li>
          <li><strong>　　email</strong><span>{{contactsInfo.email || '无'}}</span></li>
          <li><strong>　　　备注</strong><span>{{contactsInfo.remark || '无'}}</span></li>
        </ul>
      </div>
      <!-- 历史意见 -->
      <div>
        <h3>历史意见</h3>
        <table>
          <thead>
          <tr>
            <td>角色</td><td>审批人员</td><td>审批意见</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in opinion" :key="item.id">
            <td>{{item.role}}</td>
            <td>{{item.userName}}</td>
            <td>{{item.message}}</td>
          </tr>
          <tr v-if="opinion.length == 0"><td colspan="3"> 数据为空</td></tr>
          </tbody>
        </table>
      </div>
      <!-- 审批意见 -->
      <group :gutter="0">
        <h3 style="border: none;">审批意见</h3>
        <x-textarea v-model="message" placeholder="请填写审批意见"></x-textarea>
      </group>
    </div>
    <div class="footer">
      <div v-if="activityID !== 'sub_4'"><x-button style="background-color: #6ea6ff;" @click.native="confirm()">通过</x-button></div>
      <div v-if="activityID !== 'sub_4'"><x-button type="warn" @click.native="refuse()">拒绝</x-button></div>
      <div v-if="activityID == 'sub_3'"><x-button type="warn" @click.native="regression()">回退</x-button></div>
      <div v-if="activityID == 'sub_4'"><x-button style="background-color: #6ea6ff;" @click.native="edit()">编辑</x-button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "customerManageItem",
  data() {
    return {
      key: '',
      taskId: '',
      activityID: '',
      businessKey: '',
      processInstanceId: '',
      roleInfo: {},// 代办事项
      customerInfo: {}, // 客户信息
      contactsInfo: {}, //联系人信息
      industryType: '', // 行业类型

      opinion: [],
      message: '',
    }
  },
  created() {},
  mounted() {
    this.getQuery();// 获取参数
    this.getRoleInfo();// 打开代办事项
    this.getCustomerInfo(); // 获取客户信息
    this.getContactsInfo(); // 获取联系人信息
    this.getOpinion(); // 获取历史意见
  },
  methods: {
    getQuery() {
      this.key = this.$route.query.key
      this.taskId = this.$route.query.taskId
      this.activityID = this.$route.query.activityID
      this.businessKey = this.$route.query.businessKey
      this.processInstanceId = this.$route.query.processInstanceId
    },
    getRoleInfo() {
      const data =  {key: this.key, taskId: this.taskId, activityId: this.activityID}
      this.axios
        .get(`wechatErp/center/toTaskPage`, {params: data})
        .then(res => {
          // console.log(res)
          this.roleInfo = res.data
        })
    },
    getCustomerInfo() {
      this.axios.get(`wechatErp/client/getModelById/${this.businessKey}`)
        .then(res => {
          // console.log(res)
          const data = res.data
          if(data.type == "1"){
            data.typeStr = "普通客户";
          }else if(data.type == "2"){
            data.typeStr = "重要客户";
          }else if(data.type == "3"){
            data.typeStr = "合作伙伴";
          }
          this.customerInfo = data
          if (this.customerInfo.industry) {
            this.getIndustry(); // 获取行业类型
          }
        })
    },
    getContactsInfo() {
      this.axios.get(`wechatErp/client/getModelByClientId/${this.businessKey}`)
        .then(res => {
          // console.log(res)
          this.contactsInfo = res.data
        })
    },
    getIndustry() {
      this.axios.post(`wechatErp/center/subEnum/getSubEnumByCode/${this.customerInfo.industry}`)
        .then(res => {
          // console.log(res)
          this.industryType = res.data
        })
    },
    getOpinion() {
      const data = {taskId: this.taskId, processInstanceId: this.processInstanceId,}
      this.axios.get(`wechatErp/center/getBeforeTaskComment`, {params: data})
        .then(res => {
          this.opinion = res.data
        })
    },
    confirm() {
      if (!this.message) return this.$vux.toast.text('请填写审批意见')
      const data = {
        ...this.$store.state.data,
        businessKey: this.businessKey,
        taskId: this.taskId,
        processInstanceId: this.processInstanceId,
        activityID: this.activityID,
        roleName: this.roleInfo.roleName,
        currentNode: this.roleInfo.taskName,
        contactsId:this.contactsInfo.id,
        id: this.customerInfo.id,
        isPass: 'Y',
        state: 'Y',
        message:  this.message
      }
      this.sendData(data)
    },
    refuse() {
      if (!this.message) return this.$vux.toast.text('请填写审批意见')
      const data = {
        ...this.$store.state.data,
        businessKey: this.businessKey,
        taskId: this.taskId,
        processInstanceId: this.processInstanceId,
        activityID: this.activityID,
        roleName: this.roleInfo.roleName,
        currentNode: this.roleInfo.taskName,
        contactsId:this.contactsInfo.id,
        id: this.customerInfo.id,
        isPass: 'N',
        state: 'N',
        message:  this.message
      }
      this.sendData(data)
    },
    regression() {
      if (!this.message) return this.$vux.toast.text('请填写审批意见')
      const data = {
        ...this.$store.state.data,
        businessKey: this.businessKey,
        taskId: this.taskId,
        processInstanceId: this.processInstanceId,
        activityID: this.activityID,
        roleName: this.roleInfo.roleName,
        currentNode: this.roleInfo.taskName,
        contactsId:this.contactsInfo.id,
        id: this.customerInfo.id,
        isPass: 'R',
        state: 'R',
        message:  this.message
      }
      this.sendData(data)
    },
    sendData(data) {
      // console.log(data)
      this.axios.post(`wechatErp/client/approval`, data)
        .then(res => {
          // console.log(res)
          const {resultState} = res.data
          if (resultState !== 0) return this.$vux.toast.text(res.data.resultInfo);
          this.$vux.toast.text('操作成功');
          setTimeout(() => {this.$router.go(-1)}, 800)
        })
    },
  }
}
</script>

<style scoped>
@import '../../../assets/css/listItem.css';
@import '../../../assets/css/x-table.css';
@import '../../../assets/css/footer.css';
</style>
