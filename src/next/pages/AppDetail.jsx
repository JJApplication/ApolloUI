import { Button, Card, Code, Dot, Grid, Link, Note, Progress, Spacer, Table, Tag, Text } from '@geist-ui/core';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../axios/axios';
import { Box, Play, Power, RefreshCw, RotateCcw } from '@geist-ui/icons';
import { load } from '../../store/reducer';
import notifySync from '../../logger/notify';
import logger from '../../logger/logger';

export default function() {
  const params = useParams();
  const { name } = params;
  const [appData, setAppData] = useState([]);
  const [appMeta, setAppMeta] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [appOperationLoading, setAppOperationLoading] = useState('');
  const [autoHide, setAutoHide] = useState(false);

  useEffect(() => {
    const data = load();
    if (data.autoHide) {
      setAutoHide(data.autoHide);
    }
    getApp();
    getAppStatus();
  }, []);

  const getApp = () => {
    if (name) {
      getRequest(`/api/app/info?name=${name}`).then(res => {
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
      });
    }
  };

  const checkLoading = (op) => {
    if (appOperationLoading) {
      logger('当前有阻塞操作');
      notifySync('当前有阻塞操作', 'warning');
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

  const getAppStatus = () => {
    getRequest(`/api/app/status?name=${name}`).then(res => {
      if (res.data) {
        setCurrentStatus(res.data);
      } else {
        setCurrentStatus('unknown');
      }
    }).catch(() => {
      setCurrentStatus('');
    });
  };
  const startApp = () => {
    if (!checkLoading('start')) {
      postRequest(`/api/app/start?app=${name}`).then(res => {
        if (res.status === 'ok') {
          notifySync(`微服务${name}启动成功`, 'success');
        } else {
          notifySync(`微服务${name}启动失败`, 'error');
        }
        resetLoading();
        getAppStatus();
      }).catch(() => {
        resetLoading();
        getAppStatus();
      });
    }
  };

  const stopApp = () => {
    if (!checkLoading('stop')) {
      postRequest(`/api/app/stop?app=${name}`).then(res => {
        if (res.status === 'ok') {
          notifySync(`微服务${name}停止成功`, 'success');
        } else {
          notifySync(`微服务${name}停止失败`, 'error');
        }
        resetLoading();
        getAppStatus();
      }).catch(() => {
        resetLoading();
        getAppStatus();
      });
    }
  };

  const restartApp = () => {
    if (!checkLoading('restart')) {
      postRequest(`/api/app/restart?app=${name}`).then(res => {
        if (res.status === 'ok') {
          notifySync(`微服务${name}重启成功`, 'success');
        } else {
          notifySync(`微服务${name}重启失败`, 'error');
        }
        resetLoading();
        getAppStatus();
      }).catch(() => {
        resetLoading();
        getAppStatus();
      });
    }
  };

  const refreshApp = () => {
    if (!checkLoading('refresh')) {
      getRequest(`/api/app/status?name=${name}`).then(res => {
        if (res.data) {
          setCurrentStatus(res.data);
          notifySync(`微服务${name}刷新成功`, 'success');
        } else {
          setCurrentStatus('unknown');
          notifySync(`微服务${name}刷新失败`, 'error');
        }
        resetLoading();
      }).catch(() => {
        setCurrentStatus('');
        resetLoading();
      });
    }
  };

  const backup = () => {
    if (!checkLoading('start')) {
      postRequest(`/api/app/backup?app=${name}`).then(res => {
        if (res.status === 'ok') {
          notifySync(`微服务${name}备份成功`, 'success');
        } else {
          notifySync(`微服务${name}备份失败`, 'error');
        }
        resetLoading();
      }).catch(() => {
        resetLoading();
      });
    }
  };

  return (
    <>
      <Text h3>微服务 - <Text span type={'success'}>{name}</Text></Text>
      <Grid.Container gap={2}>
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
              <Note label={'进程信息'}><Code>PID</Code><Spacer inline w={0.5} />
                <Text b span type={'success'}>0</Text>
              </Note>
              <Spacer h={2} />
              <Tag type='lite'>CPU Usage</Tag>
              <Spacer />
              <Progress type='secondary' value={10} />
              <Spacer h={1.5} />
              <Tag type='lite'>MEM Usage</Tag>
              <Spacer />
              <Progress type='secondary' value={45} />
              <Spacer h={1.5} />
              <Tag type='lite'>IO Usage</Tag>
              <Spacer />
              <Progress type='warning' value={100} />
              <Spacer h={1.5} />
              <Tag type='lite'>NETWORK Usage</Tag>
              <Spacer />
              <Progress type='success' value={21} />
            </Card.Content>
          </Card>
        </Grid>
      </Grid.Container>
    </>
  );
}