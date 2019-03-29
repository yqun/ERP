<template>
  <div class="contract-item">
    <!-- 头部导航 -->
    <x-header style="background-color:#4b77b0;"
              :left-options="{backText: ''}"
              title="合同评审">
    </x-header>
    <!-- 内容 -->
    <div class="main">
      <!-- 项目信息 -->
      <div class="project-info">
        <h3>项目信息</h3>
        <ul class="info-content">
          <li><strong>项目名称</strong><span>{{projectInfo.name}}</span></li>
          <li><strong>项目编号</strong><span>{{projectInfo.code}}</span></li>
          <li><strong>预算金额</strong><span>{{projectInfo.budget}}</span></li>
          <li><strong>客户单位</strong><span>{{projectInfo.companyName}}</span></li>
        </ul>
      </div>
      <!-- 合同信息 -->
      <div>
        <h3>合同信息</h3>
        <ul class="info-content">
          <li><strong>合同名称</strong><span>{{contractInfo.name}}</span></li>
          <li><strong>合同金额</strong><span>{{contractInfo.money}}</span></li>
          <li class="download clearfix">
            <strong>合同附件</strong>
            <div>
              <p v-for="item in contractFiles" :key="item.id">
                {{item.name}}
                <a :href="item.urlDown" download>下载</a>
              </p>
            </div>
          </li>
          <li class="download clearfix">
            <strong>招标文件</strong>
            <div>
              <p v-for="item in tenderingFiles" :key="item.id">
                {{item.name}}
                <a :href="item.urlDown" download>下载</a>
              </p>
            </div>
          </li>
          <li class="download clearfix">
            <strong>投标文件</strong>
            <div>
              <p v-for="item in bidFiles" :key="item.id">
                {{item.name}}
                <a :href="item.urlDown" download="">下载</a>
              </p>
            </div>
          </li>
          <li>
            <!--<strong>合同归属</strong>-->
            <group class="ascription" v-if="ascriptionHide">
              <selector title="合同归属"
                        placeholder="合同归属"
                        v-model="selectValue"
                        :options="list"
                        :readonly="ascriptionShow">
              </selector>
            </group>
          </li>
        </ul>
      </div>
      <!-- 货物清单 -->
      <div class="cargo">
        <h3>
          货物清单
          <span @click="confirmShow = true">查看详情>></span>
        </h3>
      </div>
      <!-- 合同付款方式 -->
      <div>
        <h3>合同付款方式</h3>
        <ul class="info-content">
          <li class="download clearfix">
            <strong>回款时间</strong>
            <div>
              <p v-for="item in paymentMethod" :key="item.id">
                {{item.dateFormat}}
              </p>
            </div>
          </li>
          <li class="download clearfix">
            <strong>回款方式</strong>
            <div>
              <p v-for="item in paymentMethod" :key="item.id">
                {{item.payKind}}
              </p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 所需费用 -->
      <div>
        <h3>所需费用</h3>
        <ul class="info-content">
          <li class="cost">
            <strong>项目经理人工成本费</strong>
            <input type="text" placeholder="0" v-model="serviceMoney" :disabled="serviceMoneyShow">
          </li>
        </ul>
      </div>
      <!-- 审批意见 -->
      <div>
        <h3>审批意见</h3>
        <ul class="info-content">
          <li class="download clearfix">
            <strong>历史意见</strong>
            <div>
              <p v-for="item in opinion" :key="item.id">
                {{item.userName}}　{{item.message}}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 弹窗 -->
    <confirm v-model="confirmShow" title="货物清单" :show-confirm-button="false" cancel-text="返回">
         <!--table表格-->
        <div class="table">
          <x-table full-bordered style="background-color:#fff;">
            <thead>
              <tr>
                <th>序号</th>
                <th>货物名称</th>
                <th>数量</th>
                <th>单位</th>
                <th>成本单价</th>
                <th>成本总价</th>
                <th>销售单价</th>
                <th>销售总价</th>
                <th>采购质保年限</th>
                <th>销售合同质保年限</th>
                <th>质保风险预警</th>
                <th>采购税率</th>
                <th>销售税率</th>
                <th>税金</th>
                <th>毛利率</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in jsonProducts" :key="item.id">
                <td>{{item.sort}}</td>
                <td>{{item.name}}</td>
                <td>{{item.count}}</td>
                <td>{{item.unit}}</td>
                <td>{{item.firstCost}}</td>
                <td>{{item.totalFirstCost}}</td>
                <td>{{item.saleCost}}</td>
                <td>{{item.totalSaleCost}}</td>
                <td>{{item.warrantyPeriodSale}}</td>
                <td>{{item.warrantyPeriodBid}}</td>
                <td>{{item.warrantyPeriodWaring}}</td>
                <td>{{item.purchasingTaxRate}}</td>
                <td>{{item.saleTaxRate}}</td>
                <td>{{item.taxes}}</td>
                <td>{{item.grossProfit}}</td>
              </tr>
            </tbody>
          </x-table>
        </div>
      </confirm>
    <!-- 提示信息 -->
    <toast v-model="toastShow" type="text" :text="toastMsg" position="middle" width="200px"></toast>
  </div>
