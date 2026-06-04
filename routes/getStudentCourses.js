import db from '../db/index.js';

export default async function getStudentCoursesRoute(fastify) {
  fastify.get('/api/student/courses', async (request, reply) => {
    const studentId = request.headers['x-student-id'];

    if (!studentId) {
      return reply.code(401).send({ ok: false, message: 'Error occured: Not authenticated. Please log in first' });
    }

    await db.read();
    const student = db.data.students.find((s) => s.id === studentId);

    if (!student) {
      return reply.code(404).send({ ok: false, message: 'Error occured: Student not found' });
    }

    if (!student.courses || student.courses.length === 0) {
      return reply.send({ ok: true, data: { courses: [], message: 'No courses enrolled yet' } });
    }

    return reply.send({
      ok: true,
      data: {
        studentId: student.id,
        name: student.name,
        courses: student.courses,
      },
    });
  });
}
