// 常用应用
// 立项管理
import CreateProject from '@/view/applicae/createProject/createProject'
import ProjectList from '@/view/applicae/createProject/projectList'
// 创建物品申领
import CreateGoodsReceive from '@/view/applicae/goodsReceive/createGoodsReceive'
// 公司借款
import CompanyLoan from '@/view/applicae/companyLoan/companyLoan'

const applicaeRouter = [
  {path: '/createProject', name: 'createProject', component:CreateProject},
  {path: '/projectList', name: 'projectList', component:ProjectList},
  {path: '/createGoodsReceive', name: 'createGoodsReceive', component:CreateGoodsReceive},
  {path: '/companyLoan', name: 'companyLoan', component:CompanyLoan},
];

export default applicaeRouter;
