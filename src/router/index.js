import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home'
// 待处理
import WaitHandle from '@/view/waitHandle/waithandle'
import WaitHandleList from '@/view/waitHandle/waitHandleList'
import WaitHandleItem from '@/view/waitHandle/waitHandleItem'




Vue.use(Router)


const router = new Router({
  routes: [
    {path: '/', name: 'home', component: Home},
    {path: '/waithandle', name: 'waitHandle', component: WaitHandle},
    {path: '/waithandlelist', name: 'waitHandleList', component: WaitHandleList},
    {path: '/waithandleItem', name: 'waitHandleItem', component: WaitHandleItem},
  ]
});



router.beforeEach((to, from, next) => {
  next()

})


export default router
