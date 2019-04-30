<template>
  <div style="background-color: #f8f8f8; height: 100%;">
    <!-- 头部导航 -->
    <x-header style="background-color:#4b77b0;"
              :left-options="{backText: ''}"
              title="申请报销月计划">
    </x-header>
    <!-- main -->
    <div class="main">
      <div class="title" style="margin-top: 0px;">
        <h3>基本信息</h3>
      </div>
      <group :gutter="0">
        <x-input title="申请名称" placeholder="请输入申请名称" :show-clear="false" v-model="coltPlan.name"></x-input>
        <datetime title="月度" format="YYYY-MM" v-model="coltPlan.month"></datetime>
        <x-input title="总计　　" :show-clear="false"　disabled v-model="costTotal"></x-input>
      </group>
      <!-- 费用列表 -->
      <div class="costList title">
        <h3>
          费用列表
          <span style="float: right;" @click="addCostList()"><i class="add-pic"></i>添加</span>
        </h3>
        <!-- 费用信息 -->
        <swiper :height="height" :show-dots="false" :threshold="20">
          <swiper-item v-if='!costPlanDetailList.length'>
            <ul>
              <li><strong>项目名称</strong><span>无</span></li>
              <li><strong>客户名称</strong><span>无</span></li>
              <li><strong>联系人　</strong><span>无</span></li>
              <li><strong>联系方式</strong><span>无</span></li>
              <li><strong>招待费　</strong><span>无</span></li>
              <li><strong>差旅费　</strong><span>无</span></li>
              <li><strong>礼品费　</strong><span>无</span></li>
              <li><strong>项目情况</strong><span>无</span></li>
              <li><strong>合计金额</strong><span>无</span></li>
            </ul>
          </swiper-item>
          <swiper-item v-for="(item,index) in costPlanDetailList" :key="item.id || item.flag">
            <ul>
              <li><strong>项目名称</strong><span>{{item.projectName }}</span></li>
              <li><strong>客户名称</strong><span>{{item.clientName }}</span></li>
              <li><strong>联系人　</strong><span>{{item.contactsName }}</span></li>
              <li><strong>联系方式</strong><span>{{item.contactsPhone }}</span></li>
              <li><strong>招待费　</strong><span><input type="number" v-model="item.entertainExpenses"></span></li>
              <li><strong>差旅费　</strong><span><input type="number" v-model="item.travelExpenses"></span></li>
              <li><strong>礼品费　</strong><span><input type="number" v-model="item.giftExpenses"></span></li>
              <li><strong>项目情况</strong><span><input type="text" v-model="item.projectInfo"></span></li>
              <li><strong>合计金额</strong><span>{{item.singleTotalAmount}}</span></li>
              <li style="padding: 10px 10%" @click="deleteCostList(index)"><x-button type="warn">删除</x-button></li>
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
          <flexbox-item>
            <div class="flex-demo" @click="confirmBtn()">
              <x-button type="primary" style="backgroundColor: #6ea6ff; color: #fff;">流转</x-button>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo" @click="$router.go(-1)">
              <x-button type="warn" style="backgroundColor: #bababa; color: #fff;">取消</x-button>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { dateFormat } from 'vux'
export default {
  name: "updateInfo",
  data() {
    return {
      data: {},
      height: '320px',
      applyName: '',
      datetimeMonth: '',
      costTotal: 0,
      roleInfo: {},
      coltPlan: {},
      costPlanDetailList: [],
      opations: [],
      message: '',
    }
  },
  beforeRouteEnter(to, from, next) {
    to.meta.keepAlive = true
    next()
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == 'home') {
      this.$store.commit('changeMonthCostList', {index: -1})
      this.$destroy()
    }
    next()
  },
  created() {
    this.getUserInfo();
    this.getQuery();
    this.getRoleInfo(); // 获取代办事项
    this.getMonthInfo(); // 获取月计划基本信息
    this.getopations(); // 获取意见
  },
  activated() {
    this.costPlanDetailList.push(...this.monthCostList)
    this.$store.commit('changeMonthCostList', {index: -1})
  },
  computed: {
    ...mapState(['monthCostList']),
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
  },
  watch: {
    totalAmount(newVal, oldVal) {
      this.costTotal = newVal
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
          console.log(res)
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
    // 点击跳转添加费用列表页
    addCostList() {
      if (!this.coltPlan.month) return this.$vux.toast.text('请选择月份')
      this.$router.push({path: '/reimbursementMonthAdd', query: {month: this.datetimeMonth}})
    },
    // 删除费用列表选项
    deleteCostList(index) {
      this.costPlanDetailList.splice(index, 1)
    },
    // 点击确认按钮
    confirmBtn() {
      if (!this.coltPlan.name)  return this.$vux.toast.text('申请名称不能为空')
      if (!this.coltPlan.month) return this.$vux.toast.text('请选择月份')
      for(let i = 0; i < this.costPlanDetailList.length; i++) {
        if(this.costPlanDetailList[i].singleTotalAmount == 0) return this.$vux.toast.text('合计金额不能为0');
      }
      if (!this.message.trim()) return this.$vux.toast.text('请输入意见');
        const data = {
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
        }
        // console.log(data)
        this.axios
          .post(`wechatErp/costPlan/updateAndFlow`, data)
          .then(res => {
            // console.log(res)
            const {resultState, resultInfo} = res.data
            this.$vux.toast.text(resultInfo)
            if (resultState == -1) return false;
            this.$router.go(-1)
          })
      },
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
  padding: 3px 0;
}
.costList ul li strong {
  display: inline-block;
  width: 31%;
}
.costList ul li span {
  display: inline-block;
  width: 69%;
  color: #999;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: middle;
}
.costList ul li span input {
  border: none;
  outline: none;
  background-color: transparent;
}
/* 添加 */
.add-pic {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #6ea6ff;
  color: #fff;
  margin-right: 4px;
  vertical-align: middle;
  position: relative;
  top: -2px;
}
.add-pic::after {
  content: '';
  display: block;
  width: 10px;
  height: 2px;
  background-color: #fff;
  color: #fff;
  position: absolute;
  top: 9px;
  left: 5px;
}
.add-pic::before {
  content: '';
  display: block;
  width: 2px;
  height: 10px;
  background-color: #fff;
  color: #fff;
  position: absolute;
  top: 5px;
  left: 9px;
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
  margin-top: 10px;
  padding: 10px 10%;
  box-sizing: border-box;
}
</style>
