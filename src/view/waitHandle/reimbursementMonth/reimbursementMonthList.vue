<template>
  <div style="background-color: #f8f8f8; height: 100%;">
    <!-- 头部导航 -->
    <!--<x-header style="background-color:#4b77b0;"-->
              <!--:left-options="{backText: ''}"-->
              <!--title="申请报销月计划">-->
    <!--</x-header>-->
    <!-- main -->
    <div class="main">
        <div class="title" style="margin-top: 0px;">
          <h3>基本信息</h3>
        </div>
        <group :gutter="0">
          <x-input title="申请名称" placeholder="请输入申请名称" :show-clear="false" v-model="applyName"></x-input>
          <datetime title="月度" format="YYYY-MM" v-model="datetimeMonth"></datetime>
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
          <swiper-item v-if='!monthCostList.length'>
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
          <swiper-item v-for="(item,index) in monthCostList" :key="item.flag" >
            <ul>
              <li><strong>项目名称</strong><span>{{item.projectName || '无'}}</span></li>
              <li><strong>客户名称</strong><span>{{item.clientName || '无'}}</span></li>
              <li><strong>联系人　</strong><span>{{item.contactsName || '无'}}</span></li>
              <li><strong>联系方式</strong><span>{{item.contactsPhone || '无'}}</span></li>
              <li><strong>招待费　</strong><span>{{item.entertainExpenses || '0'}}</span></li>
              <li><strong>差旅费　</strong><span>{{item.travelExpenses || '0'}}</span></li>
              <li><strong>礼品费　</strong><span>{{item.giftExpenses || '0'}}</span></li>
              <li><strong>项目情况</strong><span>{{item.projectInfo || '无'}}</span></li>
              <li><strong>合计金额</strong><span>{{item.singleTotalAmount || '0'}}</span></li>
              <li style="padding: 10px 10%" @click="deleteCostList(index)"><x-button type="warn">删除</x-button></li>
            </ul>
          </swiper-item>
        </swiper>
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
export default {
  name: "reimbursementMonthList",
  data() {
    return {
      height: '320px',
      applyName: '',
      datetimeMonth: '',
      costTotal: 0,
    }
  },
  beforeRouteEnter(to, from, next) {
    to.meta.keepAlive = true
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log(to.name)
    if (to.name == 'home') {
      this.$store.commit('changeMonthCostList', {index: -1})
      this.$destroy()
    }
    next()
  },
  created() {},
  activated() {},
  computed: {...mapState(['monthCostList'])},
  watch: {
    monthCostList(newVal, oldVal) {
      if (!this.monthCostList.length) return false;
      // 获取总金额
      this.costTotal = 0;
      this.monthCostList.forEach(item => {
        this.costTotal+=item.singleTotalAmount
      })
    }
  },
  methods: {
    addCostList() {  // 点击跳转添加费用列表页
      if (!this.datetimeMonth) return this.$vux.toast.text('请选择月份')
      this.$router.push({path: '/reimbursementMonthAdd', query: {month: this.datetimeMonth}})
    },
    deleteCostList(index) { // 删除费用列表选项
      this.$store.commit('changeMonthCostList', {index: index})
    },
    confirmBtn() { // 点击确认按钮
      if (!this.applyName)     return this.$vux.toast.text('申请名称不能为空')
      if (!this.datetimeMonth) return this.$vux.toast.text('请选择月份')
      if (!this.monthCostList.length) return this.$vux.toast.text('费用列表不能为空')
      const data = {
        name: this.applyName,
        month: this.datetimeMonth + '-01',
        totalAmount: this.costTotal,
        costPlanDetailsJson: JSON.stringify(this.monthCostList)
      }
      // console.log(data)
      this.axios
        .post(`wechatErp/costPlan/saveAndFlow`, data)
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
/* 底部按钮 */
.footer {
  width: 100%;
  margin-top: 10px;
  padding: 10px 10%;
  box-sizing: border-box;
}
</style>
