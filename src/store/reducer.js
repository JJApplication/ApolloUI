// reducer

const globalState = {
    authCode: '', // 校验码
    hasMessage: {message: '', check: false, t: ''}, // 全局通知消息t: success warning error
    moreToast: false, // 使用更详细的通知格式
    logConsole: false, //日志输出到控制台
    heartbeat: 5, // 心跳间隔s
    spyDuration: 5, // 服务监控间隔
    enableHeart: false, // 开启apollo心跳检测
    enableWS: false, // 使用ws通知
    autoHide: false, // 自动隐藏无权限页面
    enableAppSpy: false, // 启用监控微服务
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
                hasMessage: {message: action.message, check: action.check, t: action.t}
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
            }
        default:
            return;
    }
}

export default reducer;