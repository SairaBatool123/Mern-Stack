import mongoose from 'mongoose';
import 'dotenv/config'

const dbName = `${process.env.db_name}`; 
const url = `${process.env.MONGO_URL}/${dbName}`;

const connectToDB=async()=>{
    mongoose.connection.on("open", () => {
      console.log("MongoDB is connected");
    });
    mongoose.connection.on("error", () => {
      console.error("MongoDB is not connected");
    });
}
mongoose.connect(url)
export default connectToDB;

