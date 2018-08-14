const config = require('../config/index');
const winston = require('winston');
require('winston-daily-rotate-file');

// info 文件
let transportInfo = new (winston.transports.DailyRotateFile)({
    level: 'info',
    filename: config.logDir + 'info-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

// error 文件
let transportError = new (winston.transports.DailyRotateFile)({
    level: 'error',
    filename: config.logDir + 'error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

// 实例
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({       // 格式化时间
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console(), // 控制台打印输出
        transportInfo,
        transportError
    ],
    exceptionHandlers: [
        new winston.transports.File({filename: config.logDir + 'exceptions.log'})
    ],
    exitOnError: true // 出错后，退出进程 process.exit()
});

// 测试
// logger.info('Hi');
// logger.error('error1');

module.exports = logger;