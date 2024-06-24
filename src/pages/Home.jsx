import { Button, Card, Code, Display, Divider, Grid, Link, Popover, Spacer, Tabs, Text } from '@geist-ui/core';
import { Anchor, Github, LogIn } from '@geist-ui/icons';
import './Home.css';
import urls from '../urls';
import appImg from './app.png';
import design from './design.jpg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import go from '../icons/go-original.svg';
import js from '../icons/javascript-original.svg';
import py from '../icons/python-original.svg';
import rust from '../icons/rust-original.svg';
import docker from '../icons/docker-original.svg';
import nginx from '../icons/nginx-original.svg';
import redis from '../icons/redis-original.svg';
import mongo from '../icons/mongodb-original.svg';
import { code_json } from '../code/code_json';
import { code_yaml } from '../code/code_yaml';
import github_code from './github.svg';


export default function() {
  const [offset, setOffset] = useState(0);
  const [scroll, setScroll] = useState(false);

  const scrollEvent = (() => {
    const top = document.documentElement.scrollTop;
    setOffset(top);
  });

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);
    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  });

  useEffect(() => {
    if (offset > 0) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }, [offset, scrollEvent]);

  const nav = useNavigate();
  const menu1 = () => {
    return (
      <div className={'menu-item'}>
        <Link href={'/home'}>Home (deprecated)</Link>
        <Spacer h={0.75} />
        <Link href={'/next'}>Home NEXT</Link>
      </div>
    );
  };

  const menu2 = () => {
    return (
      <div className={'menu-item'}>
        <Link href={urls.Docs} target={'_blank'}>Development Docs</Link>
        <Spacer h={0.75} />
        <Link href={`${urls.Docs}/#/jjapp/start`} target={'_blank'}>Quick Start</Link>
        <Spacer h={0.75} />
        <Link href={`${urls.Docs}/#/jjapp/octopus`} target={'_blank'}>OctopusMeta Info</Link>
        <Spacer h={0.75} />
        <Link href={`${urls.Docs}/#/jjapp/atlas`} target={'_blank'}>Apollo Extensions</Link>
        <Spacer h={0.75} />
        <Link href={`${urls.Docs}/#/jjapp/fushin`} target={'_blank'}>Use Fushin Stone</Link>
        <Spacer h={0.75} />
        <Link href={`${urls.Docs}/#/jjapp/twig`} target={'_blank'}>How apps communicate?</Link>
        <Spacer h={0.75} />
        <Link href={`${urls.Docs}/#/jjapp/register`} target={'_blank'}>App Auto discovery</Link>
      </div>
    );
  };

  const menu3 = () => {
    return (
      <div className={'menu-item'}>
        <Link href={urls.Home} target={'_blank'}>Homepage</Link>
        <Spacer h={0.75} />
        <Link href={urls.Blog} target={'_blank'}>Blog</Link>
        <Spacer h={0.75} />
        <Link href={urls.Gallery} target={'_blank'}>Personal Gallery</Link>
        <Spacer h={0.75} />
        <Link href={urls.Drive} target={'_blank'}>Cloud Drive</Link>
        <Spacer h={0.75} />
        <Link href={urls.Status} target={'_blank'}>Online Status</Link>
        <Spacer h={0.75} />
        <Link href={urls.Resume} target={'_blank'}>Online Resume</Link>
        <Spacer h={0.75} />
        <Link href={urls.Facebook} target={'_blank'}>Facebook</Link>
      </div>
    );
  };
  return (
    <>
      <div id='home-page'>
        <div id='home-header'>
          <Text span b i font='2.2rem' marginRight='0.75rem'
                style={{ letterSpacing: '0.6px', cursor: 'pointer', userSelect: 'none' }}
                onClick={() => {
                  window.location.href = '/';
                }}>
            <Text span type='success'>A</Text>
            <Text span type='error'>p</Text>
            <Text span type='error'>o</Text>
            <Text span type='error'>l</Text>
            <Text span type='error'>l</Text>
            <Text span type='warning'>o</Text>
          </Text>
          <div className='home-header-menu'>
            <Popover enterDelay={0} leaveDelay={10} trigger={'hover'} placement={'bottom'} content={menu1}>
              Navigation
            </Popover>
            <Spacer w={1.5} inline />
            <Popover enterDelay={0} leaveDelay={10} trigger={'hover'} placement={'bottom'} content={menu2}>
              Developer
            </Popover>
            <Spacer w={1.5} inline />
            <Popover enterDelay={0} leaveDelay={10} trigger={'hover'} placement={'bottom'} content={menu3}>
              Pages
            </Popover>
            <Spacer w={1.5} inline />
            <Link className={'head-link'} href={urls.Blog} target={'_blank'}>
              Blog
            </Link>
            <Spacer w={1.5} inline />
            <Link className={'head-link'} href={'/next/about'}>
              About Apollo
            </Link>
            <Spacer w={1.5} inline />
            <Link className={'head-link'} href={urls.JJApplication} target={'_blank'}>
              Github
            </Link>
            <div style={{ position: 'absolute', right: '1rem', top: '0.5rem' }}>
              <Button auto onClick={() => nav('/next')}>Get Started</Button>
              <Spacer w={1} inline />
              <Button auto type={'success'} onClick={() => nav('/next/login')}>Login</Button>
            </div>
          </div>
        </div>
        {
          <div className={scroll ? 'home-page-header-scroll' : 'home-page-header-scroll-disable'}>
            <div className={'home-page-header-scroll-body'}>
              <Text span b i font='2rem'
                    style={{ letterSpacing: '0.6px', cursor: 'pointer', userSelect: 'none' }}
                    onClick={() => {
                      window.location.href = '/';
                    }}>
                <Text span type='success'>A</Text>
                <Text span type='error'>p</Text>
                <Text span type='error'>o</Text>
                <Text span type='error'>l</Text>
                <Text span type='error'>l</Text>
                <Text span type='warning'>o</Text>
              </Text>
              <div style={{ position: 'absolute', right: '1.5rem', top: '0.85rem' }}>
                <Button auto shadow type={'secondary'} onClick={() => nav(urls.JJApplication)} iconRight={<Github />}
                        px={0.6} />
                <Spacer w={1} inline />
                <Button auto shadow onClick={() => nav('/next')} iconRight={<Anchor />} px={0.6} />
                <Spacer w={1} inline />
                <Button auto shadow type={'success'} onClick={() => nav('/next/login')} iconRight={<LogIn />}
                        px={0.6} />
              </div>
            </div>
          </div>
        }
        <div className={'home-page-body'}>
          <div style={{
            padding: '10em 0 5rem 0',
          }}>
            <Grid>
              <Grid.Container gap={1} justify={'space-between'}>
                <Grid md={16} style={{
                  display: 'block',
                }}>
                  <Text p className={'home-page-banner-first text-color-line'}>JJApps Group</Text>
                  <Spacer h={1} />
                  <Text p className={'home-page-banner-second'}>Manager all your microservices.</Text>
                  <Text p className={'home-page-banner-second'}>Easily integrate any microservice and component.</Text>
                  <Spacer h={1} />
                  <Text p className={'home-page-banner-third'}>Registered microservices compliant with JJApps'
                    microservice model
                    specification <Code>octopusMeta</Code> are
                    registered to Apollo based on Auto-Discovery.</Text>
                  <Spacer h={0.5} />
                  <Text p className={'home-page-banner-third'}>You can write your microservices in any language and
                    framework!</Text>
                </Grid>
                <Grid md={8}>
                  <div className={'jjapps-logo'}></div>
                </Grid>
              </Grid.Container>
            </Grid>
          </div>
          <div style={{ margin: '2.5rem 0', width: '100%' }}>
            <Display shadow caption='Design of JJApps'>
              <div style={{ padding: '1rem' }}>
                <img width='100%' height='100%' src={design} style={{ maxWidth: '64rem' }} />
              </div>
            </Display>
          </div>
          <Text className={'home-page-title-first'}>JJApps Architecture</Text>
          <Spacer h={0.5} />
          <Card width={'100%'} shadow>
            <Card.Content style={{ width: 'unset' }}>
              <Grid.Container gap={1}>
                <Grid md={12} sm={12} xs={24}>
                  <div>
                    <img src={appImg} alt={'service framework'} />
                  </div>
                </Grid>
                <Grid md={12} sm={12} xs={24}>
                  <Card width={'100%'} height={'100%'} style={{ backgroundColor: '#404040', color: '#fff' }}>
                    <Card.Content style={{ width: 'unset', padding: '1.25rem' }}>
                      <Text h1 style={{ fontSize: '3rem' }}>Simple Framework of Microservice</Text>
                      <Text>- Best practice of service-mesh</Text>
                      <Text>- Application meta SPEC</Text>
                      <Text>- Container-liked process</Text>
                      <Text>- All-in-one Control Panel</Text>
                      <Spacer h={2} />
                      <Text>with heart and love 💕.</Text>
                      <Text>2023 - JJApps</Text>
                    </Card.Content>
                  </Card>
                </Grid>
              </Grid.Container>
            </Card.Content>
          </Card>
          <Spacer h={4} />
          <Text className={'home-page-title-first'}>JJApps <Text span
                                                                 style={{ color: '#2289e5' }}>Components</Text></Text>
          <Grid.Container gap={2}>
            <Grid md={12} sm={12} xs={24}>
              <Card width={'100%'} height={'100%'}>
                <Card.Content style={{ width: 'unset', fontSize: '1.125rem' }}>
                  <Text h1>OctopusMeta</Text>
                  <Text>Models of JJApplication microservice. Declaring microservices through a unified customized
                    model </Text>
                  <Text>- Metadata all in one model</Text>
                  <Text>- Container friendly</Text>
                  <Text>- User customized</Text>
                  <Text>- Auto Discovery</Text>
                  <Text>- Managed by Apollo</Text>
                </Card.Content>
              </Card>
            </Grid>
            <Grid md={12} sm={12} xs={24}>
              <Card width={'100%'} height={'100%'}>
                <Card.Content style={{ width: 'unset', fontSize: '1.125rem' }}>
                  <Text h1>Fushin Stone</Text>
                  <Text>Lightweight microservices development framework just written in golang.</Text>
                  <Text>- Create an app using <code>crj [appname]</code></Text>
                  <Text>- With necessary components</Text>
                  <Text>- Integrated JJApp's microservice model</Text>
                  <Text>- One-Click install using <code>go get jjapplication/fushin</code></Text>
                </Card.Content>
              </Card>
            </Grid>
          </Grid.Container>
          <Spacer h={1} />
          <Grid.Container gap={2}>
            <Grid md={12} sm={12} xs={24}>
              <Card width={'100%'} height={'100%'}>
                <Card.Content style={{ width: 'unset', fontSize: '1.125rem' }}>
                  <Text h1>NoEngine</Text>
                  <Text>(deprecated) nginx-based gateway with lua extensions</Text>
                  <Text>- High availability</Text>
                  <Text>- Traffic forwarding</Text>
                  <Text>- App proxy</Text>
                  <Text>- Static server</Text>
                  <Text>- Custom headers</Text>
                </Card.Content>
              </Card>
            </Grid>
            <Grid md={12} sm={12} xs={24}>
              <Card width={'100%'} height={'100%'}>
                <Card.Content style={{ width: 'unset', fontSize: '1.125rem' }}>
                  <Text h1>Rainbow Bridge</Text>
                  <Text>The Next-Generation-Gateway inspired by norse mythology</Text>
                  <Text>- Modular components</Text>
                  <Text>- Customized forwarding rules</Text>
                  <Text>- Built-in Flow Metrics</Text>
                  <Text>- Supports Layer 3 and Layer 4 networks</Text>
                </Card.Content>
              </Card>
            </Grid>
          </Grid.Container>
          <Spacer h={1} />
          <Grid.Container gap={2}>
            <Grid md={12} sm={12} xs={24}>
              <Card width={'100%'} height={'100%'}>
                <Card.Content style={{ width: 'unset', fontSize: '1.125rem' }}>
                  <Text h1>Container</Text>
                  <Text>Support for accessing docker containers through docker apis</Text>
                  <Text>- Manage containers by Apollo</Text>
                  <Text>- Web UI of Container management</Text>
                  <Text>- Support Docker compose file</Text>
                </Card.Content>
              </Card>
            </Grid>
            <Grid md={12} sm={12} xs={24}>
              <Card width={'100%'} height={'100%'}>
                <Card.Content style={{ width: 'unset', fontSize: '1.125rem' }}>
                  <Text h1>Dreams In Bottle</Text>
                  <Text>Application sandbox like a light-weight container. Running processes just like dreaming in a
                    bottle which they can't escape</Text>
                  <Text>- Sandbox features</Text>
                  <Text>- With Chroot</Text>
                  <Text>- With Cgroups v1</Text>
                  <Text>- With normal namespaces</Text>
                </Card.Content>
              </Card>
            </Grid>
          </Grid.Container>
          <Spacer h={1} />
          <Grid.Container gap={2}>
            <Grid md={12} sm={12} xs={24}>
              <Card width={'100%'} height={'100%'}>
                <Card.Content style={{ width: 'unset', fontSize: '1.125rem' }}>
                  <Text h1>Cloud Native</Text>
                  <Text>JJApps' microservices are designed for Cloud Native</Text>
                  <Text>- Unified configuration</Text>
                  <Text>- Load from .env or ENVs</Text>
                  <Text>- Unified GRPC</Text>
                  <Text>- Stand-alone mode</Text>
                </Card.Content>
              </Card>
            </Grid>
            <Grid md={12} sm={12} xs={24}>
              <Card width={'100%'} height={'100%'}>
                <Card.Content style={{ width: 'unset', fontSize: '1.125rem' }}>
                  <Text h1>Alarm Reporting</Text>
                  <Text>Microservice-Group's alarms are reported via email or SMS</Text>
                  <Text>- Hermes module for email</Text>
                  <Text>- WDNMD module for system monitor</Text>
                  <Text>- Heimdal module for SMS</Text>
                </Card.Content>
              </Card>
            </Grid>
          </Grid.Container>
          <div className={'page-body2'}>
            <Spacer h={4} />
            <Text className={'home-page-title-first'}>Quick Start</Text>
            <Text className={'home-page-title-second'}>Trying to integrate a microservice to JJApps.</Text>
            <Text className={'home-page-title-second'}>All that is needed is the following simple configuration model
              file.</Text>
            <Text className={'home-page-title-second'}>Place the model files in the <Code>.octopus</Code> directory,
              Auto-Discovery service will register your microservices soon.</Text>
            <Tabs initialValue='1'>
              <Tabs.Item label='JSON' value='1'>
                <Code block name='X.json' my={0} style={{ fontFamily: 'consolas, monospace' }}>
                  {JSON.stringify(code_json, null, '  ')}
                </Code>
              </Tabs.Item>
              <Tabs.Item label='YAML' value='2'>
                <Code block name='X.yaml' my={0} style={{ fontFamily: 'consolas, monospace' }}>
                  {code_yaml}
                </Code>
              </Tabs.Item>
            </Tabs>
            <Spacer h={4} />
            <Text className={'home-page-title-first'}>Infrastructure</Text>
            <Grid.Container gap={1.5}>
              <Grid md={6} sm={12} xs={24}>
                <Card width='100%' className={'language'}>
                  <img src={go} className={'language-logo'} alt={'logo'} />
                  <Text span my={0} className={'language-text'}>Go</Text>
                </Card>
              </Grid>
              <Grid md={6} sm={12} xs={24}>
                <Card width='100%' className={'language'}>
                  <img src={js} className={'language-logo'} alt={'logo'} />
                  <Text span my={0} className={'language-text'}>Javascript</Text>
                </Card>
              </Grid>
              <Grid md={6} sm={12} xs={24}>
                <Card width='100%' className={'language'}>
                  <img src={py} className={'language-logo'} alt={'logo'} />
                  <Text span my={0} className={'language-text'}>Python</Text>
                </Card>
              </Grid>
              <Grid md={6} sm={12} xs={24}>
                <Card width='100%' className={'language'}>
                  <img src={rust} className={'language-logo'} alt={'logo'} />
                  <Text span my={0} className={'language-text'}>Rust</Text>
                </Card>
              </Grid>
              <Grid md={6} sm={12} xs={24}>
                <Card width='100%' className={'language'}>
                  <img src={docker} className={'language-logo'} alt={'logo'} />
                  <Text span my={0} className={'language-text'}>Docker</Text>
                </Card>
              </Grid>
              <Grid md={6} sm={12} xs={24}>
                <Card width='100%' className={'language'}>
                  <img src={nginx} className={'language-logo'} alt={'logo'} />
                  <Text span my={0} className={'language-text'}>Nginx</Text>
                </Card>
              </Grid>
              <Grid md={6} sm={12} xs={24}>
                <Card width='100%' className={'language'}>
                  <img src={mongo} className={'language-logo'} alt={'logo'} />
                  <Text span my={0} className={'language-text'}>MongoDB</Text>
                </Card>
              </Grid>
              <Grid md={6} sm={12} xs={24}>
                <Card width='100%' className={'language'}>
                  <img src={redis} className={'language-logo'} alt={'logo'} />
                  <Text span my={0} className={'language-text'}>Redis</Text>
                </Card>
              </Grid>
            </Grid.Container>
            <Spacer h={4} />
            <Text className={'home-page-title-first'}>Contributions & Issues</Text>
            <Text className={'home-page-title-second'}>▣ The project is open source, and you're welcome to
              contribute.</Text>
            <Text className={'home-page-title-second'}>▣ You can submit an issue if you have any questions.</Text>
            <Spacer h={0.5} />
            <Grid.Container gap={2.5}>
              <Grid md={24}>
                <Button icon={<Github />} auto shadow type={'secondary'}>JJApplication</Button>
              </Grid>
              <Grid md={24}>
                <img src={github_code} style={{
                  width: '128px',
                }} />
              </Grid>
            </Grid.Container>
          </div>
        </div>
        <Spacer h={5} />
        <div className={'home-page-footer'}>
          <Grid.Container gap={2}>
            <Grid md={10} sm={10}>
              <Text h1 style={{ fontSize: '3.5rem', padding: '0 1.5rem' }}>JJApps.
                <br />
                <Text span style={{ fontSize: '1.5rem' }}>Apollo Project</Text>
              </Text>
              <div className={'jjapps-logo-footer'}></div>
            </Grid>
            <Grid md={14} sm={14}>
              <Grid.Container gap={2}>
                <Grid md={8} sm={8} direction={'column'}>
                  <Text h2 className={'footer-link'}>Developer</Text>
                  <Link href={urls.Docs} className={'footer-link-a'}
                        target={'_blank'}>Development Documents</Link>
                  <Link href={'https://github.com/JJApplication/octopus_meta'} className={'footer-link-a'}
                        target={'_blank'}>Octopus Meta</Link>
                  <Link href={'https://github.com/JJApplication/FuShin'} className={'footer-link-a'} target={'_blank'}>Fushin
                    Stone</Link>
                  <Link href={'https://github.com/JJApplication/DreamsInBottle'} className={'footer-link-a'}
                        target={'_blank'}>Dreams In Bottle</Link>
                  <Link href={'https://github.com/JJApplication/RainbowBridge/blob/master/SPEC.md'}
                        className={'footer-link-a'} target={'_blank'}>RainbowBridge SPEC</Link>
                </Grid>
                <Grid md={8} sm={8} direction={'column'}>
                  <Text h2 className={'footer-link'}>Pages</Text>
                  <Link href={urls.Home} className={'footer-link-a'} target={'_blank'}>Home Page</Link>
                  <Link href={urls.Blog} className={'footer-link-a'} target={'_blank'}>Blog</Link>
                  <Link href={urls.Docs} className={'footer-link-a'} target={'_blank'}>Online Documents</Link>
                  <Link href={urls.Gallery} className={'footer-link-a'} target={'_blank'}>Online Gallery</Link>
                  <Link href={urls.Drive} className={'footer-link-a'} target={'_blank'}>Cloud Drive</Link>
                  <Link href={urls.Status} className={'footer-link-a'} target={'_blank'}>Status Dashboard</Link>
                  <Link href={urls.Resume} className={'footer-link-a'} target={'_blank'}>About me</Link>
                  <Link href={urls.Facebook} className={'footer-link-a'} target={'_blank'}>Facebook</Link>
                </Grid>
                <Grid md={8} sm={8} direction={'column'}>
                  <Text h2 className={'footer-link'}>Github</Text>
                  <Link href={urls.Landers1037} className={'footer-link-a'} target={'_blank'}>Landers1037</Link>
                  <Link href={urls.JJApplication} className={'footer-link-a'} target={'_blank'}>JJApplication</Link>
                  <Link href={urls.GithubPages} className={'footer-link-a'} target={'_blank'}>Github Pages</Link>
                </Grid>
              </Grid.Container>
            </Grid>
          </Grid.Container>
          <Spacer />
          <Divider />
          <Spacer />
          <div>
            <Text>2023@<a href={urls.Home} style={{ color: '#2A2A2B' }} target={'_blank'}>renj.io</a> -
              JJApplication</Text>
          </div>
        </div>
      </div>
    </>
  );
}