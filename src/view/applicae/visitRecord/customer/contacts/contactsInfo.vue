<template>
  <div style="box-sizing: border-box; border-top: 1px solid transparent;">
    <group title="联系人信息">
      <cell title="姓名" value="value"></cell>
      <cell title="主联系人" value="value">
        <slot><x-switch title="" :value-map="['0', '1']" v-model="stringValue" disabled></x-switch></slot>
      </cell>
      <cell title="部门" value="value"></cell>
      <cell title="子部门" value="value"></cell>
      <cell title="职务" value="value"></cell>
      <cell title="电子邮箱" value="value"></cell>
      <cell title="移动电话" value="value"></cell>
      <cell title="工作电话" value="value"></cell>
      <cell title="家庭住址" value="value"></cell>
      <cell title="通讯地址" value="value"></cell>
    </group>
  </div>
</template>

<script>
export default {
  name: "contactsInfo",
  data() {
    return {
      stringValue: '1',
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped>
.vux-x-switch.weui-cell.weui-cell_switch {
  padding: 0;
}
.weui-cell {
  font-size:16px;
}
</style>
