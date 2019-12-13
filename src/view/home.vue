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
          <grid-item class="statusItem" @click.native="toSponsored()">
            <img slot="icon" src="../assets/images/697d11c73f391af74e3bc5b31ec433f.png">
            <span slot="label">我发起的</span>
          </grid-item>
          <grid-item class="statusItem" @click.native="toWaitHandle()">
            <i v-if="waitHandleNum">{{waitHandleNum}}</i>
            <img slot="icon" src="../assets/images/4cdb9e3da1522ef57d3c7c61c3cae54.png">
            <span slot="label">待处理</span>
          </grid-item>
          <grid-item class="statusItem" @click.native="toProcessed()">
            <img slot="icon" src="../assets/images/606204896a7e1b053a0c88b601fceef.png">
            <span slot="label">已处理</span>
          </grid-item>
        </grid>
      </div>
      <!-- 常用应用 application -->
      <div class="application">
        <h3>常用应用</h3>
        <swiper height="4.05rem" dots-position="center" class="swiperstyle" :show-dots="false">
          <!-- 第一页 -->
          <swiper-item class="applicationItem">
            <grid :show-lr-borders="false" :show-vertical-dividers="false" :cols="4">
              <!-- 拜访记录 -->
              <grid-item link="/customerList">
                <img slot="icon" src="../assets/images/application/24@2x.png">
                <span slot="label">CRM</span>
              </grid-item>
              <!-- 客户管理 -->
              <grid-item link="/addCustomer">
                <img slot="icon" src="../assets/images/application/40@2x.png">
                <span slot="label">客户管理</span>
              </grid-item>
              <!-- 机会管理 -->
              <grid-item link="/projectList">
                <img slot="icon" src="../assets/images/application/16@2x.png">
                <span slot="label">商机管理</span>
              </grid-item>
              <!-- 报销月计划 -->
              <grid-item link="/reimbursementMonthList">
                <img slot="icon" src="../assets/images/application/34@2x.png">
                <span slot="label">报销月计划</span>
              </grid-item>
              <!-- 扫一扫 -->
              <grid-item @click.native="wxScan()">
                <img slot="icon" src="../assets/images/application/41@2x.png">
                <span slot="label">扫一扫</span>
              </grid-item>

              <!--项目启动-->
              <!--<grid-item link="/initiationList">-->
                <!--<img slot="icon" src="../assets/images/application/14@2x.png">-->
                <!--<span slot="label">项目启动</span>-->
              <!--</grid-item>-->
            </grid>
          </swiper-item>
          <!-- 第二页 -->
          <!--<swiper-item class="applicationItem">-->
            <!--<grid :show-lr-borders="false" :show-vertical-dividers="false" :cols="4">-->
              <!-- e服务 -->
              <!--<grid-item @click.native="toEservice()">-->
                <!--<img slot="icon" src="../assets/images/application/efuwu.png" style="height: 0.9rem;">-->
                <!--<span slot="label">e服务</span>-->
              <!--</grid-item>-->
            <!--</grid>-->
          <!--</swiper-item>-->
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
      isDepeName: false,
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
        // if (user.deptList[0].name == '产品技术研发部') {
        //   this.isDepeName = true
        // }
      } else {
        const code = location.search.split('&')[0].split('=')[1];
        this.axios
          .get(`wechatErp/center/initialAccreditation?code=${code}`)
          .then(res => {
            // console.log(res);
            const {data} = res;
            if (data != null) {
              const dataStr = window.sessionStorage.setItem('data', JSON.stringify(data))
              this.getWaitHandle(data);
              // if (data.deptList[0].name == '产品技术研发部') {
              //   this.isDepeName = true
              // }
            }
          })
      }
    },
    // 获取待处理总数
    getWaitHandle({loginName, password}) {
      const data = {'loginName': loginName , 'password': password,}
      this.axios
        .get('wechatErp/center/getBacklogCount', {params:data})
        .then(res => {
          // console.log(res)
          this.waitHandleNum = (res.data > 99)? '99+':res.data
        })
    },
    toSponsored() { // 跳转到我发起的
      this.$router.push('/sponsored')
      this.$store.commit('changeListBtnText', '我发起的')
    },
    toWaitHandle() { // 跳转到正在流转
      this.$router.push('/waithandle')
      this.$store.commit('changeListBtnText', '正在流转')
    },
    toProcessed() { // 跳转到已处理
      this.$router.push('/processed')
      this.$store.commit('changeListBtnText', '已处理')
    },
    wxScan() {
      const url = location.href.split('#')[0];
      // alert(url);
      this.axios.post(`wechatErp/ssc/getPermissionsValidationParam`,{url: url})
        .then(res => {
          // console.log(res)
          this.wxConfig(res.data)
        })

    },
    wxConfig(config) {
      const that = this
      wx.config({
        beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: config.appId, // 必填，企业微信的corpID
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        nonceStr: config.nonceStr, // 必填，生成签名的随机串
        signature: config.signature,// 必填，签名，见 附录-JS-SDK使用权限签名算法
        jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
      });
      wx.ready(function(){
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        that.routerPush()
      });
      wx.error(function(res){
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      })
    },
    routerPush() {
      const that = this;
      wx.scanQRCode({
        desc: 'scanQRCode desc',
        needResult: 1, // 默认为0，扫描结果由企业微信处理，1则直接返回扫描结果，
        scanType: ["qrCode"], // 可以指定扫二维码还是条形码（一维码），默认二者都有
        success: function(res) {
          // 回调
          const id = res.resultStr;
          that.$router.push({path: '/applicae/writeScore', query: {id: id}})
        },
        error: function(res) {
          if (res.errMsg.indexOf('function_not_exist') > 0) {
            alert('版本过低请升级')
          }
        }
      });
    },
    toEservice () {
      window.location.href = 'http://eService.kingtop.com.cn:7080/platform/system/toOAuth.do'
    },
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
  width: unset;
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
