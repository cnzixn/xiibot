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


//添加事件：监听并输入滑动验证码ticket(同一地点只需验证一次)
Events["system.login.slider"] = function (data) {
    process.stdin.once("data", (input)=>{
        bot.sliderLogin(input);
    });
}

//添加事件：监听设备锁验证(同一设备只需验证一次)
Events["system.login.device"] = function (data) {
    bot.logger.info("验证完成后敲击Enter继续..")
    process.stdin.once("data", () => {
        bot.login();
    });
}

//添加事件：监听上线事件
Events["system.online"] = function (data) {
    console.log(`Logged in as ${bot.nickname}!`);
}

//添加事件：自动同意好友申请
Events["request.friend.add"] = function (data) {
    bot.setFriendAddRequest(data.flag);
}

//添加事件：自动同意群邀请
Events["request.group.invite"] = function (data) {
    bot.setGroupAddRequest(data.flag);
}

//添加事件：监听私聊
Events["message.private"] = function (data) {
    // console.log(data);
    bot.sendPrivateMsg(data.user_id, selfname + ": hello");
}

//添加事件：监听群聊
Events["message.group"] = function (data) {
    // console.log(data);
    //bot.sendGroupMsg(data.group_id, "hello");
}

//添加事件：监听群员入群事件
Events["notice.group.increase"] = function (data) {
    bot.sendGroupMsg(data.group_id, data.nickname + " 加入了群");
}

module.exports = {
    start,
    stop
};