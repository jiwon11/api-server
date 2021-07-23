import express from 'express';
const router = express.Router();

// custom utils And middlewares
import authJWT from '../middlewares/authJWT';

// application Controllers for Routes
import { login, setRole } from '../controllers/userController';

/* set routes from Controllers */
router.post('/login', login);

router.post('/role', authJWT, setRole);
export default router;
