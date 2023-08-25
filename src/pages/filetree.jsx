import { Component, createRef } from 'react';
import { Button, Card, Grid, Input, Spacer, Text, Tree } from '@geist-ui/core';
import { getRequest, postRequest } from '../axios/axios';
import { Delete, RefreshCw, Upload } from '@geist-ui/icons';
import notifySync from '../logger/notify';
import './filetree.css';
import store from '../store/store';

class Filetree extends Component {
  constructor() {
    super();
    this.ref = createRef();
    this.state = {
      files: [],
      path: '',
      autoHide: false,
      uploading: false,
      deleting: false,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.getFilesTree();
    const data = store.getState();
    this.setState({ autoHide: data ? data.autoHide : false });
  }

  getFilesTree = () => {
    this.setState({ path: '' });
    const errTree = [{
      type: 'directory',
      name: 'ErrorGetFilesTree',
      extra: '1 file',
    }];
    getRequest('/api/app/tree').then(res => {
      if (!res.data) {
        this.setState({ files: errTree, refreshing: false });
      } else {
        this.setState({ files: res.data, refreshing: false });
      }
    }).catch(() => this.setState({ files: errTree, refreshing: false }));
  };

  treePathHandle = (path) => {
    this.setState({ path: path });
  };

  // 获取文件路径
  getFilePath(f) {
    let sp = f.split('/');
    if (sp.length > 1) {
      sp.pop();
    }

    return sp.join('/');
  }

  openUpload = () => {
    this.ref.current.click();
  };

  handleUpload = (e) => {
    this.setState({ uploading: true });
    const files = e.target.files;
    if (!files) {
      notifySync('文件上传列表为空', 'warning');
      this.setState({ uploading: false });
    }
    let data = new FormData();
    for (const f of files) {
      data.append('files', f);
    }
    const path = this.getFilePath(this.state.path);
    postRequest(`/api/app/upload?path=${path}`, data).then(res => {
      if (res.status === 'ok') {
        notifySync('文件上传成功', 'success');
      } else {
        notifySync('文件上传失败', 'error');
      }
      this.getFilesTree();
      this.setState({ uploading: false });
    }).catch(() => {
      notifySync('文件上传失败', 'error');
      this.setState({ uploading: false });
    });
  };

  handleDelete = () => {
    this.setState({ deleting: true });
    const file = this.state.path;
    if (!file || file === '') {
      notifySync('文件列表为空', 'error');
      this.setState({ deleting: false });
      return;
    }
    postRequest(`/api/app/remove?file=${file}`).then(res => {
      if (res.status === 'ok') {
        notifySync('文件删除成功', 'success');
        this.getFilesTree();
      } else {
        notifySync('文件删除失败', 'error');
      }
      this.setState({ deleting: false });
    }).catch(() => {
      notifySync('文件删除失败', 'error');
      this.setState({ deleting: false });
    });
  };

  handleRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.getFilesTree();
    }, 100);
  };

  render() {
    return (
      <>
        <Text h4>微服务文件树</Text>
        <Card>
          <Grid.Container gap={1} justify='center'>
            <Grid xs={16}><Input readOnly initialValue={this.state.path} label='当前路径' width='100%' /></Grid>
            {!this.state.autoHide ? (<Grid xs={8} className='upload'>
              {this.state.uploading ? (
                  <Button loading auto shadow type='success' scale={0.75}>上传</Button>) :
                (<>
                  <Button id='filebtn' auto shadow type='success' scale={0.75} iconRight={<Upload />}
                          onClick={this.openUpload} />
                  <Input id='file' htmlType='file' multiple ref={this.ref}
                         onChange={this.handleUpload} style={{ display: 'none' }} />
                </>)}
              <Spacer w={.5} inline />
              {this.state.deleting ? (
                <Button loading auto shadow type='error' scale={0.75}
                        iconRight={<Delete />}>删除</Button>) : (
                <Button auto shadow type='error' scale={0.75} iconRight={<Delete />}
                        onClick={this.handleDelete} />)}
              <Spacer w={.5} inline />
              {this.state.refreshing ? (
                <Button loading auto shadow type='secondary' scale={0.75}
                        iconRight={<RefreshCw />}>删除</Button>) : (
                <Button auto shadow type='secondary' scale={0.75} iconRight={<RefreshCw />}
                        onClick={this.handleRefresh} />)}
            </Grid>) : null}
          </Grid.Container>
        </Card>

        <Tree value={this.state.files} onClick={this.treePathHandle} />
      </>
    );
  }
}

export default Filetree;