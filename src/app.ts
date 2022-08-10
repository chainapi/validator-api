import express, { Express, Request, Response } from 'express';
import { validate } from './validation';

export const build = (): Express => {
  const app: Express = express();
  app.use(express.json());

  app.get('/', (_req: Request, res: Response) => {
    res.type('application/json').status(200).send({ status: 'alive' });
  });

  app.post('/validate', (req: Request, res: Response) => {
    const { config, version } = req.body;
    try {
      const { valid, errors } = validate(version, config);
      const status = valid ? 200 : 422;
      res.type('application/json').status(status).send({ valid, errors });
    } catch (e) {
      res.type('application/json').status(400).send({ error: 'Invalid request' });
    }
  });

  return app;
};
