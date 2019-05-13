// 项目管理
import PInitiationList from '@/view/processed/initiation/PinitiationList'
import PCreateInitiation from '@/view/processed/initiation/PcreateInitiation'

const initiationRouter = [
  {path: '/PinitiationList', name: 'PinitiationList', component:PInitiationList},
  {path: '/PcreateInitiation', name: 'PcreateInitiation', component:PCreateInitiation},
];

export default initiationRouter;
