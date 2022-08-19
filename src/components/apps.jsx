import {Component} from "react";
import {Button, Card, Code, Dot, Grid, Link, Modal, Note, Spacer, Table, Tag, Text} from "@geist-ui/core";
import {getRequest, postRequest} from "../axios/axios";
import {Box, Play, Power, RefreshCw, RotateCcw} from "@geist-ui/icons";
import "./status.css";
import logger from "../logger/logger";
import notifySync from "../logger/notify";
import store from "../store/store";

class Apps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: null,
            autoHide: false,
            apps: [],
            app: '',
            appInfo: {},
            data: [],
            showDialog: false,
            appOperation: false,
            currentStatus: '', // 当前微服务状态
            appOperationLoading: '', // 有按钮正在操作
        }
    }

    componentDidMount() {
        this.getApps();
        const data = store.getState();
        this.setState({autoHide: data ? data.autoHide : false});
        const ticker = setInterval(() => {
            this.getApps();
        }, 5000);
        this.setState({ticker: ticker});
    }

    componentWillUnmount() {
        clearInterval(this.state.ticker);
    }

    getApps = () => {
        getRequest('/api/app/all').then(res => {
            this.setState({apps: res.data ? res.data : []});
        })
    }

    getApp = (app) => {
        if (app) {
            getRequest(`/api/app/info?name=${app}`).then(res => {
                // data渲染表格
                const meta = res.data.meta;
                const data = [
                    {key: '名称', val: meta.name},
                    {key: '标识', val: meta.id},
                    {key: '类型', val: meta.type},
                    {key: '描述', val: meta.chs_des},
                    {key: '版本', val: meta.meta.version},
                    {key: '发布状态', val: meta.release_status},
                    {
                        key: '在线地址',
                        val: meta.link ?
                            <>
                                <Link href={meta.link} color>Link</Link>
                                <Spacer w={1}/>
                                <Link href={meta.link} color>前往</Link>
                            </> : '暂无'
                    },
                ]
                this.setState({data: data, appInfo: res.data.meta});
                this.setState({showDialog: true});
            });
        }
    }
    showApp = (app) => {
        return () => {
            this.setState({app: app});
            this.getApp(app);
        }
    }

    closeHandler = () => {
        this.setState({showDialog: false, appOperation: false});
    }

    // 渲染状态
    renderStatus = (stat) => {
        if (stat === 'OK') {
            return (<Dot style={{marginRight: '5px'}} type="success"/>);
        } else if (stat === 'BAD') {
            return (<Dot style={{marginRight: '5px'}} type="error"/>);
        } else {
            return (<Dot style={{marginRight: '5px'}} type="warning"/>);
        }
    }
    renderApps = () => {
        let appGrids = [];
        for (const app of this.state.apps) {
            appGrids.push(
                <Grid key={app.App} xs={12} sm={8} md={6} lg={6} justify="center" alignItems="flex-start"
                      style={{cursor: 'pointer'}}>
                    <Card shadow width="100%" onClick={this.showApp(app.App)}>
                        <Card.Content padding=".8rem">
                            {this.renderStatus(app.Status)}
                            <Text span>{app.App}</Text>
                        </Card.Content>
                    </Card>
                </Grid>
            )
        }
        return appGrids;
    }
    // 获取App状态
    getAppStatus = () => {
        const app = this.state.app;
        getRequest(`/api/app/status?name=${app}`).then(res => {
            if (res.data) {
                this.setState({currentStatus: res.data});
            } else {
                this.setState({currentStatus: 'unknown'});
            }
        }).catch(() => {
            this.setState({currentStatus: ''})
        });
    }
    // 打开App操作栏
    openAppOperation = () => {
        this.getAppStatus();
        this.setState({showDialog: false, appOperation: true})
    }

    // 微服务操作
    // 操作按钮随着状态变化改变
    checkLoading = (op) => {
        if (this.state.appOperationLoading) {
            logger('当前有阻塞操作');
            notifySync('当前有阻塞操作', 'warning');
            return true;
        } else {
            this.setState({appOperationLoading: op});
            return false;
        }
    }

    resetLoading = () => {
        setTimeout(() => {
            this.setState({appOperationLoading: ''});
        }, 800);
    }

    startApp = () => {
        if (!this.checkLoading('start')) {
            const app = this.state.app;
            postRequest(`/api/app/start?app=${app}`).then(res => {
                if (res.status === 'ok') {
                    notifySync(`微服务${app}启动成功`, 'success');
                } else {
                    notifySync(`微服务${app}启动失败`, 'error');
                }
                this.resetLoading();
                this.getAppStatus();
            }).catch(() => {
                this.resetLoading();
                this.getAppStatus();
            })
        }
    }

    stopApp = () => {
        if (!this.checkLoading('stop')) {
            const app = this.state.app;
            postRequest(`/api/app/stop?app=${app}`).then(res => {
                if (res.status === 'ok') {
                    notifySync(`微服务${app}停止成功`, 'success');
                } else {
                    notifySync(`微服务${app}停止失败`, 'error');
                }
                this.resetLoading();
                this.getAppStatus();
            }).catch(() => {
                this.resetLoading();
                this.getAppStatus();
            })
        }
    }

    restartApp = () => {
        if (!this.checkLoading('restart')) {
            const app = this.state.app;
            postRequest(`/api/app/restart?app=${app}`).then(res => {
                if (res.status === 'ok') {
                    notifySync(`微服务${app}重启成功`, 'success');
                } else {
                    notifySync(`微服务${app}重启失败`, 'error');
                }
                this.resetLoading();
                this.getAppStatus();
            }).catch(() => {
                this.resetLoading();
                this.getAppStatus();
            })
        }
    }

    refreshApp = () => {
        if (!this.checkLoading('refresh')) {
            const app = this.state.app;
            getRequest(`/api/app/status?name=${app}`).then(res => {
                if (res.data) {
                    this.setState({currentStatus: res.data});
                    notifySync(`微服务${app}刷新成功`, 'success');
                } else {
                    this.setState({currentStatus: 'unknown'});
                    notifySync(`微服务${app}刷新失败`, 'error');
                }
                this.resetLoading();
            }).catch(() => {
                this.setState({currentStatus: ''});
                this.resetLoading();
            });
        }
    }

    backup = () => {
        if (!this.checkLoading('start')) {
            const app = this.state.app;
            postRequest(`/api/app/backup?app=${app}`).then(res => {
                if (res.status === 'ok') {
                    notifySync(`微服务${app}备份成功`, 'success');
                } else {
                    notifySync(`微服务${app}备份失败`, 'error');
                }
                this.resetLoading();
            }).catch(() => {
                this.resetLoading();
            })
        }
    }

    // 生成模型文件
    generateAppModel = () => {
        if (this.state.appInfo) {
            return JSON.stringify(this.state.appInfo, null, '  ');
        }
    }

    render() {
        return (
            <div className="bar-wrapper">
                <Text h4>微服务状态</Text>
                <Dot style={{marginRight: '1rem'}} type="success">运行</Dot>
                <Dot style={{marginRight: '1rem'}} type="warning">未知</Dot>
                <Dot type="error">停止</Dot>
                <Spacer h={2}/>
                <div className="bar">
                    <div className="bar-inner">
                        <Grid.Container gap={2} justify="flex-start">
                            {this.renderApps()}
                        </Grid.Container>
                    </div>
                </div>
                <Modal visible={this.state.showDialog} onClose={this.closeHandler}>
                    <Modal.Title>微服务信息</Modal.Title>
                    <Modal.Subtitle>{this.state.app}</Modal.Subtitle>
                    <Modal.Content>
                        {!this.state.appInfo.name && (<Note type="error" label="错误" filled>获取服务信息失败</Note>)}
                        <Table data={this.state.data}>
                            <Table.Column prop="key" label="KEY"/>
                            <Table.Column prop="val" label="VALUE"/>
                        </Table>
                    </Modal.Content>
                    <Modal.Action onClick={this.openAppOperation}>操作</Modal.Action>
                    <Modal.Action onClick={({close}) => close()}>关闭</Modal.Action>
                </Modal>

                <Modal visible={this.state.appOperation} onClose={this.closeHandler} width="85%">
                    <Modal.Title>{this.state.app}</Modal.Title>
                    <Modal.Subtitle>微服务状态管理</Modal.Subtitle>
                    <Modal.Content>
                        <Tag type="default" invert style={{fontWeight: 'bold'}}>{this.state.appInfo.id}</Tag>
                        <Spacer inline w={.5}/>
                        <Tag type="success" invert style={{fontWeight: 'bold'}}>{this.state.appInfo.type}</Tag>
                        <Spacer inline w={.5}/>
                        <Tag type="warning"
                             invert
                             style={{fontWeight: 'bold'}}>{this.state.appInfo.meta && this.state.appInfo.meta.version ? this.state.appInfo.meta.version : '0.0.1'}</Tag>
                        <Spacer h={1.5}/>
                        <Text h5 b>微服务状态</Text>
                        <div className="runStatus">
                            {this.state.currentStatus === '' ? (<Dot className="appStatusAnim" style={{
                                    position: 'absolute',
                                    left: '0',
                                    top: '2rem'
                                }}/>) :
                                <Dot style={{position: 'absolute', left: '0', top: '2rem'}}/>}
                            {this.state.currentStatus === 'running' ? (
                                    <Dot className="appStatusAnim" style={{position: 'absolute', left: '2rem', top: '2rem'}}
                                         type="success"/>) :
                                <Dot style={{position: 'absolute', left: '2rem', top: '2rem'}} type="success"/>}
                            {this.state.currentStatus === 'unknown' ? (
                                    <Dot className="appStatusAnim" style={{position: 'absolute', left: '4rem', top: '2rem'}}
                                         type="warning"/>) :
                                <Dot style={{position: 'absolute', left: '4rem', top: '2rem'}} type="warning"/>}
                            {this.state.currentStatus === 'stopped' ? (
                                    <Dot className="appStatusAnim" style={{position: 'absolute', left: '6rem', top: '2rem'}}
                                         type="error"/>) :
                                <Dot style={{position: 'absolute', left: '6rem', top: '2rem'}} type="error"/>}

                        </div>
                        <Spacer h={1}/>
                        <Text h5 b>微服务管理</Text>
                        {!this.state.autoHide ? (<Grid.Container gap={2}>
                            <Grid>{!(this.state.appOperationLoading === 'start') ? (
                                <Button auto type="secondary" scale={0.6} icon={<Play/>}
                                        onClick={this.startApp}>启动</Button>) : (
                                <Button loading auto type="secondary" scale={0.6}>启动</Button>)}</Grid>
                            <Grid>{!(this.state.appOperationLoading === 'restart') ? (
                                <Button auto type="secondary" scale={0.6} icon={<RotateCcw/>}
                                        onClick={this.restartApp}>重启</Button>) : (
                                <Button loading auto type="secondary" scale={0.6}>重启</Button>)}</Grid>
                            <Grid>{!(this.state.appOperationLoading === 'refresh') ? (
                                <Button auto type="secondary" scale={0.6} icon={<RefreshCw/>}
                                        onClick={this.refreshApp}>刷新</Button>) : (
                                <Button loading auto type="secondary" scale={0.6}>刷新</Button>)}</Grid>
                            <Grid>{!(this.state.appOperationLoading === 'backup') ? (
                                <Button auto type="secondary" scale={0.6} icon={<Box/>}
                                        onClick={this.backup}>备份</Button>) : (
                                <Button loading auto type="secondary" scale={0.6}>备份</Button>)}</Grid>
                            <Grid>{!(this.state.appOperationLoading === 'stop') ? (
                                <Button auto type="error" scale={0.6} icon={<Power/>}
                                        onClick={this.stopApp}>停止</Button>) : (
                                <Button loading auto type="error" scale={0.6}>停止</Button>)}</Grid>
                        </Grid.Container>) : null}
                        <Spacer h={1}/>
                        <Text h5 b>微服务模型</Text>
                        <Code block name={this.state.app + '.json'}
                              style={{maxHeight: '30rem', overflowY: 'auto'}}>{this.generateAppModel()}</Code>
                    </Modal.Content>
                    <Modal.Action onClick={({close}) => close()}>关闭</Modal.Action>
                </Modal>
            </div>
        )
    }
}

export default Apps;