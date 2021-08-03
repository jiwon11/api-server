import express from 'express';
import { upload } from '../middlewares/teacherMulter';
import authJWT from '../middlewares/authJWT';

var router = express.Router();
// custom utils And middlewares

// application Controllers for Routes
import * as teacherController from '../controllers/teacherController';

/* set routes from Controllers */

router.post('/profile', authJWT, upload.fields([{ name: 'upperBody' }, { name: 'wholeBody' }, { name: 'performance' }, { name: 'lesson' }]), teacherController.createProfile);

router.post('/profile/eduLevel', authJWT, upload.array('certificate_img'), teacherController.uploadEduLevel);

router.get('/', authJWT, teacherController.getAll);

router.get('/profile', authJWT, teacherController.getProfile);
export default router;
