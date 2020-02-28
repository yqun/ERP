<template>
  <div>
    <div style="text-align: right;padding:5px 10px 0 0;line-height: 20px;font-size: 14px;">
      <span style="color: red;">{{customerCount}}</span> 人答题
    </div>
    <group :gutter="-1" v-for="(item,index) of questionList" :key="item.id">
      <div slot="title" class="problem" v-if="item.questionType != '3'">
        第{{index+1}}题　{{item.question}}
        <span v-if="item.questionType == '1'">(单选)</span>
        <span v-else-if="item.questionType == '2'">(多选)</span>
        <span v-else-if="item.questionType == '3'">(选填)</span>
      </div>

      <cell v-for="option of item.questionOptionList" :key="option.id">
        <div slot="title">{{option.option}}</div>
        <div class="option_val">
          <span class="val_num">{{option.baifenbi}}%({{option.selectedCount}}人)</span>
          <span v-if="option.baifenbi > 70" class="val_chart" :style="{'width':option.baifenbi + '%','backgroundColor':'green'}">隐藏的文字，撑开span的高度</span>
          <span v-else-if="option.baifenbi > 50" class="val_chart" :style="{'width':option.baifenbi + '%','backgroundColor':'blue'}">隐藏的文字，撑开span的高度</span>
          <span v-else-if="option.baifenbi >= 0" class="val_chart" :style="{'width':option.baifenbi + '%','backgroundColor':'red'}">隐藏的文字，撑开span的高度</span>
          <span v-else-if="option.baifenbi == 0" class="val_chart" :style="{'width':option.baifenbi + '%','backgroundColor':'transparent'}">隐藏的文字，撑开span的高度</span>
        </div>
      </cell>

    </group>
  </div>
</template>

<script>
import { Checklist, Group, XButton, XTextarea, Cell } from 'vux'
export default {
  name: 'AllData',
  components: { Checklist, Group, XButton, XTextarea, Cell },
  data() {
    return {
      questionList: [],
      customerCount: '',
    }
  },
  mounted() {
    this.getAllData()
  },
  methods: {
    getAllData() {
      const cqid = this.$route.query.id;
      this.axios.get(`/wechatErp/cq/getQuestionOptionSelectedCount?cqId=${cqid}`)
      .then(res => {
        console.log(res)
        const {questionList, customerCount} = res.data;
        this.customerCount = customerCount;
        questionList.forEach(ques => {
          ques.questionOptionList.forEach(opt => {
            opt.baifenbi = (opt.selectedCount/customerCount*100).toFixed(2)*1 || 0
          })
        })
        this.questionList = questionList
        
      })
    }
  }
}
</script>

<style scoped lang="less">
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
.option_val {
  width: 100px;
  background-color: #ccc;
  margin-left: 20px;
  text-align: center;
  font-size: 12px;
  color: #fff;
  position: relative;
}
.option_val span {
  display: block;
}
.option_val .val_chart {
  background-color: red;
  white-space: nowrap;
  overflow: hidden;
  color: transparent;
}
.option_val .val_num {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
