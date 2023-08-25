import { Component } from 'react';
import Header from './header';
import { Page } from '@geist-ui/core';

class Layout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Page style={{ width: '100%', maxWidth: '48rem' }}>
          <Page.Header>
            <Header />
          </Page.Header>
          <Page.Content paddingTop='1.5rem'>
            {this.props.children}
          </Page.Content>
        </Page>
      </>
    );
  }
}

export default Layout;