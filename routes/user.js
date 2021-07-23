import express from 'express';
const router = express.Router();

// custom utils And middlewares
import authJWT from '../middlewares/authJWT';

// application Controllers for Routes
import * as userController from '../controllers/userController';
import * as studentController from '../controllers/studentController';

/* set routes from Controllers */
router.post('/login', userController.login);
router.post('/role', authJWT, userController.setRole);
router.put('/', authJWT, userController.edit);

router.post('/student', authJWT, studentController.add);
router.get('/students', authJWT, studentController.getAll);
router.put('/student', authJWT, studentController.edit);

export default router;
