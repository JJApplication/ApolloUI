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
            uploading: false,
            deleting: false,
            refreshing: false,
        }
    }

    componentDidMount() {
        this.getFilesTree();
    }

    getFilesTree = () => {
        const errTree = [{
            type: 'directory',
            name: 'ErrorGetFilesTree',
            extra: '1 file',
        }];
        getRequest('/api/app/tree').then(res => {
            if (!res.data) {
                this.setState({files: errTree, refreshing: false});
            } else {
                this.setState({files: res.data, refreshing: false});
            }
        }).catch(()=>this.setState({files: errTree, refreshing: false}));
    }

    treePathHandle = (path) => {
        this.setState({path: path});
    }

    handleUpload = () => {
        this.setState({uploading: true});
    }

    handleDelete = () => {
        this.setState({deleting: true});
    }

    handleRefresh = () => {
        this.setState({refreshing: true});
        setTimeout(() => {
            this.getFilesTree();
        }, 100);
    }

    render() {
        return (
            <>
                <Text h4>微服务文件树</Text>
                <Card>
                    <Grid.Container gap={1} justify="center">
                        <Grid xs={16}><Input readOnly initialValue={this.state.path} label="当前路径" width="100%"/></Grid>
                        <Grid xs={8}>
                            {this.state.uploading && (<Button loading auto shadow type="success" scale={0.75}/>)}
                            {!this.state.uploading && (
                                <Button auto shadow type="success" scale={0.75} iconRight={<Upload/>}
                                        onClick={this.handleUpload}/>)}
                            <Spacer w={.5} inline/>
                            {this.state.deleting && (<Button loading auto shadow type="error" scale={0.75} iconRight={<Delete/>}/>)}
                            {!this.state.deleting && (<Button auto shadow type="error" scale={0.75} iconRight={<Delete/>} onClick={this.handleDelete}/>)}
                            <Spacer w={.5} inline/>
                            {this.state.refreshing && (<Button loading auto shadow type="secondary" scale={0.75} iconRight={<RefreshCw/>}/>)}
                            {!this.state.refreshing && (<Button auto shadow type="secondary" scale={0.75} iconRight={<RefreshCw/>} onClick={this.handleRefresh}/>)}
                        </Grid>
                    </Grid.Container>
                </Card>

                <Tree value={this.state.files} onClick={this.treePathHandle}/>
            </>
        )
    }
}

export default Filetree;