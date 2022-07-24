// 底部

import {Component} from "react";
import urls from "../urls";

class Footer extends Component {
    render() {
        return (
            <>
                <div style={{fontSize: '.9rem', fontWeight: 'bold'}}>
                    <p>Copyright © <a href={urls.Home} target="_blank" rel="noreferrer">renj.io</a></p>
                </div>
            </>
        );
    }
}

export default Footer;