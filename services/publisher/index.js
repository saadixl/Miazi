const redis = require("redis");
const { printLog } = require('./utils');

const redisClient = redis.createClient({
    host: "redis",
    port: 6379
});

setInterval(() => {
    redisClient.publish('send_newsfeed_update', 'Hey subscirber! Send the latest news to sir.', () => {
        printLog('send_newsfeed_update message sent');
    });
}, 10000);