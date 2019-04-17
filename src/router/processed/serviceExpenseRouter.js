import PServiceExpenseList from '@/view/processed/serviceExpense/pserviceExpenseList'
import PServiceExpenseItem from '@/view/processed/serviceExpense/pserviceExpenseItem'
import PServiceExpenseItemData from '@/view/processed/serviceExpense/pserviceExpenseItemData'


const serviceExpense = [
  {
    path: '/PserviceExpenseList',
    name: 'PserviceExpenseList',
    component: PServiceExpenseList,
  },
  {
    path: '/PserviceExpenseItem',
    name: 'PserviceExpenseItem',
    component: PServiceExpenseItem,
  },
  {
    path: '/PserviceExpenseItemData',
    name: 'PserviceExpenseItemData',
    component: PServiceExpenseItemData,
  },


]


export default serviceExpense
