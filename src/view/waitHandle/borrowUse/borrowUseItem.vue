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
        <group :gutter="0" class="choosePersonal" v-if="activityID == 'om'">
          <selector title="指定领导审批" :options="approvalPerson"
                    v-model="chooseApprovalPerson" placeholder="请选择需要协助审批的领导">
          </selector>
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
      <div class="cargo" v-if="activityID == 'om'">
        <h3>公章借用台账 <span style="float: right;" @click="confirmShow = true">查看详情>></span></h3>
        <!-- 弹窗 -->
        <confirm v-model="confirmShow" title="项目收益" hide-on-blur :show-confirm-button="false" cancel-text="返回">
          <!--table表格-->
          <div class="table">
            <el-table :data="jsonProducts" height="500" style="width: 100%">
              <el-table-column prop="applicantName" label="申请人"></el-table-column>
              <el-table-column prop="projectName" label="项目名称" width="200"></el-table-column>
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
      <div><x-button class="impblue" @click.native="confirm()">通过</x-button></div>
      <div><x-button class="impred" @click.native="refuse()">拒绝</x-button></div>
      <div><x-button class="impred" @click.native="regression()">回退</x-button></div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from 'vux'
export default {
  name: "borrowUseItem",
  data() {
    return {
      key: '',
      taskId: '',
      activityID: '',
      businessKey: '',
      processInstanceId: '',

      approvalPerson: [
        {value: '总经理', key: 'GENERAL_MANAGER'},
        {value: '营销中心总经理', key: 'MARKETING_GENERAL_MANAGER'},
        {value: '技术研发总经理', key: 'RESEARCH_DEVELOPMENT_MANAGER'},
      ],
      chooseApprovalPerson: '',
      roleInfo: {},    // 代办事项
      projectInfo: {}, // 公章借用信息
      project: {},     // 项目
      salesman: {},    // 申请人
      sealUse: {},  // 公章借用信息
      actualBorrowTime: '', // 公章实际借出时间 / om 借出按钮出现
      applicant: [], // 申请人下载列表
      operate: [], // 下运营中心附件下载列表
      confirmShow: false, // 公章借用台账
      jsonProducts: [], //公章借用台账数据
      opinion: [],     //意见
      message: '',     //审批意见
    }
  },
  mounted() {
    this.getQuery();// 获取参数
    this.getRoleInfo();// 打开代办事项
    this.getBorrowUseInfo();// 获取公章使用信息
    this.getEnclosureList('acceptanceDocument');// 获取申请人附件列表
    this.getEnclosureList('sealUseAttachment');// 获取运营中心附件列表
    this.getLedger(); // 获取公章使用台账
    this.getOpinion();// 意见
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
          console.log(res)
          this.roleInfo = res.data
        })
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
    // 审批
    confirm() {
      if (this.activityID == 'om' && !this.chooseApprovalPerson) return this.$vux.toast.text('请选择指定领导审批');
      if (!this.message) return this.$vux.toast.text('请填写审批意见');
      const data = {
        ...this.data,
        businessKey: this.businessKey,
        taskId: this.taskId,
        processInstanceId: this.processInstanceId,
        activityID: this.activityID,
        roleName: this.roleInfo.roleName,
        id: this.sealUse.id,
        useReason: this.sealUse.useReason,
        isPass: 1,
        message: this.message
      };
      if(this.activityID == 'om') {
        data.specifiedLeader = this.chooseApprovalPerson// 选择的审批领导
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
        useReason: this.sealUse.useReason,
        id: this.sealUse.id,
        isPass: 3,
        message: this.message
      };
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
        useReason: this.sealUse.useReason,
        id: this.sealUse.id,
        isPass: 2,
        message: this.message
      }
      this.sendData(data)
    },
    sendData(data) {
      // console.log(data)
      this.axios
        .post(`wechatErp/sealUse/flowToNextActivityForQueryOnly`, data)
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
.choosePersonal /deep/ .weui-select{
  line-height: 40px;
}
</style>
