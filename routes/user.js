import express from 'express';
const router = express.Router();

// custom utils And middlewares
import authJWT from '../middlewares/authJWT';
import refresh from '../libs/utils/refresh';

// application Controllers for Routes
import { start, login, setRole } from '../controllers/userController';

/* set routes from Controllers */
router.get('/refresh', refresh);
router.get('/', authJWT, start);
router.post('/login', login);

router.post('/role', authJWT, setRole);
export default router;
