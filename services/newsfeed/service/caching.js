const fs = require('fs');
const redis = require("redis");
const redisClient = redis.createClient({
    host: "redis",
    port: 6379
});

// Method to get cached data from redis
const getCache = (key) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, reply) => {
            if(err) {
                reject(err);
            } else {
                resolve(reply);
            }
        });
    });
};

// Method to set cached data in redis
const setCache = (key, value, expiryInSec) => {
    return new Promise((resolve, reject) => {
        redisClient.set(key, value, 'EX', expiryInSec, (err, reply) => {
            if(err) {
                reject(err);
            } else {
                resolve(reply);
            }
        });
    });
};

// Method to delete cached data from redis
const delCache = (key) => {
    return new Promise((resolve, reject) => {
        redisClient.del(key, (err, reply) => {
            if(err) {
                reject(err);
            } else {
                resolve(reply);
            }
        });
    });
};

module.exports = {
    setCache,
    getCache,
    delCache,
};
