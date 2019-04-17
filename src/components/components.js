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
import  { ToastPlugin } from 'vux'





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
Vue.use(ToastPlugin, {position: 'middle'})
