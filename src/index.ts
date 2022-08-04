import dotenv from 'dotenv';
import Fastify from 'fastify';

dotenv.config();

const fastify = Fastify({ logger: true });

fastify.get('/', async (_request, reply) => {
  reply.type('application/json').code(200);
  return { status: 'alive' };
});

const PORT = Number(process.env.PORT) || 8000;
fastify.listen({ port: PORT }, (err, _address) => {
  if (err) throw err;
});
