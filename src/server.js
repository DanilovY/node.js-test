import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/detEnvVar.js';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import path from 'node:path';

const PORT = Number(getEnvVar('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(
    '/avatars',
    express.static(path.resolve('src', 'uploads', 'avatars')),
  );

  app.use(cors());

  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use(router);

  app.use('*any', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