</template>

<script>
import { dateFormat } from 'vux'
export default {
  name: "processedItem",
  data() {
    return {
      data: {},
      businessKey: '',
      processInstanceId: '',
      key: '',
      taskId: '',
      activityId: '',
      serviceMoney: '',
      confirmShow: false,
      selectValue: '',
      list: [],
      roleInfo: {},
      projectInfo: {},
      contractInfo: {},
      contractFiles: [],
      tenderingFiles: [],
      bidFiles: [],
      paymentMethod: [],
      jsonProducts: [],
      opinion: [],
      toastShow: false,
      toastMsg: '',
    }
  },
  computed: {
    // 预算金额
    serviceMoneyShow() {
      let flag = false
      if(this.activityId == 'sub_4' || this.activityId == 'sub_9') flag = true
      return flag
    },
    // 拒绝按钮
    refuseShow() {
      let flag = false
      if (this.activityId == 'sub_3' || this.activityId == 'sub_4') flag = true
      return flag
    },
    // 回退按钮
    regressionShow() {
      let flag = false
      if (this.activityId == 'sub_3') flag = true
      return flag
    },
    // 合同归属 禁止选择
    ascriptionShow() {
      // console.log(this.activityId)
      let flag = true
      if (this.activityId == 'sub_4') flag = false
      return flag
    },
    // 合同归属 显示隐藏
    ascriptionHide() {
      let flag = true
      if (this.activityId == 'sub_3') flag = false
      return flag
    }
  },
  created() {
    this.getUserInfo()
    this.getQuery();
    this.getRoleInfo();
    this.getProjectInfo();    // 项目表单数据
    this.getContractInfo();   // 合同表单数据
    this.getascription();     // 获取归属地址
    this.getContractFiles();  // 合同附件
    this.getTenderingFiles(); // 招标文件
    this.getBidFiles();       // 招标文件
    this.getPaymentMethod();  // 合同付款方式
    this.getOpinion();  // 意见
  },
  methods: {
    // 获取 userInfo
    getUserInfo() {
      const user = JSON.parse(window.sessionStorage.getItem('data'))
      this.data.loginName = user.loginName
      this.data.password = user.password
    },
    // 获取参数
    getQuery() {
      const query = this.$route.query
      this.businessKey = query.businessKey
      this.processInstanceId = query.processInstanceId
      this.key = query.key
      this.taskId = query.taskId
      this.activityId = query.activityId
    },
    // 打开代办事项
    getRoleInfo() {
      // console.log(this.data)
      const data =  {
        key: this.key,
        taskId: this.taskId,
        activityId: this.activityId,
      }
      this.axios
        .get(`wechatErp/center/toTaskPage`, {params: data})
        .then(res => {
          // console.log(res)
          this.roleInfo = res.data
        })
    },
    // 项目表单数据
    getProjectInfo() {
      this.axios
        .get(`wechatErp/contract/getModelByContractId/${this.businessKey}`)
        .then(res => {
          // console.log(res)
          this.projectInfo = res.data
        })
    },
    // 获取归属地址
    getascription() {
      this.axios
        .post(`wechatErp/center/getSubEnumModalsByCode/CONTRACT-VEST`)
        .then(res => {
          // console.log(res)
          const {data} = res
          data.forEach(item => {
            this.list.push({
              key: item.code,
              value: item.name
            })
          })// data.forEach
        })
    },
    // 合同表单数据
    getContractInfo() {
      this.axios
        .get(`/wechatErp/contract/getModelById/${this.businessKey}`)
        .then(res => {
          console.log(res)
          const {data} = res
          this.contractInfo = data
          if(data.contractVest) this.selectValue = data.contractVest;
        })
    },
    // 合同附件
    getContractFiles() {
      const data = {
        mainType: this.businessKey,
        subType:'attachments'
      }
      this.axios
        .post(`wechatErp/contract/getFiles`, data)
        .then(res => {
          // console.log(res)
          const {data} = res
          data.forEach(item => {
            console.log(item)
            item.urlDown = `${this.axiosUrl}wechatErp/center/download/${item.id}`
          })
          this.contractFiles = data
        })
    },
    // 招标文件
    getTenderingFiles() {
      const data = {
        mainType: this.businessKey,
        subType: 'biddingDocuments'
      }
      this.axios
        .post(`wechatErp/contract/getFiles`, data)
        .then(res => {
          // console.log(res)
          const {data} = res
          data.forEach(item => {
            item.urlDown = `${this.axiosUrl}wechatErp/center/download/${item.id}`
          })
          this.tenderingFiles = data
        })
    },
    // 投标文件
    getBidFiles() {
      const data = {
        mainType: this.businessKey,
        subType: 'tenderDocuments'
      }
      this.axios
        .post(`wechatErp/contract/getFiles`, data)
        .then(res => {
          // console.log(res)
          const {data} = res
          data.forEach(item => {
            item.urlDown = `${this.axiosUrl}wechatErp/center/download/${item.id}`
          })
          this.bidFiles = data
        })
    },
    // 合同付款方式
    getPaymentMethod() {
      this.axios
        .get(`/wechatErp/contract/getProjectProfitInfoByContractId/${this.businessKey}`)
        .then(res => {
          // console.log(res)
          const {data} = res
          this.paymentMethod = JSON.parse(data.jsonPayKinds)
          this.paymentMethod.forEach(item => {
            item.dateFormat = dateFormat(item.payDate, 'YYYY-MM-DD')
          })
          // 合同列表
          this.jsonProducts = JSON.parse(data.jsonProducts)
          // serviceMoney 预算金额
          this.serviceMoney = data.serviceMoney
        })
    },
    // 意见
    getOpinion() {
      const data = {
        taskId: this.taskId,
        processInstanceId: this.processInstanceId,
      }
      this.axios
        .get(`/wechatErp/contract/getBeforeTaskComment`, {params: data})
        .then(res => {
          // console.log(res)
          this.opinion = res.data
        })
    },
  }
}
</script>

