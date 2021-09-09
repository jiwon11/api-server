import express from 'express';

import { upload } from '../middlewares/multer';

const router = express.Router();

// custom utils And middlewares
import * as onepoint from '../controllers/onepointController';

router.post('/violin', upload.fields([{ name: 'performance_video' }, { name: 'performance_img' }]), onepoint.create);

router.get('/violin/:id', onepoint.get);

router.put('/violin/:id', upload.fields([{ name: 'performance_video' }, { name: 'performance_img' }]), onepoint.edit);

export default router;
