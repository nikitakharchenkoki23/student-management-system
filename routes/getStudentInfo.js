import db from '../db/index.js';

export default async function getStudentInfoRoute(fastify) {
  fastify.get('/api/student/info', async (request, reply) => {
    const studentId = request.headers['x-student-id'];

    if (!studentId) {
      return reply.code(401).send({ ok: false, message: 'Error occured: Not authenticated. Please log in first' });
    }

    await db.read();
    const student = db.data.students.find((s) => s.id === studentId);

    if (!student) {
      return reply.code(404).send({ ok: false, message: 'Error occured: Student not found' });
    }

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
