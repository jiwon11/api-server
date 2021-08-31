import express from 'express';
const router = express.Router();

// custom utils And middlewares
import refresh from '../libs/utils/refresh';
import * as userController from '../controllers/userController';
import authJWT from '../middlewares/authJWT';

router.get('/refresh', refresh);

router.post('/login', userController.login);

router.delete('/withdrawal', authJWT, userController.withdrawal);

export default router;
