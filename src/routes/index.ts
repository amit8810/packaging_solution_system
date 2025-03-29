import express from 'express'
import packagingRoute from './packaging.route';

const router = express.Router()
router.use('/packaging', packagingRoute)

export default router;