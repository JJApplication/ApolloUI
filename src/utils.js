// 时间戳转换 需要附加毫秒计数
export function convertTime(t) {
    return new Date(t * 1000).toLocaleDateString();
}

export function convertTimeEX(t) {
    return new Date(t * 1000).toLocaleString();
}

// 文件大小
export function covertFileSize(fileSize) {
    let result;
    if (fileSize >= 1073741824) {
        // B => GB
        result = fileSize % 1073741824 === 0 ? fileSize / 1073741824 + 'G' : Math.trunc(fileSize / 1073741824) + 'G'
    } else if (fileSize >= 1048576) {
        // B => MB
        result = fileSize % 1048576 === 0 ? fileSize / 1048576 + 'MB' : Math.trunc(fileSize / 1048576) + 'MB'
    } else if (fileSize >= 1024) {
        // B => KB
        result = fileSize % 1024 === 0 ? fileSize / 1024 + 'KB' : Math.trunc(fileSize / 1024) + 'KB'
    } else {
        result = fileSize + 'B'
    }
    return result;
}