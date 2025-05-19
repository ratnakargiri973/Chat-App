import mongoose from "mongoose";
import 'dotenv/config';

const MONGO_URI = process.env.MONGO_URL;
const DB = process.env.DB;

export const connectDB = async (req, res) => {
    try {
        await mongoose.connect(MONGO_URI, {dbName: DB});
    } catch (error) {
        console.log("Error in connecting database", error);
    }
}
