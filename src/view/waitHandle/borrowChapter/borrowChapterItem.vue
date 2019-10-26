<template>
  <div>
    <div class="main">
      <!-- 基本信息 -->
      <div>
        <h3>基本信息</h3>
        <group :gutter="0">
          <x-input disabled title="项目名称" v-model="project.name"></x-input>
          <x-input disabled title="项目编号" v-model="project.code"></x-input>
          <x-input disabled title="项目类型" v-model="projectInfo.projectTypeText || ''"></x-input>
          <x-input disabled title="合作项目" v-model="projectInfo.coopText || ''"></x-input>
          <x-input disabled title="业务员　" v-model="salesman.chineseName"></x-input>
          <x-input disabled title="客户名称" v-model="projectInfo.clientName"></x-input>
        </group>
      </div>
      <!-- 申请信息 -->
      <div>
        <h3>申请信息</h3>
        <group :gutter="0">
          <x-input disabled title="公章类型  " v-model="projectInfo.sealTypeText"></x-input>
          <x-input disabled title="借用事由  " v-model="projectInfo.borrowReasonText"></x-input>
          <x-input disabled title="预计借用时间" :value="sealBorrow.applyBorrowTime | capitalize"></x-input>
          <x-input disabled title="预计返还时间" :value="sealBorrow.estimatedReturnTime | capitalize"></x-input>
          <x-input disabled title="实际借出时间"
                   v-if="sealBorrow.actualBorrowTime"
                   :value="sealBorrow.actualBorrowTime | capitalize">
          </x-input>
          <x-input disabled title="实际借出时间"
                   v-if="!sealBorrow.actualBorrowTime && actualBorrowTime"
                   :value="actualBorrowTime">
          </x-input>
          <x-input disabled title="实际还回时间"
                   v-if="sealBorrow.actualReturnTime"
                   :value="sealBorrow.actualReturnTime | capitalize">
          </x-input>
        </group>
        <ul class="info-content" v-if="enclosureList.length">
          <li class="download clearfix">
            <strong>验收文件附件</strong>
            <div>
              <p v-for="item in enclosureList" :key="item.id">
                <span>{{item.name}}</span>
                <a href="javascript:;" @click="downloadFile(item)">下载</a>
              </p>
            </div>
          </li>
        </ul>
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
      <div v-if="activityID !== 'om'">
        <x-button class="impblue" @click.native="confirm()">通过</x-button>
      </div>
      <div v-if="activityID === 'om'">
        <x-button :disabled="!!this.sealBorrow.actualBorrowTime || isDisabled"
                  class="impblue" @click.native="lend()">
          借出
        </x-button>
      </div>
      <div v-if="activityID !== 'preserver'">
        <x-button :disabled="!!this.sealBorrow.actualBorrowTime || isDisabled"
                  class="impred" @click.native="refuse()">
          拒绝
        </x-button>
      </div>
      <div v-if="activityID !== 'preserver'">
        <x-button :disabled="!!this.sealBorrow.actualBorrowTime || isDisabled"
                  class="impred" @click.native="regression()">
          回退
        </x-button>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="footer" v-if="activityID === 'om' && sealBorrow.actualBorrowTime || actualBorrowTime">
      <div><x-button class="impblue" @click.native="confirm()">回收并流转</x-button></div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from 'vux'
