import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Layout from '../components/layout';
import Module from '../subpages/module';
import Next from '../next/Next';
import APPHome from '../next/pages/service/App';
import Building from '../next/Building';
import About from '../next/pages/About';
import Task from '../next/pages/system/Task';
import Tree from '../next/pages/service/Tree';
import Container from '../next/pages/system/Container';
import Changelog from '../next/pages/Changelog';
import Start from '../next/pages/Start';
import Setting from '../next/pages/settings/Setting';
import Alarm from '../next/pages/system/Alarm';
import Login from '../next/pages/settings/Login';
import AppDetail from '../next/pages/service/AppDetail';
import Terminal from '../next/pages/third/Terminal';
import Select from '../next/pages/service/Select';
import CLI from '../next/pages/settings/CLI';
import { System } from '../next/pages/system/System';
import Gateway from '../next/pages/third/Gateway';
import Script from '../next/pages/script/Script';
import Home from '../pages/Home';
import LogPanel from '../next/pages/system/LogPanel';
import NoEngine from '../next/pages/third/NoEngine';
import NoEngineApp from '../next/pages/third/NoEngineApp';
import Env from '../next/pages/third/Env';
import Cert from '../next/pages/settings/Cert';
import {Indicator} from "../next/pages/system/Indicator";

export default createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/home',
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
        path: 'log',
        element: <LogPanel />,
      },
      {
        path: 'system',
        element: <System />,
      },
      {
        path: 'indicator',
        element: <Indicator />,
      },
      {
        path: 'cert',
        element: <Cert />,
      },
      // 服务对接
      {
        path: 'env',
        element: <Env />,
      },
      {
        path: 'terminal',
        element: <Terminal />,
      },
      {
        path: 'gw',
        element: <Gateway />,
      },
      {
        path: 'noengine',
        element: <NoEngine />,
      },
      {
        path: 'noengine/:app',
        element: <NoEngineApp />,
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
