import { Button, Card, Grid, Spacer, Tag, Text } from '@geist-ui/core';
import { Hash } from '@geist-ui/icons';
import { convertTime, convertTimeEX } from '../../utils';
import { getRequest } from '../../axios/axios';
import { useEffect, useState } from 'react';
import Loading from './Loading';

export default function() {
  const [loading, setLoading] = useState(true);
  const [backgroundTasks, setBackgroundTasks] = useState([]);
  const [cronTasks, setCronTasks] = useState([]);
  const [show, setShow] = useState({ bg: true, cron: true });

  useEffect(() => {
    getTasks().then(r => {
      setLoading(false);
    });
  }, []);

  const getTasks = async () => {
    const bg = await getAllBGTasks();
    if (bg.data) {
      setBackgroundTasks(bg.data);
    }
    const cron = await getAllCronTasks();
    if (cron.data) {
      setCronTasks(cron.data);
    }
  };

  const getAllBGTasks = () => {
    return getRequest('/api/task/bg');
  };

  const getAllCronTasks = () => {
    return getRequest('/api/task/cron');
  };
  const renderAllCronTasks = () => {
    const tasksGroup = [];
    if (cronTasks.length === 0) {
      tasksGroup.push(
        <>
          <Card key='emptycron' hoverable type='cyan'>
            <p>暂无任务执行</p>
          </Card>
          <Spacer h={0.25} />
        </>,
      );
      return tasksGroup;
    }
    cronTasks.forEach(t => {
      tasksGroup.push(
        <div key={t.task_name}>
          <Card hoverable style={{ backgroundColor: '#45b098' }}>
            <Tag type='default'>任务名称: {t.task_name}</Tag>
            <Spacer inline w={0.5} />
            <Tag type='warning' invert>创建时间: {convertTime(t.create_time)}</Tag>
            <Spacer inline w={0.5} />
            <Tag type='default'>执行周期: {t.spec}</Tag>
            <Spacer inline w={0.5} />
          </Card>
          <Spacer h={0.25} />
        </div>,
      );
    });

    return tasksGroup;
  };

  const renderAllBGTasks = () => {
    const tasksGroup = [];
    if (backgroundTasks.length === 0) {
      tasksGroup.push(
        <>
          <Card key='emptybg' hoverable type='success'>
            <p>暂无任务执行</p>
          </Card>
          <Spacer h={0.25} />
        </>,
      );
      return tasksGroup;
    }
    backgroundTasks.forEach(t => {
      tasksGroup.push(
        <div key={t.name}>
          <Card hoverable type='success'>
            <Tag type='default'>任务名称: {t.name}</Tag>
            <Spacer inline w={0.5} />
            <Tag type='warning' invert>创建时间: {convertTime(t.create_time)}</Tag>
            <Spacer inline w={0.5} />
            <Tag type='dark'>上次执行: {convertTimeEX(t.lastRun)}</Tag>
            <Spacer h={0.5} />
            <Text p b font={0.5}>任务描述: {t.des ? t.des : '任务无描述信息'}</Text>
            <Text b font={0.75}>任务ID: {t.uuid}</Text>
            <Spacer h={0.25} />
            <Text b font={0.75}>执行周期: {t.duration}s</Text>
          </Card>
          <Spacer h={0.25} />
        </div>,
      );
    });

    return tasksGroup;
  };
  return (
    <>
      <div>
        <Text h3>任务管理</Text>
        {loading && <Loading />}
        {!loading &&
          <>
            <Grid.Container gap={2}>
              <Grid xs={4}>
                <Card shadow width='100%'>
                  <Card.Content style={{ width: 'unset' }}>
                    <div style={{ width: '100%', textAlign: 'center' }}>
                      <Text><Hash size={14} /> Apollo Tasks</Text><Spacer />
                      <Button onClick={() => setShow({ bg: true, cron: true })}>全部任务</Button><Spacer />
                      <Button onClick={() => setShow({ bg: true, cron: false })}>后台任务</Button><Spacer />
                      <Button onClick={() => setShow({ bg: false, cron: true })}>定时任务</Button><Spacer />
                    </div>
                  </Card.Content>
                </Card>
              </Grid>
              <Grid xs={20}>
                <Card shadow width='100%' style={{ height: 'calc(100vh - 10rem)' }}>
                  <Card.Content style={{ width: 'unset', height: 'calc(100% - 2rem)' }}>
                    <div style={{ height: '100%', overflowY: 'auto' }}>
                      {show.bg &&
                        <>
                          <Text type={'secondary'}>后台任务</Text>
                          <Spacer h={0.5} />
                          {renderAllBGTasks()}
                          <Spacer h={1.5} />
                        </>}
                      {show.cron &&
                        <>
                          <Text type={'secondary'}>定时任务</Text>
                          <Spacer h={0.5} />
                          {renderAllCronTasks()}
                        </>
                      }
                    </div>
                  </Card.Content>
                </Card>
              </Grid>
            </Grid.Container>
          </>}
      </div>
    </>
  );
}