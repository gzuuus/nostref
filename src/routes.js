import SingleRelay from './components/SingleRelay';
import NotFound from './components/NotFound';

const routes = [
  {
    path: '/relay/:relayId',
    component: SingleRelay,
  },
  {
    path: '*',
    component: NotFound,
  },
];

export default routes;
