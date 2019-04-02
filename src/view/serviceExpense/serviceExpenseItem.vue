<template>
  <div class="contract-item">
    <!-- 头部导航 -->
    <x-header style="background-color:#4b77b0;"
              :left-options="{backText: ''}"
              title="业务报销">
    </x-header>
    <!-- 内容 -->
    <div class="main">
      <!-- 项目信息 -->
      <div class="project-info">
        <h3>基本说明</h3>
        <ul class="info-content">
          <li><strong>报销事由</strong><span>11111</span></li>
          <li><strong>流水号　</strong><span>11111</span></li>
          <li><strong>报销人员</strong><span>11111</span></li>
          <li><strong>报销项目</strong><span>11111</span></li>
          <li><strong>总金额　</strong><span>11111</span></li>
          <li><strong>实报金额</strong><span>11111</span></li>
          <li><strong>冲抵金额</strong><span>11111</span></li>
          <li><strong>转账类型</strong><span>11111</span></li>
          <li><strong>领款人　</strong><span>11111</span></li>
          <li>
            <strong>有无发票</strong>
            <span>
              <checker v-model="invoiceRadio" type="radio"
                 default-item-class="check-defanult" selected-item-class="ckeck-sele">
                <checker-item value="有"><x-icon type="ios-checkmark" size="20"></x-icon></checker-item> 有　
                <checker-item value="无"><x-icon type="ios-checkmark" size="20"></x-icon></checker-item> 无
              </checker>
            </span>
          </li>
          <li>
            <strong>签订合同</strong>
            <span>
              <checker v-model="contractRadio" type="radio" :radio-required="true"
                 default-item-class="check-defanult" selected-item-class="ckeck-sele">
                <checker-item value="是"><x-icon type="ios-checkmark" size="20"></x-icon></checker-item> 是　
                <checker-item value="否"><x-icon type="ios-checkmark" size="20"></x-icon></checker-item> 否
              </checker>
            </span>
          </li>
        </ul>

      </div>
      <!-- 报销充借 -->
      <div>
        <h3>报销充借</h3>
        <div class="info-content">
          <x-table :content-bordered="false" :cell-bordered="false">
            <thead>
            <tr>
              <th style="font-weight: 700">序号</th>
              <th style="font-weight: 700">借款事由</th>
              <th style="font-weight: 700">借款金额</th>
              <th style="font-weight: 700">本次抵扣钱数</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>1</td>
              <td>买水果</td>
              <td>300</td>
              <td>300</td>
            </tr>
            </tbody>
          </x-table>
        </div>
      </div>
      <!-- 报销单据 -->
      <div class="reimbursement">
        <h3>
          报销单据
          <span @click="$router.push({path: 'serviceExpenseItemData', query: {}})">查看详情>></span>
        </h3>
        <ul class="info-content">
          <!-- 差旅费才有 -->
          <li><strong>出差人　　</strong><span>杨群</span></li>
          <li><strong>出差事由　</strong><span>想去看世界</span></li>
          <!-- 都有 -->
          <li><strong>报销总金额</strong><span>￥4500.00</span></li>
        </ul>
      </div>
      <!-- 历史意见 -->
      <div>
        <h3>报销充借</h3>
        <div class="info-content">
          <x-table :content-bordered="false" :cell-bordered="false">
            <thead>
            <tr>
              <th style="font-weight: 700">角色</th>
              <th style="font-weight: 700">审批人</th>
              <th style="font-weight: 700">审批意见</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>1</td>
              <td>买水果</td>
              <td>300</td>
            </tr>
            </tbody>
          </x-table>
        </div>
      </div>
      <!-- 我的意见 -->
      <div>
        <h3>我的意见</h3>
        <group>
          <x-textarea placeholder="请填写我的审批意见"></x-textarea>
        </group>
      </div>
      <!-- 底部按钮 -->
      <div class="footer">
        <flexbox>
          <flexbox-item>
            <div class="flex-demo">
              <x-button type="warn" style="backgroundColor: #dc4141; color: #fff;">拒绝</x-button>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">
              <x-button type="primary" style="backgroundColor: #6ea6ff; color: #fff;">流转</x-button>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "serviceExpenseItem",
  data() {
    return {
      invoiceRadio: '有',
      contractRadio: '是',
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style scoped>
/* 固定头部导航 */
.contract-item {
  width: 100%;
  box-sizing: border-box;
  padding-top: 46px;
  font-size:16px;
  background-color: #f8f8f8;
}
.vux-header {
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
}
/* 内容 */
.main {
  width: 100%;
}
.main > div {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.26rem;
  margin-bottom: 0.17rem;
  background-color: #fff;
}
.main > div h3 {
  font-size: 16px;
  color: #6ea6ff;
  border-bottom: 1px solid #dcdcdc;
  padding: 0.17rem 0;
}
.main > div .info-content {
  padding: 0.2rem 0 0.17rem 0;
}
.info-content li {
  font-size: 14px;
  margin-bottom: 0.1rem;
}
.info-content li strong {
  display: inline-block;
  width: 31%;
}
.info-content li span {
  display: inline-block;
  max-width: 69%;
  color: #999;
  font-size: 14px;
  overflow: scroll;
  white-space:nowrap;
  vertical-align: middle;
}
.info-content li span::-webkit-scrollbar {
  display: none;
}
/* 单选 */
.check-defanult {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #ccc;
  vertical-align: middle;
}
.ckeck-sele {
  border: 1px solid #6ea6ff;
}
.ckeck-sele .vux-x-icon {
  position: relative;
  top: -2px;
  left: -2px;
  fill: #6ea6ff;
}
.vux-x-icon {
  fill: transparent;
}
/* 报销单据 */
.main .reimbursement > h3 span {
  float: right;
  font-weight: 400;
  font-size: 14px;
  line-height: 25px;
}
/*报销充借*/
.vux-table td:before, .vux-table th:before {
  border: none;
}
.vux-table:after {
  border: none;
}
.vux-table td {
  color: #999;
}
/* 我的意见 */
/deep/ .weui-cells:after,
/deep/ .weui-cells:before {
  border: none;
}
.weui-cell.vux-x-textarea {
  border: 1px solid #dcdcdc;
  border-radius: 10px;
}
/deep/ .weui-textarea {
  font-size: 14px;
}
/* 按钮 */
div.footer {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin: 0;
}
</style>
