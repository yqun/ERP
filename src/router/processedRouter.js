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


const ProcessedRouter = [
  ...contract,
  ...serviceExpense,
  ...companyExpense,
  ...reimbursementMonth,
  ...initiation,
]


export default ProcessedRouter
