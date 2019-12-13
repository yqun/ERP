import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

const state = {
  // 获取data中的信息
  data: {
    loginName: window.sessionStorage.getItem('data')?JSON.parse(window.sessionStorage.getItem('data')).loginName:'',
    password: window.sessionStorage.getItem('data')?JSON.parse(window.sessionStorage.getItem('data')).password:'',
    currentUserId: window.sessionStorage.getItem('data')?JSON.parse(window.sessionStorage.getItem('data')).id:'',
  },
  listBtnText: '正在流转', // 列表的 正在流转，我发起的，已处理
  listLinkText: '已完结',

  // 报销月计划
  monthCostList: [], // 报销月计划
  purchase: [], // 采购追加的信息

  // CRM
  tabIndex: 0, // 拜访记录的tab栏
  customer: {}, // 客户列表到客户信息的传参
  contactInfo: {}, // 查看联系人详细信息
  visitInfo: {}, // 拜访记录到详细信息
};

const getters = {
  sessionData() {
    const data = JSON.parse(window.sessionStorage.getItem('data'));
    return {loginName: data?data.loginName:'', password: data?data.password:'', currentUserId: data?data.id:'',}
  },
};

const mutations = {
  getSessionData: (state, data) => state.data = data,
  changeListBtnText: (state, data) => state.listBtnText = data,
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
};

const actions =  {
  getSessionData(content) {
    console.log(content)
  }
};

export default new vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
})
