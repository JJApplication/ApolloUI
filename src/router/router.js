import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Layout from '../components/layout';
import Module from '../subpages/module';
import Next from '../next/Next';

export default createBrowserRouter([
  {
    path: '/',
    element: <App type={'normal'} />,
  },
  {
    path: '/panel',
    element: <App type={'normal'} />,
  },
  {
    path: '/panel/advance',
    element: <App type={'advance'} />,
  },
  {
    path: '/panel/dashboard',
    element: <Layout type={'dashboard'} />,
  },
  {
    path: '/panel/api/module/:id',
    element: <Layout children={<Module />} />,
  },
  {
    path: '/next',
    element: <Next />,
  },
]);
