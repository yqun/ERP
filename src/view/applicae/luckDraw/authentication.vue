<template>
  <div class="content">
    <div class="header_pic">
      <img src="../../../../static/images/035e79daf89b1c5cade30ed1c9f2d89.png" alt="">
    </div>
    <div class="main">
      <div class="head">
        <img :src="userInfo.headPicUrl" alt="">
      </div>
      <div class="userName">
        <p>{{userInfo.chineseName}}</p>
      </div>
      <!--<div class="join">{{messageInfo}}</div>-->
    </div>
    <div class="bottom">
      金山顶尖科技股份有限公司
    </div>
    <toast v-model="showPositionValue" width="auto"
           type="text" :time="3000" class="showToast"
           :text="messageInfo" position="bottom">
    </toast>
  </div>
</template>

<script>
export default {
  name: "authentication",
  data() {
    return {
      data: null,
      userInfo: {},
      messageInfo: '',
      showPositionValue: false,
    }
  },
  mounted() {
    const data = JSON.parse(window.sessionStorage.getItem('data'));
    this.data = {
      loginName: data.loginName,
      password: data.password
    };
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      this.axios.get(`/wechatErp/center/personSign`, this.data)
        .then(res => {
          // console.log(res);
          const {resultState, messageInfo, objData} = res.data;
          this.userInfo = objData;
          this.messageInfo = messageInfo
          this.showPositionValue = true;
        })
    }
  }
}
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  background: url("../../../../static/images/authenticationBg.gif");
  background-size: cover;
}
.header_pic {
  border-top: 1px solid transparent;
}
.header_pic img {
  display: block;
  width: 80%;
  margin: 80px auto;
}
.main {
  width: 100%;
  height: 200px;
  margin: auto;
  position: absolute;
  top: 60px;
  bottom: 0;
}
.head img {
  display: block;
  width: 40%;
  max-width: 2.22rem;
  border-radius: 50%;
  border: 2px solid #fff;
  margin: auto;
  box-sizing: border-box;
}
.userName {
  text-align: center;
  margin-top: 10px;
  font-size: 0.4rem;
  color: #750b0b;
}
.join {
  color: #750b0b;
  text-align: center;
  font-size: 14px;
}
.bottom {
  font-size: 0.28rem;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.42rem;
  text-align: center;
  color: #750b0b;
  /*-webkit-text-stroke: 1px #750b0b;*/
  text-shadow:#fdc381 1px 0 0,#fdc381 0 1px 0,#fdc381 -1px 0 0,#fdc381 0 -1px 0;
  -webkit-text-shadow:#fdc381 1px 0 0,#fdc381 0 1px 0,#fdc381 -1px 0 0,#fdc381 0 -1px 0;
  -moz-text-shadow:#fdc381 1px 0 0,#fdc381 0 1px 0,#fdc381 -1px 0 0,#fdc381 0 -1px 0;
  *filter: Glow(color=#fdc381, strength=1);
}
.showToast /deep/ .weui-toast.vux-toast-bottom {
  bottom: 180px;
}
.showToast /deep/ .weui-toast__content {
  font-size: 0.28rem;
}
</style>
