// 我发起的
import Sponsored from '@/view/sponsored/sponsored'
import SponsoredList from '@/view/sponsored/sponsoredList'
import SponsoredItem from '@/view/sponsored/sponsoredItem'


const sponsoredRouter = [
  {path: '/sponsored', name: 'sponsored', component: Sponsored},
  {path: '/sponsoredList', name: 'sponsoredList', component: SponsoredList},
  {path: '/sponsoredItem', name: 'sponsoredItem', component: SponsoredItem},
]


export default sponsoredRouter
