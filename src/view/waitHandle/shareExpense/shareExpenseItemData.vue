<template>
  <div class="contract-item">
    <!-- 内容部分 -->
    <div class="main">
      <!-- 表头 -->
      <h3>{{title}}</h3>
      <ul>
        <li class="info-content" v-for="item in reimbursementList" :key="item.id">
          <p><strong>报销科目</strong><span>{{item.reasonInfo}}</span></p>
          <p><strong>替票科目</strong><span>{{item.replaceSubjectInfo}}</span></p>
          <p><strong>摘要　　</strong><span>{{item.content}}</span></p>
          <p><strong>金额　　</strong><span>{{item.singleTotalMoney}}</span></p>
          <!--<p><strong>附单据数</strong><span>{{item.invoiceNum}}</span></p>-->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { dateFormat } from 'vux'
export default {
  name: "customerExpenseItemData",
  filters: {
    dateFormat
  },
  data() {
    return {
      title: '普通费用',
      businessKey: '',
      projectInfo: {},
      reimbursementList: [],
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
      this.businessKey = this.$route.query.businessKey;
      this.axios
        .get(`wechatErp/expenseReimbursementDivide/mobileQueryAllBxInfoById/${this.businessKey}`)
        .then(res => {
          // console.log(res)
          const {data} = res
          this.projectInfo = data
          // 普通费用
          this.title = '普通费用'
          this.reimbursementList = data.tAppCommonBx.commonDetailList
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
  /*padding-top: 46px;*/
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
