const mqtt = require('mqtt');

const max = 100;
const min = 10;
const random = (Math.random() * (max - min)) + min;
const random2 = (Math.random() * (max - min)) + min;
const random3 = (Math.random() * (max - min)) + min;

const client = mqtt.connect('mqtt://localhost:1883', {
  clientId: 'publisher',
});

client.on('connect', () => {
    setInterval(() => {
        const payloadObj={
            device:"INEM_DEMO",
            time:Date.now(),
            data:[{
              tag: 'ACTIVE',
              value: random
          },
          {
              tag: 'CUR1',
              value: random
          },
          {
              tag: 'CUR2',
              value: random
          },
          {
              tag: 'CUR3',
              value: random
          },{
              tag: 'MD',
              value: random2
          },
          {
              tag: 'MDKW',
              value: random2
          },
          {
              tag: 'PF1',
              value: random2
          },
          {
              tag: 'PF2',
              value: random2
          }, {
              tag: 'VOLTS2',
              value: random2
          }, {
              tag: 'VOLTS3',
              value: random2
          }, {
              tag: 'W1',
              value: random2
          }, {
              tag: 'W2',
              value: random2
          }, {
              tag: 'W3',
              value: random2
          }, {
              tag: 'D18',
              value: random2
          }, {
              tag: 'D19',
              value: random2
          }, {
              tag: 'D20',
              value: random2
          }, {
              tag: 'D21',
              value: random2
          }, {
              tag: 'D22',
              value: random2
          }, {
              tag: 'D23',
              value: random2
          }, {
              tag: 'D24',
              value: random2
          }, {
              tag: 'D25',
              value: random2
          }, {
              tag: 'D26',
              value: random2
          }, {
              tag: 'D27',
              value: random2
          }, {
              tag: 'D28',
              value: random2
          }, {
              tag: 'D29',
              value: random2
          },{
              tag: 'D30',
              value: random2
          },{
              tag: 'D31',
              value: random2
          },{
              tag: 'D32',
              value: random2
          },{
              tag: 'D33',
              value: random2
          },{
              tag: 'RSSI',
              value: 16 + random
          }
          ]
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