// processed 已处理
import Processed from '@/view/processed/processed'
import PContractList from '@/view/processed/contract/PContractList'
import PContractItem from '@/view/processed/contract/PContractItem'


const ProcessedRouter = [
  {path: '/processed', name: 'processed', component: Processed},
  {path: '/PContractList', name: 'PContractList', component: PContractList},
  {path: '/PContractItem', name: 'PContractItem', component: PContractItem},
]


export default ProcessedRouter
