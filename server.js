import 'dotenv/config';
import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie';

import loginRoute from './routes/login.js';
import logoutRoute from './routes/logout.js';
import getStudentInfoRoute from './routes/getStudentInfo.js';
import getStudentGradesRoute from './routes/getStudentGrades.js';
import getStudentCoursesRoute from './routes/getStudentCourses.js';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const fastify = Fastify({ logger: true });

// CORS
await fastify.register(fastifyCors, {
  origin: true,
  credentials: true,
});

// Cookie support
await fastify.register(fastifyCookie);

// Routes
await fastify.register(loginRoute);
await fastify.register(logoutRoute);
await fastify.register(getStudentInfoRoute);
await fastify.register(getStudentGradesRoute);
await fastify.register(getStudentCoursesRoute);

// Global error handler
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.code(500).send({
    ok: false,
    message: `Error occured: ${error.message}`,
  });
});

// 404 handler
fastify.setNotFoundHandler((request, reply) => {
  reply.code(404).send({
    ok: false,
    message: `Error occured: Route ${request.method} ${request.url} not found`,
  });
});

try {
  await fastify.listen({ port: Number(PORT), host: HOST });
  console.log(`Server running at http://${HOST}:${PORT}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
