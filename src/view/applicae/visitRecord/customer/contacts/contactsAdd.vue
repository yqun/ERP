<template>
  <div style="box-sizing: border-box; border-top: 1px solid transparent;">
    <group title="添加联系人">
      <x-input :show-clear="false" text-align="right" placeholder="请输入姓名">
        <span slot="label"><i style="color: red;font-style: normal;">*</i> 姓名</span>
      </x-input>
      <cell title="主联系人">
        <slot><x-switch title="" :value-map="['0', '1']" v-model="contacts"></x-switch></slot>
      </cell>
      <x-input :show-clear="false" text-align="right" placeholder="请输入部门" title="部门"></x-input>
      <x-input :show-clear="false" text-align="right" placeholder="请输入子部门" title="子部门"></x-input>
      <x-input :show-clear="false" text-align="right" placeholder="请输入职务" title="职务"></x-input>
      <x-input :show-clear="false" text-align="right" placeholder="请输入电子邮箱" title="电子邮箱"></x-input>
      <x-input :show-clear="false" text-align="right" placeholder="请输入移动电话" title="移动电话"></x-input>
      <x-input :show-clear="false" text-align="right" placeholder="请输入工作电话" title="工作电话"></x-input>
      <x-input :show-clear="false" text-align="right" placeholder="请输入家庭电话" title="家庭电话"></x-input>
      <x-input :show-clear="false" text-align="right" placeholder="请输入通讯地址" title="通讯地址"></x-input>
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
  name: "contactsAdd",
  data() {
    return {
      level: 1,
      addressData: ChinaAddressV4Data,
      address: [],
      contacts: '0',
    }
  }
}
</script>

<style scoped>
@import '../../../../../assets/css/footer.css';
.footer {
  margin-top: 20px;
}
.vux-x-switch.weui-cell.weui-cell_switch {
  padding: 0;
}
/deep/ .weui-cell {
  font-size:16px;
}
</style>
