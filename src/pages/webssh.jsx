import {Component} from "react";
import {Text} from "@geist-ui/core";
import 'xterm/css/xterm.css'
import {Terminal} from 'xterm'
import {FitAddon} from 'xterm-addon-fit'
import Base64 from "crypto-js/enc-base64"
import Utf8 from "crypto-js/enc-utf8"
import store from "../store/store";
import notifySync from "../logger/notify";

class Webssh extends Component {
    constructor() {
        super();
        this.msgData = '1'
        this.msgResize = '2'
        this.state = {
            enable: false,
            webssh: '',
            auth: '',
            terminal: null,
            webSocket: null,
        }
    }

    componentDidMount() {
        const webssh = this.getSettings();
        if (!webssh) {
            notifySync('webssh配置为空', 'error');
        }
    }

    componentWillUnmount() {
        if (this.state.terminal) {
            this.state.terminal.dispose();
        }
        if (this.state.webSocket) {
            this.state.webSocket.close();
        }
    }

    async initTerminal() {
        try {
            await this.newTerminal(this.state.webssh);
        } catch {
            this.failConnect(this.state.terminal);
            notifySync('websocket连接失败', 'error');
        }
    }

    getSettings() {
        const data = store.getState();
        if (!data) {
            return '';
        }
        this.setState({
            enable: data.enableWS,
            webssh: data.webssh + '?auth=' + data.authCode,
            auth: data.authCode
        }, async () => {
            await this.initTerminal();
        });
        if (!data.enableWS) {
            notifySync('未启用websocket通信', 'error');
        }
        if (!data.webssh) {
            notifySync('webssh通信地址为空', 'error');
        }
        const ok = data.enableWS && data.webssh
        if (ok) {
            return data.webssh + '?auth=' + data.authCode;
        }
        return '';
    }

    welcome(terminal) {
        terminal.write("welcome to Monica WebSSH 🥳\r\n");
        terminal.write("Powered by JJApplication 🚀\r\n");
        terminal.write("See https://github.com/JJApplication 💡\r\n");
        terminal.write("Written by Landers 💖\r\n");
        terminal.write("\r\n");
    }

    failConnect(terminal) {
        terminal.write("Monica WebSSH connect error ❌\r\n");
    }

    async newTerminal(webssh) {
        console.log("monica init")
        const terminal = new Terminal({
            cursorStyle: 'block',
            cursorBlink: true,
            fontFamily: '"Ubuntu Mono", monospace',
            rows: 40,
        })
        this.setState({terminal: terminal})
        const fitAddon = new FitAddon()
        terminal.loadAddon(fitAddon)
        fitAddon.fit()
        let terminalContainer = document.getElementById("monica")
        terminal.open(terminalContainer)
        this.welcome(terminal);

        // init websocket
        const webSocket = new WebSocket(webssh);
        this.setState({webSocket: webSocket})
        webSocket.binaryType = 'arraybuffer';
        const enc = new TextDecoder("utf-8");
        webSocket.onmessage = (event) => {
            terminal.write(enc.decode(event.data));
        }

        webSocket.onopen = () => {
            fitAddon.fit()
            terminal.focus()
        }

        webSocket.onclose = () => {
            terminal.write("\r\nWebSSH quit!")
        }

        webSocket.onerror = (event) => {
            console.error(event)
            this.failConnect(terminal);
            notifySync('websocket连接失败', 'error');
            webSocket.close()
        }

        terminal.onKey((event) => {
            webSocket.send(`${this.msgData}${Base64.stringify(Utf8.parse(event.key))}`, ArrayBuffer)
        })

        terminal.onResize(({cols, rows}) => {
            webSocket.send(this.msgResize +
                Base64.stringify(
                    Utf8.parse(
                        JSON.stringify({
                            columns: cols,
                            rows: rows
                        })
                    )
                ), ArrayBuffer
            )
        })
        // 内容全屏显示-窗口大小发生改变时
        // resizeScreen
        window.addEventListener("resize", () => {
            fitAddon.fit()
        }, false)
    }

    render() {
        return (
            <>
                <Text h4>Monica webSSH</Text>
                <div id="monica" style={{padding: '1rem', borderRadius: '.5rem', backgroundColor: 'black'}}>

                </div>
            </>
        )
    }
}

export default Webssh;