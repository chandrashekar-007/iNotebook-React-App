//Establishing connection with mongodb
const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/iNotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

//mongoose.connect donot accepts any callback
const connectToMongo = () => {
  mongoose.connect(mongoURI)
  .then(()=>{
    console.log("Connected to Mongo Successfully");
  }).catch((error)=>{
    console.log(error)
  })
};




module.exports = connectToMongo;
