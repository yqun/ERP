<template>
  <div class="statistics">
    <div class="header">
      <search
        class="search"
        @result-click="resultClick"
        @on-focus="onFocus"
        @on-blur="onBlur"
        @on-change="getResult"
        @on-cancel="$route.path == '/applicae/statistics/dataInfo'?$router.go(-1):''"
        :results="results"
        v-model="search"
        position="absolute"
        auto-scroll-to-top
        top="0">
      </search>
    </div>
    <div class="main" :style="{'padding-top': pt}">
      <router-view :user='user' :key="user.id"></router-view>
    </div>
  </div>
</template>

<script>
import { Checklist, Group, XButton, XTextarea, Cell, PopupPicker, Search   } from 'vux'
export default {
  name: 'Statistics',
  components: { Checklist, Group, XButton, XTextarea, Cell, PopupPicker, Search   },
  data() {
    const cqid = this.$route.query.id
    return {
      cqid,
      list1: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']],
      value1: ['iPhone'],
      showPopupPicker: false,

      search: '',
      results: [],

      user: {},
      pt: 0,
      searchFlag: true, // 搜索开关
    }
  },
  mounted() {

  },
  methods: {
    onFocus() {
      this.pt = '46px'
      if (!this.searchFlag) return false;
      if (this.search != '') {
        this.searchFlag = false;
        this.results = [];
        this.getUserAnswerInfo(this.search);
      }
    },
    onBlur() {
      this.pt = '0px';
    },
    // 输入文字变化时触发
    getResult (val) {
      console.log(val)
      if (!this.searchFlag) return false;
      if (val != '') {
        this.searchFlag = false;
        this.results = [];
        this.getUserAnswerInfo(this.search);
      }

    },
    //点击结果条目时触发
    resultClick(value) {
      this.user = value;
      if (this.$route.path != '/applicae/statistics/dataInfo') {
        this.$router.push({path: '/applicae/statistics/dataInfo'});
      }
    },
    getUserAnswerInfo(name) {
      const data = {
        generalValue: name,
        cqId: this.cqid,
      };
      this.axios.get(`/wechatErp/cq/getCustomerList`, {params: data})
        .then(res => {
          console.log(res)
          const {data} = res;
          if (data.length > 0) {
            data.forEach(item => {
              this.results.push({
                title: `${item.company}　${item.name}　${item.gender=='1'?'男':'女'}`,
                id: item.id,
                cqId: item.cqId,
                userId: item.userId
              })
            })
          }
          this.searchFlag = true
        })
    }
    
  }
}
</script>

<style scoped lang="less">
.search /deep/ .weui-cells.vux-search_show {
  max-height: 300px;
  text-align: center;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
}

</style>
