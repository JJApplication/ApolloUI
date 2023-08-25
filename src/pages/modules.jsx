import { Component } from 'react';
import { Button, Card, Code, Divider, Link, Table, Text } from '@geist-ui/core';
import Anchor from '@geist-ui/icons/anchor';
import urls from '../urls';
import { getRequest } from '../axios/axios';

class Modules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  getModules = () => {
    getRequest('/api/modules').then(res => {
      if (res.data) {
        const data = res.data.map(d => {
          return { name: d.Name, des: d.Des, path: <Code>{d.Path}</Code>, apis: this.renderIcon(d.Path) };
        });
        this.setState({ data: data });
      }
    });
  };

  renderIcon = (url) => {
    return (
      <>
        <Button icon={<Anchor />} auto scale={0.8} onClick={() => {
          window.location.href = `/panel${url}`;
        }} />
      </>
    );
  };

  componentDidMount() {
    this.getModules();
  }

  render() {
    return (
      <>
        <Text h4>动态路由模块</Text>
        <Text>
          动态模块机制基于<Link color href={urls.Atlas} target='_blank'>Atlas项目</Link>,
          在Apollo运行时中允许以模块的方式动态向Apollo注册路由
        </Text>
        <Card shadow style={{ margin: '1rem', overflowX: 'auto' }}>
          <Text h5 type='success'>当前注册的路由模块</Text>
          <Text small>模块数: {this.state.data.length || 0}</Text>
          <Divider h={2} type={'success'} margin={2}>路由表</Divider>
          <Table data={this.state.data}>
            <Table.Column prop='name' label='模块名称' width={120} />
            <Table.Column prop='path' label='路由' />
            <Table.Column prop='des' label='功能描述' />
            <Table.Column prop='apis' label='查看接口' width={80} />
          </Table>
          <Card.Footer>
            <Link target='_blank' color href={urls.Atlas}>Powered by Atlas</Link>
          </Card.Footer>
        </Card>
      </>
    );
  }
}

export default Modules;