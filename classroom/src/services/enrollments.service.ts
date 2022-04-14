import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';
import { CreateEnrollment, FindByCourseAndStudentId } from '../types';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  listAll() {
    return this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  listByStudentId(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findByCourseAndStudentId({ courseId, studentId }: FindByCourseAndStudentId) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null,
      },
    });
  }

  create(data: CreateEnrollment) {
    return this.prisma.enrollment.create({
      data,
    });
  }
}
