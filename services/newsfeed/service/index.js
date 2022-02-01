const Parser = require('rss-parser');
const parser = new Parser();
const { printLog } = require('../utils');
const { getCache, setCache } = require('./caching');
const {
    NEWS_QUERIES,
    NEWS_LIMIT_PER_QUERY,
    GUID_EXPIRY_MS
} = require('../constants');

const getRssUrl = (query) => {
    return `https://news.google.com/rss/search?q=${query}&hl=en-SG&gl=SG&ceid=SG:en`;
};

const getFeedForQuery = async (query, n) => {
    const url = getRssUrl(query);
    let result = [];
    try {
        const feed = await parser.parseURL(url);
        result = feed.items || [];
    } catch(e) {
        printLog(`Failed to fetch news for ${query} for ${JSON.stringify(e)}`);
    }
    return result.slice(0, n);
};

const fetchNews = async () => {
    const news = {}, promises = [];
    NEWS_QUERIES.forEach((query) => {
        promises.push(
            getFeedForQuery(query, NEWS_LIMIT_PER_QUERY).then((feed) => {
                news[query] = feed;
            })
        );
    });
    await Promise.all(promises);
    return news;
};

const processNews = async (latestNews) => {
    // Getting the cached guids
    const cachedGuids = await getCache('guids');
    // const cachedGuids = null;
    const guids = cachedGuids ? JSON.parse(cachedGuids) : [];
    let atleastOneNewItem = false;
    let templateStr = "";
    // Traversing all the news
    Object.keys(latestNews).forEach((query) => {
        let atleastOneNewItemForCurrentQuery = false;
        const newsList = latestNews[query];
        let lines = "";
        newsList.slice(0, NEWS_LIMIT_PER_QUERY).forEach((news) => {
            const { title, link, guid } = news;
            // If guid of the news is existing, dont add the news in the email template
            if(guids.indexOf(guid) === -1) {
                atleastOneNewItem = true;
                atleastOneNewItemForCurrentQuery = true;
                lines += `<p><a href="${link}" target="_blank">${title}</a></p>`;
                guids.push(guid);
            }
        });
        // If there is items for a query, only then build template for that query
        if(atleastOneNewItemForCurrentQuery) {
            templateStr += `<h1>${query.toUpperCase()}</h1>${lines}<br/>`;
        }
    });
    // Cache the guids
    await setCache('guids', JSON.stringify(guids), GUID_EXPIRY_MS);

    // Send the email if there was at least one new news
    if(atleastOneNewItem) {
        printLog('News email template ready, please send the email');
        return templateStr;
    } 
    // Or just skip
    else {
        printLog('No latest news found. Please do not send send email');
        return;
    }

};

const getNews = async () => {
    const newsRaw = await fetchNews();
    printLog('Successfully fetched news');
    const processedNews = await processNews(newsRaw);
    return {
        payload: processedNews
    };
};

const listNews = async () => {
    const newsRaw = await fetchNews();
    return {
        payload: newsRaw
    };
};

module.exports = {
    getNews,
    listNews,
};