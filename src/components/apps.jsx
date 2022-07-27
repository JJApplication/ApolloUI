import {Component} from "react";
import {Button, Card, Code, Dot, Grid, Modal, Note, Spacer, Table, Tag, Text} from "@geist-ui/core";
import {getRequest} from "../axios/axios";
import {Box, Play, Power, RefreshCcw, RefreshCw} from "@geist-ui/icons";
import "./status.css";

class Apps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apps: [],
            app: '',
            appInfo: {},
            data: [],
            showDialog: false,
            appOperation: false,
            currentStatus: '', // 当前微服务状态
        }
    }

    componentDidMount() {
        this.getApps();
    }

    getApps = () => {
        getRequest('/api/app/all').then(res => {
            this.setState({apps: res.data});
        })
    }

    getApp = (app) => {
        if (app) {
            getRequest(`/api/app/app?name=${app}`).then(res => {
                // data渲染表格
                const meta = res.data.Meta;
                const data = [
                    {key: '名称', val: meta.name},
                    {key: '标识', val: meta.id},
                    {key: '类型', val: meta.type},
                    {key: '描述', val: meta.chs_des},
                    {key: '版本', val: meta.meta.version},
                    {key: '发布状态', val: meta.release_status}
                ]
                this.setState({data: data, appInfo: res.data.Meta});
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

    renderApps = () => {
        let appGrids = [];
        for (const app of this.state.apps) {
            appGrids.push(
                <Grid key={app.App} xs={12} sm={8} md={6} lg={6} justify="center" alignItems="flex-start"
                      style={{cursor: 'pointer'}}>
                    <Card shadow width="100%" onClick={this.showApp(app.App)}>
                        <Card.Content padding=".8rem">
                            {app.Status === 'OK' ? (<Dot style={{marginRight: '5px'}} type="success"/>) : (
                                <Dot style={{marginRight: '5px'}} type="error"/>)}
                            <Text span>{app.App}</Text>
                        </Card.Content>
                    </Card>
                </Grid>
            )
        }
        return appGrids;
    }

    // 操作栏
    openAppOperation = () => {
        this.setState({showDialog: false, appOperation: true})
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
                        <Grid.Container gap={2} justify="center">
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
                        <Tag type="default" invert>{this.state.appInfo.id}</Tag>
                        <Spacer inline w={.5}/>
                        <Tag type="success" invert>{this.state.appInfo.type}</Tag>
                        <Spacer inline w={.5}/>
                        <Tag type="warning"
                             invert>{this.state.appInfo.meta && this.state.appInfo.meta.version ? this.state.appInfo.meta.version : '0.0.1'}</Tag>
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
                        <Grid.Container gap={2}>
                            <Grid><Button auto type="secondary" scale={0.6} icon={<Play/>}>启动</Button></Grid>
                            <Grid><Button auto type="secondary" scale={0.6} icon={<RefreshCcw/>}>重启</Button></Grid>
                            <Grid><Button auto type="secondary" scale={0.6} icon={<RefreshCw/>}>刷新</Button></Grid>
                            <Grid><Button auto type="secondary" scale={0.6} icon={<Box/>}>备份</Button></Grid>
                            <Grid><Button auto type="error" scale={0.6} icon={<Power/>}>停止</Button></Grid>
                        </Grid.Container>
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