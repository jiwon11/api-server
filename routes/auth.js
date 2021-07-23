import express from 'express';
const router = express.Router();

// custom utils And middlewares
import refresh from '../libs/utils/refresh';

// application Controllers for Routes

/* set routes from Controllers */
router.get('/refresh', refresh);

export default router;
