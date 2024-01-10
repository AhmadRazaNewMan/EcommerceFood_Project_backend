const mongoose  = require("mongoose")
const dotenv = require('dotenv')
const connectDb = require("./Configuration/Config")
const itemModel = require('./modals/ItemModel')
const items = require("./utils/data")
require('colors')

// Env cofiguration
dotenv.config()
connectDb()

// Seeder Functiom

const importData = async()=>{
  try {
    await itemModel.deleteMany()
    const itemsData = await itemModel.insertMany(items)
    console.log(`${itemsData.length} records inserted!`.green.inverse)
    process.exit(0)
  } catch (error) {
    console.log(`Error:${error}`.bgRed.inverse)
    process.exit(1)
    
  }
}
 importData()
