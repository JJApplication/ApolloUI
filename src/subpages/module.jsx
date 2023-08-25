import { Component } from 'react';
import { Text } from '@geist-ui/core';

class Module extends Component {

  getTitle = (name) => {
    return name.replace('/panel', '');
  };
  
  render() {
    return (
      <Text h3>
        模块接口: <Text span style={{ color: 'blue' }}>{this.getTitle(window.location.pathname)}</Text>
      </Text>
    );
  }
}

export default Module;