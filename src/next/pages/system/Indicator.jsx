import { Button, Card, Grid, Input, Loading, Spacer, Text } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { getRequest } from '../../../axios/axios';
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
import { Line } from 'react-chartjs-2';
import { RefreshCw } from '@geist-ui/icons';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

export default function Indicator() {
  // 只读配置 运行时配置 软重启配置分开
  const [sysInfo, setSysInfo] = useState({});
  const [load, setLoad] = useState([]);
  const [cpu, setCpu] = useState([]);
  const [mem, setMem] = useState([]);
  const [io, setIO] = useState([]);
  const [net, setNet] = useState([]);

  const [loadLoading, setLoadLoading] = useState(false);
  const [cpuLoading, setCpuLoading] = useState(false);
  const [memLoading, setMemLoading] = useState(false);
  const [ioLoading, setIOLoading] = useState(false);
  const [netLoading, setNetLoading] = useState(false);

  useEffect(() => {
    getSystemInfo().then((data) => {
      setSysInfo(data);
    });
    getIndicatorLoad();
    getIndicatorCpu();
    getIndicatorMem();
    getIndicatorIO();
    getIndicatorNet();
  }, []);

  const getSystemInfo = async () => {
    const data = await getRequest('/api/indicator/sys');
    return data.data;
  };

  const getIndicatorLoad = async () => {
    setLoadLoading(true);
    try {
      const data = await getRequest('/api/indicator/load');
      setLoad(data.data);
    } finally {
      setLoadLoading(false);
    }
  };

  const getIndicatorCpu = async () => {
    setCpuLoading(true);
    try {
      const data = await getRequest('/api/indicator/cpu');
      setCpu(data.data);
    } finally {
      setCpuLoading(false);
    }
  };

  const getIndicatorMem = async () => {
    setMemLoading(true);
    try {
      const data = await getRequest('/api/indicator/mem');
      setMem(data.data);
    } finally {
      setMemLoading(false);
    }
  };

  const getIndicatorIO = async () => {
    setIOLoading(true);
    try {
      const data = await getRequest('/api/indicator/io');
      setIO(data.data);
    } finally {
      setIOLoading(false);
    }
  };

  const getIndicatorNet = async () => {
    setNetLoading(true);
    try {
      const data = await getRequest('/api/indicator/network');
      setNet(data.data);
    } finally {
      setNetLoading(false);
    }
  };

  // 计算数据集
  const getLoadDatasets = () => {
    const minute1 = load.map((d) => Math.round(d['minute1'] * 100));
    const minute5 = load.map((d) => Math.round(d['minute5'] * 100));
    const minute15 = load.map((d) => Math.round(d['minute15'] * 100));
    return {
      labels: load.map((_, index) => index),
      datasets: [
        {
          label: '1min',
          data: minute1,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: '5min',
          data: minute5,
          borderColor: 'rgb(53,235,62)',
          backgroundColor: 'rgba(53,235,62, 0.5)',
        },
        {
          label: '15min',
          data: minute15,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };
  };

  const getCpuDatasets = () => {
    const percent = cpu.map((d) => d['percent']);
    return {
      labels: cpu.map((_, index) => index),
      datasets: [
        {
          label: 'cpu load',
          data: percent,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
  };

  const getMemLoadDatasets = () => {
    const percent = mem.map((d) => Math.round(d['percent']));
    return {
      labels: mem.map((_, index) => index),
      datasets: [
        {
          label: 'mem load',
          data: percent,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
  };

  const getMemDatasets = () => {
    const free = mem.map((d) => Math.round(d['free'] / 1024 / 1024));
    const available = mem.map((d) => Math.round(d['available'] / 1024 / 1024));
    const used = mem.map((d) => Math.round(d['used'] / 1024 / 1024));
    const cached = mem.map((d) => Math.round(d['cached'] / 1024 / 1024));
    return {
      labels: mem.map((_, index) => index),
      datasets: [
        {
          label: 'free',
          data: free,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'avail',
          data: available,
          borderColor: 'rgb(53,235,62)',
          backgroundColor: 'rgba(53,235,62, 0.5)',
        },
        {
          label: 'used',
          data: used,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'cached',
          data: cached,
          borderColor: 'rgb(198,99,255)',
          backgroundColor: 'rgba(198,99,255, 0.5)',
        },
      ],
    };
  };

  const getIOBytesDatasets = () => {
    const totalReadBytes = io.map((d) => Math.round(d['totalReadBytes'] / 1024 / 1024 / 1024));
    const totalWriteBytes = io.map((d) => Math.round(d['totalWriteBytes'] / 1024 / 1024 / 1024));
    return {
      labels: io.map((_, index) => index),
      datasets: [
        {
          label: 'read(GB)',
          data: totalReadBytes,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'write(GB)',
          data: totalWriteBytes,
          borderColor: 'rgb(53,235,62)',
          backgroundColor: 'rgba(53,235,62, 0.5)',
        },
      ],
    };
  };

  const getIOCountDatasets = () => {
    const totalReadCount = io.map((d) => Math.round(d['totalReadCount']));
    const totalWriteCount = io.map((d) => Math.round(d['totalWriteCount']));
    const ioTime = io.map((d) => Math.round(d['ioTime']));
    return {
      labels: io.map((_, index) => index),
      datasets: [
        {
          label: 'read',
          data: totalReadCount,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'write',
          data: totalWriteCount,
          borderColor: 'rgb(53,235,62)',
          backgroundColor: 'rgba(53,235,62, 0.5)',
        },
        {
          label: 'io time',
          data: ioTime,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };
  };

  const getNetworkDatasets = () => {
    const byteRecv = net.map((d) => Math.round(d['byteRecv'] / 1024 / 1024 / 1024));
    const byteSent = net.map((d) => Math.round(d['byteSent'] / 1024 / 1024 / 1024));
    return {
      labels: net.map((_, index) => index),
      datasets: [
        {
          label: 'recv(GB)',
          data: byteRecv,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'sent(GB)',
          data: byteSent,
          borderColor: 'rgb(53,235,62)',
          backgroundColor: 'rgba(53,235,62, 0.5)',
        },
      ],
    };
  };

  const getNetworkPackDatasets = () => {
    const packetsRecv = net.map((d) => Math.round(d['packetsRecv'] / 1024 / 1024));
    const packetsSent = net.map((d) => Math.round(d['packetsSent'] / 1024 / 1024));
    return {
      labels: net.map((_, index) => index),
      datasets: [
        {
          label: 'recv',
          data: packetsRecv,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'sent',
          data: packetsSent,
          borderColor: 'rgb(53,235,62)',
          backgroundColor: 'rgba(53,235,62, 0.5)',
        },
      ],
    };
  };

  return (
    <>
      <Text h3>性能指标</Text>
      <Spacer />
      <Card width={'100%'}>
        <Card.Content width={'unset'}>
          <Grid.Container gap={10}>
            <Grid xs={12} direction={'column'}>
              <Input label='操作系统' disabled width='100%' value={sysInfo.platform} />
              <Spacer h={1} />
              <Input label='版本信息' disabled width='100%' value={sysInfo.version} />
            </Grid>
            <Grid xs={12} direction={'column'}>
              <Input label='所属家族' disabled width='100%' value={sysInfo.family} />
              <Spacer h={1} />
              <Input label='内核版本' disabled width='100%' value={sysInfo.kernel} />
            </Grid>
          </Grid.Container>
        </Card.Content>
      </Card>
      <Spacer />
      <Card width={'100%'}>
        <Card.Content width={'unset'}>
          <Grid.Container gap={6}>
            <Grid xs={12} direction={'column'} style={{ width: '100%', height: '440px' }}>
              <Text>
                系统负载
                <Spacer w={0.5} inline />
                <Button shadow auto scale={1 / 2} px={0.5} icon={<RefreshCw />} onClick={getIndicatorLoad}></Button>
              </Text>
              {loadLoading ? <Loading spaceRatio={2} /> : <Line options={options} data={getLoadDatasets()} />}
            </Grid>
            <Grid xs={12} direction={'column'} style={{ width: '100%', height: '440px' }}>
              <Text>
                CPU负载
                <Spacer w={0.5} inline />
                <Button shadow auto scale={1 / 2} px={0.5} icon={<RefreshCw />} onClick={getIndicatorCpu}></Button>
              </Text>
              {cpuLoading ? <Loading spaceRatio={2} /> : <Line options={options} data={getCpuDatasets()} />}
            </Grid>
            <Grid xs={12} direction={'column'} style={{ width: '100%', height: '440px' }}>
              <Text>
                内存负载
                <Spacer w={0.5} inline />
                <Button shadow auto scale={1 / 2} px={0.5} icon={<RefreshCw />} onClick={getIndicatorMem}></Button>
              </Text>
              {memLoading ? <Loading spaceRatio={2} /> : <Line options={options} data={getMemLoadDatasets()} />}
            </Grid>
            <Grid xs={12} direction={'column'} style={{ width: '100%', height: '440px' }}>
              <Text>
                内存占用
                <Spacer w={0.5} inline />
                <Button shadow auto scale={1 / 2} px={0.5} icon={<RefreshCw />} onClick={getIndicatorMem}></Button>
              </Text>
              {memLoading ? <Loading spaceRatio={2} /> : <Line options={options} data={getMemDatasets()} />}
            </Grid>
            <Grid xs={12} direction={'column'} style={{ width: '100%', height: '440px' }}>
              <Text>
                IO负载(读写量)
                <Spacer w={0.5} inline />
                <Button shadow auto scale={1 / 2} px={0.5} icon={<RefreshCw />} onClick={getIndicatorIO}></Button>
              </Text>
              {ioLoading ? <Loading spaceRatio={2} /> : <Line options={options} data={getIOBytesDatasets()} />}
            </Grid>
            <Grid xs={12} direction={'column'} style={{ width: '100%', height: '440px' }}>
              <Text>
                IO负载(读写次数)
                <Spacer w={0.5} inline />
                <Button shadow auto scale={1 / 2} px={0.5} icon={<RefreshCw />} onClick={getIndicatorIO}></Button>
              </Text>
              {ioLoading ? <Loading spaceRatio={2} /> : <Line options={options} data={getIOCountDatasets()} />}
            </Grid>
            <Grid xs={12} direction={'column'} style={{ width: '100%', height: '440px' }}>
              <Text>
                网络流量
                <Spacer w={0.5} inline />
                <Button shadow auto scale={1 / 2} px={0.5} icon={<RefreshCw />} onClick={getIndicatorNet}></Button>
              </Text>
              {netLoading ? <Loading spaceRatio={2} /> : <Line options={options} data={getNetworkDatasets()} />}
            </Grid>
            <Grid xs={12} direction={'column'} style={{ width: '100%', height: '440px' }}>
              <Text>
                数据包流量
                <Spacer w={0.5} inline />
                <Button shadow auto scale={1 / 2} px={0.5} icon={<RefreshCw />} onClick={getIndicatorNet}></Button>
              </Text>
              {netLoading ? <Loading spaceRatio={2} /> : <Line options={options} data={getNetworkPackDatasets()} />}
            </Grid>
          </Grid.Container>
        </Card.Content>
      </Card>
    </>
  );
}
