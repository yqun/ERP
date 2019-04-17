import PCompanyExpenseList from '@/view/processed/companyExpense/PcompanyExpenseList'
import PCompanyExpenseItem from '@/view/processed/companyExpense/PcompanyExpenseItem'
import PCompanyExpenseItemData from '@/view/processed/companyExpense/PcompanyExpenseItemData'


const companyExpense = [
  {path: '/PcompanyExpenseList', name: 'PcompanyExpenseList', component: PCompanyExpenseList,},
  {path: '/PcompanyExpenseItem', name: 'PcompanyExpenseItem', component: PCompanyExpenseItem,},
  {path: '/PcompanyExpenseItemData', name: 'PcompanyExpenseItemData', component: PCompanyExpenseItemData,},
]


export default companyExpense
