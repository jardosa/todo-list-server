import TimeStamps from 'src/base/entities/TimeStamps';
import { ObjectType, Field } from '@nestjs/graphql';
import Node from 'src/base/entities/Node';

@ObjectType({ implements: [Node, TimeStamps] })
export default class Profile extends Node {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field()
  email: string;
}
