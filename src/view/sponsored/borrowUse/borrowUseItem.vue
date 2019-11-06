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
          <x-input disabled title="公章类型" v-model="projectInfo.sealTypeText"></x-input>
          <x-input disabled title="借用事由" v-model="projectInfo.useReasonText"></x-input>
          <x-input disabled title="使用时间" :value="sealUse.estimatedUseTime | moment"></x-input>
          <x-input disabled title="使用说明" v-model="sealUse.useExplain"></x-input>
        </group>
        <ul class="info-content" v-if="applicant.length">
          <li class="download clearfix">
            <strong>申请人上传附件</strong>
            <div>
              <p v-for="item in applicant" :key="item.id">
                <span>{{item.name}}</span>
                <a href="javascript:;" @click="downloadFile(item)">下载</a>
              </p>
            </div>
          </li>
        </ul>
        <ul class="info-content" v-if="applicant.length">
          <li class="download clearfix">
            <strong>运营中心上传附件</strong>
            <div>
              <p v-for="item in operate" :key="item.id">
                <span>{{item.name}}</span>
                <a href="javascript:;" @click="downloadFile(item)">下载</a>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 公章借用台账 -->
      <div class="cargo">
        <h3>货物信息 <span style="float: right;" @click="confirmShow = true">查看详情>></span></h3>
        <!-- 弹窗 -->
        <confirm v-model="confirmShow" title="项目收益" hide-on-blur :show-confirm-button="false" cancel-text="返回">
          <!--table表格-->
          <div class="table">
            <el-table :data="jsonProducts" height="500" style="width: 100%">
              <el-table-column prop="applicantName" label="申请人"></el-table-column>
              <el-table-column prop="projectName" label="项目名称"></el-table-column>
              <el-table-column prop="projectCode" label="项目编码"></el-table-column>
              <el-table-column prop="sealTypeText" label="公章类型"></el-table-column>
              <el-table-column prop="borrowReasonText" label="借用理由"></el-table-column>
              <el-table-column label="预计借用时间" width="160">
                <span slot-scope="scope">{{scope.row.applyBorrowTime | moment}}</span>
              </el-table-column>
              <el-table-column label="预计返还时间" width="160">
                <span slot-scope="scope">{{scope.row.estimatedReturnTime | moment}}</span>
              </el-table-column>
              <el-table-column label="实际借用时间" width="160">
                <span slot-scope="scope">{{scope.row.actualBorrowTime | moment}}</span>
              </el-table-column>
              <el-table-column label="实际返还时间" width="160">
                <span slot-scope="scope">{{scope.row.actualReturnTime | moment}}</span>
              </el-table-column>
              <el-table-column prop="isRetention" label="审批状态" width="150">
                <div slot-scope="scope">
                  <span v-if="scope.row.approvalStatus == 1">审批中</span>
                  <span v-if="scope.row.approvalStatus == 2">已借出</span>
                  <span v-if="scope.row.approvalStatus == 3">已还回</span>
                </div>
              </el-table-column>
            </el-table>
          </div>
        </confirm>
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
  name: "SborrowUseItem",
  data() {
    return {
      key: '',
      businessKey: '',
      processInstanceId: '',

      projectInfo: {}, // 公章借用信息
      project: {},     // 项目
      salesman: {},    // 申请人
      sealUse: {},  // 公章借用信息
      sealBorrow: {},  // 公章借用信息
      actualBorrowTime: '', // 公章实际借出时间 / om 借出按钮出现
      applicant: [], // 申请人下载列表
      operate: [], // 下运营中心附件下载列表
      confirmShow: false, // 公章借用台账
      jsonProducts: [], //公章借用台账数据
      opinion: [],     //意见
    }
  },
  mounted() {
    this.getQuery();// 获取参数
    this.getBorrowUseInfo();// 获取公章使用信息
    this.getEnclosureList('acceptanceDocument');// 获取申请人附件列表
    this.getEnclosureList('sealUseAttachment');// 获取运营中心附件列表
    this.getLedger(); // 获取公章使用台账
    this.getOpinion();// 意见
  },
  methods: {
    getQuery() {
      this.key = this.$route.query.key
      this.businessKey = this.$route.query.businessKey
      this.processInstanceId = this.$route.query.processInstanceId
    },
    getBorrowUseInfo() {
      this.axios.get(`wechatErp/sealUse/getSealUseInfoById?id=${this.businessKey}`)
        .then(res => {
          // console.log(res)
          const {project, salesman, sealUse} = res.data
          this.projectInfo = res.data
          if (project) this.project     = project
          if (salesman) this.salesman    = salesman
          if (sealUse) this.sealUse  = sealUse
        })
    },
    getEnclosureList(subType) {
      const data = { mainType: this.businessKey, subType: subType}
      this.axios.post(`wechatErp/contract/getFiles`, data)
        .then(res => {
          // console.log(res)
          if (subType == 'acceptanceDocument') return this.applicant = res.data
          if (subType == 'sealUseAttachment') return this.operate = res.data
        })
    },
    downloadFile(fileInfo) {
      const url = this.axiosUrl.substr(0,this.axiosUrl.indexOf('platformServer'))
      window.location.href = `${url}${fileInfo.url}`
    },
    getLedger() {
      const data = {iDisplayStart: 1, iDisplayLength: 20};
      this.axios.post(`wechatErp/sealUse/pageRecord`, data)
        .then(res => {
          // console.log(res)
          this.jsonProducts = res.data.data
        })
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

.info-content li strong {
  width: 40%;
}
li.download > div {
  width: 59%;
}
</style>
