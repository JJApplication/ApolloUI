import { Button, Card, Grid, Input, Modal, Note, Spacer, Table, Text } from '@geist-ui/core';
import { getRequest, postRequest } from '../../../axios/axios';
import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import { Plus } from '@geist-ui/icons';

export default function() {
  const [envs, setEnvs] = useState([]);
  const [serviceEnv, setServiceEnv] = useState({});
  const [formData, setFormData] = useState([]);

  const [open, setOpen] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);

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
                <Grid xs={24} sm={12} md={8} lg={6} xl={4} key={env}>
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

  const renderFormItem = (item, index) => {
    return (
      <div key={index}>
        <Input label='键' placeholder='环境变量名' value={item.key} onChange={(e) => {
          const newItem = cloneDeep(item);
          console.log(e);
          newItem.key = e.target.value;
          const newFormData = cloneDeep(formData);
          newFormData[index] = newItem;
          setFormData(newFormData);
        }} /><Spacer w={1} inline />
        <Input label='值' placeholder='环境变量' value={item.value} /><Spacer w={1} inline />
        <Input label='描述' placeholder='描述信息' value={item.description} /><Spacer h={1} />
      </div>
    );
  };

  return (
    <>
      <Text h3>环境变量</Text>
      <Note label={'Env Center'}>
        <Text>解析来自配置中心服务Nidavellir的环境变量信息</Text>
      </Note>
      <Spacer h={2} />
      <Grid.Container gap={1.5}>
        <Grid><Button type='default' auto scale={0.625} onClick={getAllEnvs}>刷新</Button></Grid>
        <Grid><Button type='success' auto scale={0.625} onClick={() => setOpenEditor(true)}>新增</Button></Grid>
      </Grid.Container>
      <Spacer h={1} />
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
      <Modal visible={openEditor} onClose={() => {
        // 清除表单
        setFormData([]);
        setOpenEditor(false);
      }} width={'100%'}>
        <Modal.Title>Create Env</Modal.Title>
        <Modal.Content>
          <>
            <Button
              icon={<Plus />}
              scale={0.5}
              onClick={() => {
                const item = cloneDeep(formData);
                item.push({
                  service: '',
                  key: '',
                  value: '',
                  description: '',
                });
                setFormData(item);
              }}>Add</Button>
            <Spacer h={1} />
            <Input label='服务名' placeholder='输入微服务名称' /><Spacer h={1} />
            {formData.map((item, index) => {
              return renderFormItem(item, index);
            })}
          </>
        </Modal.Content>
        <Modal.Action onClick={({ close }) => close()}>提交</Modal.Action>
        <Modal.Action onClick={({ close }) => close()}>关闭</Modal.Action>
      </Modal>
    </>
  );
}