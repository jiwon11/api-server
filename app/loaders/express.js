import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import compression from 'compression';
import AWSXRay from 'aws-xray-sdk';

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

AWSXRay.captureHTTPsGlobal(require('https'));

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
  AWSXRay.config([AWSXRay.plugins.EC2Plugin, AWSXRay.plugins.ECSPlugin]);
  var rules = {
    rules: [{ description: 'Player moves.', service_name: '*', http_method: '*', url_path: '/*', fixed_target: 0, rate: 0.05 }],
    default: { fixed_target: 1, rate: 0.1 },
    version: 1
  };

  AWSXRay.middleware.setSamplingRules(rules);
  app.use(AWSXRay.express.openSegment('tuningApp'));
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
  app.use(AWSXRay.express.closeSegment());

  return app;
};
