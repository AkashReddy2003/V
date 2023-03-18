const express = require("express");
const bodyParser=require("body-parser");
const app = express();
const cors=require("cors");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://v:v@cluster0.bvria8p.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





    client.connect();
    const collection=client.db().collection("controls");
 

app.post("/sendControls",async(req,res)=>{
    const lat=req.body.lat;
    const lon=req.body.lon;
    const direc=req.body.direc;
    const angle=req.body.angle;

    try{
        await collection.insertOne({ 
            lat:lat,
            lon:lon,
            direc:direc,
            angle:angle,

     });
        res.send("Successfully Registerd");
    }catch(e){
        console.log(e);
        res.send("Error");
    }
    
})


app.get("/getControls",async(req,res)=>{
    const x=await collection.find().toArray();
    res.send(x);
})


app.listen(process.env.PORT||3000,()=>{
    console.log("Server Running");

})
