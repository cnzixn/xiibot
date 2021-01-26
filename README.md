# XIIBOT

基于OICQ的机器人插件系统，新增、删除、修改插件无需重启机器人。

----

**Install:**

```bash
#下载oicq
git clone https://github.com/takayama-lily/oicq
#安装依赖
npm i oicq
npm i chokidar
#下载xiibot
git clone https://github.com/cnzixn/xiibot
#xiibot复制到oicq
cp -r xiibot/* oicq
#修改账号密码
vim oicq/xiibot.js
#运行xiibot.js
node oicq/xiibot.js
```

