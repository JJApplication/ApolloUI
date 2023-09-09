import { Divider, Link, Spacer, Text } from '@geist-ui/core';
import urls from '../../urls';

export default function() {
  return (
    <>
      <Text h1>关于Apollo</Text>
      <Text>
        专供JJAPP的微服务管理应用 by <Link color href={urls.Home}>renj.io</Link>
      </Text>
      <Text h3 b type={'success'}>
        环境依赖
      </Text>
      <Text span b>x86/amd64 ARCH</Text><Spacer />
      <Text span b>MongoDB</Text><Spacer />
      <Text span b>NSQ</Text><Spacer />
      <Text span b>Docker CE</Text><Spacer />
      <Text h3 b type={'success'}>
        Apollo运行时依赖
      </Text>
      <Text span b>OctopusTree</Text><Spacer />
      <Text span b>OctopusTwig</Text><Spacer />
      <Text span b>Sandwich</Text><Spacer />
      <Text span b>Plnack-proto</Text><Spacer />
      <Spacer h={0.5} />
      <Text p b>
        Powered by <Link color href={urls.JJApplication}>JJApplication</Link>
      </Text>
      <Text p b>
        Copyright © <Link color href={urls.Landers1037}>Landers1037</Link>
      </Text>


      <Divider h={2} style={{ margin: '5rem 0' }}>
        基于<Link href={urls.Geist} color target='_blank'>Geist-UI</Link>构建
      </Divider>
    </>
  );
}