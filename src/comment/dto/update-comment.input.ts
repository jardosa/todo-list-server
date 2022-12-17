import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateCommentInput {
  @Field(() => ID)
  _id: string;

  @Field()
  body: string;
}
