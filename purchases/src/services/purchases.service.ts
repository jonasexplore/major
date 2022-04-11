import { Injectable } from '@nestjs/common';
import { KafkaService } from 'src/messaging/kafka.service';

import { PrismaService } from '../database/prisma/prisma.service';
import { CreatePurchase } from '../types';

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService, private kafka: KafkaService) {}

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

    const purchase = this.prisma.purchase.create({
      data: {
        customerId,
        productId,
      },
    });

    const { authUserId } = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });

    this.kafka.emit('purchases.created', {
      customer: {
        authUserId,
      },
      product: {
        id: product.id,
        title: product.title,
        slug: product.slug,
      },
    });

    return purchase;
  }
}
