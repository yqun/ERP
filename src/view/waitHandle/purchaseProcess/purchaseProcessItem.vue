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
          <selector title="采购专员"
                    v-if="activityID == 'sub2'"
                    v-model="purchaseManId"
                    placeholder="请选择采购专员"
                    :options="buyer"
                    :value-map="['id','chineseName']"></selector>
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
            <!--<el-table-column label="子货单"></el-table-column>-->
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
      <div v-if="adoptShow"><x-button style="background-color: #6ea6ff;" @click.native="confirm()">通过</x-button></div>
      <div v-if="cancelShow"><x-button type="warn" @click.native="cancel()">拒绝</x-button></div>
      <div v-if="!adoptShow"><x-button :style="{backgroundColor:backgroundColor, fontSize:fontSize}" @click.native="confirm()">合同已留存</x-button></div>
      <div v-if="!adoptShow"><x-button :style="{fontSize:fontSize}" type="warn" @click.native="cancel()">合同未留存</x-button></div>
      <div><x-button :style="{backgroundColor:backBgColor,fontSize:fontSize}" type="default" @click.native="$router.go(-1)">返回</x-button></div>
    </div>
  </div>
</template>

<script>
  /*
    *"利润降低：事总审批 （salesManager）"
    *"营销总经理审批（marketingGeneralManager）"
    *"利润降低：总经理审批（gm1）"
    *
    * "商务专员审批采购单（businessAssistant）" // 只有通过
    * "采购经理指派采购专员（sub2）"
    *
    * 合同存档员检查合同是否留存contractClerk // 合同留存
    *
    *  商务经理审批（businessManager) // 通过 拒绝
    * 总经理审批（gm)
    *
    * 等待合同收回之后再发起采购流程(applyUpdate) // 只有通过
  */
  import { dateFormat } from 'vux'
  export default {
    name: "purchaseProcessItem",
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
        projectInfo: {}, // 项目表单数据
        contractInfo: {}, // 合同信息
        contractType: '',
        clientName: '', //客户名称
        detailedTotal: {}, // 项目合计
        buyer: [], //采购专员
        purchaseManId: '', //选择的采购专员Id
        opinion: [], //意见
        message: '', //审批意见

        backgroundColor: '#6ea6ff',
        backBgColor: '#bababa',
        fontSize: '18px'
      }
    },
    mounted() {
      this.getUserInfo()
      this.getQuery()
      this.getRoleInfo()
      this.getModelId()
      this.getOpinion()
    },
    computed: {
      // 通过
      adoptShow() {
        var flag = true
        if (this.activityID == 'contractClerk') {
          flag = false
        }
        return flag;
      },
      // 拒绝
      cancelShow() {
        var flag = true
        if (this.activityID == 'businessAssistant'
          || this.activityID == 'applyUpdate'
          || this.activityID == 'sub2'
          || this.activityID == 'contractClerk') {
          flag = false
        }
        return flag;
      }
      // 留存
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
        if (this.activityID == 'contractClerk') {
          this.fontSize = '14px '
        }
        if (this.activityID == 'sub2') {
          this.getBuyer()
        }
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
            // this.jsonProducts = productList
            this.detailedTotal = profit
          })
      },
      // 获取采购专员
      getBuyer() {
        this.axios
          .post(`wechatErp/center/getListByRoleCode/BUYER`)
          .then(res => {
            // console.log(res)
            this.buyer = res.data
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
          projectType: this.contractInfo.projectType,
          projectId: this.contractInfo.projectId,
          id: this.contractInfo.id,
          isPass: 'Y',
          message: this.message,
        }
        if (this.activityID == 'sub2') {
          if (!this.purchaseManId) return this.$vux.toast.text('请选择采购专员')
          data.purchaseManId = this.purchaseManId
        }
        else if (this.activityID == 'contractClerk') {
          data.retired = 'Y'
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
          projectType: this.contractInfo.projectType,
          projectId: this.contractInfo.projectId,
          id: this.contractInfo.id,
          isPass: 'N',
          message: this.message,
        }
        if (this.activityID == 'contractClerk') {
          data.retired = 'N'
        }
        this.sendData(data);
      },
      sendData(data) {
        this.axios
          .post(`wechatErp/purchaseFlow/flowToNextActivityForQueryOnly`, data)
          .then(res => {
            console.log(res)
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
