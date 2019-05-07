// 常用应用
// 立项管理
import CreateProject from '@/view/applicae/createProject/createProject'
import ProjectList from '@/view/applicae/createProject/projectList'
// 项目启动
import CreateInitiation from '@/view/applicae/initiation/CreateInitiation'

const applicaeRouter = [
  {path: '/createProject', name: 'createProject', component:CreateProject},
  {path: '/projectList', name: 'projectList', component:ProjectList},
  {path: '/createInitiation', name: 'createInitiation', component:CreateInitiation},
];

export default applicaeRouter;
