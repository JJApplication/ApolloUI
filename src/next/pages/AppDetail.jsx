import { Button, Card, Code, Dot, Grid, Link, Note, Progress, Spacer, Table, Tag, Text } from '@geist-ui/core';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../axios/axios';
import { Box, Play, Power, RefreshCw, RotateCcw } from '@geist-ui/icons';
import { load } from '../../store/reducer';
import logger from '../../logger/logger';
import { Toast } from './toast';
import Loading from './Loading';

export default function() {
  const params = useParams();
  const { name } = params;
  const [loading, setLoading] = useState(true);
  const [appData, setAppData] = useState([]);
  const [appMeta, setAppMeta] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [appOperationLoading, setAppOperationLoading] = useState('');
  const [autoHide, setAutoHide] = useState(false);
  const [proc, setProc] = useState({
    pid: 0,
    cpuPercent: 0,
    memPercent: 0,
    memRss: 0,
    memVms: 0,
    memSwap: 0,
    readCount: 0,
    writeCount: 0,
    readBytes: 0,
    writeBytes: 0,
    netConnections: 0,
    threads: 0,
  });

  useEffect(() => {
    const data = load();
    if (data.autoHide) {
      setAutoHide(data.autoHide);
    }

    initApp().then(() => {
      setLoading(false);
    }).catch(() => {
      Toast.error('初始化微服务信息失败');
    });
  }, []);

  const initApp = async () => {
    await getApp();
    await getAppStatus();
    await getAppProc();
  };

  const getApp = async () => {
    if (!name) {
      Toast.error('微服务名称为空');
      return;
    }
    try {
      const res = await getRequest(`/api/app/info?name=${name}`);
      // data渲染表格
      const meta = res.data.meta;
      const result = [
        { key: '名称', val: meta.name },
        { key: '标识', val: meta.id },
        { key: '类型', val: meta.type },
        { key: '描述', val: meta.chs_des },
        { key: '版本', val: meta.meta.version },
        { key: '发布状态', val: meta.release_status },
        {
          key: '在线地址',
          val: meta.link ?
            <>
              <Link href={meta.link} color target='_blank'>Link</Link>
              <Spacer w={1} />
              <Link href={meta.link} color target='_blank'>前往</Link>
            </> : '暂无',
        },
      ];

      setAppData(result);
      setAppMeta(meta);
    } catch {
      Toast.error('获取微服务信息失败');
    }
  };

  const getAppProc = async () => {
    try {
      const res = await getRequest(`/api/app/proc?name=${name}`);
      if (res.status === 'ok') {
        setProc(res.data);
      }
    } catch {
      Toast.error('获取微服务进程信息失败');
    }
  };

  const checkLoading = (op) => {
    if (appOperationLoading) {
      logger('当前有阻塞操作');
      Toast.warn('当前存在阻塞操作');
      return true;
    } else {
      setAppOperationLoading(op);
      return false;
    }
  };
  const resetLoading = () => {
    setTimeout(() => {
      setAppOperationLoading('');
    }, 1000);
  };

  const getAppStatus = async () => {
    try {
      const res = await getRequest(`/api/app/status?name=${name}`);
      if (res.data) {
        setCurrentStatus(res.data);
      } else {
        setCurrentStatus('unknown');
      }
    } catch {
      setCurrentStatus('');
      Toast.error('获取微服务状态失败');
    }
  };
  const startApp = async () => {
    if (!checkLoading('start')) {
      postRequest(`/api/app/start?app=${name}`).then(res => {
        if (res.status === 'ok') {
          Toast.success(`微服务${name}启动成功`);
        } else {
          Toast.error(`微服务${name}启动失败`);
        }
        resetLoading();
        getAppStatus();
      }).catch(() => {
        resetLoading();
        getAppStatus();
        Toast.error(`微服务${name}启动失败`);
      });
    }
  };

  const stopApp = async () => {
    if (!checkLoading('stop')) {
      postRequest(`/api/app/stop?app=${name}`).then(res => {
        if (res.status === 'ok') {
          Toast.success(`微服务${name}停止成功`);
        } else {
          Toast.error(`微服务${name}停止失败`);
        }
        resetLoading();
        getAppStatus();
      }).catch(() => {
        resetLoading();
        getAppStatus();
        Toast.error(`微服务${name}停止失败`);
      });
    }
  };

  const restartApp = async () => {
    if (!checkLoading('restart')) {
      postRequest(`/api/app/restart?app=${name}`).then(res => {
        if (res.status === 'ok') {
          Toast.success(`微服务${name}重启成功`);
        } else {
          Toast.error(`微服务${name}重启失败`);
        }
        resetLoading();
        getAppStatus();
      }).catch(() => {
        resetLoading();
        getAppStatus();
        Toast.error(`微服务${name}重启失败`);
      });
    }
  };

  const refreshApp = async () => {
    if (!checkLoading('refresh')) {
      await getAppProc();
      getRequest(`/api/app/status?name=${name}`).then(res => {
        if (res.data) {
          setCurrentStatus(res.data);
          Toast.success(`微服务${name}刷新成功`);
        } else {
          setCurrentStatus('unknown');
          Toast.error(`微服务${name}刷新失败`);
        }
        resetLoading();
      }).catch(() => {
        setCurrentStatus('');
        resetLoading();
        Toast.error(`微服务${name}刷新失败`);
      });
    }
  };

  const backup = () => {
    if (!checkLoading('start')) {
      postRequest(`/api/app/backup?app=${name}`).then(res => {
        if (res.status === 'ok') {
          Toast.success(`微服务${name}备份成功`);
        } else {
          Toast.error(`微服务${name}备份失败`);
        }
        resetLoading();
      }).catch(() => {
        resetLoading();
        Toast.error(`微服务${name}备份失败`);
      });
    }
  };

  return (
    <>
      <Text h3>微服务 - <Text span type={'success'}>{name}</Text></Text>
      {loading && <Loading />}
      {!loading && <Grid.Container gap={2}>
        <Grid xs={12}>
          <Card shadow style={{ width: '100%', height: 'calc(100vh - 10rem)' }}>
            <Card.Content style={{ width: 'unset', height: 'calc(100% - 2rem)' }}>
              <Tag invert>微服务模型</Tag>
              <Spacer h={0.5} />
              <Table data={appData}>
                <Table.Column prop='key' label='KEY' />
                <Table.Column prop='val' label='VALUE' />
              </Table>
              <Spacer />
              <Code block name={name + '.octopus'}
                    height={'calc(100% - 32rem)'}
                    margin={0}
                    style={{
                      height: 'calc(100% - 5rem)',
                      overflowY: 'auto',
                    }}>{JSON.stringify(appMeta, null, '  ')}</Code>
            </Card.Content>
          </Card>

        </Grid>
        <Grid xs={12}>
          <Card shadow style={{ width: '100%' }}>
            <Card.Content style={{ width: 'unset' }}>
              <Tag invert>微服务操作</Tag>
              <Spacer />
              <div className='runStatus'>
                {currentStatus === '' ? (<Dot className='appStatusAnim' style={{
                    position: 'absolute',
                    left: '0',
                    top: '2rem',
                  }} />) :
                  <Dot style={{ position: 'absolute', left: '0', top: '2rem' }} />}
                {currentStatus === 'running' ? (
                    <Dot className='appStatusAnim' style={{ position: 'absolute', left: '2rem', top: '2rem' }}
                         type='success' />) :
                  <Dot style={{ position: 'absolute', left: '2rem', top: '2rem' }} type='success' />}
                {currentStatus === 'unknown' ? (
                    <Dot className='appStatusAnim' style={{ position: 'absolute', left: '4rem', top: '2rem' }}
                         type='warning' />) :
                  <Dot style={{ position: 'absolute', left: '4rem', top: '2rem' }} type='warning' />}
                {currentStatus === 'stopped' ? (
                    <Dot className='appStatusAnim' style={{ position: 'absolute', left: '6rem', top: '2rem' }}
                         type='error' />) :
                  <Dot style={{ position: 'absolute', left: '6rem', top: '2rem' }} type='error' />}
              </div>
              <Spacer h={4} />
              {!autoHide ? (<Grid.Container gap={2}>
                <Grid>{!(appOperationLoading === 'start') ? (
                  <Button auto type='secondary' scale={0.6} icon={<Play />}
                          onClick={startApp}>启动</Button>) : (
                  <Button loading auto type='secondary' scale={0.6}>启动</Button>)}</Grid>
                <Grid>{!(appOperationLoading === 'restart') ? (
                  <Button auto type='secondary' scale={0.6} icon={<RotateCcw />}
                          onClick={restartApp}>重启</Button>) : (
                  <Button loading auto type='secondary' scale={0.6}>重启</Button>)}</Grid>
                <Grid>{!(appOperationLoading === 'refresh') ? (
                  <Button auto type='secondary' scale={0.6} icon={<RefreshCw />}
                          onClick={refreshApp}>刷新</Button>) : (
                  <Button loading auto type='secondary' scale={0.6}>刷新</Button>)}</Grid>
                <Grid>{!(appOperationLoading === 'backup') ? (
                  <Button auto type='secondary' scale={0.6} icon={<Box />}
                          onClick={backup}>备份</Button>) : (
                  <Button loading auto type='secondary' scale={0.6}>备份</Button>)}</Grid>
                <Grid>{!(appOperationLoading === 'stop') ? (
                  <Button auto type='error' scale={0.6} icon={<Power />}
                          onClick={stopApp}>停止</Button>) : (
                  <Button loading auto type='error' scale={0.6}>停止</Button>)}</Grid>
              </Grid.Container>) : null}
              <Spacer h={2} />
              <Note label={'进程信息'}>
                <Text><Code>PID</Code><Spacer inline w={0.5} /><Text b span type={'success'}>{proc.pid}</Text></Text>
                <Text><Code>Threads</Code><Spacer inline w={0.5} /><Text b span
                                                                         type={'success'}>{proc.threads}</Text></Text>
              </Note>
              <Spacer h={2} />
              <Tag type='lite'>CPU Usage</Tag>
              <Spacer w={0.5} inline />
              <Tag type='secondary'>{(proc.cpuPercent * 100).toFixed(2)}%</Tag>
              <Spacer />
              <Progress type='success' value={proc.cpuPercent * 100} />
              <Spacer h={1.5} />
              <Tag type='lite'>MEM Usage</Tag>
              <Spacer w={0.5} inline />
              <Tag type='secondary'>{(proc.memPercent * 100).toFixed(2)}%</Tag>
              <Spacer />
              <Progress type='secondary' value={proc.memPercent * 100} />
              <Spacer h={1.5} />
              <Tag type='lite'>IO Usage</Tag>
              <Spacer />
              <Card>
                <Card.Content>
                  <Text>Read Bytes<Spacer w={0.5} inline /><Text b span type={'success'}>{proc.readBytes}</Text></Text>
                  <Text>Write Bytes<Spacer w={0.5} inline /><Text b span
                                                                  type={'warning'}>{proc.writeBytes}</Text></Text>
                  <Text>Read Count<Spacer w={0.5} inline /><Text b span type={'success'}>{proc.readCount}</Text></Text>
                  <Text>Write Count<Spacer w={0.5} inline /><Text b span
                                                                  type={'warning'}>{proc.writeCount}</Text></Text>
                </Card.Content>
              </Card>
              <Spacer h={1.5} />
              <Tag type='lite'>NETWORK Usage</Tag>
              <Spacer />
              <Card>
                <Card.Content>
                  <Text>Connections<Spacer w={0.5} inline /><Text b span
                                                                  type={'success'}>{proc.netConnections}</Text></Text>
                </Card.Content>
              </Card>
            </Card.Content>
          </Card>
        </Grid>
      </Grid.Container>}
    </>
  );
}