import express from 'express';
const router = express.Router();

import authJWT from '../middlewares/authJWT';
import * as tagController from '../controllers/tagController';
import * as districtController from '../controllers/districtController';

router.post('/instrument', tagController.instrumentCreate);

router.get('/instruments', authJWT, tagController.instrumentGetAll);

router.post('/style', authJWT, tagController.lessonStyleCreate);

router.get('/styles', authJWT, tagController.lessonStyleGetAll);

router.post('/place', authJWT, tagController.lessonPlaceCreate);

router.get('/places', authJWT, tagController.lessonPlaceGetAll);

router.get('/districts', authJWT, districtController.getAll);
export default router;
