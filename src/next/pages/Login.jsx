import { Button, Card, Input, Spacer, Text } from '@geist-ui/core';
import { useState } from 'react';

export default function() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Text h3>登入</Text>
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
          <Text h3 type={'success'}>2023-09-01 14:09</Text>
        </Card.Content>
      </Card>
    </>
  );
}