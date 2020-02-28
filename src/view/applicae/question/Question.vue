<template>
  <div class="subject">
    <div class="header">
      <div>金山顶尖2020年客户调查问卷</div> 
    </div>
    <!-- 题目 -->
    <div class="main">

      <group :gutter="-1" 
        v-for="(item, index) of subjectArr" :key="item.id">
        <div slot="title" class="problem">第{{item.number}}题　{{item.question}}<span>({{item.questionType=='1'?'单选':item.questionType=='2'?'多选':'选填'}})</span></div>
        <checklist
          :ref="'checklist'+index"
          v-if="item.questionType == '1' || item.questionType == '2'"
          :class="{has_choose_write: item.canSupplement == 'Y'}"
          :options="item.questionOptionList"
          :max="item.questionType=='1'?1:item.questionOptionList.length" 
          @on-change="changeOption"
          v-model="item.answer">
        </checklist>
        <x-textarea  
          v-if="item.questionType == '3' || (item.canSupplement && item.canSupplement == 'Y')"
          placeholder="选填" 
          v-model="item.supplement">
        </x-textarea>
      </group>
    </div>
    <!-- 底部按钮 -->
    <div class="footer">
      <x-button style="background: skyblue; color: #fff;" @click.native="jude()" :disabled="isDisabled">提交</x-button>
    </div>
  </div>
</template>

<script>
import { Checklist, Group, XButton, XTextarea, XInput, Cell, } from 'vux'
export default {
  name: 'Question',
  components: { Checklist, Group, XButton, XTextarea, XInput, Cell, },
  data () {
    const cqId = this.$route.query.id;
    const data = JSON.parse(window.sessionStorage.getItem('data'));
    return {
      cqId,
      data,

      company: '', // 客户单位
      userName: '', // 客户姓名
      isnv: 1, // 0 女生， 1男生

      subjectArr: null,

      isDisabled: false,
    }
  },
  mounted() {
    this.getAllSubject()
  },
  methods: {
    // 获取所有的题目信息
    getAllSubject() {
      this.axios.get(`/wechatErp/cq/getSelectQuestionByCqId?cqId=${this.cqId}`)
      .then(res => {
        // console.log(res)
        const {questionList} = res.data
        questionList.forEach(item => {
          item.answer = []; // 选择的答案
          item.supplement = ''; // 选填的答案
          item.questionOptionList.forEach(option => {
            option.key = option.id
            option.value = option.option
          })
        })
        this.subjectArr = questionList
      })
    },
    changeOption(value, label) {
      this.subjectArr.forEach(ques => {
        const lastopt = ques.questionOptionList[ques.questionOptionList.length - 1];
        if (lastopt) {
          if (ques.answer.indexOf(lastopt.id) >= 0 && lastopt.canSupplement == 'Y') {
            ques.canSupplement = 'Y'
          } else if (ques.answer.indexOf(lastopt.id) < 0) {
            ques.canSupplement = 'N'
          }
        }
      });
    },
    // 提交填写的信息
    submitAllSubject () {
      let option = [];
      let data = {};
      try {
        this.subjectArr.forEach((item,index) => {
          if (item.questionOptionList.length) {
            const id =  item.questionOptionList[item.questionOptionList.length - 1].id
            const answerindex = item.answer.indexOf(id)
            if (answerindex >= 0 && answerindex != item.answer.length -1 && item.supplement){
              item.answer.splice(answerindex, 1);
              item.answer.push(id)
            }
          }
          if ((item.answer.length == 0 && item.questionType != '3') || (item.questionType == '3' && !item.supplement)) {
            throw(`请选择第${index+1}题!`)
          }
          option.push({
            questionId: item.id, // 题目id
            questionType: item.questionType,
            optionIds: item.answer, // 选项id（数组）
            supplementContent: (item.canSupplement == 'Y' || item.questionType == 3)?item.supplement || '':'', // 选填
          });
        }) // End forEach
      } catch(e) {
        return this.$vux.toast.text(e)
      }
      data = {
        cqId: this.cqId, //本次问卷调查ID
        company: '北京金山顶尖科技股份有限公司', //客户单位
        name: this.data.chineseName, //客户姓名
        userId: this.data.id,
        gender: this.isnv, //性别(0:女、1:男)
        optionJsonString: JSON.stringify(option) //JSON.stringify(option),
      }
      console.log(data);
      this.sendData(data)
    },
    sendData(data) {
      this.isDisabled = true;
      this.axios.post(`/wechatErp/cq/saveCqResult`, data)
        .then(res => {
          this.isDisabled = false;
          // console.log(res)
          if (res.data == 1) {
            this.$vux.toast.text('提交成功');
            this.$router.go(-1);
            this.subjectArr.forEach(question => {
              question.answer = [];
              question.supplement = '';
            })
          }
        })
    },
    // 判断
    jude() {
      const data = {
        cqId: this.cqId,
        userId:this.data.id
      };
      this.axios.get(`/wechatErp/cq/getIsCqed`, {params: data})
        .then(res => {
          console.log(res);
          if (res.data > 0) return this.$vux.toast.text('重复提交');
          this.submitAllSubject ()
        })
    }
  }
}
</script>

<style scoped lang="less">
.header {
  text-align: center;
  line-height: 40px;
  background-color: #efefef;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index:99;
}
.sex /deep/ .vux-cell-primary {
  flex: unset;
}
.main {
  padding-top: 40px;
  box-sizing: border-box;
}
.has_choose_write /deep/ .weui-cells.weui-cells_checkbox::after {
  border-bottom: 0px;
}
.problem {
  padding: 10px 20px;
  color: blue;
}
.problem span {
  color: red;
}

.footer {
  padding: 20px;
}
</style>

<style>
.vux-x-icon {
  display: block;
  fill: green;
  float: left;
}
</style>

