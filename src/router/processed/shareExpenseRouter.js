import ShareExpenseList from '@/view/processed/shareExpense/shareExpenseList'
import ShareExpenseItem from '@/view/processed/shareExpense/shareExpenseItem'
import ShareExpenseItemData from '@/view/processed/shareExpense/shareExpenseItemData'

export default [
  {path: '/processed/shareExpenseList', name: 'PshareExpenseList', component: ShareExpenseList},
  {path: '/processed/shareExpenseItem', name: 'PshareExpenseItem', component: ShareExpenseItem},
  {path: '/processed/shareExpenseItemData', name: 'PshareExpenseItemData', component: ShareExpenseItemData},
]
