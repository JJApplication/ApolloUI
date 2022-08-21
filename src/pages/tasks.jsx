import {Component} from "react";
import {Card, Spacer, Tag, Text} from "@geist-ui/core";
import {getRequest} from "../axios/axios";
import {convertTime, convertTimeEX} from "../utils";

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
        this.getAllCronTasks();
    }

    getAllBGTasks = () => {
        getRequest('/api/task/bg').then(res => {
            if (res.data) {
                this.setState({backgroundTasks: res.data});
            }
        })
    }

    getAllCronTasks = () => {
        getRequest('/api/task/cron').then(res => {
            if (res.data) {
                this.setState({cronTasks: res.data});
            }
        })
    }

    renderAllCronTasks = () => {
        const tasksGroup = [];
        if (this.state.cronTasks.length === 0) {
            tasksGroup.push(
                <>
                    <Card key="emptycron" hoverable type="violet">
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
                    <Card hoverable type="violet" key={t.task_name}>
                        <Tag type="default">任务名称: {t.task_name}</Tag>
                        <Spacer inline w={0.5}/>
                        <Tag type="warning" invert>创建时间: {convertTime(t.create_time)}</Tag>
                        <Spacer inline w={0.5}/>
                        <Tag type="default">执行周期: {t.spec}</Tag>
                        <Spacer inline w={0.5}/>
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
                    <Card key="emptybg" hoverable type="success">
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
                    <Card hoverable type="success" key={t.name}>
                        <Tag type="default">任务名称: {t.name}</Tag>
                        <Spacer inline w={0.5}/>
                        <Tag type="warning" invert>创建时间: {convertTime(t.create_time)}</Tag>
                        <Spacer inline w={0.5}/>
                        <Tag type="dark">上次执行: {convertTimeEX(t.lastRun)}</Tag>
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