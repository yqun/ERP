// 我发起的
import Sponsored from '@/view/sponsored/sponsored'
import SContractList from '@/view/sponsored/contract/SContractList'
import SContractItem from '@/view/sponsored/contract/SContractItem'


const sponsoredRouter = [
  {path: '/sponsored', name: 'sponsored', component: Sponsored},
  {path: '/SContractList', name: 'sponsoredList', component: SContractList},
  {path: '/SContractItem', name: 'sponsoredItem', component: SContractItem},
]


export default sponsoredRouter
