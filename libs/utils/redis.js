const redis = require('redis');

export default redisClient = redis.createClient(process.env.REDIS_PORT);
