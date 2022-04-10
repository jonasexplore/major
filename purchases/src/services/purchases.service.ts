import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateProduct } from 'src/types/create-product';

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  async listAll() {
    return this.prisma.purchases.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
