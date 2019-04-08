import ContractList from '@/view/waitHandle/contract/contractList'
import ContractItem from '@/view/waitHandle/contract/contractItem'
import WriteContract from '@/view/waitHandle/contract/writeContract'


const contract = [
  {path: '/contractList', name: 'contractList', component: ContractList},
  {path: '/contractItem', name: 'contractItem', component: ContractItem},
  {path: '/writeContract', name: 'writeContract', component: WriteContract},
]


export default contract
