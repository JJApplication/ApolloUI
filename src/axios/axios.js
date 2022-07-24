import axios from "axios";

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://192.168.100.10:9090' : '';

export function getRequest(url, sendData) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: sendData}).then(res => {
            resolve(res.data);
        }).catch(error => {
            reject(error);
        })
    })
}

export function postRequest(url, sendData) {
    return new Promise((resolve, reject) => {
        axios.post(url, sendData).then(res => {
            resolve(res.data);
        }).catch(error => {
            reject(error);
        })
    })
}