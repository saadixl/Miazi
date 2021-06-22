const redis = require("redis");
const service = require('./service');
const { printLog } = require('./utils');

const redisClient = redis.createClient({
    host: "redis",
    port: 6379
});

// All subscribe handlers goes here
redisClient.on("message", async (channel, message) => {
    printLog(`${channel} message received`);
    switch(channel) {
        case 'send_newsfeed_update': {
            service.sendNewsfeedUpdateHandler();
            break;
        }
        default: {
            break;
        }
    }
});

// All subscirbes goes here
redisClient.subscribe("send_newsfeed_update");