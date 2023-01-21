import mongoose from 'mongoose'
const mongoURI="mongodb://localhost:27017"

const server='127.0.0.1:27017';
const database='MyInterview';
const dbConnection=async()=>{
    try{
        await mongoose.connect(`mongodb://${server}/${database}`);
        console.log("Database connected successfully");
    }
    catch(err){
        console.log("Failed to connect to database",err);
    }
}
export default dbConnection