import expressLoader from './express';
import { connection } from '../models';

export default async app => {
  connection.sync({
    force: true
  });

  await expressLoader(app);
  console.log('Express Intialized');

  // ... more loaders can be here

  // ... Initialize agenda
  // ... or Redis, or whatever you want
};
