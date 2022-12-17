import { Field, InputType, ID, OmitType } from '@nestjs/graphql';

@InputType()
export class SearchCommentsInput {
  @Field(() => ID)
  postId: string;

  @Field({ defaultValue: 10, nullable: true })
  limit?: number;

  @Field({ defaultValue: 0, nullable: true })
  offset?: number;
}

@InputType()
export class SearchCommentsInputNoID extends OmitType(SearchCommentsInput, [
  'postId',
]) {}
