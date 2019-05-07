<template>
  <div class="contract">
    <!-- 头部导航 -->
    <x-header style="background-color:#4b77b0;"
              :left-options="{backText: ''}"
              title="项目启动">
    </x-header>
    <!-- main -->
    <div class="main">
      <!-- 项目信息 -->
      <div>
        <!--新建项目启动流程，技术总监指派项目经理，项目经理审阅-->
        <h3>{{titleInfo}}</h3>
        <ul class="info-content">
          <li><strong>项目名称</strong><span>1111</span></li>
          <li><strong>创建人</strong><span>1111</span></li>
          <li>
            <group :gutter="0">
              <datetime type="text" placeholder="请选择完工日期" format="YYYY-MM-DD">
                <p slot="title" style="font-weight: 700;">完工时间</p>
              </datetime>
            </group>
          </li>
          <li><strong>创建时间</strong><span>1111</span></li>
          <li><strong>项目经理</strong><span>1111</span></li>
        </ul>
      </div>
      <!-- 合同信息 -->
      <div>
        <h3>招投标文件</h3>
        <ul class="info-content">
          <li class="download clearfix">
            <strong>合同附件</strong>
            <div>
              <p v-for="(item,index) in 1" :key="index">
                <span>11111</span>
                <a href="" download>下载</a>
              </p>
            </div>
          </li>
          <li class="download clearfix">
            <strong>招标文件</strong>
            <div>
              <p v-for="(item,index) in 1" :key="index">
                <span>11111</span>
                <a href="" download>下载</a>
              </p>
            </div>
          </li>
          <li class="download clearfix">
            <strong>投标文件</strong>
            <div>
              <p v-for="(item,index) in 1" :key="index">
                <span>11111</span>
                <a href="" download>下载</a>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 货物清单 -->
      <div class="cargo">
        <h3>货物清单<span @click="confirmShow = true">查看详情>></span></h3>
        <div class="clearfix total">
          <p>合计：</p>
          <div>
            <!--<p>项目预估利润:{{forecastGrossProfit}}元;项目预估利率:{{forecastInterestRate}}%;</p>-->
            <!--<p>项目预估毛利润:{{detailedTotal.totalGrossProfit}}元;项目预估毛利率:{{detailedTotal.forecastProfitRate}}%; </p>-->
            <!--<p>总税金:{{detailedTotal.totalTaxes}}元;总质保风险:{{detailedTotal.totalWarrantyPeriodWaring}}元;</p>-->
            <p>项目预估利润:66元;项目预估利率:66%;</p>
            <p>项目预估毛利润:66元;项目预估毛利率:66%; </p>
            <p>总税金:66元;总质保风险:66元;</p>
          </div>
        </div>
        <!-- 弹窗 -->
        <confirm v-model="confirmShow" title="货物清单" hide-on-blur :show-confirm-button="false" cancel-text="返回">
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
      <!-- 历史意见 -->
      <div>
        <h3>历史意见</h3>
        <div class="info-content">
          <x-table :content-bordered="false" :cell-bordered="false">
            <thead>
              <tr>
                <th style="font-weight: 700">角色</th>
                <th style="font-weight: 700">审批人</th>
                <th style="font-weight: 700">审批意见</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>66</td>
                <td>66</td>
                <td>66</td>
              </tr>
            </tbody>
          </x-table>
        </div>
      </div>
      <!-- 我的意见 -->
      <div class="my-opation">
        <h3>我的意见</h3>
        <group :gutter="0">
          <x-textarea placeholder="请填写我的审批意见" v-model="message"></x-textarea>
        </group>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="footer">
      <flexbox>
        <flexbox-item>
          <div class="flex-demo" @click="circulation()">
            <x-button type="primary" style="backgroundColor: #6ea6ff; color: #fff;">流转</x-button>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
export default {
  name: "createInitiation",
  data() {
    return {
      titleInfo: '新建项目启动流程',
      confirmShow: false,
      jsonProducts: [],
      message: '',
    }
  },
  created() {

  },
  methods: {
    // 流转
    circulation() {
      console.log('流转')
    }
  }
}
</script>

<style scoped>
@import '../../../assets/css/listItem.css';
/* 固定头部导航 */
.contract {
  width: 100%;
  box-sizing: border-box;
  padding-top: 46px;
  font-size:16px;
  background-color: #f8f8f8;
}
.vux-header {
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
}
/* 结束时间 */
.vux-datetime.weui-cell.weui-cell_access {
  padding: 0;
  font-size: 14px;
}
.vux-datetime.weui-cell.weui-cell_access >/deep/ div:first-child {
  width: 30%;
}
.vux-datetime.weui-cell.weui-cell_access >/deep/ .weui-cell__ft {
  text-align: left;
}
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
/* 底部按钮 */
.footer {
  box-sizing: border-box;
  padding: 20px 10%;
  width: 100%;
}
</style>
