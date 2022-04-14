import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { PrismaService } from '../database/prisma/prisma.service';
import { CreateCourse } from '../types';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  listAll() {
    return this.prisma.course.findMany();
  }

  findById(id: string) {
    return this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  findBySlug(slug: string) {
    return this.prisma.course.findUnique({
      where: {
        slug,
      },
    });
  }

  async createCourse({
    title,
    slug = slugify(title, { lower: true }),
  }: CreateCourse) {
    const courseAlreadyExists = await this.findBySlug(slug);

    if (courseAlreadyExists) {
      throw new Error('Slug already exists');
    }

    return this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
