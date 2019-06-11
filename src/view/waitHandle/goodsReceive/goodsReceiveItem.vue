<template>
  <div>
    <div class="main">
      <!-- 物品基本信息 -->
      <div>
        <h3>物品基本信息</h3>
        <ul class="info-content">
          <li><strong>费用所属</strong><span>项目</span></li>
          <li><strong>申请人</strong><span>李国华</span></li>
          <li><strong>总金额</strong><span>1400</span></li>
        </ul>
      </div>
      <!-- 申请列表 -->
      <div>
        <h3>申请列表</h3>
        <table>
          <thead>
          <tr>
            <td>名称</td>
            <td>数量</td>
            <td>单价(元)</td>
            <td>总价(元)</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>a4纸上的信息 但看那看会不会换行</td>
            <td>2</td>
            <td>24</td>
            <td>48</td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- 申请理由 -->
      <div>
        <h3 style="border: none;">申请理由</h3>
        <group :gutter="0">
          <x-textarea v-model="message" readonly></x-textarea>
        </group>
      </div>
      <!-- 审批意见 -->
      <div>
        <h3>审批意见</h3>
        <table>
          <thead>
          <tr>
            <td>角色</td>
            <td>审批人员</td>
            <td>审批意见</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>员工</td>
            <td>张三</td>
            <td>可以过了</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="footer">
      <div><x-button style="background-color: #6ea6ff;">保存</x-button></div>
      <div><x-button style="background-color: #bababa;" @click.native="$router.go(-1)">返回</x-button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodsReceiveItem",
  data() {
    return {
      message: '111',
    }
  },
}
</script>

<style scoped>
@import '../../../assets/css/listItem.css';
@import '../../../assets/css/footer.css';
/* 申请列表 */
table, table thead, table tbody, tr{
  width: 100%;
}
table thead tr {
  font-weight: 700;
}
td{
  width: 25%;
  text-align: center;
  font-size: 14px;
  padding: 4px 6px;
}
table tbody td {
  font-size: 12px;
}
</style>
