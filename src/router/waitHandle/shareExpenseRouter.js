import ShareExpenseList from '@/view/waitHandle/shareExpense/shareExpenseList'
import ShareExpenseItem from '@/view/waitHandle/shareExpense/shareExpenseItem'
import ShareExpenseItemData from '@/view/waitHandle/shareExpense/shareExpenseItemData'

export default [
  {path: '/waithandle/shareExpenseList', name: 'shareExpenseList', component: ShareExpenseList},
  {path: '/waithandle/shareExpenseItem', name: 'shareExpenseItem', component: ShareExpenseItem},
  {path: '/waithandle/shareExpenseItemData', name: 'shareExpenseItemData', component: ShareExpenseItemData},
]
