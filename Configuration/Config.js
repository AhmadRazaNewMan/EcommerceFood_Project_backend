const mongoose= require('mongoose')
require("colors")


// Connect DB Function

const connectDb  = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MONGODB:${conn.connection.host}`.bgGreen)
        
    } catch (error) {
        console.log(`Error:${error.message}`.bgRed)
    }
}


// export

module.exports = connectDb;