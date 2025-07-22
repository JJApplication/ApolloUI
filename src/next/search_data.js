const SearchData = {
  home: {
    name: '主页',
    url: '/',
    module: 'Apollo',
    description: 'Apollo是一个轻量化微服务集群管理服务',
  },
  'next-start': {
    name: '看板',
    url: '/next',
    module: '数据看板',
    description: '展示所有运行态信息的数据看板',
  },
  'next-login': {
    name: '登录',
    url: '/next/login',
    module: '认证',
    description: '用户认证登录模块，支持常规登录和OAuth2.0',
  },
  'next-app': {
    name: '微服务管理',
    url: '/next/app',
    module: '微服务',
    description: '微服务统一管理，提供微服务的启动停止操作',
  },
  'next-container': {
    name: '容器管理',
    url: '/next/container',
    module: '系统管理',
    description: '负责所有容器运行态创建与生命周期管理',
  },
  'next-task': {
    name: '任务管理',
    url: '/next/task',
    module: '系统管理',
    description: '负责所有定时任务，后台任务的管理',
  },
  'next-alarm': {
    name: '告警管理',
    url: '/next/alarm',
    module: '系统管理',
    description: '负责所有级别告警的管理',
  },
  'next-log': {
    name: '日志管理',
    url: '/next/log',
    module: '系统管理',
    description: '负责所有微服务运行日志的管理',
  },
  'next-system': {
    name: '系统信息',
    url: '/next/system',
    module: '系统管理',
    description: '查看与管理当前服务系统信息和配置参数',
  },
  'next-indicator': {
    name: '性能指标',
    url: '/next/indicator',
    module: '系统管理',
    description: '查看当前系统的资源占用情况与分布',
  },
  'next-cert': {
    name: '证书管理',
    url: '/next/cert',
    module: '系统管理',
    description: '查看当前系统使用的SSL根证书',
  },
  'next-env': {
    name: '环境变量',
    url: '/next/env',
    module: '服务对接',
    description: '负责所有微服务的环境变量的管理',
  },
  'next-terminal': {
    name: '模拟终端',
    url: '/next/terminal',
    module: '服务对接',
    description: '开启远程终端',
  },
  'next-gw': {
    name: '服务网关',
    url: '/next/gw',
    module: '服务对接',
    description: '负责所有微服务的动态网关转发管理',
  },
  'next-noengine': {
    name: '静态代理',
    url: '/next/noengine',
    module: '服务对接',
    description: '负责所有微服务的静态资源端口转发',
  },
  'next-script': {
    name: '脚本管理',
    url: '/next/env',
    module: '脚本插件',
    description: '负责系统脚本命令的执行与管理',
  },
  'next-setting': {
    name: '高级配置',
    url: '/next/setting',
    module: '配置',
    description: '负责Apollo服务的参数配置',
  },
  'next-changelog': {
    name: '变更历史',
    url: '/next/changelog',
    module: '其他',
    description: '查看Apollo变更历史',
  },
  'next-about': {
    name: '关于',
    url: '/next/about',
    module: '其他',
    description: '关于Apollo',
  },
};

// 关键字的搜索基于模块展示
const searchKeyword = (key) => {
  if (!key) {
    return [];
  }
  const res = [];
  // 格式化所有基础信息进行匹配
  Object.values(SearchData).forEach((data) => {
    if (
      data.name.toLowerCase().includes(key.toLowerCase()) ||
      data.module.toLowerCase().includes(key.toLowerCase()) ||
      data.description.toLowerCase().includes(key.toLowerCase())
    ) {
      res.push(data);
    }
  });
  return res;
};

export { searchKeyword };
