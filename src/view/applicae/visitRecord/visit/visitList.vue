<template>
  <div style="height: 100%;">
    <!--上拉加载-->
    <scroller lock-x height="100%" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
      <!--<div class="list">-->
        <group :gutter="0">
          <cell :title="item.companyName || '无'"
                @click.native="routerLink(item)"
                is-link
                v-for="item in list"
                :key="item.id">
            <div slot="default" class="cell-content">
              <p>{{item.reason}}</p>
              <p>{{formatDate(item.start_time) + '-' + formatDateHm(item.end_time)}}</p>
            </div>
          </cell>
        </group>
        <!--<ul>-->
          <!--<li class="listItem clearfix"@click="routerLink()">-->
            <!--<div><p>名称</p></div>-->
            <!--<div><x-icon type="ios-arrow-right" size="24"></x-icon></div>-->
            <!--<div>-->
              <!--<p>业务</p>-->
              <!--<p>2019-99-99 99:99:99</p>-->
            <!--</div>-->

          <!--</li>-->
          <!--&lt;!&ndash;<li v-if="list.length == 0" style="text-align: center; margin-top: 10px;">暂无数据</li>&ndash;&gt;-->
        <!--</ul>-->
      <!--</div>-->
    </scroller>
  </div>
</template>

<script>
import { dateFormat } from 'vux'
export default {
  name: "visitList",
  data() {
    return {
      list: [], // 拜访列表
      userInfoData: {}, //
      scrollBottom: true, // 上拉加载
      iDisplayStart: 0,
      iDisplayLength: 10,
      isData: true, // 判断是否还有数据
    }
  },
  computed: {

  },
  mounted() {
    this.getUserInfo()
    this.getListData()
  },
  methods: {
    formatDate (time) {
      return dateFormat(time, 'YYYY-MM-DD HH:mm')
    },
    formatDateHm (time) {
      return dateFormat(time, 'HH:mm')
    },
    // 获取用户信息
    getUserInfo() {
      const user = JSON.parse(window.sessionStorage.getItem('data'))
      this.userInfoData.loginName = user.loginName
      this.userInfoData.password = user.password
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
        .post(`wechatErp/crm/pageForVisitRecord`, data)
        .then(res => {
          console.log(res)
          const {data} = res.data
          this.list.push(...data)
          const page = Math.ceil(res.data.page.totalResult / 10)
          if (page > (this.iDisplayStart / 10 + 1)) {
            this.iDisplayStart += 10
          } else {
            this.isData = false;
          }
        })
    },
    // 上拉加载
    onScrollBottom() {
      if (this.scrollBottom) {
        this.getListData();
        this.scrollBottom = false
        setTimeout(() => {
          this.scrollBottom = true
        }, 2000)
      }
    },
    // 路由跳转
    routerLink(visitInfo) {
      this.$router.push({
        path: '/visitItem',
        query: {
          visitrecordId: visitInfo.visitrecordId,
          start_time: visitInfo.start_time,
          end_time: visitInfo.end_time,
          duration: visitInfo.duration,
        }
      })
    }
  }
}
</script>

<style scoped>
li.listItem {
  background-color: #fff;
  border-bottom: 1px solid #efefef;
  height: 70px;
  box-sizing: border-box;
  padding: 10px 15px;
}
li.listItem > div {
  float: left;
}
li.listItem > div:first-child {
  width: 30%;
  min-width: 100px;
  float: left;
}
li.listItem > div:nth-child(2) {
  float: right;
  line-height: 60px;
}
li.listItem > div:nth-child(3) {
  float: right;
  color: green;
}
li.listItem > div:nth-child(3) p {
  text-align: right;
}

.weui-cell {
  font-size:16px;
  box-sizing: border-box;
  width: 100%;
}
.weui-cell /deep/ .vux-cell-bd.vux-cell-primary {
  max-width: 40%;
  min-width: 90px;
}
.weui-cell /deep/ .weui-cell__ft {
  box-sizing: border-box;
  min-width: 60%;
}
.cell-content p {
  white-space: nowrap;
  text-overflow:ellipsis;
  overflow: hidden;
}
</style>
