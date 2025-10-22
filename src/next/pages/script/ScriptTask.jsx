import { Button, Card, Spacer, Text } from '@geist-ui/core';
import Loading from '../Loading';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../../axios/axios';
import { calcTime } from '../../../utils';
import { Toast } from '../toast';

export default function () {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  const getAllTasks = () => {
    getRequest('/api/script/task/list')
      .then((res) => {
        setTasks(res.data || []);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteTask = (uuid) => {
    if (!uuid) {
      return;
    }
    postRequest('/api/script/task/delete', {
      script: uuid,
    }).then(res => {
      if (res.status === 'ok') {
        Toast.success('脚本任务删除成功')
      } else {
        Toast.error('脚本任务删除失败')
      }
    }).finally(() => {
      getAllTasks();
    })
  }

  const renderStatus = (status) => {
    switch (status) {
      case 'running':
        return (
          <Text span style={{ color: 'blue' }}>
            运行中
          </Text>
        );
      case 'failed':
        return (
          <Text span style={{ color: 'red' }}>
            失败
          </Text>
        );
      case 'success':
        return (
          <Text span style={{ color: 'green' }}>
            成功
          </Text>
        );
      case 'stop':
        return (
          <Text span style={{ color: 'red' }}>
            异常停止
          </Text>
        );
      default:
        return (
          <Text span style={{ color: 'yellow' }}>
            未知
          </Text>
        );
    }
  };
  useEffect(() => {
    getAllTasks();
  }, []);

  const renderTasks = () => {
    if (tasks.length <= 0) {
      return (
        <Text>空的脚本任务列表</Text>
      )
    }
    return tasks.map((task) => {
      return (
        <>
          <Card type='default' style={{ width: 'unset', marginBottom: '1rem' }}>
            <Card.Content style={{ padding: '0.75rem 1rem', width: 'auto' }}>
              <Text type={'success'} style={{ fontWeight: 'bold' }}>
                脚本名称: {task.script}
              </Text>
              <Text span>任务状态: {renderStatus(task.status)}</Text>
              <Spacer inline w={0.5} />
              <Text span>启动时间: {calcTime(task?.start_time)}</Text>
              <Spacer inline w={0.5} />
              <Text span>停止时间: {calcTime(task?.end_time)}</Text>
              <Spacer inline w={0.5} />
              <Button scale={1 / 2} width={'auto'} type={'secondary'} style={{ float: 'right', top: '-1rem' }} onClick={() => {
                deleteTask(task?.uuid);
              }}>
                删除
              </Button>
            </Card.Content>
          </Card>
        </>
      );
    });
  };

  return (
    <>
      <Text h3>脚本任务管理</Text>
      {loading && <Loading />}
      {!loading && (
        <Card hoverable>
          <Card.Content style={{ width: 'auto', height: '100%', maxHeight: '100vh', overflow: 'auto' }}>
            {renderTasks()}
          </Card.Content>
        </Card>
      )}
    </>
  );
}