export default {
  name: "borrowChapterItem",
  data() {
    return {
      data: {},
      key: '',
      taskId: '',
      activityID: '',
      businessKey: '',
      processInstanceId: '',

      roleInfo: {},    // 代办事项
      projectInfo: {}, // 公章借用信息
      project: {},     // 项目
      salesman: {},    // 申请人
      sealBorrow: {},  // 公章借用信息
      actualBorrowTime: '', // 公章实际借出时间 / om 借出按钮出现
      enclosureList: [], // 下载列表
      opinion: [],     //意见
      message: '',     //审批意见
      isDisabled: false,
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      return dateFormat(value, 'YYYY-MM-DD HH:mm:ss')
    }
  },
  mounted() {
    this.getUserInfo();// 获取 userInfo
    this.getQuery();// 获取参数
    this.getRoleInfo();// 打开代办事项
    this.getProjectInfo();// 获取公章借用信息
    this.getEnclosureList();// 获取附件列表
    this.getOpinion();// 意见
  },
  methods: {
    getUserInfo() {
      const user = JSON.parse(window.sessionStorage.getItem('data'))
      this.data.loginName = user.loginName
      this.data.currentUserId = user.id
    },
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
    getProjectInfo() {
      this.axios.get(`wechatErp/sealBorrow/getSealBorrowInfoById/${this.businessKey}`)
        .then(res => {
          // console.log(res)
          const {project, salesman, sealBorrow} = res.data
          this.projectInfo = res.data
          if (project) this.project     = project
          if (salesman) this.salesman    = salesman
          if (sealBorrow) this.sealBorrow  = sealBorrow
        })
    },
    getEnclosureList() {
      const data = { mainType: this.businessKey, subType: 'acceptanceDocument'}
      this.axios.get(`wechatErp/sealBorrow/getFilesByModel`, {params: data})
        .then(res => {
          // console.log(res)
          this.enclosureList = res.data
        })
    },
    downloadFile(fileInfo) {
      const url = this.axiosUrl.substr(0,this.axiosUrl.indexOf('platformServer'))
      window.location.href = `${url}${fileInfo.url}`
    },
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
      if (!this.message) return this.$vux.toast.text('请填写审批意见');
      const data = {
        ...this.data,
        businessKey: this.businessKey,
        taskId: this.taskId,
        processInstanceId: this.processInstanceId,
        activityID: this.activityID,
        roleName: this.roleInfo.roleName,
        projectId: this.sealBorrow.projectId,
        creatorId: this.sealBorrow.applicant,
        borrowReason: this.sealBorrow.borrowReason,
        id: this.sealBorrow.id,
        isPass: 1,
        message: this.message
      }
      this.sendData(data)
    },
    // 拒绝
    refuse() {
      if (!this.message) return this.$vux.toast.text('请填写审批意见');
      const data = {
        ...this.data,
        businessKey: this.businessKey,
        taskId: this.taskId,
        processInstanceId: this.processInstanceId,
        activityID: this.activityID,
        roleName: this.roleInfo.roleName,
        projectId: this.sealBorrow.projectId,
        creatorId: this.sealBorrow.applicant,
        borrowReason: this.sealBorrow.borrowReason,
        id: this.sealBorrow.id,
        isPass: 3,
        message: this.message
      }
      this.sendData(data)
    },
    // 回退
    regression() {
      if (!this.message) return this.$vux.toast.text('请填写审批意见');
      const data = {
        ...this.data,
        businessKey: this.businessKey,
        taskId: this.taskId,
        processInstanceId: this.processInstanceId,
        activityID: this.activityID,
        roleName: this.roleInfo.roleName,
        projectId: this.sealBorrow.projectId,
        creatorId: this.sealBorrow.applicant,
        borrowReason: this.sealBorrow.borrowReason,
        id: this.sealBorrow.id,
        isPass: 2,
        message: this.message
      }
      this.sendData(data)
    },
    sendData(data) {
      console.log(data)
      this.axios
        .post(`wechatErp/sealBorrow/flowToNextActivity`, data)
        .then(res => {
          console.log(res)
          const {resultState} = res.data
          if (resultState == 0) {
            this.$vux.toast.text('操作成功');
            setTimeout(() => {this.$router.go(-1)}, 800)
          } else {
            this.$vux.toast.text(res.data.resultInfo);
          }
        })
    },
    lend() {
      this.axios.get(`wechatErp/sealBorrow/saveSealBorrowedTime?id=${this.sealBorrow.id}`)
        .then(res => {
          console.log(res)
          this.actualBorrowTime = res.data.actualBorrowTime
          const {resultState} = res.data.message
          if (resultState == 0) return this.isDisabled = true
        })
    }
  }
}
</script>

<style scoped>
@import '../../../assets/css/listItem.css';
@import '../../../assets/css/footer.css';
@import '../../../assets/css/x-table.css';

/* 弹框 货物清单 */
.vux-confirm .table {
  margin: 0 10px;
  overflow: scroll;
  white-space:nowrap
}
.vux-confirm /deep/ .weui-dialog__hd {
  background-color: #f2f2f2;
}
.vux-confirm /deep/ .weui-dialog__bd {
  width: 300px;
  padding: 0;
  box-sizing: border-box;
}
.vux-confirm /deep/ .el-table td,
.vux-confirm /deep/ .el-table th {
  text-align: center;
}

</style>
