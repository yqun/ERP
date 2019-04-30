import MonthList from '@/view/waitHandle/reimbursementMonth/monthList'
import MonthItem from '@/view/waitHandle/reimbursementMonth/monthItem'
import ReimbursementMonthList from '@/view/waitHandle/reimbursementMonth/reimbursementMonthList'
import ReimbursementMonthAdd from '@/view/waitHandle/reimbursementMonth/reimbursementMonthAdd'
import UpdateInfo from '@/view/waitHandle/reimbursementMonth/updateInfo'

const reimbursementMonth = [
  {path: '/monthList', name: 'monthList', component: MonthList},
  {path: '/monthItem', name: 'monthItem', component: MonthItem},
  {path: '/reimbursementMonthList', name: 'reimbursementMonthList', component: ReimbursementMonthList},
  {path: '/reimbursementMonthAdd', name: 'reimbursementMonthAdd', component: ReimbursementMonthAdd},
  {path: '/updateInfo', name: 'updateInfo', component: UpdateInfo},
]

export default reimbursementMonth
