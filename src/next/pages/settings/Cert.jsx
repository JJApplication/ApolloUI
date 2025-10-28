import { Button, Card, Grid, Input, Link, Note, Spacer, Text } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { getRequest } from '../../../axios/axios';
import { Toast } from '../toast';
import { API } from '../../../api/api';

export default function() {
  const [certInfo, setCertInfo] = useState({
    ca: '',
    algorithm: '',
    name: '',
    start: '',
    end: '',
  });

  useEffect(() => {
    getCertInfo();
  }, []);

  const getCertInfo = () => {
    getRequest(API.System.Cert).then(res => {
      if (res.data) {
        setCertInfo(res.data);
        Toast.success('证书信息加载成功');
      } else {
        Toast.error('证书信息加载失败');
      }
    }).catch(() => {
      Toast.error('证书信息加载失败');
    });
  };

  const renewCert = () => {
    Toast.warn('证书刷新必须在服务器执行');
  };

  return (
    <>
      <Text h3>证书配置</Text>
      <Note label={'证书信息'}>
        <Text>微服务集群使用同一套SSL证书链 由<Link href={'https://letsencrypt.org'}>Let's
          Encrypt提供</Link></Text>
      </Note>
      <Spacer h={2} />
      <Card width={'100%'}>
        <Card.Content width={'unset'}>
          <Grid.Container gap={10}>
            <Grid xs={24} direction={'column'}>
              <Input label='证书CA' disabled width='100%' value={certInfo.ca} /><Spacer h={0.75} />
              <Input label='签名算法' disabled width='100%' value={certInfo.algorithm} /><Spacer h={0.75} />
              <Input label='注册域名' disabled width='100%' value={certInfo.name} /><Spacer h={0.75} />
              <Input label='注册时间' disabled width='100%' value={certInfo.start} /><Spacer h={0.75} />
              <Input label='到期时间' disabled width='100%' value={certInfo.end} /><Spacer h={0.75} />
            </Grid>
          </Grid.Container>
          <Spacer h={0.75} />
          <Button type='success-light' onClick={getCertInfo} scale={3 / 4}>刷新证书信息</Button>
          <Spacer w={1} inline />
          <Button type='secondary-light' onClick={renewCert} scale={3 / 4}>申请刷新证书</Button>
        </Card.Content>
      </Card>
    </>
  );
}