// processed 已处理
// 审批
import contract from '@/router/processed/processedContractRouter'
// 项目报销
import serviceExpense from '@/router/processed/serviceExpenseRouter'
// 公司报销
import companyExpense from '@/router/processed/companyExpenseRouter'

const ProcessedRouter = [
  ...contract,
  ...serviceExpense,
  ...companyExpense,
]


export default ProcessedRouter
