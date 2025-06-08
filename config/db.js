const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log("connected to mongodb")
})

module.exports = mongoose.connection;