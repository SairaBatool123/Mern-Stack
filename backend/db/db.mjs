import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

// Connection
mongoose
  .connect(MONGO_URL) //return promise and pass MONGO_URL
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log("MongoDB is not connected", err);
  });
export default mongoose;


