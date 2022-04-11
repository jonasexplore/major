import path from 'node:path';

import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { DatabaseModule } from '../../database/database.module';
import { MessagingModule } from 'src/messaging/messaging.module';

export const imports = [
  ConfigModule.forRoot(),
  GraphQLModule.forRoot({
    driver: ApolloDriver,
    autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
  }),
  DatabaseModule,
  MessagingModule,
];
