import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

// custom utils And middlewares
import logger from '../libs/logger/index';
import jsonResult from '../middlewares/jsonResult';

import indexRouter from '../routes/index';
import userRouter from '../routes/user';
import authRouter from '../routes/auth';

// application Controllers for Routes
import {
  pageNotFoundError,
  respondInternalError
} from '../controllers/errorController';

export default async app => {
  app.set('trust proxy', true);
  app.use(cors());
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
  // custom Error controllers
  app.use(pageNotFoundError);
  app.use(respondInternalError);
  return app;
};
