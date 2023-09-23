import { Button, Card, Grid, Spacer, Tag, Text } from '@geist-ui/core';
import { getRequest } from '../../axios/axios';
import { useEffect, useState } from 'react';
import Loading from './Loading';

export default function() {
  const [loading, setLoading] = useState(true);
  const [scripts, setScripts] = useState([]);

  useEffect(() => {
    getScripts();
  }, []);

  const getScripts = () => {
    getRequest('/api/script/list').then(res => {
      setScripts(res.data);
      setLoading(false);
    }).finally(() => {
      setLoading(false);
    });
  };

  const renderCards = () => {
    const list = [];
    scripts.forEach(script => {
      list.push(
        <Grid xl={12} md={8} sm={24} key={script.scriptName}>
          <Card width={'100%'}>
            <Card.Content width={'unset'}>
              <Text h3 type={'secondary'} style={{ margin: '0.5rem 0' }}>脚本详情</Text>
              <Text>脚本 <Spacer inline w={1} /><Tag type={'lite'}>{script.script}</Tag></Text>
              <Text>脚本名称: <Spacer inline w={1} /><Text span b type={'success'}>{script.scriptName}</Text></Text>
              <Text>脚本描述: <Spacer inline w={1} /><Text span>{script.scriptDes}</Text></Text>
              <Text>工作目录: <Spacer inline w={1} /><Text span>{script.workdir || './'}</Text></Text>
              <Text>环境变量: <Spacer inline w={1} /><Text span>{script.envsAdd.join(' ')}</Text></Text>
              <Text>输入参数: <Spacer inline w={1} /><Text span>{script.args.join(' ')}</Text></Text>
              <Spacer />
              <Button type={'secondary'} auto scale={3 / 4}>执行</Button>
            </Card.Content>
          </Card>
        </Grid>,
      );
    });
    return list;
  };

  return (
    <>
      <Text h3>脚本管理</Text>
      {loading && <Loading />}
      {!loading &&
        <Grid.Container gap={2}>
          {renderCards()}
        </Grid.Container>
      }
    </>
  );
}