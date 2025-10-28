import { useNavigate, useParams } from 'react-router-dom';
import { getRequest } from '../../../axios/axios';
import { API, Route } from '../../../api/export';
import { useEffect, useState } from 'react';
import { Button, Capacity, Card, Grid, Spacer, Text } from '@geist-ui/core';
import Loading from '../Loading';
import { ArrowLeft } from '@geist-ui/icons';
import { Line } from 'react-chartjs-2';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

export default function () {
  const navigate = useNavigate();
  const params = useParams();
  const { name } = params;
  const [loading, setLoading] = useState(true);
  const [appProcess, setAppProcess] = useState({});
  const [appProcessHistory, setAppProcessHistory] = useState([]);

  const getAppProcess = (name) => {
    setLoading(true);
    getRequest(API.Panel.APIProcess, { name: name })
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setAppProcessHistory(res.data);
          setAppProcess(res.data[res.data.length - 1]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAppProcess(name);
  }, []);

  const getAppCpuHistory = () => {
    if (appProcessHistory.length <= 0) {
      return null;
    }
    const cpuHist = appProcessHistory.map((history) => {
      return history?.cpuPercent;
    });
    return {
      labels: cpuHist.map((_, index) => index),
      datasets: [
        {
          label: 'cpu',
          data: cpuHist,
          borderColor: 'rgb(53,159,235)',
          backgroundColor: 'rgba(53,105,235,0.5)',
        },
      ],
    };
  };

  const getAppMemHistory = () => {
    if (appProcessHistory.length <= 0) {
      return null;
    }
    const memHist = appProcessHistory.map((history) => {
      return history?.memPercent;
    });
    return {
      labels: memHist.map((_, index) => index),
      datasets: [
        {
          label: 'mem',
          data: memHist,
          borderColor: 'rgb(174,53,235)',
          backgroundColor: 'rgba(174,53,235,0.5)',
        },
      ],
    };
  };

  const getAppMemLoadHistory = () => {
    if (appProcessHistory.length <= 0) {
      return null;
    }
    const memLoad = appProcessHistory.map((history) => {
      return history?.memRss / 1024 / 1024;
    });

    return {
      labels: memLoad.map((_, index) => index),
      datasets: [
        {
          label: 'mem load(MB)',
          data: memLoad,
          borderColor: 'rgb(235,183,53)',
          backgroundColor: 'rgba(235,162,53,0.5)',
        },
      ],
    };
  };

  const getAppIOHistory = () => {
    if (appProcessHistory.length <= 0) {
      return null;
    }
    const ioHist = appProcessHistory.map((history) => {
      return history?.readBytes;
    });
    const totalReadBytes = appProcessHistory.map((d) => Math.round(d['readBytes'] / 1024 / 1024));
    const totalWriteBytes = appProcessHistory.map((d) => Math.round(d['writeBytes'] / 1024 / 1024));
    return {
      labels: ioHist.map((_, index) => index),
      datasets: [
        {
          label: 'read(MB)',
          data: totalReadBytes,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'write(MB)',
          data: totalWriteBytes,
          borderColor: 'rgb(53,235,62)',
          backgroundColor: 'rgba(53,235,62, 0.5)',
        },
      ],
    };
  };

  return (
    <>
      <Button
        auto
        iconRight={<ArrowLeft />}
        px={0.8}
        scale={3 / 4}
        marginRight={'1rem'}
        onClick={() => navigate(Route.Next.PanelApp)}></Button>
      <Text h3>服务进程 {name}</Text>
      {loading && <Loading />}
      {!loading && (
        <>
          <Card width={'100%'}>
            <Card.Content width={'unset'}>
              <Text>PID: {appProcess?.pid}</Text>
              <Text>
                <Text span>
                  CPU占用: <Capacity style={{ display: 'inline-block' }} value={100 * appProcess?.cpuPercent} />
                </Text>
                <Spacer w={0.5} inline />
                <Text span>
                  内存占用: <Capacity style={{ display: 'inline-block' }} value={100 * appProcess?.memPercent} />
                </Text>
              </Text>
              <Text>
                磁盘IO{' '}
                <Text span style={{ color: '#00a61e' }}>
                  READ {appProcess?.readCount}
                </Text>
                <Spacer w={0.5} inline />
                <Text span style={{ color: '#958dfa' }}>
                  WRITE {appProcess?.writeCount}
                </Text>
              </Text>
              <Text>网络连接数: {appProcess?.netConnections}</Text>
              <Text>线程数: {appProcess?.threads}</Text>
            </Card.Content>
          </Card>
          <Spacer />
          <Card width={'100%'}>
            <Card.Content width={'unset'}>
              <Grid.Container gap={6}>
                <Grid xs={12} direction={'column'} style={{ width: '100%', height: '320px' }}>
                  <Text>
                    CPU负载
                    <Spacer w={0.5} inline />
                  </Text>
                  {loading ? <Loading spaceRatio={2} /> : <Line options={options} data={getAppCpuHistory()} />}
                </Grid>
                <Grid xs={12} direction={'column'} style={{ width: '100%', height: '320px' }}>
                  <Text>
                    内存负载
                    <Spacer w={0.5} inline />
                  </Text>
                  {loading ? <Loading spaceRatio={2} /> : <Line options={options} data={getAppMemHistory()} />}
                </Grid>
                <Grid xs={12} direction={'column'} style={{ width: '100%', height: '320px' }}>
                  <Text>
                    内存占用
                    <Spacer w={0.5} inline />
                  </Text>
                  {loading ? <Loading spaceRatio={2} /> : <Line options={options} data={getAppMemLoadHistory()} />}
                </Grid>
                <Grid xs={12} direction={'column'} style={{ width: '100%', height: '320px' }}>
                  <Text>
                    IO负载(读写量)
                    <Spacer w={0.5} inline />
                  </Text>
                  {loading ? <Loading spaceRatio={2} /> : <Line options={options} data={getAppIOHistory()} />}
                </Grid>
              </Grid.Container>
            </Card.Content>
          </Card>
        </>
      )}
    </>
  );
}
