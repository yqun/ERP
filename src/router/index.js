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
  if (to.path == '/') {
    next()
  } else {
    const data = JSON.parse(window.sessionStorage.getItem('data'))
    if (data) {
      // window.sessionStorage.setItem('data', JSON.stringify(data))
    } else {
      Vue.$vux.toast.text('用户信息获取失败')
      return router.push('/')
    }
    next()
  }

})

function getUser(code, next) {
  this.axios
    .get(`wechatErp/center/initialAccreditation?code=${code}`)
    .then(res => {
      console.log('router', res);
      const {data} = res
      if (data != null) {
        window.sessionStorage.setItem('data', JSON.stringify(data))
        next()
      }
    })
}

export default router
