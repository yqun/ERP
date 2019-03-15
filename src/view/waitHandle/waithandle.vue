<template>
  <div class="waitHandle">
    <!-- 头部导航 -->
    <x-header style="background-color:#4b77b0;"
              :left-options="{backText: ''}"
              title="待处理">
    </x-header>
    <!-- 主体内容  main -->
    <div class="main">
      <!-- 按钮 -->
      <ul class="clearfix">
        <li class="waitHandleItem" @click="$router.push({path: '/waitHandleList'})">
          <h3>11</h3>
          <p>合同审批</p>
        </li>
        <li class="waitHandleItem">
          <h3>3</h3>
          <p>采购变更</p>
        </li>
        <li class="waitHandleItem">
          <h3>17</h3>
          <p>核算</p>
        </li>
        <li class="waitHandleItem">
          <h3>9</h3>
          <p>标书购买</p>
        </li>
        <li class="waitHandleItem">
          <h3>15</h3>
          <p>标书购买</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "waitHandle",
  data() {
    return {

    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style scoped>
/* 页面背景 */
.waitHandle {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
}
/* 主体内容 */
.main {
  padding: 10px 12px;
  box-sizing: border-box;
  overflow: hidden;
}
.main > ul {
  width: 110%;
}
.waitHandleItem {
  width: 1.8rem;
  height: 1.8rem;
  background-color: #fff;
  text-align: center;
  float: left;
  border-radius: 10px;
  box-shadow:4px 4px 14px rgba(202, 228, 251, 0.5);
  margin-right: 0.3rem;
  margin-top: 0.26rem;
  padding-top: 0.3rem;
  box-sizing: border-box;
}
.waitHandleItem h3 {
  font-size: 0.55rem;
  color: #6ea6ff;
}
.waitHandleItem p {
  font-size: 0.273rem;
}
</style>
