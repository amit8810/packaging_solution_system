import mongoose from 'mongoose';
import { config } from '../config';
import { logger } from '../config/logger';

const dbConnection = async (): Promise<typeof mongoose> => {
    try {
        const mongooseConnection = await mongoose.connect(`${config.db.uri}/${config.db.name}`);
        logger.info(`MongoDB connected: ${mongooseConnection.connection.host}`);
        return mongooseConnection;
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
        process.exit(1);
    }
};

export default dbConnection;
