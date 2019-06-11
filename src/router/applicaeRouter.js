// 常用应用
// 立项管理
import CreateProject from '@/view/applicae/createProject/createProject'
import ProjectList from '@/view/applicae/createProject/projectList'
// 创建物品申领
import CreateGoodsReceive from '@/view/applicae/goodsReceive/createGoodsReceive'

const applicaeRouter = [
  {path: '/createProject', name: 'createProject', component:CreateProject},
  {path: '/projectList', name: 'projectList', component:ProjectList},
  {path: '/createGoodsReceive', name: 'createGoodsReceive', component:CreateGoodsReceive},
];

export default applicaeRouter;
