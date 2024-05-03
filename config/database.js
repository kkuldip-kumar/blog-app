import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};
