const redis = require("redis");
const axios = require('axios');

const redisClient = redis.createClient({
    host: "redis",
    port: 6379
});

redisClient.on("message", async (channel, message) => {
    console.log(`Channel ${channel} just received message: "${message}"`);
    try {
        const newsResp = await axios.get('http://newsfeed:3004/get_news');
        const resp = await axios.post('http://mailman:3003/send_mail', {
            "subject": "Sir, here is your news update",
            "to": process.env.RECIPIENT_EMAIL,
            "html": newsResp.data.payload,
        }, {
            headers: {
            'content-type': 'application/json'
            }
        });
        console.log(resp.data);
    } catch(err) {
        console.log("Error: ", err);
    }
});
redisClient.subscribe("newsfeed_update");