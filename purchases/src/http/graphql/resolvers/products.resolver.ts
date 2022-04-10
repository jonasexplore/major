import { Query } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { ProductsService } from 'src/services/products.service';
import { CreateProductInput } from '../inputs/create-product-input';
import { Product } from '../models/product';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  products() {
    return this.productsService.listAll();
  }

  @Mutation(() => Product)
  async createProduct(@Arg('data') data: CreateProductInput) {
    return this.productsService.create(data);
  }
}
