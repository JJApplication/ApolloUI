// 后台的定时任务 除非关闭不会停止

import store from "./store/store";
import {getRequest} from "./axios/axios";
import notifySync from "./logger/notify";
import logger from "./logger/logger";

let globalTaskHeartbeat = null;
let globalTaskSpy = null;

// 被动式接收 避免多次订阅状态
// 当定时器执行到以后再判断是否运行
// 如果禁止定时器 不清空定时器仅做跳过处理

export function startHeartbeat() {
    const data = store.getState();
    resetTask(globalTaskHeartbeat);
    globalTaskHeartbeat = setInterval(() => {
        if (data && data.enableHeart) {
            getRequest('/heartbeat').then(() => {
                logger.info('与服务器心跳建立', new Date());
            }).catch(() => {
                notifySync('与服务器心跳断连', 'warning');
            });
        }
    }, data && data.heartbeat > 0 ? data.heartbeat * 1000 : 5000);
}

export function startAppSpy() {
    resetTask(globalTaskSpy);
    const data = store.getState();
    globalTaskSpy = setInterval(() => {
        if (data && data.enableAppSpy) {
            getRequest('/api/app/all').then(res => {
                const apps = res.data;
                if (apps) {
                    let badApps = [];
                    apps.forEach(app => {
                        if (app.Status === 'BAD') {
                            badApps.push(app.App);
                            return;
                        }
                    });
                    if (badApps.length > 0) {
                        notifySync(`微服务异常 ${badApps.join(' | ')}`, 'warning');
                    }
                }
            }).catch(() => {
                notifySync('监控微服务异常', 'warning');
            });
        }
    }, data && data.spyDuration > 0 ? data.spyDuration * 1000 : 5000);
}

export function resetTask(id) {
    clearInterval(id);

    if (id === globalTaskSpy) {
        globalTaskSpy = null;
    } else if (id === globalTaskHeartbeat) {
        globalTaskHeartbeat = null;
    }
}

export function reActiveTasks() {
    startHeartbeat();
    startAppSpy();
}