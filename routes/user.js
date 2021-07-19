import express from 'express';
const router = express.Router();

// custom utils And middlewares
import authJWT from '../middlewares/authJWT';
import { refresh } from '../libs/utils/jwt';

// application Controllers for Routes
import { start } from '../controllers/userController';

/* set routes from Controllers */
router.get('/refresh', refresh);
router.get('/', authJWT, start);

export default router;
