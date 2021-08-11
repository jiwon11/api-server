import express from 'express';
const router = express.Router();

import authJWT from '../middlewares/authJWT';
import * as districtController from '../controllers/districtController';

router.get('/districts', authJWT, districtController.search);

export default router;
