<template>
  <div class="serviceExpense">
    <div class="nav" v-if="false">
      <ul class="nav-title">
        <li :class="{active: containerStyle[listIndex]}"
            v-for="(listItem,listIndex) in list"
            :key="listIndex">
          <p @click="searchInfo(listItem,listIndex)">
            {{listItem.name}}
            <i></i>
          </p>
          <div class="container" v-show="containerStyle[listIndex]">
            <!-- 搜索框 -->
            <input type="text" v-model="searchValue" placeholder="搜索">

            <!-- 搜索信息列表 -->
            <ul class="option" v-if="containerStyle[listIndex]">
              <li v-for="(optionItem,optionindex) in option"
                  :key="optionindex"
                  ref="searchItem"
                  @click="getSearchItem(listIndex, optionindex)">
                {{optionItem}}
              </li>
              <li v-if="option.length == 0" style="text-align: center;">数据为空</li>
            </ul>
          </div>
        </li>
      </ul>
    </div> <!-- nav -->
    <!-- 报销业务信息 -->
    <div class="main">
      <!--上拉加载-->
      <scroller lock-x height="100%" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
        <div class="list">
          <ul>
            <li class="listItem clearfix" v-for="item in waitHandleList" :key="item.id" @click="routerLink(item)">
              <div class="clearfix listItem_top" style="margin-bottom: 0.17rem;">
                <span>{{item.startUser}}</span>
                <h4>{{item.projectName || '非项目流程'}}</h4>
              </div>
              <div class="clearfix listItem_bottom">
                <span class="time">{{item.createTime}}</span>
                <span>{{item.name}}</span>
              </div>
              <div class="icon">
                <x-icon type="ios-arrow-right" size="24"></x-icon>
              </div>
            </li>
            <li v-if="waitHandleList.length == 0" style="text-align: center; margin-top: 10px;">暂无数据</li>
          </ul>
        </div>
      </scroller>
    </div>
    <!-- 遮罩层 -->
    <div class="zhezhao" v-if="containerStyle[zhezhaoindex]"></div>
  </div>
</template>

<script>
export default {
  name: "companyExpenseList",
  data() {
    return {
      userInfoData: {}, //
      scrollBottom: true, // 上拉加载
      iDisplayStart: 0,
      iDisplayLength: 10,
      isData: true, // 判断是否还有数据
      zhezhaoindex: '', // 判断遮罩层
      waitHandleList: [], // 代办列表
      list: [ // 搜索选项
        {name: '报销事由', value: 1},
        {name: '流水号', value: 2},
        {name: '报销项目', value: 3},
        {name: '报销人员', value: 4},
      ],
      containerStyle: [false, false, false, false,false], // 搜索打开的选项列表
      searchValue: '', // 搜索的内容
      optionArr: [], // 搜索下拉列表选项
      option: [], // 搜索下拉列表选项
      sendData: [
        {name: 'a', value: ''},
        {name: 'b', value: ''},
        {name: 'c', value: ''},
        {name: 'd', value: ''},
        {name: 'e', value: ''}
      ],
      data: {},
    }
  },
  // 列表也去到详情页  不保存信息
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false;
    next();
  },
  watch: {
    searchValue(newVal, oldVal) {
      console.log(newVal)
      this.option = []
      this.optionArr.forEach(item => {
        if (item.indexOf(newVal) !== -1) {
          this.option.push(item)
        }
      })
      console.log(this.option)
    }
  },
  mounted() {
    this.getUserInfo()
    this.getListData()
  },
  methods: {
    // 获取用户信息
    getUserInfo () {
      const user = JSON.parse(window.sessionStorage.getItem('data'))
      this.userInfoData.loginName = user.loginName
      this.userInfoData.password = user.password
    },
    // 点击 弹出查询框
    searchInfo(listItem, listIndex) {
      this.zhezhaoindex = listIndex
      // 改变每一项都为false
      this.containerStyle.forEach((item,i) => {
        if (listIndex == i) return false;
        this.containerStyle[i] = false;
      })
      // 通过索引直接改变数组的变化
      this.$set(this.containerStyle, listIndex, !this.containerStyle[listIndex])
      // 获取dropdown 信息
      // this.dropDown(listItem)
    },
    // 获取dropdown 信息
    dropDown(listItem) {
      if (this.containerStyle.indexOf(true) == -1) return false;
      this.option = []
      this.waitHandleList.forEach(item => {
        // 报销事由
        if (listItem.value == 1) {
          this.option.push(item.pdname)
        }
        //流水号
        if (listItem.value == 2) {
          this.option.push(item.pdname)
        }
        // 报销项目
        if (listItem.value == 3) {
          this.option.push(item.projectName)
        }
        // 报销人员
        if (listItem.value == 4) {
          this.option.push(item.startUser)
        }
        this.optionArr = this.option
      })
    },
    // 获取 点击查询信息的值
    getSearchItem(listIndex, optionindex) {
      // 改变字体颜色
      const option = this.$refs.searchItem
      option.forEach(item => {
        item.style.color = '#333'
      })
      option[optionindex].style.color='#6ea6ff'
      //点击选项 关闭下拉框
      setTimeout(() => {
        this.$set(this.containerStyle, listIndex, !this.containerStyle[listIndex])
      },100)
      // 获取 要发送到后台的数据
      this.sendData[listIndex].value = this.option[optionindex]
      this.sendData.forEach(item => {
        if (item.value) this.data[item.name] = item.value
      })
      // console.log(this.data)
    },

    // 列表数据
    getListData() {
      const data = {
        ...this.userInfoData,
        iDisplayStart: this.iDisplayStart,
        iDisplayLength: this.iDisplayLength
      }
      if (!this.isData) return false;
      this.axios
        .get(`wechatErp/expenseReimbursementPlatform/getToDoForPlatformBx`, {params: data})
        .then(res => {
          // console.log(res)
          const {data} = res.data;
          this.waitHandleList.push(...data);
          const page = Math.ceil(res.data.page.totalResult/10)
          if (page > (this.iDisplayStart/10 + 1)) {
            this.iDisplayStart+=10
          } else {
            this.isData = false;
          }
        })
    },

    // 上拉加载
    onScrollBottom () {
      if (this.scrollBottom) {
        this.getListData();
        this.scrollBottom = false
        setTimeout(() => {this.scrollBottom = true}, 2000)
      }
    },
    // 路由跳转
    routerLink(item) {
      this.$router.push({
        path: '/companyExpenseItem',
        query: {
          key: item.key,
          taskId: item.id,
          activityID: item.activityID,
          businessKey: item.businessKey,
          processInstanceId: item.processInstanceId
        }
      })
    }
  }
}
</script>

