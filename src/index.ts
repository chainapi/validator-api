import Fastify from 'fastify';
import dotenv from 'dotenv';

dotenv.config();

const fastify = Fastify({ logger: true });

fastify.get('/', async (_request, reply) => {
  reply.type('application/json').code(200);
  return { hello: 'world' };
});

const PORT = Number(process.env.PORT) || 3000;
fastify.listen({ port: PORT }, (err, _address) => {
  if (err) throw err;
});
