<template>
  <div>
    <group :gutter="0" title="客户信息">
      <x-input title="客户名称　" placeholder="请填写客户名称" v-model="customer.companyName">
        <p slot="label">客户名称<span class="red">*　　</span></p>
      </x-input>
      <selector title="行业类型　" :options="industryType" :value-map="['code', 'name']"
                v-model="customer.industry"></selector>
      <selector title="客户星级　" :options="level" v-model="customer.level"></selector>
      <selector title="省　　　　" :options="province" :value-map="['id', 'text']" @on-change="getCityByProvinceId"
                placeholder="请选择省　　　" v-model="customer.provinceId"></selector>
      <selector title="市　　　　" :options="city" :value-map="['id', 'text']" @on-change="getAreaByCityId"
               placeholder="请选择市　　　" v-model="customer.cityId"></selector>
      <selector title="区　　　　" :options="area" :value-map="['id', 'text']"
                placeholder="请选择区　　　" v-model="customer.areaId"></selector>
      <x-input title="邮编　　　" placeholder="请填写邮编　　" v-model="customer.postalCode"></x-input>
      <x-input title="固话　　　" placeholder="请填写固话　　" v-model="customer.phone"></x-input>
      <selector title="客户类型　" :options="customerType" v-model="customer.type"></selector>
      <x-input title="电子邮件　" placeholder="请填写电子邮件" v-model="customer.email" is-type="email"></x-input>
      <x-input title="传真　　　" placeholder="请填写传真　　" v-model="customer.fax"></x-input>
      <x-input title="主页　　　" placeholder="请填写主页　　" v-model="customer.homePage"></x-input>
      <x-input title="通讯地址　" placeholder="请填写通讯地址" v-model="customer.address"></x-input>
      <x-input title="承诺金额　" placeholder="请填写承诺金额" v-model="customer.committedAmount"></x-input>
      <x-textarea title="简介　　　" placeholder="请填写简介　　" v-model="customer.companyIntro"></x-textarea>
    </group>
    <group title="主要联系人">
      <x-input title="联系人姓名　" v-model="contacts.name" placeholder="请填写联系人姓名">
        <p slot="label">联系人姓名<span class="red">* 　</span></p>
      </x-input>
      <x-input title="部门　　　　" v-model="contacts.department" placeholder="请填写部门">
        <p slot="label">部门<span class="red">* 　　　　</span></p>
      </x-input>
      <x-input title="子部门　　　" v-model="contacts.subDepartment" placeholder="请填写子部门"></x-input>
      <x-input title="联系人职务　" v-model="contacts.duty" placeholder="请填写联系人职务">
        <p slot="label">联系人职务<span class="red">* 　</span></p>
      </x-input>
      <x-input title="移动电话　　" v-model="contacts.mobilePhone" placeholder="请填写移动电话" is-type="china-mobile">
        <p slot="label">移动电话<span class="red">* 　　</span></p>
      </x-input>
      <x-input title="通讯地址　　" v-model="contacts.contactsAddress" placeholder="请填写通讯地址">
        <p slot="label">通讯地址<span class="red">* 　　</span></p>
      </x-input>
      <datetime v-model="contacts.birthday" placeholder="请填写出生日期" :min-year="1950">
        <p slot="title" class="dataTime">出生日期　　　</p>
      </datetime>
      <x-input title="办公电话　　" v-model="contacts.officePhone" placeholder="请填写办公电话"></x-input>
      <x-input title="家庭电话　　" v-model="contacts.homePhone" placeholder="请填写家庭电话" type="tel"></x-input>
      <x-input title="email　　　" v-model="contacts.contactsEmail" placeholder="请填写邮箱" is-type="email"></x-input>
      <x-input title="传真　　　　" v-model="contacts.contactsFax" placeholder="请填写传真"></x-input>
      <x-input title="备注　　　　" v-model="contacts.remark" placeholder="请填写备注"></x-input>
    </group>
    <div style="padding:20px 10px 40px;">
      <x-button :gradients="['#6ea6ff','#6ea6ff']" @click.native="inspectCustomerExistence()">流转</x-button>
    </div>
  </div>
</template>

