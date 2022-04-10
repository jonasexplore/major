import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';
import { CreatePurchase } from '../types';

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  listAll() {
    return this.prisma.purchase.findMany({
      orderBy: { createAt: 'desc' },
    });
  }

  listByCustomerId(customerId: string) {
    return this.prisma.purchase.findMany({
      where: { customerId },
      orderBy: { createAt: 'desc' },
    });
  }

  async create({ productId, customerId }: CreatePurchase) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('This product not exists');
    }

    return this.prisma.purchase.create({
      data: {
        customerId,
        productId,
      },
    });
  }
}
