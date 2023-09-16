import { Button, Card, Input, Note, Spacer, Text } from '@geist-ui/core';
import { useState } from 'react';

export default function() {
  const [isLogin, setIsLogin] = useState(false);
  const [lastLogin, setLastLogin] = useState('2023-09-01 00:00');

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
          <Input label='用户' placeholder='account' clearable width={'26rem'} />
          <Spacer h={2} />
          <Input.Password label='密码' placeholder='password' width={'26rem'} />
          <Spacer h={2} />
          <Button type={'success'} scale={3 / 4}>登入</Button>
        </Card.Content>
      </Card>}
      {isLogin && <Card shadow style={{ width: '40rem', padding: '2rem' }}>
        <Card.Content>
          <Text h1 type={'success'}>admin</Text>
          <Text h3>账号已经登录</Text>
          <Button type={'error'} scale={3 / 4}>登出</Button>
        </Card.Content>
      </Card>}
      <Spacer h={2} />
      <Card shadow style={{ width: '40rem', padding: '2rem' }}>
        <Card.Content>
          <Text h1>上次登录时间</Text>
          <Text h3 type={'success'}>{lastLogin}</Text>
        </Card.Content>
      </Card>
    </>
  );
}