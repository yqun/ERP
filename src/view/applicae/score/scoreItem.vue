<template>
  <div class="main">
    <!-- 基本信息 -->
    <div>
      <h3>基本说明</h3>
      <ul class="info-content">
        <li><strong>说明</strong><span>KINGTOP销售风采大赛</span></li>
        <li><strong>时间</strong><span>2019-11-13</span></li>
      </ul>
    </div>

    <x-table :cell-bordered="false" style="background-color:#fff;">
      <thead>
      <tr>
        <th>人员</th>
        <th>分数</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in 3" :key="item">
        <td>App</td>
        <td>99</td>
        <td><a href="javascript:;" @click="$router.push('/applicae/writeScore')">评分</a></td>
      </tr>
      </tbody>
    </x-table>

  </div>
</template>

<script>
export default {
  name: "scoreItem"
}
</script>

<style scoped>
@import '../../../assets/css/listItem.css';
/* 历史意见 表格 */
table.vux-table {
  font-size: 14px;
  line-height: 40px;
}
.vux-table td {
  color: #999;
  max-width: 50px;
}
table tbody td a {
  text-decoration: underline;
  text-decoration-color: #6ea6ff;
  color: #6ea6ff;
}
</style>
