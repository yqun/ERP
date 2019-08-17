<template>
  <div>
    <div class="main">
      <!-- 基本信息 -->
      <div>
        <h3>基本信息</h3>
        <group :gutter="0">
          <x-input disabled title="项目名称" v-model="projectInfo.name"></x-input>
          <x-input disabled title="项目编号" v-model="projectInfo.code"></x-input>
          <x-input disabled title="项目类型" v-model="projectInfo.type"></x-input>
          <x-input disabled title="合作项目" v-model="projectInfo.collaborativeProject"></x-input>
          <x-input disabled title="合同名称" v-model="contractInfo.name"></x-input>
          <x-input disabled title="合同编码" v-model="contractInfo.code || '合同编码'"></x-input>
          <x-input disabled title="内部编码" v-model="contractInfo.incrementNo || '内部编码'"></x-input>
          <x-input disabled title="合同金额" v-model="contractInfo.money"></x-input>
          <x-input disabled title="业务员　" v-model="salesmanInfo.chineseName"></x-input>
          <x-input disabled title="客户名称" v-model="clientName"></x-input>
        </group>
      </div>
      <!-- 原货物清单 -->
      <div class="cargo">
        <h3>
          原货物利润
          <span @click="getPurchaseAppendList('before')">查看详情>></span>
        </h3>
        <ul>
          <li class="download clearfix total">
            <strong style="font-weight: 400;">合计：</strong>
            <div style="width: 80%;">
              <p>项目预估利润:{{detailedTotal.forecastGrossProfit}}元;项目预估利率:{{detailedTotal.forecastInterestRate}}%;</p>
              <p>项目预估毛利润:{{detailedTotal.totalGrossProfit}}元;项目预估毛利率:{{detailedTotal.forecastProfitRate}}%; </p>
              <p>总税金:{{detailedTotal.totalTaxes}}元;总质保风险:{{detailedTotal.totalWarrantyPeriodWaring}}元;</p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 所需费用 -->
      <div>
        <h3>所需费用</h3>
        <group :gutter="0">
          <x-input disabled title="外包施工费" v-model="constructionMoney"></x-input>
          <x-input disabled title="人工成本费" v-model="serviceMoney"></x-input>
        </group>
      </div>
      <!-- 追加物品 -->
      <div class="cargo">
        <h3>
          追加后货物利润
          <span @click="getPurchaseAppendList('append')">查看详情>></span>
        </h3>
        <ul>
          <li class="download clearfix total">
            <strong style="font-weight: 400;">合计：</strong>
            <div style="width: 80%;">
              <p>项目预估利润:{{appendProfit.forecastGrossProfit}}元;项目预估利率:{{appendProfit.forecastInterestRate}}%;</p>
              <p>项目预估毛利润:{{appendProfit.totalGrossProfit}}元;项目预估毛利率:{{appendProfit.forecastProfitRate}}%; </p>
              <p>总税金:{{appendProfit.totalTaxes}}元;总质保风险:{{appendProfit.totalWarrantyPeriodWaring}}元;</p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 原货物清单与追加货物清单的差值 -->
      <div class="cargo">
        <h3>
          原货物利润与追加后货物利润的差值
        </h3>
        <ul>
          <li class="download clearfix total">
            <strong style="font-weight: 400;">差值：</strong>
            <div style="width: 80%;">
              <p>项目预估利润:{{diffProfit.forecastGrossProfit}}元;项目预估利率:{{diffProfit.forecastInterestRate}}%;</p>
              <p>项目预估毛利润:{{diffProfit.totalGrossProfit}}元;项目预估毛利率:{{diffProfit.forecastProfitRate}}%; </p>
              <p>总税金:{{diffProfit.totalTaxes}}元;总质保风险:{{diffProfit.totalWarrantyPeriodWaring}}元;</p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 追加原因 -->
      <div>
        <h3 style="border: none;">追加原因</h3>
        <group :gutter="0">
          <x-textarea v-model="purchaseAppendInfo.reason" readonly></x-textarea>
        </group>
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
      <!-- 弹框 -->
      <confirm v-model="confirmShow" title="货物清单" hide-on-blur :show-confirm-button="false" cancel-text="返回">
        <!--table表格-->
        <div class="table">
          <el-table :data="jsonProducts" height="500" style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="name" label="货物名称"></el-table-column>
            <el-table-column prop="type" label="规格名称"></el-table-column>
            <el-table-column prop="count" label="数量"></el-table-column>
            <el-table-column prop="unit" label="单位"></el-table-column>
            <el-table-column prop="firstCost" label="成本单价"></el-table-column>
            <el-table-column prop="totalFirstCost" label="成本总价"></el-table-column>
            <el-table-column prop="saleCost" label="销售单价"></el-table-column>
            <el-table-column prop="totalSaleCost" label="销售总价"></el-table-column>
            <el-table-column width="150" prop="warrantyPeriodSale" label="采购质保年限"></el-table-column>
            <el-table-column width="150" prop="warrantyPeriodBid" label="销售合同质保年限"></el-table-column>
            <el-table-column width="150" prop="warrantyPeriodWaring" label="质保风险预警"></el-table-column>
            <el-table-column width="100" prop="purchasingTaxRate" label="采购税率(%)"></el-table-column>
            <el-table-column width="100" prop="saleTaxRate" label="销售税率(%)"></el-table-column>
            <el-table-column prop="taxes" label="税金"></el-table-column>
            <el-table-column width="100" prop="grossProfit" label="毛利润"></el-table-column>
            <el-table-column width="100" prop="arrivalDateStr" label="到货时间"></el-table-column>
            <el-table-column prop="contacts" label="联系人"></el-table-column>
            <el-table-column width="140" prop="contactInfo" label="联系方式"></el-table-column>
            <el-table-column width="200" prop="inquiryCompany" label="询货单位"></el-table-column>
          </el-table>
        </div>
      </confirm>
    </div>
    <!-- 底部按钮 -->
    <div class="footer">
      <div><x-button style="background-color: #6ea6ff;" @click.native="confirm()">通过</x-button></div>
      <div v-if="this.activityID != 'buyer'"><x-button type="warn" @click.native="cancel()">拒绝</x-button></div>
      <div><x-button style="background-color: #bababa;" @click.native="$router.go(-1)">返回</x-button></div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from 'vux'
