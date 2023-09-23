import { Button, Card, Checkbox, Grid, Input, Select, Spacer, Text } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { clearStorage, getToken, load, save } from '../../store/reducer';
import cloneDeep from 'lodash/cloneDeep';
import { Toast } from './toast';

export default function() {
  const [settings, setSettings] = useState({
    authCode: '',
    authFlag: '',
    authMethod: 'query',
    useBase64: false,
    useAll: false,
    jumpHome: false,
    heartbeat: '5',
    spyDuration: '5',
    moreToast: false, // 使用更详细的通知格式
    logConsole: false, //日志输出到控制台
    enableHeart: false, // 开启apollo心跳检测
    enableWS: false, // 使用ws通知
    autoHide: false, // 自动隐藏无权限页面
    enableAppSpy: false, // 启用监控微服务
    webssh: '', // webssh地址
  });

  useEffect(() => {
    const data = load();
    data.heartbeat = (data.heartbeat || 0).toString();
    data.spyDuration = (data.spyDuration || 0).toString();
    data.authFlag = getToken() || '';
    const result = Object.assign({}, settings, data);
    setSettings(result);
  }, []);

  const saveSettings = () => {
    save(settings);
    Toast.success('配置保存完毕');
  };

  const clearSettings = () => {
    clearStorage();
    setSettings({
      authCode: '',
      authFlag: '',
      authMethod: 'query',
      useBase64: false,
      useAll: false,
      jumpHome: false,
      heartbeat: '5',
      spyDuration: '5',
      moreToast: false,
      logConsole: false,
      enableHeart: false,
      enableWS: false,
      autoHide: false,
      enableAppSpy: false,
      webssh: '',
    });
    Toast.success('配置清空完毕');
  };

  const setStateKey = (key, val) => {
    const data = cloneDeep(settings);
    data[key] = val;

    setSettings(data);
  };

  return (
    <>
      <Text h3>系统配置</Text>
      <Grid.Container gap={2}>
        <Grid xs={12} direction={'column'}>
          <Text h3 type={'success'}>基础配置</Text>
          <Card shadow height={'100%'}>
            <Card.Content style={{ width: 'unset' }}>
              <Input label='心跳定时器间隔' placeholder='5' value={settings.heartbeat} onChange={(e) => {
                setStateKey('heartbeat', e.target.value);
              }} width='100%' />
              <Spacer h={1} />
              <Input label='监控定时器间隔' placeholder='5' value={settings.spyDuration} onChange={(e) => {
                setStateKey('spyDuration', e.target.value);
              }} width='100%' />
              <Spacer h={1} />
              <Input label='webSSH连接地址' placeholder='ws://ws-address/ws/:id' clearable autoComplete={'off'}
                     value={settings.webssh}
                     onChange={(e) => {
                       setStateKey('webssh', e.target.value);
                     }} width='100%' />
              <Spacer h={1} />
              <Checkbox checked={settings.moreToast} onChange={(e) => {
                setStateKey('moreToast', e.target.checked);
              }}>使用详细通知</Checkbox>
              <Spacer h={.5} />
              <Checkbox checked={settings.logConsole} onChange={(e) => {
                setStateKey('logConsole', e.target.checked);
              }}>日志输出到控制台</Checkbox>
              <Spacer h={.5} />
              <Checkbox checked={settings.enableHeart} onChange={(e) => {
                setStateKey('enableHeart', e.target.checked);
              }}>开启心跳提示</Checkbox>
              <Spacer h={.5} />
              <Checkbox checked={settings.enableWS} onChange={(e) => {
                setStateKey('enableWS', e.target.checked);
              }}>使用websocket通信</Checkbox>
              <Spacer h={.5} />
              <Checkbox checked={settings.enableAppSpy} onChange={(e) => {
                setStateKey('enableAppSpy', e.target.checked);
              }}>监控微服务状态</Checkbox>
            </Card.Content>
          </Card>
        </Grid>
        <Grid xs={12} direction={'column'}>
          <Text h3 type={'success'}>身份认证</Text>
          <Card shadow height={'100%'}>
            <Card.Content style={{ width: 'unset' }}>
              <Input.Password label='Apollo身份码' autoComplete={'off'} value={settings.authCode} onChange={(e) => {
                setStateKey('authCode', e.target.value);
              }} width='100%' maxLength={128} />
              <Spacer h={1} />
              <Input label='认证标识' clearable autoComplete={'off'} value={settings.authFlag} onChange={(e) => {
                setStateKey('authFlag', e.target.value);
              }} width='100%' maxLength={128} />
              <Spacer h={1} />
              <Select placeholder='选择身份认证方式' value={settings.authMethod} onChange={e => {
                setStateKey('authMethod', e);
              }}>
                <Select.Option value='query'>Query (不安全)</Select.Option>
                <Select.Option divider />
                <Select.Option value='cookie'>Cookie</Select.Option>
                <Select.Option value='header'>Header</Select.Option>
              </Select>
              <Spacer h={1} />
              <Checkbox checked={settings.useBase64} onChange={(e) => {
                setStateKey('useBase64', e.target.checked);
              }}>使用BASE64加密认证码</Checkbox>
              <Spacer h={.5} />
              <Checkbox checked={settings.autoHide} onChange={(e) => {
                setStateKey('autoHide', e.target.checked);
              }}>自动隐藏无权限页面</Checkbox>
              <Spacer h={.5} />
              <Checkbox checked={settings.useAll} onChange={(e) => {
                setStateKey('useAll', e.target.checked);
              }}>尝试使用全部认证方式</Checkbox>
              <Spacer h={.5} />
              <Checkbox checked={settings.jumpHome} onChange={(e) => {
                setStateKey('jumpHome', e.target.checked);
              }}>认证失败后跳转回首页</Checkbox>
            </Card.Content>
          </Card>
        </Grid>
      </Grid.Container>
      <Spacer h={2}></Spacer>
      <Grid.Container gap={2}>
        <Grid><Button auto shadow type='secondary' scale={0.75}
                      onClick={saveSettings}>保存</Button></Grid>
        <Grid><Button auto shadow type='error' scale={0.75} onClick={clearSettings}>重置</Button></Grid>
      </Grid.Container>
    </>
  );
}