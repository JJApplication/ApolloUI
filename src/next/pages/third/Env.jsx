import { Button, Card, Grid, Modal, Note, Spacer, Table, Text } from '@geist-ui/core';
import { getRequest, postRequest } from '../../../axios/axios';
import { useEffect, useState } from 'react';

export default function() {
  const [envs, setEnvs] = useState([]);
  const [serviceEnv, setServiceEnv] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllEnvs();
  }, []);

  const getAllEnvs = () => {
    apiGetAllEnvs().then((res) => {
      if (res.data) {
        setEnvs(res.data);
      }
    });
  };

  const apiGetAllEnvs = async () => {
    return await getRequest(`/api/env/list`);
  };

  const apiGetEnv = async (serviceName) => {
    const params = { service: serviceName };
    return await postRequest(`/api/env/show`, null, params);
  };

  const handleOpen = (service) => {
    if (!service) {
      return;
    }
    // API
    apiGetEnv(service).then((res) => {
      if (res.data) {
        setServiceEnv({ service: service, data: res.data });
        setOpen(true);
      }
    });
  };

  const renderCards = () => {
    if (envs.length > 0) {
      return (
        <Grid.Container gap={2} justify='flex-start'>
          {
            envs.map((env) => {
              return (
                <Grid xs={24} sm={12} md={8} lg={6} xl={4}>
                  <Card key={env} type='default' shadow>
                    <Card.Content style={{ padding: '0.5 2rem', width: '200px' }}>
                      <Text h2>{env}</Text>
                      <Button auto type='success' scale={1 / 2} onClick={() => handleOpen(env)}>查看详情</Button>
                      <Spacer width={0.5} inline />
                      <Button auto type='error' scale={1 / 2}>删除配置</Button>
                    </Card.Content>
                  </Card>
                </Grid>
              );
            })
          }
        </Grid.Container>
      );
    }
  };

  return (
    <>
      <Text h3>环境变量</Text>
      <Note label={'Env Center'}>
        <Text>解析来自配置中心服务Nidavellir的环境变量信息</Text>
      </Note>
      <Spacer h={2} />
      {renderCards()}
      <Modal visible={open} onClose={() => setOpen(false)} width={'100%'}>
        <Modal.Title>Env - {serviceEnv.service}</Modal.Title>
        <Modal.Content>
          <Table data={Object.values(serviceEnv.data || {})}>
            <Table.Column prop='service_name' label='service' />
            <Table.Column prop='key' label='key' />
            <Table.Column prop='value' label='value' />
            <Table.Column prop='description' label='description' />
          </Table>
        </Modal.Content>
        <Modal.Action onClick={({ close }) => close()}>关闭</Modal.Action>
      </Modal>
    </>
  );
}