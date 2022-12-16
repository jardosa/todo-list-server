import Node from 'src/base/entities/Node';
import { Field, Int, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export default abstract class NodeConnection<T extends Node> {
  abstract nodes: T[];

  @Field(() => Int)
  totalCount: number;
}
