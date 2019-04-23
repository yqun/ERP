<template>
  <div style="background-color: #f8f8f8; height: 100%;">
    <!-- 头部导航 -->
    <x-header style="background-color:#4b77b0;"
              :left-options="{backText: ''}"
              title="申请报销月计划">
    </x-header>
    <!-- main -->
    <div class="main">
      <div class="costList title" style="margin-top: 0px;">
        <h3>基本信息</h3>
        <ul>
          <li><strong>申请名称</strong><span>{{coltPlan.name}}</span></li>
          <li><strong>申请人　</strong><span>{{coltPlan.userName}}</span></li>
          <li><strong>月度　　</strong><span>{{coltPlan.month}}</span></li>
          <li><strong>申请总计</strong><span>{{totalAmount}}</span></li>
        </ul>
      </div>
      <!-- 费用列表 -->
      <div class="costList title">
        <h3>费用列表</h3>
        <!-- 费用信息 -->
        <swiper height="300px" class="text-scroll" :show-dots="false" :threshold="1">
          <swiper-item v-for="item in costPlanDetailList" :key="item.id">
            <ul>
              <li><strong>项目名称</strong><span>{{item.projectName}}</span></li>
              <li><strong>客户名称</strong><span>{{item.clientName}}</span></li>
              <li><strong>联系人　</strong><span>{{item.contactsName}}</span></li>
              <li><strong>联系方式</strong><span>{{item.contactsPhone}}</span></li>
              <li><strong>招待费　</strong><span><input type="text" :disabled="activityId !== 'sub_4'" v-model="item.entertainExpenses"></span></li>
              <li><strong>差旅费　</strong><span><input type="text" :disabled="activityId !== 'sub_4'" v-model="item.travelExpenses"></span></li>
              <li><strong>礼品费　</strong><span><input type="text" :disabled="activityId !== 'sub_4'" v-model="item.giftExpenses"></span></li>
              <li><strong>项目情况</strong><span>{{item.projectInfo || '无'}}</span></li>
              <li><strong>合计金额</strong><span>{{item.singleTotalAmount}}</span></li>
            </ul>
          </swiper-item>
        </swiper>
      </div>
      <!-- 历史意见 -->
      <div class="costList title">
        <h3 style="margin-bottom: 10px;">历史意见</h3>
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
              <tr v-for="item in opations" :key="item.id">
                <td>{{item.role}}</td>
                <td>{{item.userName}}</td>
                <td>{{item.message}}</td>
              </tr>
            <tr v-if="opations.length == 0">
              <td colspan="3">数据为空</td>
            </tr>
            </tbody>
          </x-table>
        </div>
      </div>
      <!-- 我的意见 -->
      <div class="title">
        <h3>我的意见</h3>
        <group>
          <x-textarea placeholder="请填写我的审批意见" v-model="message"></x-textarea>
        </group>
      </div>
      <!-- 按钮 -->
      <div class="footer">
        <flexbox>
          <flexbox-item v-if="confirmHide">
            <div class="flex-demo" @click="confirmBtn()">
              <x-button type="primary" style="backgroundColor: #6ea6ff; color: #fff;">审批</x-button>
            </div>
          </flexbox-item>
          <flexbox-item v-if="circulationHide">
            <div class="flex-demo" @click="circulation()">
              <x-button type="primary" style="backgroundColor: #6ea6ff; color: #fff;">流转</x-button>
            </div>
          </flexbox-item>
          <flexbox-item v-if="cancelHide">
            <div class="flex-demo" @click="cancelBtn()">
              <x-button type="warn" style=" color: #fff;">回退</x-button>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from 'vux'
