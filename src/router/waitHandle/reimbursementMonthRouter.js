import MonthList from '@/view/waitHandle/reimbursementMonth/monthList'
import MonthItem from '@/view/waitHandle/reimbursementMonth/monthItem'
import ReimbursementMonthList from '@/view/waitHandle/reimbursementMonth/reimbursementMonthList'
import ReimbursementMonthAdd from '@/view/waitHandle/reimbursementMonth/reimbursementMonthAdd'

const reimbursementMonth = [
  {path: '/monthList', name: 'monthList', component: MonthList},
  {path: '/monthItem', name: 'monthItem', component: MonthItem},
  {path: '/reimbursementMonthList', name: 'reimbursementMonthList', component: ReimbursementMonthList},
  {path: '/reimbursementMonthAdd', name: 'reimbursementMonthAdd', component: ReimbursementMonthAdd},
]

export default reimbursementMonth
