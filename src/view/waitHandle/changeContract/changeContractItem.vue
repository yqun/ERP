<template>
  <div>
    <div class="main">
      <!-- 基本信息 -->
      <div>
        <h3>基本信息</h3>
        <ul class="info-content">
          <li><strong>项目名称</strong><span>{{contract.projectName}}</span></li>
          <li><strong>项目编号</strong><span>{{project.code}}</span></li>
          <li><strong>项目类型</strong><span>{{project.type}}</span></li>
          <li><strong>合作项目</strong><span>{{project.collaborativeProject}}</span></li>
          <li><strong>合同名称</strong><span>{{contract.name}}</span></li>
          <li><strong>合同编码</strong><span>{{contract.code}}</span></li>
          <li><strong>内部编码</strong><span>{{contract.incrementNo}}</span></li>
          <li><strong>合同金额</strong><span>{{contract.money}}</span></li>
          <li><strong>业务员　</strong><span>{{salesman.chineseName}}</span></li>
          <li><strong>客户名称</strong><span>{{clientName}}</span></li>
          <li class="download clearfix">
            <strong>合同附件</strong>
            <div>
              <p v-for="item in attachments.list" :key="item.id">
                <span>{{item.name}}</span>
                <a href="javascript:;" @click="downLoadEnclosure(item)">下载</a>
              </p>
            </div>
          </li>
          <li class="download clearfix">
            <strong>招标文件</strong>
            <div>
              <p v-for="item in biddingDocuments.list" :key="item.id">
                <span>{{item.name}}</span>
                <a href="javascript:;" @click="downLoadEnclosure(item)">下载</a>
              </p>
            </div>
          </li>
          <li class="download clearfix">
            <strong>投标文件</strong>
            <div>
              <p v-for="item in tenderDocuments.list" :key="item.id">
                <span>{{item.name}}</span>
                <a href="javascript:;" @click="downLoadEnclosure(item)">下载</a>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 货物信息 -->
      <div class="cargo">
        <h3>货物信息 <span style="float: right;" @click="confirmShow = true">查看详情>></span></h3>
        <ul>
          <li class="download clearfix total">
            <strong style="font-weight: 400;">合计：</strong>
            <div style="width: 80%;">
              <p>成本合计:{{detailedTotal.totalFirstCost}}元;销售总价:{{detailedTotal.totalSaleCost}}元;</p>
              <p>质保风险预警:{{detailedTotal.warrantyPeriodWaring}};税金:{{detailedTotal.totalTaxes}}元; </p>
              <p>毛利润:{{detailedTotal.grossProfit}}%;</p>
            </div>
          </li>
        </ul>
        <!-- 弹窗 -->
        <confirm v-model="confirmShow" title="项目收益" hide-on-blur :show-confirm-button="false" cancel-text="返回">
          <!--table表格-->
          <div class="table">
            <el-table :data="jsonProducts" height="500" style="width: 100%">
              <el-table-column prop="sort" label="序号"></el-table-column>
              <el-table-column prop="name" label="货物名称"></el-table-column>
              <el-table-column prop="count" label="数量"></el-table-column>
              <el-table-column prop="unit" label="单位"></el-table-column>
              <el-table-column prop="firstCost" label="成本单价"></el-table-column>
              <el-table-column prop="totalFirstCost" label="成本总价"></el-table-column>
              <el-table-column prop="saleCost" label="销售单价"></el-table-column>
              <el-table-column prop="totalSaleCost" label="销售总价"></el-table-column>
              <el-table-column prop="warrantyPeriodSale" label="采购质保年限" width="150"></el-table-column>
              <el-table-column prop="warrantyPeriodBid" label="销售合同质保年限" width="150"></el-table-column>
              <el-table-column prop="warrantyPeriodWaring" label="质保风险预警" width="150"></el-table-column>
              <el-table-column prop="purchasingTaxRate" label="采购税率"></el-table-column>
              <el-table-column prop="saleTaxRate" label="销售税率"></el-table-column>
              <el-table-column prop="taxes" label="税金"></el-table-column>
              <el-table-column prop="grossProfit" label="毛利率"></el-table-column>
            </el-table>
          </div>
        </confirm>
      </div>
      <!-- 合同付款方式 -->
      <div>
        <h3>合同付款方式</h3>
        <table>
          <thead>
          <tr>
            <td>回款时间</td>
            <td>回款方式</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in paymentMethodList" :key="item.id">
            <td>{{item.payDate | momentDay}}</td>
            <td>{{item.payKind}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- 所需费用 -->
      <div>
        <h3>所需费用</h3>
        <ul class="info-content">
          <li><strong>外包施工费</strong><span>{{projectProfitHistory.constructionMoney}}</span></li>
          <li><strong>人工成本</strong><span>{{projectProfitHistory.serviceMoney}}</span></li>
        </ul>
      </div>
      <!-- 项目收益 -->
      <div class="cargo">
        <h3>项目收益 <span style="float: right;" @click="projectRevenue = true">查看详情>></span></h3>
        <!-- 弹窗 -->
        <confirm v-model="projectRevenue" title="货物清单" hide-on-blur :show-confirm-button="false" cancel-text="返回">
          <!--table表格-->
          <div class="table">
            <el-table :data="projectRevenueList" height="500" style="width: 100%">
              <el-table-column prop="name" label=""></el-table-column>
              <el-table-column prop="forecastGrossProfit" label="项目预估利润"></el-table-column>
              <el-table-column prop="forecastInterestRate" label="项目预估利率"></el-table-column>
              <el-table-column prop="totalGrossProfit" label="项目预估毛利润"></el-table-column>
              <el-table-column prop="forecastProfitRate" label="项目预估毛利率"></el-table-column>
              <el-table-column prop="totalTaxes" label="总税金"></el-table-column>
              <el-table-column prop="totalWarrantyPeriodWaring" label="总质保风险"></el-table-column>
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
      <!-- 审批意见 -->
      <group :gutter="0">
        <h3 style="border: none;">审批意见</h3>
        <x-textarea v-model="message" placeholder="请填写审批意见"></x-textarea>
      </group>
    </div>
    <div class="footer">
      <div>
        <x-button class="impblue" @click.native="confirmBtn()">流转</x-button>
      </div>
      <div v-if="regressionShow">
        <x-button class="impred" @click.native="regressionBtn()">回退</x-button>
      </div>
      <div v-if="refuseShow">
        <x-button class="impred" @click.native="refuseBtn()">拒绝</x-button>
      </div>
    </div>
    <div class="footer" v-if="activityID == 'sub_7'">
      <div>
        <x-button class="impred smallFont" @click.native="regressionBtn()">回退(修改附件)</x-button>
      </div>
    </div>
    <div class="footer" v-if="activityID == 'sub_7'">
      <div>
        <x-button class="impred smallFont" @click.native="regressionBtn('R')">回退(修改合同所有信息，该流程重新审批)</x-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "changeContractItem",
  data() {
    return {
      key: '',
      taskId: '',
      activityID: '',
      businessKey: '',
      processInstanceId: '',

      roleInfo: {},// 代办事项
      contract: {}, // 合同信息
      project: {}, // 项目信息
      salesman: {}, // 业务员
      projectProfitHistory: {}, // 项目人工，
      clientName: '', //客户名称
      attachments: { // 附件列表
        name: 'attachments',
        list: []
      },
      biddingDocuments: {
        name: 'biddingDocuments',
        list: []
      },
      tenderDocuments: {
        name: 'tenderDocuments',
        list: []
      },
      paymentMethodList: [],
      confirmShow: false, // 货物清单
      jsonProducts: [],
      detailedTotal: {},
      projectRevenue: false, // 项目收益
      projectRevenueList: [],

      opinion: [],
      message: '',
    }
  },
  computed: {
    regressionShow() {
      let flag = true;
      if (this.activityID == 'sub_6' || this.activityID == 'sub_7') flag = false;
      return flag
    },
    refuseShow() {
      let flag = false;
      if (this.activityID == 'marketingGeneralManager' || this.activityID == 'sub_9') flag = true;
      return flag
    }
  },
  mounted() {
    this.getQuery();
    this.getRoleInfo();
    this.getProjectInfo();
    this.getEnclosureList(this.attachments);
    this.getEnclosureList(this.biddingDocuments);
    this.getEnclosureList(this.tenderDocuments);
    this.paymentMethod();
    this.goodsList();
    this.getOpinion();
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
          // console.log(res)
          this.roleInfo = res.data
        })
    },
    getProjectInfo() {
      this.axios.get(`wechatErp/contractChange/getProjectRelateInfo?id=${this.businessKey}`)
        .then(res => {
          console.log(res)
          const {contract, project, salesman, clientName, projectProfitHistory, projectProfit} = res.data
          this.contract = contract;
          this.project = project;
          this.salesman = salesman;
          this.clientName = clientName;
          this.projectProfitHistory = projectProfitHistory;

          projectProfit.name = '变更前收益';
          projectProfitHistory.name = '变更后收益';
          const difference = {
            name: '差异合计',
            forecastGrossProfit:(projectProfitHistory.forecastGrossProfit - projectProfit.forecastGrossProfit).toFixed(2),
            forecastInterestRate:(projectProfitHistory.forecastInterestRate - projectProfit.forecastInterestRate).toFixed(2),
            totalGrossProfit:(projectProfitHistory.totalGrossProfit - projectProfit.totalGrossProfit).toFixed(2),
            forecastProfitRate:(projectProfitHistory.forecastProfitRate - projectProfit.forecastProfitRate).toFixed(2),
            totalTaxes:(projectProfitHistory.totalTaxes - projectProfit.totalTaxes).toFixed(2),
            totalWarrantyPeriodWaring:(projectProfitHistory.totalWarrantyPeriodWaring - projectProfit.totalWarrantyPeriodWaring).toFixed(2),
          };
          this.projectRevenueList = [projectProfit, projectProfitHistory, difference]
        })
    },
    getEnclosureList(subType) {
      this.axios.post(`wechatErp/contract/getFiles`, {mainType:this.businessKey, subType:subType.name})
        .then(res => {
          // console.log(res)
          subType.list = res.data
        })
    },
    downLoadEnclosure(fileInfo) {
      window.location.href = `${this.axiosUrl}wechatErp/center/download/${fileInfo.id}`
    },
    paymentMethod() {
      this.axios.get(`wechatErp/contractChange/getPayKindListByContractId?contractId=${this.businessKey}`)
        .then(res => {
          // console.log(res)
          this.paymentMethodList = res.data
        })
    },
    goodsList() {
      this.axios.get(`wechatErp/contractChange/getProductHistorysByContractId/${this.businessKey}`)
        .then(res => {
          // console.log(res)
          const {data} = res
          let detailedTotal = {
            totalFirstCost: 0,
            totalSaleCost: 0,
            grossProfit: 0,
            totalTaxes: 0,
            warrantyPeriodWaring: 0,
          };
          data.forEach(item => {
            detailedTotal.totalFirstCost += item.totalFirstCost
            detailedTotal.totalSaleCost += item.totalSaleCost
            detailedTotal.grossProfit += item.grossProfit
            detailedTotal.totalTaxes += item.taxes
            detailedTotal.warrantyPeriodWaring += item.warrantyPeriodWaring
          })
          this.jsonProducts = data
          this.detailedTotal = detailedTotal
        })
    },
    getOpinion() {
      const data = {taskId: this.taskId, processInstanceId: this.processInstanceId,}
      this.axios.get(`wechatErp/center/getBeforeTaskComment`, {params: data})
        .then(res => {
          this.opinion = res.data
        })
    },
    confirmBtn() {
      if (!this.message) return this.$vux.toast.text('请填写审批意见');
      const data = {
        ...this.$store.state.data,
        businessKey: this.businessKey,
        taskId: this.taskId,
        processInstanceId: this.processInstanceId,
        activityID: this.activityID,
        roleName: this.roleInfo.roleName,
        projectId: this.contract.projectId,
        id: this.contract.id,
        creatorId: this.contract.createBy,
        isPass: 'Y',
        message:  this.message
      };
      if (this.activityID == 'marketingGeneralManager' || this.activityID == 'sub_9') {
        data.isPass = '1'
      }
      this.sendData(data)
    },
    regressionBtn(isPass) {
      if (!this.message) return this.$vux.toast.text('请填写审批意见');
      const data = {
        ...this.$store.state.data,
        businessKey: this.businessKey,
        taskId: this.taskId,
        processInstanceId: this.processInstanceId,
        activityID: this.activityID,
        roleName: this.roleInfo.roleName,
        projectId: this.contract.projectId,
        id: this.contract.id,
        creatorId: this.contract.createBy,
        isPass: 'N',
        message:  this.message
      };
      if (this.activityID == 'marketingGeneralManager' || this.activityID == 'sub_9') {
        data.isPass = '3'
      }
      if (isPass == 'R') {
        data.isPass = 'R'
      }
      this.sendData(data)
    },
    // 拒绝
    refuseBtn() {
      if (!this.message) return this.$vux.toast.text('请填写审批意见');
      const data = {
        ...this.$store.state.data,
        businessKey: this.businessKey,
        taskId: this.taskId,
        processInstanceId: this.processInstanceId,
        activityID: this.activityID,
        roleName: this.roleInfo.roleName,
        projectId: this.contract.projectId,
        id: this.contract.id,
        creatorId: this.contract.createBy,
        isPass: '2',
        message:  this.message
      };
      this.sendData(data)
    },

    sendData(data) {
      console.log(data)
      this.axios.post(`wechatErp/contractChange/flowToNextActivityForQueryOnly`, data)
        .then(res => {
          console.log(res)
          if (res.data.resultState == -1) return this.$vux.toast.text('流转失败');
          this.$vux.toast.text('流转成功');
          this.$router.go(-1)
        })
    }
  }
}
</script>

<style scoped>
@import '../../../assets/css/listItem.css';
@import '../../../assets/css/x-table.css';
@import '../../../assets/css/footer.css';
/* 弹窗 */
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
