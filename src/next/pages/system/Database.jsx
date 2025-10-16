import { Card, Code, Dot, Grid, Modal, Spacer, Spinner, Table, Text } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { getRequest } from '../../../axios/axios';
import { useNavigate } from 'react-router-dom';
import { Database } from '@geist-ui/icons';
import { result } from 'es-toolkit/compat';

export default function () {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [dbs, setDbs] = useState([]);
  const [db, setDb] = useState([]);

  useEffect(() => {
    getDatabase();
  }, []);

  const getDatabase = async () => {
    try {
      setIsLoading(true);
      const data = await getRequest('/api/database/list');
      if (data && data.data?.length > 0) {
        // 排序
        data.data.sort((a, b) => {
          if (a.name < b.name) return -1;
          else if (a.name > b.name) return 1;
          else return 0;
        });
        setDbs(data.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getDb = async (name) => {
    const data = await getRequest(`/api/database?name=${name}`);
    if (!data || !data.data) {
      throw Error(`Data not found: ${name}`);
    }
    setDb(data.data);
  };

  const showDbInfo = async (name) => {
    try {
      await getDb(name);
      setShow(true);
    } catch (e) {
      setShow(false);
    }
  };

  const renderDbs = () => {
    return dbs.map((db) => {
      let path = db.path;
      const paths = db.path.split('/');
      if (paths.length > 1) {
        path = paths[paths.length - 1];
      }
      return (
        <Grid xs={24} sm={12} md={8} lg={6} xl={4} direction={'column'} key={db.name}>
          <Card shadow width='100%'>
            <Card.Content style={{ width: 'unset', paddingBottom: '1rem' }}>
              <Text h2 my={0} onClick={() => showDbInfo(db.name)} style={{ cursor: 'pointer' }}>
                <Database size={18} />
                <Spacer inline w={1} />
                {db.name}
              </Text>
              <Text>数据库路径: {path}</Text>
              <Text style={{ minHeight: '3rem', wordBreak: 'break-all' }}>数据库路径: {db.path}</Text>
            </Card.Content>
            <Card.Footer style={{ padding: '0 1rem' }}>
              <Text span>
                <Dot type={'success'}>{db.type}</Dot>
              </Text>
            </Card.Footer>
          </Card>
        </Grid>
      );
    });
  };

  const renderData = (value, data, index) => {
    if (value) {
      const result = value.join(',');
      return (
        <Code
          style={{
            width: '280px',
            textOverflow: 'ellipsis',
            whiteSpace: 'wrap',
            wordBreak: 'break-all',
            overflow: 'hidden',
          }}>
          {result}
        </Code>
      );
    }
    return <Code>-</Code>;
  };

  const calcSize = (byte) => {
    const KB = 1024;
    const MB = 1024 * KB;
    const GB = 1024 * MB;
    if (byte / GB > 1) {
      return `${(byte / GB).toFixed(2)} gb`;
    } else if (byte / MB > 1) {
      return `${(byte / MB).toFixed(2)} mb`;
    } else if (byte / KB > 1) {
      return `${(byte / KB).toFixed(2)} kb`;
    }
    return `${byte} b`;
  };

  const calcTime = (time) => {
    const date = new Date(Number(time * 1000));
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <>
      <Text h3>数据管理</Text>
      <Spacer />
      <Card width={'100%'} className={'database'}>
        {isLoading ? (
          <Spinner scale={2} style={{ margin: '0 auto' }} />
        ) : (
          <Card.Content width={'unset'}>
            <Grid.Container gap={2}>{renderDbs()}</Grid.Container>
          </Card.Content>
        )}
      </Card>
      <Modal visible={show} onClose={() => setShow(false)} width={'640px'}>
        <Card>
          <Card.Content style={{ width: 'unset' }}>
            <Text h3 my={0} className={'db-title'}>
              数据库详情
            </Text>
            <div style={{ textAlign: 'left', width: '100%' }}>
              <Text>创建时间: {calcTime(db.create_time)}</Text>
              <Text>更新时间: {calcTime(db.update_time)}</Text>
              <Text>文件大小: {calcSize(db.db_size)}</Text>
              <Table data={db.table}>
                <Table.Column prop='name' label='表名' />
                <Table.Column prop='busy_timeout' label='超时' width={50} />
                <Table.Column prop='rows' label='数据行' width={50} />
                <Table.Column prop='columns' label='列名' width={280} render={renderData} />
              </Table>
            </div>
          </Card.Content>
        </Card>
      </Modal>
    </>
  );
}
