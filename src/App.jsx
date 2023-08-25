import './App.css';
import 'inter-ui/inter.css';
import { Breadcrumbs, CssBaseline, Divider, GeistProvider, Loading, Page } from '@geist-ui/core';
import { Component } from 'react';
import Home from './pages/home';
import Footer from './components/footer';
import About from './pages/about';
import Apps from './components/apps';
import urls, { openUrl } from './urls';
import Filetree from './pages/filetree';
import Apptree from './pages/apptree';
import Settings from './pages/settings';
import Toast from './components/toast';
import { startAppSpy, startHeartbeat } from './tasks';
import Tasks from './pages/tasks';
import Container from './pages/container';
import Alarm from './pages/alarm';
import Webssh from './pages/webssh';
import Modules from './pages/modules';
import Board from './pages/board';
import Header, { TypeAdvance, TypeNormal } from './components/header';

// 设置根节点的主题引入
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themeType: 'light',
      lazyComp: this.getInitComp(this.props.type),
      width: '60%',
      showToast: false,
    };
  }

  // 初始化面板
  getInitComp = (type) => {
    switch (type) {
      case TypeNormal: {
        return 'home';
      }
      case TypeAdvance: {
        return 'settings';
      }
      default: {
        return type;
      }
    }
  };

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
    startAppSpy();
    startHeartbeat();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    // 计算分辨率宽度
    const width = document.documentElement.clientWidth || document.body.clientWidth;
    if (width >= 1920) {
      this.setState({ width: '60%' });
    } else if (width < 1920 && width >= 1280) {
      this.setState({ width: '70%' });
    } else if (width < 1280 && width >= 720) {
      this.setState({ width: '80%' });
    } else if (width < 720) {
      this.setState({ width: '100%' });
    } else {
      this.setState({ width: '60%' });
    }
  };
  switchThemeType = () => {
    this.setState((preState) => {
      const theme = preState.themeType === 'dark' ? 'light' : 'dark';
      return { themeType: theme };
    });
  };

  switchTab = (tab) => {
    return () => {
      if (tab && tab !== this.state.lazyComp) {
        // loading
        setTimeout(() => {
          this.setState({ lazyComp: tab });
        }, 600);
        this.setState({ lazyComp: 'loading' });
      } else if (tab === this.state.lazyComp) {
        this.setState({ lazyComp: tab });
      } else {
        this.setState({ lazyComp: 'home' });
      }
    };
  };

  renderTabs = (type) => {
    switch (type) {
      case TypeNormal: {
        return (
          <>
            <Breadcrumbs paddingTop='.5rem' className='nav'>
              <Breadcrumbs.Item onClick={this.switchTab('home')}>主页</Breadcrumbs.Item>
              <Breadcrumbs.Item onClick={this.switchTab('status')}>服务状态</Breadcrumbs.Item>
              <Breadcrumbs.Item onClick={this.switchTab('tree')}>服务结构</Breadcrumbs.Item>
              <Breadcrumbs.Item onClick={this.switchTab('manage')}>文件管理</Breadcrumbs.Item>
              <Breadcrumbs.Item onClick={this.switchTab('tasks')}>任务管理</Breadcrumbs.Item>
              <Breadcrumbs.Item onClick={this.switchTab('container')}>容器管理</Breadcrumbs.Item>
              <Breadcrumbs.Item onClick={this.switchTab('alarm')}>告警管理</Breadcrumbs.Item>
              <Breadcrumbs.Item onClick={this.switchTab('about')}>关于Apollo</Breadcrumbs.Item>
            </Breadcrumbs>
          </>
        );
      }
      case TypeAdvance: {
        return (
          <Breadcrumbs paddingTop='.5rem' className='nav'>
            <Breadcrumbs.Item onClick={this.switchTab('settings')}>应用配置</Breadcrumbs.Item>
            <Breadcrumbs.Item onClick={this.switchTab('webssh')}>WebSSH</Breadcrumbs.Item>
            <Breadcrumbs.Item onClick={this.switchTab('modules')}>动态模块</Breadcrumbs.Item>
            <Breadcrumbs.Item onClick={this.switchTab('board')}>流量看板</Breadcrumbs.Item>
            <Breadcrumbs.Item onClick={openUrl(urls.ApolloDoc)}>开发文档</Breadcrumbs.Item>
          </Breadcrumbs>
        );
      }
      default: {
        return null;
      }
    }
  };

  render() {
    return (
      <div className='App'>
        <GeistProvider themeType={this.state.themeType}>
          <CssBaseline />
          <Page width={this.state.width}>
            <Page.Header style={{ userSelect: 'none' }}>
              <Header type={this.props.type} switchThemeType={this.switchThemeType} />
              {/*页签切换 当前分为高级模式和普通模式*/}
              {
                this.renderTabs(this.props.type)
              }
              <Divider h={4} marginTop='1rem' marginBottom='1rem' />
            </Page.Header>

            {/*动态渲染的部分*/}
            <Page.Content paddingTop='1.5rem' style={{
              overflowY: 'auto',
              height: 'calc(100vh - 10rem)',
            }}>
              {this.state.lazyComp === 'loading' && (<Loading paddingTop='5rem' spaceRatio={2.5} />)}
              {this.state.lazyComp === 'home' && (<Home />)}
              {this.state.lazyComp === 'status' && (<Apps />)}
              {this.state.lazyComp === 'tree' && (<Apptree />)}
              {this.state.lazyComp === 'manage' && (<Filetree />)}
              {this.state.lazyComp === 'tasks' && (<Tasks />)}
              {this.state.lazyComp === 'container' && (<Container />)}
              {this.state.lazyComp === 'alarm' && (<Alarm />)}
              {this.state.lazyComp === 'webssh' && (<Webssh />)}
              {this.state.lazyComp === 'modules' && (<Modules />)}
              {this.state.lazyComp === 'board' && (<Board />)}
              {this.state.lazyComp === 'settings' && (<Settings />)}
              {this.state.lazyComp === 'about' && (<About />)}
            </Page.Content>
            <Page.Footer style={{ width: 'auto' }}>
              <Footer />
            </Page.Footer>
          </Page>
          <Toast />
        </GeistProvider>
      </div>
    );
  }
}

export default App;
