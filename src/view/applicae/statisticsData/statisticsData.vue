<template>
  <div class="main">
    <div class="userId">
      <span v-for="item of userId" :key="item.name"
            @click="chooseUserId(item)"
            :class="{active: item.active}"
      > <!--  -->
        {{item.name}}
        <i v-if="item.name !== '公司'" class="iconfont icon-arrowdown"></i>
      </span>
      <p style="float: right;">单位(万元)</p>
    </div>
    <div class="chart">
      <div class="chart_header clearfix">
        <div class="userName">金山顶尖(<a href="javascript:;" @click="chooseDateChangeChart()">{{yyyy}}</a>)</div>
        <div class="user_more"> <!-- 三个点 -->
          <i></i>
          <i></i>
          <i></i>
        </div>
      </div>
      <div class="chart_main">
        <ul>
          <li v-for="(item,index) in chartData"
              :key="item[0].title">
            <p class="chart_title_text" v-if="item[0].plan || item[0].plan == 0">
              <span>任务: {{(item[0].plan/10000).toFixed(2)}}万元</span>
              <!--<span>完成: {{(item[0].value/10000).toFixed(2)}}万元</span>-->
            </p>
            <pic-chart
              :id="`con${index}`"
              :chart-data="item"
              :chart-data-color="chartDataColor[index]"
              arc-text="合同额"
              @finished="chartFinish"
            ></pic-chart>
            <p style="text-align: center;">{{item[0].title}}</p>
          </li>
        </ul>
        <!--<div class="chart_container_footer">-->
          <!--<ul>-->
            <!--<li :class="{br0: index !== 0 && index%2 === 0 || index === chartData.length}"-->
                <!--v-for='(item,index) of chartData' :key="item.title">-->
              <!--<p>-->
                <!--<span :style="{'backgroundColor': chartDataColor[index]}"></span>-->
                <!--{{item.title}}-->
              <!--</p>-->
              <!--<p class="totalMoney">{{(item.value/10000).toFixed(2)}}</p>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerComponentController } from '@antv/g2';
import Gestrue from '@antv/g2/lib/chart/controller/gesture';
registerComponentController('gesture', Gestrue);

import PicChart from './picChart'
export default {
  name: "statisticsData",
  components: {
    PicChart
  },
  data() {
    const {loginName, password} = JSON.parse(sessionStorage.getItem('data'));
    // console.log(loginName, password);
    const yyyy = 2019;
    const sendData = {loginName, password, yyyy};
    return {
      loginName,
      password,
      yyyy,
      sendData,
      chart: null,
      chartFinished: false,
      userId: [
        {name: '公司', active: true},
        {name: '部门', active: false},
        {name: '个人', active: false},
      ],
      chartData: [],
      chartDataColor: ['#2c8de4','#ff735a','#ec4d9c','#ef9b3d','#20c387'],
    }
  },
  mounted() {
    this.getAllDataShowChart();
  },
  watch: {
    yyyy(newVal, oldVal) {
      console.log(newVal, oldVal)
    }
  },
  computed: {

  },
  methods: {
    chooseUserId(user) {
      if (user.name !== '公司') {
        return this.$vux.toast.text('暂未开放');
      }
      this.userId.forEach(item => {
        item.name === user.name? item.active = true:item.active = false;
      })
    },
    getContractTotalMoney() {
      return this.axios.get(`wechatErp/indexData/getContractTotalMoney`, {params: this.sendData})
    },
    getKpTotalMoney() {
      return this.axios.get(`wechatErp/indexData/getKpTotalMoney`, {params: this.sendData})
    },
    getBxTotalMoney() {
      return this.axios.get(`wechatErp/indexData/getBxTotalMoney`, {params: this.sendData})
    },
    getHkTotalMoney() {
      return this.axios.get(`wechatErp/indexData/getHkTotalMoney`, {params: this.sendData})
    },
    getLrTotalMoney() {
      return this.axios.get(`wechatErp/indexData/getLrTotalMoney`, {params: this.sendData})
    },
    // 点击年份
    chooseDateChangeChart() {
      if (!this.chartFinished) return this.$vux.toast.text('请图表加载完成之后再点击');
      this.chartFinished = false;
      this.yyyy = this.yyyy === 2019?2020:2019;
      this.sendData.yyyy = this.yyyy;
      this.getAllDataShowChart()
    },
    // 获取数据
    getAllDataShowChart() {
      this.axios.all(
        [
          this.getContractTotalMoney(),
          this.getKpTotalMoney(),
          this.getBxTotalMoney(),
          this.getHkTotalMoney(),
          this.getLrTotalMoney(),
        ]
      ).then(this.axios.spread((ht, kp, bx, hk, lr) => {
        console.log(ht, kp, bx, hk, lr, "-----------------------");
        this.chartData = [];
        this.$set(this.chartData, this.chartData.length, [{
          title: '合同额',
          value: ht.data.totalMoneyCompleted,
          plan: ht.data.totalMoneyMission || 0,
          percent: ht.data.totalMoneyMission?
            (ht.data.totalMoneyCompleted / ht.data.totalMoneyMission*100).toFixed(2)*1:100
        }]);
        this.$set(this.chartData, this.chartData.length, [{
          title: '利润',
          value: lr.data.totalMoneyCompleted,
          plan: lr.data.totalMoneyMission || 0,
          percent: lr.data.totalMoneyMission?
            (lr.data.totalMoneyCompleted / lr.data.totalMoneyMission * 100).toFixed(2)*1:100
        }]);
        this.$set(this.chartData, this.chartData.length, [{
          title: '开票',
          value: kp.data.totalMoneyCompleted,
          percent: kp.data.totalMoneyMission?
            (kp.data.totalMoneyCompleted / kp.data.totalMoneyMission * 100).toFixed(2)*1:100
        }]);
        this.$set(this.chartData, this.chartData.length, [{
          title: '回款',
          value: hk.data.totalMoneyCompleted,
          percent: hk.data.totalMoneyMission?
            (hk.data.totalMoneyCompleted / hk.data.totalMoneyMission * 100).toFixed(2)*1:100
        }]);
       console.log(this.chartData)
      }))
    },
    chartFinish(msg) {
      // console.log(msg)
      this.chartFinished = true
    }
  }
}
</script>

