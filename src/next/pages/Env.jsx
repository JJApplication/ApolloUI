import { Grid, Note, Spacer, Text } from '@geist-ui/core';
import { useNavigate } from 'react-router-dom';

export default function() {
  const nav = useNavigate();

  const renderCards = () => {
    const list = [];
    return list;
  };

  return (
    <>
      <Text h3>环境变量</Text>
      <Note label={'来自全局配置中心TWT'}>
        <Text>解析来自配置中心服务The-World-Tree的环境变量信息</Text>
      </Note>
      <Spacer h={2} />
      <Grid.Container gap={2}>
        {renderCards()}
      </Grid.Container>
    </>
  );
}