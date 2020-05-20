<template>
  <div :id="id" ref="c1" class="container"></div>
</template>

<script>
import { Chart, registerComponentController } from '@antv/g2';
import Gestrue from '@antv/g2/lib/chart/controller/gesture';
registerComponentController('gesture', Gestrue);
export default {
  name: "picChart",
  props: {
    id: {
      type: String,
      default: 'container'
    },
    chartData: {
      type: Array,
      default: [],
    },
    chartDataColor: {
      type: String,
      default: 'red',
    },
    arcText: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      chart: null,
    }
  },
  watch: {
    chartData(newVal, oldVal) {
      if (!newVal.length) return;
      this.createParChart();
    }
  },
  mounted() {
    this.createParChart()
  },
  methods: {
    createParChart() {
      this.chart && this.chart.destroy();
      const _this = this;

      this.chart = new Chart({
        container: _this.id,
        autoFit: true,
      });
      this.chart.data(_this.chartData);
      this.chart.legend(false);
      // this.chart.tooltip(true);
      // this.chart.tooltip({
      //   showMarkers: false
      // });
      this.chart.facet('rect', {
        fields: ['title'],
        // padding: 20,
        showTitle: false,
        eachView: (view, facet) => {
          const data = facet.data;
          let color = _this.chartDataColor;
          data.push({ title: '其他', percent: 100 - data[0].percent });
          view.data(data);
          view.coordinate('theta', {
            radius: 0.9,
            innerRadius: 0.8
          });
          view
            .interval()
            .adjust('stack')
            .position('percent')
            .color('title', [color, '#eceef1'])
            .style({
              opacity: 1,
            });
          view.annotation().text({
            position: ['50%', '50%'],
            content: '完成',
            style: {
              fontSize: 14,
              fill: '#000',
              fontWeight: 400,
              textAlign: 'center'
            },
            offsetY: -10,
          }).text({
              position: ['50%', '50%'],
              content: (data[0].value/10000).toFixed(2),
              style: {
                fontSize: 14,
                fill: '#000',
                fontWeight: 400,
                textAlign: 'center'
              },
              offsetY: 10,
            });
          view.interaction('element-active');
        }
      });

      this.chart.render();
      // // 点击开始
      // this.chart.on('pressstart', (ev) => {
      //   const { points } = ev;
      //   console.log('开始点击', ev)
      // });
      // // 点击
      // this.chart.on('press', (ev) => {
      //   const { points } = ev;
      //   console.log('点击中', ev)
      // });
      // // 点击结束
      // this.chart.on('pressend', (ev) => {
      //   const { points } = ev;
      //   console.log('点击结束', ev)
      // });
      this.$emit('finished', true);
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 90%;
}
</style>
