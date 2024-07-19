import mongoose from 'mongoose'
import { DB_NAME } from './constant.db.js'


const {MONGODB_URI} = process.env

const dbConnection = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${MONGODB_URI}${DB_NAME}`)
        console.log("database connected successfully")
    } catch (error) {
        console.log("Error while connecting to database : ",error)        
    }
}

export default dbConnection