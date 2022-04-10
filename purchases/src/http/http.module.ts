import { Module } from '@nestjs/common';

import { imports } from './imports';
import { providers } from './providers';
@Module({
  imports,
  providers,
})
export class HttpModule {}
