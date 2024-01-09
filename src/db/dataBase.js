import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

//DB always in another continet
const connectDB = async () => {
  try {
    const DbConnectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !!DB HOST: ${DbConnectionInstance.connection.host} `
    );
  } catch (error) {
    console.log("DB Connection Failed", error);
    process.exit(1);
  }
};

export default connectDB;
