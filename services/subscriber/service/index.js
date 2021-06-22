const axios = require('axios');
const { printLog } = require('../utils');

const sendNewsfeedUpdateHandler = async () => {
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
};

module.exports = {
    sendNewsfeedUpdateHandler,
};