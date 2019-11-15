import ShareExpenseList from '@/view/sponsored/shareExpense/shareExpenseList'
import ShareExpenseItem from '@/view/sponsored/shareExpense/shareExpenseItem'
import ShareExpenseItemData from '@/view/sponsored/shareExpense/shareExpenseItemData'

export default [
  {path: '/sponsored/shareExpenseList', name: 'SshareExpenseList', component: ShareExpenseList},
  {path: '/sponsored/shareExpenseItem', name: 'SshareExpenseItem', component: ShareExpenseItem},
  {path: '/sponsored/shareExpenseItemData', name: 'SshareExpenseItemData', component: ShareExpenseItemData},
]
