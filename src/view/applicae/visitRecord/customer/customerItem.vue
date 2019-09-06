<template>
  <div style="box-sizing:border-box; border-top: 1px solid transparent;">
    <group title="客户信息">
      <cell title="客户名称" value="value"></cell>
      <cell title="客户级别">
        <slot><rater v-model="raterNum" :max="5" active-color="#04BE02" disabled></rater></slot>
      </cell>
      <cell title="所在地　" value="value"></cell>
      <cell title="详细地址" value="value"></cell>
      <cell title="邮政编码" value="value"></cell>
      <cell title="电子邮箱" value="value"></cell>
      <cell title="联系电话" value="value"></cell>
    </group>
    <divider>联系人</divider>
    <group :gutter="0">
      <cell title="姓名" value="152 xxxx 5687" link="/contactsInfo"></cell>
    </group>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "customerItem",
  data() {
    return {
      raterNum: 3,
      customerInfo: {}, // 客户信息
    }
  },
  computed: {
    ...mapState(['customer'])
  },
  mounted() {
    // this.getCustomerInfo() // 获取客户信息
  },
  methods: {
    // 获取客户信息
    getCustomerInfo() {
      this.axios
        .get(``)
        .then(res => {
          console.log(res)
        })
    },

  }
}
</script>

<style scoped>
.weui-cell {
  font-size:16px;
}
</style>
