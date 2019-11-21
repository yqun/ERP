<template>
  <div class="main">
    <h3>
      基本说明
      <span style="float: right;color: #666;font-size:14px;font-weight: 400;">演讲人：{{speechmakerName}}</span>
    </h3>
    <div style="height: 30px;overflow: hidden;">
      <x-table>
        <thead>
        <tr>
          <th>评分项目</th><th>评分标准</th><th>得分</th>
        </tr>
        </thead>
        <tbody v-for="scoreItem in evaluationStandardList" :key="scoreItem.id">
        <tr v-for="(standard,index) in scoreItem.childList" :key="standard.id">
          <td :rowspan="scoreItem.childList.length" v-if="index == 0" :style="rowspanStyle">{{scoreItem.name}}</td>
          <td style="height: 30px;">{{standard.name}}</td>
          <td style="padding: 0 10px;width: 60px;">
            <!-- standard.score -->
            <selector :options="standard.scoreList" v-model="standard.hasScored" @on-change="computedScore"></selector>
          </td>
        </tr>
        </tbody>
      </x-table>
    </div>

    <div style="height: calc(100% - 80px);overflow: auto">
      <x-table style="background-color:#fff;">
        <tbody v-for="scoreItem in evaluationStandardList" :key="scoreItem.id">
        <tr v-for="(standard,index) in scoreItem.childList" :key="standard.id">
          <td :rowspan="scoreItem.childList.length" v-if="index == 0" :style="rowspanStyle">{{scoreItem.name}}</td>
          <td style="height: 30px;">{{standard.name}}</td>
          <td style="padding: 0 10px;width: 60px;">
            <!-- standard.score -->
            <selector :options="standard.scoreList" v-model="standard.hasScored" @on-change="computedScore"></selector>
          </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td style="color: red;">合计</td>
          <td style="color: red;" colspan="2">{{totalScore}}分</td>
        </tr>
        </tfoot>
      </x-table>
    </div>
    <div class="footer">
      <x-button class="impblue" @click.native="submitScore()">提交</x-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "writeScore",
  data() {
    return {
      sscSpeechmakerId: '', //演讲人id

      evaluationStandardList: [], // 评分项
      speechmakerName: '', // 演讲人
      totalScore: 0, // 总分
      rowspanStyle: {
        backgroundColor: '#aacbff',
        color: '#333',
        width: '80px',
      }
    }
  },
  computed:{
    judge() {
      return JSON.parse(window.sessionStorage.getItem('data')).id
    }
  },
  mounted() {
    this.sscSpeechmakerId = this.$route.query.id;
    this.getScoreInfo()
  },
  methods: {
    getScoreInfo() {
      this.axios.get(`wechatErp/ssc/getSpeechmakerInfo/${this.sscSpeechmakerId}/${this.judge}`)
        .then(res => {
          console.log(res)
          const {evaluationStandardList,speechmakerName} = res.data;
          evaluationStandardList.forEach(scoreItem => { // 获取分数列表
            scoreItem.childList.forEach(standard => {
              standard.scoreList = [];
              for (var i = 0; i <= standard.score; i++) {
                standard.scoreList.push(i)
              }
            })
          });
          this.evaluationStandardList = evaluationStandardList;
          this.speechmakerName = speechmakerName;

        })
    },
    computedScore(val) {
      this.totalScore = 0;
      this.evaluationStandardList.forEach(scoreItem => {
        scoreItem.childList.forEach(standard => {
          this.totalScore += standard.hasScored
        })
      });
    },
    submitScore() {
      const arr = [];
      this.evaluationStandardList.forEach(scoreItem => {
        scoreItem.childList.forEach(standard => {
          arr.push({
            id: standard.gradeId,
            sscSpeechmakerId: this.sscSpeechmakerId,//演讲人维护表ID
            judge: this.judge,//评委ID
            sscEvaluationStandardId: standard.id,//评分标准ID
            score:standard.hasScored //分数
          })
        })
      });
      this.axios.post(`wechatErp/ssc/saveOrUpdateGrade`, {gradeJsonString: JSON.stringify(arr)})
        .then(res => {
          // console.log(res)
          if(res.data == 0) return this.$vux.toast.text('评分失败');
          this.$vux.toast.text('评分成功');
          setTimeout(() => {this.$router.replace('/')}, 800)
        })
    },
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 40px;
  background-color: #fff;
  overflow-y: auto;
}
h3 {
  font-size: 18px;
  color: #6ea6ff;
  border-bottom: 1px solid #dcdcdc;
  padding: 10px;
  line-height: 28px;
}

table.vux-table {
  font-size: 16px;
}
.vux-table td {
  color: #999;
  max-width: 100px;
  line-height: normal;
  height: 40px;
}
table thead tr {
  background-color: #6ea6ff;
  color:#fff;
  line-height: 30px;
}
table tbody td a {
  text-decoration: underline;
  text-decoration-color: #6ea6ff;
  color: #6ea6ff;
}
.vux-table td:before, .vux-table th:before {
  border-bottom: 1px solid #666;
}
.vux-table td:after, .vux-table th:after {
  border-right: 1px solid #666;
}
/deep/ .weui-cell_select .weui-select {
  box-sizing: border-box;
  padding-right: 20px;
  padding-left: 10px;

  border: 1px solid #bababa;
  border-radius: 4px;
  height: 28px;
  line-height: 28px;
  vertical-align: baseline;
}
/deep/ .weui-cell_select .weui-cell__bd:after {
  right: 12px;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index:999;
}
</style>
