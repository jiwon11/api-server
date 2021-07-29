import express from 'express';
const router = express.Router();

// custom utils And middlewares
import * as recommendController from '../controllers/recommendController';
import authJWT from '../middlewares/authJWT';

router.post('/request', authJWT, recommendController.createRequest);

router.get('/requests', authJWT, recommendController.getRequests);

router.post('/confirm', authJWT, recommendController.confirmRequest);
export default router;
