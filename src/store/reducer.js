// reducer

import store from "./store";

const globalState = {
  authCode: '', // 校验码
  hasMessage: { message: '', check: false, t: '' }, // 全局通知消息t: success warning error
  moreToast: false, // 使用更详细的通知格式
  logConsole: false, //日志输出到控制台
  heartbeat: 5, // 心跳间隔s
  spyDuration: 5, // 服务监控间隔
  enableHeart: false, // 开启apollo心跳检测
  enableWS: false, // 使用ws通知
  autoHide: false, // 自动隐藏无权限页面
  enableAppSpy: false, // 启用监控微服务
  webssh: '' // webssh的地址
}

export function saveToStorage() {
  const data = store.getState();
  Object.keys(data).forEach(k => {
    if (k !== 'hasMessage') {
      localStorage.setItem(k, data[k]);
    }
  });
}

export function loadFromStorage() {
  Object.keys(globalState).forEach(k => {
    const sd = localStorage.getItem(k);
    if (k !== 'hasMessage' && sd) {
      switch (typeof globalState[k]) {
        case "boolean":
          if (sd === 'false') {
            globalState[k] = false;
          } else {
            globalState[k] = true;
          }
          break;
        case "string":
          globalState[k] = sd;
          break;
        case "number":
          globalState[k] = parseInt(sd);
          break;
        default:
      }
    }
  });
}

export function load() {
  const data = {};
  Object.keys(globalState).forEach(k => {
    const sd = localStorage.getItem(k);
    if (k !== 'hasMessage' && sd) {
      switch (typeof globalState[k]) {
        case "boolean":
          data[k] = sd !== 'false';
          break;
        case "string":
          data[k] = sd;
          break;
        case "number":
          data[k] = parseInt(sd);
          break;
        default:
          data[k] = sd;
      }
    }
  });

  return data;
}

export function clearStorage() {
  localStorage.clear();
}

function reducer(state = globalState, action) {
  switch (action.type) {
    case 'auth':
      return {
        ...state,
        authCode: action.code,
      }
    case 'sendMessage':
      return {
        ...state,
        hasMessage: { message: action.message, check: action.check, t: action.t }
      }
    case 'clearMessage':
      return {
        ...state,
        hasMessage: {}
      }
    case 'changeSettings':
      return {
        ...state,
        authCode: action.authCode,
        moreToast: action.moreToast, // 使用更详细的通知格式
        logConsole: action.logConsole, //日志输出到控制台
        heartbeat: action.heartbeat,
        spyDuration: action.spyDuration,
        enableHeart: action.enableHeart, // 开启apollo心跳检测
        enableWS: action.enableWS, // 使用ws通知
        autoHide: action.autoHide, // 自动隐藏无权限页面
        enableAppSpy: action.enableAppSpy, // 启用监控微服务
        webssh: action.webssh,
      }
    default:
      return;
  }
}

export default reducer;