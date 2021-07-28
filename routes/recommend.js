import express from 'express';
const router = express.Router();

// custom utils And middlewares
import * as recommendController from '../controllers/recommendController';
import authJWT from '../middlewares/authJWT';

router.post('/request', authJWT, recommendController.createRequest);

export default router;