<style scoped>
/* 固定头部导航 */
.contract-item {
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
/* 内容 */
.main {
  width: 100%;
}
.main > div {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.26rem;
  margin-bottom: 0.17rem;
  background-color: #fff;
}
.main > div h3 {
  font-size: 16px;
  color: #6ea6ff;
  border-bottom: 1px solid #dcdcdc;
  padding: 0.17rem 0;
}
.info-content {
  padding: 0.26rem 0 0.17rem 0;
}
.info-content li {
  font-size: 14px;
  margin-bottom: 0.2rem;
}
.info-content li strong {
  margin-right: 0.51rem;
}
.info-content li span {
  display: inline-block;
  width: 69%;
  color: #999;
  font-size: 14px;
  overflow: scroll;
  white-space: nowrap;
  vertical-align: middle;
}
.info-content li span::-webkit-scrollbar {
  display: none;
}
/* 货物清单 */
.main .cargo > h3 {
  border-bottom: none;
}
.main .cargo > h3 span {
  float: right;
  font-weight: 400;
  font-size: 14px;
  line-height: 25px;
}
/* 需要下载 */
li.download {
  margin-bottom: 0;
}
li.download strong {
  float: left;
}
li.download > div {
  float: left;
  width: 69%;
}
li.download > div p {
  color: #999;
  margin-bottom: 0.2rem;
}
li.download > div p a {
  float: right;
  background-color: #6ea6ff;
  color: #fff;
  padding: 2px 10px;
  border-radius: 6px;
}
/* 合同归属 */
.ascription /deep/ .weui-cells.vux-no-group-title {
  margin-top: 0;
}
.ascription /deep/ .weui-cells::before {
  border: none;
}
.vux-selector.weui-cell_select-after {
  padding-left: 0;
}
.vux-selector.weui-cell_select-after /deep/ .weui-cell__ft{
  text-align: left;
  font-size: 14px;
}
.ascription .vux-selector /deep/ .weui-label {
  padding-left: 0;
  color: black !important;
  font-size: 14px;
  font-weight: 700;
  width: 86px;
}
.ascription .vux-selector /deep/ .weui-select {
  font-size: 14px;
}
.ascription /deep/ .weui-cell_select .weui-cell__bd::after {
  right: 40px;
}
/* 输入所需费用  和审批意见*/
.cost input,
.opinion input {
  width: 100px;
  height: 100%;
  background-color: transparent;
  outline: none;
  border: none;
}
.opinion /deep/ .weui-cells.vux-no-group-title {
  margin-top: 10px;
}
.opinion /deep/ .weui-cells .weui-cell__bd {
  font-size: 14px;
}
/* buttom 按钮 */
.bottom {
  padding: 40px 30px;
  /*background-color: #fff;*/
}
/*.flex-demo {*/
  /*height: 0.55rem;*/
  /*line-height: 0.55rem;*/
  /*text-align: center;*/
  /*color: #fff;*/
  /*font-size: 18px;*/
  /*background-color: #6ea6ff;*/
  /*border-radius: 4px;*/
  /*background-clip: padding-box;*/
/*}*/
.flex-demo .weui-btn {
  background-color: #6ea6ff;
}
/* 弹窗 */
.vux-confirm .table {
  margin: 0 10px;
  overflow: scroll;
  white-space:nowrap
}
.vux-confirm /deep/ .weui-dialog__bd {
  width: 300px;
  max-height: 300px;
  padding: 0;
  box-sizing: border-box;
  overflow: scroll;
}
.vux-table thead th{
  padding: 0 10px;
}
</style>
