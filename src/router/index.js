import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home'

// 我发起的 路由配置
import sponsoredRouter from './sponsoredRouter'
// 待处理 路由配置
import waitHandleRouter from './waitHandleRouter'
// 已处理的
import ProcessedRouter from "./processedRouter";
// 常用应用
import ApplicaeRouter from "./applicaeRouter";


Vue.use(Router)


const router = new Router({
  routes: [
    {path: '/', name: 'home', component: Home},
    ...sponsoredRouter,
    ...waitHandleRouter,
    ...ProcessedRouter,
    ...ApplicaeRouter,
  ]
});



router.beforeEach((to, from, next) => {
  // console.log(document.title)
  if (to.path == '/') {
    next()
  } else {
    const data = JSON.parse(sessionStorage.getItem('data'))
    if (!data) {
      Vue.$vux.toast.text('用户信息获取失败')
      return router.push('/')
    }
    next()
  }

})


export default router
