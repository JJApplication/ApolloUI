import {Component} from "react";
import {Button, Checkbox, Grid, Input, Spacer, Text} from "@geist-ui/core";
import store from "../store/store";
import {changeSettings, sendMessage} from "../store/actions";
import logger from "../logger/logger";
import notifySync from "../logger/notify";
import {clearStorage, loadFromStorage, saveToStorage} from "../store/reducer";

class Settings extends Component {
    constructor() {
        super();
        this.state = {
            authCode: '',
            heartbeat: 5,
            spyDuration: 5,
            moreToast: false, // 使用更详细的通知格式
            logConsole: false, //日志输出到控制台
            enableHeart: false, // 开启apollo心跳检测
            enableWS: false, // 使用ws通知
            autoHide: false, // 自动隐藏无权限页面
            enableAppSpy: false, // 启用监控微服务
        }
    }

    componentDidMount() {
        loadFromStorage();
        store.dispatch(sendMessage({
            message: 'Apollo初始化完成',
            check: true,
            t: 'success',
        }));

        const data = store.getState();
        logger.info('从存储读取配置', data);
        if (!data) {
            return;
        }
        this.setState({
            authCode: data.authCode ? data.authCode : '',
            moreToast: data.moreToast,
            logConsole: data.logConsole,
            heartbeat: data.heartbeat ? data.heartbeat : 5,
            spyDuration: data.spyDuration ? data.spyDuration : 5,
            enableHeart: data.enableHeart,
            enableWS: data.enableWS,
            autoHide: data.autoHide,
            enableAppSpy: data.enableAppSpy,
        });
        logger(`initial settings:`, data);
    }

    saveSettings = () => {
        store.dispatch(changeSettings({
            authCode: this.state.authCode,
            moreToast: this.state.moreToast,
            logConsole: this.state.logConsole,
            heartbeat: this.state.heartbeat,
            spyDuration: this.state.spyDuration,
            enableHeart: this.state.enableHeart,
            enableWS: this.state.enableWS,
            autoHide: this.state.autoHide,
            enableAppSpy: this.state.enableAppSpy,
        }));
        saveToStorage();
        notifySync('Apollo配置同步完成', 'success');
    }

    clearSettings = () => {
        this.setState({
            authCode: '',
            moreToast: false,
            logConsole: false,
            heartbeat: 5,
            spyDuration: 5,
            enableHeart: false,
            enableWS: false,
            autoHide: false,
            enableAppSpy: false,
        });
        store.dispatch(changeSettings({
            authCode: '',
            moreToast: false,
            logConsole: false,
            heartbeat: 5,
            spyDuration: 5,
            enableHeart: false,
            enableWS: false,
            autoHide: false,
            enableAppSpy: false,
        }));
        clearStorage();
        notifySync('Apollo配置重置完成', 'error');
    }

    render() {
        return (
            <>
                <Text h4>应用配置</Text>
                <Input.Password label="Apollo身份码" value={this.state.authCode} onChange={(e) => {
                    this.setState({authCode: e.target.value})
                }} width="85%" maxLength={128}/>
                <Spacer h={.5}/>
                <Input label="心跳定时器间隔" placeholder="5" value={this.state.heartbeat} onChange={(e) => {
                    this.setState({heartbeat: e.target.value})
                }} width="85%"/>
                <Spacer h={.5}/>
                <Input label="监控定时器间隔" placeholder="5" value={this.state.spyDuration} onChange={(e) => {
                    this.setState({spyDuration: e.target.value})
                }} width="85%"/>
                <Spacer h={.5}/>
                <Checkbox checked={this.state.moreToast} onChange={(e) => {
                    this.setState({moreToast: e.target.checked})
                }}>使用详细通知</Checkbox>
                <Spacer h={.5}/>
                <Checkbox checked={this.state.logConsole} onChange={(e) => {
                    this.setState({logConsole: e.target.checked})
                }}>日志输出到控制台</Checkbox>
                <Spacer h={.5}/>
                <Checkbox checked={this.state.enableHeart} onChange={(e) => {
                    this.setState({enableHeart: e.target.checked})
                }}>开启心跳提示</Checkbox>
                <Spacer h={.5}/>
                <Checkbox checked={this.state.enableWS} onChange={(e) => {
                    this.setState({enableWS: e.target.checked})
                }}>使用websocket通信</Checkbox>
                <Spacer h={.5}/>
                <Checkbox checked={this.state.autoHide} onChange={(e) => {
                    this.setState({autoHide: e.target.checked})
                }}>自动隐藏无权限页面</Checkbox>
                <Spacer h={.5}/>
                <Checkbox checked={this.state.enableAppSpy} onChange={(e) => {
                    this.setState({enableAppSpy: e.target.checked})
                }}>监控微服务状态</Checkbox>
                <Spacer h={2}/>

                <Grid.Container gap={2}>
                    <Grid><Button auto shadow type="secondary" scale={0.75}
                                  onClick={this.saveSettings}>保存</Button></Grid>
                    <Grid><Button auto shadow type="error" scale={0.75} onClick={this.clearSettings}>重置</Button></Grid>
                </Grid.Container>
            </>
        )
    }
}

export default Settings;