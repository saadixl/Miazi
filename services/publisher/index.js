const redis = require("redis");

const redisClient = redis.createClient({
    host: "redis",
    port: 6379
});

setInterval(() => {
    redisClient.publish('newsfeed_update', `Dispatching message at ${new Date().toISOString()}`, () => {
        console.log("Message sent");
    });
}, 10000);