<template>
  <div class="waitHandleItem">
    <!-- 头部导航 -->
    <x-header style="background-color:#4b77b0;"
              :left-options="{backText: ''}"
              title="合同审批">
    </x-header>
    <!-- main -->
    <div class="main">
      <!-- 合同信息 -->
      <div class="contractInfo">
        <p>合同编号：<span>X122222</span></p>
        <p>合同名称：<span>北京市中关村第一小学机房建设项目</span></p>
        <p>合同金额：<span>2000000</span></p>
      </div>
      <!-- 审批流程 -->
      <h4>审批流程:</h4>
      <!-- table审批流程 -->
      <div class="xTable">
        <x-table style="background-color:#fff;">
          <thead>
          <tr>
            <th>环节名称</th>
            <th>办理人</th>
            <th>意见</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>填写报销单</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>总经理审核</td>
            <td>于洋</td>
            <td>同意</td>
          </tr>
          <tr>
            <td>财务审核</td>
            <td>陈丽</td>
            <td>同意付款</td>
          </tr>
          </tbody>
        </x-table>
      </div>
      <!-- textarea审批意见 -->
      <h4>审批意见:</h4>
      <group :gutter="0">
        <x-textarea v-model="approvalOpinion" :rows="5">
        </x-textarea>
      </group>
      <!-- 流转按钮 -->
      <div class="circulation">
        <x-button mini>流转</x-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "waitHandleItem",
  data() {
    return {
      approvalOpinion: '', // 审批意见
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style scoped>
.waitHandleItem {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 16px;
}
/* 内容区域 */
.main {
  width: 100%;
  box-sizing: border-box;
  padding: 1px 10px;
  height: 100%;
  background-color: #f8f8f8;
}
/* 合同信息 */
.main .contractInfo {
  margin: 0.43rem 0;
}
/* main > h4 */
.main > h4 {
  font-weight: 400;
  margin: 0 0 0.1rem 4px;
}
/* table */
.main .xTable {
  border-radius: 10px;
  border: 1px solid #dcdcdc;
  overflow: hidden;
  box-shadow: 0 0 21px rgba(2,121,222,0.18);
  margin-bottom: 0.43rem;
}
table {
  margin-bottom: -1px;
  color: #184286;
  font-size: 14px;
}
table::after {
  border: none;
}
/* textarea */
/deep/ .weui-cells {
  border-radius: 10px;
  border: 1px solid #dcdcdc;
  box-shadow: 0 0 21px rgba(2,121,222,0.18);
}
/deep/ .weui-cells::after,
/deep/ .weui-cells::before {
  border: none;
}
/deep/ .weui-textarea {
  font-size: 0.24rem;
}
/* 流转按钮 */
.circulation {
  margin-top: 0.43rem;
  text-align: center;
}
.circulation button {
  background-color: #6ea6ff;
  color: #fff;
  font-size: 0.31rem;
}
.weui-btn_default:not(.weui-btn_disabled):active {
  background-color: #6ea6ff;
  color: #fff;
}
</style>
