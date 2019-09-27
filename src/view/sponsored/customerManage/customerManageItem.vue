<template>
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
  </div>
</template>

<script>
export default {
  name: "ScustomerManageItem",
  data() {
    return {
      key: '',
      businessKey: '',
      processInstanceId: '',
      roleInfo: {},// 代办事项
      customerInfo: {}, // 客户信息
      contactsInfo: {}, //联系人信息
      industryType: '', // 行业类型
      opinion: [],
    }
  },
  created() {},
  mounted() {
    this.getQuery();// 获取参数
    this.getCustomerInfo(); // 获取客户信息
    this.getContactsInfo(); // 获取联系人信息
    this.getOpinion(); // 获取历史意见
  },
  methods: {
    getQuery() {
      this.key = this.$route.query.key
      this.businessKey = this.$route.query.businessKey
      this.processInstanceId = this.$route.query.processInstanceId
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
  }
}
</script>

<style scoped>
@import '../../../assets/css/listItem.css';
@import '../../../assets/css/x-table.css';
@import '../../../assets/css/footer.css';
</style>
