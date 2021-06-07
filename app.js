import cookieParser from 'cookie-parser';
import express from 'express';
import createError from 'http-errors';
import logger from 'morgan';
import path from 'path';
import moment from 'moment-timezone';

// controllers
import * as authController from './controllers/authController.js';

// connect db
import { connection } from './models/index.js';

const app = express();

connection.sync({});

app.set('port', process.env.PORT || 3000);

app.set('trust proxy', true);

logger.token('cookie', req => req.cookie);
logger.token(
  'remote-ip',
  req => req.ip || req.headers['x-real-ip'] || req.headers['x-forwarded-for']
);
logger.token('host', req => req.hostname);
logger.token('user', req => {
  if (req.user) {
    return JSON.stringify(req.user);
  }
  return 'no user info';
});
logger.token('params', req => req.params);
logger.token('body', req => req.body);
logger.token('query', req => req.query);
logger.token('date', () => moment().tz('Asia/Seoul').format());
logger.token('statusMessage', res => res.statusMessage);
function jsonFormat(tokens, req, res) {
  return JSON.stringify({
    userIPv4: tokens['remote-ip'](req, res),
    user: tokens.user(req, res),
    time: tokens.date(),
    method: tokens.method(req, res),
    host: tokens.host(req),
    url: tokens.url(req, res),
    'response-time': `${tokens['response-time'](req, res)} ms`,
    'http-version': tokens['http-version'](req, res),
    'status-code': tokens.status(req, res),
    query: tokens.query(req),
    params: tokens.params(req),
    body: tokens.body(req),
    'content-length': tokens.res(req, res, 'content-length'),
    referrer: tokens.referrer(req, res),
    cookie: tokens.cookie(req),
    'user-agent': tokens['user-agent'](req, res),
    statusMessage: tokens.statusMessage(res)
  });
}
app.use(logger(jsonFormat));

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
