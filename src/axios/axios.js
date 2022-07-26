import axios from "axios";
import store from "../store/store";
import {sendMessage} from "../store/actions";
import logger from "../logger/logger";


axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://192.168.100.10:9090' : '';
axios.defaults.timeout = 5000;

export function getRequest(url, sendData) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: sendData}).then(res => {
            resolve(res.data);
        }).catch(error => {
            store.dispatch(sendMessage({message:'接口调用失败', check:true, t: 'error'}));
            logger.error('接口请求失败:', error);
            reject(error);
        })
    })
}

export function postRequest(url, sendData) {
    return new Promise((resolve, reject) => {
        axios.post(url, sendData).then(res => {
            resolve(res.data);
        }).catch(error => {
            store.dispatch(sendMessage({message:'接口调用失败', check:true, t: 'error'}));
            logger.error('接口请求失败:', error);
            reject(error);
        })
    })
}