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
            <td>项目时间节点</td>
            <td>天数(项目时间节点后多少天)</td>
            <td>回款比例</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in paymentMethodList" :key="item.id">
            <td>{{item.projectDateNodeText}}</td>
            <td>{{item.days}}天</td>
            <td>{{item.payPercentage || 0}}%</td>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "SchangeContractItem",
  data() {
    return {
      key: '',
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
    }
  },
  mounted() {
    this.getQuery();
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
      this.businessKey = this.$route.query.businessKey
      this.processInstanceId = this.$route.query.processInstanceId
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
