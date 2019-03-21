import WaitHandle from '@/view/waitHandle/waithandle'
import WaitHandleList from '@/view/waitHandle/waitHandleList'
import WaitHandleItem from '@/view/waitHandle/waitHandleItem'



const waitHandleRouter = [
  {path: '/waithandle', name: 'waitHandle', component: WaitHandle},
  {path: '/waithandlelist', name: 'waitHandleList', component: WaitHandleList},
  {path: '/waithandleItem', name: 'waitHandleItem', component: WaitHandleItem},
]



export default waitHandleRouter
