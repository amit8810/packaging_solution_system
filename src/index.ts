import { config } from './config';
import { app } from './app';
import dbConnection from './db/connection';
import mongoose from 'mongoose';
import { logger } from './config/logger';

const init = () => {
    mongoose.set('debug', false);
    dbConnection().then(() => {
        app.listen(config.port, () => {
            logger.info('app is running on port ' + config.port);
            logger.info(`Swagger docs available at http://localhost:${config.port}/api-docs`);
        });
    });
};

init();
