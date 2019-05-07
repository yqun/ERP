<template>
  <div class="contract">
    <!-- 头部导航 -->
    <x-header style="background-color:#4b77b0;"
              :left-options="{backText: ''}"
              title="立项管理">
    </x-header>
    <div class="main">
      <group :gutter="0">
        <x-input :disabled="edit" title="项目编码　　" v-model="project.code" disabled></x-input>
        <x-input :disabled="edit" title="项目名称　　" v-model="project.name"            placeholder="请填写项目名称" ></x-input>
        <x-input :disabled="edit" title="预算金额　　" v-model="project.budget"          placeholder="0" type="number"></x-input>
        <x-input :disabled="edit" title="期望利润　　" v-model="project.expectedProfit"  placeholder="0" type="number"></x-input>
        <x-input :disabled="edit" title="品牌倾向　　" v-model="project.brandTendency"   placeholder="请填写品牌倾向" ></x-input>
        <x-input :disabled="edit" title="竞争情况　　" v-model="project.competitiveness" placeholder="请填写竞争情况" ></x-input>
        <selector :readonly="edit" title="项目概率级别" v-model="projectProbabilityLevel" :options="randomLevel" ></selector>
        <selector :readonly="edit" title="项目类型　　" v-model="type" :options="projectType"></selector>
        <datetime :readonly="edit" title="结单日　　　" v-model="project.dataFormat"   placeholder="请选择结单日" ></datetime>
        <selector :readonly="edit" title="客户　　　　" v-model="clientId" :options="customerAll" @on-change="changeClientId"></selector>
        <el-select :disabled="edit" v-model="contactsId" multiple placeholder="请选择联系人" class="contacts">
          <!--<p slot="prefix">联系</p>-->
          <el-option
            v-for="item in contactsAll"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </group>
      <group :gutter="8">
        <!-- 新老顾客 -->
        <div class="vux-x-input weui-cell">
          <span>新老客户　　</span>
          <checker v-model="newClient" :radio-required="true">
            <checker-item value="Y" :disabled="edit">
              <x-icon type="ios-checkmark" size="24" v-if="newClient=='Y'" style="verticalAlign:bottom;fill:#6ea6ff;"></x-icon>
              <x-icon type="ios-checkmark" size="24" v-if="newClient=='N'" style="verticalAlign:bottom;fill:#d7d7d7;"></x-icon>
              是
            </checker-item>
            <checker-item value="N"  :disabled="edit">
              <x-icon type="ios-checkmark" size="24" v-if="newClient=='N'" style="verticalAlign:bottom;fill:#6ea6ff;"></x-icon>
              <x-icon type="ios-checkmark" size="24" v-if="newClient=='Y'" style="verticalAlign:bottom;fill:#d7d7d7;"></x-icon>
              否
            </checker-item>
          </checker>
        </div>
        <!-- 合作项目 -->
        <div class="vux-x-input weui-cell">
          <span>合作项目　　</span>
          <checker v-model="collaborativeProject" :radio-required="true">
            <checker-item value="Y" :disabled="edit">
              <x-icon type="ios-checkmark" size="24" v-if="collaborativeProject=='Y'" style="verticalAlign:bottom;fill:#6ea6ff;"></x-icon>
              <x-icon type="ios-checkmark" size="24" v-if="collaborativeProject=='N'" style="verticalAlign:bottom;fill:#d7d7d7;"></x-icon>
              是
            </checker-item>
            <checker-item value="N" :disabled="edit">
              <x-icon type="ios-checkmark" size="24" v-if="collaborativeProject=='N'" style="verticalAlign:bottom;fill:#6ea6ff;"></x-icon>
              <x-icon type="ios-checkmark" size="24" v-if="collaborativeProject=='Y'" style="verticalAlign:bottom;fill:#d7d7d7;"></x-icon>
              否
            </checker-item>
          </checker>
        </div>
        <!-- 能源项目 -->
        <div class="vux-x-input weui-cell">
          <span>能源项目　　</span>
          <checker v-model="energyProject" :radio-required="true">
            <checker-item value="Y" :disabled="edit">
              <x-icon type="ios-checkmark" size="24" v-if="energyProject=='Y'" style="verticalAlign:bottom;fill:#6ea6ff;"></x-icon>
              <x-icon type="ios-checkmark" size="24" v-if="energyProject=='N'" style="verticalAlign:bottom;fill:#d7d7d7;"></x-icon>
              是
            </checker-item>
            <checker-item value="N" :disabled="edit">
              <x-icon type="ios-checkmark" size="24" v-if="energyProject=='N'" style="verticalAlign:bottom;fill:#6ea6ff;"></x-icon>
              <x-icon type="ios-checkmark" size="24" v-if="energyProject=='Y'" style="verticalAlign:bottom;fill:#d7d7d7;"></x-icon>
              不是
            </checker-item>
          </checker>
        </div>
        <!-- 外包项目 -->
        <div class="vux-x-input weui-cell">
          <span>外包项目　　</span>
          <checker v-model="outsourcingProject" :radio-required="true">
            <checker-item value="Y" :disabled="edit">
              <x-icon type="ios-checkmark" size="24" v-if="outsourcingProject=='Y'" style="verticalAlign:bottom;fill:#6ea6ff;"></x-icon>
              <x-icon type="ios-checkmark" size="24" v-if="outsourcingProject=='N'" style="verticalAlign:bottom;fill:#d7d7d7;"></x-icon>
              是
            </checker-item>
            <checker-item value="N" :disabled="edit">
              <x-icon type="ios-checkmark" size="24" v-if="outsourcingProject=='N'" style="verticalAlign:bottom;fill:#6ea6ff;"></x-icon>
              <x-icon type="ios-checkmark" size="24" v-if="outsourcingProject=='Y'" style="verticalAlign:bottom;fill:#d7d7d7;"></x-icon>
              不是
            </checker-item>
          </checker>
        </div>
        <!-- 项目描述 -->
        <x-textarea :disabled="edit" title="项目描述" placeholder="项目涉及主要产品等" v-model="project.projectContent"></x-textarea>
      </group>
    </div>
    <!-- 底部按钮 -->
    <div class="footer">
      <flexbox>
        <flexbox-item v-if="!createBy || createBy == data.id">
          <div class="flex-demo" @click="confirmBtn()">
            <x-button style="backgroundColor: #6ea6ff; color: #fff;">保存</x-button>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo" @click="$router.go(-1)">
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
      createBy: '',
      edit: false,

      project: {},
      projectProbabilityLevel: 'PROJECT-PROBABILITY-LEVEL-1',
      type: '2',
      newClient: 'Y',
      collaborativeProject: 'N',
      energyProject: 'N',
      outsourcingProject: 'N',

      randomLevel: [], // 概率级别
      projectType: [{key: 2, value:'有合同'},{key: "CONTRACT-TYPE-SCATTERED-PURCHASE", value: '零散采购'}], // 项目类型
      customerAll: [], //所有客户
      clientId: '', // 客户
      contactsAll: [], // 联系人
      contactsId: [], // 联系人id
      message: '',
    }
  },
  watch: {
    clientId(newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal) return this.contactsId = []
    }
  },
  created() {
    this.getUserInfo();
    this.getProjectCode(); // 获取项目编码
    this.getRandomLevel(); // 项目概率级别
    this.getCustomer();    // 客户
    // 带参数过来 代表是 编辑数据
    if (!this.$route.query.id) return false;
    this.getProjectInfo(); // 根据项目id获取项目信息
  },
  methods: {
    // 获取 userInfo
    getUserInfo() {
      const user = JSON.parse(window.sessionStorage.getItem('data'))
      this.data.loginName = user.loginName
      this.data.password = user.password
      this.data.id = user.id
      this.createBy = this.$route.query.createBy
    },
    // 获取项目编码
    getProjectCode() {
      this.axios
        .post(`wechatErp/projectManager/getProjectCode`)
        .then(res => {
          // console.log(res)
          this.project.code = res.data
        })
    },
    // 项目概率级别
    getRandomLevel() {
      this.axios
        .post(`wechatErp/center/getSubEnumModalsByCode/PROJECT-PROBABILITY-LEVEL`)
        .then(res => {
          // console.log(res)
          res.data.forEach(item => {
            this.randomLevel.push({key: item.code, value: item.name})
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
            this.customerAll.push({key: item.id, value: item.text})
          })
        })
    },
    // 改变用户时获取相应的联系人
    changeClientId(value) {
      this.clientId = value
      this.getContacts()
    },
    // 联系人
    getContacts() {
      this.axios
        .post(`wechatErp/projectManager/pageForMyContactsSelect2`, {name: '', pageNo: 1, clientId:this.clientId })
        .then(res => {
          this.contactsAll = []
          // console.log('联系人', res)
          res.data.list.forEach(item => {
            this.contactsAll.push({value: item.id, label: item.text})
          })
          // console.log('客户', this.contactsAll)
        })
    },
    // 根据项目id获取项目信息
    getProjectInfo() {
      if (this.createBy && this.data.id != this.createBy) this.edit = true;
      this.axios
        .post(`wechatErp/projectManager/getModelById/${this.$route.query.id}`)
        .then(res => {
          // console.log(res)
          const {clientId, clientName, contacts, pm} = res.data
          pm.dataFormat = dateFormat(pm.overOrderData, 'YYYY-MM-DD')
          this.clientId = clientId
          this.project = pm
          contacts.forEach(item => {
            this.contactsId.push(item.id)
          })
          //
          this.projectProbabilityLevel = pm.projectProbabilityLevel
          this.type                 = pm.type
          this.newClient            = pm.newClient
          this.collaborativeProject = pm.collaborativeProject
          this.energyProject        = pm.energyProject
          this.outsourcingProject   = pm.outsourcingProject

          // 禁用状态渲染的数据
          if (this.edit) {
            // 项目类型
            if (this.type) {
              this.type = this.projectType.filter((item) => {
                return pm.type == item.key
              })[0].value
            }
            // 概率级别
            if (this.projectProbabilityLevel) {
              this.projectProbabilityLevel = this.randomLevel.filter((item) => {
                return pm.projectProbabilityLevel == item.key
              })[0].value
            }
            // 客户
            this.clientId = clientName
            // 联系人
            contacts.forEach(item => {
              this.contactsAll.push({value: item.id, label: item.name})
            })
          }
        })
    },
    // 流转
    confirmBtn() {
      const data = {
        id: this.project.id,
        code: this.project.code,
        name: this.project.name,
        budget: this.project.budget,
        expectedProfit: this.project.expectedProfit,
        brandTendency: this.project.brandTendency,
        competitiveness: this.project.competitiveness,
        projectProbabilityLevel: this.projectProbabilityLevel,
        type: this.type,
        overOrderData: this.project.dataFormat,
        clientCompany: this.clientId,
        contacts: this.contactsId.join(','),
        newClient: this.newClient,
        collaborativeProject: this.collaborativeProject,
        energyProject: this.energyProject,
        outsourcingProject: this.outsourcingProject,
        projectContent: this.project.projectContent
      }
      if (!data.name) return this.$vux.toast.text('请填写项目名称');
      if (!data.budget) return this.$vux.toast.text('请填写预算金额');
      if (!data.overOrderData) return this.$vux.toast.text('请填写日期');
      if (!data.clientCompany) return this.$vux.toast.text('请填写客户');
      if (!data.contacts) return this.$vux.toast.text('请填写联系人');
      if (!data.projectContent) return this.$vux.toast.text('请填写项目描述');
      let url = '';
      if (this.createBy) {
        url = `wechatErp/projectManager/edit`
      } else {
        url = `wechatErp/projectManager/add`
      }
      // 新建
      this.axios
        .post(url, data)
        .then(res => {
          // console.log(res)
          const {resultState, resultInfo} = res.data
          this.$vux.toast.text(resultInfo)
          if (resultState == -1) return false;
          this.$router.go(-1)
        })
    }
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
/deep/ .weui-cell__ft {
  text-align: left;
}
/* 表单字体大小 */
/deep/ .weui-cells {
  font-size:16px;
}
/* 联系人 */
.contacts {
  width: 100%;
}
.contacts /deep/ .el-input.el-input--suffix input[type="text"]{
  border: none;
  border-top: 1px solid #D9D9D9;
  border-radius: 0;
}
/deep/ .el-input.is-disabled .el-input__inner {
  background-color: transparent;
}
/* 底部按钮 */
.footer {
  width: 100%;
  padding: 30px 10%;
  box-sizing: border-box;
}
</style>
