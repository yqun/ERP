import WaitHandle from '@/view/waitHandle/waithandle'
// 合同审批
import contract from '@/router/waitHandle/contractRouter'
// 业务报销
import serviceExpense from '@/router/waitHandle/serviceExpenseRouter'


const waitHandleRouter = [
  {path: '/waithandle', name: 'waitHandle', component: WaitHandle},
  // 合同审批
  ...contract,
  // 业务报销
  ...serviceExpense,

]



export default waitHandleRouter
