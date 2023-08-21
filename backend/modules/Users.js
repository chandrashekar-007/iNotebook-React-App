const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type : String,
        required : true
    },
    number:{
        type : Number,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
    date:{
        type : Date,
        default : Date.now
    }
});

const Users = mongoose.model('Users', UserSchema);
Users.createIndexes();
module.exports = Users