import axios from 'axios';
import store from '../store/store';
import { sendMessage } from '../store/actions';
import logger from '../logger/logger';
import { getToken, load } from '../store/reducer';
import { Toast } from '../next/pages/toast';

function withCookie() {
  return localStorage.getItem('authMethod') === 'cookie' ||
    localStorage.getItem('useAll') === true;
}

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'https://service.renj.io' : '';
// axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://192.168.100.10:9090' : '';
axios.defaults.timeout = 20000;


// 封装参数增加params body的data
export function getRequest(url, sendData) {
  return new Promise((resolve, reject) => {
    axios.get(addAuthCode(url), {
      params: sendData, headers: {
        token: getToken(),
      },
      withCredentials: withCookie(),
    }).then(res => {
      resolve(res.data);
    }).catch(error => {
      if (url === '/heartbeat') {
        reject(error);
      }
      responseError(error);
      reject(error);
    });
  });
}

export function postRequest(url, sendData, params) {
  return new Promise((resolve, reject) => {
    axios.post(addAuthCode(url), sendData, {
      params: params,
      headers: {
        token: getToken(),
      },
      withCredentials: withCookie(),
    }).then(res => {
      resolve(res.data);
    }).catch(error => {
      responseError(error);
      reject(error);
    });
  });
}

function addAuthCode(url) {
  const data = load();
  // 仅在此条件下开启认证码
  if (data && (data.useAll || data.authMethod === 'query') && data.authCode) {
    if (url.includes('?')) {
      return `${url}&auth=${data.authCode}`;
    }
    return `${url}?auth=${data.authCode}`;
  }
  return url;
}

function responseError(error) {
  if (error.response.status === 401) {
    store.dispatch(sendMessage({ message: '无操作权限, 接口需要认证', check: true, t: 'error' }));
    Toast.error('无操作权限 接口需要认证');
    logger.error('接口认证失败:', error);
  } else {
    store.dispatch(sendMessage({ message: '接口调用失败', check: true, t: 'error' }));
    Toast.error('接口请求失败');
    logger.error('接口请求失败:', error);
  }
}