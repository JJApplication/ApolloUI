import {Component} from "react";
import {Card, Dot, Grid, Modal, Note, Table, Text} from "@geist-ui/core";
import {getRequest} from "../axios/axios";

class Apps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apps: [],
            app: '',
            appInfo: {},
            data: [],
            showDialog: false
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
        this.setState({showDialog: false});
    }

    renderApps = () => {
        let appGrids = [];
        for (const app of this.state.apps) {
            appGrids.push(
                <Grid key={app.App} xs={12} sm={8} md={6} lg={6} justify="center" alignItems="flex-start"
                      style={{cursor: 'pointer'}}>
                    <Card shadow width="100%" onClick={this.showApp(app.App)}>
                        <Card.Content padding=".8rem">
                            {app.Status === 'OK' && (<Dot style={{marginRight: '5px'}} type="success"/>)}
                            {app.Status !== 'OK' && (<Dot style={{marginRight: '5px'}} type="error"/>)}
                            <Text span>{app.App}</Text>
                        </Card.Content>
                    </Card>
                </Grid>
            )
        }
        return appGrids;
    }

    render() {
        return (
            <div className="bar-wrapper">
                <Text h4>微服务状态</Text>
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
                    <Modal.Action onClick={({close}) => close()}>关闭</Modal.Action>
                </Modal>
            </div>
        )
    }
}

export default Apps;