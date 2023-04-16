import mongoose from "mongoose";


const connectDb=async(DATABASE_URL)=>{
    try {
       await mongoose.connect(DATABASE_URL) 
       console.log("database connected successfully....")
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;