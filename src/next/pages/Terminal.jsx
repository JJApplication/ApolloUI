import { Button, Card, Grid, Input, Loading, Spacer, Text } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { load } from '../../store/reducer';

export default function() {
  const [init, setInit] = useState(false);
  const [ws, setWs] = useState('');

  useEffect(() => {
    const data = load();
    if (data.webssh) {
      setWs(data.webssh);
    }
  }, []);

  return (
    <>
      <Text h3>WEB SHELL</Text>
      <Card>
        <Card.Content>
          <Grid.Container>
            <Grid xs={16}>
              <Input label='websocket' width={'100%'} value={ws}></Input>
            </Grid>
            <Grid xs={8} justify={'center'}>
              <Button auto type={'success'}>连接</Button>
              <Spacer inline w={1}></Spacer>
              <Button type={'error'} auto>断开</Button>
            </Grid>
          </Grid.Container>
        </Card.Content>
      </Card>
      <Spacer />
      <Card>
        <Card.Content>
          {!init && <Loading spaceRatio={3}>等待终端初始化</Loading>}
        </Card.Content>
      </Card>
    </>
  );
}