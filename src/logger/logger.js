// 打印日志

import store from "../store/store";

const logPrefix = ['[Apollo]'];
export default function logger() {
}

logger.info = function (...any) {
    const log = logPrefix.concat(any);
    const {logConsole} = store.getState();
    if (logConsole) {
        console.info(...log);
    }
}

logger.error = function (...any) {
    const log = logPrefix.concat(any);
    const {logConsole} = store.getState();
    if (logConsole) {
        console.error(...log);
    }
}