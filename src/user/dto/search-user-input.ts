import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SearchUserInput {
  @Field({ nullable: true })
  _id?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;
}
