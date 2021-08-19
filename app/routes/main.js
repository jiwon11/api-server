import express from 'express';
var router = express.Router();

// custom utils And middlewares

// application Controllers for Routes
import * as mainController from '../controllers/mainController';

/* set routes from Controllers */
router.get('/teachers', mainController.getTeachers);

export default router;
