// 主页

import {Component} from "react";

import './home.css';
import {Card, Code, Display, Link, Snippet, Text} from "@geist-ui/core";
import urls from "../urls";

class Home extends Component {

    render() {
        return (
            <div id="home">
                <div className="top-part">
                    <h1 id="header1">Service of <span style={{color: '#378de5'}}>Renj.io</span></h1>
                    <p id="header2">
                        Apollo is a <Code>Service Manager</Code> for renj.io.
                    </p>
                    <Card width="100%" type="success">
                        <Text h4 my={0}>Apollo + ApolloCLI</Text>
                        <p style={{marginTop: '10px'}}>It's a microservice group with
                            many
                            features
                            which includes&nbsp;
                            <span style={{
                                fontSize: '1.2rem',
                                color: '#ffeb36'
                            }}>APP Manager, CI/CD, Tasks, MailService.</span>
                        </p>
                        <Display shadow caption={<Text p type="warning"><Code>Apollo CLI</Code>是配套的现代化命令行交互式终端</Text>}>
                            <Snippet padding={'1.5rem'} type="dark" filled copy="prevent" symbol="" width="100%"
                                     text={[
                                         '$ apollocli -h',
                                         'Usage of apollocli:',
                                         '  -addr string',
                                         '       socket addr (default "/tmp/Apollo.sock")',
                                         '  -debug',
                                         '       debug mode',
                                         '  -start',
                                         '       start server',
                                         '  -stop',
                                         '       stop server'
                                     ]}>
                            </Snippet>
                        </Display>
                        <Card.Footer>
                            <Link color style={{color: '#9aff69'}} target="_blank"
                                  href={urls.Apollo}>Visit source code
                                on GitHub.</Link>
                        </Card.Footer>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Home;