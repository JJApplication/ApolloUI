import { Button, Code, Dot, Input, Spacer, Table, Tabs, Text } from '@geist-ui/core';
import { Hexagon, Layers, PauseFill, PlayFill, XCircleFill } from '@geist-ui/icons';
import { getRequest, postRequest } from '../../axios/axios';
import { convertTime, covertFileSize } from '../../utils';
import notifySync from '../../logger/notify';
import { useEffect, useState } from 'react';

export default function() {

  const [containers, setContainers] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getContainers();
  }, []);

  const stateDot = {
    'color': 'red',
  };
  const changeTab = (tab) => {
    switch (tab) {
      case 'image':
        getImages();
        break;
      case 'container':
        getContainers();
        break;
      default:
        break;
    }
  };

  const getContainers = () => {
    getRequest('/api/container/containers').then(res => {
      if (res.data) {
        setContainers(modifyContainers(res.data));
      }
    });
  };

  const getImages = () => {
    getRequest('/api/container/images').then(res => {
      if (res.data) {
        setImages(modifyImages(res.data));
      }
    });
  };

  // 整理数据渲染
  const modifyContainers = (data) => {
    const res = [];
    data.forEach(d => {
      const c = {
        name: d.Names ? d.Names[0] : '-',
        id: <Input readOnly initialValue={d.Id} title={d.Id} className='container-id' />,
        image: <Code>{d.Image}</Code>,
        imageId: <Input readOnly initialValue={d.ImageID} className='container-id' title={d.ImageID} />,
        create: convertTime(d.Created),
        status: d.Status,
        state: (d.State === 'running' ? <Dot type='success' /> : <Dot type='error' />),
        operation: '',
      };
      res.push(c);
    });
    return res;
  };

  const modifyImages = (data) => {
    const res = [];
    data.forEach(d => {
      const c = {
        name: d.RepoTags ? d.RepoTags[0] : '-',
        id: <Input readOnly initialValue={d.Id} width='28rem' title={d.Id} />,
        create: convertTime(d.Created),
        containers: d.Containers,
        size: <Code>{covertFileSize(d.Size)}</Code>,
      };
      res.push(c);
    });
    return res;
  };

  // 渲染操作按钮
  const operationBtn = (value, rowData, index) => {
    return (
      <>
        <Button auto type='success' scale={0.4} width='.8rem' icon={<PlayFill />}
                onClick={startC(value, rowData, index)} /><Spacer
        inline w={0.25} />
        <Button type='secondary' scale={0.4} width='.8rem' icon={<PauseFill />}
                onClick={stopC(value, rowData, index)} /><Spacer inline w={0.25} />
        <Button type='error' scale={0.4} width='.8rem' icon={<XCircleFill />}
                onClick={removeC(value, rowData, index)} />
      </>
    );
  };

  // 按钮操作
  const startC = (value, rowData, index) => {
    return () => {
      const id = rowData.id.props.initialValue;
      postRequest(`/api/container/start?id=${id}`).then(res => {
        if (res.status === 'ok') {
          notifySync(`容器${rowData.name}启动成功`, 'success');
          getContainers();
        } else {
          notifySync(`容器${rowData.name}启动失败`, 'error');
          getContainers();
        }
      });
    };
  };

  const stopC = (value, rowData, index) => {
    return () => {
      const id = rowData.id.props.initialValue;
      postRequest(`/api/container/stop?id=${id}`).then(res => {
        if (res.status === 'ok') {
          notifySync(`容器${rowData.name}停止成功`, 'success');
          getContainers();
        } else {
          notifySync(`容器${rowData.name}停止失败`, 'error');
          getContainers();
        }
      });
    };
  };

  const removeC = (value, rowData, index) => {
    return () => {
      const id = rowData.id.props.initialValue;
      postRequest(`/api/container/remove?id=${id}`).then(res => {
        if (res.status === 'ok') {
          notifySync(`容器${rowData.name}删除成功`, 'success');
          getContainers();
        } else {
          notifySync(`容器${rowData.name}删除失败`, 'error');
          getContainers();
        }
      });
    };
  };

  return (
    <>
      <Text h3>容器管理</Text>
      <Tabs initialValue='container' hideDivider hideBorder onChange={changeTab}>
        <Tabs.Item label={<><Hexagon />容器</>} value='container'>
          <Table data={containers}>
            <Table.Column prop='name' label='name' />
            <Table.Column prop='id' label='container id' />
            <Table.Column prop='image' label='image' />
            <Table.Column prop='imageId' label='image id' />
            <Table.Column prop='create' label='create' />
            <Table.Column prop='status' label='status' />
            <Table.Column prop='state' label='state' />
            <Table.Column prop='operation' label='operation' render={operationBtn} />
          </Table>
        </Tabs.Item>
        {/*镜像不可操作*/}
        <Tabs.Item label={<><Layers />镜像</>} value='image'>
          <Table data={images}>
            <Table.Column prop='name' label='name' />
            <Table.Column prop='id' label='image id' />
            <Table.Column prop='size' label='size' />
            <Table.Column prop='create' label='create' />
            <Table.Column prop='containers' label='containers' />
          </Table>
        </Tabs.Item>
      </Tabs>
    </>
  );
}