<template>
  <div>
    <div class="banner">
      <img src="../assets/images/banner.jpg" alt="banner">
    </div>
    <!-- main -->
    <div class="main">
      <!-- 三个按钮 -->
      <div class="status">
        <grid :show-lr-borders="false" :show-vertical-dividers="false">
          <grid-item class="statusItem" link="sponsored">
            <img slot="icon" src="../assets/images/697d11c73f391af74e3bc5b31ec433f.png">
            <span slot="label">我发起的</span>
          </grid-item>
          <grid-item class="statusItem" link="waitHandle">
            <i v-if="waitHandleNum">{{waitHandleNum}}</i>
            <img slot="icon" src="../assets/images/4cdb9e3da1522ef57d3c7c61c3cae54.png">
            <span slot="label">待处理</span>
          </grid-item>
          <grid-item class="statusItem" link="processed">
            <img slot="icon" src="../assets/images/606204896a7e1b053a0c88b601fceef.png">
            <span slot="label">已处理</span>
          </grid-item>
        </grid>
      </div>
      <!-- 常用应用 application -->
      <div class="application">
        <h3>常用应用</h3>
        <swiper height="4.05rem" dots-position="center" class="swiperstyle">
          <!-- 第一页 -->
          <swiper-item class="applicationItem">
            <grid :show-lr-borders="false" :show-vertical-dividers="false" :cols="4">
              <!-- 合同审批 -->
              <grid-item link="/contractList">
                <img slot="icon" src="../assets/images/application/组18@2x.png">
                <span slot="label">合同审批</span>
              </grid-item>
              <!-- 业务报销 -->
              <grid-item link="/serviceExpenseList">
                <img slot="icon" src="../assets/images/application/组36@2x.png">
                <span slot="label">项目报销</span>
              </grid-item>
              <!-- 公司报销 -->
              <grid-item link="/companyExpenseList">
                <img slot="icon" src="../assets/images/application/组37@2x.png" style="height: 0.9rem;">
                <span slot="label">公司报销</span>
              </grid-item>
              <!-- 报销月计划 -->
              <grid-item link="/reimbursementMonthList">
                <img slot="icon" src="../assets/images/application/组34@2x.png" style="height: 0.9rem;">
                <span slot="label">报销月计划</span>
              </grid-item>
              <!-- 机会管理 -->
              <grid-item link="/projectList">
                <img slot="icon" src="../assets/images/application/组16@2x.png">
                <span slot="label">机会管理</span>
              </grid-item>
              <!-- 项目启动-->
              <grid-item link="/initiationList">
                <img slot="icon" src="../assets/images/application/组14@2x.png">
                <span slot="label">项目启动</span>
              </grid-item>
              <!-- 借款 -->
              <grid-item link="/companyLoanList">
                <img slot="icon" src="../assets/images/application/组35@2x.png" style="height: 0.8rem;">
                <span slot="label">公司借款</span>
              </grid-item>
              <grid-item link="/serviceLoanList">
                <img slot="icon" src="../assets/images/application/组33@2x.png">
                <span slot="label">项目借款</span>
              </grid-item>
            </grid>
          </swiper-item>
          <!-- 第二页 -->
          <swiper-item class="applicationItem">
            <grid :show-lr-borders="false" :show-vertical-dividers="false" :cols="4">
              <!-- 物品领用 -->
              <grid-item link="/goodsReceiveList">
                <img slot="icon" src="../assets/images/application/组38@2x.png">
                <span slot="label">物品领用</span>
              </grid-item>
              <!-- 采购变更 -->
              <grid-item link="/purchaseAppendList">
                <img slot="icon" src="../assets/images/application/组20@2x.png" style="height: 0.9rem;">
                <span slot="label">采购追加</span>
              </grid-item>
              <!-- 采购流程 -->
              <grid-item link="/purchaseProcessList">
                <img slot="icon" src="../assets/images/application/组20@2x.png" style="height: 0.9rem;">
                <span slot="label">采购流程</span>
              </grid-item>
            </grid>
          </swiper-item>
        </swiper>
      </div>
    </div>
    <!-- main End -->
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      waitHandleNum: 0,
    }
  },
  beforeRouteLeave(to, from, next) {
    // console.log(to)
    if (to.name == 'reimbursementMonthList') to.meta.keepAlive = false
    next();
  },
  created() {
    // const state = location.search.split('&')[1].split('=')[1];
    // if (state) return this.$router.push(`/${state}`)
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    // 获取 用户认证信息
    getUserInfo() {
      const user = JSON.parse(window.sessionStorage.getItem('data'))
      if (user) {
        // console.log(user.loginName);
        this.getWaitHandle(user);
      } else {
        const code = location.search.split('&')[0].split('=')[1];
        this.axios
          .get(`wechatErp/center/initialAccreditation?code=${code}`)
          .then(res => {
            console.log(res.data.loginName);
            const {data} = res
            if (data != null) {
              const dataStr = window.sessionStorage.setItem('data', JSON.stringify(data))
              this.getWaitHandle(data)
            }
          })
      }
    },
    // 获取待处理总数
    getWaitHandle({loginName, password}) {
      const data = {
        'loginName': loginName ,
        'password': password,
      }
      this.axios
        .get('wechatErp/center/getBacklogCount', {params:data})
        .then(res => {
          // console.log(res)
          this.waitHandleNum = (res.data > 99)? '99+':res.data
        })
    }
  },
}
</script>

