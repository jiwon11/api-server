import cookieParser from 'cookie-parser';
import express from 'express';
import createError from 'http-errors';
import path from 'path';

import * as logger from './libs/logger/index.js';
// controllers
import * as authController from './controllers/authController.js';

// connect db
import { connection } from './models/index.js';
console.log(connection.models);
connection.sync({ force: true });

const app = express();

app.set('port', process.env.PORT || 3000);

app.set('trust proxy', true);

app.use(logger.dev);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), 'public')));

app.get('/', authController.start);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: 'error', statusCode: err.status });
});

app.listen(app.get('port'), '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.log(app.get('port'), '번 포트에서 대기중');
});
