<template>
  <div>
    <!-- 题目 -->
    <div class="main">
      <group :gutter="0">
        <x-input disabled title="公司名称<b style='color: red;'>*</b>:" v-model="customer.company"></x-input>
        <x-input disabled title="姓　　名<b style='color: red;'>*</b>:" v-model="customer.name"></x-input>
        <!-- 性别 -->
        <cell class="sex">
          <div slot="title" style="width: 105px;">性　　别<b style='color: red;'>*</b>:</div>
          <div slot="child">
            <div style="float:left;margin-right:20px;">
              <x-icon v-show="!isnv" type="ios-checkmark-outline"></x-icon>
              <x-icon v-show="isnv" type="ios-checkmark"></x-icon>
              <span style="margin-left: 5px;">男</span>
            </div>
            <div style="float:left;">
              <x-icon v-show="isnv" type="ios-checkmark-outline"></x-icon>
              <x-icon v-show="!isnv" type="ios-checkmark"></x-icon>
              <span style="margin-left: 5px;">女</span>
            </div>
          </div>
        </cell>
      </group>

      <group :gutter="-1" 
        v-for="item of subjectArr" :key="item.id">
        <div slot="title" class="problem">
          第{{item.number}}题　{{item.question}}
          <span>({{item.questionType=='1'?'单选':item.questionType=='2'?'多选':'选填'}})</span>
        </div>
        <checklist
          disabled
          v-if="item.questionOptionList && item.questionOptionList.length"
          :class="{has_choose_write: item.canSupplement == 'Y'}"
          :options="item.questionOptionList"
          v-model="item.answer">
        </checklist>
        <x-textarea 
          disabled
          class="distext"
          placeholder="选填" 
          v-if="item.canSupplement == 'Y' || item.questionType == '3'"
          :value="item.supplement">
        </x-textarea>
      </group>
    </div>
  </div>
</template>

<script>
import { Checklist, Group, XButton, XTextarea, XInput, Cell, } from 'vux'
export default {
  name: 'DataInfo',
  components: { Checklist, Group, XButton, XTextarea, XInput, Cell, },
  props: ['user'],
  data() {
    return {
      company: '', // 客户单位
      userName: '', // 客户姓名
      isnv: 1, // 0 女生， 1男生

      subjectArr: null,
      customer: {},
    }
  },
  mounted() {
    this.getUserwrite();
  },
  methods: {
    getUserwrite() {
      const data = {
        cqId: this.user.cqId, // 试卷id,
        customerId: this.user.id, // 客户id
      };
      this.axios.get(`/wechatErp/cq/getCustomerCq`, {params: data})
        .then(res => {
          // console.log(res)
          const {questionList, customer} = res.data
          questionList.forEach(question => {
            question.answer = [];
            question.questionOptionList.forEach(option => {
              option.value = option.option
              option.key = option.id
              if (option.canSupplement == 'Y') {
                question.supplement = option.supplementContent
                question.canSupplement = 'Y'
              } // 补充的答案
              if (option.isSelected == 'Y') {
                question.answer.push(option.id)
              }// 选中的答案
            })
            if (question.questionType == '3') {
              question.supplement = question.supplementContent
            }
          }) // end questionList
          this.subjectArr = questionList // 题目
          console.log(this.subjectArr)
          this.customer = customer // 客户信息
          this.isnv = customer.gender*1 // 性别
        })
    }
  }
}
</script>

<style scoped lang="less">
.sex /deep/ .vux-cell-primary {
  flex: unset;
}
.main {
  // padding-top: 40px;
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
.distext /deep/ textarea[disabled] {
  background-color: transparent;
}
.vux-x-icon {
  display: block;
  fill: green;
  float: left;
}
</style>
