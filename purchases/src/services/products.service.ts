import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateProduct } from 'src/types/create-product';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    return this.prisma.product.findOne({
      where: {
        id,
      },
    });
  }

  async listAll() {
    return this.prisma.product.findMany();
  }

  async create({ slug, title }: CreateProduct) {
    const existsProductWithSameSlug = this.prisma.product.findUnique(slug);

    if (existsProductWithSameSlug) {
      throw new Error('This slug already exists');
    }

    return this.prisma.product.create({ title, slug });
  }
}
