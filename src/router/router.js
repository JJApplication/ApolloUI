import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Layout from '../components/layout';
import Module from '../subpages/module';
import Next from '../next/Next';
import APPHome from '../next/pages/App';
import Building from '../next/Building';
import About from '../next/pages/About';
import Task from '../next/pages/Task';
import Tree from '../next/pages/Tree';
import Container from '../next/pages/Container';
import Changelog from '../next/pages/Changelog';
import Start from '../next/pages/Start';
import Setting from '../next/pages/Setting';
import Alarm from '../next/pages/Alarm';
import Login from '../next/pages/Login';
import AppDetail from '../next/pages/AppDetail';
import Terminal from '../next/pages/Terminal';
import Select from '../next/pages/Select';
import CLI from '../next/pages/CLI';
import { System } from '../next/pages/System';
import Gateway from '../next/pages/Gateway';
import Script from '../next/pages/Script';

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
    children: [
      {
        path: '*',
        errorElement: <Building />,
        element: <Building />,
      },
      {
        path: '',
        element: <Start />,
      },
      {
        path: 'start',
        element: <Start />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      // 微服务管理
      {
        path: 'app',
        element: <APPHome />,
      },
      {
        path: 'select',
        element: <Select />,
      },
      {
        path: 'app/:name',
        element: <AppDetail />,
      },
      {
        path: 'tree',
        element: <Tree />,
      },
      // 系统管理
      {
        path: 'container',
        element: <Container />,
      },
      {
        path: 'task',
        element: <Task />,
      },
      {
        path: 'alarm',
        element: <Alarm />,
      },
      {
        path: 'system',
        element: <System />,
      },
      // 服务对接
      {
        path: 'terminal',
        element: <Terminal />,
      },
      {
        path: 'gw',
        element: <Gateway />,
      },
      // 脚本插件
      {
        path: 'script',
        element: <Script />,
      },
      // 高级配置
      {
        path: 'setting',
        element: <Setting />,
      },
      {
        path: 'cli',
        element: <CLI />,
      },
      // 其他
      {
        path: 'changelog',
        element: <Changelog />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);
