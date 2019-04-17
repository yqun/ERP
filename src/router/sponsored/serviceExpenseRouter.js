import SServiceExpenseList from '@/view/sponsored/serviceExpense/SserviceExpenseList'
import SServiceExpenseItem from '@/view/sponsored/serviceExpense/SserviceExpenseItem'
import SServiceExpenseItemData from '@/view/sponsored/serviceExpense/SserviceExpenseItemData'


const serviceExpense = [
  {
    path: '/SserviceExpenseList',
    name: 'SserviceExpenseList',
    component: SServiceExpenseList,
  },
  {
    path: '/SserviceExpenseItem',
    name: 'SserviceExpenseItem',
    component: SServiceExpenseItem,
  },
  {
    path: '/SserviceExpenseItemData',
    name: 'SserviceExpenseItemData',
    component: SServiceExpenseItemData,
  },


]


export default serviceExpense
