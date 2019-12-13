<template>
  <div>
    <div class="main">
      <!-- 项目信息 -->
      <div>
        <h3>项目信息</h3>
        <ul class="info-content">
          <li><strong>项目名称</strong><span>{{projectInfo.name}}</span></li>
          <li><strong>项目类型</strong><span>先采购型项目</span></li>
          <li><strong>客户　　</strong><span>{{clientName}}</span></li>
          <li><strong>项目编号</strong><span>{{projectInfo.code}}</span></li>
          <li><strong>备货单　</strong><span>{{purchaseExamine.name}}</span></li>
          <li><strong>申请人　</strong><span>{{salesman.chineseName}}</span></li>
          <li><strong>总金额　</strong><span>{{purchaseExamine.money || 0}}</span></li>
        </ul>
      </div>
      <!-- 备货清单 -->
      <div class="cargo">
        <h3>备货清单 <span @click="confirmShow = true">查看详情</span></h3>
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
        <!-- 弹窗 -->
        <confirm v-model="confirmShow" title="项目收益" hide-on-blur :show-confirm-button="false" cancel-text="返回">
          <!--table表格-->
          <div class="table">
            <el-table :data="jsonProducts" height="500" style="width: 100%">
              <el-table-column prop="sort" label="序号"></el-table-column>
              <el-table-column prop="name" label="货物名称"></el-table-column>
              <el-table-column prop="type" label="规格型号" width="150"></el-table-column>
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
              <el-table-column prop="" label="到货时间" width="100">
                <template slot-scope="scope">{{scope.row.arrivalDate | momentDay}}</template>
              </el-table-column>
              <el-table-column prop="contacts" label="联系人"></el-table-column>
              <el-table-column prop="contactInfo" label="联系方式" width="150"></el-table-column>
              <el-table-column prop="inquiryCompany" label="询货单位"></el-table-column>
            </el-table>
          </div>
        </confirm>
      </div>
      <!-- 历史意见 -->
      <div>
        <h3>历史意见</h3>
        <x-table :cell-bordered="false" style="background-color:#fff;">
          <thead>
          <tr>
            <th>角色</th>
            <th>审批人员</th>
            <th>审批意见</th>
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
        </x-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PorderSheetItem",
  data() {
    return {
      key: '',
      businessKey: '',
      processInstanceId: '',
      roleInfo: {},

      clientName: '', //客户名称
      projectInfo: {},
      purchaseExamine: {},
      salesman: {},
      confirmShow: false,
      jsonProducts: [],
      detailedTotal: {},
      opinion: [],
    }
  },
  mounted() {
    this.getQuery();
    this.getOpinion();
    this.getPurchaseExamineInfo();// 获取采购预审信息
  },
  methods: {
    // 获取参数
    getQuery() {
      this.key = this.$route.query.key;
      this.businessKey = this.$route.query.businessKey;
      this.processInstanceId = this.$route.query.processInstanceId;
    },
    getPurchaseExamineInfo() {
      this.axios.get(`wechatErp/purchaseExamine/getProductListByPurchaseExamineId/${this.businessKey}`)
        .then(res => {
          // console.log(res);
          const {clientName, project, purchaseExamine, salesman, productList, profit} = res.data;
          this.projectInfo = project;
          this.clientName = clientName;
          this.purchaseExamine = purchaseExamine;
          this.salesman = salesman;
          this.jsonProducts = productList;
          this.detailedTotal = profit;
        })
    },
    // 意见
    getOpinion() {
      const data = {processInstanceId: this.processInstanceId};
      this.axios.get(`wechatErp/center/getBeforeTaskComment`, {params: data})
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
@import '../../../assets/css/confirmStyle.css';
</style>
