const mqtt = require('mqtt');
const {getRandomNumber,getRandomTag} = require('./util');

const client = mqtt.connect('mqtt://localhost:1883', {
  clientId: 'publisher',
});

client.on('connect', () => {
    setInterval(() => {
        const payloadObj={
            device:"INEM_DEMO",
            time:Date.now(),
            data:{
              tag:getRandomTag(),
              value:getRandomNumber(20)
            }
        }
        const payload=JSON.stringify(payloadObj);
        client.publish('temp', payload);
        console.log('Message published');
      }, 3000);
});

client.on('error', (err) => {
  console.log(err);
});

client.on('close', () => {
    console.log('Disconnected from the broker');
  });