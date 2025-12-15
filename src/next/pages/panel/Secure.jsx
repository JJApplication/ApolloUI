import { Loading, Table, Text } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { getRequest } from '../../../axios/axios';
import { API } from '../../../api/api';

export default function() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getSecureDataList = async () => {
    try {
      setLoading(true);
      const data = await getRequest(API.Secure.List);
      if (data && data.data && data.data.length > 0) {
        setData(data.data);
      } else {
        setData([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSecureDataList();
  }, []);

  return (
    <>
      <Text h3>安全审计看板</Text>
      {loading && <Loading />}
      {!loading && <div style={{ minHeight: 400, height: 'calc(100vh - 160px)', overflow: 'auto' }}>
        <Table data={data}>
          <Table.Column prop='secureType' label='安全审计类型' width={120} render={(value) => {
            return (
              <span style={{ color: '#f156ff' }}>{value}</span>
            );
          }} />
          <Table.Column prop='blockIP' label='封禁IP' render={(value) => {
            const arr = value.split('/');
            if (arr.length > 1) {
              return <span>{arr[0]}</span>;
            }
            return <span>{value}</span>;
          }} />
          <Table.Column prop='blockStart' label='封禁时间' />
          <Table.Column prop='blockTime' label='封禁时长(秒)' width={100} render={(value) => {
            return (
              <span style={{ color: '#567cff' }}>{value} sec</span>
            );
          }} />
        </Table>
      </div>}
    </>
  );
}