<template>
  <div>
    <div class="main">
      <!-- 基本说明 -->
      <div>
        <h3>基本说明</h3>
        <group :gutter="0">
         <selector title="申请类型" placeholder="请输入申请类型" v-model="type" :options="typeList"></selector>
          <x-input title="借款事由" placeholder="请输入借款事由" v-model="shortInfo" ></x-input>
          <x-input title="总金额　" placeholder="请输入总金额　" v-model="totalPrice" disabled></x-input>
         <selector title="所属公司" placeholder="请输入所属公司" v-model="companyCode" :options="companyCodeList"></selector>
         <selector title="转账类型" placeholder="请输入转账类型" v-model="zzKind" :options="zzKindList"></selector>
          <x-input v-show="zzKind === 2" title="开户行" placeholder="请输入开户行　" v-model="bankName"></x-input>
          <x-input v-show="zzKind === 2" title="银行账号" placeholder="请输入银行账号" v-model="bankNum"></x-input>
          <x-input v-show="zzKind === 2" title="银行账户" placeholder="请输入银行账户" v-model="bankAccount"></x-input>
          <x-input v-show="zzKind === 1" title="领款人" placeholder="请输入领款人　" v-model="payee" ></x-input>
          <div class="vux-x-input weui-cell">
            <div class="weui-cell__hd">签订合同</div>
            <checker v-model="newClient" :radio-required="true">
              <checker-item value="Y">
                <x-icon type="ios-checkmark" size="20" v-show="newClient=='Y'" style="verticalAlign:bottom;fill:#6ea6ff;"></x-icon>
                <x-icon type="ios-checkmark" size="20" v-show="newClient=='N'" style="verticalAlign:bottom;fill:#d7d7d7;"></x-icon>
                是
              </checker-item>
              <checker-item value="N">
                <x-icon type="ios-checkmark" size="20" v-show="newClient=='N'" style="verticalAlign:bottom;fill:#6ea6ff;"></x-icon>
                <x-icon type="ios-checkmark" size="20" v-show="newClient=='Y'" style="verticalAlign:bottom;fill:#d7d7d7;"></x-icon>
                否
              </checker-item>
            </checker>
          </div>
          <x-input title="电子发票号" placeholder="请输入电子发票号" v-model="ticketNum" ></x-input>
        </group>
      </div>
      <!-- 借款单据 -->
      <div style="padding-bottom: 10px;">
        <h3>借款单据</h3>
        <group :gutter="0">
         <selector title="借款科目" placeholder="请输入借款事由" v-model="bxReason" :options="bxReasonList"></selector>
          <x-input title="借款内容" placeholder="请输入借款内容" v-model="content"></x-input>
          <x-input title="借款金额" placeholder="请输入借款金额" v-model="singleTotalMoney"></x-input>
          <x-input title="附单数据" placeholder="请输入附单数据" v-model="invoiceNum"></x-input>
        </group>
        <x-button mini :gradients="['#6ea6ff', '#6ea6ff']" @click.native="addBill()">添加明细</x-button>
        <!--<x-button mini type="warn" @click.native="billList.splice(billList.length-1, 1)">删除明细</x-button>-->
        <x-table :cell-bordered="false">
          <thead>
          <tr>
            <th>借款科目</th>
            <th>摘要</th>
            <th>金额</th>
            <th>附单数据</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in billList" :key="index">
            <td>{{item.bxReason}}</td>
            <td>{{item.content}}</td>
            <td>{{item.singleTotalMoney}}</td>
            <td>{{item.invoiceNum}}</td>
            <td @click="billList.splice(index, 1)">
              <x-icon type="ios-close" size="18" style="fill: #dc4141;"></x-icon>
            </td>
          </tr>
          <tr>
            <td style="color: black;">总金额</td>
            <td colspan="4">{{billMoneySum}}</td>
          </tr>
          </tbody>
        </x-table>
      </div>
    </div>
    <div class="footer clearfix">
      <div><x-button style="background-color: #6ea6ff;">流转</x-button></div>
      <div><x-button style="background-color: #bababa;" @click.native="$router.go(-1)">返回</x-button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "companyLoan",
  data() {
    return {
      type: '公司借款',
      typeList: [{key: '公司借款', value: '公司借款'}],
      shortInfo: '',
      totalPrice: 100,
      companyCode: '北京金山顶尖科技股份有限公司',
      companyCodeList: [{key: '北京金山顶尖科技股份有限公司', value: '北京金山顶尖科技股份有限公司'}],
      zzKind: 1,
      zzKindList: [{key: 1, value: '个人转账'}, {key: 2, value: '对公转账'}],
      bankName: '',
      bankNum: '',
      bankAccount: '',
      payee: '',
      newClient: 'N',
      ticketNum: '',
      bxReason: '公司借款',
      bxReasonList: [{key: '公司借款', value: '公司借款'}],
      content: '',
      singleTotalMoney: '',
      invoiceNum: '',
      billList: [],
    }
  },
  computed: {
    billMoneySum() {
      let sum = 0;
      this.billList.forEach((item) => {
        sum += item.singleTotalMoney*1
      })
      return sum;
    }
  },
  methods: {
    addBill() {
      if (!this.bxReason) return this.$vux.toast.text('请选择借款科目')
      if (!this.content) return this.$vux.toast.text('请输入借款内容')
      if (!this.singleTotalMoney) return this.$vux.toast.text('请输入借款金额')
      if (!this.invoiceNum) return this.$vux.toast.text('请输入附单数据')
      const data = {
        bxReason: this.bxReason,
        content: this.content,
        singleTotalMoney: this.singleTotalMoney,
        invoiceNum: this.invoiceNum
      }
      this.billList.push(data)
      this.bxReason = '公司借款'
      this.content = ''
      this.singleTotalMoney = ''
      this.invoiceNum = ''
    }
  }
}
</script>

<style scoped>
@import '../../../assets/css/listItem.css';
@import '../../../assets/css/footer.css';
.vux-selector.weui-cell_select-after {
  padding-left: unset;
}
.weui-cell {
  padding: 10px 0;
  font-size: 14px;
}
.weui-cell:before {
  border: none;
}
.weui-cell /deep/ .weui-cell__hd {
  width: 105px;
  font-weight: 700;
}
/deep/ .weui-cell:before {
  left: 0;
}

.weui-btn + .weui-btn {
  margin-top: 0px;
  margin-bottom: 10px;
}
</style>
