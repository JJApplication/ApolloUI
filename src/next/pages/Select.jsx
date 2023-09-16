import { Button, Select, Spacer } from '@geist-ui/core';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequest } from '../../axios/axios';
import Loading from './Loading';
import { Toast } from './toast';

export default function() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [apps, setApps] = useState({ running: [], stopped: [], unknown: [] });
  const [choose, setChoose] = useState('');

  useEffect(() => {
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
  };

  const openSelectApp = () => {
    if (choose === '') {
      Toast.error('选择的微服务为空');
    } else {
      nav(`/next/app/${choose}`);
    }
  };

  return (
    <>
      {loading && <Loading />}
      {!loading &&
        <div style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Select placeholder='选择微服务' onChange={selectApp}>
            <Select.Option label>Running</Select.Option>
            {renderOptions(apps.running)}
            <Select.Option label>Stopped</Select.Option>
            {renderOptions(apps.stopped)}
            <Select.Option label>Unknown</Select.Option>
            {renderOptions(apps.unknown)}
          </Select>
          <Spacer inline w={1} />
          <Button type={'success'} onClick={openSelectApp}>打开</Button>
        </div>
      }
    </>
  );
}