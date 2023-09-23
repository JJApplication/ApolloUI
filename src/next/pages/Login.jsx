import { Button, Card, Grid, Input, Note, Spacer, Text } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../axios/axios';
import { setToken } from '../../store/reducer';
import { Toast } from './toast';

export default function() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [loginAccount, setLoginAccount] = useState('');
  const [lastLoginTime, setLastLoginTime] = useState('- -');
  const [lastLoginIP, setLastLoginIP] = useState('- -');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistory();
    getCurrent();
    check().then(res => {
      if (res.status) {
        Toast.info('登录状态检查完毕');
        setIsLogin(true);
      }
    });
  }, []);

  const getHistory = () => {
    getRequest('/api/auth/history').then(res => {
      setHistory(res.data || []);
    });
  };

  const getCurrent = () => {
    getRequest('/api/auth/current').then(res => {
      if (res.data) {
        setLastLoginIP(res.data.loginIp);
        setLastLoginTime(res.data.loginTime);
        setLoginAccount(res.data.account);
      }
    });
  };

  // 已经是登录状态时不可继续登录
  // 未登录时等待check返回401时登录
  const login = async () => {
    try {
      const res = await check();
      if (res.data) {
        setIsLogin(true);
      }
    } catch (e) {
      if (e.response.status === 401) {
        postRequest('/api/auth/login', {
          account: account,
          password: password,
        }).then(res => {
          if (res.data) {
            // 保存token到存储中
            setToken(res.data.token);
            setLastLoginIP(res.data.loginIp);
            setLastLoginTime(res.data.loginTime);
            setLoginAccount(account);
            setIsLogin(true);
            Toast.success('登录成功');
          } else {
            Toast.error('登录失败');
            setIsLogin(false);
          }
        });
      }
    }

  };

  // 只能在登录态登出
  const logout = () => {
    check().then(res => {
      if (res.status) {
        postRequest('/api/auth/logout').then(res => {
          if (res.data) {
            Toast.success('登出成功');
            setIsLogin(false);
            setLoginAccount('');
            setLastLoginIP('- -');
            setLastLoginTime('- -');
          } else {
            Toast.error('登出失败');
          }
        });
      }
    });
  };

  const check = async () => {
    return await postRequest('/api/auth/check');
  };

  const renderHistoryLogin = () => {
    const list = [];
    history.forEach(h => {
      list.push(
        <Text h3 key={h.loginIp}>
          <Text span type={'success'}>{h.loginIp}</Text>
          <Spacer inline w={1.5} />
          <Text span type={'secondary'}>{h.loginTime}</Text>
        </Text>,
      );
    });

    return list;
  };

  return (
    <>
      <Text h3>登入</Text>
      <Spacer h={2} />
      <Note label={'关于认证码'} style={{ width: '37rem' }} type={'success'}>
        <Text>认证码的优先级最高, 在系统存在认证码时直接通过认证码认证</Text>
        <Text>在不存在认证码时, 系统通过用户登录后的密钥认证</Text>
      </Note>
      <Spacer h={2} />
      {!isLogin && <Card shadow style={{ width: '40rem', padding: '2rem' }}>
        <Card.Content>
          <Input label='用户' value={account} onChange={e => setAccount(e.target.value)} placeholder='account' clearable
                 width={'26rem'} />
          <Spacer h={2} />
          <Input.Password label='密码' value={password} onChange={(e) => setPassword(e.target.value)}
                          placeholder='password' width={'26rem'} />
          <Spacer h={2} />
          <Button type={'success'} scale={3 / 4} onClick={login}>登入</Button>
        </Card.Content>
      </Card>}
      {isLogin && <Card shadow style={{ width: '40rem', padding: '2rem' }}>
        <Card.Content>
          <Text h1 type={'success'}>{loginAccount}</Text>
          <Text h3>账号已经登录</Text>
          <Button type={'error'} scale={3 / 4} onClick={logout}>登出</Button>
        </Card.Content>
      </Card>}
      <Spacer h={2} />
      <Card shadow style={{ width: '40rem', padding: '2rem' }}>
        <Card.Content>
          <Grid.Container>
            <Grid xs={12} direction={'column'}>
              <Text h1 margin={'0'}>登录时间</Text>
              <Text h3 type={'success'}>{lastLoginTime}</Text>
            </Grid>
            <Grid xs={12} direction={'column'}>
              <Text h1 margin={'0'}>登录IP</Text>
              <Text h3 type={'success'}>{lastLoginIP}</Text>
            </Grid>
          </Grid.Container>
          <Text h1>历史登录</Text>
          {renderHistoryLogin()}
        </Card.Content>
      </Card>
    </>
  );
}