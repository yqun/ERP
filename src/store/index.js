import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

const store = new vuex.Store({

  state: {
    loginName: JSON.parse(window.sessionStorage.getItem('data'))? JSON.parse(window.sessionStorage.getItem('data')).loginName : '',
    password: JSON.parse(window.sessionStorage.getItem('data'))? JSON.parse(window.sessionStorage.getItem('data')).password : '',
    id: JSON.parse(window.sessionStorage.getItem('data'))? JSON.parse(window.sessionStorage.getItem('data')).id : '',
    monthCostList: [], // 报销月计划
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
    }
  }
})



export default store
