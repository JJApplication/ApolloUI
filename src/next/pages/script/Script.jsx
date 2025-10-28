import { Button, Card, Grid, Input, Modal, Spacer, Tag, Text } from '@geist-ui/core';
import { getRequest, postRequest } from '../../../axios/axios';
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import { Toast } from '../toast';
import { API } from '../../../api/api';

export default function() {
  const [loading, setLoading] = useState(true);
  const [scripts, setScripts] = useState([]);
  const [execScript, setExecScript] = useState({
    open: false,
    scriptName: '',
    args: ''
  });

  useEffect(() => {
    getScripts();
  }, []);

  const getScripts = () => {
    getRequest(API.Script.List).then(res => {
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
              <Button type={'secondary'} auto scale={3 / 4} onClick={() => {
                setExecScript({
                  open: true,
                  scriptName: script.scriptName,
                  args: '',
                })
              }}>执行</Button>
            </Card.Content>
          </Card>
        </Grid>,
      );
    });
    return list;
  };

  const execRun = () => {
    postRequest(API.Script.Start, {
      script: execScript.scriptName,
      args: execScript.args,
    }).then(res => {
      if (res.status === 'ok') {
        Toast.success('脚本执行成功')
      } else {
        Toast.error('脚本执行失败')
      }
    })
  }

  return (
    <>
      <Text h3>脚本管理</Text>
      {loading && <Loading />}
      {!loading &&
        <Grid.Container gap={2}>
          {renderCards()}
        </Grid.Container>
      }
      <Modal visible={execScript.open} onClose={() => setExecScript({open: false})}>
        <Modal.Title>执行脚本</Modal.Title>
        <Modal.Content>
          <Input label={'脚本名称'} disabled width={'100%'} value={execScript.scriptName}></Input>
          <Spacer h={1} />
          <Input label={'参数'}  width={'100%'} value={execScript.args} onChange={e => {
            setExecScript({
              scriptName: execScript.scriptName,
              args: e.target.value,
              open: true,
            })
          }}></Input>
        </Modal.Content>
        <Modal.Action>
          <Button type={'secondary-light'} onClick={() => {execRun()}}>执行</Button>
        </Modal.Action>
      </Modal>
    </>
  );
}