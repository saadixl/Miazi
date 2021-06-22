const redis = require("redis");
const axios = require('axios');
const { printLog } = require('./utils');

const redisClient = redis.createClient({
    host: "redis",
    port: 6379
});

redisClient.on("message", async (channel, message) => {
    printLog(`Channel ${channel} just received message: "${message}"`);
    try {
        const newsResp = await axios.get('http://newsfeed:3004/get_news');
        if(newsResp.data.payload) {
            const resp = await axios.post('http://mailman:3003/send_mail', {
                "subject": "Sir, here is your news update",
                "to": process.env.RECIPIENT_EMAIL,
                "html": newsResp.data.payload,
            }, {
                headers: {
                'content-type': 'application/json'
                }
            });
            printLog('Email sent successfully');
        }
    } catch(err) {
        printLog(`Error ${err}`);
    }
});
redisClient.subscribe("newsfeed_update");