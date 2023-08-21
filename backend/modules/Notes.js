const mongoose = require('mongoose');
const { Schema } = mongoose;
const Users = require("./Users");

const NotesSchema = new Schema({
    user:{

        type: mongoose.Schema.Types.ObjectId,
        ref:'Users',
    },
    title :{
        required : true,
        type : String
    },
    description :{
        type : String,
        required : true
    },
    tag :{
        type:String
    },
    date :{
        type :Date,
        default :Date.now
    }
})

module.exports = mongoose.model('Notes', NotesSchema)
