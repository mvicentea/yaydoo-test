import mongoose from "mongoose"
const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    lastName :{
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    date: {
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.models.user || mongoose.model('user', UserSchema);  