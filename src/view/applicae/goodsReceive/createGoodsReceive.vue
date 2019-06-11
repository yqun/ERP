<template>
  <div>
    <div class="main">
      <!-- 物品基本信息 添加-->
      <div>
        <h3>物品基本信息</h3>
        <group :gutter="0">
         <selector title="费用所属" :options="list"></selector>
         <selector title="项目　　" :options="list"></selector>
         <selector title="物品种类" :options="list"></selector>
         <selector title="物品名称" :options="list"></selector>
          <x-input title="规格型号" placeholder="规格型号" disabled type="text"></x-input>
          <x-input title="单位　　" placeholder="单位　　" disabled type="text"></x-input>
          <x-input title="数量　　" placeholder="数量　　" type="number">
            <span slot="right" style="font-size: 14px;">库存：{{num}}</span>
          </x-input>
          <x-input title="单价　　" placeholder="单价　　" disabled type="number"></x-input>
        </group>
        <button class="addBtn" @click="addApplyList()">+ 插入申请列表</button>
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
            <td></td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in applyList" :key="index">
            <td>AA纸A4纸4纸A纸44</td>
            <td>2</td>
            <td>27</td>
            <td>54</td>
            <td @click="applyList.splice(index, 1)"><x-icon type="ios-close" size="18" style="fill: #dc4141;"></x-icon></td>
          </tr>
          </tbody>
          <tr v-if="!applyList.length"><td colspan="5">数据为空</td></tr>
          <tfoot>
          <tr>
            <td colspan="2">申请金额合计(元)</td>
            <td colspan="2">{{moneySum}}</td>
            <td></td>
          </tr>
          </tfoot>
        </table>
      </div>
      <!-- 申请理由 -->
      <div>
        <h3 style="border: none;">申请理由</h3>
        <group :gutter="0">
          <x-textarea v-model="message"></x-textarea>
        </group>
      </div>
    </div>
    <div class="footer clearfix">
      <div><x-button style="background-color: #6ea6ff;">保存设置</x-button></div>
      <div><x-button style="background-color: #bababa;" @click.native="$router.go(-1)">返回</x-button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "createGoodsReceive",
  data() {
    return {
      message: '111',
      num: 0,
      list: [],
      applyList: [],
    }
  },
  computed: {
    moneySum() {
      let sum = 0;
      this.applyList.forEach((item, index) => {
        sum+=item.id
      })
      return sum;
    }
  },
  created() {

  },
  methods: {
    // 添加申请列表
    addApplyList() {
      this.applyList.push({
        id: ++this.num
      })
    },
  }
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
  width: 20%;
  text-align: center;
  font-size: 14px;
  padding: 4px 1px;
}
tr > td:first-child {
  width: 30%;
}
tr > td:last-child {
  width: 10%;
}
table tbody td {
  font-size: 12px;
}
table tfoot td:first-child {
  font-weight: 700;
}
/* 添加按钮 */
.addBtn {
  padding: 2px 10px;
  background-color: #6ea6ff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  margin-bottom: 20px;
}

/deep/ .weui-cell__hd {
  font-size: 14px;
  font-weight: 700;
}
/deep/ .weui-cell__bd {
  font-size: 14px;
}
.vux-selector.weui-cell_select-after {
  padding-left: unset;
}
/deep/ .weui-select {
  height: 40px;
}
.weui-cell {
  padding: unset;
}
/deep/ .weui-input {
  height: 40px;
}
.weui-cell:before {
  border-top:0px solid transparent;
}
</style>
