// 项目管理
import InitiationList from '@/view/waitHandle/initiation/initiationList'
import CreateInitiation from '@/view/waitHandle/initiation/createInitiation'

const initiationRouter = [
  {path: '/initiationList', name: 'initiationList', component:InitiationList},
  {path: '/createInitiation', name: 'createInitiation', component:CreateInitiation},
];

export default initiationRouter;
