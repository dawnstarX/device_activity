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
const insertData=async (tag,value)=>{
    try{
        await client.writePoints([
            {
              measurement: 'INEM_DEMO',
              tags: { tag },
              fields: { value },
            },
          ]);
        console.log("inserted data");
    }catch(err){
        console.log(err);
    }
}

module.exports= insertData;