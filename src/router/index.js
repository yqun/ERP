import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home'

// 待处理 路由配置
import waitHandleRouter from '@/router/waitHandleRouter'
// 业务报销
import serviceExpense from '@/router/serviceExpenseRouter'


Vue.use(Router)


const router = new Router({
  routes: [
    {path: '/', name: 'home', component: Home},
    ...waitHandleRouter,
    ...serviceExpense,
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
