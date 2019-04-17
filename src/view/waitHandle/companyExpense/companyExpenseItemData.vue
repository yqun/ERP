<template>
  <div class="contract-item">
    <!-- 头部导航 -->
    <x-header style="background-color:#4b77b0;"
              :left-options="{backText: ''}"
              title="公司报销">
    </x-header>
    <!-- 内容部分 -->
    <div class="main">
      <!-- 表头 -->
      <h3>{{title}}</h3>
      <ul>
        <li class="info-content" v-for="item in reimbursementList" :key="item.id" v-if="reimbursementType">
          <p><strong>报销科目</strong><span>{{item.reasonInfo}}</span></p>
          <p><strong>替票科目</strong><span>{{item.replaceSubjectInfo}}</span></p>
          <p><strong>摘要　　</strong><span>{{item.content}}</span></p>
          <p><strong>金额　　</strong><span>{{item.singleTotalMoney}}</span></p>
          <p><strong>附单据数</strong><span>{{item.invoiceNum}}</span></p>
        </li>
        <li class="info-content travel" v-for="item in reimbursementList" :key="item.id" v-if="!reimbursementType">
          <p><strong>出发　　</strong><span>{{item.startTimeDate}}</span></p>
          <p><strong>到达　　</strong><span>{{item.arrivalTimeDate}}</span></p>
          <p><strong>人数　　</strong><span>{{item.travellerAmount}}人</span></p>
          <p><strong>交通　　</strong><span>{{item.trafficKind}}　￥{{item.trafficMoney}}</span></p>
          <p><strong>出差补助</strong><span>{{item.days}}天　{{item.standardSubsidy}}元/天　<i>￥{{item.subsidyMoney}}</i></span></p>
          <p><strong>住宿费用</strong><span><i>￥{{item.hotelMoney}}</i></span></p>
          <p><strong>室内交通</strong><span><i>￥{{item.urbanTrafficMoney}}</i></span></p>
          <p><strong>其他费用</strong><span><i>￥{{item.other1Money + item.other2Money + item.other3Money}}</i></span></p>
          <p><strong>合计　　</strong><span><i>￥{{item.sumMoney}}</i></span></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { dateFormat } from 'vux'
export default {
  name: "companyExpenseItemData",
  filters: {
    dateFormat
  },
  data() {
    return {
      title: '普通费用',
      businessKey: '',
      projectInfo: {},
      reimbursementList: [],
      reimbursementType: true, // true 普通  false 差旅
    }
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = true;  // 让 A 缓存，即不刷新
    next();
  },
  created() {
    this.getProjectInfo();
  },
  methods: {
    // 获取项目表单数据
    getProjectInfo() {
      this.businessKey = this.$route.query.businessKey
      this.axios
        .get(`wechatErp/expenseReimbursementPlatform/mobileQueryAllBxInfoById/${this.businessKey}`)
        .then(res => {
          const {data} = res
          this.projectInfo = data
          // 普通费用
          if (data.kind == 1) {
            this.title = '普通费用'
            this.reimbursementList = data.tAppCommonBx.commonDetailList
            this.reimbursementType = true
          }
          // 差旅费用
          if (data.kind == 2) {
            this.title = '差旅费用'
            this.reimbursementList = data.tAppBusinessTrip.tripDetailList
            this.reimbursementList.forEach(item => {
              item.startTimeDate = dateFormat(item.startTime, 'YYYY-MM-DD')
              item.arrivalTimeDate = dateFormat(item.arrivalTime, 'YYYY-MM-DD')
            })
            this.reimbursementType = false
          }
        })
    },
  }
}
</script>

<style scoped>
/* 固定头部导航 */
.contract-item {
  width: 100%;
  height: 100%;
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
  box-sizing: border-box;
  padding: 0 10px;
  width: 100%;
  font-size: 14px;
}
h3 {
  color: #6ea6ff;
  padding: 10px 0;
  border-bottom: 1px solid #dcdcdc;
}
.info-content {
  border-bottom: 1px solid #dcdcdc;
  padding: 5px 0;
}
.info-content p {
  margin: 6px 0;
}
.info-content p strong {
  display: inline-block;
  width: 30%;
}
.info-content p span {
  display: inline-block;
  max-width: 65%;
  color: #999;

  white-space: nowrap;
  overflow: scroll;
  vertical-align: bottom;
}
.info-content p span::-webkit-scrollbar {
  display: none;
}
li.info-content.travel p span i {
  color: #eb4f4f;
  font-style: normal;
}
</style>
