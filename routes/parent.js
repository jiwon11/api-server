import express from 'express';
const router = express.Router();

// custom utils And middlewares
import authJWT from '../middlewares/authJWT';

// application Controllers for Routes
import * as childController from '../controllers/childController';
import * as parentController from '../controllers/parentController';

router.post('/', authJWT, parentController.create);

router.post('/child', authJWT, childController.create);

router.get('/children', authJWT, childController.getAll);

router.get('/child', authJWT, childController.getOne);

router.put('/child', authJWT, childController.edit);

router.delete('/child', authJWT, childController.remove);
export default router;
