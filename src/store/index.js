import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

const store = new vuex.Store({

  state: {
    monthCostList: [], // 报销月计划
    purchase: [], // 采购追加的信息
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
    }
  }
})



export default store
