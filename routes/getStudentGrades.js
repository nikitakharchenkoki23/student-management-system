import db from '../db/index.js';

export default async function getStudentGradesRoute(fastify) {
  fastify.get('/api/student/grades', async (request, reply) => {
    const studentId = request.cookies?.studentId;

    if (!studentId) {
      return reply.code(401).send({ ok: false, message: 'Error occured: Not authenticated. Please log in first' });
    }

    await db.read();
    const student = db.data.students.find((s) => s.id === studentId);

    if (!student) {
      return reply.code(404).send({ ok: false, message: 'Error occured: Student not found' });
    }

    if (!student.grades || Object.keys(student.grades).length === 0) {
      return reply.send({ ok: true, data: { grades: {}, message: 'No grades available yet' } });
    }

    return reply.send({
      ok: true,
      data: {
        studentId: student.id,
        name: student.name,
        grades: student.grades,
      },
    });
  });
}
