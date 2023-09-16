import { Button, Card, Grid, Input, Spacer, Text, Tree } from '@geist-ui/core';
import { Delete, RefreshCw, Upload } from '@geist-ui/icons';
import { useEffect, useRef, useState } from 'react';
import { getRequest, postRequest } from '../../axios/axios';
import store from '../../store/store';
import Loading from './Loading';
import { Toast } from './toast';

export default function() {
  const [autoHide, setAutoHide] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [path, setPath] = useState('');
  const [files, setFiles] = useState([]);
  const uploadRef = useRef();

  useEffect(() => {
    const data = store.getState();
    setAutoHide(data ? data.autoHide : false);
    getFilesTree();
  }, []);

  const getFilesTree = () => {
    setLoading(true);
    setPath('');
    const errTree = [{
      type: 'directory',
      name: 'ErrorGetFilesTree',
      extra: '1 file',
    }];
    getRequest('/api/app/tree').then(res => {
      if (!res.data) {
        setFiles(errTree);
        setRefreshing(false);
      } else {
        setFiles(res.data);
        setRefreshing(false);
      }
      setLoading(false);
    }).catch(() => {
      setFiles(errTree);
      setRefreshing(false);
      setLoading(false);
      Toast.error('获取文件树结构失败');
    });
  };

  const treePathHandle = (path) => {
    setPath(path);
  };

  // 获取文件路径
  const getFilePath = (f) => {
    let sp = f.split('/');
    if (sp.length > 1) {
      sp.pop();
    }

    return sp.join('/');
  };

  const openUpload = () => {
    uploadRef.current.click();
  };

  const handleUpload = (e) => {
    setUploading(true);
    const files = e.target.files;
    if (!files) {
      Toast.warn('文件上传列表为空');
      setUploading(false);
    }
    const data = new FormData();
    for (const f of files) {
      data.append('files', f);
    }
    const filePath = getFilePath(path);
    postRequest(`/api/app/upload?path=${filePath}`, data).then(res => {
      if (res.status === 'ok') {
        Toast.success('文件上传成功');
      } else {
        Toast.error('文件上传失败');
      }
      getFilesTree();
      setUploading(false);
    }).catch(() => {
      Toast.error('文件上传失败');
      setUploading(false);
    });
  };

  const handleDelete = () => {
    setDeleting(true);
    if (!path || path === '') {
      Toast.warn('文件列表为空');
      setDeleting(false);
      return;
    }
    postRequest(`/api/app/remove?file=${path}`).then(res => {
      if (res.status === 'ok') {
        Toast.success('文件删除成功');
        getFilesTree();
      } else {
        Toast.error('文件删除失败');
      }
      setDeleting(false);
    }).catch(() => {
      Toast.error('文件删除失败');
      setDeleting(false);
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getFilesTree();
    }, 100);
  };

  return (
    <>
      <Text h3>微服务文件树</Text>
      <Card>
        <Grid.Container gap={1} justify='center'>
          <Grid xs={16}><Input readOnly initialValue={path} label='当前路径' width='100%' /></Grid>
          {!autoHide ? (<Grid xs={8} className='upload'>
            {uploading ? (
                <Button loading auto shadow type='success' scale={0.75}>上传</Button>) :
              (<>
                <Button id='filebtn' auto shadow type='success' scale={0.75} iconRight={<Upload />}
                        onClick={openUpload} />
                <Input id='file' htmlType='file' multiple ref={uploadRef}
                       onChange={handleUpload} style={{ display: 'none' }} />
              </>)}
            <Spacer w={.5} inline />
            {deleting ? (
              <Button loading auto shadow type='error' scale={0.75}
                      iconRight={<Delete />}>删除</Button>) : (
              <Button auto shadow type='error' scale={0.75} iconRight={<Delete />}
                      onClick={handleDelete} />)}
            <Spacer w={.5} inline />
            {refreshing ? (
              <Button loading auto shadow type='secondary' scale={0.75}
                      iconRight={<RefreshCw />}>删除</Button>) : (
              <Button auto shadow type='secondary' scale={0.75} iconRight={<RefreshCw />}
                      onClick={handleRefresh} />)}
          </Grid>) : null}
        </Grid.Container>
      </Card>
      {loading && <Loading />}
      {!loading &&
        <div style={{ padding: '1rem' }}>
          <Tree value={files} onClick={treePathHandle} />
        </div>
      }
    </>
  );
}