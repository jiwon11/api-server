import express from 'express';
const router = express.Router();

// custom utils And middlewares
import refresh from '../libs/utils/refresh';
import * as userController from '../controllers/userController';
import authJWT from '../middlewares/authJWT';
import { default as passport } from '../passport/kakaoStrategy';
//router.post('/login', userController.login);

router.get('/refresh', refresh);

router.get('/kakao', passport.authenticate('kakao'));

router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    session: false,
    failureRedirect: '/'
  }),
  userController.login
);
router.post('/login', userController.getJWTByToken);

router.delete('/withdrawal', authJWT, userController.withdrawal);

export default router;
