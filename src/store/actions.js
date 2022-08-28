// 尝试认证
export const tryAuth = (code) => ({
    type: 'auth',
    code: code
})

// 全局通知
export const sendMessage = ({message, check, t}) => ({
    type: 'sendMessage',
    message: message,
    check: check,
    t: t,
})

// 清空
export const clearMessage = () => ({
    type: 'clearMessage',
    check: false
})

export const changeSettings = ({
                                   authCode,
                                   moreToast,
                                   logConsole,
                                   heartbeat,
                                   spyDuration,
                                   enableHeart,
                                   enableWS,
                                   autoHide,
                                   enableAppSpy,
                                   webssh,
                               }) => ({
    type: 'changeSettings',
    authCode: authCode,
    moreToast: moreToast, // 使用更详细的通知格式
    logConsole: logConsole, //日志输出到控制台
    heartbeat: heartbeat,
    spyDuration: spyDuration,
    enableHeart: enableHeart, // 开启apollo心跳检测
    enableWS: enableWS, // 使用ws通知
    autoHide: autoHide, // 自动隐藏无权限页面
    enableAppSpy: enableAppSpy, // 启用监控微服务
    webssh: webssh,
})