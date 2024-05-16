import { Button, Card, Grid, Input, Note, Spacer, Text } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../../axios/axios';
import { setToken } from '../../../store/reducer';
import { Toast } from '../toast';
import { Github } from '@geist-ui/icons';
import { useNavigate } from 'react-router-dom';
import { disableOAuth, enableOAuth, getOAuthInfo, OAuthStat, setOAuthInfo, unsetOAuthInfo } from '../../../store/oauth';

export default function() {
  const nav = useNavigate();
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [loginAccount, setLoginAccount] = useState('');
  const [lastLoginTime, setLastLoginTime] = useState('- -');
  const [lastLoginIP, setLastLoginIP] = useState('- -');
  const [history, setHistory] = useState([]);
  // oauth
  // 从query参数中获取github重定向后的code
  const [githubOAuth, setGithubOAuth] = useState('');
  const [githubUser, setGithubUser] = useState({
    'login': '',
    'avatarUrl': '',
    'homeUrl': '',
    'accessToken': '',
  });

  useEffect(() => {
    getGithubOAuth();
    // 判断是否存在oauth登录
    // 首次oauth认证成功后跳转回到正常页面
    let code = getOAuthCode();
    if (code) {
      login2OAuth(code);
    } else {
      getHistory();
      if (OAuthStat()) {
        setGithubUser(getOAuthInfo());
      } else {
        // 普通用户登入
        getCurrent();
      }
      check().then(res => {
        if (res.status) {
          Toast.info('登录状态检查完毕');
          setIsLogin(true);
        }
      });
    }
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

  // 普通登录模式会清空之前的Github OAuth登录凭据
  // 已经是登录状态时不可继续登录
  // 未登录时等待check返回401时登录
  const login = async () => {
    // clear github oauth
    setGithubUser(null);
    setToken('');
    disableOAuth();
    unsetOAuthInfo();
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
            // 清空oauth登录状态
            disableOAuth();
            unsetOAuthInfo();
            Toast.success('登录成功');
          } else {
            Toast.error('登录失败');
            setIsLogin(false);
          }
        });
      }
    }

  };

  const logoutNormal = () => {
    postRequest('/api/auth/logout').then(res => {
      if (res.data) {
        Toast.success('登出成功');
        setIsLogin(false);
        setLoginAccount('');
        setLastLoginIP('- -');
        setLastLoginTime('- -');
        setToken('');
      } else {
        Toast.error('登出失败');
      }
    });
  };

  // 只能在登录态登出
  const logout = () => {
    check().then(res => {
      if (OAuthStat()) {
        logoutOAuth();
        return;
      }
      if (res.status) {
        logoutNormal();
      }
    });
  };

  const check = async () => {
    return await postRequest('/api/auth/check');
  };

  // oauth
  const getGithubOAuth = () => {
    getRequest('/api/oauth/github').then(res => {
      setGithubOAuth(res.data || '');
    });
  };

  // 页面渲染时读取oauth code
  const getOAuthCode = () => {
    function getQueryString(name) {
      const url_string = window.location.href; // window.location.href
      const url = new URL(url_string);
      return url.searchParams.get(name);
    }

    return getQueryString('code') || '';
  };

  // 使用code登录到oauth
  // 返回用户信息
  const login2OAuth = (code) => {
    getRequest('/api/oauth/login', {
      code: code,
    }).then(res => {
      setGithubUser(res.data);
      if (res.data && res.data.login) {
        setToken(res.data.accessToken || '');
        enableOAuth();
        setOAuthInfo(res.data);
        Toast.success('用户已登录');
        setIsLogin(true);
        nav('/next/login');
      } else {
        Toast.error('登录认证失败');
      }
    }).catch(() => {
      Toast.error('登录认证失败');
    });
  };

  const logoutOAuth = () => {
    postRequest('/api/oauth/logout').then(res => {
      if (res.status === 'ok') {
        setIsLogin(false);
        Toast.success('用户已登出');
      }
    }).finally(() => {
      setGithubUser(null);
      setToken('');
      disableOAuth();
      unsetOAuthInfo();
    }).catch(() => {
      Toast.warn('用户登出异常');
    });
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
          <Button type={'success'} onClick={login}>登录</Button>
          <Spacer w={0.5} inline />
          <Button type={'secondary'} onClick={() => window.location.href = githubOAuth}
                  icon={<Github />}>使用Github登录</Button>
        </Card.Content>
      </Card>}
      {isLogin && <Card shadow style={{ width: '40rem', padding: '2rem' }}>
        <Card.Content>
          <Text h1 type={'success'}>{loginAccount}</Text>
          <Text h3>账号已经登录</Text>
          {(githubUser && githubUser.login) &&
            (
              <>
                <Button type={'secondary'}
                        onClick={() => window.open(githubUser.homeUrl, '__blank')}
                        auto
                        icon={<Github />}>Github {githubUser.login}</Button>
                <Spacer />
                <img alt={'profile'} src={githubUser.avatarUrl}
                     style={{ borderRadius: '50%', width: '8rem' }} />
                <Spacer />
              </>
            )
          }
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