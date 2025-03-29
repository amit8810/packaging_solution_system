import { config } from "./config";
import { app } from "./app";
import dbConnection from "./db/connection";
import mongoose from "mongoose";

const init = () => {
    mongoose.set('debug', true);
    dbConnection()
        .then(() => {
            app.listen(config.port, () => {
                console.log('app is running on port', config.port);
                console.log(`Swagger docs available at http://localhost:${config.port}/api-docs`);
            }); 
        })
}

init();