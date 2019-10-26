import WaitHandle from '@/view/waitHandle/waithandle'
import contract from '@/router/waitHandle/contractRouter'                     // 合同审批
import serviceExpense from '@/router/waitHandle/serviceExpenseRouter'         // 项目报销
import companyExpense from '@/router/waitHandle/companyExpenseRouter'         // 公司报销
import reimbursementMonth from '@/router/waitHandle/reimbursementMonthRouter' // 销售报销月计划
import initiationRouter from '@/router/waitHandle/initiationRouter'           // 项目管理
import goodsReceive from '@/router/waitHandle/goodsReceiveRouter'             // 物品领用
import companyLoan from '@/router/waitHandle/companyLoanRouter'             // 公司报销
import serviceLoan from '@/router/waitHandle/serviceLoanRouter'             // 项目报销
import purchaseAppend from '@/router/waitHandle/purchaseAppendRouter'       // 采购追加
import purchaseProcess from '@/router/waitHandle/PurchaseProcessRouter'       // 采购流程
import customerExpense from './waitHandle/customerExpenseRouter'              // 客户报销
import borrowChapter from './waitHandle/borrowChapterRouter'              // 公章借用
import customerManage from './waitHandle/customerManageRouter'              // 客户管理
import changeContract from './waitHandle/changeContractRouter'              // 合同变更



const waitHandleRouter = [
  {path: '/waithandle', name: 'waitHandle', component: WaitHandle},
  ...contract,
  ...serviceExpense,
  ...companyExpense,
  ...reimbursementMonth,
  ...initiationRouter,
  ...goodsReceive,
  ...companyLoan,
  ...serviceLoan,
  ...purchaseAppend,
  ...purchaseProcess,
  ...customerExpense,
  ...borrowChapter,
  ...customerManage,
  ...changeContract,
]




export default waitHandleRouter
