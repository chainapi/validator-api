import { Express } from 'express';
import pinoHTTP from 'pino-http';
import dotenv from 'dotenv';
import { build } from './app';
import { logger } from './logger';

dotenv.config();

const app: Express = build();
app.use(pinoHTTP()); // Logging

const PORT = Number(process.env.PORT) || 8000;
app.listen(PORT, () => {
  logger.info(`Listening on port:${PORT}`);
});
