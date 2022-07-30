import {Component} from "react";
import {Card, Spacer, Tag, Text} from "@geist-ui/core";
import {getRequest} from "../axios/axios";

class Tasks extends Component {
    constructor() {
        super();
        this.state = {
            cronTasks: [],
            backgroundTasks: [],
        }
    }

    componentDidMount() {
        this.getAllBGTasks();
    }

    getAllBGTasks = () => {
        getRequest('/api/task').then(res => {
            if (res.data) {
                this.setState({backgroundTasks: res.data});
            }
        })
    }

    renderAllCronTasks = () => {
        const tasksGroup = [];
        if (this.state.cronTasks.length === 0) {
            tasksGroup.push(
                <>
                    <Card hoverable type="violet" style={{fontSize: '0.8rem'}}>
                        <p>暂无任务执行</p>
                    </Card>
                    <Spacer h={0.25}/>
                </>
            );
            return tasksGroup;
        }
        this.state.cronTasks.forEach(t => {
            tasksGroup.push(
                <>
                    <Card hoverable type="violet" style={{fontSize: '0.8rem'}}>
                        <Tag type="default">{t.name}</Tag>
                    </Card>
                    <Spacer h={0.25}/>
                </>
            );
        });

        return tasksGroup;
    }

    renderAllBGTasks = () => {
        const tasksGroup = [];
        if (this.state.backgroundTasks.length === 0) {
            tasksGroup.push(
                <>
                    <Card hoverable type="success" style={{fontSize: '0.8rem'}}>
                        <p>暂无任务执行</p>
                    </Card>
                    <Spacer h={0.25}/>
                </>
            );
            return tasksGroup;
        }
        this.state.backgroundTasks.forEach(t => {
            tasksGroup.push(
                <>
                    <Card hoverable type="success">
                        <Tag type="default">任务名称: {t.name}</Tag><Spacer inline w={0.5}/>
                        <Tag type="warning" invert>创建时间: {this.convertTime(t.create_time)}</Tag>
                        <Spacer h={0.5}/>
                        <Text p b font={0.5}>任务描述: {t.des ? t.des : '任务无描述信息'}</Text>
                        <Text b font={0.75}>任务ID: {t.uuid}</Text>
                        <Spacer h={0.25}/>
                        <Text b font={0.75}>执行周期: {t.duration}s</Text>
                    </Card>
                    <Spacer h={0.25}/>
                </>
            );
        });

        return tasksGroup;
    }


    // 时间戳转换 需要附加毫秒计数
    convertTime = (t) => {
        const d = new Date(t * 1000).toLocaleString();
        return d;
    }

    render() {
        return (
            <>
                <Text h4>任务管理</Text>
                <Text b>后台任务</Text>
                <Spacer h={0.5}/>
                {this.renderAllBGTasks()}
                <Spacer h={1.5}/>
                <Text b>定时任务</Text>
                <Spacer h={0.5}/>
                {this.renderAllCronTasks()}

            </>
        )
    }
}

export default Tasks;