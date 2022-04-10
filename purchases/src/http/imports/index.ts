import path from 'node:path';

import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { DatabaseModule } from 'src/database/database.module';

export const imports = [
  ConfigModule.forRoot(),
  DatabaseModule,
  GraphQLModule.forRoot({
    driver: ApolloDriver,
    autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
  }),
];