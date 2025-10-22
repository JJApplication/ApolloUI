/*
NEXT的最外层布局
NEXT采用经典的左侧菜单 + 顶部面包屑
中间的content采用动态子路由渲染
 */

import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Card,
  Collapse,
  Drawer,
  Input,
  Link,
  Modal,
  Popover,
  Spacer,
  Tag,
  Text,
  Tooltip,
} from '@geist-ui/core';
import {
  Box,
  Command,
  Divider,
  FileMinus,
  Folder,
  GitBranch,
  Github,
  Heart,
  Hexagon,
  Info,
  Lambda,
  Layers,
  List,
  Package,
  Server,
  Terminal,
  Tool,
  Triangle,
  XOctagon,
  Zap,
} from '@geist-ui/icons';
import { useEffect, useRef, useState } from 'react';
import { Link as LinkRoute, useNavigate } from 'react-router-dom';
import './Layout.css';
import urls, { openUrl } from '../urls';
import { ToastContainer } from 'react-toastify';
import { searchKeyword } from './search_data';

export default function ({ children }) {
  const nav = useNavigate();
  const searchRef = useRef(null);

  const [state, setState] = useState(false);
  const [display, setDisplay] = useState(true);
  const [showDonate, setShowDonate] = useState(false);

  const [searchKey, setSearchKey] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const content = () => {
    if (searchVisible) {
      const data = searchKeyword(searchKey);
      if (data && data.length > 0) {
        return (
          <div style={{ padding: '0 0.5rem', width: '500px', maxHeight: '360px', overflowY: 'auto' }}>
            {data.map((item, index) => {
              return (
                <Card key={index} style={{ marginBottom: '10px' }}>
                  <Card.Content style={{ width: 'unset', display: 'flex', justifyContent: 'space-between' }}>
                    <span>
                      <Tag type={'lite'}>{item.name}</Tag>
                      <Spacer inline w={0.75} />
                      <span>{item.description}</span>
                    </span>
                    <Button onClick={() => navTo(item.url)} scale={1 / 2} auto type={'secondary-light'}>
                      前往
                    </Button>
                  </Card.Content>
                </Card>
              );
            })}
          </div>
        );
      }
    }
    return null;
  };

  useEffect(() => {
    if (document.body.clientWidth < 1280 && process.env.NODE_ENV !== 'development') {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  }, []);

  const today = () => {
    return new Date().getFullYear();
  };

  const navTo = (link) => {
    nav(link);
    setState(false);
  };

  const searchApollo = (e) => {
    setSearchKey(e.target.value);
    if (e.target.value !== '') {
      setSearchVisible(true);
    } else {
      setSearchVisible(false);
    }
  };

  return (
    <>
      {display && (
        <div className='layout'>
          <div className='layout-left'>
            <div style={{ display: 'inline-flex', width: '100%', alignItems: 'center', flexDirection: 'column' }}>
              <Spacer h={0.5} />
              <Tooltip text={'展开'} placement='right'>
                <Layers onClick={() => setState(true)} />
              </Tooltip>
              <Spacer h={2} />
              <Tooltip text={'快速开始'} placement='right'>
                <LinkRoute to={'/next/start'}>
                  <Zap />
                </LinkRoute>
              </Tooltip>
              <Spacer h={2} />
              <Tooltip text={'服务'} placement='right'>
                <LinkRoute to={'/next/app'}>
                  <Box />
                </LinkRoute>
              </Tooltip>
              <Spacer h={2} />
              <Tooltip text={'目录'} placement='right'>
                <LinkRoute to={'/next/tree'}>
                  <Folder />
                </LinkRoute>
              </Tooltip>
              <Spacer h={2} />
              <Tooltip text={'部署'} placement='right'>
                <LinkRoute to={'/next/deploy'}>
                  <Package />
                </LinkRoute>
              </Tooltip>
              <Spacer h={2} />
              <Tooltip text={'容器'} placement='right'>
                <LinkRoute to={'/next/container'}>
                  <Hexagon />
                </LinkRoute>
              </Tooltip>
              <Spacer h={2} />
              <Tooltip text={'任务'} placement='right'>
                <LinkRoute to={'/next/task'}>
                  <List />
                </LinkRoute>
              </Tooltip>
              <Spacer h={2} />
              <Tooltip text={'告警'} placement='right'>
                <LinkRoute to={'/next/alarm'}>
                  <XOctagon />
                </LinkRoute>
              </Tooltip>
              <Spacer h={2} />
              <Tooltip text={'日志'} placement='right'>
                <LinkRoute to={'/next/log'}>
                  <FileMinus />
                </LinkRoute>
              </Tooltip>
              <Spacer h={2} />
              <Tooltip text={'脚本'} placement='right'>
                <LinkRoute to={'/next/script'}>
                  <Lambda />
                </LinkRoute>
              </Tooltip>
              <Spacer h={2} />
              <Tooltip text={'终端'} placement='right'>
                <LinkRoute to={'/next/terminal'}>
                  <Terminal />
                </LinkRoute>
              </Tooltip>
              <Spacer h={2} />
              <Tooltip text={'登入'} placement='right'>
                <LinkRoute to={'/next/login'}>
                  <Triangle />
                </LinkRoute>
              </Tooltip>
              <Spacer h={2} />
              <Tooltip text={'设置'} placement='right'>
                <LinkRoute to={'/next/setting'}>
                  <Tool />
                </LinkRoute>
              </Tooltip>
              <Spacer h={2} />
              <Tooltip text={'系统'} placement='right'>
                <LinkRoute to={'/next/system'}>
                  <Server />
                </LinkRoute>
              </Tooltip>
            </div>
            <div
              style={{
                alignItems: 'center',
                display: 'inline-flex',
                width: '100%',
                justifyContent: 'flex-end',
                flexDirection: 'column',
                padding: '1rm',
              }}>
              <Tooltip text={'关注'} placement='right'>
                <Github onClick={openUrl(urls.Landers1037)} />
              </Tooltip>
              <Spacer />
              <Tooltip text={'关于'} placement='right'>
                <LinkRoute to={'/next/about'}>
                  <Info />
                </LinkRoute>
              </Tooltip>
            </div>
            <Drawer visible={state} onClose={() => setState(false)} placement='left' className='menu'>
              <Drawer.Title>菜单</Drawer.Title>
              <Drawer.Subtitle>MENU</Drawer.Subtitle>
              <Drawer.Content style={{ height: '100%', padding: '1rem 1rem 0 1rem' }}>
                <div className={'menu-top'}>
                  <Collapse.Group accordion={false}>
                    <Collapse title='服务管理' initialVisible>
                      <Text onClick={() => navTo('/next/app')}>微服务管理</Text>
                      <Text onClick={() => navTo('/next/select')}>微服务操作</Text>
                      <Text onClick={() => navTo('/next/tree')}>微服务目录</Text>
                      <Text onClick={() => navTo('/next/deploy')}>微服务部署</Text>
                      <Text>微服务备份</Text>
                    </Collapse>
                    <Collapse title='系统管理' initialVisible>
                      <Text onClick={() => navTo('/next/task')}>任务列表</Text>
                      <Text onClick={() => navTo('/next/alarm')}>告警列表</Text>
                      <Text onClick={() => navTo('/next/container')}>容器管理</Text>
                      <Text onClick={() => navTo('/next/log')}>日志管理</Text>
                      <Text onClick={() => navTo('/next/db')}>数据管理</Text>
                      <Text onClick={() => navTo('/next/repo')}>仓库管理</Text>
                      <Text onClick={() => navTo('/next/system')}>系统信息</Text>
                      <Text onClick={() => navTo('/next/indicator')}>性能指标</Text>
                      <Text onClick={() => navTo('/next/cert')}>证书管理</Text>
                      <Text onClick={() => navTo('/next/secure')}>安全维护</Text>
                    </Collapse>
                    <Collapse title='服务对接' initialVisible>
                      <Text onClick={() => navTo('/next/env')}>环境变量</Text>
                      <Text onClick={() => navTo('/next/terminal')}>远程终端</Text>
                      <Text onClick={() => navTo('/next/terminal_exp')}>终端(实验性)</Text>
                      <Text onClick={() => navTo('/next/noengine')}>静态代理</Text>
                      <Text onClick={() => navTo('/next/gw')}>动态网关</Text>
                      <Text onClick={() => navTo('/next/watch')}>监控配置</Text>
                      <Text onClick={() => navTo('/next/mail')}>邮件外发</Text>
                    </Collapse>
                    <Collapse title='数据看板' initialVisible>
                      <Text onClick={() => navTo('/next/panel/network')}>流量看板</Text>
                      <Text onClick={() => navTo('/next/panel/app')}>服务看板</Text>
                      <Text onClick={() => navTo('/next/panel/secure')}>安全看板</Text>
                    </Collapse>
                    <Collapse title='脚本插件' initialVisible>
                      <Text onClick={() => navTo('/next/script')}>脚本管理</Text>
                      <Text onClick={() => navTo('/next/script/task')}>脚本任务</Text>
                    </Collapse>
                    <Collapse title='高级配置' initialVisible>
                      <Text onClick={() => navTo('/next/setting')}>基础配置</Text>
                      <Text onClick={() => navTo('/next/login')}>认证管理</Text>
                      <Text onClick={() => navTo('/next/module')}>动态模块</Text>
                      <Text onClick={() => navTo('/next/cli')}>命令工具</Text>
                      <Text onClick={() => navTo('/next/doc')}>开发文档</Text>
                    </Collapse>
                  </Collapse.Group>
                </div>
                <div style={{ height: '5rem', borderTop: '1px solid #D0D0D0' }}>
                  <p style={{ margin: '0.25rem 0' }}>
                    Apollo{' '}
                    <Tag type='success' invert>
                      NEXT
                    </Tag>
                  </p>
                  <p style={{ margin: '0.25rem 0' }}>
                    This is a project of{' '}
                    <Tag type='default' invert>
                      JJApplication
                    </Tag>
                  </p>
                  <p style={{ margin: '0.25rem 0' }}>
                    2022 - {today()} | copyright{' '}
                    <Link href={urls.Home} icon color>
                      @renj.io
                    </Link>
                  </p>
                </div>
              </Drawer.Content>
            </Drawer>
          </div>
          <div className='layout-content'>
            <div className='layout-content-header'>
              <Text
                span
                b
                i
                font='2rem'
                marginRight='0.25rem'
                style={{ letterSpacing: '0.6px', cursor: 'pointer', userSelect: 'none' }}
                onClick={() => {
                  window.location.href = '/';
                }}>
                <Text span type='success'>
                  A
                </Text>
                <Text span type='error'>
                  p
                </Text>
                <Text span type='error'>
                  o
                </Text>
                <Text span type='error'>
                  l
                </Text>
                <Text span type='error'>
                  l
                </Text>
                <Text span type='warning'>
                  o
                </Text>
              </Text>
              <Text span b font='2rem'>
                NEXT
              </Text>
              <div
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  display: 'inline-flex',
                  marginLeft: 'auto',
                }}>
                <span style={{ marginRight: '1rem' }}>
                  <Popover content={content} visible={searchVisible}>
                    <Input
                      ref={searchRef}
                      clearable
                      value={searchKey}
                      onChange={searchApollo}
                      iconRight={<Divider />}
                      placeholder='搜索你想知道的 ~ '
                    />
                  </Popover>
                </span>
                <span style={{ marginRight: '1rem' }}>
                  <Button
                    iconRight={<Command />}
                    auto
                    scale={2 / 3}
                    px={0.6}
                    onClick={() => {
                      if (searchRef) {
                        searchRef.current.focus();
                      }
                    }}
                  />
                </span>
                <span style={{ marginRight: '1rem' }}>
                  <Tooltip text={'变更历史'} placement={'bottom'}>
                    <LinkRoute to={'/next/changelog'}>
                      <Button iconRight={<GitBranch />} auto scale={2 / 3} px={0.6} />
                    </LinkRoute>
                  </Tooltip>
                </span>
                <span style={{ marginRight: '1rem' }}>
                  <Tooltip text={'捐赠'} placement={'bottom'}>
                    <Button iconRight={<Heart />} auto scale={2 / 3} px={0.6} onClick={() => setShowDonate(true)} />
                  </Tooltip>
                </span>
                <LinkRoute to={'/next/login'}>
                  <div className={'avatar'} />
                </LinkRoute>
              </div>
            </div>
            <div className='layout-content-body'>{children}</div>
          </div>
        </div>
      )}
      {/*捐赠*/}
      <Modal visible={showDonate} onClose={() => setShowDonate(false)}>
        <Modal.Title>捐赠本项目</Modal.Title>
        <Modal.Subtitle>项目的开发和坚持需要你的一点点爱心</Modal.Subtitle>
        <Modal.Content>
          <p> ❤️ 捐赠功能暂未开发, 感谢你的关注😘</p>
        </Modal.Content>
        <Modal.Action passive onClick={({ close }) => close()}>
          狠心拒绝
        </Modal.Action>
        <Modal.Action onClick={({ close }) => close()}>好的好的</Modal.Action>
      </Modal>
      {/*不支持的宽度*/}
      {!display && (
        <div>
          <div style={{ maxWidth: '640px', margin: '2rem auto' }}>
            <Card shadow>
              <Text h3>Oops</Text>
              <Text type={'error'}>
                Not Support Your Device Width <Tag>>=1280</Tag>
              </Text>
              <Text h3>出错了</Text>
              <Text type={'error'}>
                不支持的设备宽度 <Tag>>=1280</Tag>
              </Text>
            </Card>
          </div>
        </div>
      )}
      <ToastContainer limit={5} />
    </>
  );
}
