import { logger } from '../config/logger';
import { Request, Response } from 'express';
import packagingService from '../services/packaging.service';

const packaging = async (req: Request, res: Response) => {
    try {
        const { items, maxSuggestions } = req.body;
        const suggestions = await packagingService.packaging(items, maxSuggestions);
        res.status(200).json({
            message: 'Box recommendation with estimate cost',
            suggestions,
        });
    } catch (error: unknown) {
        logger.error('Something went wrong in packaging controller', { error });
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
};

export = {
    packaging,
};
