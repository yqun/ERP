import SCustomerExpenseList from '@/view/sponsored/customerExpense/ScustomerExpenseList'
import SCustomerExpenseItem from '@/view/sponsored/customerExpense/ScustomerExpenseItem'
import SCustomerExpenseItemData from '@/view/sponsored/customerExpense/ScustomerExpenseItemData'

const customerExpense = [
  {path: '/ScustomerExpenseList', name: 'ScustomerExpenseList', component: SCustomerExpenseList},
  {path: '/ScustomerExpenseItem', name: 'ScustomerExpenseItem', component: SCustomerExpenseItem},
  {path: '/ScustomerExpenseItemData', name: 'ScustomerExpenseItemData', component: SCustomerExpenseItemData},
]

export default customerExpense
