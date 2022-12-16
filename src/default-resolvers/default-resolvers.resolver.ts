import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';

@Resolver()
export class DefaultResolver {
  @Query(() => String)
  ping() {
    return 'pong';
  }
  @Mutation(() => String)
  echo(@Args('message') message: string) {
    return message;
  }
}
