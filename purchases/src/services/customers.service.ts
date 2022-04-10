import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';
import { CreateCustomer } from '../types';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  getByAuthUserId(authUserId: string) {
    return this.prisma.customer.findUnique({
      where: { authUserId },
    });
  }

  async create({ authUserId }: CreateCustomer) {
    const customer = await this.getByAuthUserId(authUserId);

    if (customer) {
      return customer;
    }

    return this.prisma.customer.create({
      data: {
        authUserId,
      },
    });
  }
}
