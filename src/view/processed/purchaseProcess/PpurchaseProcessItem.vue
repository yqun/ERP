<template>
  <div>
    <div class="main">
      <!-- 基本信息 -->
      <div>
        <h3>基本信息</h3>
        <group :gutter="0">
          <x-input disabled title="项目名称" v-model="projectInfo.name"></x-input>
          <x-input disabled title="项目编号" v-model="projectInfo.code"></x-input>
          <x-input disabled title="项目类型" v-model="contractType"></x-input>
          <x-input disabled title="合同名称" v-model="contractInfo.contractName"></x-input>
          <x-input disabled title="业务员　" v-model="contractInfo.userName"></x-input>
          <x-input disabled title="合同编码" v-model="contractInfo.contractCode || '合同编码'"></x-input>
          <x-input disabled title="内部编码" v-model="contractInfo.incrementNo || '内部编码'"></x-input>
          <x-input disabled title="成本金额" v-model="contractInfo.totalFirstCost"></x-input>
          <x-input disabled title="合同金额" v-model="contractInfo.contractMoney"></x-input>
          <x-input disabled title="客户名称" v-model="clientName"></x-input>
          <x-input disabled title="外包施工费" v-model="contractInfo.constructionMoney"></x-input>
        </group>
      </div>
      <!-- 原货物清单 -->
      <div class="cargo">
        <h3>
          原货物利润
          <span @click="confirmShow = true">查看详情>></span>
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
  </div>
</template>

<script>
  import { dateFormat } from 'vux'
  export default {
    name: "PpurchaseProcessItem",
    data() {
      return {
        key: '',
        businessKey: '',
        processInstanceId: '',
        confirmShow: false,
        jsonProducts: [],

        projectInfo: {}, // 项目表单数据
        contractInfo: {}, // 合同信息
        contractType: '',
        clientName: '', //客户名称
        detailedTotal: {}, // 项目合计
        opinion: [], //意见


      }
    },
    mounted() {
      this.getQuery()
      this.getModelId()
      this.getOpinion()
    },
    methods: {
      // 获取参数
      getQuery() {
        this.key = this.$route.query.key
        this.businessKey = this.$route.query.businessKey
        this.processInstanceId = this.$route.query.processInstanceId
      },
      // 获得采购流程实体
      getModelId() {
        this.axios
          .get(`wechatErp/purchaseFlow/getModelById/${this.businessKey}`)
          .then(res => {
            // console.log(res)
            const {data} = res
            this.contractInfo = data

            this.getProjectInfo(data.projectId)
            this.getContractType()
            this.getGoodList()
          })
      },
      // 获取项目信息
      getProjectInfo(projectId) {
        this.axios
          .post(`wechatErp/projectManager/getModelById/${projectId}`)
          .then(res => {
            // console.log(res)
            const {clientName, clientId, contacts, pm} = res.data
            this.clientName = clientName
            this.projectInfo = pm
          })
      },
      // 获取项目类型
      getContractType() {
        this.axios
          .get(`wechatErp/center/subEnum/getSubEnumNameByCode/CONTRACT-TYPE/${this.contractInfo.projectType}`)
          .then(res => {
            // console.log(res)
            this.contractType = res.data
          })
      },
      // 获取货物清单
      getGoodList(projectId) {
        let url = ''
        if (this.contractInfo.projectType == 'CONTRACT-TYPE-AGREEMENT') {
          url = `wechatErp/purchaseFlow/getProductsById/${this.businessKey}`
        } else {
          url = `wechatErp/purchaseFlow/getProductsByProjectId/${this.contractInfo.projectId}`
        }
        this.axios
          .get(url)
          .then(res => {
            // console.log(res)
            this.jsonProducts = [];
            const {productList, profit} = res.data
            productList.forEach(item => {
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
            this.detailedTotal = profit
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
