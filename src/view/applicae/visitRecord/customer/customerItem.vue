<template>
  <div style="box-sizing:border-box; border-top: 1px solid transparent;">
    <group title="客户信息">
      <cell title="客户名称" :value="customerInfo.companyName"></cell>
      <cell title="客户级别">
        <slot><rater v-model="customerInfo.levelNum" :max="5" active-color="#04BE02" disabled></rater></slot>
      </cell>
      <cell title="所在地　"
            :value="(customerInfo.provinceName+customerInfo.cityName+customerInfo.areaName) || ''">
      </cell>
      <cell title="详细地址" :value="customerInfo.address"></cell>
      <cell title="邮政编码" :value="customerInfo.postalCode"></cell>
      <cell title="电子邮箱" :value="customerInfo.email"></cell>
      <cell title="联系电话" :value="customerInfo.phone"></cell>
    </group>
    <divider>联系人</divider>
    <group :gutter="0">
      <cell  v-for="item in contacts" :key="item.id"
             :title="item.name" :value="item.mobilePhone"
             is-link @click.native="seeContact(item)">
      </cell>
    </group>
  </div>
</template>

<script>
export default {
  name: "customerItem",
  data() {
    return {
      customerInfo: {}, // 客户信息
      contacts: [], //联系人
    }
  },
  created() {
    this.customer = this.$store.state.customer
  },
  mounted() {
    this.getCustomerInfo() // 获取客户信息
    this.getContacts() // 获取联系人
  },
  methods: {
    // 获取客户信息
    getCustomerInfo() {
      // console.log(this.customer)
      this.axios
        .get(`wechatErp/crm/toEditPage/${this.customer.id}`)
        .then(res => {
          // console.log(res)
          this.customerInfo = res.data
          this.customerInfo.levelNum = this.customerInfo.level*1
        })
    },
    getContacts() {
      const data =　{
        clientId:this.customer.id,
        iDisplayStart: 0,
        iDisplayLength: 20,
      }
      this.axios.post(`wechatErp/crm/pageForContact`, data)
        .then(res => {
          // console.log(res)
          this.contacts = res.data.data
        })
    },
    seeContact(contact) {
      this.$store.commit('changeContactInfo',contact)
      this.$router.push('/contactsInfo')
    }

  }
}
</script>

<style scoped>
.weui-cell {
  font-size:16px;
}
</style>
