// 常用应用
// 立项管理
import CreateProject from '@/view/applicae/createProject/createProject'
import ProjectList from '@/view/applicae/createProject/projectList'
// 创建物品申领
import CreateGoodsReceive from '@/view/applicae/goodsReceive/createGoodsReceive'
// 公司借款
import CompanyLoan from '@/view/applicae/companyLoan/companyLoan'

// 拜访记录
 // 客户
import VisitRecordView from '@/view/applicae/visitRecord/visitRecordView'
import CustomerList from '@/view/applicae/visitRecord/customer/customerList'
import CustomerItem from '@/view/applicae/visitRecord/customer/customerItem'
// import CustomerAdd from '@/view/applicae/visitRecord/customer/customerAdd'
import ContactsInfo from '@/view/applicae/visitRecord/customer/contacts/contactsInfo'
// import ContactsAdd from '@/view/applicae/visitRecord/customer/contacts/contactsAdd'
 // 拜访
import VisitList from '@/view/applicae/visitRecord/visit/visitList'
import VisitItem from '@/view/applicae/visitRecord/visit/visitItem'

import AddCustomer from '@/view/applicae/customerManage/addCustomer' // 添加客户

// imp评分
import WriteScore from '@/view/applicae/score/writeScore'  //评分


// betterScroll 测试
import BetterScroll from '@/view/applicae/test/betterScroll'

const applicaeRouter = [
  {path: '/createProject', name: 'createProject', component:CreateProject},
  {path: '/projectList', name: 'projectList', component:ProjectList},
  {path: '/createGoodsReceive', name: 'createGoodsReceive', component:CreateGoodsReceive},
  {path: '/companyLoan', name: 'companyLoan', component:CompanyLoan},

  //拜访记录
  {
    path: '/visitRecordView',
    name: 'VisitRecordView',
    component:VisitRecordView,
    children: [
      {path: '/customerList', name: 'CustomerList', component:CustomerList},
      {path: '/visitList', name: 'VisitList', component:VisitList},
    ]
  },
  {path: '/customerItem', name: 'CustomerItem', component:CustomerItem},
  // {path: '/customerAdd', name: 'CustomerAdd', component:CustomerAdd},
  {path: '/contactsInfo', name: 'ContactsInfo', component:ContactsInfo},
  // {path: '/contactsAdd', name: 'ContactsAdd', component:ContactsAdd},
  {path: '/visitItem', name: 'VisitItem', component:VisitItem},
  {path: '/addCustomer', name: 'addCustomer', component:AddCustomer},

  {path: '/applicae/writeScore', name: 'writeScore', component: WriteScore},




  {path: '/betterScroll', name: 'betterScroll', component: BetterScroll},

];

export default applicaeRouter;
