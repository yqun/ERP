import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home'

// 我发起的 路由配置
import sponsoredRouter from '@/router/sponsoredRouter'
// 待处理 路由配置
import waitHandleRouter from '@/router/waitHandleRouter'
// 业务报销
import serviceExpense from '@/router/serviceExpenseRouter'
// 已处理的
import ProcessedRouter from "./processedRouter";


Vue.use(Router)


const router = new Router({
  routes: [
    {path: '/', name: 'home', component: Home},
    ...sponsoredRouter,  // 我发起的
    ...waitHandleRouter, // 待处理
    ...ProcessedRouter,  // 已处理
    ...serviceExpense,   // 业务报销
  ]
});



router.beforeEach((to, from, next) => {
  // console.log(document.title)
  if (to.path == '/') {
    next()
  } else {
    // const data = JSON.parse(sessionStorage.getItem('data'))
    next()
  }

})


export default router
