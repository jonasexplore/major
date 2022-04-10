import { ProductsResolver } from '../graphql/resolvers/products.resolver';
import { PurchasesResolver } from '../graphql/resolvers/purchases.resolver';
import { ProductsService } from '../../services/products.service';
import { PurchasesService } from '../../services/purchases.service';
import { CustomerService } from '../../services/customers.service';
import { CustomersResolver } from '../graphql/resolvers/customers.resolver';

const resolvers = [ProductsResolver, PurchasesResolver, CustomersResolver];
const services = [ProductsService, PurchasesService, CustomerService];

export const providers = [...resolvers, ...services];
