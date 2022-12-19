import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { HydratedDocument, Types } from 'mongoose';
import Node from 'src/base/entities/Node';
import TimeStamps from 'src/base/entities/TimeStamps';

export type CommentDocument = HydratedDocument<Comment>;

@ObjectType({ isAbstract: true, implements: [Node, TimeStamps] })
@Schema({ timestamps: true })
export class Comment extends Node {
  @Prop({ type: Types.ObjectId })
  @Field(() => ID)
  postId: string;

  @Prop()
  @Field()
  body: string;

  @Prop({ type: Types.ObjectId })
  @Field(() => ID)
  userId: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
