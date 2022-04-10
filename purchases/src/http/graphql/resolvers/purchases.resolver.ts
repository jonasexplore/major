import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CurrentUser } from '../../auth/current-user.guard';
import { CustomerService } from '../../../services/customers.service';
import { ProductsService } from '../../../services/products.service';

import { PurchasesService } from 'src/services/purchases.service';
import { AuthUser } from '../../../types/auth-user';
import { CreatePurchaseInput } from '../inputs';
import { Purchase } from '../models/purchases';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
    private customerService: CustomerService,
  ) {}

  @Query(() => [Purchase])
  purchases() {
    return this.purchasesService.listAll();
  }

  @ResolveField()
  product(@Parent() purchase: Purchase) {
    return this.productsService.getById(purchase.productId);
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: AuthUser,
  ) {
    const customer = await this.customerService.create({
      authUserId: user.sub,
    });

    return this.purchasesService.create({
      productId: data.productId,
      customerId: customer.id,
    });
  }
}
