import {Component} from "react";
import {Card, Dot, Modal, Spacer, Tag, Text} from "@geist-ui/core";
import {getRequest} from "../axios/axios";

class Alarm extends Component {
    constructor() {
        super();
        this.state = {
            ticker: null,
            alarms: [{
                level: 'info',
                title: '告警标题',
                message: '默认告警信息',
                created_at: ''
            }],
            empty: [{
                level: 'info',
                title: '告警标题',
                message: '默认告警信息\n assss\\n',
                created_at: ''
            }],
            show: false,
            message: ''
        }
    }

    componentDidMount() {
        this.getAlarms();
        const ticker = setInterval(() => {
            this.getAlarms();
        }, 5000);
        this.setState({ticker: ticker});
    }

    componentWillUnmount() {
        clearInterval(this.state.ticker);
    }

    getAlarms = () => {
        getRequest(`/api/alarm/top`).then(res => {
            if (res.data) {
                this.setState({alarms: res.data});
            } else {
                this.setState({alarms: this.state.empty});
            }
        }).catch(() => {
            this.setState({alarms: this.state.empty});
        })
    }

    renderTagByLevel = (level) => {
        switch (level) {
            case 'info': {
                return (<Tag type="success" invert style={{fontWeight: 'bold'}}>INFO</Tag>);
            }
            case 'warn': {
                return (<Tag type="warning" invert style={{fontWeight: 'bold'}}>WARN</Tag>);
            }
            case 'error': {
                return (<Tag type="error" invert style={{fontWeight: 'bold'}}>ERROR</Tag>);
            }
            default: {
                return (<Tag type="success" invert style={{fontWeight: 'bold'}}>INFO</Tag>);
            }
        }
    }

    trimLast = (s) => {
        return s.substring(0, s.lastIndexOf('\\n'));
    }

    renderAlarms = () => {
        const alarmsGroup = [];
        this.state.alarms.forEach(a => {
            alarmsGroup.push(
                <>
                    <Card hoverable type="default" key={a.name}>
                        <Card.Content style={{paddingTop: '0.5rem', paddingBottom: '0.5rem', userSelect: 'none'}}
                                      onClick={this.showAlarm(a.message)}>
                            {this.renderTagByLevel(a.level)}
                            <Spacer inline w={0.5}/>
                            <Tag type="default" invert>{a.title ? a.title : '空标题'}</Tag>
                            <Spacer inline w={0.5}/>
                            <Tag type="secondary" invert>创建时间: {a.created_at}</Tag>
                            <Spacer inline w={0.5}/>
                            <Text p type="default"
                                  style={{
                                      display: 'inline-block',
                                      width: '90%',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      fontSize: '.9rem',
                                      lineHeight: '1rem',
                                      cursor: 'pointer',
                                  }}>{a.message ? this.trimLast(a.message) : '无告警信息'}</Text>
                        </Card.Content>
                    </Card>
                    <Spacer h={0.25}/>
                </>
            );
        });
        return alarmsGroup;
    }

    showAlarm = (message) => {
        return () => {
            this.setState({show: true, message: message});
        }
    }

    closeHandler = () => {
        this.setState({show: false, message: ''});
    }

    render() {
        return (
            <>
                <Text h4>告警管理</Text>
                <Text p b style={{fontSize: '0.85rem'}}>最近的10条告警信息</Text>
                <Dot style={{marginRight: '1rem'}} type="success">通知</Dot>
                <Dot style={{marginRight: '1rem'}} type="warning">警告</Dot>
                <Dot type="error">错误</Dot>
                <Spacer h={0.5}/>
                {this.renderAlarms()}

                <Modal visible={this.state.show} onClose={this.closeHandler}>
                    <Modal.Title>告警信息</Modal.Title>
                    <Modal.Content style={{whiteSpace: 'pre-line'}}>
                        <p>{this.trimLast(this.state.message)}</p>
                    </Modal.Content>
                    <Modal.Action onClick={({close}) => close()}>关闭</Modal.Action>
                </Modal>
            </>
        )
    }
}

export default Alarm;