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

const sponsoredRouter = [
  {path: '/sponsored', name: 'sponsored', component: Sponsored},
  {path: '/SContractList', name: 'sponsoredList', component: SContractList},
  {path: '/SContractItem', name: 'sponsoredItem', component: SContractItem},
  ...serviceExpense,
  ...companyExpense,
  ...reimbursementMonth,
]


export default sponsoredRouter
