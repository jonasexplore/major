import { Query } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ProductsService } from 'src/services/products.service';
import { Product } from '../models/product';

@Resolver()
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  products() {
    return this.productsService.listAllProducts();
  }
}
