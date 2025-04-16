const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const connectDB = ()=>{
try {
 mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("connection sucessfully")
}
catch (error) {
    console.log("connection failed", error)
    process.exit(1)
}

}
module.exports = connectDB;
