// 我发起的
import Sponsored from '@/view/sponsored/sponsored'
import SContractList from '@/view/sponsored/contract/SContractList'
import SContractItem from '@/view/sponsored/contract/SContractItem'

import serviceExpense from '@/router/sponsored/serviceExpenseRouter'// 项目报销
import companyExpense from '@/router/sponsored/companyExpenseRouter'// 公司报销
import reimbursementMonth from '@/router/sponsored/reimbursementMonthRouter'// 报销月计划
import initiation from '@/router/sponsored/initiationRouter'// 项目管理
import companyLoan from '@/router/sponsored/companyLoanRouter'// 公司借款
import serviceLoan from '@/router/sponsored/serviceLoanRouter'// 项目借款
import goodsReceive from '@/router/sponsored/goodsReceiveRouter'// 物品领用
import purchaseAppend from '@/router/sponsored/purchaseAppendRouter'// 采购追加
import purchaseProcess from '@/router/sponsored/purchaseProcessRouter'// 采购流程
import customerExpense from '@/router/sponsored/customerExpenseRouter'// 客户报销
import borrowChapter from '@/router/sponsored/borrowChapterRouter'// 公章借用
import customerManage from '@/router/sponsored/customerManageRouter'// 客户管理
import changeContract from './sponsored/changeContractRouter'              // 合同变更


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
  ...purchaseAppend,
  ...purchaseProcess,
  ...customerExpense,
  ...borrowChapter,
  ...customerManage,
  ...changeContract,
]


export default sponsoredRouter
