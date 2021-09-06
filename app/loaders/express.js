import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import compression from 'compression';

// custom utils And middlewares
import logger from '../libs/logger/index';
import jsonResult from '../middlewares/jsonResult';

import mainRouter from '../routes/main';
import userRouter from '../routes/user';
import authRouter from '../routes/auth';
import parentRouter from '../routes/parent';
import teacherRouter from '../routes/teacher';
import tagRouter from '../routes/tag';
import recommendRouter from '../routes/recommend';
import searchRouter from '../routes/search';
import onepointRouter from '../routes/onepoint';

// application Controllers for Routes
import { pageNotFoundError, respondInternalError } from '../controllers/errorController';

export default async app => {
  app.set('trust proxy', true);
  app.use(cors({ credentials: true, origin: true, exposedHeaders: ['cookie'] }));
  app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
  });
  app.use(compression());
  app.use(logger.dev);

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(path.resolve(), 'public')));
  // custom middlewares
  app.use(jsonResult);
  // application routes
  app.use('/', mainRouter);
  app.use('/user', userRouter);
  app.use('/auth', authRouter);
  app.use('/parent', parentRouter);
  app.use('/teacher', teacherRouter);
  app.use('/tag', tagRouter);
  app.use('/recommend', recommendRouter);
  app.use('/search', searchRouter);
  app.use('/onepoint', onepointRouter);
  // custom Error controllers
  app.use(pageNotFoundError);
  app.use(respondInternalError);

  return app;
};
