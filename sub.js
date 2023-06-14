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

    client.on('message', async(topic, payload) => {
        console.log(`Received message`);
        const payloadObj = JSON.parse(payload);
        await insertData(payloadObj.data);
        console.log("inserted into influxDB")
    });
  });
});

client.on('error', (err) => {
  console.log(err);
});