<script>
import { dateFormat } from 'vux'
export default {
  name: "addCustomer",
  data() {
    return {
      rawClientName: '',
      customer:{ // 客户信息
        // companyName: '11111',
        industry: "INDUSTRY-EDUCATION", // 行业类型
        level: 1,
        type: 1,
        companyIntro: '',
        committedAmount: 0,
      },
      contacts: {}, // 联系人
      industryType: [], // 行业类型
      level: [{value:'1',key:'1'},{value:'2',key:'2'},{value:'3',key:'3'},{value:'4',key:'4'},{value:'5',key:'5'}],
      province: [], // 省
      city: [], // 市
      area: [], // 区
      customerType: [{value:'普通客户',key:'1'},{value:'重点客户',key:'2'},{value:'合作伙伴',key:'3'}], // 客户类型
    }
  },
  mounted() {
    this.getIndustryType(); // 获取行业类型
    this.getProvince(); // 获取省份
    this.businessKey = this.$route.query.businessKey
    if (this.businessKey) {
      this.getCustomerInfo();
      this.getContactsInfo();
    }
  },
  methods: {
    getCustomerInfo() {
      this.axios.get(`wechatErp/client/getModelById/${this.businessKey}`)
        .then(res => {
          console.log(res)
          const data = res.data
          this.rawClientName = data.companyName
          this.customer.companyName = data.companyName
          this.customer.industry = data.industry
          this.customer.level = data.level
          this.customer.provinceId = data.provinceId
          this.customer.cityId = data.cityId
          this.customer.areaId = data.areaId
          this.customer.postalCode = data.postalCode
          this.customer.phone = data.phone
          this.customer.type = data.type
          this.customer.email = data.email
          this.customer.fax = data.fax
          this.customer.homePage = data.homePage
          this.customer.address = data.address
          this.customer.committedAmount = data.committedAmount*1 || 0
          this.customer.companyIntro = data.companyIntro
          this.customer.clientId = data.id
          for(var key in this.customer) {
            if (this.customer[key] == null) {
              this.customer[key] = ''
            }
          }
        })
    },
    getContactsInfo() {
      this.axios.get(`wechatErp/client/getModelByClientId/${this.businessKey}`)
        .then(res => {
          console.log(res)
          const {data} = res
          this.contacts.name = data.name
          this.contacts.department = data.department
          this.contacts.subDepartment = data.subDepartment
          this.contacts.duty = data.duty
          this.contacts.mobilePhone = data.mobilePhone
          this.contacts.contactsAddress = data.address
          this.contacts.birthday = dateFormat(data.birthday, 'YYYY-MM-DD')
          this.contacts.officePhone = data.officePhone
          this.contacts.homePhone = data.homePhone
          this.contacts.contactsEmail = data.email
          this.contacts.contactsFax = data.fax
          this.contacts.remark = data.remark
          this.contacts.contactsId = data.id
          for(var key in this.contacts) {
            if (this.contacts[key] == null) {
              this.contacts[key] = ''
            }
          }
        })
    },
    getIndustryType() {
      this.axios.post(`wechatErp/center/getSubEnumModalsByCode/industry`)
        .then(res => {
          // console.log(res)
          this.industryType = res.data || [];
        })
    },
    getProvince() {
      this.axios.post(`wechatErp/center/pageForMyProvinceSelect2`)
        .then(res => {
          // console.log('省', res)
          this.province = res.data.list
        })
    },
    getCityByProvinceId(value) {
      this.axios.post(`wechatErp/center/pageForMyCitySelect2/${value}`)
        .then(res => {
          // console.log('市', res)
          this.city = res.data.list
        })
    },
    getAreaByCityId(value) {
      this.axios.post(`wechatErp/center/pageForMyAreaSelect2/${value}`)
        .then(res => {
          // console.log('区', res)
          this.area = res.data.list
        })
    },
    inspectCustomerExistence() {
      if (!this.customer.companyName) return this.$vux.toast.text('请填写客户名称');

      const mobile = /^1[3,4,5,7,8][0-9]{9}$/; //手机号码
      const email= /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; //邮箱
      const phone = /^(0\d{2,3})?\d{7,8}$/; //固话
      // 验证
      if (this.customer.email && !email.test(this.customer.email)) return this.$vux.toast.text('请填写正确的电子邮件格式');
      if (this.customer.phone && !phone.test(this.customer.phone)) return this.$vux.toast.text('请填写正确的固话格式');
      if (!this.contacts.mobilePhone) return this.$vux.toast.text('请填写移动电话');
      if (!mobile.test(this.contacts.mobilePhone)) return this.$vux.toast.text('请填写正确的移动电话格式');
      if (this.contacts.contactsEmail && !email.test(this.contacts.contactsEmail)) return this.$vux.toast.text('请填写正确的email格式');
      //
      //
      if (isNaN(this.customer.committedAmount)) return this.$vux.toast.text('请填写正确的承诺金额格式');
      if (!this.contacts.name) return this.$vux.toast.text('请填写联系人姓名');
      if (!this.contacts.department) return this.$vux.toast.text('请填写部门');
      if (!this.contacts.duty) return this.$vux.toast.text('请填写联系人职务');
      if (!this.contacts.contactsAddress) return this.$vux.toast.text('请填写通讯地址');

      if (this.rawClientName == this.customer.companyName) return this.addCustomer();
      const data = {companyName: this.customer.companyName, subCompany: ""}
      this.axios.post(`wechatErp/client/checkClientExists`, data)
        .then(res => {
          console.log(res)
          if (res.data == 2) return this.$vux.toast.text('客户已存在 ')
          if (res.data == 3) return this.$vux.toast.text('客户已创建，正在审批中... ')
          this.addCustomer()
        })
    },
    addCustomer() {
      const data = {
        ...this.customer,
        ...this.contacts,
        important: 'Y',
      };
      console.log(data)
      let url = 'wechatErp/client/add'
      if (this.$route.query.activityID == 'sub_4') {
        data.rawClientName = this.rawClientName // 原始的客户名称
        data.taskId = this.$route.query.taskId
        url = 'wechatErp/client/flowApplyUpdate'
      }
      this.axios.post(url, data)
        .then(res => {
          // console.log(res)
          const {resultState, resultInfo} = res.data
          this.$vux.toast.text(resultInfo)
          if (resultState == -1) return false;
          setTimeout(() => {this.$router.go(-1)}, 800)
        })
    },
  }
}
</script>

<style scoped>
.red{
  color: red;
}
/deep/ input::-webkit-input-placeholder {
  color: #ccc;
}
/deep/ input {
  color: #333;
}
/deep/ .weui-cell__hd,
.dataTime{
  font-size: 16px;
  color: #666;
}
/deep/ .weui-cell__bd {
  font-size: 16px;
}
/deep/ .weui-input,
.vux-datetime.weui-cell.weui-cell_access{
  height: 36px;
}
.vux-selector.weui-cell_select {
  padding: 10px 15px;
}
.vux-datetime.weui-cell.weui-cell_access >>> .weui-cell__ft {
  text-align: left;
}
</style>
