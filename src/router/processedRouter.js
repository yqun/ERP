// processed 已处理
import ProcessedList from '@/view/processed/processedList'
import ProcessedItem from '@/view/processed/processedItem'


const ProcessedRouter = [
  {path: '/processedList', name: 'processedList', component: ProcessedList},
  {path: '/processedItem', name: 'processedItem', component: ProcessedItem},
]


export default ProcessedRouter
