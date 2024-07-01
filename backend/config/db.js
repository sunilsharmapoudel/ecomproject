import mongoose from "mongoose";

const connectDB = async () => {
    try {
        let conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to DB at ${conn.connection.host}`);
    }
    catch (err) {
        console.log(`Error while connecting to DB: ${err.message}`);
    }
};

export default connectDB;