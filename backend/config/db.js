import mongoose from "mongoose";

console.log("MONGO", process.env.MONGO_URI);
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connection successful");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
