import ServiceExpenseList from '@/view/serviceExpense/serviceExpenseList'
import ServiceExpenseItem from '@/view/serviceExpense/serviceExpenseItem'
import ServiceExpenseItemData from '@/view/serviceExpense/serviceExpenseItemData'
import router from "./index";


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
