<template>
  <div style="box-sizing: border-box;border-top: 1px solid transparent;">
    <group title="拜访记录">
      <cell title="开始时间" :value="startTime"></cell>
      <cell title="结束时间" :value="endTime"></cell>
      <cell title="时长(小时)" :value="duration"></cell>
      <x-input title="外出事由" :disabled="isDisabled" :show-clear="false" text-align="right"
               v-model="visitRecordInfo.reason">
      </x-input>
      <selector title="客户" :readonly="isDisabled" direction="rtl" :options="list"
                v-model="visitRecordInfo.companyName" @on-change="getProject">
      </selector>
      <selector title="项目" :readonly="isDisabled" direction="rtl" :options="list"
                v-model="visitRecordInfo.projectName">
      </selector>
      <selector title="联系人" :readonly="isDisabled" direction="rtl" :options="list"
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

      list: [{key: 123, value: '哈哈哈'}],
      customer: [], // 客户
      project: [], // 项目
      contacts: [], // 联系人
    }
  },
  created() {
    this.visitrecordId = this.$route.query.visitrecordId
    this.startTime = dateFormat(this.$route.query.start_time*1, 'YYYY-MM-DD HH:mm:ss')
    this.endTime = dateFormat(this.$route.query.end_time*1, 'YYYY-MM-DD HH:mm:ss')
    this.duration = this.$route.query.duration/60/60
  },
  mounted() {
    // 判断查看还是填写
    if (this.visitrecordId) {
      // 查看
      console.log('查看')
      this.getVisitRecord(); // 获取拜访记录
    } else {
      // 填写
      console.log('填写')
      this.isDisabled = false;


    }
  },
  methods: {
    // 获取拜访记录
    getVisitRecord() {
      this.axios.post(`wechatErp/crm/getModelByVisitrecordId/${this.visitrecordId}`)
        .then(res => {
          console.log(res)
          this.visitRecordInfo = res.data
        })
    },
    // 获取客户
    getCustomer() {
      this.axios.get(``)
        .then(res => {
          console.log(res)
        })
    },
    // 获取项目
    getProject(customer) {
      console.log(customer)
      this.axios.get(``)
        .then(res => {
          console.log(res)
        })
    },
    // 获取联系人
    getContacts() {
      this.axios.get(``)
        .then(res => {
          console.log(res)
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
      // this.visitRecordInfo // 发送后台的信息

      // this.axios.post(``, this.visitRecordInfo)
      //   .then(res=> {
      //     console.log(res)
      //   })
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
