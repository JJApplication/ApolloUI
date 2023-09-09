import { Card, Grid, Snippet, Spacer, Table, Tag, Text } from '@geist-ui/core';
import { getRequest } from '../../axios/axios';
import { useEffect, useState } from 'react';
import Loading from './Loading';

export default function() {
  const [loading, setLoading] = useState(true);
  const [apps, setApps] = useState({ total: 0, running: 0, stopped: 0 });
  const [tasks, setTasks] = useState({ total: 0, bg: [], cron: [] });
  const [containers, setContainers] = useState({ total: 0, running: 0, stopped: 0, data: [] });
  const [config, setConfig] = useState({});
  const [monitor, setMonitor] = useState({
    enableSys: true,
    enableApp: true,
    durationSys: 86400,
    durationApp: 3600,
    apps: ['contained', 'sshd', 'mongod', 'NoEngine', 'Apollo', 'Blog', 'Homeland', 'Hermes', 'Palace',
      'JJGo', 'JJService', 'MySite', 'Mgek', 'DevDoc', 'Redis', 'OctopusTwig', 'Sandwich',
    ],
  });

  useEffect(() => {
    setLoading(true);
    initPanel().then(r => {
      setLoading(false);
    }).finally(() => {
        setLoading(false);
      },
    );
  }, []);
  // methods
  const currentDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}
    ${date.getHours()}:${date.getMinutes()}`;
  };

  const initPanel = async () => {
    await getApps();
    await getTasks();
    await getContainers();
    getConfig();
  };

  const getApps = async () => {
    const t = { total: 0, running: 0, stopped: 0 };
    const res = await getRequest('/api/app/all');
    t.total = res.data.length || 0;
    res.data.forEach(d => {
      if (d.Status === 'OK') {
        t.running += 1;
      } else if (d.Status === 'BAD') {
        t.stopped += 1;
      }
    });
    setApps(t);
  };

  const getTasks = async () => {
    const t = { total: 0, bg: [], cron: [] };
    const bgTasks = await getRequest('/api/task/bg');
    const cronTasks = await getRequest('/api/task/cron');

    t.total = bgTasks.data.length || 0 + cronTasks.data.length || 0;
    t.bg = bgTasks.data;
    t.cron = cronTasks.data;

    setTasks(t);
  };

  const renderBGTasks = () => {
    const list = [];
    tasks.bg.forEach(t => {
      list.push(
        <div key={t.name}>
          <Tag type='default' invert>{t.name}</Tag>
          <Spacer inline w={0.5} />
        </div>,
      );
    });

    return list;
  };

  const renderCronTasks = () => {
    const list = [];
    tasks.cron.forEach(t => {
      list.push(
        <div key={t.task_name}>
          <Tag type='secondary' invert>{t.task_name}</Tag>
          <Spacer inline w={0.5} />
        </div>,
      );
    });

    return list;
  };

  const getContainers = async () => {
    const t = { total: 0, running: 0, stopped: 0, data: [] };
    const res = await getRequest('/api/container/containers');
    t.total = res.data.length || 0;
    t.data = res.data;
    res.data.forEach(d => {
      if (d.State === 'running') {
        t.running += 1;
      } else {
        t.stopped += 1;
      }
    });

    setContainers(t);
  };

  const getConfig = () => {
    const cf = {
      moreToast: false, // 使用更详细的通知格式
      logConsole: false, //日志输出到控制台
      heartbeat: 5, // 心跳间隔s
      spyDuration: 5, // 服务监控间隔
      enableHeart: false, // 开启apollo心跳检测
      enableWS: false, // 使用ws通知
      enableAppSpy: false, // 启用监控微服务
      webssh: '',
    };
    cf.moreToast = localStorage.getItem('moreToast');
    cf.logConsole = localStorage.getItem('logConsole');
    cf.heartbeat = localStorage.getItem('heartbeat');
    cf.spyDuration = localStorage.getItem('spyDuration');
    cf.enableHeart = localStorage.getItem('enableHeart');
    cf.enableWS = localStorage.getItem('enableWS');
    cf.enableAppSpy = localStorage.getItem('enableAppSpy');
    cf.webssh = localStorage.getItem('webssh');

    setConfig(cf);
  };

  // 返回true / false的样式
  const renderBool = (d) => {
    if (d === 'true' || (typeof d === 'boolean' && d)) {
      return (
        <Text span b style={{ color: '#00b900' }}>TRUE</Text>
      );
    }
    return (
      <Text span b type={'error'}>FALSE</Text>
    );
  };

  const renderMonitorApps = () => {
    const list = [];
    monitor.apps.forEach(app => {
      list.push(
        <span key={app} style={{ display: 'inline-block', margin: '0.25rem 0.5rem' }}>
          <Tag type='default' invert>{app}</Tag>
        </span>,
      );
    });

    return list;
  };
  return (
    <>
      {loading && <Loading />}
      {!loading &&
        <Grid.Container gap={2} justify='center' height='100%' style={{ maxHeight: '960px' }}>
          <Grid xs={8}>
            <Card shadow width='100%'>
              <Text h3>状态 <Text span type={'success'}>STATUS</Text></Text>
              <Text>当前时间: {currentDate()}</Text>
              <Text>版本号: 1.0.0</Text>
              <Text>构建日期: {currentDate()}</Text>
              <Text>Go Version: 1.20.1</Text>
              <Text>Go ARCH: amd64</Text>
            </Card>
          </Grid>
          <Grid xs={16}>
            <Card shadow width='100%'>
              <Card.Content style={{ width: 'unset' }}>
                <Text h3>任务 <Text span type={'success'}>TASK</Text></Text>
                <Grid.Container gap={2}>
                  <Grid xs={4} direction={'column'}>
                    <Text>任务数量: {tasks.total}</Text>
                    <Text>后台任务: {tasks.bg.length}</Text>
                    <Text>定时任务: {tasks.cron.length}</Text>
                  </Grid>
                  <Grid xs={10} style={{ flexWrap: 'wrap' }}>
                    <Text h3 style={{ width: '100%' }}>BackgroundTasks</Text>
                    {renderBGTasks()}
                  </Grid>
                  <Grid xs={10} style={{ flexWrap: 'wrap' }}>
                    <Text h3 style={{ width: '100%' }}>CronTasks</Text>
                    {renderCronTasks()}
                  </Grid>
                </Grid.Container>
              </Card.Content>
            </Card>
          </Grid>
          <Grid xs={8}>
            <Card shadow width='100%'>
              <Card.Content style={{ width: 'unset' }}>
                <Text h3>微服务 <Text span type={'success'}>APP</Text></Text>
                <Grid.Container>
                  <Grid xs={6} direction={'column'}>
                    <Text>微服务数量: <Text span b type={'secondary'}>{apps.total}</Text></Text>
                    <Text>运行中: <Text span b style={{ color: '#00b900' }}>{apps.running}</Text></Text>
                    <Text>已停止: <Text span b type={'error'}>{apps.stopped}</Text></Text>
                    <Text>未知: <Text span b type={'warning'}>{apps.total - (apps.stopped + apps.running)}</Text></Text>
                  </Grid>
                  <Grid xs={18} justify={'center'}>
                    <Snippet symbol='' copy='prevent' type={'dark'}
                             text={['$ apollocli --help', 'Commands:',
                               '======',
                               'address    查看连接的unix地址',
                               'app        显示注册的微服务列表',
                               'check      检查Apollo服务状态',
                               'reload     重载微服务模型文件',
                               'restart    重启指定微服务',
                               'start      启动指定微服务',
                               'status     查看指定微服务',
                               'stop       停止指定微服务',
                               'sync       同步指定微服务',
                               'version    查看ApolloCLI版本',
                             ]}
                             width={'100%'}
                             style={{ maxWidth: '400px' }}
                    />
                  </Grid>
                </Grid.Container>
              </Card.Content>
            </Card>
          </Grid>
          <Grid xs={16}>
            <Card shadow width='100%'>
              <Card.Content style={{ width: 'unset' }}>
                <Text h3>容器 <Text span type={'success'}>CONTAINER</Text></Text>
                <Grid.Container gap={2}>
                  <Grid xs={4} direction={'column'}>
                    <Text>容器数量: {containers.total}</Text>
                    <Text>运行容器: {containers.running}</Text>
                    <Text>停止容器: {containers.stopped}</Text>
                  </Grid>
                  <Grid xs={20}>
                    <Table data={containers.data}>
                      <Table.Column prop='Names' label='name' />
                      <Table.Column prop='Image' label='image' />
                      <Table.Column prop='Status' label='status' />
                      <Table.Column prop='State' label='state' />
                    </Table>
                  </Grid>
                </Grid.Container>
              </Card.Content>
            </Card>
          </Grid>
          <Grid xs={12}>
            <Card shadow width='100%'>
              <Text h3>配置 <Text span type={'success'}>CONFIG</Text></Text>
              <Text>开启通知详情: {renderBool(config.moreToast)}</Text>
              <Text>输出日志到控制台: {renderBool(config.logConsole)}</Text>
              <Text>开启心跳监控: {renderBool(config.enableHeart)}</Text>
              <Text>开启服务监控: {renderBool(config.enableAppSpy)}</Text>
              <Text>开启websocket: {renderBool(config.enableWS)}</Text>
              <Text>心跳时间间隔: <Text span b type={'success'}>{config.heartbeat}</Text></Text>
              <Text>监控时间间隔: <Text span b type={'success'}>{config.spyDuration}</Text></Text>
              <Text>websocket配置: <Text span b type={'secondary'}>{config.webssh}</Text></Text>
            </Card>
          </Grid>
          <Grid xs={12}>
            <Card shadow width='100%'>
              <Card.Content style={{ width: 'unset' }}>
                <Text h3>监控 <Text span type={'success'}>MONITOR</Text></Text>
                <Text>开启服务器监控: {renderBool(monitor.enableSys)}</Text>
                <Text>开启微服务监控: {renderBool(monitor.enableApp)}</Text>
                <Text>服务器监控间隔: <Text span b type={'success'}>{monitor.durationSys}s</Text></Text>
                <Text>微服务监控间隔: <Text span b type={'success'}>{monitor.durationApp}s</Text></Text>
                <Text>微服务监控列表: {renderMonitorApps()}</Text>
              </Card.Content>
            </Card>
          </Grid>
        </Grid.Container>
      }
    </>
  );
}