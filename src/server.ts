import express, { Express, Request, Response } from 'express';
import pinoHTTP from 'pino-http';
import dotenv from 'dotenv';
import { logger } from './logger';
import { validate } from './validation';

dotenv.config();

const app: Express = express();
app.use(pinoHTTP()); // Logging

app.get('/', async (req: Request, res: Response) => {
  res.type('application/json').status(200).send({ status: 'alive' });
});

app.post('/validate', async (req: Request, res: Response) => {
  const { config, version } = req.body;
  try {
    const { valid, errors } = validate(version, config);
    const status = valid ? 200 : 422;
    res.type('application/json').status(status).send({ valid, errors });
  } catch (e) {
    res.type('application/json').status(400).send({ error: 'Invalid request' });
  }
});

const PORT = Number(process.env.PORT) || 8000;
app.listen(PORT, () => {
  logger.info(`Listening on port:${PORT}`);
});