<style scoped>
@import '../../../assets/css/waitHandleList.css';
.serviceExpense {
  width: 100%;
  height: 100%;
  font-size: 16px;
  position: relative;
}
.nav {
  position: relative;
  z-index: 999;
}
.nav > .nav-title {
  background-color: #fff;
  white-space:nowrap;
  overflow-x: auto;
  font-size: 0px;
  border-bottom: 1px solid #f2f2f2;
}
.nav-title::-webkit-scrollbar {
  display: none; /*去除滚动条*/
}
.nav-title > li {
  width: 25%;
  height: 40px;
  line-height: 40px;
  display: inline-block;
  text-align: center;
  font-size: 14px;
  color: #5c6670;
}
.nav-title > li i {
  position: relative;
}
.nav-title > li i::after {
  content: '';
  border-bottom: 4px solid transparent;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  border-top: 4px solid #ccc;
  position: absolute;
  top: 6px;
  right: -12px;
}
.nav-title > li.active {
  color: #6ea6ff;
}
.nav-title > li.active i::after {
  content: '';
  border-bottom: 4px solid #6ea6ff;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  border-top: 4px solid transparent;
  position: absolute;
  top: 2px;
  right: -12px;
}
.nav .container {
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px 10px 12px;
  position: fixed;
  top: 88px;
  left: 0
}
.nav .container input {
  outline: none;
  height: 35px;
  border: none;
  background-color: #f2f2f2;
  box-sizing: border-box;
  padding: 0 20px;
  width: 100%;
  border-radius: 20px;
}
.nav .container .option {
  width: 100%;
  max-height: 200px;
  overflow: scroll;
  box-sizing: border-box;
  padding: 0 30px;
  text-align: left;
  color: #333;
}

/* 上拉加载 */
.main {
  width: 100%;
  height: 100%;
  position: relative;
  /*margin-top: -87px;*/
  box-sizing: border-box;
  /*padding: 86px 0px 0;*/
  z-index: 0;
}
/* 遮罩层 */
.zhezhao {
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
  position: absolute;
  top: 0;
  left: 0;
}
</style>
