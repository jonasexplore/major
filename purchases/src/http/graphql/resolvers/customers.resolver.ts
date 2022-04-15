import {
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { PurchasesService } from 'src/services/purchases.service';

import { CurrentUser } from '../../../http/auth';
import { CustomerService } from '../../../services/customers.service';
import { AuthUser } from '../../../types';
import { Customer } from '../models';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customerService: CustomerService,
    private purchasesService: PurchasesService,
  ) {}

  @Query(() => Customer)
  me(@CurrentUser() user: AuthUser) {
    return this.customerService.getByAuthUserId(user.sub);
  }

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.listByCustomerId(customer.id);
  }

  @ResolveReference()
  resolveReference({ authUserId }: { authUserId: string }) {
    return this.customerService.getByAuthUserId(authUserId);
  }
}
