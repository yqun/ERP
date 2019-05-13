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
        <h3>{{roleInfo.taskName}}</h3>
        <ul class="info-content">
          <li><strong>项目名称</strong><span>{{projectInfo.projectName}}</span></li>
          <li><strong>创建人</strong><span>{{projectInfo.createName}}</span></li>
          <li><strong>完工时间</strong><span>{{projectInfo.finishedTimeFormat}}</span></li>
          <li><strong>创建时间</strong><span>{{projectInfo.createTimeFormat}}</span></li>
          <li v-if="activityID == 'cto'">
            <group :gutter="0">
              <selector title="项目经理" :options="managerList" v-model="managerId"></selector>
            </group>
          </li>
        </ul>
      </div>
      <!-- 合同信息 -->
      <div>
        <h3>招投标文件</h3>
        <ul class="info-content">
          <li class="download clearfix">
            <strong>招标文件</strong>
            <div>
              <p v-for="(item,index) in bidFiles" :key="item.id">
                <span>{{item.name}}</span>
                <a :href="item.urlDown" download>下载</a>
              </p>
            </div>
          </li>
          <li class="download clearfix">
            <strong>投标文件</strong>
            <div>
              <p v-for="(item,index) in tenderingFiles" :key="index">
                <span>{{item.name}}</span>
                <a :href="item.urlDown" download>下载</a>
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
            <p>项目预估利润:{{detailedTotal.forecastGrossProfit || 0}}元;项目预估利率:{{detailedTotal.forecastInterestRate || 0}}%;</p>
            <p>项目预估毛利润:{{detailedTotal.totalGrossProfit || 0}}元;项目预估毛利率:{{detailedTotal.forecastProfitRate || 0}}%; </p>
            <p>总税金:{{detailedTotal.totalTaxes || 0}}元;总质保风险:{{detailedTotal.totalWarrantyPeriodWaring || 0}}元;</p>
          </div>
        </div>
        <!-- 弹窗 -->
        <confirm v-model="confirmShow" title="货物清单" hide-on-blur :show-confirm-button="false" cancel-text="返回">
          <!--table表格-->
          <div class="table">
            <el-table :data="jsonProducts" height="500" style="width: 100%">
              <el-table-column type="index" label="序号"></el-table-column>
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
              <tr v-for="item in opinion" :key="item.id">
                <td>{{item.role}}</td>
                <td>{{item.userName}}</td>
                <td>{{item.message}}</td>
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
        <flexbox-item v-if="contractRetained">
          <div class="flex-demo" @click="circulation()">
            <x-button type="primary" style="backgroundColor: #6ea6ff; color: #fff;">合同留存</x-button>
          </div>
        </flexbox-item>
        <flexbox-item v-if="contractRetained">
          <div class="flex-demo" @click="circulation('N')">
            <x-button type="primary" style="backgroundColor: #dc4141; color: #fff;">合同未留存</x-button>
          </div>
        </flexbox-item>
        <flexbox-item v-if="circulate">
          <div class="flex-demo" @click="circulation()">
            <x-button type="primary" style="backgroundColor: #6ea6ff; color: #fff;">流转</x-button>
          </div>
        </flexbox-item>
        <flexbox-item v-if="refusebtn">
          <div class="flex-demo" @click="circulation('N')">
            <x-button type="primary" style="backgroundColor: #dc4141; color: #fff;">拒绝</x-button>
          </div>
        </flexbox-item>
        <flexbox-item v-if="applyUpdate">
          <div class="flex-demo" @click="circulation()">
            <x-button type="primary" style="backgroundColor: #6ea6ff; color: #fff;">合同已回收并流转</x-button>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import { dateFormat } from 'vux'
