import './App.css';
import 'inter-ui/inter.css';
import {
    Breadcrumbs,
    Button,
    ButtonGroup,
    CssBaseline,
    Divider,
    GeistProvider,
    Loading,
    Page,
    Text
} from '@geist-ui/core'
import {Component} from "react";
import {Award, Facebook, Github, Smile} from "@geist-ui/icons";
import Home from "./pages/home";
import Footer from "./components/footer";
import About from "./pages/about";
import Apps from "./components/apps";
import urls from "./urls";
import Filetree from "./pages/filetree";
import Apptree from "./pages/apptree";
import Settings from "./pages/settings";
import Toast from "./components/toast";
import {startAppSpy, startHeartbeat} from "./tasks";
import Tasks from "./pages/tasks";

// 设置根节点的主题引入
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            themeType: 'light',
            lazyComp: 'home',
            width: '60%',
            showToast: false,
        }
    }

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
            this.setState({width: '60%'})
        } else if (width < 1920 && width >= 1280) {
            this.setState({width: '70%'})
        } else if (width < 1280 && width >= 720) {
            this.setState({width: '80%'})
        } else if (width < 720) {
            this.setState({width: '100%'})
        } else {
            this.setState({width: '60%'})
        }
    }
    switchThemeType = () => {
        this.setState((preState) => {
            const theme = preState.themeType === 'dark' ? 'light' : 'dark';
            return {themeType: theme};
        })
    }

    switchTab = (tab) => {
        return () => {
            if (tab && tab !== this.state.lazyComp) {
                // loading
                setTimeout(() => {
                    this.setState({lazyComp: tab});
                }, 600);
                this.setState({lazyComp: 'loading'});
            } else if (tab === this.state.lazyComp) {
                this.setState({lazyComp: tab});
            } else {
                this.setState({lazyComp: 'home'});
            }
        }
    }

    openUrl = (uri) => {
        return () => {
            if (uri) {
                window.open(uri, '_blank');
            }
        }
    }

    render() {
        return (
            <div className="App">
                <GeistProvider themeType={this.state.themeType}>
                    <CssBaseline/>
                    <Page width={this.state.width}>
                        <Page.Header style={{userSelect: 'none'}}>
                            <Text span b i font="2.2rem" marginRight=".5rem"
                                  style={{letterSpacing: '0.6px', cursor: 'pointer', userSelect: 'none'}}
                                  onClick={this.switchTab('home')}>
                                <Text span type="success">A</Text>
                                <Text span type="error">p</Text>
                                <Text span type="error">o</Text>
                                <Text span type="error">l</Text>
                                <Text span type="error">l</Text>
                                <Text span type="warning">o</Text>
                            </Text>
                            <ButtonGroup type="secondary" scale={0.5}>
                                <Button auto scale={0.25} icon={<Smile/>} onClick={this.switchThemeType}>主题</Button>
                                <Button scale={0.25} icon={<Award/>}
                                        onClick={this.openUrl(urls.JJApplication)}>ProjectJ</Button>
                                <Button scale={0.25} icon={<Github/>}
                                        onClick={this.openUrl(urls.Landers1037)}>Github</Button>
                                <Button scale={0.25} icon={<Facebook/>}
                                        onClick={this.openUrl(urls.Facebook)}>Facebook</Button>
                            </ButtonGroup>
                            {/*页签切换*/}
                            <Breadcrumbs paddingTop=".5rem">
                                <Breadcrumbs.Item onClick={this.switchTab('home')}>主页</Breadcrumbs.Item>
                                <Breadcrumbs.Item onClick={this.switchTab('status')}>服务状态</Breadcrumbs.Item>
                                <Breadcrumbs.Item onClick={this.switchTab('tree')}>服务结构</Breadcrumbs.Item>
                                <Breadcrumbs.Item onClick={this.switchTab('manage')}>文件管理</Breadcrumbs.Item>
                                <Breadcrumbs.Item onClick={this.switchTab('tasks')}>任务管理</Breadcrumbs.Item>
                                <Breadcrumbs.Item onClick={this.switchTab('settings')}>应用配置</Breadcrumbs.Item>
                                <Breadcrumbs.Item onClick={this.switchTab('about')}>关于Apollo</Breadcrumbs.Item>
                            </Breadcrumbs>
                            <Divider h={4} marginTop="1rem" marginBottom="1rem"/>
                        </Page.Header>

                        {/*动态渲染的部分*/}
                        <Page.Content paddingTop="1.5rem" style={{
                            overflowY: "auto",
                            height: 'calc(100vh - 10rem)'
                        }}>
                            {this.state.lazyComp === 'loading' && (<Loading paddingTop="5rem" spaceRatio={2.5}/>)}
                            {this.state.lazyComp === 'home' && (<Home/>)}
                            {this.state.lazyComp === 'status' && (<Apps/>)}
                            {this.state.lazyComp === 'tree' && (<Apptree/>)}
                            {this.state.lazyComp === 'manage' && (<Filetree/>)}
                            {this.state.lazyComp === 'tasks' && (<Tasks/>)}
                            {this.state.lazyComp === 'settings' && (<Settings/>)}
                            {this.state.lazyComp === 'about' && (<About/>)}
                        </Page.Content>
                        <Page.Footer style={{}}>
                            <Footer/>
                        </Page.Footer>
                    </Page>
                    <Toast/>
                </GeistProvider>
            </div>
        );
    }
}

export default App;
