import { Button, Card, Grid, Spacer, Tag, Text } from '@geist-ui/core';
import { getRequest, postRequest } from '../../axios/axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Toast } from './toast';

export default function() {
  const nav = useNavigate();
  const location = useLocation();
  const [app, setApp] = useState('');
  const [appInfo, setAppInfo] = useState({});
  const [appStatus, setAppStatus] = useState('');

  useEffect(() => {
    // 通过location解析app失败后通过url解析app
    let appName = '';
    if (location.state && location.state.app) {
      setApp(location.state.app);
      appName = location.state.app;
    } else {
      let name = location.pathname.replaceAll('/next/noengine/');
      if (name !== '') {
        setApp(name);
        appName = name;
      }
    }
    getNoEngineApp(appName);
    getNoEngineAppStatus(appName);
  }, []);

  const getNoEngineApp = (app) => {
    getRequest('/api/noengine', {
      app: app,
    }).then(res => {
      setAppInfo(res.data);
    });
  };

  const getNoEngineAppStatus = (app) => {
    getRequest('/api/noengine/status', {
      app: app,
    }).then(res => {
      setAppStatus(res.data);
    });
  };

  const renderPorts = () => {
    if (appInfo && appInfo.ports && appInfo.ports.length > 0) {
      return appInfo.ports[0];
    }
    return { hostPort: '--', innerPort: '--', proto: 'tcp' };
  };

  const renderVolumes = () => {
    let data = [];
    if (appInfo && appInfo.volumes) {
      let length = appInfo.volumes.length;
      appInfo.volumes.forEach((v, index) => {
        data.push(
          <div key={index}>
            <Card width={'100%'}>
              <Card.Content width={'unset'}>
                <Text span>主机路径: </Text><Text span type={'success'}>{v.hostPath}</Text>
                <Spacer />
                <Text span>容器路径: </Text><Text span type={'secondary'}>{v.innerPath}</Text>
              </Card.Content>
            </Card>
            {(index < length - 1) ? <Spacer /> : null}
          </div>);
      });
    }

    return data;
  };

  // APP操作
  const startApp = () => {
    postRequest('/api/noengine/start', null, {
      app: app,
    }).then(res => {
      if (res.data && res.data.status === 'ok') {
        Toast.success(`NoEngine: ${app}服务启动成功`);
        getNoEngineAppStatus(app);
      } else {
        Toast.error(`NoEngine: ${app}服务启动失败`);
      }
    }).catch(() => {
      Toast.error(`NoEngine: ${app}服务启动失败`);
    });
  };

  const stopApp = () => {
    postRequest('/api/noengine/stop', null, {
      app: app,
    }).then(res => {
      if (res.data && res.data.status === 'ok') {
        Toast.success(`NoEngine: ${app}服务停止成功`);
      } else {
        Toast.error(`NoEngine: ${app}服务停止失败`);
      }
    }).catch(() => {
      Toast.error(`NoEngine: ${app}服务停止失败`);
    });
  };

  const restartApp = () => {
    postRequest('/api/noengine/restart', null, {
      app: app,
    }).then(res => {
      if (res.data && res.data.status === 'ok') {
        Toast.success(`NoEngine: ${app}服务重启成功`);
        getNoEngineAppStatus(app);
      } else {
        Toast.error(`NoEngine: ${app}服务重启失败`);
      }
    }).catch(() => {
      Toast.error(`NoEngine: ${app}服务重启失败`);
    });
  };

  const pauseApp = () => {
    postRequest('/api/noengine/pause', null, {
      app: app,
    }).then(res => {
      if (res.data && res.data.status === 'ok') {
        Toast.success(`NoEngine: ${app}服务暂停成功`);
      } else {
        Toast.error(`NoEngine: ${app}服务暂停失败`);
      }
    }).catch(() => {
      Toast.error(`NoEngine: ${app}服务暂停失败`);
    });
  };

  const resumeApp = () => {
    postRequest('/api/noengine/resume', null, {
      app: app,
    }).then(res => {
      if (res.data && res.data.status === 'ok') {
        Toast.success(`NoEngine: ${app}服务恢复成功`);
      } else {
        Toast.error(`NoEngine: ${app}服务恢复失败`);
      }
    }).catch(() => {
      Toast.error(`NoEngine: ${app}服务恢复失败`);
    });
  };

  const removeApp = () => {
    postRequest('/api/noengine/remove', null, {
      app: app,
    }).then(res => {
      if (res.data && res.data.status === 'ok') {
        Toast.success(`NoEngine: ${app}服务删除成功`);
      } else {
        Toast.error(`NoEngine: ${app}服务删除失败`);
      }
    }).catch(() => {
      Toast.error(`NoEngine: ${app}服务删除失败`);
    });
  };

  return (
    <>
      <Text h3 style={{ cursor: 'pointer' }} onClick={() => {
        nav('/next/noengine');
      }}>静态代理</Text>
      <Spacer h={2} />
      <Grid.Container gap={2}>
        <Card width={'100%'}>
          <Card.Content width={'unset'}>
            <Text h2 type={'success'}>{app}<Spacer w={0.5} inline /><Tag type={'secondary'}>NoEngine</Tag></Text>
            <Spacer h={1} />
            <Button auto shadow type={'success'} onClick={startApp}>启动</Button><Spacer w={0.75} inline />
            <Button auto shadow type={'error'} onClick={stopApp}>停止</Button><Spacer w={0.75} inline />
            <Button auto shadow type={'warning'} onClick={restartApp}>重启</Button><Spacer w={0.75} inline />
            <Button auto shadow type={'secondary'} onClick={pauseApp}>暂停</Button><Spacer w={0.75} inline />
            <Button auto shadow type={'secondary'} onClick={resumeApp}>恢复</Button><Spacer w={0.75} inline />
            <Button auto shadow type={'error'} onClick={removeApp}>删除</Button><Spacer w={0.75} inline />
            <Spacer h={2} />
            <Text span>服务状态: </Text><Text span type={'success'}>{appStatus}</Text>
            <Text type={'default'} h3>端口映射</Text>
            <Text span>外部端口: </Text><Text span type={'success'}>{renderPorts().hostPort}</Text>
            <Spacer />
            <Text span>内部端口: </Text><Text span type={'success'}>{renderPorts().innerPort}</Text>
            <Spacer />
            <Text span>服务协议: </Text><Text span type={'success'}>{renderPorts().proto}</Text>
            <Spacer />
            <Text type={'default'} h3>挂载路径</Text>
            {renderVolumes()}
          </Card.Content>
        </Card>
      </Grid.Container>
    </>
  );
}