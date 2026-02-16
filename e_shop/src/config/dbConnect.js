import mongoose from "mongoose";
import dotenv from "dotenv/config";

const url = process.env.url;

export const dbConnect = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB not Connected", error);
  }
};
