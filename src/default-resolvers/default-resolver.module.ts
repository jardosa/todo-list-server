import { DefaultResolver } from './default-resolvers.resolver';
import { Module } from '@nestjs/common';

@Module({
  providers: [DefaultResolver],
})
export class DefaultResolverModule {}
