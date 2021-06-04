import Sequelize from 'sequelize';
import configFile from '../config/config.js';
import fs from 'fs';
import path from 'path';

const env =
  process.env.stage === 'dev'
    ? 'development'
    : process.env.stage === 'test'
    ? 'test'
    : 'production';
const config = configFile[env];

export const connection = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const Model = require(path.join(__dirname, file));
    Model.initialize(connection);
  });
// Load model associations
Object.values(connection.models)
  // associate 함수가 있는 모델만 필터링한다.
  .filter(model => typeof model.associate === 'function')
  // associate() 함수를 실행하여 테이블간 관계를 설정한다
  .filter(model => model.associate(connection.models));
