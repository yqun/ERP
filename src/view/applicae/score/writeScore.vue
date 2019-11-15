<template>
  <div class="main">
    <h3>基本说明</h3>
    <x-table style="background-color:#fff;">
      <thead>
        <tr>
          <th>评分项目</th><th>评分标准</th><th>得分</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in 3" :key="item">
        <td rowspan="3" v-if="index == 0" style="width: 80px;">仪表形象</td>
        <td style="height: 30px;">PPT简洁、文字处理得当</td>
        <td style="padding: 0 10px;width: 60px;">
          <selector :options="list" v-model="defaultValue[index]"></selector>
        </td>
      </tr>
      </tbody>
    </x-table>
  </div>
</template>

<script>
export default {
  name: "writeScore",
  data() {
    return {
      defaultValue: [],
      list:[1,2,3,4,5]
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  background-color: #fff;
}
h3 {
  font-size: 18px;
  color: #6ea6ff;
  border-bottom: 1px solid #dcdcdc;
  padding: 0.17rem 10px;
}

table.vux-table {
  font-size: 16px;
}
.vux-table td {
  color: #999;
  max-width: 100px;
  line-height: normal;
}
table thead tr {
  background-color: #6ea6ff;
  color:#fff;
  line-height: 30px;
}
table tbody td[rowspan="3"] {
  background-color: #aacbff;
  color:#333;
}
table tbody td a {
  text-decoration: underline;
  text-decoration-color: #6ea6ff;
  color: #6ea6ff;
}
/deep/ .weui-cell_select .weui-select {
  box-sizing: border-box;
  padding-right: 20px;
  padding-left: 10px;

  border: 1px solid #bababa;
  border-radius: 4px;
  height: 20px;
  line-height: 20px;
  vertical-align: baseline;
}
/deep/ .weui-cell_select .weui-cell__bd:after {
  right: 12px;
}
</style>
