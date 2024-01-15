import { Card, Grid, Note, Spacer, Tag, Text } from '@geist-ui/core';
import { getRequest } from '../../axios/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function() {
  const [apps, setApps] = useState({});
  const nav = useNavigate();

  useEffect(() => {
    getNoEngineApps();
  }, []);

  const getNoEngineApps = () => {
    getRequest('/api/noengine/all').then(res => {
      setApps(res.data);
    });
  };

  const renderCards = () => {
    const list = [];
    Object.values(apps).forEach(app => {
      // 端口取端口数组的第一个
      let port = { hostPort: '--', innerPort: '--', proto: 'tcp' };
      if (app.ports && app.ports.length > 0) {
        port = app.ports[0];
      }
      list.push(
        <Grid xl={12} md={8} sm={24} key={app.serverName}>
          <Card width={'100%'}>
            <Card.Content width={'unset'}>
              <Text h3 type={'success'} style={{ margin: '0.5rem 0', cursor: 'pointer' }}
                    onClick={() => nav(`${app.serverName}`, { state: { app: app.serverName } })}>{app.serverName || ''}</Text>
              <Text>服务类型<Spacer inline w={1} /><Tag type={'lite'}>NoEngine</Tag></Text>
              <Text>服务端口<Spacer inline w={1} />{port.hostPort}</Text>
              <Text>服务协议<Spacer inline w={1} />{port.proto}</Text>
            </Card.Content>
          </Card>
        </Grid>,
      );
    });
    return list;
  };

  return (
    <>
      <Text h3>静态代理</Text>
      <Note label={'NoEngine服务'}>
        <Text>NoEngine负责解析域名并对前端服务进行静态代理</Text>
      </Note>
      <Spacer h={2} />
      <Grid.Container gap={2}>
        {renderCards()}
      </Grid.Container>
    </>
  );
}