import mongoose from "mongoose"
const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const productsSchema = new Schema({
    name:{
        type:String,
        requiered: true
    },
    price:{
        type:Number,
        requiered: true
    },
    quantity:{
        type:Number,
        requiered: true
    },
    available:{
        type:Number,
        requiered: true
    },
    
    sku:{
        type:String,
        requiered: true
    },

    description:{
        type:String,
        requiered: true
    },
    mediaUrl:{
        type:String,
        requiered: true
    }  

});
  
module.exports = mongoose.models.product || mongoose.model('product', productsSchema);  