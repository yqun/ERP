<template>
  <div>
    <div class="main">
      <div>
        <h3>基本信息</h3>
        <ul class="info-content">
          <li><strong>申请类型</strong><span>公司借款</span></li>
          <li><strong>借款事由</strong><span>公司借款</span></li>
          <li><strong>创建人　</strong><span>公司借款</span></li>
          <li><strong>所属公司</strong><span>公司借款</span></li>
          <li><strong>总金额　</strong><span>公司借款</span></li>
          <li><strong>部门名称</strong><span>公司借款</span></li>
          <li><strong>开户行　</strong><span>公司借款</span></li>
          <li><strong>银行账号</strong><span>公司借款</span></li>
          <li><strong>银行账户</strong><span>公司借款</span></li>
        </ul>
      </div>
      <!-- 借款单据 -->
      <div>
        <h3>借款单据</h3>
        <x-table :cell-bordered="false">
          <thead>
          <tr>
            <th>事由</th>
            <th>内容</th>
            <th>金额</th>
            <th>附表单据</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Apple</td>
            <td>$1.25</td>
            <td> x 1</td>
            <td> x 1</td>
          </tr>
          </tbody>
        </x-table>
      </div>
      <!-- 审批意见 -->
      <div>
        <h3>审批意见</h3>
        <x-table :cell-bordered="false">
          <thead>
          <tr>
            <th>角色</th>
            <th>审批人员</th>
            <th>审批意见</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Apple</td>
            <td>$1.25</td>
            <td> x 1</td>
          </tr>
          </tbody>
        </x-table>
      </div>
      <!--　我的意见　-->
      <div>
        <h3 style="border-bottom: none;">我的意见</h3>
        <group :gutter="0">
          <x-textarea v-model="message"></x-textarea>
        </group>
      </div>
    </div>
    <div class="footer">
      <div><x-button style="background-color: #6ea6ff;">流转</x-button></div>
      <div><x-button type="warn">拒绝</x-button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "companyLoanItem",
  data() {
    return {
      message: '',
    }
  },
  methods: {

  }
}
</script>

<style scoped>
@import '../../../assets/css/listItem.css';
@import '../../../assets/css/footer.css';
</style>
