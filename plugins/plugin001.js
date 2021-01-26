//机器人
var bot = null;

//事件管理器
var Events = {};

//当前文件名
const selfname = __filename.slice(__dirname.length + 1);

//事件注册/注销
function doEvent(on) {
    for (let event in Events) {
        if (on) {
            //console.log("add listener", event);
            bot.on(event, Events[event]);
        } else {
            //console.log("remove listener", event);
            bot.removeListener(event, Events[event]);
        }
    }
}

//开启插件
function start(b) {
    bot = b;
    doEvent(true)
}

//关闭插件
function stop(b) {
    bot = b;
    doEvent(false);
}



//添加事件：监听私聊
Events["message.private"] = function (data) {
    // console.log(data);
    bot.sendPrivateMsg(data.user_id, selfname + ": hello");
}



module.exports = {
    start,
    stop
};