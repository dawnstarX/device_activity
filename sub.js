const mqtt = require('mqtt');
const insertData = require('./influx');

const client = mqtt.connect('mqtt://localhost:1883', {
  clientId: 'subscriber',
});

client.on('connect', () => {
    console.log("connected to broker")
  client.subscribe('temp', (err) => {
    if (err) {
      console.log(err);
      return;
    }

    client.on('message', (topic, payload) => {
        console.log(`Received message on topic ${topic}: ${payload}`);
        const payloadObj = JSON.parse(payload);
        console.log(payloadObj.time)
        insertData(payloadObj.data.tag,payloadObj.data.value);
    });
  });
});

client.on('error', (err) => {
  console.log(err);
});