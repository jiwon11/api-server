import express from 'express';
var router = express.Router();

// custom utils And middlewares

// application Controllers for Routes
import { start } from '../controllers/mainController';

/* set routes from Controllers */
router.get('/', start);

export default router;
