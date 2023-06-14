const influx=require('influx');

//influxDB config
const client = new influx.InfluxDB({
    database:'test',
    host: 'localhost',  
    port: 8086,        
})

//function to retrieve data from temperature measurement
const fetchData=async ()=>{
    try{
        const data=await client.query('SELECT * FROM temperature')
        console.log(data);
    }catch(err){
        console.log(err);
    }
}

//function to insert data to temperature measurement
const insertSingleData=async (tag,value)=>{
    try{
        await client.writePoints([
            {
              measurement: 'INEM_DEMO',
              tags: { tag },
              fields: { value },
            },
          ]);
    }catch(err){
        console.log(err);
    }
}

const insertData=async (data)=>{
    for (let i = 0; i < data.length; i++) {
        const { tag, value } = data[i];
        insertSingleData(tag, value);
      }
}

module.exports= insertData;