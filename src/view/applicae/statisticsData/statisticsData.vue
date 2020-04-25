<template>
  <div class="main">
    <div class="userId">
      <span v-for="item of userId" :key="item.name"
            @click="chooseUserId(item)"
            :class="{active: item.active}"
      > <!--  -->
        {{item.name}}
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
        <div id="container" ref="c1"></div>
        <div class="chart_container_footer">
          <ul>
            <li :class="{br0: index !== 0 && index%2 === 0 || index === chartData.length}"
                v-for='(item,index) of chartData' :key="item.title">
              <p>
                <span :style="{'backgroundColor': chartDataColor[index]}"></span>
                {{item.title}}
              </p>
              <p class="totalMoney">{{(item.value/10000).toFixed(2)}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerComponentController } from '@antv/g2';
import Gestrue from '@antv/g2/lib/chart/controller/gesture';
registerComponentController('gesture', Gestrue);
export default {
  name: "statisticsData",
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
    chooseDateChangeChart() {
      if (!this.chartFinished) return this.$vux.toast.text('请图表加载完成之后再点击');
      this.chartFinished = false;
      this.yyyy = this.yyyy === 2019?2020:2019;
      this.sendData.yyyy = this.yyyy;
      this.chart && this.chart.destroy();
      this.getAllDataShowChart()
    },
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
        this.chartData.push({title: '合同额', value: ht.data.totalMoneyCompleted});
        this.chartData.push({title: '开票', value: kp.data.totalMoneyCompleted});
        this.chartData.push({title: '报销', value: bx.data.totalMoneyCompleted});
        this.chartData.push({title: '回款', value: hk.data.totalMoneyCompleted});
        this.chartData.push({title: '利润', value: lr.data.totalMoneyCompleted});
        const chartDataValSum = this.chartData.reduce(function(prev, curr, idx, arr){
          return prev + curr.value;
        }, 0);
        this.chartData.forEach((item,index) => {
          item.percent = (item.value / chartDataValSum).toFixed(4)*1 || 0;
          // console.log((item.percent*100 + '').slice(0,5))
        });
        // 创建图标实例
        this.createParChart();
      }))
    },
    createParChart() {
      const _this = this;
      this.chart = new Chart({
        container: 'container',
        autoFit: true,
        // width: this.c1.width,
        // height: this.c1.height,
      });
      this.chart.data(this.chartData);
      this.chart.coordinate('theta', {
        radius: 0.8,
        innerRadius: 0.6,
      });
      this.chart.tooltip(false);
      this.chart.legend(false);
      // 辅助文本
      this.chart
        .annotation()
        .text({
          position: ['50%', '50%'],
          content: (_this.chartData[0].value/10000).toFixed(2),
          style: {
            fontSize: 20,
            fill: '#8c8c8c',
            textAlign: 'center',
          },
          offsetY: -10,
        })
        .text({
          position: ['50%', '50%'],
          content: '总合同额',
          style: {
            fontSize: 14,
            fill: '#8c8c8c',
            textAlign: 'center',
          },
          offsetX: 0,
          offsetY: 10,
        })
      this.chart
        .interval()
        .adjust('stack')
        .position('percent')
        .color({
          fields: [`title`],
          values: this.chartDataColor,
        })
        .label('percent', (percent) => {
          return {
            content: (data) => {
              return `${(percent * 100 + '').slice(0,5)}%`;
            },
          };
        });

      this.chart.interaction('element-active');

      this.chart.render();
      this.chartFinished = true;
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
    padding: 10px;
    box-sizing: border-box;
    #container {
      width: 100%;
      height: 70%;
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
