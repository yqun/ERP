<template>
  <div>
    <!-- 头部导航 -->
    <x-header style="background-color:#4b77b0; z-index: 999;"
              :left-options="{backText: ''}"
              title="插入费用列表">
    </x-header>
    <!-- main -->
    <group :gutter="0">
      <selector title="项目"
                v-model="projectId"
                :options="projectAll"
                placeholder="项目"
                direction="ltr"
                @on-change="changeproject"></selector>
      <x-input title="客户　　" :show-clear="false" v-model="clientName" placeholder="客户" disabled></x-input>
      <x-input title="联系人　" :show-clear="false" v-model="contactsName" placeholder="联系人" disabled></x-input>
      <x-input title="联系方式" :show-clear="false" v-model="contactsPhone" placeholder="联系方式" disabled></x-input>
      <x-input title="招待费　" :show-clear="false" v-model="entertainExpenses" placeholder="0"></x-input>
      <x-input title="差旅费　" :show-clear="false" v-model="travelExpenses" placeholder="0"></x-input>
      <x-input title="礼品费　" :show-clear="false" v-model="giftExpenses" placeholder="0"></x-input>
      <x-input title="项目说明" :show-clear="false" v-model="projectInfo" placeholder="项目说明" ></x-input>
      <x-input title="合计金额" :show-clear="false" v-model="singleTotalAmount" placeholder="0" disabled></x-input>
    </group>
    <div class="footer">
      <flexbox>
        <flexbox-item>
          <div class="flex-demo" @click="confirmBtn()">
            <x-button type="primary" style="backgroundColor: #6ea6ff; color: #fff;">确认</x-button>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo" @click="cancelBtn()">
            <x-button type="warn" style="backgroundColor: #bababa; color: #fff;">取消</x-button>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
export default {
  name: "reimbursementMonthAdd",
  data() {
    return {
      projectAll: [],
      // 提交的信息
      projectId: '',
      clientName: '',
      clientId: '',
      contactsName: '',
      contactsPhone: '',
      entertainExpenses: '',
      travelExpenses: '',
      giftExpenses: '',
      projectInfo: '',
    }
  },
  created() {
    this.getBusinessProject();
  },
  computed: {
    singleTotalAmount: {
      get() { return (this.entertainExpenses*1 + this.travelExpenses*1 + this.giftExpenses*1) },
      set() {}
    },
  },
  methods: {
    // 获取 业务员项目
    getBusinessProject() {
      const id = JSON.parse(window.sessionStorage.getItem('data')).id
      this.axios
        .get(`wechatErp/projectManager/getAllProjectList?createBy=${id}`)
        .then(res => {
          console.log(res)
          res.data.forEach(item => {
            this.projectAll.push({key: item.id, value: item.name})
          })
        })
    },
    changeproject(value) {
      this.axios
        .get(`wechatErp/costPlan/getClientByProjectId/${value}`)
        .then(res => {
          // console.log(res)
          const {client, contacts} = res.data
          this.clientName = client.companyName
          this.clientId = client.id
          this.contactsName = contacts.name
          this.contactsPhone = contacts.mobilePhone
        })
    },
    // 点击确认按钮
    confirmBtn() {
      if (this.projectId == '')  return this.$vux.toast.text('请选择项目');
      if (!this.singleTotalAmount) return this.$vux.toast.text('合计金额不能为0');
      // 项目名称
      const project = this.projectAll.filter(item => {
        return item.key == this.projectId
      })
      const data = {
        projectId:         this.projectId,
        projectName:       project[0].value,
        clientName:        this.clientName,
        clientId:        this.clientId,
        contactsName:      this.contactsName,
        contactsPhone:     this.contactsPhone,
        entertainExpenses: this.entertainExpenses,
        travelExpenses:    this.travelExpenses,
        giftExpenses:      this.giftExpenses,
        projectInfo:       this.projectInfo,
        singleTotalAmount: this.singleTotalAmount,
        flag: parseInt(Math.random()*99999) + new Date()
      }
      const month = this.$route.query.month
      this.axios
        .get(`wechatErp/costPlan/getCostPlanCount`, {params: {projectId: this.projectId,yyyyMonth:month}})
        .then(res => {
          // console.log(res)
          if (res.data == 0) {
            this.$store.commit('changeMonthCostList', {data: data})
            // console.log(this.$store.state.monthCostList)
            // this.$router.go(-1)
          } else {
            this.$vux.toast.text(`该项目在该月已报销过月计划`)
          }
        })
    },
    // 点击取消按钮
    cancelBtn() {
      this.$router.go(-1)
    },
  }
}
</script>

<style scoped>
.weui-cell {
  font-size: 15px;
}
.footer {
  margin-top: 30px;
  padding: 0 15%;
}
</style>
