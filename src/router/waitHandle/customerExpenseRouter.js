import CustomerExpenseList from '@/view/waitHandle/customerExpense/customerExpenseList'
import CustomerExpenseItem from '@/view/waitHandle/customerExpense/customerExpenseItem'

const customerExpense = [
  {path: '/customerExpenseList', name: 'customerExpenseList', component: CustomerExpenseList},
  {path: '/customerExpenseItem', name: 'customerExpenseItem', component: CustomerExpenseItem}
]

export default customerExpense
