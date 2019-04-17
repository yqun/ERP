<template>
  <div>
    <!-- 头部导航 -->
    <x-header style="background-color:#4b77b0; z-index: 999;"
              :left-options="{backText: ''}"
              title="插入费用列表">
    </x-header>
    <!-- main -->
    <group :gutter="0">
      <x-input title="项目　　"></x-input>
      <x-input title="客户　　"></x-input>
      <x-input title="联系人　"></x-input>
      <x-input title="联系方式"></x-input>
      <x-input title="招待费　"></x-input>
      <x-input title="差旅费　"></x-input>
      <x-input title="礼品费　"></x-input>
      <x-input title="项目说明"></x-input>
      <x-input title="合计金额"></x-input>
    </group>
    <div class="footer">
      <flexbox>
        <flexbox-item>
          <div class="flex-demo" @click="confirmBtn()">
            <x-button type="primary" style="backgroundColor: #6ea6ff; color: #fff;">确认</x-button>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo" @click="cancelBtn()">
            <x-button type="warn" style="backgroundColor: #bababa; color: #fff;">取消</x-button>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
export default {
  name: "reimbursementMonthAdd",
  data() {
    return {

    }
  },
  created() {

  },
  methods: {
    // 点击确认按钮
    confirmBtn() {
      const data = {}
      console.log(data)
    },
    // 点击取消按钮
    cancelBtn() {
      console.log('取消')
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.weui-cell {
  font-size: 15px;
}
.footer {
  margin-top: 30px;
  padding: 0 15%;
}
</style>
