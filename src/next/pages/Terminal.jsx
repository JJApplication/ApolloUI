import { Button, Card, Grid, Input, Loading, Spacer, Text } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { load } from '../../store/reducer';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { FitAddon } from 'xterm-addon-fit';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import { Toast } from './toast';
import { CanvasAddon } from 'xterm-addon-canvas';

export default function() {
  const [init, setInit] = useState(false);
  const [ws, setWs] = useState('');
  const [websocket, setWebsocket] = useState(null);
  const [terminal, setTerminal] = useState(null);

  const msgData = '1';
  const msgResize = '2';

  useEffect(() => {
    const data = load();
    if (data.webssh) {
      setWs(`${data.webssh}?auth=${data.authCode}`);
    }
    if (!data.enableWS) {
      Toast.warn('未启用websocket通信');
      return;
    }

    if (!data.webssh || data.webssh === '') {
      Toast.error('websocket地址为空');
      return;
    }

    return () => {
      try {
        if (terminal) terminal.dispose();
        if (websocket) websocket.close();
        setTerminal(null);
        setWebsocket(null);
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  const connect = async () => {
    if (terminal) {
      return;
    }
    setInit(true);
    await initTerminal();
  };

  const disconnect = () => {
    try {
      if (terminal) terminal.dispose();
      if (websocket) websocket.close();
      setTerminal(null);
      setWebsocket(null);
    } catch {
      setInit(false);
    } finally {
      setInit(false);
    }
  };

  const initTerminal = async () => {
    try {
      await newTerminal(ws);
    } catch (e) {
      console.log(e);
      failConnect(terminal);
      Toast.error('websocket连接失败');
    }
  };

  const welcome = (terminal) => {
    terminal.write('welcome to Monica WebSSH 🥳\r\n');
    terminal.write('Powered by JJApplication 🚀\r\n');
    terminal.write('See https://github.com/JJApplication 💡\r\n');
    terminal.write('Written by Landers 💖\r\n');
    terminal.write('\r\n');
  };

  const failConnect = (terminal) => {
    terminal.write('Monica WebSSH connect error ❌\r\n');
  };

  const newTerminal = async (webssh) => {
    console.log('monica init');
    const terminal = new Terminal({
      customGlyphs: true,
      fastScrollModifier: 'alt',
      cursorStyle: 'block',
      cursorBlink: true,
      fontFamily: 'Consolas',
      rows: 40,
    });
    setTerminal(terminal);
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.loadAddon(new CanvasAddon());
    fitAddon.fit();
    const terminalContainer = document.getElementById('terminal');
    terminal.open(terminalContainer);
    welcome(terminal);

    // init websocket
    const webSocket = new WebSocket(webssh);
    setWebsocket(webSocket);
    webSocket.binaryType = 'arraybuffer';
    const enc = new TextDecoder('utf-8');
    webSocket.onmessage = (event) => {
      terminal.write(enc.decode(event.data));
    };

    webSocket.onopen = () => {
      fitAddon.fit();
      terminal.focus();
    };

    webSocket.onclose = () => {
      terminal.write('\r\nWebSSH quit!');
    };

    webSocket.onerror = (event) => {
      console.error(event);
      failConnect(terminal);
      Toast.error('websocket连接失败');
      webSocket.close();
    };

    terminal.onKey((event) => {
      webSocket.send(`${msgData}${Base64.stringify(Utf8.parse(event.key))}`, ArrayBuffer);
    });

    terminal.onResize(({ cols, rows }) => {
      webSocket.send(msgResize +
        Base64.stringify(
          Utf8.parse(
            JSON.stringify({
              columns: cols,
              rows: rows,
            }),
          ),
        ), ArrayBuffer,
      );
    });
    // 内容全屏显示-窗口大小发生改变时
    // resizeScreen
    window.addEventListener('resize', () => {
      fitAddon.fit();
    }, false);
  };

  return (
    <>
      <Text h3>WEB SHELL</Text>
      <Card>
        <Card.Content>
          <Grid.Container>
            <Grid xs={16}>
              <Input label='websocket' width={'100%'} value={ws}></Input>
            </Grid>
            <Grid xs={8} justify={'center'}>
              <Button auto type={'success'} onClick={connect}>连接</Button>
              <Spacer inline w={1}></Spacer>
              <Button type={'error'} auto onClick={disconnect}>断开</Button>
            </Grid>
          </Grid.Container>
        </Card.Content>
      </Card>
      <Spacer />
      <Card>
        <Card.Content width={'unset'}>
          {!init && <Loading spaceRatio={3}>wait for terminal initializing</Loading>}
          <div style={{ marginTop: '1rem' }}>
            <div id='terminal'
                 style={{
                   padding: '1rem',
                   borderRadius: '.5rem',
                   backgroundColor: '#1C1F1D',
                 }}>
              {!init &&
                <>
                  <Text p type={'warning'}>Hello Web Terminal ⚡</Text>
                  <Text p type={'warning'}>Powered by Monica
                    -
                    JJApplication</Text>
                </>
              }
            </div>
          </div>
        </Card.Content>
      </Card>
    </>
  );
}