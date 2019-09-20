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
          <x-input disabled title="预计借用时间" :value="sealBorrow.applyBorrowTime | moment"></x-input>
          <x-input disabled title="预计返还时间" :value="sealBorrow.estimatedReturnTime | moment"></x-input>
          <x-input disabled title="实际借出时间"
                   v-if="sealBorrow.actualBorrowTime"
                   :value="sealBorrow.actualBorrowTime | moment">
          </x-input>
          <x-input disabled title="实际还回时间"
                   v-if="sealBorrow.actualReturnTime"
                   :value="sealBorrow.actualReturnTime | moment">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "PborrowChapterItem",
  data() {
    return {
      key: '',
      businessKey: '',
      processInstanceId: '',

      projectInfo: {}, // 公章借用信息
      project: {},     // 项目
      salesman: {},    // 申请人
      sealBorrow: {},  // 公章借用信息
      enclosureList: [], // 下载列表
      opinion: [],     //意见
    }
  },
  mounted() {
    this.getQuery();// 获取参数
    this.getProjectInfo();// 获取公章借用信息
    this.getEnclosureList();// 获取附件列表
    this.getOpinion();// 意见
  },
  methods: {
    getQuery() {
      this.key = this.$route.query.key
      this.businessKey = this.$route.query.businessKey
      this.processInstanceId = this.$route.query.processInstanceId
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
  }
}
</script>

<style scoped>
@import '../../../assets/css/listItem.css';
@import '../../../assets/css/x-table.css';
</style>
