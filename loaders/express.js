import * as express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import * as logger from '../libs/logger/index.js';

import * as authController from '../controllers/authController.js';
import * as errorController from '../controllers/errorController.js';

export default async app => {
  app.set('port', process.env.PORT || 3000);

  app.set('trust proxy', true);
  app.use(cors());
  app.use(logger.dev);

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(path.resolve(), 'public')));

  app.get('/', authController.start);

  app.use(errorController.pageNotFoundError);
  app.use(errorController.respondInternalError);

  return app;
};
