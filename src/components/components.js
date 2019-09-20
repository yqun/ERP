import Vue from 'vue'

import { XHeader } from 'vux'
import { Grid, GridItem } from 'vux'
import { Flexbox, FlexboxItem } from 'vux'
import { Swiper, SwiperItem } from 'vux'
import { Scroller } from 'vux'
import { XTable } from 'vux'
import { Group } from 'vux'
import { XTextarea } from 'vux'
import { XInput } from 'vux'
import { XButton } from 'vux'
import { Tab, TabItem } from 'vux'
import { Confirm } from 'vux'
import { TransferDom } from 'vux'
import { Toast } from 'vux'
import { Selector } from 'vux'
import { Checker, CheckerItem } from 'vux'
import { Icon } from 'vux'
import { Datetime } from 'vux'
import { Checklist } from 'vux'
import { CheckIcon } from 'vux'
import { Tabbar, TabbarItem } from 'vux'
import { Rater } from 'vux'
import { Cell } from 'vux'
import { Divider } from 'vux'
import { XSwitch } from 'vux'
import { Calendar } from 'vux'
import { XAddress } from 'vux'

import  { ToastPlugin } from 'vux'
import  { LoadingPlugin } from 'vux'



Vue.component('x-header', XHeader)
Vue.component('grid', Grid)
Vue.component('grid-item', GridItem)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('swiper', Swiper)
Vue.component('swiper-item', SwiperItem)
Vue.component('scroller', Scroller)
Vue.component('x-table', XTable)
Vue.component('group', Group)
Vue.component('x-textarea', XTextarea)
Vue.component('x-input', XInput)
Vue.component('x-button', XButton)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('confirm', Confirm)
Vue.directive('transfer-dom', TransferDom)
Vue.component('toast', Toast)
Vue.component('selector', Selector)
Vue.component('checker', Checker)
Vue.component('checker-item', CheckerItem)
Vue.component('icon', Icon)
Vue.component('datetime', Datetime)
Vue.component('checklist', Checklist)
Vue.component('check-icon', CheckIcon)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('rater', Rater)
Vue.component('cell', Cell)
Vue.component('divider', Divider)
Vue.component('x-switch', XSwitch)
Vue.component('calendar', Calendar)
Vue.component('x-address', XAddress)

Vue.use(LoadingPlugin)
Vue.use(ToastPlugin, {position: 'middle'})

// 时间过滤器
import { dateFormat } from 'vux'

Vue.filter('moment', function (value) {
  if (!value) return ''
  return dateFormat(value, 'YYYY-MM-DD HH:mm:ss')
})
