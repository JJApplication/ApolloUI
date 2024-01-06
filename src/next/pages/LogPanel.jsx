import { Button, Card, Grid, Select, Spacer, Table, Tag, Text } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { getRequest } from '../../axios/axios';
import Loading from './Loading';
import { Toast } from './toast';
import { Download } from '@geist-ui/icons';
import './LogPanel.css';
import { useLocation } from 'react-router-dom';

export default function() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [apps, setApps] = useState({ running: [], stopped: [], unknown: [] });
  const [choose, setChoose] = useState('');
  const [logContent, setLogContent] = useState('');
  const [logDir, setLogDir] = useState([]);

  useEffect(() => {
    if (location.state && location.state.app) {
      setChoose(location.state.app);
      getAppLogDir(location.state.app);
    }
    getApps();
  }, []);

  const getApps = () => {
    getRequest('/api/app/all').then(res => {
      const status = { running: [], stopped: [], unknown: [] };
      res.data.forEach(d => {
        if (d.Status === 'OK') {
          status.running.push(d);
        } else if (d.Status === 'BAD') {
          status.stopped.push(d);
        } else {
          status.unknown.push(d);
        }
      });

      setApps(status);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
      Toast.error('获取微服务列表失败');
    });
  };

  const getAppLog = () => {
    setLoading(true);
    getRequest('/api/log', {
      app: choose,
    }).then(res => {
      setLogContent(res.data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
      Toast.error('获取微服务日志失败');
    });
  };

  const getAppLogDir = (app) => {
    getRequest('/api/log/list', {
      app: app,
    }).then(res => {
      setLogDir(res.data ? res.data : []);
    }).catch(() => {
      Toast.error('获取微服务日志列表失败');
    });
  };

  const renderOptions = (apps) => {
    const list = [];
    apps.forEach(app => {
      list.push(
        <Select.Option key={app.App} value={app.App}>{app.App}</Select.Option>,
      );
    });

    return list;
  };

  const selectApp = (val) => {
    setChoose(val);
    getAppLogDir(val);
    // 清空已有的日志
    setLogContent('');
  };

  const openAppLog = () => {
    if (choose === '') {
      Toast.error('选择的微服务为空');
    } else {
      getAppLog();
    }
  };

  const downloadAppLog = (logName) => {
    if (choose === '') {
      Toast.error('选择的微服务为空');
    } else {
      if (!logName) {
        return;
      }
      Toast.info('日志下载请求已创建');
      getRequest('/api/log/download', { app: choose, log: logName }).then(res => {
        createDownloadEle(logName, res);
      }).catch(() => {
        Toast.error('创建下载链接失败');
      });
    }
  };

  const createDownloadEle = (name, data) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
  };

  const renderAction = (_, row) => {
    return <div>
      <Button auto scale={1 / 2} icon={<Download />} onClick={() => {
        downloadAppLog(row.Name);
      }}>
      </Button>
    </div>;

  };

  return (
    <>
      <Text h3>日志管理</Text>
      <Select placeholder='选择微服务' onChange={selectApp} value={choose}>
        <Select.Option label>Running</Select.Option>
        {renderOptions(apps.running)}
        <Select.Option label>Stopped</Select.Option>
        {renderOptions(apps.stopped)}
        <Select.Option label>Unknown</Select.Option>
        {renderOptions(apps.unknown)}
      </Select>
      <Spacer inline w={1} />
      <Button type={'success'} scale={3 / 4} auto onClick={openAppLog}>加载日志</Button>
      <Spacer inline />
      <Button type={'success'} scale={3 / 4} auto onClick={() => downloadAppLog(`${choose}.log`)}>下载日志</Button>
      {loading && <Loading />}
      {!loading &&
        <div>
          <Spacer h={1.5} />
          <Grid.Container gap={2}>
            <Grid xl={8} md={8} sm={4}>
              <Card width={'100%'} shadow>
                <Card.Content width={'unset'} className={'card-log'}>
                  {logDir.length <= 0 && <Text>日志文件列表为空</Text>}
                  {logDir.length > 0 && <Table data={logDir}>
                    <Table.Column prop='Name' label='文件名' />
                    <Table.Column prop='FileSize' label='文件大小' />
                    <Table.Column prop='ModifyTime' label='修改时间' />
                    <Table.Column prop='Download' label='下载' render={renderAction} />
                  </Table>}
                </Card.Content>
              </Card>
            </Grid>
            <Grid xl={16} md={16} sm={20}>
              <Card width={'100%'} shadow>
                <Card.Content width={'unset'} className={'card-log'}>
                  {!logContent &&
                    <div>
                      <Text>点击按钮 <Tag>加载日志</Tag></Text>
                      <Text type={'secondary'}>展示最近的100kb大小日志</Text>
                    </div>
                  }
                  {logContent && <p dangerouslySetInnerHTML={{ __html: logContent }}
                                    className={'log-content'}
                  >
                  </p>}
                </Card.Content>
              </Card>
            </Grid>
          </Grid.Container>
        </div>
      }
    </>
  );
}