import mongoose, { mongo }  from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB

if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    )
  }
  
  if (!MONGODB_DB) {
    throw new Error(
      'Please define the MONGODB_DB environment variable inside .env.local'
    )
  }


const connectionDb = () =>{

    if(mongoose.connection.readyState){
        console.log("Mongo is already Connected");
        return;
    }
    
    mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.connection.on("connected", ()=> console.log("MongoDB Connected..."));
    mongoose.connection.on("error", ()=> console.log("Error to Connect  Mongodb"));

}



module.exports = connectionDb;