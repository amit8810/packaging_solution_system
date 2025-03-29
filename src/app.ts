import express from 'express';
import cors from 'cors';
import apiRoutes from './routes';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from './swagger/swagger';

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', apiRoutes)


export { app }
