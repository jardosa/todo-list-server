import { ObjectType, Field } from '@nestjs/graphql';
import Node from 'src/base/entities/Node';

@ObjectType({ implements: Node })
export default class Profile extends Node {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field()
  email: string;
}
