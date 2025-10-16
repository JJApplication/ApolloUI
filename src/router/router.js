import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from '../App';
import Layout from '../components/layout';
import Module from '../subpages/module';
import Building from '../next/Building';
const Next = lazy(() => import('../next/Next'));
const APPHome = lazy(() => import('../next/pages/service/App'));
const About = lazy(() => import('../next/pages/About'));
const Task = lazy(() => import('../next/pages/system/Task'));
const Tree = lazy(() => import('../next/pages/service/Tree'));
const Container = lazy(() => import('../next/pages/system/Container'));
const Changelog = lazy(() => import('../next/pages/Changelog'));
const Start = lazy(() => import('../next/pages/Start'));
const Setting = lazy(() => import('../next/pages/settings/Setting'));
const Alarm = lazy(() => import('../next/pages/system/Alarm'));
const Login = lazy(() => import('../next/pages/settings/Login'));
const AppDetail = lazy(() => import('../next/pages/service/AppDetail'));
const Terminal = lazy(() => import('../next/pages/third/Terminal'));
const Select = lazy(() => import('../next/pages/service/Select'));
const CLI = lazy(() => import('../next/pages/settings/CLI'));
const System = lazy(() => import('../next/pages/system/System'));
const Gateway = lazy(() => import('../next/pages/third/Gateway'));
const Script = lazy(() => import('../next/pages/script/Script'));
const Home = lazy(() => import('../pages/Home'));
const LogPanel = lazy(() => import('../next/pages/system/LogPanel'));
const NoEngine = lazy(() => import('../next/pages/third/NoEngine'));
const NoEngineApp = lazy(() => import('../next/pages/third/NoEngineApp'));
const Env = lazy(() => import('../next/pages/third/Env'));
const Cert = lazy(() => import('../next/pages/settings/Cert'));
const Indicator = lazy(() => import('../next/pages/system/Indicator'));
const Repo = lazy(() => import('../next/pages/system/Repo'));
const RepoCommits = lazy(() => import('../next/pages/system/RepoCommits'));
const Database = lazy(() => import('../next/pages/system/Database'));

export default createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Building />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/home',
    element: (
      <Suspense fallback={<Building />}>
        <App type={'normal'} />
      </Suspense>
    ),
  },
  {
    path: '/panel',
    element: (
      <Suspense fallback={<Building />}>
        <App type={'normal'} />
      </Suspense>
    ),
  },
  {
    path: '/panel/advance',
    element: (
      <Suspense fallback={<Building />}>
        <App type={'advance'} />
      </Suspense>
    ),
  },
  {
    path: '/panel/dashboard',
    element: (
      <Suspense fallback={<Building />}>
        <Layout type={'dashboard'} />
      </Suspense>
    ),
  },
  {
    path: '/panel/api/module/:id',
    element: (
      <Suspense fallback={<Building />}>
        <Layout children={<Module />} />
      </Suspense>
    ),
  },
  {
    path: '/next',
    element: (
      <Suspense fallback={<Building />}>
        <Next />
      </Suspense>
    ),
    children: [
      {
        path: '*',
        errorElement: <Building />,
        element: <Building />,
      },
      {
        path: '',
        element: (
          <Suspense fallback={<Building />}>
            <Start />
          </Suspense>
        ),
      },
      {
        path: 'start',
        element: (
          <Suspense fallback={<Building />}>
            <Start />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<Building />}>
            <Login />
          </Suspense>
        ),
      },
      // 微服务管理
      {
        path: 'app',
        element: (
          <Suspense fallback={<Building />}>
            <APPHome />
          </Suspense>
        ),
      },
      {
        path: 'select',
        element: (
          <Suspense fallback={<Building />}>
            <Select />
          </Suspense>
        ),
      },
      {
        path: 'app/:name',
        element: (
          <Suspense fallback={<Building />}>
            <AppDetail />
          </Suspense>
        ),
      },
      {
        path: 'tree',
        element: (
          <Suspense fallback={<Building />}>
            <Tree />
          </Suspense>
        ),
      },
      // 系统管理
      {
        path: 'container',
        element: (
          <Suspense fallback={<Building />}>
            <Container />
          </Suspense>
        ),
      },
      {
        path: 'task',
        element: (
          <Suspense fallback={<Building />}>
            <Task />
          </Suspense>
        ),
      },
      {
        path: 'alarm',
        element: (
          <Suspense fallback={<Building />}>
            <Alarm />
          </Suspense>
        ),
      },
      {
        path: 'log',
        element: (
          <Suspense fallback={<Building />}>
            <LogPanel />
          </Suspense>
        ),
      },
      {
        path: 'repo',
        element: (
          <Suspense fallback={<Building />}>
            <Repo />
          </Suspense>
        ),
      },
      {
        path: 'repo/:org/:name',
        element: (
          <Suspense fallback={<Building />}>
            <RepoCommits />
          </Suspense>
        ),
      },
      {
        path: 'db',
        element: (
          <Suspense fallback={<Building />}>
            <Database />
          </Suspense>
        ),
      },
      {
        path: 'system',
        element: (
          <Suspense fallback={<Building />}>
            <System />
          </Suspense>
        ),
      },
      {
        path: 'indicator',
        element: (
          <Suspense fallback={<Building />}>
            <Indicator />
          </Suspense>
        ),
      },
      {
        path: 'cert',
        element: (
          <Suspense fallback={<Building />}>
            <Cert />
          </Suspense>
        ),
      },
      // 服务对接
      {
        path: 'env',
        element: (
          <Suspense fallback={<Building />}>
            <Env />
          </Suspense>
        ),
      },
      {
        path: 'terminal',
        element: (
          <Suspense fallback={<Building />}>
            <Terminal />
          </Suspense>
        ),
      },
      {
        path: 'gw',
        element: (
          <Suspense fallback={<Building />}>
            <Gateway />
          </Suspense>
        ),
      },
      {
        path: 'noengine',
        element: (
          <Suspense fallback={<Building />}>
            <NoEngine />
          </Suspense>
        ),
      },
      {
        path: 'noengine/:app',
        element: (
          <Suspense fallback={<Building />}>
            <NoEngineApp />
          </Suspense>
        ),
      },
      // 脚本插件
      {
        path: 'script',
        element: (
          <Suspense fallback={<Building />}>
            <Script />
          </Suspense>
        ),
      },
      // 高级配置
      {
        path: 'setting',
        element: (
          <Suspense fallback={<Building />}>
            <Setting />
          </Suspense>
        ),
      },
      {
        path: 'cli',
        element: (
          <Suspense fallback={<Building />}>
            <CLI />
          </Suspense>
        ),
      },
      // 其他
      {
        path: 'changelog',
        element: (
          <Suspense fallback={<Building />}>
            <Changelog />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<Building />}>
            <About />
          </Suspense>
        ),
      },
    ],
  },
]);
