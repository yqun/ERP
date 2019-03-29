import ServiceExpenseList from '@/view/serviceExpense/serviceExpenseList'
import ServiceExpenseItem from '@/view/serviceExpense/serviceExpenseItem'


const serviceExpense = [
  {
    path: '/serviceExpenseList',
    name: 'serviceExpenseList',
    component: ServiceExpenseList
  },
  {
    path: '/serviceExpenseItem',
    name: 'serviceExpenseItem',
    component: ServiceExpenseItem,
    meat: {
      keepAlive: true,
    }
  },

]


export default serviceExpense
