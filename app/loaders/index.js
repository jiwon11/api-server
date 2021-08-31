import expressLoader from './express';
import mySqlLoader from './mysql';
import { connection } from '../models';
import ngrok from 'ngrok';
export default async app => {
  mySqlLoader(connection);

  await expressLoader(app);
  console.log('Express Initialized');

  // ... more loaders can be here

  if (process.env.NODE_ENV === 'development') {
    (async function () {
      try {
        const url = await ngrok.connect({
          proto: 'http', // http|tcp|tls, defaults to http
          addr: 3000, // port or network address, defaults to 80
          authtoken: '1dLQUHUtp7GmARaCzm515HGtTHv_27KPzwBFGNP6S8D9yehYz',
          region: 'jp'
        });
        console.log(url);
      } catch (err) {
        console.log(err);
      }
    })();
  }
  // ... Initialize agenda
  // ... or Redis, or whatever you want
};
