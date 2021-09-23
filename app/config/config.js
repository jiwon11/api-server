'user strict';

require('@babel/register');

require('dotenv').config();
const AWSXRay = require('aws-xray-sdk');

const { env } = process;
const development = {
  database: 'mvcTest',
  port: 3306,
  host: env.local_DB_Host,
  username: env.local_DB_Username,
  password: env.local_DB_Password,
  logging: false,
  dialect: 'mysql',
  timezone: '+09:00',
  dialectOptions: {
    charset: 'utf8mb4',
    dateStrings: true,
    typeCast: true
  },
  pool: {
    max: 1000,
    min: 5,
    idle: 300000
  },
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
};
const test = {
  database: 'mvcTest',
  port: 3306,
  host: process.env.DB_Host,
  username: process.env.DB_Username,
  password: process.env.DB_Password,
  dialect: 'mysql',
  logging: false,
  timezone: '+09:00',
  dialectOptions: {
    charset: 'utf8mb4',
    dateStrings: true,
    typeCast: true
  },
  pool: {
    max: 1000,
    min: 5,
    idle: 300000
  },
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
};
const production = {
  database: 'mvcTest',
  port: 3306,
  host: process.env.DB_Host,
  username: process.env.DB_Username,
  password: process.env.DB_Password,
  dialect: 'mysql',
  logging: false,
  timezone: '+09:00',
  dialectOptions: {
    charset: 'utf8mb4',
    dateStrings: true,
    typeCast: true
  },
  dialectModule: AWSXRay.captureMySQL(require('mysql')),
  pool: {
    max: 1000,
    min: 5,
    idle: 300000
  },
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
  /*
  replication: {
    read: [
      {
        host: process.env.RDS_SLAVE1_HOST,
        username: process.env.USERNAME,
        password: process.env.RDS_SLAVE1_PASSWORD,
      },
      {
        host: process.env.RDS_SLAVE2_HOST,
        username: process.env.USERNAME,
        password: process.env.RDS_SLAVE2_PASSWORD,
      },
    ],
    write: {
      host: process.env.RDS_MASTER_HOST,
      username: process.env.USERNAME,
      password: process.env.RDS_MASTER_PASSWORD,
    },
  },
  */
};

module.exports = { development, production, test };
