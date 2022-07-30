import {Component} from "react";
import {Button, Code, Dot, Input, Spacer, Table, Tabs, Text} from "@geist-ui/core";
import {Hexagon, Layers, PauseFill, PlayFill, XCircleFill} from "@geist-ui/icons";
import {getRequest, postRequest} from "../axios/axios";
import './container.css';
import {convertTime, covertFileSize} from "../utils";
import notifySync from "../logger/notify";

class Container extends Component {
    constructor() {
        super();
        this.state = {
            containers: [],
            images: [],
        }
    }

    componentDidMount() {
        this.getContainers();
    }

    // 切换tab
    changeTab = (tab) => {
        switch (tab) {
            case 'image':
                this.getImages();
                break;
            case 'container':
                this.getContainers();
                break;
            default:
                break;
        }
    }

    getContainers = () => {
        getRequest('/api/container/containers').then(res => {
            if (res.data) {
                this.setState({containers: this.modifyContainers(res.data)});
            }
        });
    }

    getImages = () => {
        getRequest('/api/container/images').then(res => {
            if (res.data) {
                this.setState({images: this.modifyImages(res.data)});
            }
        });
    }

    // 整理数据渲染
    modifyContainers = (data) => {
        const res = [];
        data.forEach(d => {
            const c = {
                name: d.Names ? d.Names[0] : '-',
                id: <Input readOnly initialValue={d.Id} width="12rem" title={d.Id}/>,
                image: <Code>{d.Image}</Code>,
                imageId: <Input readOnly initialValue={d.ImageID} width="12rem" title={d.ImageID}/>,
                create: convertTime(d.Created),
                status: d.Status,
                state: (d.State === 'running' ? <Dot type="success"/> : <Dot type="error"/>),
                operation: '',
            };
            res.push(c);
        });
        return res;
    }

    modifyImages = (data) => {
        const res = [];
        data.forEach(d => {
            const c = {
                name: d.RepoTags ? d.RepoTags[0] : '-',
                id: <Input readOnly initialValue={d.Id} width="28rem" title={d.Id}/>,
                create: convertTime(d.Created),
                containers: d.Containers,
                size: <Code>{covertFileSize(d.Size)}</Code>,
            };
            res.push(c);
        });
        return res;
    }

    // 渲染操作按钮
    operationBtn = (value, rowData, index) => {
        return (
            <>
                <Button auto type="success" scale={0.4} width=".8rem" icon={<PlayFill/>}
                        onClick={this.startC(value, rowData, index)}/><Spacer
                inline w={0.25}/>
                <Button type="secondary" scale={0.4} width=".8rem" icon={<PauseFill/>}
                        onClick={this.stopC(value, rowData, index)}/><Spacer inline w={0.25}/>
                <Button type="error" scale={0.4} width=".8rem" icon={<XCircleFill/>}
                        onClick={this.removeC(value, rowData, index)}/>
            </>
        )
    }

    // 按钮操作
    startC = (value, rowData, index) => {
        return () => {
            const id = rowData.id.props.initialValue;
            postRequest(`/api/container/start?id=${id}`).then(res => {
                if (res.status === 'ok') {
                    notifySync(`容器${rowData.name}启动成功`, 'success');
                    this.getContainers();
                } else {
                    notifySync(`容器${rowData.name}启动失败`, 'error');
                    this.getContainers();
                }
            })
        }
    }

    stopC = (value, rowData, index) => {
        return () => {
            const id = rowData.id.props.initialValue;
            postRequest(`/api/container/stop?id=${id}`).then(res => {
                if (res.status === 'ok') {
                    notifySync(`容器${rowData.name}停止成功`, 'success');
                    this.getContainers();
                } else {
                    notifySync(`容器${rowData.name}停止失败`, 'error');
                    this.getContainers();
                }
            })
        }
    }

    removeC = (value, rowData, index) => {
        return () => {
            const id = rowData.id.props.initialValue;
            postRequest(`/api/container/remove?id=${id}`).then(res => {
                if (res.status === 'ok') {
                    notifySync(`容器${rowData.name}删除成功`, 'success');
                    this.getContainers();
                } else {
                    notifySync(`容器${rowData.name}删除失败`, 'error');
                    this.getContainers();
                }
            })
        }
    }

    render() {
        return (
            <>
                <Text h4>容器管理</Text>
                <Tabs initialValue="container" hideDivider hideBorder onChange={this.changeTab}>
                    <Tabs.Item label={<><Hexagon/>容器</>} value="container">
                        <Table data={this.state.containers}>
                            <Table.Column prop="name" label="name"/>
                            <Table.Column prop="id" label="container id"/>
                            <Table.Column prop="image" label="image"/>
                            <Table.Column prop="imageId" label="image id"/>
                            <Table.Column prop="create" label="create"/>
                            <Table.Column prop="status" label="status"/>
                            <Table.Column prop="state" label="state" className="stateDot"/>
                            <Table.Column prop="operation" label="operation" render={this.operationBtn}/>
                        </Table>
                    </Tabs.Item>
                    {/*镜像不可操作*/}
                    <Tabs.Item label={<><Layers/>镜像</>} value="image">
                        <Table data={this.state.images}>
                            <Table.Column prop="name" label="name"/>
                            <Table.Column prop="id" label="image id"/>
                            <Table.Column prop="size" label="size"/>
                            <Table.Column prop="create" label="create"/>
                            <Table.Column prop="containers" label="containers"/>
                        </Table>
                    </Tabs.Item>
                </Tabs>
            </>
        )
    }
}

export default Container;