import expressLoader from './express';
import mySqlLoader from './mysql';
import { connection } from '../models';

export default async app => {
  mySqlLoader(connection);

  await expressLoader(app);
  console.log('Express Initialized');

  // ... more loaders can be here

  // ... Initialize agenda
  // ... or Redis, or whatever you want
};
