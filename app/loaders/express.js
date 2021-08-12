import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import compression from 'compression';

// custom utils And middlewares
import logger from '../libs/logger/index';
import jsonResult from '../middlewares/jsonResult';

import indexRouter from '../routes/index';
import userRouter from '../routes/user';
import authRouter from '../routes/auth';
import parentRouter from '../routes/parent';
import teacherRouter from '../routes/teacher';
import tagRouter from '../routes/tag';
import recommendRouter from '../routes/recommend';
import searchRouter from '../routes/search';

// application Controllers for Routes
import { pageNotFoundError, respondInternalError } from '../controllers/errorController';

export default async app => {
  app.set('trust proxy', true);
  app.use(cors({ credentials: true }));
  app.use(compression());
  app.use(logger.dev);

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(path.resolve(), 'public')));
  // custom middlewares
  app.use(jsonResult);

  // application routes
  app.use('/', indexRouter);
  app.use('/user', userRouter);
  app.use('/auth', authRouter);
  app.use('/parent', parentRouter);
  app.use('/teacher', teacherRouter);
  app.use('/tag', tagRouter);
  app.use('/recommend', recommendRouter);
  app.use('/search', searchRouter);
  // custom Error controllers
  app.use(pageNotFoundError);
  app.use(respondInternalError);
  return app;
};
