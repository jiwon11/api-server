import expressLoader from './express.js';
import { connection } from '../models/index.js';

export default async app => {
  console.log(connection.models);
  connection.sync({ force: true });

  await expressLoader(app);
  console.log('Express Intialized');

  // ... more loaders can be here

  // ... Initialize agenda
  // ... or Redis, or whatever you want
};
