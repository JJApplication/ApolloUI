import {Component} from "react";
import {Button, Card, Grid, Input, Spacer, Text, Tree} from "@geist-ui/core";
import {getRequest} from "../axios/axios";
import {Delete, RefreshCw, Upload} from "@geist-ui/icons";

class Filetree extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
            path: '',
            uploading: false
        }
    }

    componentDidMount() {
        this.getFilesTree();
    }

    getFilesTree = () => {
        getRequest('/api/app/tree').then(res => {
            if (!res.data) {
                const errTree = [{
                    type: 'directory',
                    name: 'ErrorGetFilesTree',
                    extra: '1 file',
                }];
                this.setState({files: errTree});
            } else {
                this.setState({files: res.data});
            }
        })
    }

    treePathHandle = (path) => {
        this.setState({path: path});
    }

    handleUpload = () => {
        this.setState({uploading: true});
    }

    render() {
        return (
            <>
                <Text h4>微服务文件树</Text>
                <Card>
                    <Grid.Container gap={1} justify="center">
                        <Grid xs={16}><Input readOnly initialValue={this.state.path} label="当前路径" width="100%"/></Grid>
                        <Grid xs={8}>
                            {this.state.uploading && (<Button loading auto type="success" scale={0.75}>Action</Button>)}
                            {!this.state.uploading && (
                                <Button auto type="success" scale={0.75} iconRight={<Upload/>}
                                        onClick={this.handleUpload}/>)}
                            <Spacer w={.5} inline/>
                            <Button auto type="error" scale={0.75} iconRight={<Delete/>}/>
                            <Spacer w={.5} inline/>
                            <Button auto type="secondary" scale={0.75} iconRight={<RefreshCw/>}/>
                        </Grid>
                    </Grid.Container>
                </Card>

                <Tree value={this.state.files} onClick={this.treePathHandle}/>
            </>
        )
    }
}

export default Filetree;