export default {
  name: "purchaseAppendItem",
  data() {
    return {
      data: {},
      key: '',
      taskId: '',
      activityID: '',
      businessKey: '',
      processInstanceId: '',
      confirmShow: false,
      jsonProducts: [],

      roleInfo: {}, // 代办事项
      purchaseAppendInfo: {}, //获取项目，合同信息需要的id
      projectInfo: {}, // 项目表单数据
      contractInfo: {}, // 合同信息
      salesmanInfo: {}, //业务员信息
      clientName: '', //客户名称
      detailedTotal: {}, // 项目合计
      appendProfit: {},
      diffProfit: {},
      opinion: [], //意见
      message: '', //审批意见

      constructionMoney: '',
      serviceMoney: '',

    }
  },
  mounted() {
    this.getUserInfo()
    this.getQuery()
    this.getRoleInfo()
    this.getProjectId()
    this.getOpinion()
  },
  methods: {
    // 获取 userInfo
    getUserInfo() {
      const user = JSON.parse(window.sessionStorage.getItem('data'))
      this.data.loginName = user.loginName
      this.data.currentUserId = user.id
    },
    // 获取参数
    getQuery() {
      this.key = this.$route.query.key
      this.taskId = this.$route.query.taskId
      this.activityID = this.$route.query.activityID
      this.businessKey = this.$route.query.businessKey
      this.processInstanceId = this.$route.query.processInstanceId
    },
    // 打开代办事项
    getRoleInfo() {
      const data =  {key: this.key, taskId: this.taskId, activityId: this.activityID}
      this.axios
        .get(`wechatErp/center/toTaskPage`, {params: data})
        .then(res => {
          // console.log(res)
          this.roleInfo = res.data
        })
    },
    // 获取项目表单数据
    getProjectId() {
      this.axios
        .get(`wechatErp/purchaseAppend/getModelById/${this.businessKey}`)
        .then(res => {
          // console.log(res)
          const {data} = res
          this.purchaseAppendInfo = data

          this.getProjectInfo(data.projectId)
          this.getBeforepurchase(data.contractId)
          this.getProjectOverallSituation()
        })
    },
    // 项目信息
    getProjectInfo(projectId) {
      this.axios.get(`wechatErp/purchaseAppend/getProjectRelateInfo?projectId=${projectId}`)
        .then(res => {
          // console.log(res)
          const {clientName, contract, project, salesman} = res.data
          this.clientName = clientName
          this.projectInfo = project
          this.contractInfo = contract
          this.salesmanInfo = salesman
        })
    },
    // 原货物清单合计
    getProjectOverallSituation() {
      const data = {
        projectId: this.purchaseAppendInfo.projectId,
        appendPurchaseId: this.purchaseAppendInfo.id,
        contractId:this.purchaseAppendInfo.contractId,
      }
      this.axios
        .get(`wechatErp/purchaseAppend/getProjectOverallSituation`, {params: data})
        .then(res => {
          console.log(res)
          this.detailedTotal = res.data.oldProfit
          this.appendProfit = res.data.appendProfit
          this.diffProfit = res.data.diffProfit
        })
    },
    // 获取项目收益，付款方式
    getBeforepurchase(contractId) {
      this.axios.get(`wechatErp/contract/getProjectProfitInfoByContractId/${contractId}`)
        .then(res => {
          // console.log(res)
          // this.detailedTotal = res.data
          this.constructionMoney = res.data.constructionMoney
          this.serviceMoney = res.data.serviceMoney
        })
    },
    // purchaseAppend
    getPurchaseAppendList(state) {
      let url = '';
      if (state == 'before') {
        url = `wechatErp/purchaseAppend/getProductsByProjectId/${this.purchaseAppendInfo.projectId}`
      }
      else if (state == 'append') {
        url = `wechatErp/purchaseAppend/getPurchaseAppendListByPaId/${this.purchaseAppendInfo.id}`
      }
      this.axios.get(url)
        .then(res => {
          // console.log(res)
          this.jsonProducts = [];
          res.data.forEach(item => {
            item.arrivalDateStr = dateFormat(item.arrivalDate, 'YYYY-MM-DD')
            if (item.childProduct.length) {
              item.childProduct.forEach(childrenItem => {
                childrenItem.arrivalDateStr = dateFormat(childrenItem.arrivalDate, 'YYYY-MM-DD')
              })
              this.jsonProducts.push(...item.childProduct)
            } else {
              this.jsonProducts.push(item)
            }
          })
          this.confirmShow = true
        })
    },
    // 意见
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
      if (!this.message.trim()) return this.$vux.toast.text('请填写审批意见')
      const data = {
        ...this.data,
        businessKey: this.businessKey,
        taskId: this.taskId,
        processInstanceId: this.processInstanceId,
        activityID: this.activityID,
        roleName: this.roleInfo.roleName,
        projectId: this.purchaseAppendInfo.projectId,
        id: this.purchaseAppendInfo.id,
        isPass: 'Y',
        message: this.message,
      }
      this.sendData(data)
    },
    // 取消
    cancel() {
      if (!this.message.trim()) return this.$vux.toast.text('请填写审批意见')
      const data = {
        ...this.data,
        businessKey: this.businessKey,
        taskId: this.taskId,
        processInstanceId: this.processInstanceId,
        activityID: this.activityID,
        roleName: this.roleInfo.roleName,
        projectId: this.purchaseAppendInfo.projectId,
        id: this.purchaseAppendInfo.id,
        isPass: 'N',
        message: this.message,
      }
      this.sendData(data);
    },
    sendData(data) {
      this.axios
        .post(`wechatErp/purchaseAppend/flowToNextActivity`, data)
        .then(res => {
          // console.log(res)
          const {resultState, messageInfo} = res.data
          if (resultState == 0) {
            this.$vux.toast.text('操作成功');
            setTimeout(() => {this.$router.go(-1)}, 800)
          } else {
            this.$vux.toast.text(res.data.resultInfo);
          }
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
