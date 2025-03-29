import express from 'express'
import packagingController from '../controllers/packaging.controller';
import packagingValidator from '../validators/packaging.validator';
import { validate } from '../middlewares/validate.middleware';

const router = express.Router()

router.post('/', validate(packagingValidator.packaging), packagingController.packaging)

export default router;