import WaitHandle from '@/view/waitHandle/waithandle'
// 合同审批
import contract from '@/router/waitHandle/contractRouter'
// 项目报销
import serviceExpense from '@/router/waitHandle/serviceExpenseRouter'
// 公司报销
import companyExpense from '@/router/waitHandle/companyExpenseRouter'
// 销售报销月计划
import reimbursementMonth from '@/router/waitHandle/reimbursementMonthRouter'

const waitHandleRouter = [
  {path: '/waithandle', name: 'waitHandle', component: WaitHandle},
  ...contract,
  ...serviceExpense,
  ...companyExpense,
  ...reimbursementMonth,
]



export default waitHandleRouter
