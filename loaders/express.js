import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

// custom utils And middlewares
import logger from '../libs/logger/index';
import refresh from '../libs/utils/refresh';
import authJWT from '../middlewares/authJWT';
import jsonResult from '../middlewares/jsonResult';

// application Controllers for Routes
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
  // custom middlewares
  app.use(jsonResult);

  // application routes
  app.get('/refresh', refresh);
  app.get('/', authJWT, start);

  // custom Error controllers
  app.use(pageNotFoundError);
  app.use(respondInternalError);
  return app;
};
