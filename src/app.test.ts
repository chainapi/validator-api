import request from 'supertest';
import { SUPPORTED_VERSIONS } from './constants';
import { build } from './app';

describe('GET /', () => {
  it('returns the healthy status check', async () => {
    const app = build();
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'alive' });
  });
});

describe.each(SUPPORTED_VERSIONS)('POST /validate for v%s configs', (version) => {
  const config = require(`../test/fixtures/${version}/config.json`);

  it('validates a valid config and version', async () => {
    const app = build();
    const res = await request(app).post('/validate').send({ version, config });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ valid: true, errors: [] });
  });

  it('returns the errors given an invalid config', async () => {
    const app = build();
    const invalid = JSON.parse(JSON.stringify(config));
    delete invalid.ois;
    const res = await request(app).post('/validate').send({ version, config: invalid });
    expect(res.status).toBe(422);
    expect(res.body).toEqual({
      valid: false,
      errors: [
        {
          code: 'invalid_type',
          expected: 'array',
          message: 'Required',
          path: ['ois'],
          received: 'undefined',
        },
      ],
    });
  });

  it('returns an error given invalid parameters', async () => {
    const app = build();
    const res = await request(app).post('/validate').send({ version: null });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid request' });
  });
});
