import * as dotenv from 'dotenv';
import * as path from 'path';

const env = process.env.NODE_ENV || 'development';
const envFile = `.env.${env}`;

dotenv.config({
    path: path.resolve(__dirname, '..', envFile),
});

export const config = {
    port: process.env.PORT || 3000,
    db: {
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017',
        name: process.env.DB_NAME || 'mydb',
    },
};
