const service = require('../service');

const getNews = async () => {
    return await service.getNews();
};

const listNews = async () => {
    return await service.listNews();
};

module.exports = {
    getNews,
    listNews,
};