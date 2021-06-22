const redis = require("redis");
const { printLog } = require('./utils');

const redisClient = redis.createClient({
    host: "redis",
    port: 6379
});

setInterval(() => {
    redisClient.publish('newsfeed_update', `Dispatching message at ${new Date().toISOString()}`, () => {
        printLog('newsfeed_update message sent');
    });
}, 10000);