import CustomerExpenseList from '@/view/waitHandle/customerExpense/customerExpenseList'
import CustomerExpenseItem from '@/view/waitHandle/customerExpense/customerExpenseItem'
import CustomerExpenseItemData from '@/view/waitHandle/customerExpense/customerExpenseItemData'

export default [
  {path: '/customerExpenseList', name: 'customerExpenseList', component: CustomerExpenseList},
  {path: '/customerExpenseItem', name: 'customerExpenseItem', component: CustomerExpenseItem},
  {path: '/customerExpenseItemData', name: 'customerExpenseItemData', component: CustomerExpenseItemData},
]


