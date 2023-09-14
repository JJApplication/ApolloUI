import { Button, Card, Checkbox, Grid, Input, Select, Spacer, Text } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { load } from '../../store/reducer';

export default function() {
  const [state, setState] = useState({
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
    data.heartbeat = data.heartbeat.toString();
    data.spyDuration = data.spyDuration.toString();
    const result = Object.assign({}, state, data);
    setState(result);
  }, []);

  const saveSettings = () => {

  };

  const clearSettings = () => {

  };

  return (
    <>
      <Text h3>系统配置</Text>
      <Grid.Container gap={2}>
        <Grid xs={12} direction={'column'}>
          <Text h3 type={'success'}>基础配置</Text>
          <Card shadow height={'100%'}>
            <Card.Content style={{ width: 'unset' }}>
              <Input label='心跳定时器间隔' placeholder='5' value={state.heartbeat} onChange={(e) => {
                setState({ heartbeat: e.target.value });
              }} width='100%' />
              <Spacer h={1} />
              <Input label='监控定时器间隔' placeholder='5' value={state.spyDuration} onChange={(e) => {
                setState({ spyDuration: e.target.value });
              }} width='100%' />
              <Spacer h={1} />
              <Input label='webSSH连接地址' placeholder='ws://ws-address/ws/:id' value={state.webssh}
                     onChange={(e) => {
                       setState({ webssh: e.target.value });
                     }} width='100%' />
              <Spacer h={1} />
              <Checkbox checked={state.moreToast} onChange={(e) => {
                setState({ moreToast: e.target.checked });
              }}>使用详细通知</Checkbox>
              <Spacer h={.5} />
              <Checkbox checked={state.logConsole} onChange={(e) => {
                setState({ logConsole: e.target.checked });
              }}>日志输出到控制台</Checkbox>
              <Spacer h={.5} />
              <Checkbox checked={state.enableHeart} onChange={(e) => {
                setState({ enableHeart: e.target.checked });
              }}>开启心跳提示</Checkbox>
              <Spacer h={.5} />
              <Checkbox checked={state.enableWS} onChange={(e) => {
                setState({ enableWS: e.target.checked });
              }}>使用websocket通信</Checkbox>
              <Spacer h={.5} />
              <Checkbox checked={state.enableAppSpy} onChange={(e) => {
                setState({ enableAppSpy: e.target.checked });
              }}>监控微服务状态</Checkbox>
            </Card.Content>
          </Card>
        </Grid>
        <Grid xs={12} direction={'column'}>
          <Text h3 type={'success'}>身份认证</Text>
          <Card shadow height={'100%'}>
            <Card.Content style={{ width: 'unset' }}>
              <Input.Password label='Apollo身份码' value={state.authCode} onChange={(e) => {
                setState({});
              }} width='100%' maxLength={128} />
              <Spacer h={1} />
              <Input label='认证标识' value={state.authFlag} onChange={(e) => {
                setState({});
              }} width='100%' maxLength={128} />
              <Spacer h={1} />
              <Select placeholder='选择身份认证方式' value={state.authMethod}>
                <Select.Option value='query'>Query (不安全)</Select.Option>
                <Select.Option divider />
                <Select.Option value='cookie'>Cookie</Select.Option>
                <Select.Option value='header'>Header</Select.Option>
              </Select>
              <Spacer h={1} />
              <Checkbox checked={state.useBase64} onChange={(e) => {
                setState({});
              }}>使用BASE64加密认证码</Checkbox>
              <Spacer h={.5} />
              <Checkbox checked={state.autoHide} onChange={(e) => {
                setState({});
              }}>自动隐藏无权限页面</Checkbox>
              <Spacer h={.5} />
              <Checkbox checked={state.useAll} onChange={(e) => {
                setState({});
              }}>尝试使用全部认证方式</Checkbox>
              <Spacer h={.5} />
              <Checkbox checked={state.jumpHome} onChange={(e) => {
                setState({});
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