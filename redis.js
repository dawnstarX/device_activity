const Redis = require('ioredis');

const redis = new Redis();

const getLastDataPacketTime = async () => {
    const reply = await redis.get('LastDataPacketTime');
    return reply;
};

const setLastDataPacketTime = async (time) =>{
    await redis.set('LastDataPacketTime',time);
}

const getConnectionTimeout = async (time) =>{
    const timeout=await redis.hget('connection_timeout','INEM_DEMO');
    return timeout;
}



module.exports={
    getLastDataPacketTime,
    setLastDataPacketTime,
    getConnectionTimeout
}
