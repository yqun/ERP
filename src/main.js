// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'
import Axios from './request/config'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import store from '@/store/index'

// 全局
import '@/components/components.js'
import '@/assets/js/flexible.js'
// 全局组件样式
import '@/assets/css/componentStyle.css'
import '@/assets/css/comment.css'
import '@/assets/font/iconfont.css'



Vue.use(Axios)
Vue.use(ElementUi)


FastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  el: '#app-box',
  router,
  store,
  components: { App },
  template: '<App/>'
})
