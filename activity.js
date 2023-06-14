const mqtt = require('mqtt');
const { getLastDataPacketTime,setLastDataPacketTime,getConnectionTimeout} =require('./redis');


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

//updating LastDataPacketTime when ever receving message
client.on('message', (topic, payload) => {
        const payloadObj = JSON.parse(payload);
        setLastDataPacketTime(payloadObj.time);
    });
  });
});

checkTimeout= async () => {
    try {
      const lastDataPacketTime = await getLastDataPacketTime(); //get lastdatapacket time
      const timeDiff=(Date.now()-lastDataPacketTime)/1000; //taking the time difference between the last data packet send and now
      const timeOut = await getConnectionTimeout(); 

      if(timeDiff>timeOut){
        console.log("timeout occurred")
        const payloadObj={
            device:"INEM_DEMO",
            time:Date.now(),
            data:[{
              tag:'RSSI',
              value:-1
            }
            ]
        }
        const payload=JSON.stringify(payloadObj);
        client.publish('temp', payload);
        clearInterval(intervalId);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

const intervalId=setInterval(checkTimeout, 8 * 1000);

client.on('error', (err) => {
  console.log(err);
});