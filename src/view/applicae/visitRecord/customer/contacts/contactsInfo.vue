<template>
  <div style="box-sizing: border-box; border-top: 1px solid transparent;">
    <group title="联系人信息">
      <cell title="姓名" :value="contactInfo.name"></cell>
      <cell title="主联系人" value="contactInfo">
        <slot><x-switch title="" :value-map="['N', 'Y']" v-model="contactInfo.important" disabled></x-switch></slot>
      </cell>
      <cell title="部门" :value="contactInfo.department"></cell>
      <cell title="子部门" :value="contactInfo.subDepartment"></cell>
      <cell title="职务" :value="contactInfo.duty"></cell>
      <cell title="电子邮箱" :value="contactInfo.email"></cell>
      <cell title="移动电话" :value="contactInfo.mobilePhone"></cell>
      <cell title="工作电话" :value="contactInfo.officePhone"></cell>
      <cell title="家庭电话" :value="contactInfo.homePhone"></cell>
      <cell title="通讯地址" :value="contactInfo.address"></cell>
    </group>
  </div>
</template>

<script>
export default {
  name: "contactsInfo",
  data() {
    return {
      contactInfo: {},
      stringValue: '1',
    }
  },
  created() {
    // console.log(this.$store.state.contactInfo)
    this.contactInfo = this.$store.state.contactInfo
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
