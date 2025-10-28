import { useEffect, useState } from 'react';
import { getRequest } from '../../../axios/axios';
import { API } from '../../../api/api';
import { Capacity, Card, Grid, Spacer, Text } from '@geist-ui/core';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';

export default function () {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  const getAppProcessList = () => {
    setLoading(true);
    getRequest(API.Panel.APIProcessList)
      .then((res) => {
        if (!res.data) {
          return;
        }
        const array = Object.keys(res.data).map((item) => {
          return {
            app: item,
            process: res.data[item],
          };
        });
        array.sort((a, b) => {
          return a.app - b.app;
        });
        setList(array);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAppProcessList();
  }, []);

  const renderProcessList = () => {
    return list.map((item) => {
      return (
        <Grid xl={4} md={6} sm={12} key={item?.app}>
          <Card width={'100%'}>
            <Card.Content width={'unset'}>
              <Text
                onClick={() => navigate(`${item?.app}`)}
                style={{
                  color: '#4337e5',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}>
                {item?.app}
              </Text>
              <Text>PID: {item?.process?.pid}</Text>
              <Text>
                <Text span>
                  CPU占用: <Capacity style={{ display: 'inline-block' }} value={100 * item?.process?.cpuPercent} />
                </Text>
                <Spacer w={0.5} inline />
                <Text span>
                  内存占用: <Capacity style={{ display: 'inline-block' }} value={100 * item?.process?.memPercent} />
                </Text>
              </Text>
              <Text>
                磁盘IO{' '}
                <Text span style={{ color: '#00a61e' }}>
                  READ {item?.process?.readCount}
                </Text>
                <Spacer w={0.5} inline />
                <Text span style={{ color: '#958dfa' }}>
                  WRITE {item?.process?.writeCount}
                </Text>
              </Text>
            </Card.Content>
          </Card>
        </Grid>
      );
    });
  };

  const renderEmpty = () => {
    return <Text>进程信息统计中</Text>;
  };

  return (
    <>
      <Text h3>服务进程看板</Text>
      {loading && <Loading />}
      {!loading && (
        <>{list && list.length > 0 ? <Grid.Container gap={2}>{renderProcessList()}</Grid.Container> : renderEmpty()}</>
      )}
    </>
  );
}
