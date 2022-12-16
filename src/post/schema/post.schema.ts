import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

type TodoStatus = 'not started' | 'in progress' | 'completed';

export type PostDocument = HydratedDocument<Post>;

@ObjectType({ isAbstract: true })
@Schema()
export class Post {
  @Prop()
  @Field()
  title: string;

  @Prop()
  @Field()
  description: string;

  @Prop()
  @Field()
  status: TodoStatus;
}

export const DestinationsSchema = SchemaFactory.createForClass(Post);
