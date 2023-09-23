import { Card, Grid, Note, Spacer, Tag, Text } from '@geist-ui/core';
import { getRequest } from '../../axios/axios';
import { useEffect, useState } from 'react';

export default function() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    getDynamicPorts();
  }, []);

  const getDynamicPorts = () => {
    getRequest('/api/app/ports').then(res => {
      setApps(res.data);
    });
  };

  const renderCards = () => {
    const list = [];
    apps.forEach(app => {
      list.push(
        <Grid xl={12} md={8} sm={24} key={app.meta.id}>
          <Card width={'100%'}>
            <Card.Content width={'unset'}>
              <Text h3 type={'success'} style={{ margin: '0.5rem 0' }}>{app.meta.name}</Text>
              <Text>服务类型<Spacer inline w={1} /><Tag type={'lite'}>{app.meta.type}</Tag></Text>
              <Text>服务端口<Spacer inline w={1} />{app.meta['run_data'].ports.join(' ')}</Text>
            </Card.Content>
          </Card>
        </Grid>,
      );
    });
    return list;
  };

  return (
    <>
      <Text h3>动态网关</Text>
      <Note label={'转发规则'}>
        <Text>除了前端微服务和部分系统服务， 其他微服务使用动态端口监听</Text>
        <Text>动态端口维护在Apollo的端口映射池中，在微服务重启时会重新生成</Text>
      </Note>
      <Spacer h={2} />
      <Grid.Container gap={2}>
        {renderCards()}
      </Grid.Container>
    </>
  );
}