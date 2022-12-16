import { InputType, Field } from '@nestjs/graphql';
import Node from 'src/base/entities/Node';

@InputType()
export class SearchUserInput extends Node {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;
}
