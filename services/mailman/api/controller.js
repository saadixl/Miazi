const service = require('../service');

const sendSimpleHTMLMail = async (config) => {
    return await service.sendSimpleHTMLMail(config);
};

module.exports = {
    sendSimpleHTMLMail,
};