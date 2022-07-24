import {Component} from "react";
import {Code, Grid, Link, Modal, Rating, Spacer, Text} from "@geist-ui/core";
import urls from "../urls";

class About extends Component {
    constructor() {
        super();
        this.state = {
            value: 1,
            showDialog: false
        }
    }

    setValue = (e) => {
        this.setState({value: e});
    }

    isLock = (e) => {
        console.log(e)
        if (e) {
            this.setState({showDialog: true});
        }
    }

    closeHandler = () => {
        this.setState({showDialog: false});
    }

    render() {
        return (
            <>
                <Text h4>关于Apollo</Text>
                <Text>
                    简简单单的微服务管理应用 by <Link color href={urls.Home}>renj.io</Link>
                </Text>
                <Text>
                    Apollo运行时依赖
                    <Text span b>OctopusTree</Text><Spacer w={0.5} inline/>
                    <Text span b>OctopusTwig</Text><Spacer w={0.5} inline/>
                    <Text span b>Plnack-proto</Text><Spacer w={0.5} inline/>
                </Text>
                <Spacer h={0.5}/>
                <Text p b>
                    Powered by <Link color href={urls.JJApplication}>JJApplication</Link>
                </Text>
                <Text p b>
                    Copyright © <Link color href={urls.Landers1037}>Landers1037</Link>
                </Text>
                <Grid.Container gap={1}>
                    <Grid xs={24} md={12} justify="center">
                        <Rating type="error" value={this.state.value} onValueChange={this.setValue}
                                onLockedChange={this.isLock}/>
                    </Grid>
                    <Grid xs={12} md={6} justify="center">评分: {this.state.value}</Grid>
                </Grid.Container>

                {/*评分对话框*/}
                <Modal visible={this.state.showDialog} onClose={this.closeHandler}>
                    <Modal.Title>评价Apollo</Modal.Title>
                    <Modal.Subtitle>😘😘😘</Modal.Subtitle>
                    <Modal.Content>
                        <p>确定提交你的评分吗: <Code>{this.state.value}</Code></p>
                    </Modal.Content>
                    <Modal.Action passive onClick={({close}) => close()}>不了</Modal.Action>
                    <Modal.Action onClick={({close}) => close()}>提交</Modal.Action>
                </Modal>
            </>
        );
    }
}

export default About;