import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from '../App';
import Layout from '../components/layout';
import Module from '../subpages/module';
import Building from '../next/Building';
import Loading from '../next/Loading';
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
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/home',
    element: (
      <Suspense fallback={<Loading />}>
        <App type={'normal'} />
      </Suspense>
    ),
  },
  {
    path: '/panel',
    element: (
      <Suspense fallback={<Loading />}>
        <App type={'normal'} />
      </Suspense>
    ),
  },
  {
    path: '/panel/advance',
    element: (
      <Suspense fallback={<Loading />}>
        <App type={'advance'} />
      </Suspense>
    ),
  },
  {
    path: '/panel/dashboard',
    element: (
      <Suspense fallback={<Loading />}>
        <Layout type={'dashboard'} />
      </Suspense>
    ),
  },
  {
    path: '/panel/api/module/:id',
    element: (
      <Suspense fallback={<Loading />}>
        <Layout children={<Module />} />
      </Suspense>
    ),
  },
  {
    path: '/next',
    element: (
      <Suspense fallback={<Loading />}>
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
          <Suspense fallback={<Loading />}>
            <Start />
          </Suspense>
        ),
      },
      {
        path: 'start',
        element: (
          <Suspense fallback={<Loading />}>
            <Start />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      // 微服务管理
      {
        path: 'app',
        element: (
          <Suspense fallback={<Loading />}>
            <APPHome />
          </Suspense>
        ),
      },
      {
        path: 'select',
        element: (
          <Suspense fallback={<Loading />}>
            <Select />
          </Suspense>
        ),
      },
      {
        path: 'app/:name',
        element: (
          <Suspense fallback={<Loading />}>
            <AppDetail />
          </Suspense>
        ),
      },
      {
        path: 'tree',
        element: (
          <Suspense fallback={<Loading />}>
            <Tree />
          </Suspense>
        ),
      },
      // 系统管理
      {
        path: 'container',
        element: (
          <Suspense fallback={<Loading />}>
            <Container />
          </Suspense>
        ),
      },
      {
        path: 'task',
        element: (
          <Suspense fallback={<Loading />}>
            <Task />
          </Suspense>
        ),
      },
      {
        path: 'alarm',
        element: (
          <Suspense fallback={<Loading />}>
            <Alarm />
          </Suspense>
        ),
      },
      {
        path: 'log',
        element: (
          <Suspense fallback={<Loading />}>
            <LogPanel />
          </Suspense>
        ),
      },
      {
        path: 'repo',
        element: (
          <Suspense fallback={<Loading />}>
            <Repo />
          </Suspense>
        ),
      },
      {
        path: 'repo/:org/:name',
        element: (
          <Suspense fallback={<Loading />}>
            <RepoCommits />
          </Suspense>
        ),
      },
      {
        path: 'db',
        element: (
          <Suspense fallback={<Loading />}>
            <Database />
          </Suspense>
        ),
      },
      {
        path: 'system',
        element: (
          <Suspense fallback={<Loading />}>
            <System />
          </Suspense>
        ),
      },
      {
        path: 'indicator',
        element: (
          <Suspense fallback={<Loading />}>
            <Indicator />
          </Suspense>
        ),
      },
      {
        path: 'cert',
        element: (
          <Suspense fallback={<Loading />}>
            <Cert />
          </Suspense>
        ),
      },
      // 服务对接
      {
        path: 'env',
        element: (
          <Suspense fallback={<Loading />}>
            <Env />
          </Suspense>
        ),
      },
      {
        path: 'terminal',
        element: (
          <Suspense fallback={<Loading />}>
            <Terminal />
          </Suspense>
        ),
      },
      {
        path: 'gw',
        element: (
          <Suspense fallback={<Loading />}>
            <Gateway />
          </Suspense>
        ),
      },
      {
        path: 'noengine',
        element: (
          <Suspense fallback={<Loading />}>
            <NoEngine />
          </Suspense>
        ),
      },
      {
        path: 'noengine/:app',
        element: (
          <Suspense fallback={<Loading />}>
            <NoEngineApp />
          </Suspense>
        ),
      },
      // 脚本插件
      {
        path: 'script',
        element: (
          <Suspense fallback={<Loading />}>
            <Script />
          </Suspense>
        ),
      },
      // 高级配置
      {
        path: 'setting',
        element: (
          <Suspense fallback={<Loading />}>
            <Setting />
          </Suspense>
        ),
      },
      {
        path: 'cli',
        element: (
          <Suspense fallback={<Loading />}>
            <CLI />
          </Suspense>
        ),
      },
      // 其他
      {
        path: 'changelog',
        element: (
          <Suspense fallback={<Loading />}>
            <Changelog />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        ),
      },
    ],
  },
]);