export default {
  name: "createInitiation",
  data() {
    return {
      data: {},
      key: '',
      taskId: '',
      activityID: '',
      businessKey: '',
      processInstanceId: '',

      titleInfo: '',
      roleInfo: {},
      projectInfo: {},
      managerList: [],
      managerId: '',
      jsonProducts: [],
      detailedTotal: {},
      tenderingFiles: [],
      bidFiles: [],
      opinion: [],
      confirmShow: false,
      message: '',
    }
  },
  computed: {
    contractRetained() { // 合同留存
      if (this.activityID == 'contractClerk') return true;
    },
    circulate() {        // 流转
      if (this.activityID != 'contractClerk' && this.activityID != 'applyUpdate') return true;
    },
    refusebtn() {        // 拒绝
      if (this.activityID == 'businessManager' || this.activityID == 'gm') return true;
    },
    applyUpdate() {      // 合同已回收并流转
      if (this.activityID == 'applyUpdate') return true;
    }
  },
  created() {
    this.getUserInfo() ;      // 获取用户信息
    this.getQuery();          // 获取项目参数
  },
  mounted() {
    this.getRoleInfo();       // 打开代办事项
    this.getProjectInfo();    // 获取项目表单数据
    this.getManagerList();    // 获取项目经理列表
    this.getOpinion();        // 意见
  },
  methods: {
    // 打开代办事项
    getRoleInfo() {
      // console.log(this.data)
      const data =  {
        key: this.key,
        taskId: this.taskId,
        activityId: this.activityID,
      }
      this.axios
        .get(`wechatErp/center/toTaskPage`, {params: data})
        .then(res => {
          // console.log(res)
          this.roleInfo = res.data
        })
    },
    // 获取 userInfo
    getUserInfo() {
      const user = JSON.parse(window.sessionStorage.getItem('data'))
      this.data.loginName = user.loginName
      this.data.currentUserId = user.id
    },
    // 获取项目参数
    getQuery() {
      this.key = this.$route.query.key
      this.taskId = this.$route.query.id
      this.activityID = this.$route.query.activityID
      this.businessKey = this.$route.query.businessKey
      this.processInstanceId = this.$route.query.processInstanceId
    },
    // 获取项目表单数据
    getProjectInfo() {
      this.axios
        .get(`wechatErp/projectStart/getModelById/${this.businessKey}`)
        .then(res => {
          console.log(res)
          const {data} = res
          data.createTimeFormat = dateFormat(data.createTime, 'YYYY-MM-DD')
          data.finishedTimeFormat = dateFormat(data.projectFinishTime, 'YYYY-MM-DD')
          this.projectInfo = data

          this.getTotal();    // 货物清单合计
          this.getProducts(); // 合同付款方式
          this.getContract(); // 根据项目id获取合同id
        })
    },
    // 获取项目经理列表
    getManagerList() {
      this.axios
        .get(`wechatErp/projectStart/getUserListByRoleCode/PM`)
        .then(res => {
          console.log('项目经理列表', res)
          res.data.forEach(item => {
            this.managerList.push({key: item.id, value: item.chineseName})
          })
        })
    },
    // 根据项目id获取合同id
    getContract() {
      this.axios
        .get(`wechatErp/contract/getMaxVersionContractByProjectId/${this.projectInfo.projectId}`)
        .then(res => {
          // console.log(res)
          const id = res.data.id
          this.getTenderingFiles(id); // 招标文件
          this.getBidFiles(id);       // 投标文件
        })
    },
    // 货物清单合计
    getTotal() {
      this.axios
        .get(`wechatErp/projectStart/getProfitByProjectId/${this.projectInfo.projectId}`)
        .then(res => {
          // console.log('detailedTotal', res)
          this.detailedTotal = res.data
        })
    },
    // 货物清单列表
    getProducts() {
      this.axios
        .get(`wechatErp/projectStart/getProductsByProjectId/${this.projectInfo.projectId}`)
        .then(res => {
          // console.log('jsonProducts',res)
          const {data} = res
          // 合同列表
          this.jsonProducts = res.data
        })
    },
    // 投标文件
    getTenderingFiles(id) {
      const data = {
        mainType: id,
        subType: 'tenderDocuments'
      }
      this.axios
        .get(`wechatErp/center/getFilesBySubTypeList`, {params: data})
        .then(res => {
          // console.log(res)
          const {data} = res
          data.forEach(item => {
            item.urlDown = `${this.axiosUrl}wechatErp/center/download/${item.id}`
          })
          this.tenderingFiles = data
        })
    },
    // 招标文件
    getBidFiles(id) {
      const data = {
        mainType: id,
        subType: 'biddingDocuments'
      }
      this.axios
        .get(`wechatErp/center/getFilesBySubTypeList`, {params:data})
        .then(res => {
          // console.log(res)
          const {data} = res
          data.forEach(item => {
            item.urlDown = `${this.axiosUrl}wechatErp/center/download/${item.id}`
          })
          this.bidFiles = data
        })
    },
    // 意见
    getOpinion() {
      const data = {
        taskId: this.taskId,
        processInstanceId: this.processInstanceId
      }
      this.axios
        .get(`wechatErp/center/getBeforeTaskComment`, {params: data})
        .then(res => {
          // console.log(res)
          this.opinion = res.data
        })
    },
    // 流转
    circulation(approval) {
      const data = {
        ...this.data,
        id: this.projectInfo.id,
        taskId: this.taskId,
        activityID: this.activityID,
        businessKey: this.businessKey,
        processInstanceId: this.processInstanceId,
        projectId: this.projectInfo.projectId,
        roleName:this.roleInfo.roleName,
        message: this.message,
        isPass: 'Y'
      }
      if (this.activityID == 'contractClerk') data.retired = true;
      if (this.activityID == 'cto') data.projectManagerId = this.managerId;
      if (approval == 'N') {
        data.isPass = 'N'
        if (this.activityID == 'contractClerk') data.retired = false
      }
      if (this.activityID == 'cto' && !data.projectManagerId) return this.$vux.toast.text('请选择项目经理')
      if (!data.message.trim()) return this.$vux.toast.text('请填写意见');
      console.log(data)
      this.axios
        .post(`wechatErp/projectStart/flowToNextActivity`, data)
        .then(res => {
          // console.log(res)
          const {resultInfo, resultState} = res.data
          this.$vux.toast.text(resultInfo)
          if (resultState != -1) return this.$router.go(-1);
        })
    },
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

/* 选择项目经理 */
.vux-selector.weui-cell_select-after {
  padding-left: 0;
}
.vux-selector /deep/ .weui-cell__hd {
  font-weight: 700;
  width: 30%;
}
/deep/ .weui-cell__hd .weui-label {
  width: 100%;
}
/deep/ .weui-cells.vux-no-group-title {
  font-size: 14px;
}
/deep/ .weui-select {
  height: 23px;
  line-height: normal;
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
