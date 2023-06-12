const Redis = require('ioredis');

const redis = new Redis();

const getLastDataPacketTime = async () => {
    const reply = await redis.get('LastDataPacketTime');
    return reply;
};

const setLastDataPacketTime = async (time) =>{
    await redis.set('LastDataPacketTime',time);
}

const setConnectionTimeout = async (time) =>{
    await redis.hset('connection_timeout','INEM_DEMO',time);
}



module.exports={
    getLastDataPacketTime,
    setLastDataPacketTime,
    setConnectionTimeout
}
