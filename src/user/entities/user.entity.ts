import Node from 'src/base/entities/Node';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType({ implements: [Node] })
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;
}
