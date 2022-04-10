import { ProductsResolver } from '../graphql/resolvers/products.resolver';
import { ProductsService } from '../../services/products.service';
import { PurchasesResolver } from '../graphql/resolvers/purchases.resolver';
import { PurchasesService } from '../../services/purchases.service';

const resolvers = [ProductsResolver, PurchasesResolver];
const services = [ProductsService, PurchasesService];

export const providers = [...resolvers, ...services];
