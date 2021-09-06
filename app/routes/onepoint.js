import express from 'express';

import { upload } from '../middlewares/multer';

const router = express.Router();

// custom utils And middlewares
import * as onepoint from '../controllers/onepointController';

router.post('/violin', upload.array('performance_video'), onepoint.create);

router.get('/violin/:id', onepoint.get);

export default router;
