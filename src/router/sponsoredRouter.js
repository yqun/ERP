// 我发起的
import Sponsored from '@/view/sponsored/sponsored'
import SContractList from '@/view/sponsored/contract/SContractList'
import SContractItem from '@/view/sponsored/contract/SContractItem'
// 项目报销
import serviceExpense from '@/router/sponsored/serviceExpenseRouter'
// 公司报销
import companyExpense from '@/router/sponsored/companyExpenseRouter'
// 报销月计划
import reimbursementMonth from '@/router/sponsored/reimbursementMonthRouter'
// 项目管理
import initiation from '@/router/sponsored/initiationRouter'
// 公司借款
import companyLoan from '@/router/sponsored/companyLoanRouter'
// 项目借款
import serviceLoan from '@/router/sponsored/serviceLoanRouter'
// 物品领用
import goodsReceive from '@/router/sponsored/goodsReceiveRouter'

const sponsoredRouter = [
  {path: '/sponsored', name: 'sponsored', component: Sponsored},
  {path: '/SContractList', name: 'sponsoredList', component: SContractList},
  {path: '/SContractItem', name: 'sponsoredItem', component: SContractItem},
  ...serviceExpense,
  ...companyExpense,
  ...reimbursementMonth,
  ...initiation,
  ...companyLoan,
  ...serviceLoan,
  ...goodsReceive,
]


export default sponsoredRouter
