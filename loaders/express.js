import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import logger from '../libs/logger/index';

import { start } from '../controllers/authController';
import {
  pageNotFoundError,
  respondInternalError
} from '../controllers/errorController';

export default async app => {
  app.set('port', process.env.PORT || 3000);

  app.set('trust proxy', true);
  app.use(cors());
  app.use(logger.dev);

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(path.resolve(), 'public')));

  app.get('/', start);

  app.use(pageNotFoundError);
  app.use(respondInternalError);

  return app;
};