<style scoped lang="less">
.main {
  padding: 0 10px;
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  box-sizing: border-box;
}
.userId {
  line-height: 1rem;
  span{
    font-size: 0.27rem;
    color:#666;
    margin-right: 0.4rem;
    i {
      position: relative;
      top: 2px;
    }
    &.active {
      color: #0492fe;
    }
  }
}
.chart {
  width: 100%;
  height: 7.4rem;
  background-color: #fff;
  box-shadow:5px 5px 5px 0 rgba(0,0,0,0.1);
  border-radius: 0.2rem;
  padding-top: 1rem;
  position: relative;
  overflow: hidden;
  .chart_header {
    position: absolute;
    top: 0;
    line-height: 1rem;
    padding: 0 20px;
    width: 100%;
    box-sizing: border-box;
    .userName {
    }
    .user_more {
      height: 24px;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 20px;
      margin: auto;
      i {
        display: block;
        width: 10px;
        height: 6px;
        border-radius: 4px;
        background-color: #6b6491;
        margin-bottom: 2px;
      }
    }
  }
  .chart_main {
    width: 100%;
    height: 100%;
    /*background-color: #efefef;*/
    padding: 10px 10px 10px;
    box-sizing: border-box;
    position: relative;
    >ul {
      width: 100%;
      height: 100%;
      li {
        float: left;
        width: 50%;
        height: 200px;
        box-sizing: border-box;
        padding: 20px 10px 10px;
        text-align: center;
        position: relative;
        >p.chart_title_text {
          /*width: 100%;*/
          text-align: center;
          font-size: 12px;
          box-sizing: border-box;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
        }
      }
    }
    .chart_container_footer {
      ul {
        display:flex;
        flex-wrap: wrap;
        li {
          width: 33.33%;
          text-align: center;
          margin-top: 10px;
          box-sizing: border-box;
          border-right: 1px dashed #ccc;
          &.br0 {
            border-right: none;
          }
          p {
            font-size: 14px;
            span {
              vertical-align: middle;
              display: inline-block;
              width:20px;
              height:6px;
              border-radius: 6px;
            }
            &.totalMoney {
              font-size: 18px;
            }
          }
        }
      }
    }
  }
}
</style>
