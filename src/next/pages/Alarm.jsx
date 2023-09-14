import { Button, Card, Grid, Modal, Spacer, Tag, Text } from '@geist-ui/core';
import { Hash } from '@geist-ui/icons';
import { getRequest } from '../../axios/axios';
import { useEffect, useState } from 'react';
import Loading from './Loading';

export default function() {
  const [loading, setLoading] = useState(true);
  const [alarms, setAlarms] = useState([]);
  const [alarmsTop, setAlarmsTop] = useState([]);
  const [show, setShow] = useState({ top: true, all: false });
  const [showAlarm, setShowAlarm] = useState({ show: false, message: '' });

  useEffect(() => {
    getAlarms().then(r => {
      setLoading(false);
    });
  }, []);

  const getAlarms = async () => {
    const resAll = await getRequest(`/api/alarm/all`);
    if (resAll.data) {
      setAlarms(resAll.data);
    }
    const res = await getRequest(`/api/alarm/top`);
    if (res.data) {
      setAlarmsTop(res.data);
    }
  };

  const trimLast = (s) => {
    if (!s) {
      return '';
    }
    if (s.lastIndexOf('\\n') > 0) {
      return s.substring(0, s.lastIndexOf('\\n'));
    }
    return s;
  };

  const renderAlarms = () => {
    const alarmsGroup = [];
    alarms.forEach((a, i) => {
      alarmsGroup.push(
        <div key={a.name + i.toString()}>
          <Card hoverable type='default'>
            <Card.Content style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', userSelect: 'none' }}
                          onClick={() => setShowAlarm({ show: true, message: a.message })}>
              {renderTagByLevel(a.level)}
              <Spacer inline w={0.5} />
              <Tag type='default' invert>{a.title ? a.title : '空标题'}</Tag>
              <Spacer inline w={0.5} />
              <Tag type='secondary' invert>创建时间: {a.created_at}</Tag>
              <Spacer inline w={0.5} />
              <Text p type='default'
                    style={{
                      display: 'inline-block',
                      width: '90%',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontSize: '.9rem',
                      lineHeight: '1rem',
                      cursor: 'pointer',
                    }}>{a.message ? trimLast(a.message) : '无告警信息'}</Text>
            </Card.Content>
          </Card>
          <Spacer h={0.25} />
        </div>,
      );
    });

    return alarmsGroup;
  };

  const renderAlarmsTop = () => {
    const alarmsGroup = [];
    alarmsTop.forEach((a, i) => {
      alarmsGroup.push(
        <div key={a.name + i.toString()}>
          <Card hoverable type='default'>
            <Card.Content style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', userSelect: 'none' }}
                          onClick={() => setShowAlarm({ show: true, message: a.message })}>
              {renderTagByLevel(a.level)}
              <Spacer inline w={0.5} />
              <Tag type='default' invert>{a.title ? a.title : '空标题'}</Tag>
              <Spacer inline w={0.5} />
              <Tag type='secondary' invert>创建时间: {a.created_at}</Tag>
              <Spacer inline w={0.5} />
              <Text p type='default'
                    style={{
                      display: 'inline-block',
                      width: '90%',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontSize: '.9rem',
                      lineHeight: '1rem',
                      cursor: 'pointer',
                    }}>{a.message ? trimLast(a.message) : '无告警信息'}</Text>
            </Card.Content>
          </Card>
          <Spacer h={0.25} />
        </div>,
      );
    });

    return alarmsGroup;
  };

  const renderTagByLevel = (level) => {
    switch (level) {
      case 'info': {
        return (<Tag type='success' invert style={{ fontWeight: 'bold' }}>INFO</Tag>);
      }
      case 'warn': {
        return (<Tag type='warning' invert style={{ fontWeight: 'bold' }}>WARN</Tag>);
      }
      case 'error': {
        return (<Tag type='error' invert style={{ fontWeight: 'bold' }}>ERROR</Tag>);
      }
      default: {
        return (<Tag type='success' invert style={{ fontWeight: 'bold' }}>INFO</Tag>);
      }
    }
  };

  return (
    <>
      <div>
        <Text h3>告警列表</Text>
        {loading && <Loading />}
        {!loading &&
          <>
            <Grid.Container gap={2} style={{ height: '100%' }}>
              <Grid xs={4}>
                <Card shadow width='100%' height={'100%'}>
                  <Card.Content style={{ width: 'unset' }}>
                    <div style={{ width: '100%', textAlign: 'center' }}>
                      <Text><Hash size={14} /> Apollo Alarms</Text><Spacer />
                      <Button onClick={() => setShow({ top: false, all: true })}>全部告警</Button><Spacer />
                      <Button onClick={() => setShow({ top: true, all: false })}>最近告警</Button><Spacer />
                    </div>
                  </Card.Content>
                </Card>
              </Grid>
              <Grid xs={20}>
                <Card shadow width='100%' style={{ height: 'calc(100vh - 10rem)' }}>
                  <Card.Content style={{ width: 'unset', height: 'calc(100% - 2rem)' }}>
                    <div style={{ height: '100%', overflowY: 'auto' }}>
                      {show.all &&
                        <>
                          <Text h3>告警条目: {alarms.length || 0}</Text>
                          {renderAlarms()}
                        </>}
                      {show.top &&
                        <>
                          <Text h3>最近10条告警信息</Text>
                          {renderAlarmsTop()}
                        </>
                      }
                    </div>
                  </Card.Content>
                </Card>
              </Grid>
            </Grid.Container>
            <Modal visible={showAlarm.show} onClose={() => {
              setShowAlarm({ show: false, message: '' });
            }}>
              <Modal.Title>告警信息</Modal.Title>
              <Modal.Content style={{ whiteSpace: 'pre-line' }}>
                <p>{trimLast(showAlarm.message)}</p>
              </Modal.Content>
              <Modal.Action onClick={({ close }) => close()}>关闭</Modal.Action>
            </Modal>
          </>}
      </div>
    </>
  );
}