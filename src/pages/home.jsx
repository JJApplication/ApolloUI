// 主页

import { Component } from 'react';

import './home.css';
import { Button, Card, Code, Link, Text } from '@geist-ui/core';
import urls, { goto } from '../urls';

class Home extends Component {

  render() {
    return (
      <div id='home'>
        <div className='top-part'>
          <h1 id='header1'>Service of <span style={{ color: '#378de5' }}>Renj.io</span></h1>
          <p id='header2'>
            <strong>Apollo</strong> is a <Code>Service Manager</Code> for <a href={urls.Home} target='_blank'
                                                                             rel='noreferrer'>renj.io</a>.
          </p>
          <Card width='100%' type='success'>
            <Text h4 my={0}>Apollo + ApolloCLI</Text>
            <p style={{ marginTop: '10px' }}>It's a microservice group with
              many
              features
              which includes&nbsp;
              <span style={{
                fontSize: '1.2rem',
                color: '#ffeb36',
              }}>APP Manager, CI/CD, Tasks, MailService.</span>
            </p>
            <div style={{
              backgroundColor: 'transparent',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
              <div style={{ margin: '2rem 1rem' }}>
                <Button
                  ghost
                  type='secondary'
                  scale={2.5}
                  onClick={() => goto('/next')}>
                  Apollo ⌈ NEXT ⌋
                </Button>
              </div>
              <Text p type='warning'><Code>Apollo NEXT</Code>现已发布</Text>
            </div>
            <Card.Footer>
              <Link color style={{ color: '#9aff69' }} target='_blank'
                    href={urls.Apollo}>Visit source code
                on GitHub.</Link>
            </Card.Footer>
          </Card>
        </div>
      </div>
    );
  }
}

export default Home;