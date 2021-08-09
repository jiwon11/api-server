import express from 'express';
const router = express.Router();

// custom utils And middlewares
import authJWT from '../middlewares/authJWT';

// application Controllers for Routes
import * as userController from '../controllers/userController';

router.post('/role', authJWT, userController.setRole);

router.put('/', authJWT, userController.edit);

router.get('/role', authJWT, userController.getByToken);

export default router;