export default {
  name: "monthItem",
  data() {
    return {
      data: {},
      key: '',
      taskId: '',
      activityId: '',
      businessKey: '',
      processInstanceId: '',
      coltPlan: {},
      costPlanDetailList: [],
      roleInfo: {},
      opations: {},
      message: '',
    }
  },
  created() {
    this.getUserInfo();
    this.getQuery();
    this.getRoleInfo();  // 获取代办事项
    this.getMonthInfo(); // 获取月计划基本信息
    this.getopations(); // 获取意见
  },
  computed: {
    totalAmount() {
      let sum = 0, a = 0, b = 0, c = 0;
      this.costPlanDetailList.forEach(item => {
        a = item.entertainExpenses, b = item.travelExpenses, c = item.giftExpenses;
        if (!item.entertainExpenses) a = 0;
        if (!item.travelExpenses) b = 0;
        if (!item.giftExpenses) c = 0;
        item.singleTotalAmount = a*1+b*1+c*1
        sum+=a*1+b*1+c*1
      })
      return sum;
    },
    confirmHide() {
      let flag = false
      if (this.activityId != "sub_4") flag = true
      return flag
    },
    cancelHide() {
      let flag = false
      if (this.activityId != "sub_4") flag = true
      return flag
    },
    // 流转按钮隐藏
    circulationHide() {
      let flag = false
      if (this.activityId == 'sub_4') flag = true
      return flag
    }
  },
  methods: {
    // 获取 userInfo
    getUserInfo() {
      const user = JSON.parse(window.sessionStorage.getItem('data'))
      this.data.loginName = user.loginName
      this.data.password = user.password
      this.data.id = user.id
    },
    // 获取参数
    getQuery() {
      this.key = this.$route.query.key
      this.taskId = this.$route.query.taskId
      this.activityId = this.$route.query.activityId
      this.businessKey = this.$route.query.businessKey
      this.processInstanceId = this.$route.query.processInstanceId
    },
    // 获取代办事项
    getRoleInfo() {
      const data =  {key: this.key, taskId: this.taskId, activityId: this.activityId,}
      this.axios
        .get(`wechatErp/center/toTaskPage`, {params: data})
        .then(res => {
          // console.log(res)
          this.roleInfo = res.data
        })
    },
    // 获取月计划基本信息
    getMonthInfo() {
      this.axios
        .get(`wechatErp/costPlan/getModelById/${this.businessKey}`)
        .then(res => {
          // console.log(res)
          res.data.coltPlan.month = dateFormat(res.data.coltPlan.month, 'YYYY-MM')
          this.coltPlan = res.data.coltPlan
          this.costPlanDetailList = res.data.costPlanDetailList
        })
    },
    // 获取意见
    getopations() {
      const data = {
        taskId: this.taskId,
        processInstanceId: this.processInstanceId
      }
      this.axios
        .get(`wechatErp/center/getBeforeTaskComment`, {params: data})
        .then(res => {
          // console.log(res)
          this.opations = res.data
        })
    },
    // 点击确认按钮
    confirmBtn() {
      if (!this.message.trim()) return this.$vux.toast.text('请输入意见');
      const data = {
        message:             this.message,
        businessKey:         this.businessKey,
        taskId:              this.taskId,
        processInstanceId:   this.processInstanceId,
        role:                this.roleInfo.roleName,
        id:                  this.coltPlan.id,
        totalAmount:         this.totalAmount,
        costPlanDetailsJson: JSON.stringify(this.costPlanDetailList),
        isPass : 'Y',
      }
      if (this.activityId == 'sub_3') data.lastTask = 'Y'
      // console.log(data)
      this.sendData(data)
    },
    // 点击回退按钮
    cancelBtn() {
      if (!this.message.trim()) return this.$vux.toast.text('请输入意见');
      const data = {
        message:             this.message,
        businessKey:         this.businessKey,
        taskId:              this.taskId,
        processInstanceId:   this.processInstanceId,
        role:                this.roleInfo.roleName,
        id:                  this.coltPlan.id,
        totalAmount:         this.coltPlan.totalAmount,
        costPlanDetailsJson: JSON.stringify(this.costPlanDetailList),
        isPass : 'N',
      }
      if (this.activityId == 'sub_3') data.lastTask = 'Y'
      // console.log(data)
      this.sendData(data)
    },
    // 流转
    circulation() {
      this.costPlanDetailList.forEach(item => { // 合计金额不能为0
        if (item.singleTotalAmount == 0) return this.$vux.toast.text('合计金额不能为0')
      })
      if (!this.message.trim()) return this.$vux.toast.text('请输入意见');
      this.axios
        .post(`wechatErp/costPlan/updateAndFlow`, {
          message:             this.message,
          businessKey:         this.businessKey,
          taskId:              this.taskId,
          processInstanceId:   this.processInstanceId,
          role:                this.roleInfo.roleName,
          id:                  this.coltPlan.id,
          totalAmount:         this.coltPlan.totalAmount,
          name:                this.coltPlan.name,
          month:               this.coltPlan.month+'-01',
          costPlanDetailsJson: JSON.stringify(this.costPlanDetailList),
        })
        .then(res => {
          // console.log(res)
          const {resultInfo, resultState} = res.data
          this.$vux.toast.text(resultInfo)
          if (resultState != -1) this.$router.go(-1)
        })
    },
    // 发送数据
    sendData(data) {
      this.axios
        .post(`wechatErp/costPlan/uploadSalesManagerFlow`, data)
        .then(res => {
          // console.log(res)
          const {resultInfo, resultState} = res.data
          this.$vux.toast.text(resultInfo)
          if (resultState != -1) this.$router.go(-1)
        })

    }
  }
}
</script>

<style scoped>
/*input框字体大小*/
.weui-cell {
  font-size: 14px;
}
/deep/ .weui-cells:before {
  border: none;
}
/* group */
/deep/ .weui-cells {
  padding-right: 15px;
}
/* 主体内容 */
.main {
  width: 100%;
  box-sizing: border-box;
}
.main > div.title {
  background-color: #fff;
  padding: 0 15px;
  width: 100%;
  box-sizing: border-box;
}
.main h3 {
  padding: 10px 0;
  background-color: #fff;
  color: #6ea6ff;
  font-size: 16px;
  border-bottom: 1px solid #dcdcdc;
}
.costList {
  margin-top: 10px;
}
.costList ul {
  width: 100%;
  font-size: 14px
}
.costList ul li {
  width: 100%;
  box-sizing: border-box;
  padding: 5px 0;
}
.costList ul li strong {
  display: inline-block;
  width: 31%;
}
.costList ul li span {
  display: inline-block;
  width: 69%;
  color: #999;

  /*overflow-x: scroll;*/
  overflow: hidden;
  text-overflow: ellipsis;
  white-space:nowrap;
  vertical-align: middle;
}
.costList ul li span::-webkit-scrollbar {
  display: none;
}
.costList ul li span input {
  border: none;
  outline: none;
  background-color: transparent;
}
/* 我的意见 */
/deep/ .weui-cells:after,
/deep/ .weui-cells:before {
  border: none;
}
.weui-cell.vux-x-textarea {
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  margin-bottom: 10px;
}
/deep/ .weui-textarea {
  font-size: 14px;
}
/* 表格 */
table.vux-table {
  font-size: 12px;
}
.vux-table td:before, .vux-table th:before {
  border: none;
}
.vux-table:after {
  border: none;
}
.vux-table td {
  color: #999;
}
.vux-table td {
  max-width: 100px;
}
.vux-table {
  line-height: 20px;
}
/* 底部按钮 */
.footer {
  width: 100%;
  padding: 30px 10%;
  box-sizing: border-box;
}
</style>

