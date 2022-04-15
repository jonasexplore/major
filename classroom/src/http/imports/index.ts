import path from 'node:path';

import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { DatabaseModule } from '../../database/database.module';

export const imports = [
  ConfigModule.forRoot(),
  DatabaseModule,
  GraphQLModule.forRoot<ApolloFederationDriverConfig>({
    driver: ApolloFederationDriver,
    autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
  }),
];
