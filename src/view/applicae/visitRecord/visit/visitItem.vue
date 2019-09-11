<template>
  <div style="box-sizing: border-box;border-top: 1px solid transparent;">
    <group title="拜访记录" style="margin-bottom: 10px;">
      <cell title="开始时间" :value="visitInfo.startTime"></cell>
      <cell title="结束时间" :value="visitInfo.endTime"></cell>
      <cell title="时长(小时)" :value="visitInfo.duration"></cell>
      <x-input title="外出事由" disabled :show-clear="false" text-align="right"
               v-model="visitInfo.reason">
      </x-input>
      <selector title="客户" :readonly="isDisabled" direction="rtl" :options="customer"
                :value-map="['id','companyName']" placeholder="请选择客户"
                v-model="visitRecordInfo.companyName" @on-change="getProject">
      </selector>
      <selector title="项目" :readonly="isDisabled" direction="rtl" :options="project"
                :value-map="['id','text']" placeholder="请选择项目"
                v-model="visitRecordInfo.projectName" @on-change="getContacts">
      </selector>
      <selector title="联系人" :readonly="isDisabled" direction="rtl" :options="contacts"
                :value-map="['id','text']" placeholder="请选择联系人"
                v-model="visitRecordInfo.contactsName">
      </selector>
      <x-input title="接待人" :disabled="isDisabled" :show-clear="false" text-align="right"
               v-model="visitRecordInfo.receiver">
      </x-input>
      <!-- 文本域 -->
      <x-textarea title="交流内容" :disabled="isDisabled" placeholder="交流内容"
                  v-model="visitRecordInfo.talkContent">
      </x-textarea>
      <x-textarea title="重要信息" :disabled="isDisabled" placeholder="获得重要信息"
                  v-model="visitRecordInfo.getInfo">
      </x-textarea>
      <x-textarea title="未定事项" :disabled="isDisabled" placeholder="未决定事项"
                  v-model="visitRecordInfo.undetermined">
      </x-textarea>
      <x-textarea title="计划" :disabled="isDisabled" placeholder="下一步计划"
                  v-model="visitRecordInfo.plan">
      </x-textarea>
    </group>

    <!-- 提交按钮 -->
    <div class="footer" v-if="!isDisabled">
      <x-button type="primary" style="background-color: #6ea6ff;" @click.native="submission">提交</x-button>
    </div>

  </div>
</template>

<script>
import { dateFormat } from 'vux'
export default {
  name: "visitItem",
  data() {
    return {
      visitrecordId: '', // 获取拜访记录的id
      isDisabled: true, // 判断查看还是填写

      visitRecordInfo: {}, // 拜访记录数据
      startTime: '',
      endTime: '',
      duration: '', // 工时
      reason: '',
      customer: [], // 客户
      customerId: '', //选择的客户id
      project: [], // 项目
      contacts: [], // 联系人
    }
  },
  created() {
    this.visitInfo = this.$store.state.visitInfo
    console.log(this.visitInfo)
    this.visitInfo.startTime = dateFormat(this.visitInfo.start_time*1, 'YYYY-MM-DD HH:mm:ss')
    this.visitInfo.endTime = dateFormat(this.visitInfo.end_time*1, 'YYYY-MM-DD HH:mm:ss')
    this.visitInfo.duration = this.visitInfo.duration/60/60
  },
  mounted() {
    // 判断查看还是填写
    if (this.visitInfo.visitrecordId) { // 查看

      this.getVisitRecord(); // 获取拜访记录

    } else { // 填写
      const data = JSON.parse(window.sessionStorage.getItem('data'))
      console.log(data.loginName)
      console.log(this.visitInfo.apply_user_id)
      console.log(data.loginName == this.visitInfo.apply_user_id)
      if (data.loginName == this.visitInfo.apply_user_id) { // 判断是否为本人
        this.isDisabled = false;
        this.getCustomer(); // 获取客户
      }
    }
  },
  methods: {
    // 获取拜访记录
    getVisitRecord() {
      this.axios.post(`wechatErp/crm/getModelByVisitrecordId/${this.visitInfo.visitrecordId}`)
        .then(res => {
          console.log(res)
          this.visitRecordInfo = res.data
        })
    },
    // 获取客户
    getCustomer() {
      this.axios.get(`wechatErp/expenseReimbursementClient/getOneselfClientSelect2`)
        .then(res => {
          // console.log(res)
          this.customer = res.data
        })
    },
    // 获取项目
    getProject(customerId) {
      this.customerId = customerId
      this.axios.post(`wechatErp/projectManager/getProjectListByClientId`,{clientCompany: customerId})
        .then(res => {
          // console.log(res)
          this.project = res.data.list
        })
    },
    // 获取联系人
    getContacts(projectId) {
      const data = {clientId:this.customerId, projectId:projectId}
      this.axios.post(`wechatErp/projectManager/pageForMyContactsSelect2`, data)
        .then(res => {
          // console.log(res)
          this.contacts = res.data.list
        })
    },
    // 提交
    submission() {
      if (!this.visitRecordInfo.companyName) return this.$vux.toast.text('请选择客户')
      if (!this.visitRecordInfo.contactsName) return this.$vux.toast.text('请选择联系人')
      if (!this.visitRecordInfo.receiver) return this.$vux.toast.text('请填写接待人')
      if (!this.visitRecordInfo.talkContent) return this.$vux.toast.text('请填写交流内容')
      if (!this.visitRecordInfo.getInfo) return this.$vux.toast.text('请填写获得重要信息')
      if (!this.visitRecordInfo.undetermined) return this.$vux.toast.text('请填写未决定事项')
      if (!this.visitRecordInfo.plan) return this.$vux.toast.text('请填写下一步计划')
      // this.visitRecordInfo // 发送后台的信
      const data = {
        wechatApprovaldataId: this.$route.query.id,
        clientId: this.visitRecordInfo.companyName,
        projectId: this.visitRecordInfo.projectName,
        contactsId: this.visitRecordInfo.contactsName,
        receiver: this.visitRecordInfo.receiver,
        talkContent	: this.visitRecordInfo.talkContent,
        getInfo: this.visitRecordInfo.getInfo,
        undetermined: this.visitRecordInfo.undetermined,
        plan: this.visitRecordInfo.plan,
      }
      console.log(data)
      this.axios.post(`wechatErp/crm/saveVisitRecord`, data)
        .then(res=> {
          console.log(res)
          const {messageState, resultInfo} = res.data
          this.$vux.toast.text(resultInfo)
          if (messageState == 0) {
            setTimeout(() => {
              this.$router.go(-1)
            }, 400)
          }
        })
    }

  }
}
</script>

<style scoped>
.weui-cell {
  font-size:16px;
}
.footer {
  margin: 10px 10px 30px;
}
.weui-cell.vux-x-textarea /deep/ textarea[disabled="disabled"] {
  background-color: transparent;
}
</style>
