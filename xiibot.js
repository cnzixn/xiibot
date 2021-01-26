"use strict";
const fs = require("fs");
const path = require("path");
var { createClient } = require("./client");
//  安卓Termux环境变量
//  export NODE_PATH=/data/data/com.termux/files/home/node_modules/

// 账号
const account = 123456789;

// 密码或md5(密码)
const password = "123456";

// 创建机器人
const bot = createClient(account, {
    log_level: "debug", //日志级别设置为debug
    platform: 1, //登录设备选择为手机
});

// 登陆
bot.login(password);


// XII插件系统：插件的新增、删除、修改均无需重启！
// npm install -g chokidar
var Chokidar = require('chokidar');
var cache = {};
var watcher = Chokidar.watch([path.join(__dirname, 'plugins')], {
    // ignored: /(^|[\/\\])\../, 
    persistent: true,
    usePolling: true,
});

var watchAction = function({
    event,
    eventPath
}) {
    bot.logger.info(`Xii Plugin System: ${eventPath} Has Been ${event}ed`);
    switch (event) {
        case "Add":
            var fn = require(eventPath);
            cache[eventPath] = fn;
            cache[eventPath].start(bot);
            break;
        case "Change":
            cache[eventPath].stop(bot);
            delete require.cache[eventPath];
            delete cache[eventPath];
            var fn = require(eventPath);
            cache[eventPath] = fn;
            cache[eventPath].start(bot);
            break;
        case "Unlink":
            cache[eventPath].stop(bot);
            delete require.cache[eventPath];
            break;
        default:
            bot.logger.info("Xii Plugin System Error");
            break;
    }
}
watcher
    .on('ready', () => bot.logger.info(`Xii Plugin System  Has Been Ready.`))
    .on('add', path => watchAction({
        event: 'Add',
        eventPath: path
    }))
    .on('change', path => watchAction({
        event: 'Change',
        eventPath: path
    }))
    .on('unlink', path => watchAction({
        event: 'Unlink',
        eventPath: path
    }));