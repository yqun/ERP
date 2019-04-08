import ServiceExpenseList from '@/view/waitHandle/serviceExpense/serviceExpenseList'
import ServiceExpenseItem from '@/view/waitHandle/serviceExpense/serviceExpenseItem'
import ServiceExpenseItemData from '@/view/waitHandle/serviceExpense/serviceExpenseItemData'


const serviceExpense = [
  {
    path: '/serviceExpenseList',
    name: 'serviceExpenseList',
    component: ServiceExpenseList,
    meta: {
      keepAlive: false,
    }
  },
  {
    path: '/serviceExpenseItem',
    name: 'serviceExpenseItem',
    component: ServiceExpenseItem,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/serviceExpenseItemData',
    name: 'serviceExpenseItemData',
    component: ServiceExpenseItemData,
  },


]


export default serviceExpense
