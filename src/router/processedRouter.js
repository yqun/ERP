// processed 已处理
// 审批
import contract from '@/router/processed/processedContractRouter'
// 项目报销
import serviceExpense from '@/router/processed/serviceExpenseRouter'
// 公司报销
import companyExpense from '@/router/processed/companyExpenseRouter'
// 报销月计划
import reimbursementMonth from '@/router/processed/reimbursementMonthRouter'
// 项目管理
import initiation from '@/router/processed/initiationRouter'
// 公司借款
import companyLoan from '@/router/processed/companyLoanRouter'
// 项目借款
import serviceLoan from '@/router/processed/serviceLoanRouter'


const ProcessedRouter = [
  ...contract,
  ...serviceExpense,
  ...companyExpense,
  ...reimbursementMonth,
  ...initiation,
  ...companyLoan,
  ...serviceLoan,
]


export default ProcessedRouter
