import { Button, Card, Grid, Input, Note, Spacer, Tag, Text, Textarea, Toggle } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../axios/axios';
import cloneDeep from 'lodash/cloneDeep';
import { Toast } from './toast';

export function System() {
  // 只读配置 运行时配置 软重启配置分开
  const [runConfig, setRunConfig] = useState({
    serviceRoot: '',
    appRoot: '',
    managerDir: '',
    cacheDir: '',
    logDir: '',
    tmpDir: '',
    backupDir: '',
    enableStack: false,
    enableFunc: false,
    enableCall: false,
    logFile: '',
    enableCache: false,
    cacheTime: 0,
    uiRouter: [],
    authExpire: 0,
    pid: 0,
    port: 0,
    uds: '',
    mongo: '',
    dockerApi: '',
    dockerApiVersion: '',
    goroutines: 0,
    maxProcs: 0,
  });

  useEffect(() => {
    initSystem().then(d => {
      setRunConfig(d);
    }).catch(() => {
      Toast.error('获取系统配置失败');
    });
  }, []);

  const initSystem = async () => {
    return await getSystemConfig();
  };


  const getSystemConfig = async () => {
    const data = await getRequest('/api/system/config');
    return data.data;
  };

  const updateConfig = () => {
    const data = cloneDeep(runConfig);
    postRequest('/api/system/config', data).then(res => {
      if (res.data) {
        Toast.success('更新运行时配置成功');
      } else {
        Toast.error('更新运行时配置失败');
      }
    }).catch(() => {
      Toast.error('更新运行时配置失败');
    });
  };

  const reloadConfig = () => {
    postRequest('/api/system/reload').then(res => {
      if (res.data) {
        Toast.success('重载运行时配置成功');
      } else {
        Toast.error('重载运行时配置失败');
      }
    }).catch(() => {
      Toast.error('重载运行时配置失败');
    });
  };

  const clearCache = () => {
    postRequest('/api/system/clear').then(res => {
      if (res.data) {
        Toast.success('页面缓存清理成功');
      } else {
        Toast.error('页面缓存清理失败');
      }
    }).catch(() => {
      Toast.error('页面缓存清理失败');
    });
  };

  const saveConfig = () => {
    postRequest('/api/system/save').then(res => {
      if (res.data) {
        Toast.success('配置保存成功');
      } else {
        Toast.error('配置保存失败');
      }
    }).catch(() => {
      Toast.error('配置保存失败');
    });
  };

  const setConfigKey = (key, val) => {
    const data = cloneDeep(runConfig);
    data[key] = val;

    setRunConfig(data);
  };

  return (
    <>
      <Text h3>系统信息</Text>
      <Spacer />
      <Card width={'100%'}>
        <Card.Content width={'unset'}>
          <Grid.Container gap={10}>
            <Grid xs={12} direction={'column'}>
              <Input label='服务运行端口' disabled width='100%' value={runConfig.port.toString()} /><Spacer h={0.5} />
              <Input label='服务运行PID' disabled width='100%' value={runConfig.pid.toString()} /><Spacer h={0.5} />
              <Input label='服务监听UDS' disabled width='100%' value={runConfig.uds} /><Spacer h={0.5} />
              <Input label='goroutines数量' disabled width='100%' value={runConfig.goroutines.toString()} />
            </Grid>
            <Grid xs={12} direction={'column'}>
              <Input label='MongoDB配置' disabled width='100%' value={runConfig.mongo} /><Spacer h={0.5} />
              <Input label='Docker API接口' disabled width='100%' value={runConfig.dockerApi} /><Spacer h={0.5} />
              <Input label='Docker API版本' disabled width='100%' value={runConfig.dockerApiVersion} /><Spacer
              h={0.5} />
              <Input label='最大核心数限制' disabled width='100%' value={runConfig.maxProcs.toString()} />
            </Grid>
          </Grid.Container>
        </Card.Content>
      </Card>
      <Spacer />
      <Card width={'100%'}>
        <Card.Content width={'unset'}>
          <Grid.Container gap={10}>
            <Grid xs={12} direction={'column'}>
              <Tag width={'fit-content'} type={'success'}>运行时生效</Tag>
              <Spacer />
              <Input label='服务根目录' width='100%' value={runConfig.serviceRoot} onChange={(e) => {
                setConfigKey('serviceRoot', e.target.value);
              }} /><Spacer h={0.5} />
              <Input label='微服务目录' width='100%' value={runConfig.appRoot} onChange={e => {
                setConfigKey('appRoot', e.target.value);
              }} /><Spacer h={0.5} />
              <Input label='管理目录' width='100%' value={runConfig.managerDir} onChange={e => {
                setConfigKey('managerDir', e.target.value);
              }} /><Spacer h={0.5} />
              <Input label='缓存目录' width='100%' value={runConfig.cacheDir} onChange={e => {
                setConfigKey('cacheDir', e.target.value);
              }} /><Spacer h={0.5} />
              <Input label='临时目录' width='100%' value={runConfig.tmpDir} onChange={e => {
                setConfigKey('tmpDir', e.target.value);
              }} /><Spacer h={0.5} />
              <Input label='备份目录' width='100%' value={runConfig.backupDir} onChange={e => {
                setConfigKey('backupDir', e.target.value);
              }} /><Spacer h={0.5} />
              <div>
                <Text span type={'secondary'} width={'6rem'} style={{ display: 'inline-block' }}>前台路由表:</Text>
                <Spacer inline w={'0.25rem'} />
                <Textarea placeholder='前台路由' width={'calc(100% - 6.5rem)'} value={runConfig.uiRouter.join(',')}
                          onChange={e => {
                            setConfigKey('uiRouter', (e.target.value || '').split(','));
                          }} />
              </div>
            </Grid>
            <Grid xs={12} direction={'column'}>
              <Tag width={'fit-content'} type={'warning'}>软重启生效</Tag>
              <Spacer />
              <Input label='日志目录' width='100%' value={runConfig.logDir} onChange={e => {
                setConfigKey('logDir', e.target.value);
              }} /><Spacer h={0.5} />
              <Input label='日志文件' width='100%' value={runConfig.logFile} onChange={e => {
                setConfigKey('logFile', e.target.value);
              }} /><Spacer h={0.5} />
              <Input label='页面缓存时间' width='100%' value={runConfig.cacheTime.toString()} onChange={e => {
                setConfigKey('cacheTime', parseInt(e.target.value, 10));
              }} /><Spacer
              h={0.5} />
              <Input label='认证失效时间' width='100%' value={runConfig.authExpire.toString()} onChange={e => {
                setConfigKey('authExpire', parseInt(e.target.value, 10));
              }} /><Spacer h={2} />
              <Text span width={'fit-content'}>开启日志堆栈跟踪<Spacer inline w={0.5} /><Toggle
                checked={runConfig.enableStack} onChange={e => {
                setConfigKey('enableStack', e.target.checked);
              }} /></Text><Spacer
              h={0.5} />
              <Text span width={'fit-content'}>开启日志函数跟踪<Spacer inline w={0.5} /><Toggle
                checked={runConfig.enableFunc} onChange={e => {
                setConfigKey('enableFunc', e.target.checked);
              }} /></Text><Spacer
              h={0.5} />
              <Text span width={'fit-content'}>开启日志调用跟踪<Spacer inline w={0.5} /><Toggle
                checked={runConfig.enableCall} onChange={e => {
                setConfigKey('enableCall', e.target.checked);
              }} /></Text><Spacer
              h={0.5} />
              <Text span width={'fit-content'}>开启页面缓存<Spacer inline w={0.5} /><Toggle
                checked={runConfig.enableCache} onChange={e => {
                setConfigKey('enableCache', e.target.checked);
              }} /></Text>
            </Grid>
          </Grid.Container>
        </Card.Content>
      </Card>
      <Spacer h={2} />
      <Note type='secondary'>
        <Text><Text b span type={'success'}>生效配置</Text>会立即刷新运行时配置到系统中,
          支持运行时配置的选项将会生效</Text>
        <Text><Text b span type={'success'}>保存运行时配置</Text>会保存配置项到系统配置文件中</Text>
        <Text><Text b span type={'success'}>清理页面缓存</Text>会刷新前台页面的缓存数据, 页面缓存默认有效期为7天</Text>
        <Text><Text b span type={'success'}>服务软重启</Text>会软重启系统,
          一些需要重启才能生效的配置将在软重启后生效</Text>
      </Note>
      <Spacer h={2} />
      <Grid.Container gap={2}>
        <Grid>
          <Button auto shadow type='secondary' scale={0.75} onClick={updateConfig}>生效配置</Button>
        </Grid>
        <Grid>
          <Button auto shadow type='secondary' scale={0.75} onClick={saveConfig}>保存运行时配置</Button>
        </Grid>
        <Grid>
          <Button auto shadow type='error' scale={0.75} onClick={clearCache}>清理页面缓存</Button>
        </Grid>
        <Grid>
          <Button auto shadow type='error' scale={0.75} onClick={reloadConfig}>服务软重启</Button>
        </Grid>
      </Grid.Container>
    </>
  );
}