import PCustomerExpenseList from '@/view/processed/customerExpense/PcustomerExpenseList'
import PCustomerExpenseItem from '@/view/processed/customerExpense/PcustomerExpenseItem'
import PCustomerExpenseItemData from '@/view/processed/customerExpense/PcustomerExpenseItemData'

const customerExpense = [
  {path: '/PcustomerExpenseList', name: 'PcustomerExpenseList', component: PCustomerExpenseList},
  {path: '/PcustomerExpenseItem', name: 'PcustomerExpenseItem', component: PCustomerExpenseItem},
  {path: '/PcustomerExpenseItemData', name: 'PcustomerExpenseItemData', component: PCustomerExpenseItemData},
]

export default customerExpense
