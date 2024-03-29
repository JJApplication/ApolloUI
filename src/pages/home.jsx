// 主页

import { Component } from 'react';

import './home.css';
import { Button, Card, Code, Display, Grid, Image, Link, Text } from '@geist-ui/core';
import urls, { goto } from '../urls';
import cli from '../cli.jpg';

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
            <Display shadow
                     caption={<Text p type='warning'><Code>Apollo CLI</Code>是配套的现代化命令行交互式终端</Text>}>
              <Image width='520px' src={cli} />
            </Display>
            <Grid.Container gap={2} justify='center' style={{ margin: '1rem 0' }}>
              <Button ghost type='secondary' onClick={() => goto('/next')}>Apollo ⌈ NEXT ⌋</Button>
            </Grid.Container>
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