import db from '../db/index.js';

export default async function loginRoute(fastify) {
  fastify.post('/api/login', async (request, reply) => {
    const { email, password } = request.body ?? {};

    // Validation
    if (!email || typeof email !== 'string' || email.trim() === '') {
      return reply.code(400).send({ ok: false, message: 'Error occured: Email is required' });
    }
    if (!password || typeof password !== 'string' || password.trim() === '') {
      return reply.code(400).send({ ok: false, message: 'Error occured: Password is required' });
    }

    await db.read();
    const student = db.data.students.find(
      (s) => s.email === email.trim() && s.password === password
    );

    if (!student) {
      return reply.code(403).send({ ok: false, code: 403, message: 'No permissions' });
    }

    // Set login cookie (httpOnly for security)
    reply.setCookie('studentId', student.id, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return reply.send({
      ok: true,
      data: {
        id: student.id,
        name: student.name,
        email: student.email,
      },
    });
  });
}
