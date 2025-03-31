import swaggerJsdoc from 'swagger-jsdoc';
import { config } from '../config';
import packagingSwagger from './packaging.swagger';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Packaging Solution System API',
            version: '1.0.0',
            description: 'API for managing packaging solutions',
        },
        paths: {
            ...packagingSwagger,
        },
        servers: [
            {
                url: `http://localhost:${config.port}`,
                description: 'Development server',
            },
        ],
    },
    apis: [],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
