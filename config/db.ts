import mongoose from "mongoose";

export const connectToDB = async()=>{
    const connection = await mongoose.connect(process.env.MONGO_URI as string);
    if(connection){
        console.log(`DB connected at ${connection.connection.host}`);
    }
};