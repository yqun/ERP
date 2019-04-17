import CompanyExpenseList from '@/view/waitHandle/companyExpense/companyExpenseList'
import CompanyExpenseItem from '@/view/waitHandle/companyExpense/companyExpenseItem'
import CompanyExpenseItemData from '@/view/waitHandle/companyExpense/companyExpenseItemData'


const companyExpense = [
  {path: '/companyExpenseList', name: 'companyExpenseList', component: CompanyExpenseList,},
  {path: '/companyExpenseItem', name: 'companyExpenseItem', component: CompanyExpenseItem,},
  {path: '/companyExpenseItemData', name: 'companyExpenseItemData', component: CompanyExpenseItemData,},
]


export default companyExpense
