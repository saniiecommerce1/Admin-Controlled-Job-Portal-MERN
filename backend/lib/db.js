import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

const connectDB = async()=>{

    try {
    await mongoose.connect(process.env.MONGO_DB_URL)
    console.log('MongoDB is Connected')
        
    } catch (error) {
        console.log('MongoDB is Failed' , error)
        process.emit(1)        
    }
}

export default connectDB;

