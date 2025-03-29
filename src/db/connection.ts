import mongoose from "mongoose";
import { config } from "../config";

const dbConnection = async (): Promise<typeof mongoose> => {
    try {
        const mongooseConnection = await mongoose.connect(`${config.db.uri}/${config.db.name}`);
        console.log(`MongoDB connected: ${mongooseConnection.connection.host}`);
        return mongooseConnection;
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
        process.exit(1);
    }
}

export default dbConnection;



