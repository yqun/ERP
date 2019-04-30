<template>
  <div class="contract">
    <!-- 头部导航 -->
    <x-header style="background-color:#4b77b0;"
              :left-options="{backText: ''}"
              title="立项管理">
    </x-header>
    <div class="main">
      <group :gutter="0">
        <x-input title="项目编码　　" v-model="project.code" disabled></x-input>
        <x-input title="项目名称　　" v-model="project.name"            placeholder="请填写项目名称" ></x-input>
        <x-input title="预算金额　　" v-model="project.budget"          placeholder="0" type="number"></x-input>
        <x-input title="期望利润　　" v-model="project.expectedProfit"  placeholder="0" type="number"></x-input>
        <x-input title="品牌倾向　　" v-model="project.brandTendency"   placeholder="请填写品牌倾向" ></x-input>
        <x-input title="竞争情况　　" v-model="project.competitiveness" placeholder="请填写竞争情况" ></x-input>
       <selector title="项目概率级别" v-model="project.projectProbabilityLevel" :options="randomLevel" ></selector>
       <selector title="项目类型　　" v-model="project.type" :options="projectType"></selector>
       <datetime title="结单日　　　" v-model="project.dataFormat"   placeholder="请选择结单日" ></datetime>
       <selector title="客户　　　　" v-model="clientId" :options="customerAll"></selector>
       <selector title="联系人　　　" v-model="contactsId" :options="contactsAll"></selector>
        <div>
          <span>{{contacts}}</span>
        </div>
      </group>
      <group :gutter="8">
        <!-- 新老顾客 -->
        <div class="vux-x-input weui-cell">
          <span>新老客户　　</span>
          <checker v-model="project.newClient" :radio-required="true">
            <checker-item value="Y">
              <x-icon type="ios-checkmark" size="24" v-if="project.newClient=='Y'" style="verticalAlign:bottom;fill:#6ea6ff;"></x-icon>
              <x-icon type="ios-checkmark" size="24" v-if="project.newClient=='N'" style="verticalAlign:bottom;fill:#d7d7d7;"></x-icon>
              是
            </checker-item>
            <checker-item value="N">
              <x-icon type="ios-checkmark" size="24" v-if="project.newClient=='N'" style="verticalAlign:bottom;fill:#6ea6ff;"></x-icon>
              <x-icon type="ios-checkmark" size="24" v-if="project.newClient=='Y'" style="verticalAlign:bottom;fill:#d7d7d7;"></x-icon>
              否
            </checker-item>
          </checker>
        </div>
        <!-- 合作项目 -->
        <div class="vux-x-input weui-cell">
          <span>合作项目　　</span>
          <checker v-model="project.collaborativeProject" :radio-required="true">
            <checker-item value="Y">
              <x-icon type="ios-checkmark" size="24" v-if="project.collaborativeProject=='Y'" style="verticalAlign:bottom;fill:#6ea6ff;"></x-icon>
              <x-icon type="ios-checkmark" size="24" v-if="project.collaborativeProject=='N'" style="verticalAlign:bottom;fill:#d7d7d7;"></x-icon>
              是
            </checker-item>
            <checker-item value="N">
              <x-icon type="ios-checkmark" size="24" v-if="project.collaborativeProject=='N'" style="verticalAlign:bottom;fill:#6ea6ff;"></x-icon>
              <x-icon type="ios-checkmark" size="24" v-if="project.collaborativeProject=='Y'" style="verticalAlign:bottom;fill:#d7d7d7;"></x-icon>
              否
            </checker-item>
          </checker>
        </div>
        <!-- 能源项目 -->
        <div class="vux-x-input weui-cell">
          <span>能源项目　　</span>
          <checker v-model="project.energyProject" :radio-required="true">
            <checker-item value="Y">
              <x-icon type="ios-checkmark" size="24" v-if="project.energyProject=='Y'" style="verticalAlign:bottom;fill:#6ea6ff;"></x-icon>
              <x-icon type="ios-checkmark" size="24" v-if="project.energyProject=='N'" style="verticalAlign:bottom;fill:#d7d7d7;"></x-icon>
              是
            </checker-item>
            <checker-item value="N">
              <x-icon type="ios-checkmark" size="24" v-if="project.energyProject=='N'" style="verticalAlign:bottom;fill:#6ea6ff;"></x-icon>
              <x-icon type="ios-checkmark" size="24" v-if="project.energyProject=='Y'" style="verticalAlign:bottom;fill:#d7d7d7;"></x-icon>
              不是
            </checker-item>
          </checker>
        </div>
        <!-- 外包项目 -->
        <div class="vux-x-input weui-cell">
          <span>外包项目　　</span>
          <checker v-model="project.outsourcingProject" :radio-required="true">
            <checker-item value="Y">
              <x-icon type="ios-checkmark" size="24" v-if="project.outsourcingProject=='Y'" style="verticalAlign:bottom;fill:#6ea6ff;"></x-icon>
              <x-icon type="ios-checkmark" size="24" v-if="project.outsourcingProject=='N'" style="verticalAlign:bottom;fill:#d7d7d7;"></x-icon>
              是
            </checker-item>
            <checker-item value="N">
              <x-icon type="ios-checkmark" size="24" v-if="project.outsourcingProject=='N'" style="verticalAlign:bottom;fill:#6ea6ff;"></x-icon>
              <x-icon type="ios-checkmark" size="24" v-if="project.outsourcingProject=='Y'" style="verticalAlign:bottom;fill:#d7d7d7;"></x-icon>
              不是
            </checker-item>
          </checker>
        </div>
        <!-- 项目描述 -->
        <x-textarea title="项目描述" placeholder="项目涉及主要产品等" v-model="message"></x-textarea>
      </group>
    </div>
    <!-- 底部按钮 -->
    <div class="footer">
      <flexbox>
        <flexbox-item>
          <div class="flex-demo" @click="confirmBtn()">
            <x-button style="backgroundColor: #6ea6ff; color: #fff;">保存</x-button>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo" @click="cancelBtn()">
            <x-button style="backgroundColor: #bababa; color: #fff;">取消</x-button>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import { dateFormat } from 'vux'
