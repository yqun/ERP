import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

const store = new vuex.Store({

  state: {
    monthCostList: [], // 报销月计划
    purchase: [], // 采购追加的信息
    // CRM
    tabIndex: 0, // 拜访记录的tab栏
    customer: {}, // 客户列表到客户信息的传参
    contactInfo: {}, // 查看联系人详细信息
    visitInfo: {}, // 拜访记录到详细信息
  },
  mutations: {
    // 报销月计划
    changeMonthCostList(state, {data, index}) {
      if (index >= 0) {
        return state.monthCostList.splice(index, 1)
      } else if (index < 0) {
        return state.monthCostList = [];
      }
      if (data instanceof Object) return state.monthCostList.push(data);
      if (data instanceof Array) return state.monthCostList = data;
    },
    // 采购追加的信息
    addPurchase(state, {data, status=true}) {
      if (status) return state.purchase.push(data);
      state.purchase = [];
    },
    // CRM 拜访记录的tab栏
    getTabIndex(state, index) { // 拜访记录的tab栏
      state.tabIndex = index
    },
    changeCustomer(state, data) { // 拜访记录 客户列表到客户信息参数
      state.customer = data
    },
    changeContactInfo(state, data) { // 查看联系人详细信息
      state.contactInfo = data
    },
    changeVisitInfo(state, data) { // 拜访记录到详细信息
      state.visitInfo = data
    }
  }
})



export default store
