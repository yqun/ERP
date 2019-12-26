<template>
  <div class="content">
    <ul>
      <li class="topic" v-for="(item,index) of subjectAll" :key="item.id">
        <div class="subject">
          {{index+1}}、{{item.question}}
        </div>
        <div class="answer">
          <checklist :options="item.optionList" v-model="item.selectedOptionArr" :max="1"></checklist>
        </div>
      </li>
    </ul>
    <div class="footerBtn">
      <x-button class="impblue" @click.native="submitScore()" :disabled="!isDisabled">提交</x-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "salesmanScoreItem",
  data() {
    return {
      isDisabled: true,
      id: '', // 评测人id
      query: '', // 评测信息
      subjectAll: [], //所有题目
    }
  },
  mounted() {
    this.id = JSON.parse(window.sessionStorage.getItem('data')).id;
    this.query = this.$route.query;
    this.getAllSubject()
  },
  methods: {
    getAllSubject() {
      const data = {
        evaluationId: this.query.evaluationId,
        participant: this.query.userId,
        judge: this.id,
      };
      this.axios.get(`wechatErp/evaluation/getQuestionList`, {params: data})
        .then(res => {
          console.log(res);
          this.subjectAll = res.data;

          this.subjectAll.forEach(subject => {
            subject.selectedOptionArr = [];
            if (subject.selectedOption) {
              subject.selectedOptionArr = [subject.selectedOption];
            }
            subject.optionList.forEach(option => {
              option.key = option.id;
              option.value = `${option.level}(${option.score}分)`;
              option.inlineDesc = `${option.option}`;
            }) // end subject.optionList

          }) // end this.subjectAll

        })
    },
    submitScore() {
      const grade = [];
      try {

        this.subjectAll.forEach(subject => {
          const isSelected = subject.optionList.filter(option => option.key == subject.selectedOptionArr[0]);
          if (!isSelected.length) throw(`请评测第${subject.number}题`);
          grade.push({
            evaluationId: this.query.evaluationId,
            questionId: isSelected[0].questionId,
            optionId: isSelected[0].id,
            optionScore: isSelected[0].score,
          })
        }); // end this.subjectAll

      } catch(e) {
        return this.$vux.toast.text(e)
      }

      const data = {
        evaluationId: this.query.evaluationId,
        participant: this.query.userId,
        judge: this.id,
        gradeJsonString: JSON.stringify(grade)
      };
      // console.log(data);
      this.sendData(data);
    },
    sendData(data) {
      this.isDisabled = !this.isDisabled;
      this.axios.post(`wechatErp/evaluation/saveOrUpdateGrade`, data)
        .then(res => {
          console.log(res);
          if (res.data == 1) {
            this.$vux.toast.text('评测成功');
            this.$router.go(-1)
          } else if (res.data == 0) {
            this.$vux.toast.text('评测失败');
            this.isDisabled = !this.isDisabled;
          } else if (res.data == 2) {
            this.$vux.toast.text('评测已结束');
            this.isDisabled = !this.isDisabled;
          }
        })
    }
  }
}
</script>

<style scoped>
.content {
  padding: 0 10px;
  background-color: #fff;
}
.topic {
  padding: 10px 0;
}
.subject {
  margin-bottom: 10px;
}
.answer /deep/ .weui-cells {
  font-size: 14px;
}
.answer /deep/ .weui-cells:before {
  border-top: 0;
}
.answer /deep/ .weui-cell {
  padding: 10px 0;
}
.answer /deep/ .weui-cell:before {
  left: 0;
}
.answer /deep/ .weui-cells_checkbox .weui-icon-checked:before {
  font-size: 18px;
}
.footerBtn {
  margin:10px 0 20px;
}
.weui-btn_disabled.weui-btn_default {
  background-color: #3f89fd !important;
  color: #fff !important;
}
</style>
