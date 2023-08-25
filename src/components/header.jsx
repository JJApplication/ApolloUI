import { Button, ButtonGroup, Text } from '@geist-ui/core';
import { Award, Facebook, Github, Infinity, Smile } from '@geist-ui/icons';
import urls, { openUrl } from '../urls';
import { Component } from 'react';

export const TypeNormal = 'normal';
export const TypeAdvance = 'advance';
const RouteAdvance = '/panel/advance';
const RouteHome = '/';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ paddingTop: '1rem' }}>
        <Text span b i font='2.2rem' marginRight='.5rem'
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
        <ButtonGroup type='secondary' scale={0.5}>
          <Button auto scale={0.25} icon={<Smile />} onClick={this.props.switchThemeType}>主题</Button>
          <Button auto scale={0.25} icon={<Infinity />} onClick={() => {
            window.location.href = this.props.type === TypeNormal ? RouteAdvance : RouteHome;
          }}>{this.props.type === TypeNormal ? '高级' : '常规'}</Button>
          <Button scale={0.25} icon={<Award />}
                  onClick={openUrl(urls.JJApplication)}>ProjectJJ</Button>
          <Button scale={0.25} icon={<Github />}
                  onClick={openUrl(urls.Landers1037)}>Github</Button>
          <Button scale={0.25} icon={<Facebook />}
                  onClick={openUrl(urls.Facebook)}>Facebook</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default Header;