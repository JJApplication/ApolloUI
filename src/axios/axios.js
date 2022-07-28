import axios from "axios";
import store from "../store/store";
import {sendMessage} from "../store/actions";
import logger from "../logger/logger";


axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://192.168.100.10:9090' : '';
axios.defaults.timeout = 5000;

export function getRequest(url, sendData) {
    return new Promise((resolve, reject) => {
        axios.get(addAuthCode(url), {params: sendData}).then(res => {
            resolve(res.data);
        }).catch(error => {
            responseError(error);
            reject(error);
        })
    })
}

export function postRequest(url, sendData) {
    return new Promise((resolve, reject) => {
        axios.post(addAuthCode(url), sendData).then(res => {
            resolve(res.data);
        }).catch(error => {
            responseError(error);
            reject(error);
        })
    })
}

function addAuthCode(url) {
    const data = store.getState();
    if (data && data.authCode) {
        if (url.includes('?')) {
            return `${url}&auth=${data.authCode}`;
        }
        return `${url}?auth=${data.authCode}`;
    }
    return url;
}

function responseError(error) {
    if (error.response.status === 401) {
        store.dispatch(sendMessage({message: '无操作权限, 接口需要认证', check: true, t: 'error'}));
        logger.error('接口认证失败:', error);
    } else {
        store.dispatch(sendMessage({message: '接口调用失败', check: true, t: 'error'}));
        logger.error('接口请求失败:', error);
    }
}