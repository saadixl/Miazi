const NEWS_QUERIES = [
    'world',
    'singapore',
    'dhaka',
    'bangladesh'
];

const NEWS_LIMIT_PER_QUERY = 5;

const GUID_EXPIRY_MS = 60 * 60 * 24;

module.exports = {
    NEWS_QUERIES,
    NEWS_LIMIT_PER_QUERY,
    GUID_EXPIRY_MS,
};