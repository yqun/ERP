<template>
  <div class="content">
    <router-view></router-view>
    <tabbar v-model="index" @on-index-change="changeIndex">
      <tabbar-item link="/customerList">
        <img slot="icon" src="../../../assets/images/application/icon_nav_button.png">
        <span slot="label">客户</span>
      </tabbar-item>
      <tabbar-item link="/visitList">
        <img slot="icon" src="../../../assets/images/application/icon_nav_msg.png">
        <span slot="label">拜访</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
export default {
  name: "visitRecordView",
  data() {
    return {
      index: 0,
    }
  },
  created() {
    this.index = this.$store.state.tabIndex
  },
  methods: {
    changeIndex(val) {
      this.$store.commit('getTabIndex', val)
    }
  }
}
</script>

<style scoped>
.content {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 54px;
}
</style>