export default {
  name: "createProject",
  data() {
    return {
      data: {},
      project: {},
      clientId: '', // 客户
      contacts: [], // 联系人
      contactsId: '', // 联系人id
      projectId: '',
      randomLevel: [], // 概率级别
      projectType: [{key: 1, value:'有合同'},{key: 2, value: '零散采购'}], // 项目类型
      customerAll: [], //所有客户
      contactsAll: [], // 联系人
      message: '',
    }
  },
  created() {
    this.getUserInfo();
    this.getRandomLevel(); // 项目概率级别
    this.getCustomer();    // 客户
    // 带参数过来 代表是 编辑数据
    if (!this.$route.query.id) return false;
    this.getProjectInfo(); // 根据项目id获取项目信息
  },
  watch: {
    clientId(newVal, oldVal) {
      this.getContacts()
    },
    contactsId(newVal, oldVal) {
      console.log(newVal)
      const name = this.contactsAll.filter(item => {
        return item.id == newVal
      })
    }
  },
  methods: {
    // 获取 userInfo
    getUserInfo() {
      const user = JSON.parse(window.sessionStorage.getItem('data'))
      this.data.loginName = user.loginName
      this.data.password = user.password
      this.data.id = user.id
    },
    // 项目概率级别
    getRandomLevel() {
      this.axios
        .post(`wechatErp/center/getSubEnumModalsByCode/PROJECT-PROBABILITY-LEVEL`)
        .then(res => {
          // console.log(res)
          res.data.forEach(item => {
            this.randomLevel.push({
              key: item.id,
              value: item.name
            })
          })

        })
    },
    // 客户
    getCustomer() {
      this.axios
        .post(`wechatErp/projectManager/pageForOneselfClientSelect2`, {companyName: '', pageNo: 1})
        .then(res => {
          // console.log('客户', res)
          res.data.list.forEach(item => {
            this.customerAll.push({
              key: item.id,
              value: item.text
            })
          })
        })
    },
    // 联系人
    getContacts() {
      this.axios
        .post(`wechatErp/projectManager/pageForMyContactsSelect2`, {name: '', pageNo: 1, clientId:this.clientId })
        .then(res => {
          this.contactsAll = []
          // console.log('联系人', res)
          res.data.list.forEach(item => {
            this.contactsAll.push({
              key: item.id,
              value: item.text
            })
          })
        })
    },
    // 根据项目id获取项目信息
    getProjectInfo() {
      this.axios
        .post(`wechatErp/projectManager/getModelById/${this.$route.query.id}`)
        .then(res => {
          const {clientId, contacts, pm} = res.data
          console.log('projectinfo', pm)
          console.log(res)
          pm.dataFormat = dateFormat(pm.overOrderData, 'YYYY-MM-DD')
          this.clientId = clientId
          this.project = pm
        })
    },
    // 流转
    confirmBtn() {
      console.log('流转')
    },
    // 取消
    cancelBtn() {
      console.log('取消')
    },
  }
}
</script>

<style scoped>
.contract {
  width: 100%;
  box-sizing: border-box;
  padding-top: 46px;
  font-size:16px;
  background-color: #f8f8f8;
}
div.vux-header {
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
}
/* 表单字体大小 */
/deep/ .weui-cells {
  font-size:16px;
}
/* 底部按钮 */
.footer {
  width: 100%;
  padding: 30px 10%;
  box-sizing: border-box;
}
</style>
