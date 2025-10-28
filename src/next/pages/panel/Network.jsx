import { Button, Card, Divider, Grid, Input, Modal, Spacer, Tag, Text } from '@geist-ui/core';
import { getRequest, postRequest } from '../../../axios/axios';
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import { API } from '../../../api/api';

export default function () {
  const [loading, setLoading] = useState(true);
  const [stat, setStat] = useState({});
  const [domainStat, setDomainStat] = useState({});

  const statMap = {
    total: '总请求',
    fail: '失败请求',
    static: '前端请求',
    api: '后端请求',
    today: '今日请求',
  };

  const statOrder = ['total', 'api', 'static', 'fail', 'today'];

  useEffect(() => {
    getStatData();
  }, []);

  const getStatData = async () => {
    try {
      const res = await getRequest(API.Panel.APIStat);
      const stat = res.data || {};
      const resDomain = await getRequest(API.Panel.APIDomain);
      const domainStats = resDomain.data || {};
      setStat(stat);
      setDomainStat(domainStats);
    } finally {
      setLoading(false);
    }
  };

  const renderCards = () => {
    if (!stat) {
      return null;
    }
    const list = [];
    for (const e of statOrder) {
      list.push(
        <Grid xl={4} md={6} sm={12} key={e}>
          <Card width={'100%'}>
            <Card.Content width={'unset'}>
              <Text h3 type={'secondary'} style={{ margin: '0.5rem 0' }}>
                {statMap[e]}
              </Text>
              <Text
                style={{
                  color: '#378de5',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                }}>
                {stat[e]}
              </Text>
            </Card.Content>
          </Card>
        </Grid>,
      );
    }
    return list;
  };

  const renderDomainCards = () => {
    if (!domainStat) {
      return null;
    }
    const list = [];
    for (const e in domainStat) {
      list.push(
        <Grid xl={4} md={6} sm={12} key={e}>
          <Card width={'100%'}>
            <Card.Content width={'unset'}>
              <Text h3 type={'secondary'} style={{ margin: '0.5rem 0' }}>
                {e}
              </Text>
              <Text
                style={{
                  color: '#4337e5',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                }}>
                {domainStat[e]}
              </Text>
            </Card.Content>
          </Card>
        </Grid>,
      );
    }
    return list;
  };

  return (
    <>
      <Text h3>流量统计看板</Text>
      {loading && <Loading />}
      {!loading && (
        <>
          <Grid.Container gap={2}>{renderCards()}</Grid.Container>
          <Divider />
          <Text h3 p>
            网站流量统计
          </Text>
          <Grid.Container gap={2}>{renderDomainCards()}</Grid.Container>
        </>
      )}
    </>
  );
}
