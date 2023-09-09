import { Code, Divider, Spacer, Text } from '@geist-ui/core';

export default function() {
  return (
    <>
      <Text h3>变更历史 Changelogs</Text>
      <Spacer />
      <Divider align='start'>project start</Divider>
      <Text b type={'success'}>2021 - 07</Text>
      <Text>
        Apollo项目的想法起始于2021年, 随着自己编写的微服务数量逐渐增加, 逐个对它们进行手动管理变更越来越麻烦
        于是Apollo项目诞生了, 它的出现就是为了提供一个完整的微服务部署, 管理, 备份, 集中化体验
      </Text>
      <Spacer />
      <Divider align='start'>project published</Divider>
      <Text b type={'success'}>2022</Text>
      <Text>
        正式版本的Apollo发布, 基于<Code style={{ color: '#ff5d7b' }}>Gin</Code>框架编写, 结合<Code
        style={{ color: '#ff5d7b' }}>MongoDB</Code>和其他的微服务基本达到了微服务管理的能力
      </Text>
      <Spacer />
      <Divider align='start'>update to NEXT version</Divider>
      <Text b type={'success'}>2023 - 09</Text>
      <Text>
        体验更加完善的版本Apollo NEXT开始开发
      </Text>
      <Text>
        在<Code style={{ color: '#ff5d7b' }}>NEXT</Code>版本中增加了如下特性:
        <Spacer h={0.5} />
        <Text>- 体验更好的UI设计</Text>
        <Text>- 完整的日志管理</Text>
        <Text>- 完整的服务管理</Text>
        <Text>- 完整的数据库管理</Text>
        <Text>- 更好的备份服务器</Text>
        <Text>- 与其他微服务的无缝对接</Text>
      </Text>
    </>
  );
}