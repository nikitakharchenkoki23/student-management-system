export default async function logoutRoute(fastify) {
  fastify.post('/api/logout', async (request, reply) => {
    const studentId = request.cookies?.studentId;

    if (!studentId) {
      return reply.code(401).send({ ok: false, message: 'Error occured: Not logged in' });
    }

    reply.clearCookie('studentId', { path: '/' });

    return reply.code(200).send({ ok: true, data: { message: 'Logged out successfully' } });
  });
}
