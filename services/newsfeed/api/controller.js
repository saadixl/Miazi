const service = require('../service');

const getNews = async () => {
    return await service.getNews();
};

module.exports = {
    getNews,
};