// 项目管理
import SInitiationList from '@/view/sponsored/initiation/SinitiationList'
import SCreateInitiation from '@/view/sponsored/initiation/ScreateInitiation'

const initiationRouter = [
  {path: '/SinitiationList', name: 'SinitiationList', component:SInitiationList},
  {path: '/ScreateInitiation', name: 'ScreateInitiation', component:SCreateInitiation},
];

export default initiationRouter;