<style scoped>
@import '../assets/css/vux-grid.css';
.banner {
  width: 100%;
  height: 3rem;
  position: relative;
  overflow: hidden;
}
.banner img {
  display: block;
  height: 100%;
  position: absolute;
  margin: auto;
  left: 50%;
  transform: translate(-50%);
}
/* 内容区域 */
.main {
  width: 100%;
  padding: 0px 10px;
  box-sizing: border-box;
  position: relative;
  top: -0.45rem;
}
/* 我发起的  待处理  已处理 */
.main > .status {
  background-color: #fff;
  height: 2.4rem;
  border-radius: 5px;
  box-shadow: 5px 8px 15px rgba(49, 101, 166, 0.33);
  box-sizing: border-box;
  padding: 10px;
}
.statusItem {
  font-size: 16px;
  text-align: center;
  color: #333;
  position: relative;
}
.statusItem img {
  display: inline-block;
  width: 1.2rem;
  height: 1.2rem;
  vertical-align: middle;
}
.statusItem i {
  display: block;
  padding: 0px 0.1rem;
  border-radius: 0.15rem;
  font-size: 0.2rem;
  color: #fff;
  position: absolute;
  top: 5%;
  left: 54%;
  font-style: normal;
  background-color: red;
}
/* 常用应用 */
.application {
  margin-top: 25px;
}
.application > h3 {
  font-size: 0.273rem;
  margin-bottom: 14px;
}
.application .applicationItem {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  box-sizing: border-box;
  padding: 10px;
}
.applicationItem a.weui-grid {
  padding: 0;
  height: 50%;
}
.applicationItem a.weui-grid >>> .weui-grid__icon {
  padding-top: 15px;
  box-sizing: border-box;
  /*border-bottom: 1px solid #ccc;*/
  position: relative;
}
.applicationItem img {
  height: 1rem;
  width: 1rem;
  margin: auto;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.applicationItem span {
  font-size: 14px;
}
/deep/ .weui-grid__label {
  white-space: normal;
}
/*swiper 样式修改*/
.vux-slider {
  border-radius: 5px;
  box-shadow: 5px 8px 15px rgba(49, 101, 166, 0.33);
}
.swiperstyle >>> .vux-indicator{
  bottom: 0px;
}
/* 点 */
.swiperstyle >>> .vux-indicator i.vux-icon-dot {
  width: 10px;
  height: 3px;
}
</style>
