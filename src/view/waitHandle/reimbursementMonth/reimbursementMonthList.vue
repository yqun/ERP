<template>
  <div style="background-color: #f8f8f8; height: 100%;">
    <!-- 头部导航 -->
    <x-header style="background-color:#4b77b0;"
              :left-options="{backText: ''}"
              title="申请报销月计划">
    </x-header>
    <!-- main -->
    <div class="main">
        <div class="title" style="margin-top: 0px;">
          <h3>基本信息</h3>
        </div>
        <group :gutter="0">
          <x-input title="申请名称" placeholder="请输入申请名称"></x-input>
          <x-input title="月度　　"></x-input>
          <x-input title="总计　　"></x-input>
        </group>
      <!-- 费用列表 -->
      <div class="costList title">
        <h3>
          费用列表
          <span style="float: right;" @click="$router.push('/reimbursementMonthAdd')"><i class="add-pic"></i>添加</span>
        </h3>
        <!-- 费用信息 -->
        <swiper height="300px" class="text-scroll" :show-dots="false" :threshold="1">
          <swiper-item v-for="item in 3" :key="item">
            <ul>
              <li><strong>项目名称</strong><span>1234567</span></li>
              <li><strong>客户名称</strong><span>1234567</span></li>
              <li><strong>联系人　</strong><span>1234567</span></li>
              <li><strong>联系方式</strong><span>1234567</span></li>
              <li><strong>招待费　</strong><span>1234567</span></li>
              <li><strong>差旅费　</strong><span>1234567</span></li>
              <li><strong>礼品费　</strong><span>1234567</span></li>
              <li><strong>项目情况</strong><span>1234567</span></li>
              <li><strong>合计金额</strong><span>1234567</span></li>
              <!--<li style="padding: 10px 10%"><x-button type="warn">删除</x-button></li>-->
            </ul>
          </swiper-item>
        </swiper>
      </div>
      <!-- 按钮 -->
      <div class="footer">
        <flexbox>
          <flexbox-item>
            <div class="flex-demo" @click="confirmBtn()">
              <x-button type="primary" style="backgroundColor: #6ea6ff; color: #fff;">流转</x-button>
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
  </div>
</template>

<script>
export default {
  name: "reimbursementMonthList",
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
/*input框字体大小*/
.weui-cell {
  font-size: 14px;
}
/deep/ .weui-cells:before {
  border: none;
}
/* group */
/deep/ .weui-cells {
  padding-right: 15px;
}
/* 主体内容 */
.main {
  width: 100%;
  box-sizing: border-box;
}
.main > div.title {
  background-color: #fff;
  padding: 0 15px;
  width: 100%;
  box-sizing: border-box;
}
.main h3 {
  padding: 10px 0;
  background-color: #fff;
  color: #6ea6ff;
  font-size: 16px;
  border-bottom: 1px solid #dcdcdc;
}
.costList {
  margin-top: 10px;
}
.costList ul {
  width: 100%;
  font-size: 14px
}
.costList ul li {
  width: 100%;
  box-sizing: border-box;
  padding: 5px 0;
}
.costList ul li strong {
  display: inline-block;
  width: 31%;
}
.costList ul li span {
  display: inline-block;
  width: 69%;
  color: #999;
}
/* 添加 */
.add-pic {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #6ea6ff;
  color: #fff;
  margin-right: 4px;
  vertical-align: middle;
  position: relative;
  top: -2px;
}
.add-pic::after {
  content: '';
  display: block;
  width: 10px;
  height: 2px;
  background-color: #fff;
  color: #fff;
  position: absolute;
  top: 9px;
  left: 5px;
}
.add-pic::before {
  content: '';
  display: block;
  width: 2px;
  height: 10px;
  background-color: #fff;
  color: #fff;
  position: absolute;
  top: 5px;
  left: 9px;
}
/* 底部按钮 */
.footer {
  width: 100%;
  margin-top: 10px;
  padding: 10px 10%;
  box-sizing: border-box;
}
</style>
