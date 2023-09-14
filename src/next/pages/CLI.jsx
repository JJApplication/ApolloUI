import { Code, Display, Image, Snippet, Spacer, Text } from '@geist-ui/core';
import cli from '../../cli.jpg';

export default function() {
  return (
    <>
      <Display shadow
               caption={<Text p type='secondary'><Code>Apollo CLI</Code>是配套的现代化命令行交互式终端</Text>}>
        <Image width='640px' src={cli} />
      </Display>
      <Spacer />
      <Display caption='如何使用本工具'>
        <Snippet symbol='' copy='prevent' type={'dark'}
                 width={'640px'}
                 text={['$ apollocli --help', 'Commands:',
                   '========',
                   '  address    查看连接的unix地址',
                   '  app        显示注册的微服务列表',
                   '  backup     全局同步备份',
                   '  check      检查Apollo服务状态',
                   '  reconnect  重连指定的unix地址',
                   '  reload     重载微服务模型文件',
                   '  restart    重启指定微服务',
                   '  start      启动指定微服务',
                   '  status     查看指定微服务',
                   '  stop       停止指定微服务',
                   '  sync       同步指定微服务',
                   '  version    查看ApolloCLI版本',
                 ]}
        />
      </Display>
    </>
  );
}