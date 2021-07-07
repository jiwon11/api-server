import loaders from './loaders/index.js';
import express from 'express';

async function startServer() {
  try {
    const app = express();

    await loaders(app);

    app.listen(process.env.PORT || 3000, '0.0.0.0', err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`Your server is ready !`);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
