const redis = require("redis");
const { CRON_PATTERN_EVERY_SIX_HOURS } = require('./constants');
const CronJob = require('cron').CronJob;
const { printLog } = require('./utils');

const redisClient = redis.createClient({
    host: "redis",
    port: 6379
});

printLog('Publisher started. In 6 hours it will start publishing.');

const job = new CronJob(CRON_PATTERN_EVERY_SIX_HOURS, async () => {
    redisClient.publish('send_newsfeed_update', 'Hey subscirber! Send the latest news to sir.', () => {
        printLog('send_newsfeed_update message sent, next publish is scheduled 6 hours later.');
    });
}, null, true, 'Asia/Singapore');

job.start();