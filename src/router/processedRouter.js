// processed 已处理

import contract from '@/router/processed/processedContractRouter' // 审批
import serviceExpense from '@/router/processed/serviceExpenseRouter'// 项目报销
import companyExpense from '@/router/processed/companyExpenseRouter'// 公司报销
import reimbursementMonth from '@/router/processed/reimbursementMonthRouter'// 报销月计划
import initiation from '@/router/processed/initiationRouter'// 项目管理
import companyLoan from '@/router/processed/companyLoanRouter'// 公司借款
import serviceLoan from '@/router/processed/serviceLoanRouter'// 项目借款
import goodsReceive from '@/router/processed/goodsReceiveRouter'// 物品领用
import purchaseAppend from '@/router/processed/purchaseAppendRouter'// 采购追加
import PurchaseProcess from '@/router/processed/PurchaseProcessRouter'// 采购流程
import customerExpense from '@/router/processed/customerExpenseRouter'// 客户报销
import borrowChapter from '@/router/processed/borrowChapterRouter'// 公章借用
import customerManage from '@/router/processed/customerManageRouter'// 客户管理
import changeContract from './processed/changeContractRouter' // 合同变更
import borrowUse from './processed/borrowUseRouter' // 公章使用


const ProcessedRouter = [
  ...contract,
  ...serviceExpense,
  ...companyExpense,
  ...reimbursementMonth,
  ...initiation,
  ...companyLoan,
  ...serviceLoan,
  ...goodsReceive,
  ...purchaseAppend,
  ...PurchaseProcess,
  ...customerExpense,
  ...borrowChapter,
  ...customerManage,
  ...changeContract,
  ...borrowUse,
]


export default ProcessedRouter
