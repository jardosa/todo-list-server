import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class SearchPostsInput {
  @Field(() => ID)
  userId?: string;

  @Field({ defaultValue: 10, nullable: true })
  limit?: number;

  @Field({ defaultValue: 0, nullable: true })
  offset?: number;
}
