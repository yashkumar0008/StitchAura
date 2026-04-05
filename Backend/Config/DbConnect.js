var mongoose = require("mongoose");

async function connectToMongoDB()
{
    let url= process.env.MONGODB_URL
    await mongoose.connect(url)
    .then(()=>console.log("Connect To MongoDb Atlas"))
    .catch((err)=>console.log(err.message));
    
}

module.exports={connectToMongoDB};