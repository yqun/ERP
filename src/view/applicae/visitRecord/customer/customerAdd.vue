<template>
  <div style="box-sizing: border-box; border-top: 1px solid transparent;">
    <group title="添加客户">
      <x-input text-align="right" placeholder="请输入客户名称">
        <span slot="label"><i style="color: red;font-style: normal;">*</i> 客户名称</span>
      </x-input>
      <x-input text-align="right" placeholder="请输入下属单位" title="下属单位"></x-input>
      <cell title="客户级别">
        <slot> <rater v-model="level" active-color="#04BE02"></rater></slot>
      </cell>
      <x-address title="所在地　" v-model="address" :list="addressData" placeholder="请选择地址" ></x-address>
      <x-input text-align="right" placeholder="请输入详细地址" title="详细地址"></x-input>
      <x-input text-align="right" placeholder="请输入邮政编码" title="邮政编码"></x-input>
      <x-input text-align="right" placeholder="请输入电子邮箱" title="电子邮箱"></x-input>
      <x-input text-align="right" placeholder="请输入联系电话" title="联系电话"></x-input>
    </group>
    <div class="footer">
      <div><x-button type="primary">提交</x-button></div>
      <div><x-button type="warn">重置</x-button></div>
    </div>
  </div>
</template>

<script>
  import {ChinaAddressV4Data} from 'vux'
  export default {
    name: "customerAdd",
    data() {
      return {
        level: 1,
        addressData: ChinaAddressV4Data,
        address: [],
      }
    }
  }
</script>

<style scoped>
  @import '../../../../assets/css/footer.css';
  .footer {
    margin-top: 20px;
  }
  /deep/ .weui-cell {
    font-size:16px;
  }
</style>
