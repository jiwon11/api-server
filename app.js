import loaders from './loaders';
import express from 'express';

async function startServer() {
  try {
    const app = express();

    await loaders(app);

    app.listen(process.env.PORT || 3000, '0.0.0.0', err => {
      if (err) {
        console.log(err.errors);
        if (process.env.PM2) process.send('ready');
        console.log(`> ✨Ready on http://localhost:${port}`);
        return;
      }
      console.log(`Server is ready !`);
    });

    if (process.env.PM2) {
      process.on('SIGINT', function () {
        isDisableKeepAlive = true;
        app.close(function () {
          console.log('> 😢 Server closed');
          process.exit(0);
        });
      });
    }
  } catch (err) {
    console.log(err.errors);
  }
}

startServer();
