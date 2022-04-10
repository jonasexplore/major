import { Injectable } from '@nestjs/common';

import slugify from 'slugify';

import { PrismaService } from '../database/prisma/prisma.service';
import { CreateProduct } from '../types';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  getById(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  listAll() {
    return this.prisma.product.findMany();
  }

  async create({ title }: CreateProduct) {
    const slug = slugify(title, { lower: true });

    const existsProductWithSameSlug = await this.prisma.product.findUnique({
      where: {
        slug,
      },
    });

    if (existsProductWithSameSlug) {
      throw new Error('This slug already exists');
    }

    return this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
