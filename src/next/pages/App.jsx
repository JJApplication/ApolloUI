import { Card, Dot, Grid, Spacer, Tag, Text } from '@geist-ui/core';
import { getRequest } from '../../axios/axios';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

export default function() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [apps, setApps] = useState([]);
  const [status, setStatus] = useState({ total: 0, run: 0, stop: 0 });

  // hooks
  useEffect(() => {
    getApps();
  }, []);

  // methods
  const getApps = () => {
    getRequest('/api/app/all').then(res => {
      setApps(res.data || []);
      const status = { total: res.data.length, run: 0, stop: 0 };
      res.data.forEach(d => {
        if (d.Status === 'OK') {
          status.run += 1;
        } else if (d.Status === 'BAD') {
          status.stop += 1;
        }
      });
      setStatus(status);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  };
  // 渲染状态
  const renderStatus = (stat) => {
    if (stat === 'OK') {
      return (<Dot style={{ marginRight: '5px' }} type='success' />);
    } else if (stat === 'BAD') {
      return (<Dot style={{ marginRight: '5px' }} type='error' />);
    } else {
      return (<Dot style={{ marginRight: '5px' }} type='warning' />);
    }
  };

  const renderApps = () => {
    let appGrids = [];
    for (const app of apps) {
      appGrids.push(
        <Grid key={app.App} xs={12} sm={12} md={8} lg={6} justify='center' alignItems='flex-start'
              style={{ cursor: 'pointer' }}
              onClick={() => nav(`${app.App}`)}
        >
          <Card shadow width='100%' style={{ padding: '0.75rem 0.5rem' }}>
            <Card.Content padding='.8rem'>
              {renderStatus(app.Status)}
              <Text span>{app.App}</Text>
            </Card.Content>
          </Card>
        </Grid>,
      );
    }
    return appGrids;
  };

  return (
    <>
      <Text h3>微服务状态</Text>
      <Dot style={{ marginRight: '1rem' }} type='success'>运行</Dot>
      <Dot style={{ marginRight: '1rem' }} type='warning'>未知</Dot>
      <Dot type='error'>停止</Dot>
      <Spacer w={2} inline />
      <Tag type={'lite'}>Total: {status.total}</Tag><Spacer inline />
      <Tag type={'lite'}>Running: {status.run}</Tag><Spacer inline />
      <Tag type={'lite'}>Stopped: {status.stop}</Tag>
      <Spacer h={2} />
      <div className='bar'>
        <div className='bar-inner'>
          <Grid.Container gap={2} justify='flex-start'>
            {loading && <Loading />}
            {!loading && renderApps()}
          </Grid.Container>
        </div>
      </div>
    </>
  );
}