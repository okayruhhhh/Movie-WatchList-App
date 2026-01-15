const express=require("express");
const cors = require("cors");
const { MongoClient,ObjectId }=require("mongodb");
require("dotenv").config();

const app=express();
app.use(cors());
app.use(express.json());

app.post("/sm",(req,res)=>{
	let url=process.env.MONGO_URL;
	let con=new MongoClient(url);
	let db=con.db("process.env.DB_NAME");
	let coll=db.collection("movies");
	let data={"name":req.body.name,"year":req.body.year,"watched":false};
	coll.insertOne(data)
	.then(response=>{
		res.send(response);
		})
	.catch(error=>{
		res.send(error);
	});
	
	})

app.get("/gm",(req,res)=>{
	let url=process.env.MONGO_URL;
	let con=new MongoClient(url);
	let db=con.db("process.env.DB_NAME");
	let coll=db.collection("movies");
	coll.find().toArray()
	.then(response=>{
		res.send(response);
		})
	.catch(error=>{
		res.send(error);
	});
	
	})

app.delete("/dm",(req,res)=>{
	let url=process.env.MONGO_URL;
	let con=new MongoClient(url);
	let db=con.db(process.env.DB_NAME);
	let coll=db.collection("movies");
	let filter={"_id":new ObjectId(req.body._id)};
	coll.deleteOne(filter)
	.then(response=>{
		res.send(response);
		})
	.catch(error=>{
		res.send(error);
	});
	
	})

app.put("/um",(req,res)=>{
	let url=process.env.MONGO_URL;
	let con=new MongoClient(url);
	let db=con.db(process.env.DB_NAME);
	let coll=db.collection("movies");
	let filter={"_id":new ObjectId(req.body._id)};
	let up={$set:{"watched":true}};
	coll.updateOne(filter,up)
	.then(response=>{
		res.send(response);
		})
	.catch(error=>{
		res.send(error);
	});
	
	})


app.listen(9000,()=>{
	console.log("ready @ 9000");
});