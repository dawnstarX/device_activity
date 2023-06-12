const mqtt = require('mqtt');
const { getLastDataPacketTime,setLastDataPacketTime,setConnectionTimeout} =require('./redis');

const timeOut=5;

const client = mqtt.connect('mqtt://localhost:1883', {
  clientId: 'device_activity',
});

client.on('connect', () => {
    console.log("connected to broker")
  client.subscribe('temp', (err) => {
    if (err) {
      console.log(err);
      return;
    }

client.on('message', (topic, payload) => {
        const payloadObj = JSON.parse(payload);
        setLastDataPacketTime(payloadObj.time)
    });
  });
});

checkTimeout= async () => {
    try {
      const lastDataPacketTime = await getLastDataPacketTime();
      const timeDiff=(Date.now()-lastDataPacketTime)/1000;

      if(timeDiff>timeOut){
        setConnectionTimeout(Date.now());
        const payloadObj={
            device:"INEM_DEMO",
            time:Date.now(),
            data:{
              tag:'RSSI',
              value:-1
            }
        }
        const payload=JSON.stringify(payloadObj);
        client.publish('temp', payload);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

setInterval(checkTimeout, 10 * 1000);

client.on('error', (err) => {
  console.log(err);
});